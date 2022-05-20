import type { InjectionKey, ShallowReactive, ShallowRef } from 'vue'
import type { StepsProps, StepState } from './steps'

export const stepsInjectionKey: InjectionKey<{
  stepsProps: StepsProps
  stepsCount: ShallowRef<number>
  addStep: (step: ShallowReactive<StepState>) => void
  removeStep: (step: ShallowReactive<StepState>) => void
  activeIndex: ShallowRef<number>
}> = Symbol('stepsInjectionKey')
