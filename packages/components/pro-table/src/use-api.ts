import { useConfig } from '@element-ultra/hooks'
import { getCurrentInstance, shallowReactive, shallowRef, watch } from 'vue'
import type { ProTableEmits, ProTableProps } from './pro-table'

interface Options {
  props: ProTableProps
  emit: ProTableEmits
  canAutoQuery: { value: boolean }
}

export function useApi(options: Options) {
  const { props, emit, canAutoQuery } = options

  const [configStore] = useConfig()

  const pageQuery = shallowReactive({
    page: 1,
    size: configStore.proTableDefaultSize || 20
  })

  const inst = getCurrentInstance()!

  /** 缓存query */
  const storeQuery = () => {
    const { pagination, query } = props
    const { $router } = inst.appContext.app.config.globalProperties

    if (!query || !$router) return
    const _query = pagination ? { ...query, ...pageQuery } : query
    let queryStr = Object.keys(_query)
      .reduce((acc, key) => {
        const v = _query[key]
        let t = ''
        if (Array.isArray(v)) {
          t = '@a'
        } else if (typeof v === 'number') {
          t = '@n'
        }
        if ([undefined, null, ''].includes(v)) return acc
        return (acc += `${key + t}=${String(v)}&`)
      }, '')
      .slice(0, -1)

    if (queryStr) {
      queryStr = '?' + queryStr
    }

    if (location.search === queryStr) return
    $router.replace(location.pathname + queryStr)
  }

  let sortKeys: Record<string, 'asc' | 'dsc' | 'default'> | undefined =
    undefined

  const handleSort = (_sortKeys: Record<string, 'asc' | 'dsc' | 'default'>) => {
    sortKeys = _sortKeys
    fetchData(false)
  }

  /** 获取查询参数 */
  const getParams = () => {
    const { query, api, pagination, requestExtra } = props
    const _query: Record<string, any> = {}

    query &&
      Object.keys(query).forEach(key => {
        // 尝试将自动请求的$前缀去掉
        _query[key.replace(/^\$/, '')] = query[key]
      })

    return {
      api: api!,
      query: pagination ? { ..._query, ...pageQuery } : _query,
      extra: requestExtra,
      sortKeys
    }
  }

  const loading = shallowRef(false)
  const startLoading = () => (loading.value = true)
  const endLoading = () => (loading.value = false)

  const state = shallowReactive({
    /** 分页的总数 */
    total: 0,
    /** 表格的数据 */
    data: [] as any[],
    /** 表格的字段的统计 */
    statistics: undefined as Record<string, any> | undefined
  })

  const currentQueryStr = {
    value: ''
  }

  /**
   * 请求数据
   * @param resetPage 重置分页到第一页
   */
  const fetchData = async (resetPage = true) => {
    const { api, data, cacheParams } = props
    const { proTableRequestMethod: request } = configStore

    if (!api || data || !request) return

    // 重置分页
    if (resetPage) {
      pageQuery.page = 1
    }

    // 每次请求后尝试缓存query
    cacheParams && storeQuery()

    // 获取请求参数信息, 包含接口, 查询条件, 额外信息, 排序信息
    const params = getParams()
    // 记录当前的query字符串
    currentQueryStr.value = JSON.stringify(props.query)

    startLoading()
    const res = await request(params).finally(endLoading)

    state.data = res.data
    state.total = res.total ?? 0
    state.statistics = res.statistics

    emit('loaded', res)
  }

  const defaultQuery = { value: {} }
  /** 设置默认查询项 */
  const setDefaultQuery = (query?: Record<string, any>) => {
    if (!query) {
      defaultQuery.value = {}
      return
    }
    defaultQuery.value = JSON.parse(JSON.stringify(query))
  }

  const valueParser: Record<string, (v: string) => any> = {
    n: (v: string) => +v,
    a: (v: string) => v.split(',')
  }
  /** 读取地址栏参数 */
  const readUrlParams = () => {
    const search = location.search.replace('?', '')
    const { query } = props
    if (!search || !query) return

    search.split('&').forEach(item => {
      let [key, val] = decodeURIComponent(item).split('=')
      let [_key, t] = key.split('@')
      if (valueParser[t]) {
        val = valueParser[t](val)
      }
      if (_key in query) {
        query[_key] = val
      } else if (_key in pageQuery) {
        // @ts-ignore
        pageQuery[_key] = val
      }
    })
  }

  // api变更时需要重新请求数据
  watch(
    () => props.api,
    () => fetchData()
  )

  let stopWatchQueryField: () => void
  const watchQueryField = (query: Record<string, any>) => {
    const watchList = Object.keys(query)
      .filter(k => k.startsWith('$'))
      .map(k => () => query[k])

    stopWatchQueryField = watch(watchList, () => {
      canAutoQuery.value && fetchData()
    })
  }

  // 监听query, 获取query的默认值, 并重新监听每个以$开头的query字段
  watch(
    () => props.query,
    query => {
      // 停止监听之前的query字段
      stopWatchQueryField?.()
      // 设置默认query值
      setDefaultQuery(query)
      if (!query) return

      // 读取url中的参数到query和pageQuery中
      readUrlParams()

      watchQueryField(query)
    },
    { immediate: true }
  )

  // 第一次请求时可能读取url中的缓存, 因此不重置
  fetchData(false)

  return {
    fetchData,
    getParams,
    handleSort,
    state,
    pageQuery,
    loading,
    currentQueryStr,
    defaultQuery
  }
}
