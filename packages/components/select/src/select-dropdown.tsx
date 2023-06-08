import { computed, defineComponent, inject, ref, unref } from 'vue'
import { get } from 'lodash-unified'
import { isObject, isUndefined } from '@element-ultra/utils'
import {
  DynamicSizeList,
  FixedSizeList
} from '@element-ultra/components/virtual-list'
import { useNamespace } from '@element-ultra/hooks'
import { EVENT_CODE } from '@element-ultra/shared'
import GroupItem from './group-item.vue'
import OptionItem from './option-item.vue'

import { selectInjectionKey } from './token'

import type { ItemProps } from '@element-ultra/components/virtual-list'
import type { Option, OptionItemProps } from './select.types'
import { ElCheckbox } from '@element-ultra/components/checkbox'

export default defineComponent({
  name: 'ElSelectDropdown',

  components: {
    ElCheckbox
  },

  props: {
    data: {
      type: Array,
      required: true
    },
    hoveringIndex: Number,
    width: Number
  },
  setup(props, { slots, expose }) {
    const select = inject(selectInjectionKey)!
    const ns = useNamespace('select')
    const cachedHeights = ref<Array<number>>([])

    const { props: selectProps } = select

    const listRef = ref()

    const isSized = computed(() =>
      isUndefined(select.props.estimatedOptionHeight)
    )
    const listProps = computed(() => {
      if (isSized.value) {
        return {
          itemSize: select.props.itemHeight
        }
      }

      return {
        estimatedSize: select.props.estimatedOptionHeight,
        itemSize: (idx: number) => cachedHeights.value[idx]
      }
    })

    const checkedSet = computed(() => {
      return new Set<any>(
        selectProps.multiple && selectProps.modelValue
          ? selectProps.modelValue
          : undefined
      )
    })

    const contains = (arr: Array<any> = [], target: any) => {
      const {
        props: { valueKey }
      } = select

      if (!isObject(target)) {
        return checkedSet.value.has(target)
      }

      return (
        arr &&
        arr.some(item => {
          return get(item, valueKey) === get(target, valueKey)
        })
      )
    }
    const isEqual = (selected: unknown, target: unknown) => {
      if (!isObject(target)) {
        return selected === target
      } else {
        const { valueKey } = select.props
        return get(selected, valueKey) === get(target, valueKey)
      }
    }

    const isItemSelected = (modelValue: any[] | any, target: Option) => {
      const { valueKey } = select.props
      if (select.props.multiple) {
        return contains(modelValue, get(target, valueKey))
      }
      return isEqual(modelValue, get(target, valueKey))
    }

    const isItemDisabled = (modelValue: any[] | any, selected: boolean) => {
      const { disabled, multiple, multipleLimit } = select.props
      return (
        disabled ||
        (!selected &&
          (multiple
            ? multipleLimit > 0 && modelValue.length >= multipleLimit
            : false))
      )
    }

    const isItemHovering = (target: number) => props.hoveringIndex === target

    const scrollToItem = (index: number) => {
      const list = listRef.value as any
      if (list) {
        list.scrollToItem(index)
      }
    }

    const resetScrollTop = () => {
      const list = listRef.value as any
      if (list) {
        list.resetScrollTop()
      }
    }

    expose({
      listRef,
      isSized,

      isItemDisabled,
      isItemHovering,
      isItemSelected,
      scrollToItem,
      resetScrollTop
    })

    const Item = (itemProps: ItemProps<any>) => {
      const { index, data, style } = itemProps
      const sized = unref(isSized)
      const { itemSize, estimatedSize } = unref(listProps)
      const { modelValue } = select.props
      const { onSelect, onHover } = select
      const item = data[index]
      if (item.type === 'Group') {
        return (
          <GroupItem
            item={item}
            style={style}
            height={(sized ? itemSize : estimatedSize) as number}
          />
        )
      }

      const isSelected = isItemSelected(modelValue, item)
      const isDisabled = isItemDisabled(modelValue, isSelected)
      const isHovering = isItemHovering(index)
      return (
        <OptionItem
          {...itemProps}
          selected={isSelected}
          disabled={
            selectProps.selectable ? !selectProps.selectable(item) : isDisabled
          }
          created={!!item.created}
          hovering={isHovering}
          item={item}
          onSelect={onSelect}
          onHover={onHover}
        >
          {{
            default: (props: OptionItemProps) =>
              slots.default?.(props) || <span>{item.label}</span>
          }}
        </OptionItem>
      )
    }

    // computed
    const { onKeyboardNavigate, onKeyboardSelect } = select

    const onForward = () => {
      onKeyboardNavigate('forward')
    }

    const onBackward = () => {
      onKeyboardNavigate('backward')
    }

    const onEscOrTab = () => {
      select.expanded = false
    }

    const onKeydown = (e: KeyboardEvent) => {
      const { code } = e
      const tab = EVENT_CODE.tab
      const esc = EVENT_CODE.esc
      const down = EVENT_CODE.down
      const up = EVENT_CODE.up
      const enter = EVENT_CODE.enter
      if (code !== tab) {
        e.preventDefault()
        e.stopPropagation()
      }

      switch (code) {
        case tab:
        case esc: {
          onEscOrTab()
          break
        }
        case down: {
          onForward()
          break
        }
        case up: {
          onBackward()
          break
        }
        case enter: {
          onKeyboardSelect()
          break
        }
      }
    }

    const allChecked = computed(() => {
      return selectProps.options.every(item => {
        return checkedSet.value.has(item[selectProps.valueKey])
      })
    })

    const handleSelectAll = (checked: boolean) => {
      if (checked) {
        select.update(
          selectProps.options.map(option => option[selectProps.valueKey]),
          selectProps.options.map(option => option[selectProps.labelKey]),
          selectProps.options.slice()
        )
        select.states.cachedOptions = selectProps.options.slice()

      } else {
        select.update([], [], [])
        select.states.cachedOptions =  []
      }
    }

    return () => {
      const { data, width } = props
      const { height, multiple, scrollbarAlwaysOn } = select.props

      if (data.length === 0) {
        return (
          <div
            class={ns.b('dropdown')}
            style={{
              width: `${width}px`
            }}
          >
            {slots.empty?.()}
          </div>
        )
      }

      const List = unref(isSized) ? FixedSizeList : DynamicSizeList

      return (
        <div class={[ns.b('dropdown'), ns.is('multiple', multiple)]}>
          <List
            ref={listRef}
            {...unref(listProps)}
            className={ns.be('dropdown', 'list')}
            scrollbarAlwaysOn={scrollbarAlwaysOn}
            data={data}
            height={height}
            width={width}
            total={data.length}
            // @ts-ignore - dts problem
            onKeydown={onKeydown}
          >
            {{
              default: (props: ItemProps<any>) => <Item {...props} />
            }}
          </List>
          {selectProps.multiple ? (
            <OptionItem
              style={{
                listStyle: 'none',
                borderTop: '1px solid #f2f2f2',
                fontSize: 0
              }}
            >
              <span style='vertical-align: top; display: inline-block;font-size: 14px; margin-right: 8px'>
                已选择: {selectProps.modelValue?.length ?? 0} 项
              </span>
              <el-checkbox
                modelValue={allChecked.value}
                onUpdate:modelValue={handleSelectAll}
              >
                全选
              </el-checkbox>
            </OptionItem>
          ) : null}
        </div>
      )
    }
  }
})
