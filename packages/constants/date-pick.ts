import type { IterableElement } from 'type-fest'

export const datePickTypes = new Set([
  'year',
  'month',
  'date',
  'dates',
  'week',
  'datetime',
  'datetimerange',
  'daterange',
  'monthrange'
] as const)

export type DatePickType = IterableElement<ReturnType<typeof datePickTypes.keys>>
