<script lang="tsx">
import { ElGrid } from '@element-ultra/components/grid'
import { ElButton } from '@element-ultra/components/button'
import { ElSlotsRender } from '@element-ultra/components/slots-render'
import { useConfig, useNamespace } from '@element-ultra/hooks'
import {
  createVNode,
  defineComponent,
  getCurrentInstance,
  isVNode,
  onBeforeUpdate,
  onUnmounted,
  provide,
  shallowRef,
  type VNode,
  type VNodeArrayChildren
} from 'vue'
import { pageContextKey } from '@element-ultra/tokens'
import { isFragment, isTemplate } from '@element-ultra/utils'
import type { Router } from 'vue-router'

export default defineComponent({
  name: 'ElPage',

  props: {
    showExtra: {
      type: Boolean,
      default: true
    }
  },

  setup(props, { attrs, slots }) {
    const ns = useNamespace('page')

    const [conf] = useConfig()

    const currentNavIndex = shallowRef(0)

    const instance = getCurrentInstance()!
    const router = instance.appContext.config.globalProperties.$router as Router
    const handleBack = () => {
      router.go(-1)
    }

    const getDefaultSlots = () => {
      let defaultNodes = slots.default?.() || []
      let navList: string[] = []
      let children: VNode[] = []

      function recursive(nodeList: VNodeArrayChildren) {
        nodeList.forEach(node => {
          if (!isVNode(node)) return

          if (isFragment(node) || isTemplate(node)) {
            Array.isArray(node.children) && recursive(node.children)
            return
          }

          children.push(node)

          if (
            typeof node.type === 'object' &&
            (node.type as any).name === 'ElCard'
          ) {
            const { header } = node.props || {}
            header && navList.push(header)
          }
        })
      }

      recursive(defaultNodes)

      return {
        navList,
        children
      }
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
          currentNavIndex.value = Number(
            entry.target.getAttribute('data-index')
          )
        }
      }
    })

    let extraRefs: any = []
    onBeforeUpdate(() => {
      extraRefs = []
    })

    provide(pageContextKey, {
      observer
    })

    onUnmounted(() => {
      observer.disconnect()
    })

    const renderExtra = () => {
      if (!props.showExtra || !conf.pageExtraComponents) return null
      const nodes = conf.pageExtraComponents.map(c => {
        return createVNode(c, {
          ref: ref => extraRefs.push(ref)
        })
      })

      return nodes
    }

    const navTo = (nav: string) => {
      document.getElementById(nav)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }

    return () => {
      const { children, navList } = getDefaultSlots()
      let hasNav = !!navList.length
      return (
        <ElGrid
          {...attrs}
          class={ns.b()}
          rows='100%'
          gap='0'
          cols={`minmax(0, 1fr) ${hasNav ? '100px' : '0'}`}
        >
          <div class={ns.e('main')}>
            <section class={ns.e('content')}>
              <ElSlotsRender nodes={children} />

              {renderExtra()}
            </section>

            <section class={ns.e('footer')}>
              <ElButton onClick={handleBack}>返回</ElButton>
              <div>{slots.footer?.({ extraRefs })}</div>
            </section>
          </div>

          {hasNav ? (
            <ul class={[ns.e('aside'), ns.e('nav')]}>
              {navList.map((nav, index) => {
                return (
                  <li
                    class={ns.is('active', currentNavIndex.value === index)}
                    key='nav'
                    onClick={() => handleClickNavItem(index)}
                  >
                    <a onClick={() => navTo(nav)}>{nav}</a>
                  </li>
                )
              })}
            </ul>
          ) : null}
        </ElGrid>
      )
    }
  }
})
</script>
