<script lang="tsx">
import {
  provide,
  defineComponent,
  useSlots,
  shallowRef,
  watch,
  type ShallowReactive,
  nextTick,
  type VNodeArrayChildren,
  isVNode
} from 'vue'
import { CHANGE_EVENT } from '@element-ultra/shared'
import { useNamespace } from '@element-ultra/hooks'
import { stepsProps, type StepState } from './steps'
import { stepsInjectionKey } from './token'
import { isFragment, isTemplate } from '@element-ultra/utils'

export default defineComponent({
  name: 'ElSteps',

  props: stepsProps,

  emits: {
    [CHANGE_EVENT]: () => true
  },

  setup(props) {
    const slots = useSlots()

    const ns = useNamespace('steps')

    let stepsMap: Record<string, StepState> = {}
    let activeIndex = shallowRef(0)
    let stepsCount = shallowRef(0)
    let steps: StepState[] = []

    /** 新增步骤 */
    const addStep = (step: ShallowReactive<StepState>) => {
      stepsMap[step.uid] = step
      stepsCount.value++
    }

    const removeStep = (step: StepState) => {
      delete stepsMap[step.uid]
      stepsCount.value--
    }

    provide(stepsInjectionKey, {
      stepsProps: props,
      addStep,
      removeStep,
      stepsCount,
      activeIndex
    })

    const calcStatus = (active: number) => {
      const { finishStatus, processStatus } = props

      steps.forEach(step => {
        // 完成状态
        if (step.index < active) {
          step.status = finishStatus
        }
        // 激活状态
        else if (step.index === active) {
          step.status = processStatus
        } else {
          step.status = 'wait'
        }
      })
    }

    nextTick(() => {
      calcStatus(activeIndex.value)
    })

    // 变化时计算每个step的状态
    watch(
      [activeIndex, () => props.processStatus, () => props.finishStatus],
      ([active]) => {
        calcStatus(active)
      }
    )

    let namesMapToIndex: Record<string, number> = {}
    // 给step编号
    const numberStep = async (
      nodeList: VNodeArrayChildren,
      arr: StepState[] = []
    ) => {
      await nextTick()

      nodeList.forEach((child, index) => {
        if (!isVNode(child)) return
        if (isFragment(child) || isTemplate(child)) {
          return (
            Array.isArray(child.children) && numberStep(child.children, arr)
          )
        }

        if (child.component?.uid) {
          let stepState = stepsMap[child.component.uid]
          stepState.index = arr.length
          arr.push(stepState)
        }
        if (child.props) {
          namesMapToIndex[child.props.name ?? index] = index
        }
      })
      steps = arr
      if (props.active !== undefined) {
        activeIndex.value = namesMapToIndex[props.active]
      }
    }

    return () => {
      const { direction } = props
      const children = slots.default?.() || []

      numberStep(children)

      return <div class={[ns.b(), ns.m(direction)]}>{children}</div>
    }
  }
})
</script>
