import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Modal,
  SafeAreaView,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Transaction {
  id: string;
  date: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
}

interface TransactionManagerScreenProps {
  onBack: () => void;
}

const TransactionManagerScreen: React.FC<TransactionManagerScreenProps> = ({ onBack }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    type: 'expense' as 'income' | 'expense',
    category: '',
    amount: '',
    description: '',
  });

  // 加载本地存储的交易记录
  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const stored = await AsyncStorage.getItem('transactions');
      if (stored) {
        setTransactions(JSON.parse(stored));
      }
    } catch (error) {
      console.error('加载交易记录失败:', error);
    }
  };

  const saveTransactions = async (newTransactions: Transaction[]) => {
    try {
      await AsyncStorage.setItem('transactions', JSON.stringify(newTransactions));
      setTransactions(newTransactions);
    } catch (error) {
      console.error('保存交易记录失败:', error);
    }
  };

  const handleAddTransaction = () => {
    setEditingTransaction(null);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      type: 'expense',
      category: '',
      amount: '',
      description: '',
    });
    setModalVisible(true);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setFormData({
      date: transaction.date,
      type: transaction.type,
      category: transaction.category,
      amount: transaction.amount.toString(),
      description: transaction.description,
    });
    setModalVisible(true);
  };

  const handleDeleteTransaction = (id: string) => {
    Alert.alert(
      '确认删除',
      '确定要删除这条交易记录吗？',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '删除',
          style: 'destructive',
          onPress: () => {
            const newTransactions = transactions.filter(t => t.id !== id);
            saveTransactions(newTransactions);
          },
        },
      ]
    );
  };

  const handleSaveTransaction = () => {
    if (!formData.category || !formData.amount) {
      Alert.alert('错误', '请填写完整信息');
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('错误', '请输入有效的金额');
      return;
    }

    const transaction: Transaction = {
      id: editingTransaction?.id || Date.now().toString(),
      date: formData.date,
      type: formData.type,
      category: formData.category,
      amount: amount,
      description: formData.description,
    };

    let newTransactions;
    if (editingTransaction) {
      newTransactions = transactions.map(t => t.id === editingTransaction.id ? transaction : t);
    } else {
      newTransactions = [...transactions, transaction];
    }

    saveTransactions(newTransactions);
    setModalVisible(false);
  };

  const renderTransactionItem = ({ item }: { item: Transaction }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionInfo}>
        <View style={styles.transactionHeader}>
          <Text style={[styles.transactionType, { color: item.type === 'income' ? '#4CAF50' : '#F44336' }]}>
            {item.type === 'income' ? '收入' : '支出'}
          </Text>
          <Text style={styles.transactionDate}>{item.date}</Text>
        </View>
        <Text style={styles.transactionCategory}>{item.category}</Text>
        <Text style={styles.transactionAmount}>
          {item.type === 'income' ? '+' : '-'}￥{item.amount.toFixed(2)}
        </Text>
        {item.description ? <Text style={styles.transactionDescription}>{item.description}</Text> : null}
      </View>
      <View style={styles.transactionActions}>
        <TouchableOpacity style={styles.editButton} onPress={() => handleEditTransaction(item)}>
          <Text style={styles.buttonText}>编辑</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteTransaction(item.id)}>
          <Text style={styles.buttonText}>删除</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 头部导航 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← 返回</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>交易记录管理</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddTransaction}>
          <Text style={styles.addButtonText}>+ 添加</Text>
        </TouchableOpacity>
      </View>

      {/* 交易记录列表 */}
      <FlatList
        data={transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())}
        keyExtractor={item => item.id}
        renderItem={renderTransactionItem}
        style={styles.transactionList}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>暂无交易记录</Text>
            <Text style={styles.emptySubtext}>点击右上角添加按钮开始记录</Text>
          </View>
        }
      />

      {/* 添加/编辑模态框 */}
      <Modal visible={modalVisible} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCancelText}>取消</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              {editingTransaction ? '编辑交易' : '添加交易'}
            </Text>
            <TouchableOpacity onPress={handleSaveTransaction}>
              <Text style={styles.modalSaveText}>保存</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>日期</Text>
              <TextInput
                style={styles.input}
                value={formData.date}
                onChangeText={text => setFormData({ ...formData, date: text })}
                placeholder="YYYY-MM-DD"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>类型</Text>
              <View style={styles.typeSelector}>
                <TouchableOpacity
                  style={[styles.typeButton, formData.type === 'expense' && styles.typeButtonActive]}
                  onPress={() => setFormData({ ...formData, type: 'expense' })}
                >
                  <Text style={[styles.typeButtonText, formData.type === 'expense' && styles.typeButtonTextActive]}>
                    支出
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.typeButton, formData.type === 'income' && styles.typeButtonActive]}
                  onPress={() => setFormData({ ...formData, type: 'income' })}
                >
                  <Text style={[styles.typeButtonText, formData.type === 'income' && styles.typeButtonTextActive]}>
                    收入
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>分类</Text>
              <TextInput
                style={styles.input}
                value={formData.category}
                onChangeText={text => setFormData({ ...formData, category: text })}
                placeholder="如：餐饮、交通、工资等"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>金额</Text>
              <TextInput
                style={styles.input}
                value={formData.amount}
                onChangeText={text => setFormData({ ...formData, amount: text })}
                placeholder="0.00"
                keyboardType="decimal-pad"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>备注</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.description}
                onChangeText={text => setFormData({ ...formData, description: text })}
                placeholder="可选"
                multiline
                numberOfLines={3}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    padding: 8,
  },
  addButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  transactionList: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  transactionItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  transactionType: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  transactionDate: {
    fontSize: 12,
    color: '#666',
  },
  transactionCategory: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  transactionDescription: {
    fontSize: 12,
    color: '#666',
  },
  transactionActions: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  deleteButton: {
    backgroundColor: '#F44336',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalCancelText: {
    fontSize: 16,
    color: '#666',
  },
  modalSaveText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  typeSelector: {
    flexDirection: 'row',
    gap: 12,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  typeButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  typeButtonText: {
    fontSize: 16,
    color: '#666',
  },
  typeButtonTextActive: {
    color: 'white',
    fontWeight: '500',
  },
});

export default TransactionManagerScreen;