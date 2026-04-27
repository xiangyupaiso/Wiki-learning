# 虚拟实验室 - 技术规格文档

## 组件清单

### shadcn/ui 组件
- `button` - 按钮
- `card` - 卡片
- `badge` - 标签
- `tooltip` - 工具提示
- `tabs` - 标签页
- `progress` - 进度条
- `scroll-area` - 滚动区域
- `separator` - 分隔线

### 自定义组件

| 组件名 | 用途 | 位置 |
|--------|------|------|
| `HomePage` | 首页标题页 | `src/pages/HomePage.tsx` |
| `CatalogPage` | 实验目录页 | `src/pages/CatalogPage.tsx` |
| `ExperimentPage` | 实验操作主页面 | `src/pages/ExperimentPage.tsx` |
| `StepIndicator` | 步骤进度指示器 | `src/components/StepIndicator.tsx` |
| `LabWorkbench` | 超净台/实验台视图 | `src/components/LabWorkbench.tsx` |
| `LabItem` | 可交互实验器材 | `src/components/LabItem.tsx` |
| `HighlightOverlay` | 高亮提示覆盖层 | `src/components/HighlightOverlay.tsx` |
| `InfoPanel` | 信息面板 | `src/components/InfoPanel.tsx` |
| `AnimationOverlay` | 动画效果覆盖层 | `src/components/AnimationOverlay.tsx` |

### 自定义 Hooks

| Hook名 | 用途 | 位置 |
|--------|------|------|
| `useExperiment` | 实验状态管理 | `src/hooks/useExperiment.ts` |
| `useAnimation` | 动画控制 | `src/hooks/useAnimation.ts` |
| `useHighlight` | 高亮提示控制 | `src/hooks/useHighlight.ts` |

## 动画实现方案

| 动画 | 库 | 实现方式 | 复杂度 |
|------|-----|----------|--------|
| 页面过渡 | Framer Motion | AnimatePresence + motion.div | 中 |
| 高亮脉冲 | CSS + Tailwind | @keyframes + animate- | 低 |
| 器材移动 | Framer Motion | motion.div + layoutId | 中 |
| 点击反馈 | Framer Motion | whileTap + scale | 低 |
| 步骤切换 | Framer Motion | AnimatePresence + variants | 中 |
| 成功勾选 | Framer Motion | scale + rotate 动画 | 低 |
| 火焰效果 | CSS | 渐变 + 闪烁动画 | 低 |
| 时间流逝 | CSS | 进度条动画 | 低 |

## 项目结构

```
src/
├── pages/
│   ├── HomePage.tsx        # 首页
│   ├── CatalogPage.tsx     # 实验目录
│   └── ExperimentPage.tsx  # 实验操作界面
├── components/
│   ├── StepIndicator.tsx   # 步骤指示器
│   ├── LabWorkbench.tsx    # 实验台视图
│   ├── LabItem.tsx         # 实验器材组件
│   ├── HighlightOverlay.tsx # 高亮覆盖层
│   ├── InfoPanel.tsx       # 信息面板
│   ├── AnimationOverlay.tsx # 动画层
│   └── Navigation.tsx      # 导航栏
├── hooks/
│   ├── useExperiment.ts    # 实验状态
│   └── useAnimation.ts     # 动画控制
├── data/
│   └── experiments.ts      # 实验数据
├── types/
│   └── index.ts            # TypeScript类型
├── App.tsx
└── main.tsx
```

## 依赖安装

```bash
# 动画库
npm install framer-motion

# 图标库
npm install lucide-react
```

## 状态管理

使用 React Context + useReducer 管理实验状态:

```typescript
interface ExperimentState {
  currentStep: number;
  totalSteps: number;
  completedSteps: number[];
  isAnimating: boolean;
  currentView: 'hood' | 'bench';
}
```

## 关键交互逻辑

### 步骤推进流程

1. 当前步骤显示高亮提示（脉冲黄光）
2. 用户点击高亮器材
3. 触发操作动画
4. 动画完成后:
   - 标记当前步骤完成
   - 延迟 500ms
   - 自动进入下一步
   - 更新高亮提示位置

### 高亮提示系统

```typescript
interface HighlightConfig {
  targetId: string;      // 目标器材ID
  type: 'pulse' | 'glow' | 'bounce';
  message?: string;      // 提示文字
}
```

使用 CSS 实现脉冲效果:
```css
.highlight-pulse {
  animation: pulse-glow 2s ease-in-out infinite;
  box-shadow: 0 0 20px rgba(251, 191, 36, 0.6);
  border: 2px solid rgba(251, 191, 36, 0.8);
}
```

## 响应式设计

- 桌面端: 完整三栏布局
- 平板: 折叠信息面板
- 手机: 单栏，底部步骤条
