---
page: true
lang: zh-CN
---

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.page-resource {
  box-sizing: border-box;
  padding: 35px 40px 0;

  .resource-placeholder {
    margin: 50px auto 100px;
    text-align: center;

    img {
      width: 150px;
    }

    h4 {
      margin: 20px 0 16px;
      font-size: 16px;
      color: #1f2f3d;
      line-height: 1;
    }

    p {
      margin: 0;
      font-size: 14px;
      color: #99a9bf;
      line-height: 1;
    }
  }
}
.cards {
  margin: 35px auto 110px;

  .container {
    &::before,
    &::after {
      display: table;
      content: '';
    }
    &::after {
      clear: both;
    }
    padding: 0;
    margin: 0 -11px;
    width: auto;
  }

  li {
    width: 33.33333%;
    padding: 0 11px;
    box-sizing: border-box;
    float: left;
    list-style: none;
  }
}
h2 {
  font-size: 28px;
  margin: 0;
}
p {
  font-size: 14px;
  color: #5e6d82;
}
.card {
  padding-bottom: 28px;
  width: 100%;
  background: #ffffff;
  border: 1px solid var(--el-border-color-base);
  border-radius: 5px;
  box-sizing: border-box;
  text-align: center;
  position: relative;
  transition: bottom 0.3s;
  bottom: 0;

  img {
    margin: 75px auto 35px;
    height: 87px;
  }
  h3 {
    margin: 0 0 10px;
    font-size: 18px;
    color: #1f2f3d;
    font-weight: normal;
    height: 22px;
  }
  p {
    font-size: 14px;
    color: #99a9bf;
    padding: 0 30px;
    margin: 0;
    word-break: break-word;
    line-height: 1.8; // 1.6 for english
    min-height: 75px;
  }
  a {
    height: 40px;
    width: 160px;
    display: inline-block;
    line-height: 42px;
    font-size: 14px;
    background-color: #409eff;
    color: #fff;
    text-align: center;
    border: 0;
    padding: 0;
    cursor: pointer;
    border-radius: 2px;
    transition: all 0.3s;
    text-decoration: none;
    margin-top: 20px;
    margin-bottom: 20px;
  }
}
@media (max-width: 850px) {
  .page-resource {
    padding: 15px 0px 0;
  }
  .cards {
    li {
      max-width: 500px;
      float: none;
      margin: 10px auto 30px;
      width: 80%;
      .card {
        height: auto;
        padding-bottom: 20px;
      }
    }
    h3 {
      height: auto;
    }
  }
}
</style>

<div class="page-container page-resource">
  <h1>资源</h1>
  <p>更多资源还在开发进程中</p>
  <div class="cards">
    <ul class="container">
      <li>
        <div class="card">
          <img src="/images/Axure-Components.svg" alt="axure" />
          <h3>Axure 组件</h3>
          <p>通过在 Axure 中导入 Element Pro 组件库，你可以在交互设计阶段方便地调用我们提供的所有组件。</p>
          <a
            onclick="ga('send', 'event', 'ResourceDownload', 'Download', 'Axure');"
            href="https://github.com/ElementUI/Resources/raw/master/Element_Components_v2.1.0.rplib"
            >下载</a
>
        </div>
      </li>
      <li>
        <div class="card">
          <img src="/images/Sketch-Template.svg" alt="Sketch" />
          <h3>Sketch 模版</h3>
          <p>从 Element Pro Template 快速调用常用组件，在提升设计效率的同时，保证了视觉风格的统一。</p>
          <a
            onclick="ga('send', 'event', 'ResourceDownload', 'Download', 'Sketch');"
            href="https://github.com/ElementUI/Resources/raw/master/Element%20UI%20Kit_v2.0.sketch"
            >下载</a
>
        </div>
      </li>
      <li>
        <div class="card">
          <img src="/images/figma.png" alt="Figma" />
          <h3>Figma 模板</h3>
          <p>2021年全新设计的 Figma 组件库，应用了自动布局与变体等新特性。</p>
          <a
            onclick="ga('send', 'event', 'ResourceDownload', 'Download', 'Sketch');"
            href="https://www.figma.com/community/file/1021254029764378306"
            >下载</a
>
        </div>
      </li>
    </ul>
  </div>
</div>

<style scoped lang="scss">
h1 {
  color: var(--text-color);

  + p {
    color: var(--text-color-light);
  }

}

.card {
  background-color: var(--bg-color);
  border-color: var(--border-color);

  h3 {
    color: var(--text-color);
  }
}
</style>
