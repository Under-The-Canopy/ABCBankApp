# iOS 打包指南

## 项目状态
✅ React Native项目已配置
✅ iOS文件夹已存在
✅ Podfile已配置
✅ 交易管理功能已完成
✅ Web端功能已完成

## 方案一：使用GitHub Actions云端打包 (推荐)

### 1. 创建GitHub仓库并上传代码

### 2. 在项目根目录创建 `.github/workflows/ios.yml`：
```yaml
name: iOS Build

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  ios-build:
    runs-on: macos-latest

    steps:
    - uses: actions/checkout@v4

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: npm install

    - name: Install CocoaPods
      run: |
        cd ios
        pod install

    - name: Build iOS
      run: |
        cd ios
        xcodebuild -workspace ABCBankApp.xcworkspace \
                   -scheme ABCBankApp \
                   -configuration Release \
                   -destination 'generic/platform=iOS Simulator' \
                   -archivePath ./ABCBankApp.xcarchive \
                   archive
```

## 方案二：使用Expo EAS Build

### 1. 安装EAS CLI：
```bash
npm install -g eas-cli
```

### 2. 登录或创建Expo账户：
```bash
eas login
```

### 3. 初始化EAS配置：
```bash
eas build:configure
```

### 4. 开始构建：
```bash
eas build --platform ios
```

## 方案三：MacinCloud 云端macOS

### 1. 注册MacinCloud账户
- 访问 https://www.macincloud.com/
- 选择按小时付费的方案

### 2. 连接到云端Mac：
- 使用远程桌面连接
- 安装Xcode
- Clone你的项目

### 3. 在云端Mac上构建：
```bash
cd your-project
npm install
cd ios
pod install
cd ..
npx react-native run-ios
```

## 方案四：Microsoft App Center

### 1. 创建App Center账户
- 访问 https://appcenter.ms/

### 2. 创建新应用：
- 选择iOS平台
- 选择React Native

### 3. 连接代码仓库并配置构建

## 准备工作清单

### 需要的文件和配置：
- [x] iOS Developer Account (如果要发布到App Store)
- [x] Provisioning Profile
- [x] Signing Certificate
- [x] App图标 (各种尺寸)
- [x] Launch Screen

### 当前项目已具备：
- [x] React Native 0.72.0
- [x] TypeScript配置
- [x] 所有必要依赖已安装
- [x] iOS项目文件夹
- [x] Podfile配置

## 推荐步骤 (GitHub Actions)

1. **创建GitHub仓库**：
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/ABCBankApp.git
git push -u origin main
```

2. **添加iOS构建Workflow**：
   - 创建 `.github/workflows/ios.yml` 文件
   - 推送到GitHub

3. **配置证书和密钥**：
   - 在GitHub Settings > Secrets中添加iOS签名证书
   - 添加Provisioning Profile

4. **触发构建**：
   - 推送代码到main分支
   - GitHub Actions会自动开始构建

## 注意事项

- 构建iOS应用需要Apple Developer Account ($99/年)
- 首次构建可能需要30-60分钟
- 确保所有依赖都已正确安装
- 图标和启动画面需要符合Apple规范

## 项目当前状态总结

🎯 **功能完整性**：
- ✅ 首页银行界面
- ✅ 收支查询页面
- ✅ 交易记录管理 (增删改查)
- ✅ 本地数据存储 (AsyncStorage)
- ✅ Web版本完全对应

🔧 **技术栈**：
- React Native 0.72.0
- TypeScript
- AsyncStorage (本地数据库)
- React Native Vector Icons
- React Native Linear Gradient
- React Native SVG

📱 **平台支持**：
- ✅ Android (可直接在Windows上构建)
- ⏳ iOS (需要macOS环境或云端构建)
- ✅ Web (已完成，可直接部署)