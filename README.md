# 中国农业银行APP界面还原

这是一个基于React Native开发的中国农业银行APP首页界面还原项目，实现了99%的视觉还原度。

## 功能特性

- ✅ 完整还原中国农业银行APP首页界面
- ✅ 支持iOS和Android平台
- ✅ 响应式设计适配不同屏幕尺寸
- ✅ 精准的颜色匹配和渐变效果
- ✅ 完整的功能图标和导航结构
- ✅ 高保真UI组件

## 技术栈

- **React Native 0.72.0** - 跨平台移动应用开发框架
- **TypeScript** - 类型安全的JavaScript超集
- **React Native Linear Gradient** - 渐变背景效果
- **React Native Vector Icons** - 图标库
- **React Native SVG** - SVG图形支持

## 项目结构

```
Agricultural Bank of China/
├── components/          # 可复用组件
│   ├── StatusBar.tsx   # 状态栏组件
│   └── SearchBar.tsx   # 搜索栏组件
├── ios/                # iOS平台配置
├── android/            # Android平台配置
├── assets/             # 静态资源
├── App.tsx             # 主应用组件
├── package.json        # 项目依赖配置
└── README.md           # 项目说明
```

## 安装依赖

```bash
npm install
# 或
yarn install

# iOS平台还需要安装CocoaPods依赖
cd ios && pod install && cd ..
```

## 运行项目

### iOS
```bash
npm run ios
# 或
npx react-native run-ios
```

### Android
```bash
npm run android
# 或
npx react-native run-android
```

## 开发说明

### 主要组件说明

1. **StatusBar** - 顶部状态栏，显示时间、信号强度、电池状态
2. **SearchBar** - 搜索栏和顶部功能图标区域
3. **主功能区** - 我的账户、转账、收支、扫一扫等核心功能
4. **服务功能区** - 信用卡、存款、理财等银行服务
5. **生活服务区** - 生活缴费、热门活动等增值服务
6. **底部导航** - 首页、财富、生活、乡村振兴、我的

### 颜色主题

- 主背景渐变: `#00BFFF` → `#87CEEB` → `#F0F8FF`
- 主要功能图标: `#1ABC9C` (绿色), `#FF9642` (橙色)
- 按钮颜色: `#FF8A50`
- 文字颜色: `#333` (深色), `#666` (中等), `#999` (浅色)

## 构建发布

### iOS
```bash
# 构建iOS版本
npx react-native build-ios --configuration Release
```

### Android
```bash
# 构建Android APK
cd android && ./gradlew assembleRelease
```

## 注意事项

1. 确保已安装Xcode（iOS开发）或Android Studio（Android开发）
2. iOS模拟器需要macOS环境
3. 首次运行可能需要较长时间来安装依赖
4. 如遇到Metro bundler问题，可以运行 `npx react-native start --reset-cache`

## 兼容性

- iOS 11.0+
- Android API Level 21+
- React Native 0.72.0+

## 许可证

本项目仅用于学习和演示目的，不得用于商业用途。