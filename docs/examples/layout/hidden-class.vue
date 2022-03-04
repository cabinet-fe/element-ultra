<template>
  <div>
    <p>缩放你的浏览器视口来查看这些类名：</p>
    <ul>
      <li class="hidden-xs-only">
        `hidden-xs-only` - 当视口在 `xs` 尺寸时隐藏
      </li>
      <li class="hidden-sm-only">
        `hidden-sm-only` - 当视口在 `sm` 尺寸时隐藏
      </li>
      <li class="hidden-sm-and-down">
        `hidden-sm-and-down` - 当视口在 `sm` 及以下尺寸时隐藏
      </li>
      <li class="hidden-sm-and-up">
        `hidden-sm-and-up` - 当视口在 `sm` 及以上尺寸时隐藏
      </li>
      <li class="hidden-md-only">
        `hidden-md-only` - 当视口在 `md` 尺寸时隐藏
      </li>
      <li class="hidden-md-and-down">
        `hidden-md-and-down` - 当视口在 `md` 及以下尺寸时隐藏
      </li>
      <li class="hidden-md-and-up">
        `hidden-md-and-up` - 当视口在 `md` 及以上尺寸时隐藏
      </li>
      <li class="hidden-lg-only">
        `hidden-lg-only` - 当视口在 `lg` 尺寸时隐藏
      </li>
      <li class="hidden-lg-and-down">
        `hidden-lg-and-down` - 当视口在 `lg` 及以下尺寸时隐藏
      </li>
      <li class="hidden-lg-and-up">
        `hidden-lg-and-up` - 当视口在 `lg` 及以上尺寸时隐藏
      </li>
      <li class="hidden-xl-only">
        `hidden-xl-only` - 当视口在 `xl` 尺寸时隐藏
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import '@element-pro/theme-chalk/src/display.scss'
</script>
