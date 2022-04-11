import type { Plugin } from 'vue'

export type SFCWithInstall<T> = T & Plugin

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
  ? I
  : never

export type EmitFn<Fns, Events extends keyof Fns = keyof Fns> = UnionToIntersection<
  {
    [key in Events]: Fns[key] extends (...args: infer Args) => any
      ? (event: key, ...args: Args) => void
      : (event: key, ...args: any[]) => void
  }[Events]
>
