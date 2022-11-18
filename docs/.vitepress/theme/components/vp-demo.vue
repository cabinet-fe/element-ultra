<template>
  <ClientOnly>
    <!-- danger here DO NOT USE INLINE SCRIPT TAG -->
    <p text="sm" v-html="decodedDescription" />
    <div class="example">
      <div class="op-btns">
        <ElTooltip content="在 PlayGround 中编辑" :show-arrow="false">
          <ElIcon :size="20" class="op-btn">
            <i-ri-play-circle-line @click="onPlaygroundClicked" />
          </ElIcon>
        </ElTooltip>
        <ElTooltip content="在 GitHub 上编辑" :show-arrow="false">
          <ElIcon
            :size="20"
            class="op-btn github"
            style="color: var(--text-color-light)"
          >
            <a :href="demoSourceUrl" rel="noreferrer noopener" target="_blank">
              <i-ri-github-line />
            </a>
          </ElIcon>
        </ElTooltip>
        <ElTooltip content="复制代码" :show-arrow="false">
          <ElIcon :size="20" class="op-btn" @click="copyCode">
            <!-- <CopyIcon /> -->
            <i-ri-file-copy-2-line />
          </ElIcon>
        </ElTooltip>
        <ElTooltip content="查看源代码" :show-arrow="false">
          <ElIcon :size="20" class="op-btn" @click="setSourceVisible()">
            <!-- <SourceCodeIcon /> -->
            <i-ri-code-line />
          </ElIcon>
        </ElTooltip>
      </div>
      <ElDivider class="m-0" />
      <Example :file="path" :demo="formatPathDemos[path]" />
      <el-collapse-transition :style="{ maxHeight }">
        <SourceCode ref="sourceCode" v-if="sourceVisible" :source="source" />
      </el-collapse-transition>

      <transition name="el-fade-in-linear">
        <div
          v-show="sourceVisible"
          class="example-float-control"
          @click="setSourceVisible(false)"
        >
          <ElIcon :size="16">
            <CaretTop></CaretTop>
          </ElIcon>
          <span>隐藏代码</span>
        </div>
      </transition>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { computed, toRef, getCurrentInstance, ref, nextTick } from 'vue'
import { useClipboard } from '@vueuse/core'
import { useSourceCode } from '../composables/source-code'
import { usePlayGround } from '../composables/use-playground'
import { CaretTop } from '@element-plus/icons-vue'
import Example from './demo/vp-example.vue'
import SourceCode from './demo/vp-source-code.vue'
const maxHeight = Math.ceil(window.innerHeight * 0.8) + 'px'
const props = defineProps<{
  source: string
  path: string
  css?: string
  cssPreProcessor?: string
  js?: string
  html?: string
  demos: object
  rawSource: string
  description?: string
}>()

const vm = getCurrentInstance()!

const { copy, isSupported } = useClipboard({
  source: decodeURIComponent(props.rawSource),
  read: false,
})

const sourceVisible = ref(false)
const sourceCode = ref<any>(null)
const setSourceVisible = (visible?: boolean) => {
  sourceVisible.value = visible ?? !sourceVisible.value

  if (sourceVisible.value) {
    nextTick(() => {
      sourceCode.value?.intoView()
    })
  }
}

const demoSourceUrl = useSourceCode(toRef(props, 'path'))

const formatPathDemos = computed(() => {
  const demos = {}
  Object.keys(props.demos).forEach((key) => {
    demos[key.replace('../examples/', '').replace('.vue', '')] =
      props.demos[key].default
  })

  return demos
})

const decodedDescription = computed(() =>
  decodeURIComponent(props.description!)
)

const onPlaygroundClicked = () => {
  const { link } = usePlayGround(props.rawSource)
  window.open(link)
}

const copyCode = async () => {
  const { $message } = vm.appContext.config.globalProperties
  if (!isSupported) {
    $message.error('此浏览器不支持自动复制！')
  }
  try {
    await copy()
    $message.success('已复制')
  } catch (e: any) {
    $message.error(e.message)
  }
}
</script>

<style scoped lang="scss">
.example {
  border: 1px solid var(--border-color);
  border-radius: var(--el-border-radius-base);

  .op-btns {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 3rem;
    line-height: 3rem;

    .el-icon {
      &:hover {
        color: var(--text-color);
      }
    }

    .op-btn {
      margin: 0 0.5rem;
      cursor: pointer;
      color: var(--text-color-lighter);
      transition: 0.2s;

      &.github a {
        transition: 0.2s;
        color: var(--text-color-lighter);

        &:hover {
          color: var(--text-color);
        }
      }
    }
  }

  &-float-control {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #eaeefb;
    height: 44px;
    box-sizing: border-box;
    background-color: var(--bg-color, #fff);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    margin-top: -1px;
    color: #d3dce6;
    cursor: pointer;
    position: sticky;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    span {
      font-size: 14px;
      margin-left: 10px;
    }
    &:hover {
      color: var(--el-color-primary);
      background-color: #f9fafc;
    }
  }
}
</style>
