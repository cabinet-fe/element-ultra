---
title: css变量
lang: zh-CN
---

# css 变量

css 变量是 css 最为强大的特性之一, 也是构建主题配置系统的最核心技术.

## 介绍

css 变量最强大的地方在于, 所有引用了该变量的元素样式都会随着变量的改变而重新计算.

不用担心其性能, 除非在有主题更改的情况下, 一般我们不会随意更改 css 变量.

### 长啥样

一个 css 变量始终以 '--' 开头命名

```css
:root {
  --text-color: #444;
}
```

### 放在哪里

一个 css 变量可以放在 css 各种选择器当中, 包括内联样式中也可以存放.

以下的 css 变量都是合法的

```css
div {
  --text-color: #444;
}
#app {
  --text-color: #444;
}
html {
  --text-color: #444;
}
// root伪类你可以把他视为html选择器, 但是它的权重高于html.
:root {
  --text-color: #444;
}
```

```html
<div style="--text-color: #444"></div>
```

## 主题设计指南

### 定义所有的可动态变化的变量

将你所有的变量定义在全局中

```css
--color-primary: #fff;
```

### 引用这个变量

```css
.my-element {
  background-color: var(--color-primary);
}
```

### 改变变量的值

```ts
// 改变html元素上的变量属性
document.documentElement.style.setProperty('--color-primary', 'blue')
```
