---
title: 主题
lang: zh-CN
---

# 自定义主题

Element Ultra 默认提供一套主题，CSS 命名采用 BEM 的风格，方便使用者覆盖样式。 但是如果 你需要在大规模上替换样式，例如： 将主题颜色从 蓝色改为橙色或绿色，也许一个人将其覆盖起来不是一个好主意。 我们 提供四种方法来改变风格变量。

## 更换主题色

以下是自定义主题的一些例子。

- 全部导入：[element-plus-vite-starter](https://github.com/element-plus/element-plus-vite-starter)
- 按需导入：[unplugin-element-plus/examples/vite](https://github.com/element-plus/unplugin-element-plus)

### 通过 SCSS 变量

`theme-chalk` 使用SCSS编写而成。 你可以在 [`packages/theme-chalk/src/common/var.scss`](https://github.com/element-plus/element-plus/blob/dev/packages/theme-chalk/src/common/var.scss).文件中查找SCSS变量。

::: warning

我们使用 sass 模块（[sass:map](https://sass-lang.com/documentation/values/maps)...）来重构所有的 SCSS 变量。

> [介绍Sass 模块 | CSS-TRICKS](https://css-tricks.com/introducing-sass-modules/)

例如， 使用`$colors`变量映射不同颜色。

`$notification` 是所有`notification` 组件的变量的映射。

未来，我们将为每个组件的自定义变量编写文档。 你也可以直接查看源代码 [var.scss](https://github.com/element-plus/element-plus/blob/dev/packages/theme-chalk/src/common/var.scss)

:::

```scss
$colors: () !default;
$colors: map.deep-merge(
  (
    'white': #ffffff,
    'black': #000000,
    'primary': (
      'base': #409eff,
    ),
    'success': (
      'base': #67c23a,
    ),
    'warning': (
      'base': #e6a23c,
    ),
    'danger': (
      'base': #f56c6c,
    ),
    'error': (
      'base': #f56c6c,
    ),
    'info': (
      'base': #909399,
    ),
  ),
  $colors
);
```

### 如何覆盖它？

如果你的项目也使用了 SCSS， 那么你可以直接修改Element Pro的样式变量。 新建一个样式文件，例如 `styles/element/index.scss`：

```scss
// styles/element/index.scss
/* 只需要重写你需要的即可 */
@forward 'element-plus/theme-chalk/src/common/var.scss' with (
  $colors: (
    'primary': (
      'base': green,
    ),
  ),
);

// 如果只是按需导入，则可以忽略以下内容。
// 如果你想导入所有样式:
// @use "element-plus/theme-chalk/src/index.scss" as *;
```

然后在你的项目入口文件中，导入这个样式文件替换 Element Ultra 内置的 CSS：

::: tip

在 element-plus scss 文件之前导入`element/index.scss`以避免 sass 混合变量的问题，因为我们需要通过你的自定义变量生成 light-x

:::

创建一个 `element/index.scss` 文件来合并你的变量和 element-plus 的变量。 （如果你在 TypeScript 中导入了它们，他们将不会被合并）

::: tip

除此以外，你应该将scss与元素变量scss区分开来。 如果将它们混合在一起，`element-plus`的每次热更新都需要编译大量的 scss 文件，导致编译速度变慢。

:::

```ts
import Vue from 'vue'

import './styles/element/index.scss'
import ElementUltra from 'element-ultra'
import App from './App.vue'

const app = createApp(App)
app.use(ElementUltra)
```

如果你正在使用vite，并且你想在按需导入时自定义主题。

使用 `scss.additionalData` 来编译所有应用 scss 变量的组件。

```ts
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 你同样可以使用 unplugin-vue-components
// import Components from 'unplugin-vue-components/vite'
// import { ElementUltraResolver } from 'unplugin-vue-components/resolvers'

// 或者使用 unplugin-element-plus
import ElementUltra from 'unplugin-element-plus/vite'

// vite.config.ts
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/styles/element/index.scss" as *;`,
      },
    },
  },
  plugins: [
    vue(),
    // use unplugin-vue-components
    // Components({
    //   resolvers: [
    //     ElementUltraResolver({
    //       importStyle: "sass",
    //       // directives: true,
    //       // version: "1.2.0-beta.1",
    //     }),
    //   ],
    // }),
    // or use unplugin-element-plus
    ElementUltra({
      useSource: true,
    }),
  ],
})
```

### 通过 CSS 变量设置

CSS变量是一个非常有用的特性，几乎所有的浏览器都支持它。 （IE：啊这？)

> 从这里学习更多关于[使用CSS自定义属性(变量) | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

我们用css变量来改造了几乎所有组件的样式系统。 (自版本 `1.0.2-beta-70` [#2242](https://github.com/element-plus/element-plus/issues/2242) 开始)

::: tip

CSS 变量和 SCSS 变量系统是兼容的。 因此，我们使用 SCSS 里的函数去自动化生成可直接使用的 CSS 变量。

:::

这意味着你可以动态地改变组件内的个别变量，以便更好地自定义，而不必修改 Scss 然后重新编译它。

> 以后，每个组件的Css变量名称和角色文档将被写入到每个组件中。

比如这样：

```css
:root {
  --el-color-primary: green;
}
```

如果你只想自定义一个特定的组件，只需为某些组件单独添加内联样式。

```html
<el-tag style="--el-tag-bg-color: red">Tag</el-tag>
```

出于性能原因，更加推荐你在 class 下添加自定义 css 变量，而不是全局的 `:root`。

```css
.custom-class {
  --el-tag-bg-color: red;
}
```

如果您想要通过脚本控制 css var，请尝试这样做：

```ts
// document.documentElement is global
const el = document.documentElement
// const el = document.getElementById('xxx')

// get css var
getComputedStyle(el).getPropertyValue(`--el-color-primary`)

// set css var
el.style['--el-color-primary'] = 'red'
```

如果你想要更优雅的方式，请看这里。 [useCssVar | VueUse](https://vueuse.org/core/usecssvar/)
