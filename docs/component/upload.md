---
title: Upload 上传
lang: zh-CN
---

# Upload 上传

通过点击或者拖拽上传文件

## 点击上传

:::demo 通过 `slot` 你可以传入自定义的上传按钮类型和文字提示。 可通过设置 `limit` 和 `on-exceed` 来限制上传文件的个数和定义超出限制时的行为。 可通过设置 `before-remove` 来阻止文件移除操作。

upload/basic

:::

## 覆盖前一个文件

:::demo 设置 `limit` 和 `on-exceed` 可以在选中时自动替换上一个文件。

upload/limit-cover

:::

## 用户头像上传

在 `before-upload` 钩子中限制用户上传文件的格式和大小。

:::demo

upload/avatar

:::

## 照片墙

使用 `list-type` 属性来设定文件列表的样式。

:::demo

upload/photo-album

:::

## 自定义文件缩略图

使用 `scoped-slot` 属性来改变默认的缩略图模板样式。

:::demo

upload/custom-thumbnail

:::

## 带缩略图的文件列表

:::demo

upload/file-list-with-thumbnail

:::

## 文件列表控制

通过 `on-change` 钩子函数来对列表进行控制

:::demo

upload/file-list

:::

## 拖拽上传

你可以将文件拖拽到特定区域以进行上传。

:::demo

upload/drag-and-drop

:::

## 手动上传

:::demo

upload/manual

:::

## 属性

| 属性               | 描述                                                                                                                 | 类型                                 | 可选值                       | 默认值   |
| ---------------- | ------------------------------------------------------------------------------------------------------------------ | ---------------------------------- | ------------------------- | ----- |
| action           | 必选参数，上传的地址                                                                                                         | string                             | —                         | —     |
| headers          | 设置上传的请求头部                                                                                                          | object                             | —                         | —     |
| method           | 设置上传请求方法                                                                                                           | string                             | post/put/patch            | POST  |
| multiple         | 是否支持多选文件                                                                                                           | boolean                            | —                         | —     |
| data             | 上传时附带的额外参数                                                                                                         | object                             | —                         | —     |
| name             | 上传的文件字段名                                                                                                           | string                             | —                         | file  |
| with-credentials | 支持发送 cookie 凭证信息                                                                                                   | boolean                            | —                         | false |
| show-file-list   | 是否显示已上传文件列表                                                                                                        | boolean                            | —                         | true  |
| drag             | 是否启用拖拽上传                                                                                                           | boolean                            | —                         | false |
| accept           | 接受上传的 [文件类型](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept)（thumbnail-mode 模式下此参数无效） | string                             | —                         | —     |
| on-preview       | 点击文件列表中已上传的文件时的钩子                                                                                                  | function(file)                     | —                         | —     |
| on-remove        | 文件列表移除文件时的钩子                                                                                                       | function(file, fileList)           | —                         | —     |
| on-success       | 文件上传成功时的钩子                                                                                                         | function(response, file, fileList) | —                         | —     |
| on-error         | 文件上传失败时的钩子                                                                                                         | function(err, file, fileList)      | —                         | —     |
| on-progress      | 文件上传时的钩子                                                                                                           | function(event, file, fileList)    | —                         | —     |
| on-change        | 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用                                                                                    | function(file, fileList)           | —                         | —     |
| before-upload    | 上传文件之前的钩子，参数为上传的文件。 若返回 `false` 或者返回 `Promise` 且被 reject，则终止上传。                                                    | function(file)                     | —                         | —     |
| before-remove    | 删除文件之前的钩子，参数为上传的文件和文件列表。 若返回 `false` 或者返回 `Promise` 且被 reject，则终止删除。                                               | function(file, fileList)           | —                         | —     |
| file-list        | default uploaded files, e.g. [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]                              | array                              | —                         | []    |
| list-type        | type of fileList                                                                                                   | string                             | text/picture/picture-card | text  |
| auto-upload      | whether to auto upload file                                                                                        | boolean                            | —                         | true  |
| http-request     | override default xhr behavior, allowing you to implement your own upload-file's request                            | function                           | —                         | —     |
| disabled         | whether to disable upload                                                                                          | boolean                            | —                         | false |
| limit            | maximum number of uploads allowed                                                                                  | number                             | —                         | —     |
| on-exceed        | hook function when limit is exceeded                                                                               | function(files, fileList)          | —                         | -     |

## 插槽

| 名称      | 描述         | 参数                        |
| ------- | ---------- | ------------------------- |
| —       | 自定义默认内容    | -                         |
| trigger | 触发文件选择框的内容 | -                         |
| tip     | 提示说明文字     | -                         |
| file    | 缩略图模板的内容   | file ( #file = { file } ) |

## 方法

| 方法名          | 描述                                      | 参数                                       | 默认值                                                                               |
| ------------ | --------------------------------------- | ---------------------------------------- | --------------------------------------------------------------------------------- |
| clearFiles   | 清空已上传的文件列表（该方法不支持在 `before-upload` 中调用） | UploadStatus[](UploadStatus = 'ready' \ | 'uploading' \| 'success' \| 'fail') | ['ready', 'uploading', 'success', 'fail'] |
| abort        | 取消上传请求                                  | （ file: fileList 中的 file 对象 ）            | -                                                                                 |
| submit       | 手动上传文件列表                                | —                                        | -                                                                                 |
| handleStart  | 手动选择文件                                  | （file：files 中的对象）                        | -                                                                                 |
| handleRemove | 手动移除文件                                  | （ file: fileList 中的 file 对象 ）            | -                                                                                 |
