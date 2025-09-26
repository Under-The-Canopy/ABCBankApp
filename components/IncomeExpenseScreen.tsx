import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Modal,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('window');

interface IncomeExpenseScreenProps {
  onBack: () => void;
}

interface Transaction {
  id: string;
  date: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
}

interface TimeFilter {
  year: number;
  month: number;
}

const IncomeExpenseScreen: React.FC<IncomeExpenseScreenProps> = ({ onBack }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentFilter, setCurrentFilter] = useState<TimeFilter>({ year: 2025, month: 9 });
  const [selectedFilter, setSelectedFilter] = useState<TimeFilter>({ year: 2025, month: 9 });
  const [isTimeModalVisible, setIsTimeModalVisible] = useState(false);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null);

  // 选择器引用
  const yearPickerRef = useRef<ScrollView>(null);
  const monthPickerRef = useRef<ScrollView>(null);

  // 可选择的年份和月份数据
  const availableYears = [2022, 2023, 2024, 2025, 2026];
  const availableMonths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  // 从本地存储加载交易记录
  const loadTransactions = async () => {
    try {
      const stored = await AsyncStorage.getItem('transactions');
      if (stored) {
        const storedTransactions = JSON.parse(stored);
        // 转换数据格式以适应收支页面显示
        const formattedTransactions = storedTransactions.map((transaction: any) => ({
          ...transaction,
          // 支出记录显示为负数，收入记录显示为正数
          amount: transaction.type === 'expense' ? -transaction.amount : transaction.amount
        }));
        setTransactions(formattedTransactions);
      } else {
        setTransactions([]);
      }
    } catch (error) {
      console.error('加载交易记录失败:', error);
      setTransactions([]);
    }
  };

  // 删除交易记录
  const deleteTransaction = async (id: string) => {
    Alert.alert(
      '删除交易记录',
      '确定要删除这条交易记录吗？',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '删除',
          style: 'destructive',
          onPress: async () => {
            try {
              // 从本地存储中删除
              const stored = await AsyncStorage.getItem('transactions');
              if (stored) {
                const storedTransactions = JSON.parse(stored);
                const newTransactions = storedTransactions.filter((t: any) => t.id !== id);
                await AsyncStorage.setItem('transactions', JSON.stringify(newTransactions));
                // 重新加载数据
                loadTransactions();
              }
              setSelectedTransactionId(null);
            } catch (error) {
              console.error('删除交易记录失败:', error);
            }
          }
        }
      ]
    );
  };

  // 筛选数据
  const filterTransactions = () => {
    const filtered = transactions.filter(t => {
      const date = new Date(t.date);
      return date.getFullYear() === currentFilter.year && 
             date.getMonth() + 1 === currentFilter.month;
    });
    setFilteredTransactions(filtered);
  };

  // 计算汇总数据
  const getSummary = () => {
    const totalExpense = filteredTransactions
      .filter(t => t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    const totalIncome = filteredTransactions
      .filter(t => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);
    
    return { totalExpense, totalIncome };
  };

  // 按日期分组交易
  const getGroupedTransactions = () => {
    const grouped: { [key: string]: Transaction[] } = {};
    filteredTransactions.forEach(t => {
      const day = new Date(t.date).getDate().toString();
      if (!grouped[day]) {
        grouped[day] = [];
      }
      grouped[day].push(t);
    });
    
    return Object.keys(grouped)
      .sort((a, b) => parseInt(b) - parseInt(a))
      .map(day => ({ day, transactions: grouped[day] }));
  };

  // 确认时间筛选
  const confirmTimeFilter = () => {
    setCurrentFilter(selectedFilter);
    setIsTimeModalVisible(false);
  };

  // 选择/取消选择交易项目
  const selectTransaction = (id: string) => {
    if (selectedTransactionId === id) {
      setSelectedTransactionId(null);
    } else {
      setSelectedTransactionId(id);
    }
  };

  // 初始化选择器滚动位置
  const initializePickerPositions = () => {
    setTimeout(() => {
      // 滚动到选中的年份
      const yearIndex = availableYears.findIndex(year => year === selectedFilter.year);
      if (yearIndex !== -1 && yearPickerRef.current) {
        yearPickerRef.current.scrollTo({ y: yearIndex * 40, animated: false });
      }

      // 滚动到选中的月份
      const monthIndex = availableMonths.findIndex(month => month === selectedFilter.month);
      if (monthIndex !== -1 && monthPickerRef.current) {
        monthPickerRef.current.scrollTo({ y: monthIndex * 40, animated: false });
      }
    }, 100);
  };

  // 获取图标样式和文本
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'income':
        return { style: styles.incomeIcon, text: '收' };
      case 'expense':
        return { style: styles.expenseIcon, text: '支' };
      default:
        return { style: styles.expenseIcon, text: '支' };
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  useEffect(() => {
    filterTransactions();
  }, [transactions, currentFilter]);

  const { totalExpense, totalIncome } = getSummary();
  const groupedTransactions = getGroupedTransactions();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <AntIcon name="left" size={18} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>收支</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.headerButton}>
            <Icon name="search" size={18} color="#007AFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Icon name="more-horiz" size={18} color="#8E8E93" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Controls */}
      <View style={styles.filterControls}>
        <TouchableOpacity style={styles.filterItem} onPress={() => setIsTimeModalVisible(true)}>
          <Text style={[styles.filterText, styles.filterHighlight]}>
            {currentFilter.year}-{String(currentFilter.month).padStart(2, '0')}
          </Text>
          <AntIcon name="down" size={12} color="#8E8E93" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterItem}>
          <Text style={styles.filterText}>全部账户</Text>
          <AntIcon name="down" size={12} color="#8E8E93" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterItem}>
          <Text style={[styles.filterText, styles.filterHighlight]}>筛选</Text>
          <AntIcon name="down" size={12} color="#8E8E93" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Summary Card */}
        <LinearGradient
          colors={['#FFF8E1', '#FFFBF0']}
          style={styles.summaryCard}
        >
          <View style={styles.summaryHeader}>
            <View style={styles.monthContainer}>
              <Text style={styles.monthText}>{currentFilter.month}</Text>
              <Text style={styles.monthText}>月</Text>
              <Text style={styles.yearText}>/{currentFilter.year}</Text>
              <Icon name="info-outline" size={16} color="#8E8E93" style={styles.infoIcon} />
            </View>
            <TouchableOpacity style={styles.analyzeButton}>
              <Text style={styles.analyzeButtonText}>分析</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.summaryAmounts}>
            <View style={styles.amountSection}>
              <Text style={styles.amountLabel}>支出(元)</Text>
              <Text style={[styles.amountValue, styles.expenseValue]}>
                {totalExpense.toLocaleString('en-US', {minimumFractionDigits: 2})}
              </Text>
            </View>
            <View style={[styles.amountSection, {alignItems: 'flex-end'}]}>
              <Text style={styles.amountLabel}>收入(元)</Text>
              <Text style={[styles.amountValue, styles.incomeValue]}>
                {totalIncome.toLocaleString('en-US', {minimumFractionDigits: 2})}
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* Transaction List */}
        <View style={styles.transactionList}>
          {groupedTransactions.map((group) => (
            <View key={group.day}>
              <View style={styles.dateSection}>
                <Text style={styles.dateText}>{group.day}日</Text>
              </View>
              {group.transactions.map((transaction) => {
                const iconConfig = getTransactionIcon(transaction.type === 'income' ? 'income' : 'expense');
                const isSelected = selectedTransactionId === transaction.id;
                return (
                  <TouchableOpacity
                    key={transaction.id}
                    style={[styles.transactionItem, isSelected && styles.transactionItemSelected]}
                    onPress={() => selectTransaction(transaction.id)}
                  >
                    <View style={[styles.transactionIcon, iconConfig.style]}>
                      <Text style={styles.transactionIconText}>{iconConfig.text}</Text>
                    </View>
                    <View style={styles.transactionInfo}>
                      <Text style={styles.transactionName}>{transaction.category}</Text>
                      <View style={styles.transactionDetails}>
                        <Text style={styles.transactionDetailText}>
                          {transaction.description || '无备注'}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.transactionAmount}>
                      <Text style={[styles.amountMain, transaction.amount > 0 ? styles.amountPositive : styles.amountNegative]}>
                        {transaction.amount > 0 ? '+' : ''} ¥ {Math.abs(transaction.amount).toFixed(2)}
                      </Text>
                      <Text style={styles.amountBalance}>{transaction.type === 'income' ? '收入' : '支出'}</Text>
                    </View>
                    {isSelected && (
                      <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => deleteTransaction(transaction.id)}
                      >
                        <Text style={styles.deleteButtonText}>删除</Text>
                      </TouchableOpacity>
                    )}
                    <AntIcon name="right" size={16} color="#C7C7CC" />
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Time Filter Modal */}
      <Modal
        visible={isTimeModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsTimeModalVisible(false)}
        onShow={initializePickerPositions}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.timeFilterModal}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setIsTimeModalVisible(false)}>
                <Text style={styles.modalCancel}>取消</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>选择时间</Text>
              <TouchableOpacity onPress={confirmTimeFilter}>
                <Text style={styles.modalConfirm}>确定</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalContent}>
              <View style={styles.filterNotice}>
                <Text style={styles.filterNoticeText}>
                  若查询时间为2021年1月之前，请 <Text style={styles.filterNoticeLink}>点击此处</Text> 跳转至明细
                </Text>
              </View>
              <View style={styles.filterTabs}>
                <TouchableOpacity style={[styles.filterTab, styles.filterTabActive]}>
                  <Text style={[styles.filterTabText, styles.filterTabTextActive]}>月份选择</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterTab}>
                  <Text style={styles.filterTabText}>自定义</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.pickerContainer}>
                <View style={styles.pickerColumn}>
                  <Text style={styles.pickerLabel}>年份</Text>
                  <ScrollView 
                    ref={yearPickerRef}
                    style={styles.picker}
                    showsVerticalScrollIndicator={false}
                    snapToInterval={40}
                    decelerationRate="fast"
                    onMomentumScrollEnd={(event) => {
                      const index = Math.round(event.nativeEvent.contentOffset.y / 40);
                      const year = availableYears[index];
                      if (year) {
                        setSelectedFilter(prev => ({ ...prev, year }));
                      }
                    }}
                  >
                    {availableYears.map((year) => (
                      <TouchableOpacity
                        key={year}
                        style={[
                          styles.pickerItem,
                          selectedFilter.year === year && styles.pickerItemSelected
                        ]}
                        onPress={() => setSelectedFilter(prev => ({ ...prev, year }))}
                      >
                        <Text style={[
                          styles.pickerItemText,
                          selectedFilter.year === year && styles.pickerItemTextSelected
                        ]}>
                          {year}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
                <View style={styles.pickerColumn}>
                  <Text style={styles.pickerLabel}>月份</Text>
                  <ScrollView 
                    ref={monthPickerRef}
                    style={styles.picker}
                    showsVerticalScrollIndicator={false}
                    snapToInterval={40}
                    decelerationRate="fast"
                    onMomentumScrollEnd={(event) => {
                      const index = Math.round(event.nativeEvent.contentOffset.y / 40);
                      const month = availableMonths[index];
                      if (month) {
                        setSelectedFilter(prev => ({ ...prev, month }));
                      }
                    }}
                  >
                    {availableMonths.map((month) => (
                      <TouchableOpacity
                        key={month}
                        style={[
                          styles.pickerItem,
                          selectedFilter.month === month && styles.pickerItemSelected
                        ]}
                        onPress={() => setSelectedFilter(prev => ({ ...prev, month }))}
                      >
                        <Text style={[
                          styles.pickerItemText,
                          selectedFilter.month === month && styles.pickerItemTextSelected
                        ]}>
                          {month}月
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5EA',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1D1D1F',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  headerButton: {
    padding: 8,
  },
  filterControls: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5EA',
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    fontSize: 15,
    color: '#1D1D1F',
    marginRight: 4,
  },
  filterHighlight: {
    color: '#007AFF',
  },
  scrollView: {
    flex: 1,
  },
  summaryCard: {
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 12,
    padding: 20,
    overflow: 'hidden',
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  monthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  monthText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1D1D1F',
    marginRight: 8,
  },
  yearText: {
    fontSize: 16,
    color: '#8E8E93',
    marginRight: 8,
  },
  infoIcon: {
    width: 16,
    height: 16,
  },
  analyzeButton: {
    backgroundColor: '#FF9500',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  analyzeButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  summaryAmounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amountSection: {
    flex: 1,
  },
  amountLabel: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  amountValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1D1D1F',
  },
  expenseValue: {
    color: '#1D1D1F',
  },
  incomeValue: {
    color: '#1D1D1F',
  },
  transactionList: {
    backgroundColor: 'white',
    marginHorizontal: 0,
    marginTop: 16,
    borderRadius: 0,
    overflow: 'hidden',
    width: '100%',
  },
  dateSection: {
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5EA',
  },
  dateText: {
    fontSize: 13,
    color: '#8E8E93',
    fontWeight: '500',
  },
  transactionItem: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5EA',
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 70,
    position: 'relative',
  },
  transactionItemSelected: {
    backgroundColor: '#F2F2F7',
  },
  transactionIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  incomeIcon: {
    backgroundColor: '#4CAF50',
  },
  expenseIcon: {
    backgroundColor: '#F44336',
  },
  transactionIconText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  transactionInfo: {
    flex: 1,
    marginRight: 16,
  },
  transactionName: {
    fontSize: 16,
    color: '#1D1D1F',
    fontWeight: '500',
    marginBottom: 2,
  },
  transactionDetails: {
    marginTop: 4,
  },
  transactionDetailText: {
    fontSize: 13,
    color: '#8E8E93',
  },
  transactionAmount: {
    alignItems: 'flex-end',
    marginRight: 8,
    minWidth: 100,
  },
  amountMain: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1D1D1F',
    marginBottom: 2,
  },
  amountNegative: {
    color: '#F44336',
  },
  amountPositive: {
    color: '#4CAF50',
  },
  amountBalance: {
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 2,
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF3B30',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    zIndex: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 100,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  timeFilterModal: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 16,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    maxHeight: '60%',
    overflow: 'hidden',
  },
  modalHeader: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5EA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalCancel: {
    fontSize: 16,
    color: '#8E8E93',
  },
  modalConfirm: {
    fontSize: 16,
    color: '#FF9500',
    fontWeight: '600',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1D1D1F',
  },
  modalContent: {
    padding: 20,
  },
  filterNotice: {
    backgroundColor: '#FFF8E1',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  filterNoticeText: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
  filterNoticeLink: {
    color: '#FF9500',
  },
  filterTabs: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  filterTabActive: {
    borderBottomColor: '#FF9500',
  },
  filterTabText: {
    fontSize: 16,
    color: '#8E8E93',
  },
  filterTabTextActive: {
    color: '#1D1D1F',
    fontWeight: '600',
  },
  pickerContainer: {
    flexDirection: 'row',
    height: 200,
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    overflow: 'hidden',
  },
  pickerColumn: {
    flex: 1,
    alignItems: 'center',
  },
  pickerLabel: {
    fontSize: 14,
    color: '#8E8E93',
    paddingVertical: 10,
    fontWeight: '500',
  },
  picker: {
    flex: 1,
    width: '100%',
  },
  pickerItem: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  pickerItemSelected: {
    backgroundColor: 'rgba(255, 149, 0, 0.1)',
  },
  pickerItemText: {
    fontSize: 16,
    color: '#8E8E93',
  },
  pickerItemTextSelected: {
    color: '#FF9500',
    fontWeight: '600',
  },
});

export default IncomeExpenseScreen; 