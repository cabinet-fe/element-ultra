import { ElGrid } from '@element-ultra/components/grid'
import { ElButton } from '@element-ultra/components/button'
import ElNodeRender from '@element-ultra/components/node-render'
import { ElScrollbar } from '@element-ultra/components/scrollbar'
import type { ElMultipleForm } from '@element-ultra/components/multiple-form'
import { useNamespace } from '@element-ultra/hooks'
import {
  cloneVNode,
  defineComponent,
  getCurrentInstance,
  isVNode,
  provide,
  shallowRef,
  type VNode,
  type VNodeArrayChildren
} from 'vue'
import { formInjectionKey, type FormExposed } from '@element-ultra/tokens'
import { isFragment, isTemplate } from '@element-ultra/utils'
import type { Router } from 'vue-router'
import { debounce } from 'lodash'

type MultipleFormInst = InstanceType<typeof ElMultipleForm>

export interface PageExposed {
  /** 校验表单 */
  validate: () => Promise<boolean>
}

export default defineComponent({
  name: 'ElPage',

  props: {
    /** 隐藏底部 */
    hideFooter: {
      type: Boolean
    },
    /** 隐藏右侧导航 */
    hideNav: {
      type: Boolean
    }
  },

  setup(props, { attrs, slots, expose }) {
    const ns = useNamespace('page')

    const currentNavIndex = shallowRef(0)

    const instance = getCurrentInstance()!
    const router = instance.appContext.config.globalProperties.$router as Router
    const handleBack = () => {
      if (router) {
        router.go(-1)
      } else {
        console.warn(
          '当前环境下没有使用路由,详情请查看https://router.vuejs.org/zh/'
        )
      }
    }

    /** 获取默认插槽 */
    const getDefaultSlots = () => {
      let defaultNodes = slots.default?.() || []
      let navList: string[] = []
      let children: VNode[] = []

      const isCard = (node: VNode) => {
        const { type } = node
        return typeof type === 'object' && (type as any).name === 'ElCard'
      }

      //  ns.em('card-item', 'hidden')
      const cardItemClass = [ns.e('card-item')]

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
              children.push(
                cloneVNode(node, {
                  'data-index': navList.length,
                  class: cardItemClass
                })
              )
              navList.push(header)
            } else {
              children.push(node)
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

    // 用来监听el-card
    // const observer = new IntersectionObserver(entries => {
    //   entries.forEach(entry => {
    //     const { target, intersectionRatio } = entry
    //     if (intersectionRatio > 0 && target.classList.contains(hiddenClass)) {
    //       target.classList.remove(hiddenClass)
    //     }
    //   })

    //   // 对于点击定位, 点击中的位置不进行更新
    //   if (clicked) return

    //   const entry = entries[0]
    //   // intersectionRatio > 0表示在视口中开始出现
    //   if (!entry || entry.intersectionRatio === 0) return

    //   currentNavIndex.value = Number(
    //     entry.target.getAttribute('data-index') || 0
    //   )
    // })

    const exposedFormList = new Set<FormExposed>()
    const exposedMultipleFormList = new Set<MultipleFormInst>()

    // 注入给form使用
    provide(formInjectionKey, {
      addForm(formExposed: FormExposed) {
        exposedFormList.add(formExposed)
      },
      deleteForm(formExposed: FormExposed) {
        exposedFormList.delete(formExposed)
      },
      addMultipleForm(form: MultipleFormInst) {
        exposedMultipleFormList.add(form)
      },
      deleteMultipleForm(form: MultipleFormInst) {
        exposedMultipleFormList.delete(form)
      }
    })

    /** 当前处于定位中的dom */
    let currentDom: HTMLElement | null = null

    /** 跳转至 */
    const navTo = (nav: string) => {
      let dom = document.getElementById(nav)
      if (!dom) return
      const cls = ns.em('card-item', 'blink')
      currentDom?.classList.remove(cls)

      currentDom = dom
      dom.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
      dom.classList.add(cls)
    }

    /** 校验所有的表单和多行表单 */
    const validate = async () => {
      for (const form of exposedFormList) {
        await form.validate()
      }
      for (const form of exposedMultipleFormList) {
        await form.validate()
      }

      return true
    }

    expose({
      validate
    } as PageExposed)

    return () => {
      const { children, navList } = getDefaultSlots()
      let hasNav = !!navList.length && !props.hideNav
      return (
        <ElGrid
          {...attrs}
          class={ns.b()}
          rows='100%'
          gap='0'
          cols={`minmax(0, 1fr) ${hasNav ? '100px' : '0'}`}
        >
          <div class={ns.e('main')}>
            <ElScrollbar
              style={{
                height: props.hideFooter ? '100%' : 'calc(100% - 40px)'
              }}
              class={ns.e('content')}
              onScroll={onScrollStopped}
            >
              <ElNodeRender nodes={children} />
            </ElScrollbar>

            {props.hideFooter ? null : (
              <section class={ns.e('footer')}>
                <ElButton onClick={handleBack}>返回</ElButton>
                <div>{slots.footer?.()}</div>
              </section>
            )}
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
