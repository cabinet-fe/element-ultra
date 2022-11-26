import { useConfig } from '@element-ultra/hooks'
import { computed, shallowReactive, shallowRef, watch } from 'vue'
import type { TableSelectProps } from './table-select'

interface Options {
  props: TableSelectProps
}

export default function useApi(options: Options) {
  const { props } = options

  const [configStore] = useConfig()

  const pageQuery = shallowReactive({
    page: 1,
    size: 20
  })

  const total = shallowRef(0)

  const internalData = shallowRef<any[]>([])

  const data = computed(() => {
    return props.data || internalData.value
  })

  const loading = shallowRef(false)
  /**
   * 查询数据
   * @param reset 重置分页 默认 true
   */
  const fetchData = async (reset = true) => {
    const { api } = props
    if (!configStore.tableSelectRequestMethod || !api) return
    if (reset) {
      pageQuery.page = 1
    }
    const { query } = props

    let realQuery = Object.keys(query || {}).reduce((acc, cur) => {
      let v = query![cur]
      if (cur.startsWith('$')) {
        cur = cur.slice(1)
      }
      acc[cur] = v
      return acc
    }, {} as Record<string, any>)

    loading.value = true

    const { total: _total, data } = await configStore
      .tableSelectRequestMethod({
        api,
        query: {
          ...realQuery,
          ...pageQuery
        }
      })
      .finally(() => {
        loading.value = false
      })

    if (_total) {
      total.value = _total
    }

    internalData.value = data
  }

  const queryWatchList = computed(() => {
    return Object.keys(props.query || {})
      .filter(k => k.startsWith('$'))
      .map(k => {
        return props.query?.[k]
      })
  })

  watch(queryWatchList, () => fetchData())

  return {
    fetchData,
    total,
    pageQuery,
    data,
    loading
  }
}
