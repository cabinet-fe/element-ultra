<template>
  <div
    :class="['el-cascade-panel', border && 'is-bordered']"
    @keydown="handleKeyDown"
  >
    <el-cascade-menu
      v-for="(menu, index) in menus"
      :key="index"
      :ref="item => (menuList[index] = item)"
      :index="index"
      :nodes="menu"
    />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onBeforeUpdate,
  onMounted,
  provide,
  reactive,
  ref,
  shallowRef,
  watch
} from 'vue'
import { isEqual, flattenDeep } from 'lodash-unified'
import { isClient } from '@vueuse/core'
import {
  focusNode,
  getSibling,
  isEmpty,
  unique,
  castArray,
  scrollIntoView
} from '@element-ultra/utils'
import {
  EVENT_CODE,
  UPDATE_MODEL_EVENT,
  CHANGE_EVENT
} from '@element-ultra/shared'

import ElCascadeMenu from './menu.vue'
import Store from './store'
import Node, { ExpandTrigger } from './node'
import { CommonProps, useCascadeConfig } from './config'
import { checkNode, getMenuIndex, sortByOriginalOrder } from './utils'
import { Cascade_PANEL_INJECTION_KEY } from './types'

import type { PropType } from 'vue'
import type { Nullable } from '@element-ultra/utils'
import type {
  CascadeValue,
  CascadeNodeValue,
  CascadeOption,
  RenderLabel,
  default as CascadeNode
} from './node'

import type { ElCascadePanelContext } from './types'

