import type { InjectionKey, ShallowRef } from 'vue'

export interface scrollbarContext {
  scrollbarElement: ShallowRef<HTMLDivElement>
  wrapElement: ShallowRef<HTMLDivElement>
}

export const scrollbarContextKey: InjectionKey<scrollbarContext> = Symbol(
  'scrollbarContextKey'
)
