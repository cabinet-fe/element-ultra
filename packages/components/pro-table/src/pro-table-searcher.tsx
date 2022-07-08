import { Search, Plus, Minus } from '@element-plus/icons-vue'
import { computed, defineComponent, inject, ref } from 'vue'
import ElButton from '@element-ultra/components/button'
import { proTableKey } from './token'

export default defineComponent({
  emits: {
    'key-enter': () => true,
    search: () => true
  },

  setup(props, { emit }) {
    const { proTableSlots, ns, rootProps } = inject(proTableKey)!

    const getNodes = () => {
      const nodes = proTableSlots.searcher?.() || []
      let nodesCount = nodes.length
      let defaultVisibleNodes = nodes.slice(0, rootProps.searcherLimit)
      let restNodes = nodes.slice(rootProps.searcherLimit)
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

    const expanded = ref(false)
    const handleToggleExpand = () => {
      expanded.value = !expanded.value
    }

    return () => {
      const { defaultVisibleNodes, nodesCount, restNodes } = getNodes()

      const searchButton = rootProps.api ? (
        <ElButton icon={Search} onClick={handleSearch}></ElButton>
      ) : null

      const expandButton =
        nodesCount > rootProps.searcherLimit ? (
          <ElButton icon={expanded.value ? Minus : Plus} onClick={handleToggleExpand}></ElButton>
        ) : null

      return (
        <div class={ns.e('searcher-box')} onKeyup={handleKeyUp}>
          {defaultVisibleNodes}
          {expanded.value ? restNodes : null}
          {searchButton}
          {expandButton}
        </div>
      )
    }
  }
})
