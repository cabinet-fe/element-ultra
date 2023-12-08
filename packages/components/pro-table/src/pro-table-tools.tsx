import { Search, Plus, Minus, Refresh } from 'icon-ultra'
import {
  cloneVNode,
  defineComponent,
  inject,
  isVNode,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  shallowRef,
  useSlots,
  type Component,
  type VNode,
  type VNodeNormalizedChildren
} from 'vue'
import ElButton from '@element-ultra/components/button'
import { proTableHeightKey, proTableKey } from './token'
import { isComment, isFragment, isTemplate } from '@element-ultra/utils'

export default defineComponent({
  emits: {
    'key-enter': () => true
  },

  setup(props, { emit }) {
    const {
      ns,
      rootProps,
      setAutoQuery,
      fetchData,
      loading,
      defaultQuery,
      currentQueryStr
    } = inject(proTableKey)!

    const componentWidthMapper: Record<string, any> = {
      ElDatePicker: '240px'
    }
    const proTableSlots = useSlots()
    const getNodes = () => {
      let slots = (proTableSlots.searcher?.() || []).filter(
        slot => !isComment(slot)
      )

      let wrapClass = ns.e('searcher-wrap')
      let labelClass = ns.e('searcher-label')
      let contentClass = ns.e('searcher-content')

      let nodes: VNode[] = []

      const recursive = (slots: VNodeNormalizedChildren) => {
        if (Array.isArray(slots)) {
          slots.forEach(node => {
            if (!isVNode(node) || isComment(node)) return

            if (isFragment(node) || isTemplate(node)) {
              return recursive(node.children)
            }

            const { props, type } = node
            let nodeName = (type as Component)?.name
            let wrapWidth = nodeName
              ? componentWidthMapper[nodeName]
              : undefined

            let clonedNode = cloneVNode(node, {
              class: contentClass,
              style: {
                width: node.props?.style?.width || wrapWidth
              }
            })

            if (props?.placeholder) {
              nodes.push(
                <div class={wrapClass}>
                  <label class={labelClass}>
                    {props.label || props.placeholder}:
                  </label>
                  {clonedNode}
                </div>
              )
            } else {
              nodes.push(clonedNode)
            }
          })
        } else if (isVNode(slots)) {
          nodes.push(slots)
        }
      }
      recursive(slots)

      const nodesCount = nodes.length
      const defaultVisibleNodes = nodes.slice(0, rootProps.searcherLimit)
      const restNodes = nodes.slice(rootProps.searcherLimit)
      return {
        nodesCount,
        defaultVisibleNodes,
        restNodes
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        emit('key-enter')
      }
    }

    /**
     * 查询
     * 查询的关键点是, 在请求之时对比query和上一次查询的query是否一致
     */
    const handleSearch = () => {
      // 查询条件一致时不再重新重置分页
      const queryChanged =
        currentQueryStr.value !== JSON.stringify(rootProps.query)
      fetchData(queryChanged)
    }

    /** 重置 */
    const handleReset = () => {
      const { query } = rootProps
      // 点击重置按钮时会改变query的值, 为了使其不和监听的query冲突从而发生多次请求
      // 因此此处使用变量来控制watch函数中的fetchData不执行
      setAutoQuery(false)
      query &&
        Object.keys(query).forEach(key => {
          query[key] = defaultQuery.value[key]
        })
      fetchData()
      nextTick(() => setAutoQuery(true))
    }

    const expanded = ref(false)
    const handleToggleExpand = () => {
      expanded.value = !expanded.value
    }

    const toolsRef = shallowRef<HTMLDivElement | null>(null)

    const { setToolsHeight } = inject(proTableHeightKey)!

    const observer = new ResizeObserver(([entry]) => {
      setToolsHeight((entry.target as HTMLElement).offsetHeight)
    })

    onMounted(() => {
      toolsRef.value && observer.observe(toolsRef.value)
    })

    onBeforeUnmount(() => {
      observer?.disconnect()
    })



    return () => {
      const { defaultVisibleNodes, nodesCount, restNodes } = getNodes()

      const showSearchButton = Boolean(
        rootProps.showSearchButton === undefined
          ? rootProps.api || nodesCount
          : rootProps.showSearchButton
      )

      const searchButton = showSearchButton ? (
        <>
          <ElButton
            loading={loading.value}
            icon={Search}
            onClick={handleSearch}
            title='查询'
          />
          {nodesCount || rootProps.pagination ? (
            <ElButton
              loading={loading.value}
              icon={Refresh}
              title='重置'
              onClick={handleReset}
            />
          ) : null}
        </>
      ) : null

      const expandButton =
        nodesCount > rootProps.searcherLimit ? (
          <ElButton
            icon={expanded.value ? Minus : Plus}
            onClick={handleToggleExpand}
          >
            {expanded.value ? '收起' : '展开'}
          </ElButton>
        ) : null

      return (
        <section class={ns.e('tools')} ref={toolsRef}>
          <div class={ns.e('tools-bar')}>
            <div class={ns.e('searcher-box')} onKeyup={handleKeyUp}>
              {defaultVisibleNodes}
              {searchButton}
              {expandButton}
            </div>

            <div class={ns.e('tools-box')}>{proTableSlots.tools?.()}</div>
          </div>

          {expanded.value ? (
            <div class={ns.e('searcher-popper')} onKeyup={handleKeyUp}>
              {restNodes}
            </div>
          ) : null}

          {proTableSlots?.['extra-bar'] ? proTableSlots['extra-bar']() : null}
        </section>
      )
    }
  }
})
