<script lang="tsx">
import {
  defineComponent,
  provide,
  shallowRef,
  type VNode,
  isVNode,
  type VNodeNormalizedChildren
} from 'vue'
import { actionGroupProps } from './type'
import ElTooltip from '@element-ultra/components/tooltip'
import ElButton from '@element-ultra/components/button'
import ElIcon from '@element-ultra/components/icon'
import { ArrowDown } from '@element-plus/icons-vue'
import { useNamespace } from '@element-ultra/hooks'
import { closeDrop } from './token'
import { isFragment, isTemplate } from '@element-ultra/utils'

export default defineComponent({
  name: 'ElActionGroup',
  props: actionGroupProps,

  components: { ElTooltip, ElButton },

  setup(props, { slots }) {
    const ns = useNamespace('action-group')

    const getActions = (
      children: VNodeNormalizedChildren,
      result: VNode[] = []
    ) => {
      if (!Array.isArray(children)) {
        return result
      }
      children.forEach(child => {
        if (!isVNode(child)) return

        if (
          typeof child.type === 'object' &&
          (child.type as any).name === 'ElAction'
        ) {
          return result.push(child)
        }

        if (isFragment(child) || isTemplate(child)) {
          getActions(child.children, result)
        }
      })
      return result
    }

    const getChildren = () => {
      const children = getActions(slots.default?.() || [])
      const { max } = props
      const normalChildren =
        max >= children.length ? children : children.slice(0, max - 1)
      const restChildren = (
        max >= children.length ? [] : children.slice(max - 1)
      ).map(node => {
        if (node.props) {
          node.props.isDrop = true
        }
        return node
      })

      const dropdownChildren = restChildren.length ? (
        <ElTooltip
          effect='light'
          popperClass={ns.e('dropdown')}
          v-slots={{
            content: () => <ul>{restChildren}</ul>,
            default: () => (
              <ElButton text>
                更多
                <ElIcon class='el-icon--right'>
                  <ArrowDown />
                </ElIcon>
              </ElButton>
            )
          }}
        />
      ) : null
      return {
        normalChildren,
        dropdownChildren
      }
    }

    return () => {
      const { normalChildren, dropdownChildren } = getChildren()
      return (
        <>
          {normalChildren}
          {dropdownChildren}
        </>
      )
    }
  }
})
</script>
