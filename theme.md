# 深色和浅色主题

## 通用属性

```css
:root {
  /* 字体大小 */
  /* 正标题 */
  --font-size-title: ??;
  /** 副标题 */
  --font-size-sub-title: ??;
  /** 正文 */
  --font-size-regular: ??;

  /** 圆角大小 */
  --border-radius: ??;
  --border-radius-small: ??;
  --border-radius-large: ??;
}
```

## 浅色主题

```css
:root {
  /* 背景色, 对于浅色背景, bg-color应当是最黑的, bg-color-layer-1, 2, 3则越来越浅. 对于深色背景, 相反. */
  --bg-color: ??;
  /** 一层背景色 */
  --bg-color-layer-1: ??;
  /** 二层背景色 */
  --bg-color-layer-2: ??;
  /** 三层背景色 */
  --bg-color-layer-3: ??;

  /** 文字颜色 */
  --font-color: ??;
  /** 占位符文字颜色, 表单组件使用 */
  --font-color-placeholder: ??;
  /** 标题文字颜色 */
  --font-color-title: ??;

  /** 边框颜色 */
  --border-color: ??;
  /** 边框颜色:强调, 和默认边框颜色比, 对于浅色主题其更深, 深色主题其更浅 */
  --border-color-heavy: ??;
  /** 边框颜色:忽略, 和默认边框颜色比, 对于浅色主题其更浅, 深色主题其更深 */
  --border-color-light: ??;

  /** 阴影颜色 */
  --shadow-color: ??;

  /**
   * 辅助色以及辅助色混合色
   * 辅助深色用于比如按钮, 按下的颜色以及浮动的显示颜色会比按钮本身的颜色深(混合深色)
   * 辅助浅色用于颜色反转, 比如按钮的幽灵模式, 按钮的disable状态
   */

  /** 主色 */
  --primary-color: ??;
  /** (90%主色)混合(10%白色) */
  --primary-color-light-1: ??;
  /** (70%主色)混合(30%白色) */
  --primary-color-light-3: ??;
  /** (10%主色)混合(90%白色) */
  --primary-color-light-9: ??;
  /** (90%主色)混合(10%黑色) */
  --primary-color-dark-1: ??;
  /** (70%主色)混合(30%黑色) */
  --primary-color-dark-3: ??;
  /** (10%主色)混合(90%黑色) */
  --primary-color-dark-9: ??;

  /** 成功色 */
  --success-color: ??;
  /** 以及成功的深浅混合色, 同上规则 */
  /* ... */

  /** 信息色 */
  --info-color: ??;
  /** 以及信息的深浅混合色, 同上规则 */
  /* ... */

  /** 警告 */
  --warn-color: ??;
  /** 以及警告的深浅混合色, 同上规则 */
  /* ... */

  /** 危险 */
  --danger-color: ??;
  /** 以及危险的深浅混合色, 同上规则 */
  /* ... */
}
```

## 深色主题

```css

```
