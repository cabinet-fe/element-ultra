<script lang="tsx">
import {
  defineComponent,
  type VNode,
  isVNode,
  type VNodeNormalizedChildren,
  shallowRef,
  provide,
  nextTick
} from 'vue'
import { actionGroupProps } from './type'
import { actionGroupToken } from './token'
import ElTooltip from 'components/tooltip'
import ElButton from 'components/button'
import ElIcon from 'components/icon'
import { ArrowDown } from 'icon-ultra'
import { useNamespace } from 'hooks'
import { isFragment, isTemplate } from 'utils'

export default defineComponent({
  name: 'ElActionGroup',
  props: actionGroupProps,

  components: { ElTooltip, ElButton },

  inheritAttrs: false,

  setup(props, { slots, expose }) {
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
        } else {
          node.props =  { isDrop: true }
        }
        return node
      })

      const dropdownChildren = restChildren.length ? (
        <ElTooltip
          effect='light'
          popperClass={ns.e('dropdown')}
          visible={dropdownVisible.value}
          placement='auto'
          v-slots={{
            content: () => <ul>{restChildren}</ul>,
            default: () => (
              <ElButton link type="primary">
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

    let dropdownVisible = shallowRef<boolean | undefined>(undefined)

    const setDropdownVisible = (visible: boolean) => {
      if (visible) {
        dropdownVisible.value = true
      } else {
        dropdownVisible.value = false
        nextTick(() => {
          dropdownVisible.value = undefined
        })
      }
    }

    provide(actionGroupToken, {
      setDropdownVisible,
      groupProps: props
    })

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