export default defineComponent({
  name: 'ElCascadePanel',

  components: {
    ElCascadeMenu
  },

  props: {
    ...CommonProps,
    border: {
      type: Boolean,
      default: true
    },
    renderLabel: Function as PropType<RenderLabel>
  },

  emits: [UPDATE_MODEL_EVENT, CHANGE_EVENT, 'close', 'expand-change'],

  setup(props, { emit, slots }) {
    // for interrupt sync check status in lazy mode
    let manualChecked = false

    const config = useCascadeConfig(props)

    let store: Nullable<Store> = null
    const initialLoaded = ref(true)
    const menuList = ref<any[]>([])
    const checkedValue = shallowRef<Nullable<CascadeValue>>(null)
    const menus = ref<CascadeNode[][]>([])
    const expandingNode = shallowRef<Nullable<CascadeNode>>(null)
    const checkedNodes = shallowRef<CascadeNode[]>([])

    const isHoverMenu = computed(
      () => config.value.expandTrigger === ExpandTrigger.HOVER
    )
    const renderLabelFn = computed(() => props.renderLabel || slots.default)

    const initStore = () => {
      const { options } = props
      const cfg = config.value

      manualChecked = false
      store = new Store(options, cfg)
      menus.value = [store.getNodes()]

      if (cfg.lazy && isEmpty(props.options)) {
        initialLoaded.value = false
        lazyLoad(undefined, list => {
          if (list) {
            store = new Store(list, cfg)
            menus.value = [store.getNodes()]
          }
          initialLoaded.value = true
          syncCheckedValue(false, true)
        })
      } else {
        syncCheckedValue(false, true)
      }
    }

    const lazyLoad: ElCascadePanelContext['lazyLoad'] = (node, cb) => {
      const cfg = config.value
      node! = node || new Node({}, cfg, undefined, true)
      node.loading = true

      const resolve = (dataList: CascadeOption[]) => {
        const _node = node as Node
        const parent = _node.root ? null : _node
        dataList && store?.appendNodes(dataList, parent as any)
        _node.loading = false
        _node.loaded = true
        _node.childrenData = _node.childrenData || []
        cb && cb(dataList)
      }

      cfg.lazyLoad(node, resolve as any)
    }

    const expandNode: ElCascadePanelContext['expandNode'] = (node, silent) => {
      const { level } = node
      const newMenus = menus.value.slice(0, level)
      let newExpandingNode: Nullable<CascadeNode>

      if (node.isLeaf) {
        newExpandingNode = node.pathNodes[level - 2]
      } else {
        newExpandingNode = node
        newMenus.push(node.children)
      }

      if (expandingNode.value?.uid !== newExpandingNode?.uid) {
        expandingNode.value = node
        menus.value = newMenus
        !silent && emit('expand-change', node?.pathValues || [])
      }
    }

    const handleCheckChange: ElCascadePanelContext['handleCheckChange'] = (
      node,
      checked,
      emitClose = true
    ) => {
      const { checkStrictly, multiple } = config.value
      const oldNode = checkedNodes.value[0]
      manualChecked = true
      // 单选则取消旧的选中
      !multiple && oldNode?.doCheck(false)

      node.doCheck(checked)
      calculateCheckedValue()
      if (!multiple && !checkStrictly) {
        emitClose ? emit('close') : expandParentNode(node)
      }
    }

    const expandParentNode = node => {
      if (!node) return
      node = node.parent
      expandParentNode(node)
      node && expandNode(node)
    }

    const getFlattedNodes = (leafOnly: boolean) => {
      return store?.getFlattedNodes(leafOnly)
    }

    const getCheckedNodes = (leafOnly: boolean) => {
      return getFlattedNodes(leafOnly)?.filter(node => node.checked !== false)
    }

    const clearCheckedNodes = () => {
      checkedNodes.value.forEach(node => node.doCheck(false))
      calculateCheckedValue()
    }

    const calculateCheckedValue = () => {
      const { checkStrictly, multiple } = config.value
      const oldNodes = checkedNodes.value
      const newNodes = getCheckedNodes(!checkStrictly)!

      // ensure the original order
      const nodes = sortByOriginalOrder(oldNodes, newNodes)

      const values = nodes.map(node => node.valueByOption)
      checkedNodes.value = nodes
      checkedValue.value = multiple ? values : values[0] ?? null
    }

    const syncCheckedValue = (loaded = false, forced = false) => {
      const { modelValue } = props
      const { lazy, multiple, checkStrictly } = config.value
      const leafOnly = !checkStrictly

      if (
        !initialLoaded.value ||
        manualChecked ||
        (!forced && isEqual(modelValue, checkedValue.value))
      )
        return

      if (lazy && !loaded) {
        const values: CascadeNodeValue[] = unique(
          flattenDeep(castArray(modelValue))
        )
        const nodes = values
          .map(val => store?.getNodeByValue(val))
          .filter(node => !!node && !node.loaded && !node.loading) as Node[]

        if (nodes.length) {
          nodes.forEach(node => {
            lazyLoad(node, () => syncCheckedValue(false, forced))
          })
        } else {
          syncCheckedValue(true, forced)
        }
      } else {
        const values = multiple ? castArray(modelValue) : [modelValue]
        const nodes = unique(
          values.map(val => store?.getNodeByValue(val, leafOnly))
        ) as Node[]
        syncMenuState(nodes, false)
        checkedValue.value = modelValue!
      }
    }

    const syncMenuState = (
      newCheckedNodes: CascadeNode[],
      reserveExpandingState = true
    ) => {
      const { checkStrictly } = config.value
      const oldNodes = checkedNodes.value
      const newNodes = newCheckedNodes.filter(
        node => !!node && (checkStrictly || node.isLeaf)
      )
      const oldExpandingNode = store?.getSameNode(expandingNode.value!)
      const newExpandingNode =
        (reserveExpandingState && oldExpandingNode) || newNodes[0]

      if (newExpandingNode) {
        newExpandingNode.pathNodes.forEach(node => expandNode(node, true))
      } else {
        expandingNode.value = null
      }

      oldNodes.forEach(node => node.doCheck(false))
      // newNodes.forEach(node => node.doCheck(true))
      if (props.props.multiple) {
        reactive(newNodes).forEach((node) => node.doCheck(true))
      } else {
        newNodes.forEach((node) => node.doCheck(true))
      }
      checkedNodes.value = newNodes
      nextTick(scrollToExpandingNode)
    }

    const scrollToExpandingNode = () => {
      if (!isClient) return

      menuList.value.forEach(menu => {
        const menuElement = menu?.$el
        if (menuElement) {
          const container = (menuElement as HTMLElement).querySelector(
            '.el-scrollbar__wrap'
          )
          const activeNode =
            menuElement.querySelector('.el-cascade-node.is-active') ||
            menuElement.querySelector('.el-cascade-node.in-active-path')
          scrollIntoView(container as HTMLElement, activeNode)
        }
      })
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      const { code } = e

      switch (code) {
        case EVENT_CODE.up:
        case EVENT_CODE.down: {
          e.preventDefault()
          const distance = code === EVENT_CODE.up ? -1 : 1
          focusNode(
            getSibling(target, distance, '.el-cascade-node[tabindex="-1"]')
          )
          break
        }
        case EVENT_CODE.left: {
          e.preventDefault()
          const preMenu = menuList.value[getMenuIndex(target) - 1]
          const expandedNode = preMenu?.$el.querySelector(
            '.el-cascade-node[aria-expanded="true"]'
          )
          focusNode(expandedNode)
          break
        }
        case EVENT_CODE.right: {
          e.preventDefault()
          const nextMenu = menuList.value[getMenuIndex(target) + 1]
          const firstNode = nextMenu?.$el.querySelector(
            '.el-cascade-node[tabindex="-1"]'
          )
          focusNode(firstNode)
          break
        }
        case EVENT_CODE.enter:
          checkNode(target)
          break
        case EVENT_CODE.esc:
        case EVENT_CODE.tab:
          emit('close')
          break
      }
    }

    provide(
      Cascade_PANEL_INJECTION_KEY,
      reactive({
        config,
        expandingNode,
        checkedNodes,
        isHoverMenu,
        initialLoaded,
        renderLabelFn,
        lazyLoad,
        expandNode,
        handleCheckChange
      })
    )

    watch([config, () => props.options], initStore, {
      deep: true,
      immediate: true
    })

    watch(
      () => props.modelValue,
      () => {
        manualChecked = false
        syncCheckedValue()
      }
    )

    watch(checkedValue, val => {
      if (!isEqual(val, props.modelValue)) {
        emit(UPDATE_MODEL_EVENT, val)
        const { multiple } = config.value
        const _checkedNodes = checkedNodes.value
        if (multiple) {
          const { label, item } = _checkedNodes.reduce(
            (acc, cur) => {
              acc.item.push(cur.nodeByOption)
              acc.label.push(cur.labelByOption)
              return acc
            },
            { label: [] as any[], item: [] as any[] }
          )
          emit(CHANGE_EVENT, val, label, item)
        } else {
          const checkedNode = _checkedNodes[0]
          emit(
            CHANGE_EVENT,
            val,
            checkedNode?.labelByOption,
            checkedNode?.nodeByOption
          )
        }
      }
    })

    onBeforeUpdate(() => (menuList.value = []))

    onMounted(() => !isEmpty(props.modelValue) && syncCheckedValue())

    return {
      menuList,
      menus,
      checkedNodes,
      handleKeyDown,
      handleCheckChange,
      getFlattedNodes,
      getCheckedNodes,
      clearCheckedNodes,
      calculateCheckedValue,
      scrollToExpandingNode
    }
  }
})
</script>
