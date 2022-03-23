---
title: 全局配置
lang: zh-CN
---

# ~~Config Provider 全局配置~~

::: warning
这个已经被废弃掉了, 该文档也会在某个时候删除!!!
:::

Config Provider 被用来提供全局的配置选项，让你的配置能够在全局都能够被访问到。

## i18n 配置

通过 Config Provider 来配置多语言，让你的应用可以随时切换语言。

:::demo 使用两个属性来提供 i18n 相关配置

config-provider/usage

:::

## 对按钮进行配置

:::demo

config-provider/button

:::

## 对消息进行配置

:::demo

config-provider/message

:::

## Config Provider 参数

| 参数      | 说明                                  | 类型                                                                                                                                 | 可选值                                                                                     | 默认值                                                                                         |
| ------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| locale  | 翻译文本对象                              | [Language](https://github.com/element-plus/element-plus/blob/a98ff9b40c0c3d2b9959f99919bd8363e3e3c25a/packages/locale/index.ts#L5) | [languages](https://github.com/element-plus/element-plus/tree/dev/packages/locale/lang) | [English](https://github.com/element-plus/element-plus/blob/dev/packages/locale/lang/en.ts) |
| size    | 全局组件大小                              | string                                                                                                                             | large / default /small                                                                  | default                                                                                     |
| zIndex  | 全局初始化 zIndex 的值                     | number                                                                                                                             | -                                                                                       | -                                                                                           |
| button  | 按钮相关配置，[详见下表](#button-attributes)   | ButtonGlobalConfig                                                                                                                 | -                                                                                       | 详见下表                                                                                        |
| message | 消息相关配置， [详见下表](#message-attributes) | MessageGlobalConfig                                                                                                                | -                                                                                       | 详见下表                                                                                        |

## Button 参数

| 参数              | 描述              | 类型      | 可选值 | 默认值   |
| --------------- | --------------- | ------- | --- | ----- |
| autoInsertSpace | 自动在两个中文字符之间插入空格 | boolean | -   | false |

## Message 参数

| 参数  | 描述           | 类型     | 可选值 | 默认值 |
| --- | ------------ | ------ | --- | --- |
| max | 可同时显示的消息最大数量 | number | -   | -   |

## ConfigProvider 插槽

| 名称 | 描述      | Scope             |
| -- | ------- | ----------------- |
| -  | 自定义默认内容 | 配置：提供全局配置 (从顶部继承) |
