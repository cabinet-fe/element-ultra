import { useConfig } from '@element-ultra/hooks'
import {
  computed,
  shallowReactive,
  shallowRef,
  watch,
  provide,
  inject,
  ShallowReactive,
  ShallowRef,
  ComputedRef,
  InjectionKey
} from 'vue'
import type { TableSelectProps } from './table-select'

interface Options {
  props: TableSelectProps
  type: 'provide' | 'inject'
}

const transformToken: InjectionKey<{
  fetchData: (reset?: boolean) => Promise<void>
  total: ShallowRef<number>
  pageQuery: ShallowReactive<{
    page: number
    size: number
  }>
  data: ComputedRef<any[]>
  loading: ShallowRef<boolean>
  displayData: ComputedRef<any[]>
}> = Symbol('transformToken')

export default function useApi(options: Options) {
  const { props, type } = options

  if (type === 'provide') {
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

    /** 数据value-key映射关系 */
    const dataValueKeyMap = computed<Record<string, any> | undefined>(() => {
      if (!props.valueKey || !data.value.length) return

      return data.value.reduce((acc, cur) => {
        acc[cur[props.valueKey]] = cur
        return acc
      }, {})
    })

    const loading = shallowRef(false)
    /**
     * 查询数据
     * @param reset 重置分页 默认 true
     */
    const fetchData = async (reset = true) => {
      const { api } = props
      if (!configStore.tableSelectRequestMethod || !api) return

      internalData.value = []

      if (reset) {
        pageQuery.page = 1
      }
      const { query, pagination } = props

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
            ...(pagination ? pageQuery : {})
          }
        })
        .finally(() => {
          loading.value = false
        })

      if (_total || _total === 0) {
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

    const displayData = computed(() => {
      const { modelValue, valueKey } = props
      if (!modelValue) return []

      const result = Array.isArray(modelValue) ? modelValue : [modelValue]

      // 有value-key时优先从valueKeyMap中取数据(数据相对会更加完整)
      if (valueKey && dataValueKeyMap.value) {
        return result.map(item => dataValueKeyMap.value![item[valueKey]])
      }
      return result
    })

    const exposed = {
      fetchData,
      total,
      pageQuery,
      data,
      loading,
      displayData
    }

    provide(transformToken, exposed)

    return exposed
  }

  return inject(transformToken)!
}
