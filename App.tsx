import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import SvgIcon from './components/SvgIcon';
import { SvgXml } from 'react-native-svg';
import IncomeExpenseScreen from './components/IncomeExpenseScreen';
import TransactionManagerScreen from './components/TransactionManagerScreen';

const {width} = Dimensions.get('window');

const App = () => {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'income-expense' | 'transaction-manager'>('home');

  // 动画值
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(1)).current;
  const sparkleAnim = useRef(new Animated.Value(1)).current;

  const navigateToIncomeExpense = () => {
    setCurrentScreen('income-expense');
  };

  const navigateToTransactionManager = () => {
    setCurrentScreen('transaction-manager');
  };

  const navigateBack = () => {
    setCurrentScreen('home');
  };

  // 启动动画
  useEffect(() => {
    // 脉冲动画 - "惠"字
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    // 浮动动画 - "有福"文字
    const floatAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -3,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );

    // 发光动画 - 按钮
    const glowAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1.2,
          duration: 1250,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1250,
          useNativeDriver: false,
        }),
      ])
    );

    // 闪烁动画 - 宝箱
    const sparkleAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(sparkleAnim, {
          toValue: 0.7,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(sparkleAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );

    pulseAnimation.start();
    setTimeout(() => floatAnimation.start(), 500); // 延迟启动
    glowAnimation.start();
    sparkleAnimation.start();

    return () => {
      pulseAnimation.stop();
      floatAnimation.stop();
      glowAnimation.stop();
      sparkleAnimation.stop();
    };
  }, []);

  if (currentScreen === 'income-expense') {
    return <IncomeExpenseScreen onBack={navigateBack} />;
  }

  if (currentScreen === 'transaction-manager') {
    return <TransactionManagerScreen onBack={navigateBack} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Background - Banner Background */}
      <LinearGradient
        colors={['#4ECDC4', '#26D0CE', '#1ABC9C']}
        style={StyleSheet.absoluteFillObject}
        locations={[0, 0.6, 1]}
      />

      <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
        {/* Top Icons Row - Remove Status Bar */}
        <View style={styles.topIcons}>
          <TouchableOpacity style={styles.topIcon}>
            {/* TODO: 替换为SVG图标 */}
            <SvgIcon name="lottery" size={20} style={styles.iconSvg} />
            {/* 临时保留emoji作为备选 */}
            <Text style={styles.iconText}>🎁</Text>
            <Text style={styles.topIconText}>抽奖</Text>
          </TouchableOpacity>
          <View style={styles.searchContainer}>
            {/* TODO: 替换为SVG图标 */}
            <SvgIcon name="search" size={16} style={styles.searchIcon} />
            <Text style={styles.searchPlaceholder}>🔍 分期借钱</Text>
            {/* TODO: 替换为SVG图标 */}
            <SvgIcon name="voice" size={16} style={styles.voiceIcon} />
            {/* 临时保留emoji作为备选 */}
            <Text style={styles.voiceIconText}>🎤</Text>
          </View>
          <TouchableOpacity style={styles.topIcon}>
            {/* TODO: 替换为SVG图标 */}
            <SvgIcon name="version" size={20} style={styles.iconSvg} />
            {/* 临时保留emoji作为备选 */}
            <Text style={styles.iconText}>💬</Text>
            <Text style={styles.topIconText}>版本</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topIcon}>
            {/* TODO: 替换为SVG图标 */}
            <SvgIcon name="customer-service" size={20} style={styles.iconSvg} />
            {/* 临时保留emoji作为备选 */}
            <Text style={styles.iconText}>🎧</Text>
            <Text style={styles.topIconText}>客服</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topIcon}>
            <View style={styles.messageBadge}>
              <Text style={styles.badgeText}>200</Text>
            </View>
            {/* TODO: 替换为SVG图标 */}
            <SvgIcon name="message" size={20} style={styles.iconSvg} />
            {/* 临时保留emoji作为备选 */}
            <Text style={styles.iconText}>💌</Text>
            <Text style={styles.topIconText}>消息</Text>
          </TouchableOpacity>
        </View>

        {/* Hui You Fu Banner */}
        <View style={styles.bannerContainer}>
          <View style={styles.bannerLeft}>
            <View style={styles.bannerTitle}>
              <View style={styles.huiContainer}>
                <Animated.Text style={[styles.huiChar, { transform: [{ scale: pulseAnim }] }]}>惠</Animated.Text>
              </View>
              <View style={styles.youFuContainer}>
                <Animated.Text style={[styles.youFuText, { transform: [{ translateY: floatAnim }] }]}>有福</Animated.Text>
              </View>
            </View>
            <Text style={styles.bannerSubtitle}>农情无限 惠聚精彩</Text>
            <Animated.View style={{ transform: [{ scale: glowAnim }] }}>
              <LinearGradient
                colors={['#FF8A50', '#FF7A40']}
                style={styles.bannerButton}>
                <TouchableOpacity style={styles.bannerButtonTouchable}>
                  <Text style={styles.bannerButtonText}>立即参与</Text>
                  <Text style={styles.bannerButtonArrow}>＞</Text>
                </TouchableOpacity>
              </LinearGradient>
            </Animated.View>
          </View>
          <View style={styles.bannerRight}>
            <Animated.View style={[styles.wheatContainer, { opacity: sparkleAnim, transform: [{ scale: sparkleAnim }] }]}>
              <Text style={styles.wheatEmoji}>🌾</Text>
            </Animated.View>
          </View>
        </LinearGradient>

        {/* Main Functions Grid */}
        <View style={styles.mainGrid}>
          <TouchableOpacity style={styles.gridItem}>
            <View style={[styles.gridIcon, {backgroundColor: '#1ABC9C'}]}>
              {/* TODO: 替换为SVG图标 */}
              <SvgIcon name="account" size={24} color="white" style={styles.gridIconSvg} />
              {/* 临时保留emoji作为备选 */}
              <Text style={styles.gridIconText}>👤</Text>
            </View>
            <Text style={styles.gridText}>我的账户</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridItem}>
            <View style={[styles.gridIcon, {backgroundColor: '#FF9642'}]}>
              {/* TODO: 替换为SVG图标 */}
              <SvgIcon name="transfer" size={24} color="white" style={styles.gridIconSvg} />
              {/* 临时保留emoji作为备选 */}
              <Text style={styles.gridIconText}>⇄</Text>
            </View>
            <Text style={styles.gridText}>转账</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridItem} onPress={navigateToIncomeExpense}>
            <View style={[styles.gridIcon, {backgroundColor: '#1ABC9C'}]}>
              <SvgIcon name="income-expense" size={24} style={styles.gridIconSvg} />
            </View>
            <Text style={styles.gridText}>收支</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridItem}>
            <View style={[styles.gridIcon, {backgroundColor: '#FF9642'}]}>
              {/* TODO: 替换为SVG图标 */}
              <SvgIcon name="scan" size={24} color="white" style={styles.gridIconSvg} />
              {/* 临时保留emoji作为备选 */}
              <Text style={styles.gridIconText}><Text style={{fontSize: 20}}>⬜</Text></Text>
            </View>
            <Text style={styles.gridText}>扫一扫</Text>
          </TouchableOpacity>
        </View>

        {/* Services Grid */}
        <View style={styles.servicesGrid}>
          <TouchableOpacity style={styles.serviceItem}>
            {/* TODO: 替换为SVG图标 */}
            <SvgIcon name="credit-card" size={30} style={styles.serviceIconSvg} />
            {/* 临时保留emoji作为备选 */}
            <Text style={styles.serviceIcon}>💳</Text>
            <Text style={styles.serviceText}>信用卡</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.serviceItem}>
            <View style={styles.newBadge}>
              <Text style={styles.newText}>NEW</Text>
            </View>
            {/* TODO: 替换为SVG图标 */}
            <SvgIcon name="retirement-community" size={30} style={styles.serviceIconSvg} />
            {/* 临时保留emoji作为备选 */}
            <Text style={styles.serviceIcon}>🏠</Text>
            <Text style={styles.serviceText}>养老社区</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.serviceItem}>
            {/* TODO: 替换为SVG图标 */}
            <SvgIcon name="deposit" size={30} style={styles.serviceIconSvg} />
            {/* 临时保留emoji作为备选 */}
            <Text style={styles.serviceIcon}>🏦</Text>
            <Text style={styles.serviceText}>存款</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.serviceItem}>
            {/* TODO: 替换为SVG图标 */}
            <SvgIcon name="financial-product" size={30} style={styles.serviceIconSvg} />
            {/* 临时保留emoji作为备选 */}
            <Text style={styles.serviceIcon}>💰</Text>
            <Text style={styles.serviceText}>理财产品</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.serviceItem}>
            {/* TODO: 替换为SVG图标 */}
            <SvgIcon name="loan" size={30} style={styles.serviceIconSvg} />
            {/* 临时保留emoji作为备选 */}
            <Text style={styles.serviceIcon}>💸</Text>
            <Text style={styles.serviceText}>贷款</Text>
          </TouchableOpacity>
        </View>

        {/* Life Services Grid */}
        <View style={styles.servicesGrid}>
          <TouchableOpacity style={styles.serviceItem}>
            {/* TODO: 替换为SVG图标 */}
            <SvgIcon name="bill-payment" size={30} style={styles.serviceIconSvg} />
            {/* 临时保留emoji作为备选 */}
            <Text style={styles.serviceIcon}>⚡</Text>
            <Text style={styles.serviceText}>生活缴费</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.serviceItem}>
            {/* TODO: 替换为SVG图标 */}
            <SvgIcon name="hot-activity" size={30} style={styles.serviceIconSvg} />
            {/* 临时保留emoji作为备选 */}
            <Text style={styles.serviceIcon}>🔥</Text>
            <Text style={styles.serviceText}>热门活动</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.serviceItem}>
            {/* TODO: 替换为SVG图标 */}
            <SvgIcon name="game-park" size={30} style={styles.serviceIconSvg} />
            {/* 临时保留emoji作为备选 */}
            <Text style={styles.serviceIcon}>🎮</Text>
            <Text style={styles.serviceText}>小豆乐园</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.serviceItem}>
            {/* TODO: 替换为SVG图标 */}
            <SvgIcon name="city-zone" size={30} style={styles.serviceIconSvg} />
            {/* 临时保留emoji作为备选 */}
            <Text style={styles.serviceIcon}>🏙️</Text>
            <Text style={styles.serviceText}>城市专区</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.serviceItem}>
            {/* TODO: 替换为SVG图标 */}
            <SvgIcon name="more" size={30} style={styles.serviceIconSvg} />
            {/* 临时保留emoji作为备选 */}
            <Text style={styles.serviceIcon}>⋯</Text>
            <Text style={styles.serviceText}>全部</Text>
          </TouchableOpacity>
        </View>

        {/* Promotion Cards */}
        <View style={styles.promotionCards}>
          <View style={styles.promotionCard}>
            <SvgIcon name="smart-reminder" size={28} style={styles.promotionIconSvg} />
            <Text style={styles.promotionText}>快来试试智能提醒吧～</Text>
            <Text style={styles.promotionArrow}>{'>'}</Text>
          </View>

          <View style={styles.promotionCard}>
            <SvgIcon name="news" size={28} style={styles.promotionIconSvg} />
            <Text style={styles.promotionText}>大爆发！两大利好来袭！</Text>
            <Text style={styles.promotionArrow}>{'>'}</Text>
          </View>
        </View>

        {/* Lottery Wheel Banner */}
        <View style={styles.lotteryWheelBanner}>
          <SvgIcon name="lottery-wheel" size={width * 0.8} style={styles.lotteryWheelIcon} />
        </View>

        {/* Wealth Selection */}
        <View style={styles.wealthSection}>
          <Text style={styles.wealthTitle}>财富优选</Text>
          <Text style={styles.wealthArrow}>{'>'}</Text>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
          {/* TODO: 替换为SVG图标 */}
          <SvgIcon name="home" size={20} style={styles.navIconSvg} />
          {/* 临时保留emoji作为备选 */}
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={[styles.navText, styles.navTextActive]}>首页</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          {/* TODO: 替换为SVG图标 */}
          <SvgIcon name="wealth" size={20} style={styles.navIconSvg} />
          {/* 临时保留emoji作为备选 */}
          <Text style={styles.navIcon}>¥</Text>
          <Text style={styles.navText}>财富</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          {/* TODO: 替换为SVG图标 */}
          <SvgIcon name="life" size={20} style={styles.navIconSvg} />
          {/* 临时保留emoji作为备选 */}
          <Text style={styles.navIcon}>🛍️</Text>
          <Text style={styles.navText}>生活</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          {/* TODO: 替换为SVG图标 */}
          <SvgIcon name="rural-revitalization" size={20} style={styles.navIconSvg} />
          {/* 临时保留emoji作为备选 */}
          <Text style={styles.navIcon}>🌾</Text>
          <Text style={styles.navText}>乡村振兴</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={navigateToTransactionManager}>
          {/* TODO: 替换为SVG图标 */}
          <SvgIcon name="profile" size={20} style={styles.navIconSvg} />
          {/* 临时保留emoji作为备选 */}
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navText}>我的</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  topIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
    gap: 6,
  },
  topIcon: {
    alignItems: 'center',
    marginHorizontal: 5,
    position: 'relative',
  },
  iconText: {
    fontSize: 20,
    marginBottom: 2,
  },
  topIconText: {
    fontSize: 10,
    color: 'white',
  },
  searchContainer: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginHorizontal: 8,
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 180,
  },
  searchPlaceholder: {
    fontSize: 15,
    color: '#8E8E93',
    flex: 1,
  },
  messageBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF4444',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
    minWidth: 20,
  },
  badgeText: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
  },
  bannerContainer: {
    margin: 0,
    borderRadius: 0,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerLeft: {
    flex: 1,
  },
  bannerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  huiContainer: {
    marginRight: 8,
  },
  huiChar: {
    fontSize: 42,
    fontWeight: '900',
    color: '#8B4513',
    backgroundColor: 'transparent',
    borderRadius: 32.5,
    borderWidth: 3,
    borderColor: 'rgba(139, 69, 19, 0.8)',
    width: 65,
    height: 65,
    textAlign: 'center',
    lineHeight: 58,
    transform: [{skewX: '12deg'}],
    shadowColor: '#8B4513',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
    overflow: 'hidden',
    textShadowColor: 'rgba(139, 69, 19, 0.6)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  youFuContainer: {
    justifyContent: 'center',
  },
  youFuText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#A0522D',
    lineHeight: 35,
    transform: [{skewX: '-8deg'}],
    letterSpacing: 3,
    textShadowColor: 'rgba(139, 69, 19, 0.4)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 4,
  },
  bannerSubtitle: {
    fontSize: 16,
    color: '#2E8B57',
    marginBottom: 16,
    fontWeight: '400',
    letterSpacing: 4,
    lineHeight: 22,
    textShadowColor: 'rgba(46, 139, 87, 0.3)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
  },
  bannerButton: {
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  bannerButtonTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  bannerButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 4,
  },
  bannerButtonArrow: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'normal',
  },
  bannerRight: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wheatContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: 80,
    height: 80,
  },
  wheatEmoji: {
    fontSize: 64,
    textShadowColor: 'rgba(212, 175, 55, 0.6)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 4,
  },
  mainGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255,255,255,0.9)',
    margin: 20,
    marginTop: 16,
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    gap: 8,
  },
  gridItem: {
    alignItems: 'center',
    flex: 1,
  },
  gridIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  gridIconText: {
    fontSize: 24,
    color: 'white',
  },
  gridText: {
    fontSize: 12,
    color: '#333',
    fontWeight: 'bold',
  },
  servicesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    margin: 0,
    borderRadius: 0,
    paddingVertical: 24,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
  },
  serviceItem: {
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  serviceIcon: {
    fontSize: 30,
    marginBottom: 8,
  },
  serviceText: {
    fontSize: 11,
    color: '#333',
  },
  newBadge: {
    position: 'absolute',
    top: -5,
    right: 10,
    backgroundColor: '#FF4444',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  newText: {
    fontSize: 8,
    color: 'white',
    fontWeight: 'bold',
  },
  promotionCards: {
    margin: 15,
  },
  promotionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  promotionIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  promotionText: {
    flex: 1,
    fontSize: 15,
    color: '#1D1D1F',
    fontWeight: '500',
    lineHeight: 20,
  },
  promotionArrow: {
    fontSize: 16,
    color: '#C7C7CC',
    fontWeight: '600',
  },
  gameBanner: {
    margin: 15,
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  gameBannerContent: {
    flex: 1,
  },
  gameBannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  gameBannerButton: {
    backgroundColor: '#FF8A50',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
  gameBannerButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  gameWheelContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameWheel: {
    fontSize: 50,
  },
  gameWheelDecor: {
    position: 'absolute',
    fontSize: 20,
    top: -10,
    right: -10,
  },
  wealthSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.9)',
    margin: 15,
    padding: 15,
    borderRadius: 12,
  },
  wealthTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  wealthArrow: {
    fontSize: 16,
    color: '#999',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navItemActive: {
    // Active state styling
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  navText: {
    fontSize: 10,
    color: '#666',
  },
  navTextActive: {
    color: '#00C896',
  },
  // SVG图标样式
  iconSvg: {
    // 顶部工具栏SVG图标样式
  },
  searchIcon: {
    marginRight: 8,
    // 搜索SVG图标样式
  },
  voiceIcon: {
    marginLeft: 'auto',
    // 语音SVG图标样式
  },
  voiceIconText: {
    marginLeft: 'auto',
    fontSize: 16,
    // 语音emoji图标样式
  },
  gridIconSvg: {
    // 主功能网格SVG图标样式
  },
  serviceIconSvg: {
    marginBottom: 8,
    // 服务功能SVG图标样式
  },
  promotionIconSvg: {
    marginRight: 14,
    width: 28,
    height: 28,
    // 推广卡片SVG图标样式
  },
  gameWheelSvg: {
    // 游戏转盘SVG图标样式
  },
  navIconSvg: {
    marginBottom: 4,
    // 底部导航SVG图标样式
  },
  lotteryWheelBanner: {
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lotteryWheelIcon: {
    // 抽奖转盘图标样式
  },
});

export default App;