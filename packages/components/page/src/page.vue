<template>
  <el-grid :class="ns.b()" rows="100%" gap="0" cols="minmax(0, 1fr) 200px">
    <div :class="ns.e('main')">
      <section :class="ns.e('content')">
        <component
          :is="node"
          :key="node.key"
          :data-index="index"
          v-for="(node, index) of getDefaultSlots()"
        />
      </section>

      <section :class="ns.e('footer')">
        <slot name="footer" />
      </section>
    </div>

    <el-tabs :class="ns.e('aside')" v-model="active">
      <el-tab-pane label="页面导航" name="page-nav">
        <ul :class="ns.e('nav')">
          <li
            v-for="(nav, index) of navList"
            :class="ns.is('active', currentNavIndex === index)"
            :key="nav"
            @click="handleClickNavItem(index)"
          >
            <a :href="'#' + nav">{{ nav }}</a>
          </li>
        </ul>
      </el-tab-pane>

      <slot name="panes" />
    </el-tabs>
  </el-grid>
</template>
<script lang="ts" setup>
import { ElGrid } from '@element-ultra/components/grid'
import { ElTabs, ElTabPane } from '@element-ultra/components/tabs'
import { useNamespace } from '@element-ultra/hooks'
import {
  isVNode,
  onUnmounted,
  provide,
  shallowRef,
  useSlots,
  type VNode,
  type VNodeArrayChildren
} from 'vue'
import { pageContextKey } from '@element-ultra/tokens'
import { isFragment, isTemplate } from '@element-ultra/utils'

defineOptions({
  name: 'ElPage'
})

const ns = useNamespace('page')
const active = shallowRef('page-nav')
const slots = useSlots()

const navList = shallowRef<string[]>([])
const currentNavIndex = shallowRef(0)

const getDefaultSlots = () => {
  let children = slots.default?.() || []
  let nav: string[] = []
  let result: VNode[] = []

  function recursive(nodeList: VNodeArrayChildren) {
    nodeList.forEach((node) => {
      if (!isVNode(node)) return

      if (isFragment(node) || isTemplate(node)) {
        if (Array.isArray(node.children)) {
          recursive(node.children)
        }
        return
      }

      result.push(node)

      if (typeof node.type === 'object' && (node.type as any).name === 'ElCard') {
        const { header } = node.props || {}
        header && nav.push(header)
      }
    })
  }

  recursive(children)

  navList.value = nav

  return result
}

// 索引的优先级应该以点击为准， 每次点击建立一个点击锁，observer触发后首先要先解锁
let clicked = false
const handleClickNavItem = (n: number) => {
  clicked = true
  currentNavIndex.value = n
}
const observer = new IntersectionObserver(function (entries) {
  // 解锁
  if (clicked) {
    clicked = false
    return
  }
  for (const entry of entries) {
    if (entry.intersectionRatio > 0) {
      currentNavIndex.value = Number(entry.target.getAttribute('data-index'))
    }
  }
})

provide(pageContextKey, {
  observer
})

onUnmounted(() => {
  observer.disconnect()
})
</script>
