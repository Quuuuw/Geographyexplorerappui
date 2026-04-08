# 项目架构说明 🏗️

## 📁 项目结构

```
地理探险家/
├── src/
│   ├── app/
│   │   ├── components/          # 可复用组件
│   │   │   ├── figma/          # Figma相关组件
│   │   │   ├── ui/             # UI基础组件库
│   │   │   ├── Layout.tsx      # 主布局组件
│   │   │   └── WelcomeScreen.tsx # 欢迎屏幕
│   │   ├── data/               # 数据层
│   │   │   └── mockData.ts     # 模拟数据
│   │   ├── pages/              # 页面组件
│   │   │   ├── MapExplore.tsx  # 地图探索页
│   │   │   ├── LevelMap.tsx    # 闯关地图页
│   │   │   ├── Filter.tsx      # 筛选页
│   │   │   ├── Profile.tsx     # 个人中心页
│   │   │   ├── Quiz.tsx        # 答题页
│   │   │   ├── QuizResult.tsx  # 结算页
│   │   │   └── DailyChallenge.tsx # 每日挑战页
│   │   ├── types/              # 类型定义
│   │   │   └── index.ts        # TypeScript接口
│   │   ├── App.tsx             # 应用入口
│   │   └── routes.tsx          # 路由配置
│   └── styles/                 # 样式文件
│       ├── fonts.css           # 字体样式
│       ├── index.css           # 全局样式
│       ├── tailwind.css        # Tailwind配置
│       └── theme.css           # 主题变量
├── package.json                # 依赖配置
├── vite.config.ts             # Vite配置
├── README.md                   # 项目说明
└── USER_GUIDE.md              # 用户指南
```

## 🔧 技术架构

### 前端框架
- **React 18.3.1**: 现代化的UI框架
- **TypeScript**: 类型安全的JavaScript超集
- **Vite 6.3.5**: 快速的构建工具

### 路由管理
- **React Router 7**: 单页应用路由
- 使用 Data Router 模式
- 支持嵌套路由和布局

### 状态管理
- React Hooks (useState, useEffect)
- URL参数传递状态
- Session Storage存储

### 样式方案
- **Tailwind CSS v4**: 实用优先的CSS框架
- **Radix UI**: 无样式的可访问组件
- CSS变量主题系统

### 动画库
- **Motion (Framer Motion)**: 声明式动画
- **Canvas Confetti**: 彩纸庆祝效果

### UI组件
- **Lucide React**: 现代化图标库
- **Radix UI**: 可访问的基础组件

## 📊 数据流

```
用户交互
    ↓
组件事件处理
    ↓
状态更新/路由跳转
    ↓
UI重新渲染
    ↓
动画反馈
```

## 🎨 组件设计

### Layout组件
- 包装所有主页面
- 提供底部TabBar导航
- 管理当前路由高亮

### 页面组件
每个页面都是独立的功能模块：
- 独立的状态管理
- 完整的UI逻辑
- 动画和交互效果

### UI组件库
基于Radix UI构建：
- Button: 按钮组件
- Card: 卡片容器
- Progress: 进度条
- Slider: 滑块
- Modal/Dialog: 弹窗

## 🔄 路由结构

```
/                           # Layout包装
├── /                       # 地图探索 (MapExplore)
├── /levels                 # 闯关地图 (LevelMap)
├── /filter                 # 筛选设置 (Filter)
└── /profile                # 个人中心 (Profile)

/quiz/:regionId             # 答题页面 (Quiz)
/summary/:regionId          # 结算页面 (QuizResult)
/daily-challenge            # 每日挑战 (DailyChallenge)
```

## 💾 数据模型

### Region (地区)
```typescript
interface Region {
  id: string;              // 地区ID
  name: string;            // 地区名称
  completion: number;      // 完成度 (0-100)
  isUnlocked: boolean;     // 是否解锁
  description: string;     // 描述
  totalQuestions: number;  // 总题数
  correctAnswers: number;  // 答对题数
  x: number;              // 地图X坐标
  y: number;              // 地图Y坐标
}
```

