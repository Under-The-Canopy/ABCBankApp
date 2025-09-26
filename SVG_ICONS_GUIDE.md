# SVG图标替换指南

## 📁 文件夹结构

已为您创建以下文件夹结构：
```
assets/
└── icons/
    └── svg/
        └── README.md  (包含所需图标列表)
```

## 🎯 需要的SVG图标文件

请将您的SVG图标文件按以下命名保存到 `assets/icons/svg/` 文件夹中：

### 顶部工具栏图标
- `lottery.svg` - 抽奖图标
- `search.svg` - 搜索图标
- `voice.svg` - 语音图标
- `version.svg` - 版本图标
- `customer-service.svg` - 客服图标
- `message.svg` - 消息图标

### 主要功能图标
- `account.svg` - 我的账户
- `transfer.svg` - 转账
- `income-expense.svg` - 收支
- `scan.svg` - 扫一扫

### 服务功能图标
- `credit-card.svg` - 信用卡
- `retirement-community.svg` - 养老社区
- `deposit.svg` - 存款
- `financial-product.svg` - 理财产品
- `loan.svg` - 贷款

### 生活服务图标
- `bill-payment.svg` - 生活缴费
- `hot-activity.svg` - 热门活动
- `game-park.svg` - 小豆乐园
- `city-zone.svg` - 城市专区
- `more.svg` - 全部

### 推广卡片图标
- `smart-reminder.svg` - 智能提醒
- `news.svg` - 新闻

### 游戏横幅图标
- `lottery-wheel.svg` - 抽奖转盘
- `drink.svg` - 饮料装饰

### 底部导航图标
- `home.svg` - 首页
- `wealth.svg` - 财富
- `life.svg` - 生活
- `rural-revitalization.svg` - 乡村振兴
- `profile.svg` - 我的

### 状态栏图标
- `battery.svg` - 电池图标

### 特殊装饰图标
- `gift-box.svg` - 礼品盒
- `sparkle.svg` - 闪光特效

## 🔧 安装必要的依赖

要使用SVG图标，需要安装以下依赖：

```bash
npm install react-native-svg
# iOS 需要额外步骤
cd ios && pod install
```

## 💻 激活SVG图标

### 步骤1: 更新SvgIcon组件

1. 打开 `components/SvgIcon.tsx`
2. 取消注释 SvgXml 的导入行：
   ```typescript
   import { SvgXml } from 'react-native-svg';
   ```

### 步骤2: 添加您的SVG内容

有两种方法添加SVG图标：

#### 方法A: 直接嵌入SVG内容（推荐用于少量图标）
在 `SvgIcon.tsx` 的 `svgIcons` 对象中，将占位符注释替换为实际的SVG内容：

```typescript
const svgIcons: { [key: string]: string } = {
  lottery: '<svg width="24" height="24" viewBox="0 0 24 24">...</svg>',
  search: '<svg width="24" height="24" viewBox="0 0 24 24">...</svg>',
  // ... 其他图标
};
```

#### 方法B: 从文件导入（推荐用于大量图标）
```typescript
import LotterySvg from '../assets/icons/svg/lottery.svg';
// 使用require导入
const svgIcons: { [key: string]: any } = {
  lottery: LotterySvg,
  // ... 其他图标
};
```

### 步骤3: 激活SVG渲染

在 `SvgIcon.tsx` 中，取消注释SVG渲染代码：

```typescript
return (
  <SvgXml
    xml={svgContent}
    width={size}
    height={size}
    fill={color}
    style={style}
  />
);
```

并注释掉临时占位符代码：

```typescript
// return (
//   <View style={[{ width: size, height: size, backgroundColor: '#ddd' }, style]}>
//     {/* SVG 占位符 */}
//   </View>
// );
```

### 步骤4: 隐藏Emoji图标（可选）

在 `App.tsx` 中，您可以通过添加 `display: 'none'` 样式来隐藏emoji备选图标：

```typescript
// 例如，在样式中添加：
iconText: {
  fontSize: 20,
  marginBottom: 2,
  display: 'none', // 隐藏emoji
},
```

## 🎨 自定义样式

每个图标位置都有对应的样式类，您可以在 `App.tsx` 的样式表中自定义：

```typescript
// SVG图标样式
batteryIcon: {
  // 自定义电池图标样式
},
iconSvg: {
  // 自定义顶部工具栏图标样式
},
gridIconSvg: {
  // 自定义主功能网格图标样式
},
// ... 其他样式类
```

## 🔍 当前状态

- ✅ 文件夹结构已创建
- ✅ SvgIcon组件已创建
- ✅ 所有图标位置已在App.tsx中标记
- ✅ 样式类已准备就绪
- ⏳ 需要您添加SVG文件并激活组件

## 📝 注意事项

1. **备选方案**: 现在emoji图标和SVG图标并存，您可以逐步替换
2. **尺寸**: 每个SVG图标的尺寸已根据原设计预设
3. **颜色**: 可以通过 `color` 属性动态设置图标颜色
4. **样式**: 每个图标都有对应的样式类可供自定义

## 🚀 完成替换后

替换完所有图标后，您可以：
1. 删除不需要的emoji文本组件
2. 清理相关的注释
3. 调整样式以获得最佳视觉效果