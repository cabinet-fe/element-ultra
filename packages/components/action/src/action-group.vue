<script lang="tsx">
import { defineComponent, provide, shallowRef, render, type VNode } from 'vue'
import { actionGroupProps } from './type'
import ElTooltip from '@element-ultra/components/tooltip'
import ElButton from '@element-ultra/components/button'
import ElIcon from '@element-ultra/components/icon'
import { ArrowDown } from '@element-plus/icons-vue'
import { useNamespace } from '@element-ultra/hooks'
import { closeDrop } from './token'

export default defineComponent({
  name: 'ElActionGroup',
  props: actionGroupProps,

  components: { ElTooltip, ElButton },

  setup(props, { slots }) {
    const ns = useNamespace('action-group')

    const visible = shallowRef(false)

    provide(closeDrop, () => {
      visible.value = false
    })

    const onClickMore = (e) => {
      visible.value = !visible.value
    }

    const getSlots = () => {
      const children = slots.default?.() || []
      let result: VNode[] = []
      children.forEach((item: Record<string, any>) => {
        if (item.type.name !== 'ElAction') {
          if (item.type.render) {
            let node = item.type.render(item.props)
            result = result.concat(node.children)
          } else if (item.type.setup) {
            let node = item.type.setup(item.props)()

            result = result.concat(node.children)
          }
        } else {
          result.push(item as VNode)
        }
      })

      const { max } = props
      const normalChildren = max >= result.length ? result : result.slice(0, max - 1)
      const restChildren = (max >= result.length ? [] : result.slice(max - 1)).map((node) => {
        if (node.props) {
          node.props.isDrop = true
        }
        return node
      })

      const dropdownChildren = restChildren.length ? (
        <ElTooltip
          effect='light'
          v-model:visible={visible.value}
          popperClass={ns.e('dropdown')}
          onMouseleave={() => (visible.value = false)}
          v-slots={{
            content: () => <ul>{restChildren}</ul>,
            default: () => (
              <ElButton onClick={onClickMore} text>
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
      const { normalChildren, dropdownChildren } = getSlots()
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
