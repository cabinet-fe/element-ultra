import type { Component, ExtractPropTypes, PropType } from 'vue'

export type StepStatus =
  | ''
  | 'wait'
  | 'process'
  | 'finish'
  | 'error'
  | 'success'

export const stepsProps = {
  space: {
    type: [Number, String],
    default: ''
  },
  active: {
    type: [Number, String]
  },
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal'
  },
  alignCenter: {
    type: Boolean,
    default: false
  },
  finishStatus: {
    type: String as PropType<StepStatus>,
    default: 'success'
  },
  processStatus: {
    type: String as PropType<StepStatus>,
    default: 'process'
  }
}

export type StepsProps = ExtractPropTypes<typeof stepsProps>

// step--------------------------------------------------

export const stepProps = {
  name: {
    type: String
  },
  title: {
    type: String,
    default: ''
  },
  icon: {
    type: [String, Object] as PropType<string | Component>
  },
  description: {
    type: String,
    default: ''
  }
}

export type StepProps = ExtractPropTypes<typeof stepsProps>

export type StepState = {
  status: StepStatus
  uid: number
  index: number
  isLast: boolean
}
