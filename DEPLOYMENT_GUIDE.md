# 中国农业银行App - 部署指南

## 项目概述
这是一个完整的农业银行移动应用，包含交易记录管理功能，支持多平台部署。

## 功能特性
- ✅ 银行首页界面 (农业主题设计)
- ✅ 收支查询和筛选
- ✅ 交易记录管理 (增删改查)
- ✅ 本地数据存储 (AsyncStorage)
- ✅ Web端完整对应
- ✅ 响应式设计

## 平台支持

### 1. Android部署 (Windows可直接构建)
```bash
# 开发模式运行
npx react-native run-android

# 生成APK
cd android
./gradlew assembleRelease
```

### 2. iOS部署 (需要macOS或云服务)
由于Windows无法直接构建iOS应用，推荐以下方案：

#### 方案A: GitHub Actions (推荐)
1. 将代码推送到GitHub
2. GitHub Actions会自动构建iOS应用
3. 下载构建好的IPA文件

#### 方案B: 云端macOS服务
- MacinCloud: https://www.macincloud.com/
- MacStadium: https://www.macstadium.com/
- 按小时付费，远程连接macOS进行构建

#### 方案C: EAS Build (Expo)
```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform ios
```

### 3. Web部署
Web版本可直接部署到任何Web服务器：

```bash
# 本地运行
cd web
python -m http.server 8000
# 或
npx serve web

# 部署到Netlify/Vercel
# 只需上传web文件夹内容
```

## 快速开始

### 环境要求
- Node.js 18+
- React Native CLI
- Android Studio (Android部署)
- Xcode (iOS部署，需要macOS)

### 安装依赖
```bash
npm install
```

### Android开发
```bash
npx react-native run-android
```

### iOS开发 (需要macOS)
```bash
cd ios
pod install
cd ..
npx react-native run-ios
```

## 数据存储
- **React Native**: AsyncStorage
- **Web**: localStorage
- **存储键**: `'transactions'`
- **数据格式**:
```json
{
  "id": "string",
  "date": "YYYY-MM-DD",
  "type": "income|expense",
  "category": "string",
  "amount": "number",
  "description": "string"
}
```

## 项目结构
```
H:\Agricultural Bank of China\
├── components/                 # React Native组件
│   ├── IncomeExpenseScreen.tsx # 收支页面
│   ├── TransactionManagerScreen.tsx # 交易管理
│   └── SvgIcon.tsx            # SVG图标组件
├── web/                       # Web版本
│   ├── ios-style.html         # 主页
│   ├── income-expense.html    # 收支页面
│   └── transaction-manager.html # 交易管理
├── assets/                    # 资源文件
│   └── icons/svg/             # SVG图标
├── ios/                       # iOS项目文件
├── android/                   # Android项目文件
└── .github/workflows/         # CI/CD配置
```

## 发布清单

### App Store发布 (iOS)
- [ ] Apple Developer账户 ($99/年)
- [ ] 应用图标 (多种尺寸)
- [ ] 启动画面
- [ ] 隐私政策
- [ ] 应用描述和截图

### Google Play发布 (Android)
- [ ] Google Play Developer账户 ($25一次性)
- [ ] 应用图标和截图
- [ ] 应用描述
- [ ] 隐私政策

### Web部署
- [ ] 域名 (可选)
- [ ] SSL证书
- [ ] Web服务器或静态托管服务

## 支持的云服务

### 构建服务
- GitHub Actions (免费，推荐)
- Bitrise
- Microsoft App Center
- EAS Build (Expo)

### 部署服务
- Netlify (Web)
- Vercel (Web)
- Firebase Hosting (Web)
- TestFlight (iOS测试)
- Google Play Console (Android)

## 故障排除

### 常见问题
1. **iOS构建失败**: 确保在macOS环境或使用云服务
2. **依赖安装问题**: 删除node_modules重新安装
3. **图标显示问题**: 检查SVG文件路径
4. **数据不同步**: 确保使用相同的localStorage键

### 调试命令
```bash
# 清理缓存
npx react-native start --reset-cache

# Android日志
adb logcat

# iOS模拟器
npx react-native log-ios
```

## 联系信息
如需技术支持或有疑问，请查看项目文档或提交Issue。

---

**项目状态**: ✅ 开发完成，准备部署
**最后更新**: 2025年9月26日