<script lang="tsx">
import { ElGrid } from '@element-ultra/components/grid'
import { ElButton } from '@element-ultra/components/button'
import { ElSlotsRender } from '@element-ultra/components/slots-render'
import { ElScrollbar } from '@element-ultra/components/scrollbar'
import { useConfig, useNamespace } from '@element-ultra/hooks'
import {
  cloneVNode,
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
import {
  formInjectionKey,
  pageContextKey,
  type FormExposed
} from '@element-ultra/tokens'
import { isFragment, isTemplate } from '@element-ultra/utils'
import type { Router } from 'vue-router'
import { debounce } from 'lodash'

export default defineComponent({
  name: 'ElPage',

  props: {
    showExtra: {
      type: Boolean,
      default: true
    }
  },

  setup(props, { attrs, slots, expose }) {
    const ns = useNamespace('page')

    const [conf] = useConfig()

    const currentNavIndex = shallowRef(0)

    const instance = getCurrentInstance()!
    const router = instance.appContext.config.globalProperties.$router as Router
    const handleBack = () => {
      if (router) {
        router.go(-1)
      } else {
        console.warn('当前环境下没有使用路由,详情请查看https://router.vuejs.org/zh/')
      }
    }

    const getDefaultSlots = () => {
      let defaultNodes = slots.default?.() || []
      let navList: string[] = []
      let children: VNode[] = []

      const isCard = (node: VNode) => {
        const { type } = node
        return typeof type === 'object' && (type as any).name === 'ElCard'
      }

      function recursive(nodeList: VNodeArrayChildren) {
        nodeList.forEach(node => {
          if (!isVNode(node)) return

          if (isFragment(node) || isTemplate(node)) {
            Array.isArray(node.children) && recursive(node.children)
            return
          }

          if (isCard(node)) {
            const { header } = node.props || {}
            if (header) {
              children.push(cloneVNode(node, { 'data-index': navList.length }))
              navList.push(header)
            }
          } else {
            children.push(node)
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
    const handleClickNavItem = (nav: string, n: number) => {
      navTo(nav)
      clicked = true
      currentNavIndex.value = n
    }

    // 当滚动停止时表示滚动完成
    const onScrollStopped = debounce((rect: any) => {
      if (clicked) {
        clicked = false
      }
    }, 200)

    const observer = new IntersectionObserver(entries => {
      // 点击中的位置不进行更新
      if (clicked) return
      const entry = entries[0]

      // intersectionRatio > 0表示在视口中开始出现
      if (!entry || entry.intersectionRatio === 0) return

      currentNavIndex.value = Number(
        entry.target.getAttribute('data-index') || 0
      )
    })

    let extraRefs: any = []
    onBeforeUpdate(() => {
      extraRefs = []
    })

    let exposedFormList = new Set<FormExposed>()

    // 注入给form使用
    provide(formInjectionKey, {
      addForm(formExposed: FormExposed) {
        exposedFormList.add(formExposed)
      },
      deleteForm(formExposed: FormExposed) {
        exposedFormList.delete(formExposed)
      }
    })

    // 注入给card使用
    provide(pageContextKey, {
      observer
    })

    onUnmounted(() => {
      observer.disconnect()
    })

    /** 渲染额外组件 */
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

    const validate = async () => {
      for (const form of exposedFormList) {
        await form.validate()
      }
    }

    expose({
      validate
    })

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
            <ElScrollbar class={ns.e('content')} onScroll={onScrollStopped}>
              <ElSlotsRender nodes={children} />

              {renderExtra()}
            </ElScrollbar>

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
                    onClick={() => handleClickNavItem(nav, index)}
                  >
                    {nav}
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
