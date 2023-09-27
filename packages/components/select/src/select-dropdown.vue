<template>
  <div :class="[ns.b('dropdown'), ns.is('multiple', selectProps.multiple)]">
    <FixedSizeList
      ref="listRef"
      v-bind="listProps"
      :class="ns.be('dropdown', 'list')"
      :scrollbarAlwaysOn="selectProps.scrollbarAlwaysOn"
      :data="data"
      :height="selectProps.height"
      :width="width"
      :total="data.length"
      @keydown="onKeydown"
      v-slot="{ style, index, key }"
    >
      <SelectItem :key="key" :style="style" :index="index" />
    </FixedSizeList>

    <div
      v-if="selectProps.multiple && selectProps.options.length"
      style="
        border-top: 1px solid #f2f2f2;
        fontsize: 0;
        color: var(--el-text-color-regular);
      "
      :style="{
        'line-height': selectProps.itemHeight + 'px',
        padding: '0 32px 0 20px'
      }"
    >
      <span
        style="
          vertical-align: top;
          display: inline-block;
          font-size: 14px;
          margin-right: 8px;
        "
      >
        已选择: {{ selectProps.modelValue?.length ?? 0 }} 项
      </span>
      <el-checkbox
        :model-value="allChecked"
        @update:model-value="handleSelectAll"
      >
        全选
      </el-checkbox>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { computed, inject, ref } from 'vue'
import { get } from 'lodash-unified'
import { isObject } from '@element-ultra/utils'
import { FixedSizeList } from '@element-ultra/components/virtual-list'
import { useNamespace } from '@element-ultra/hooks'
import { EVENT_CODE } from '@element-ultra/shared'
import GroupItem from './group-item.vue'
import OptionItem from './option-item.vue'

import { selectInjectionKey } from './token'

import type { Option, OptionItemProps } from './select.types'
import { ElCheckbox } from '@element-ultra/components/checkbox'
import type { PropType, CSSProperties } from 'vue'
import { useSlots } from 'vue'

const props = defineProps({
  data: {
    type: Array as PropType<Option[]>,
    required: true
  },
  hoveringIndex: Number,
  width: Number
})

const slots = useSlots()

const {
  props: selectProps,
  states: selectStates,
  update: updateSelect,
  expanded,
  onKeyboardNavigate,
  onKeyboardSelect,
  onHover,
  handleSelect,
  filteredOptions
} = inject(selectInjectionKey)!

const ns = useNamespace('select')

const listRef = ref()

const listProps = computed(() => {
  return {
    itemSize: selectProps.itemHeight
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
  const { valueKey } = selectProps

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
    const { valueKey } = selectProps
    return get(selected, valueKey) === get(target, valueKey)
  }
}

const isItemSelected = (modelValue: any[] | any, target: Option) => {
  const { valueKey, multiple } = selectProps
  if (multiple) {
    return contains(modelValue, get(target, valueKey))
  }
  return isEqual(modelValue, get(target, valueKey))
}

const isItemDisabled = (modelValue: any[] | any, selected: boolean) => {
  const { disabled, multiple, multipleLimit } = selectProps
  if (disabled) return true

  if (selected) return false

  if (multiple) {
    return multipleLimit > 0 && modelValue?.length >= multipleLimit
  }

  return false
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

const onForward = () => {
  onKeyboardNavigate('forward')
}

const onBackward = () => {
  onKeyboardNavigate('backward')
}

const onEscOrTab = () => {
  expanded.value = false
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
  const options = selectProps.options.concat(selectStates.createdOptions)
  if (!options.length) return false
  return options.every(item => {
    return checkedSet.value.has(item[selectProps.valueKey])
  })
})

const handleSelectAll = (checked: any) => {
  if (checked) {
    const { valueKey, labelKey } = selectProps
    const options = filteredOptions.value
    updateSelect(
      options.map(option => option[valueKey]),
      options.map(option => option[labelKey]),
      options.slice()
    )
    selectStates.cachedOptions = options.slice()
  } else {
    updateSelect([], [], [])
    selectStates.cachedOptions = []
    selectStates.createdOptions = []
  }
}

const SelectItem = (itemProps: { style: CSSProperties; index: number }) => {
  const { index, style } = itemProps
  const { data } = props

  const item = data[index]!
  if (item.type === 'Group') {
    return (
      <GroupItem item={item} style={style} height={listProps.value.itemSize} />
    )
  }

  const selected = isItemSelected(selectStates.modelValue, item)
  const disabled = isItemDisabled(selectStates.modelValue, selected)
  const hovering = isItemHovering(index)
  const { selectable } = selectProps
  return (
    <OptionItem
      {...itemProps}
      selected={selected}
      disabled={selectable ? !selectable(item) : disabled}
      hovering={hovering}
      created={!!item.created}
      item={item}
      onSelect={handleSelect}
      onHover={onHover}
    >
      {{
        default: (props: OptionItemProps) => {
          return slots.default?.(props) || <span>{item.label}</span>
        }
      }}
    </OptionItem>
  )
}

defineExpose({
  listRef,

  isItemDisabled,
  isItemHovering,
  isItemSelected,
  scrollToItem,
  resetScrollTop
})
</script>
