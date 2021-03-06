import { Search, Plus, Minus, Refresh } from '@element-plus/icons-vue'
import {
  cloneVNode,
  createVNode,
  defineComponent,
  inject,
  isVNode,
  onMounted,
  onUnmounted,
  ref,
  shallowRef,
  type Component,
  type VNode,
  type VNodeNormalizedChildren
} from 'vue'
import ElButton from '@element-ultra/components/button'
import { proTableKey } from './token'
import { isComment, isFragment, isTemplate } from '@element-ultra/utils'
import { useConfig } from '@element-ultra/hooks'

export default defineComponent({
  emits: {
    'key-enter': () => true,
    search: () => true,
    'tools-resize': (height: number) => true
  },

  setup(props, { emit }) {
    const { proTableSlots, ns, rootProps, setAutoQuery, loading } =
      inject(proTableKey)!

    const defaultQuery = { ...rootProps.query }

    const componentWidthMapper: Record<string, any> = {
      ElDatePicker: '240px'
    }

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
            if (!isVNode(node)) return

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
                  <label class={labelClass}>{props.placeholder}:</label>
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
    const handleSearch = () => {
      emit('search')
    }

    const handleReset = () => {
      const { query } = rootProps
      setAutoQuery(false)
      if (query) {
        Object.keys(query).forEach(key => {
          query[key] = defaultQuery[key]
        })
      }
      handleSearch()
      setAutoQuery(true)
    }

    const expanded = ref(false)
    const handleToggleExpand = () => {
      expanded.value = !expanded.value
    }

    const toolsRef = shallowRef<HTMLDivElement | null>(null)


    const [conf] = useConfig()
    /** ?????????????????????????????? */
    const renderExtraTools = () => {
      if (!conf.proTableExtraTools) return null
        const nodes = conf.proTableExtraTools.map(component => {
          return createVNode(component)
        })

        return nodes
    }


    let observer: ResizeObserver | null = null
    onMounted(() => {
      observer = new ResizeObserver(entries => {
        emit('tools-resize', entries[0]?.borderBoxSize[0]?.blockSize)
      })
      toolsRef.value && observer.observe(toolsRef.value, { box: 'border-box' })
    })

    onUnmounted(() => {
      observer?.disconnect()
    })

    return () => {
      const { defaultVisibleNodes, nodesCount, restNodes } = getNodes()

      const showSearchButton = Boolean(rootProps.api && nodesCount)

      const searchButton = showSearchButton ? (
        <>
          <ElButton
            loading={loading.value}
            icon={Search}
            onClick={handleSearch}
            title='??????'
          />
          <ElButton
            loading={loading.value}
            icon={Refresh}
            title='??????'
            onClick={handleReset}
          />
        </>
      ) : null

      const expandButton =
        nodesCount > rootProps.searcherLimit ? (
          <ElButton
            icon={expanded.value ? Minus : Plus}
            onClick={handleToggleExpand}
          >
            {expanded.value ? '??????' : '??????'}
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

            <div class={ns.e('tools-box')}>
              {proTableSlots.tools?.()}
              {renderExtraTools()}
            </div>
          </div>

          {expanded.value ? (
            <div class={ns.e('searcher-popper')} onKeyup={handleKeyUp}>
              {restNodes}
            </div>
          ) : null}
        </section>
      )
    }
  }
})
