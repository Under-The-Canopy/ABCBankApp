# Windows上iOS打包完整指南

## ⚡ 快速开始

### 最简单方式：运行自动化脚本
```bash
# 双击运行
build-ios-windows.bat
```

## 🎯 推荐方案对比

| 方案 | 成本 | 时间 | 难度 | 推荐指数 |
|------|------|------|------|----------|
| GitHub Actions | 免费 | 15-30分钟 | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| EAS Build | 免费/付费 | 10-20分钟 | ⭐ | ⭐⭐⭐⭐ |
| MacinCloud | $1-2/小时 | 30分钟+ | ⭐⭐⭐ | ⭐⭐⭐ |

## 方案1: GitHub Actions (推荐)

### 优势
- ✅ 完全免费（公开仓库）
- ✅ 自动化构建
- ✅ 可重复执行
- ✅ 构建历史记录

### 详细步骤

#### 1. 上传代码到GitHub
```bash
# 初始化Git（如果还没有）
git init
git add .
git commit -m "Initial iOS build setup"

# 创建GitHub仓库后
git remote add origin https://github.com/你的用户名/ABCBankApp.git
git push -u origin main
```

#### 2. 等待自动构建
- 代码推送后，GitHub Actions会自动开始构建
- 访问仓库页面 → Actions 查看进度
- 构建时间约15-30分钟

#### 3. 下载构建产物
- 构建完成后，点击构建任务
- 在Artifacts部分下载：
  - `ABCBankApp.xcarchive` (真机版本)
  - `ABCBankApp-Simulator.zip` (模拟器版本)

## 方案2: EAS Build

### 优势
- ✅ 操作最简单
- ✅ 专业的移动应用构建服务
- ✅ 支持多平台

### 详细步骤

#### 1. 安装工具
```bash
npm install -g eas-cli @expo/cli
```

#### 2. 登录Expo
```bash
eas login
# 注册账户: https://expo.dev/
```

#### 3. 配置项目
```bash
eas build:configure
```

#### 4. 开始构建
```bash
# 构建iOS应用
eas build --platform ios

# 查看构建状态
eas build:list
```

#### 5. 下载应用
- 构建完成后会收到邮件通知
- 或在Expo网站查看构建结果并下载

## 方案3: MacinCloud云服务

### 适用场景
- 需要频繁构建
- 需要完整的Xcode环境
- 预算充足

### 操作步骤
1. 注册MacinCloud账户
2. 租用macOS虚拟机
3. 上传项目文件
4. 按标准Mac流程构建

## 🔧 故障排除

### 常见问题

#### 1. GitHub Actions构建失败
```bash
# 检查构建日志中的错误信息
# 通常是依赖问题，已在配置中处理
```

#### 2. EAS构建失败
```bash
# 检查app.json配置
# 确保Bundle ID唯一
```

#### 3. 无法安装到设备
- iOS设备需要信任开发者证书
- 使用TestFlight进行分发

## 📱 安装到iPhone

### 方法1: 使用第三方工具
- **3uTools**: Windows上的iOS设备管理工具
- **iMazing**: 专业的iOS设备管理

### 方法2: 使用AltStore
1. 下载AltStore到Windows和iPhone
2. 通过WiFi连接安装IPA文件

### 方法3: TestFlight (需要开发者账户)
1. 上传到App Store Connect
2. 通过TestFlight分发测试

## 🚀 自动化构建脚本使用

### Windows批处理脚本
```bash
# 双击运行
build-ios-windows.bat

# 或命令行运行
.\build-ios-windows.bat
```

### PowerShell脚本 (高级)
```powershell
# 执行策略设置
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# 运行构建脚本
.\build-ios.ps1
```

## 📊 构建时间预估

| 构建方式 | 首次构建 | 后续构建 | 并发限制 |
|----------|----------|----------|----------|
| GitHub Actions | 25-40分钟 | 15-25分钟 | 20个任务 |
| EAS Build | 15-25分钟 | 10-20分钟 | 取决于套餐 |
| MacinCloud | 20-30分钟 | 10-15分钟 | 无限制 |

## ✅ 成功标志

构建成功后你会得到：
- 📱 `.ipa` 文件 (可安装到iPhone)
- 📁 `.xcarchive` 文件 (Xcode归档)
- 📋 构建日志和报告

## 💡 最佳实践

1. **推荐使用GitHub Actions**
   - 免费且稳定
   - 自动化程度高
   - 适合长期维护

2. **备选EAS Build**
   - 操作更简单
   - 构建速度更快
   - 适合快速原型

3. **MacinCloud作为备选**
   - 需要完整Xcode功能时使用
   - 适合复杂项目调试

## 📞 技术支持

遇到问题时的检查顺序：
1. 检查网络连接
2. 确认Node.js版本 (推荐18+)
3. 查看构建日志
4. 检查项目配置文件
5. 尝试清理缓存重新构建

---

🎯 **目标**: 30分钟内完成iOS应用构建和下载
📱 **结果**: 可在iPhone上运行的完整银行应用