<template>
  <div
    ref="node$"
    :class="[
      ns.b('node'),
      ns.is('expanded', expanded),
      ns.is('current', current),
      ns.is('focusable', !disabled),
      ns.is('checked', !disabled && checked),
      ns.is('disabled', disabled)
    ]"
    role="treeitem"
    tabindex="-1"
    :aria-expanded="expanded"
    :aria-disabled="disabled"
    :aria-checked="checked"
    :data-key="node?.key"
    @click.stop="handleClick"
    @contextmenu="handleContextMenu"
  >
    <div
      :class="ns.be('node', 'content')"
      :style="{ paddingLeft: `${(node.level - 1) * indent}px` }"
    >
      <el-icon
        v-if="icon"
        :class="[
          ns.is('leaf', !!node?.isLeaf),
          ns.is('hidden', hiddenExpandIcon),
          {
            expanded: !node?.isLeaf && expanded
          },
          ns.be('node', 'expand-icon')
        ]"
        :size="16"
        @click.stop="handleExpandIconClick"
      >
        <component :is="icon" />
      </el-icon>
      <!-- <label for=""></label> -->
      <el-checkbox
        v-if="showCheckbox && !disabled"
        :model-value="checked"
        :indeterminate="indeterminate"
        @change="handleCheckChange"
        @click.stop
      />
      <el-node-content :node="node" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue'
import { CaretRight } from 'icon-ultra'
import ElIcon from '@element-ultra/components/icon'
import ElCheckbox from '@element-ultra/components/checkbox'
import { useNamespace } from '@element-ultra/hooks'
import ElNodeContent from './tree-node-content'
import {
  ROOT_TREE_INJECTION_KEY,
  NODE_CONTEXTMENU,
  treeNodeEmits,
  treeNodeProps
} from './virtual-tree'

const DEFAULT_ICON = 'caret-right'

export default defineComponent({
  name: 'ElTreeNode',
  components: {
    ElIcon,
    CaretRight,
    ElCheckbox,
    ElNodeContent
  },
  props: treeNodeProps,
  emits: treeNodeEmits,
  setup(props, { emit }) {
    const tree = inject(ROOT_TREE_INJECTION_KEY)
    const ns = useNamespace('tree')

    const indent = computed(() => {
      return tree?.props.indent ?? 16
    })

    const icon = computed(() => {
      return tree?.props.icon ?? DEFAULT_ICON
    })

    const handleClick = (e: MouseEvent) => {
      if (props.disabled) return
      emit('click', props.node, e)
    }
    const handleExpandIconClick = () => {
      emit('toggle', props.node)
    }
    const handleCheckChange = (value: boolean) => {
      emit('check', props.node, value)
    }
    const handleContextMenu = (event: Event) => {
      if (tree?.instance?.vnode?.props?.['onNodeContextmenu']) {
        event.stopPropagation()
        event.preventDefault()
      }
      tree?.ctx.emit(NODE_CONTEXTMENU, event, props.node?.data, props.node)
    }

    return {
      ns,
      indent,
      icon,
      handleClick,
      handleExpandIconClick,
      handleCheckChange,
      handleContextMenu
    }
  }
})
</script>
