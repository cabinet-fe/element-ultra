import {
  defineComponent,
  Fragment,
  getCurrentInstance,
  h,
  nextTick,
  onMounted,
  onUpdated,
  provide,
  ref,
  renderSlot,
  watch,
  type PropType
} from 'vue'
import { isPromise, NOOP } from '@vue/shared'
import {
  EVENT_CODE,
  INPUT_EVENT,
  UPDATE_MODEL_EVENT
} from '@element-ultra/constants'
import ElIcon from '@element-ultra/components/icon'
import { Plus } from '@element-plus/icons-vue'
import { tabsRootContextKey } from '@element-ultra/tokens'
import TabNav from './tab-nav'
import type { TabsPaneContext } from '@element-ultra/tokens'

import type { Component, ComponentInternalInstance, VNode, Ref } from 'vue'

const getPaneInstanceFromSlot = (
  vnode: VNode,
  paneInstanceList: ComponentInternalInstance[] = []
) => {
  const children = (vnode.children || []) as ArrayLike<VNode>
  Array.from(children).forEach(node => {
    let type = node.type
    type = (type as Component).name || type
    if (type === 'ElTabPane' && node.component) {
      paneInstanceList.push(node.component)
    } else if (type === Fragment || type === 'template') {
      getPaneInstanceFromSlot(node, paneInstanceList)
    }
  })
  return paneInstanceList
}

export default defineComponent({
  name: 'ElTabs',

  props: {
    type: {
      type: String as PropType<'card' | 'border-card' | ''>,
      default: ''
    },
    hideContent: Boolean,
    activeName: {
      type: String,
      default: ''
    },
    closable: Boolean,
    addable: Boolean,
    modelValue: {
      type: [String, Number],
      default: ''
    },
    bars: Array as PropType<string[]>,
    editable: Boolean,
    tabPosition: {
      type: String as PropType<'top' | 'right' | 'bottom' | 'left'>,
      default: 'top'
    },
    beforeLeave: {
      type: Function as PropType<
        (
          newTabName: string | number,
          oldTabName: string | number
        ) => void | boolean | Promise<void | boolean>
      >,
      default: () => true
    },
    stretch: Boolean
  },
  emits: {
    [UPDATE_MODEL_EVENT]: (tabName: string | number) =>
      typeof tabName === 'string' || typeof tabName === 'number',
    [INPUT_EVENT]: (tabName: string | number) =>
      typeof tabName === 'string' || typeof tabName === 'number',
    'tab-click': (pane: TabsPaneContext, ev: Event) => ev instanceof Event,
    edit: (paneName: string | number | null, action: 'remove' | 'add') =>
      action === 'remove' || action === 'add',
    'tab-remove': (paneName: string | number) =>
      typeof paneName === 'string' || typeof paneName === 'number',
    'tab-add': () => true
  },

  setup(props, { emit, slots, expose }) {
    const instance = getCurrentInstance()!
    const nav$ = ref<InstanceType<typeof TabNav>>()

    const panes: Ref<TabsPaneContext[]> = ref([])
    const currentName = ref(props.modelValue || props.activeName || '0')

    const paneStatesMap: Record<number, TabsPaneContext> = {}

    const updatePaneInstances = (isForceUpdate = false) => {
      if (slots.default) {
        const children = instance.subTree.children as ArrayLike<VNode>
        const content = Array.from(children).find(
          ({ props }) => props?.class === 'el-tabs__content'
        )
        if (!content) return

        const paneInstanceList: TabsPaneContext[] = getPaneInstanceFromSlot(
          content
        ).map(paneComponent => paneStatesMap[paneComponent.uid])

        const panesChanged = !(
          paneInstanceList.length === panes.value.length &&
          paneInstanceList.every(
            (pane, index) => pane.uid === panes.value[index].uid
          )
        )

        if (isForceUpdate || panesChanged) {
          panes.value = paneInstanceList
        }
      } else if (panes.value.length !== 0) {
        panes.value = []
      }
    }

    const changeCurrentName = (value: string | number) => {
      currentName.value = value
      emit(INPUT_EVENT, value)
      emit(UPDATE_MODEL_EVENT, value)
    }

    const setCurrentName = (value: string | number) => {
      // should do nothing.
      if (currentName.value === value) return

      const canLeave = props.beforeLeave?.(value, currentName.value)
      if (isPromise(canLeave)) {
        canLeave.then(
          () => {
            changeCurrentName(value)

            // call exposed function, Vue doesn't support expose in typescript yet.
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            nav$.value?.removeFocus?.()
          },
          // ignore promise rejection in `before-leave` hook
          NOOP
        )
      } else if (canLeave !== false) {
        changeCurrentName(value)
      }
    }

    const handleTabClick = (
      tab: TabsPaneContext,
      tabName: string | number,
      event: Event
    ) => {
      if (tab.props.disabled) return
      setCurrentName(tabName)
      emit('tab-click', tab, event)
    }

    const handleTabRemove = (pane: TabsPaneContext, ev: Event) => {
      if (pane.props.disabled) return
      ev.stopPropagation()
      emit('edit', pane.props.name, 'remove')
      emit('tab-remove', pane.props.name)
    }

    const handleTabAdd = () => {
      emit('edit', null, 'add')
      emit('tab-add')
    }

    onUpdated(() => updatePaneInstances())
    onMounted(() => updatePaneInstances())

    watch(
      () => props.activeName,
      modelValue => setCurrentName(modelValue)
    )

    watch(
      () => props.modelValue,
      modelValue => setCurrentName(modelValue)
    )

    watch(currentName, async () => {
      updatePaneInstances(true)
      await nextTick()
      await nav$.value?.$nextTick()

      // call exposed function, Vue doesn't support expose in typescript yet.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      nav$.value?.scrollToActiveTab()
    })

    provide(tabsRootContextKey, {
      props,
      currentName,
      updatePaneState: pane => (paneStatesMap[pane.uid] = pane)
    })

    expose({
      currentName
    })

    return () => {
      const { hideContent } = props

      const newButton =
        props.editable || props.addable
          ? h(
              'span',
              {
                class: 'el-tabs__new-tab',
                tabindex: '0',
                onClick: handleTabAdd,
                onKeydown: (ev: KeyboardEvent) => {
                  if (ev.code === EVENT_CODE.enter) handleTabAdd()
                }
              },
              [h(ElIcon, { class: 'is-icon-plus' }, { default: () => h(Plus) })]
            )
          : null

      const header = h(
        'div',
        { class: ['el-tabs__header', `is-${props.tabPosition}`] },
        [
          newButton,
          h(TabNav, {
            currentName: currentName.value,
            editable: props.editable,
            type: props.type,
            panes: panes.value,
            stretch: props.stretch,
            ref: nav$,
            onTabClick: handleTabClick,
            onTabRemove: handleTabRemove
          })
        ]
      )

      const panels = h(
        'div',
        {
          class: 'el-tabs__content'
        },
        [renderSlot(slots, 'default')]
      )
      if (hideContent) {
        nextTick(() => {
          panels.el?.parentNode?.removeChild(panels.el)
        })
      }
      return h(
        'div',
        {
          class: {
            'el-tabs': true,
            'el-tabs--card': props.type === 'card',
            [`el-tabs--${props.tabPosition}`]: true,
            'el-tabs--border-card': props.type === 'border-card'
          }
        },
        props.tabPosition !== 'bottom' ? [header, panels] : [panels, header]
      )
    }
  }
})
