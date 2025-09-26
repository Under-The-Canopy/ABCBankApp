@echo off
echo ==========================================
echo   iOS构建助手 (Windows版)
echo ==========================================
echo.

echo 选择构建方式:
echo 1. GitHub Actions (推荐，免费)
echo 2. EAS Build (Expo在线构建)
echo 3. 打开构建指南
echo.

set /p choice="请输入选择 (1-3): "

if "%choice%"=="1" goto github
if "%choice%"=="2" goto eas
if "%choice%"=="3" goto guide
goto end

:github
echo.
echo 🚀 开始GitHub Actions构建...
echo.

REM 检查是否有Git
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ 错误: 请先安装Git
    echo 下载地址: https://git-scm.com/download/win
    goto end
)

REM 检查是否在Git仓库中
if not exist ".git" (
    echo 📦 初始化Git仓库...
    git init
    git add .
    git commit -m "Initial commit for iOS build"
)

echo ✅ 已配置GitHub Actions构建文件
echo.
echo 📋 下一步操作:
echo 1. 在GitHub创建新仓库
echo 2. 运行: git remote add origin https://github.com/你的用户名/仓库名.git
echo 3. 运行: git push -u origin main
echo 4. 在GitHub Actions页面查看构建进度
echo.
echo 💡 构建完成后，在Actions页面下载构建产物
goto end

:eas
echo.
echo 🔧 开始EAS Build构建...
echo.

REM 检查Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ 错误: 请先安装Node.js
    echo 下载地址: https://nodejs.org/
    goto end
)

echo 📦 安装EAS CLI...
call npm install -g eas-cli

echo 🔐 请登录Expo账户...
call eas login

echo 🏗️ 配置构建...
call eas build:configure

echo 🚀 开始iOS构建...
call eas build --platform ios --profile preview

goto end

:guide
echo.
echo 📖 打开详细构建指南...
start "" "https://docs.expo.dev/build/setup/"
goto end

:end
echo.
pause