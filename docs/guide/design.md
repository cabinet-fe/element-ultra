---
title: 设计
lang: zh-CN
---

<style scoped lang="scss">

.guide__design {
  margin-top: 1rem;
}

.el-col {
  padding: 0 7px;
}
.card {
  background: #fbfcfd;
  height: 204px;
  text-align: center;

  img {
    margin: 40px auto 25px;
    width: 5rem;
    height: 5rem;
  }
}

@media screen and (max-width: 767px) {
  .el-col {
    padding-bottom: 8px;
  }
}
</style>

# 设计原则

<div class="guide__design">
  <div class="el-row cards" style="margin-left: -7px; margin-right: -7px;">
    <div class="el-col el-col-24 el-col-xs-12 el-col-sm-6 is-guttered">
      <div class="card">
        <img src="/images/consistency.png" alt="一致">
        <p>一致</p>
      </div>
    </div>
    <div class="el-col el-col-24 el-col-xs-12 el-col-sm-6 is-guttered">
      <div class="card">
        <img src="/images/feedback.png" alt="反馈">
        <p>反馈</p>
      </div>
    </div>
    <div class="el-col el-col-24 el-col-xs-12 el-col-sm-6 is-guttered">
      <div class="card">
        <img src="/images/efficiency.png" alt="效率">
        <p>效率</p>
      </div>
    </div>
    <div class="el-col el-col-24 el-col-xs-12 el-col-sm-6 is-guttered">
      <div class="card">
        <img src="/images/controllability.png" alt="可控">
        <p>可控</p>
      </div>
    </div>
  </div>
</div>

## 一致 Consistency

- **与现实生活一致：** 与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；

- **在界面中一致：** 所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。

## 反馈 Feedback

- **控制反馈：** 通过界面样式和交互动效让用户可以清晰的感知自己的操作；

- **页面反馈：** 操作后，通过页面元素的变化清晰地展现当前状态。

## 效率 Efficiency

- **简化流程：** 设计简洁直观的操作流程；

- **清晰明确：** 语言表达清晰且表意明确，让用户快速理解进而作出决策；

- **帮助用户识别：** 界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。

## 可控 Controllability

- **用户决策：** 根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；

- **结果可控：** 用户可以自由的进行操作，包括撤销、回退和终止当前操作等。