### Question (题目)
```typescript
interface Question {
  id: string;              // 题目ID
  question: string;        // 题目内容
  options: QuestionOption[];  // 选项列表
  correctAnswer: string;   // 正确答案ID
  explanation: string;     // 知识解析
  funFact?: string;        // 趣味知识
  image?: string;          // 题目图片
  difficulty: 1|2|3|4|5;  // 难度等级
  region: string;          // 所属地区
}
```

### UserProfile (用户信息)
```typescript
interface UserProfile {
  nickname: string;        // 昵称
  avatar: string;          // 头像
  totalQuestions: number;  // 总答题数
  accuracy: number;        // 正确率
  consecutiveDays: number; // 连续天数
  achievements: Achievement[]; // 成就列表
  level: number;           // 等级
  experience: number;      // 经验值
}
```

## 🎯 核心功能实现

### 1. 地图交互
- SVG绘制中国地图轮廓
- 动态定位地区标记
- 悬停和点击交互
- 完成度可视化

### 2. 答题流程
```
选择地区 → 开始答题 → 选择答案 → 提交 
    → 查看反馈 → 下一题 → ... → 结算
```

### 3. 动画系统
- 页面进入/退出动画
- 元素渐显/缩放动画
- 交互反馈动画
- 成功庆祝动画

### 4. 筛选系统
- 多维度筛选条件
- 实时预览筛选结果
- 保存用户偏好

## 🔐 数据安全

当前版本使用模拟数据，未来版本可以：
- 集成后端API
- 用户认证系统
- 数据加密传输
- 本地缓存机制

## 📈 性能优化

### 已实现
- 组件按需加载
- 动画性能优化
- 图片懒加载准备
- 路由代码分割

### 可优化项
- 虚拟滚动（长列表）
- 图片压缩和CDN
- 状态持久化
- PWA支持

## 🎨 主题系统

使用CSS变量实现：
```css
:root {
  --color-primary: #4A90E2;
  --color-success: #50C878;
  --color-warning: #F5A623;
  --color-background: #F5F7FA;
  /* ... 更多变量 */
}
```

支持：
- 亮色/暗色主题
- 自定义配色方案
- 统一的设计令牌

## 🔄 状态管理策略

### 组件内状态
- 使用 useState 管理
- 适用于局部UI状态

### 跨组件状态
- URL参数传递
- React Router state
- Session Storage

### 全局状态（未来）
- Context API
- 或集成状态管理库

## 🧪 测试策略（建议）

### 单元测试
- 工具函数测试
- 组件渲染测试
- 状态逻辑测试

### 集成测试
- 页面交互测试
- 路由导航测试
- 数据流测试

### E2E测试
- 完整用户流程
- 跨页面交互
- 性能测试

## 📱 响应式设计

### 断点设计
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### 适配策略
- Tailwind响应式类
- 弹性布局（Flexbox/Grid）
- 相对单位（rem/em/%）

## 🚀 部署方案

### 构建
```bash
npm run build
```

### 部署平台
- Vercel
- Netlify
- GitHub Pages
- 自建服务器

## 📝 开发规范

### 命名规范
- 组件：PascalCase
- 函数：camelCase
- 常量：UPPER_SNAKE_CASE
- 文件：kebab-case.tsx

### 代码组织
- 一个文件一个组件
- 相关功能分组
- 清晰的文件夹结构

### 类型定义
- 集中在 types/index.ts
- 导出共用接口
- 严格的类型检查

## 🔧 配置文件

### package.json
- 依赖管理
- 脚本命令
- 项目元信息

### vite.config.ts
- 构建配置
- 插件设置
- 路径别名

### tailwind.config.js
- Tailwind v4配置
- 使用 @import 方式

## 🎯 最佳实践

1. **组件设计**
   - 单一职责原则
   - 可复用性优先
   - Props类型明确

2. **性能优化**
   - 避免不必要的重渲染
   - 合理使用 memo/useMemo
   - 懒加载大组件

3. **代码质量**
   - TypeScript严格模式
   - 清晰的注释
   - 统一的代码风格

4. **用户体验**
   - 加载状态提示
   - 错误边界处理
   - 流畅的动画过渡

---

**架构设计原则**: 模块化、可扩展、易维护
