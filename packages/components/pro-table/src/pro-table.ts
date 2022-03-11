import { buildProps, definePropType } from '@element-ultra/utils'
import type { ExtractPropTypes } from 'vue'
import type { DataTableColumn } from '../../data-table/src/data-table'

export const proTableProps =  buildProps({
  api: {
    type: definePropType<string>(String)
  },

  data: {
    type: definePropType<any[]>(Array),
  },

  columns: {
    type: definePropType<ProTableColumn[]>(Array),
    required: true,
  },

  showIndex: {
    type: Boolean
  },

  checkable: {
    type: definePropType<boolean | ((row: any, index: number) => boolean)>([Boolean, Function]),
  },

  selectable: {
    type: definePropType<boolean | ((row: any, index: number) => boolean)>([Boolean, Function]),
  },

  pagination: Boolean,

  query: {
    type: definePropType<Record<string, any>>(Object)
  },

  height: {
    type: definePropType<string | number>([Number, String])
  }
} as const)

/** 专业数据表格类配置 */
export interface ProTableColumn extends DataTableColumn {}


/** 专业表格属性 */
export type ProTableProps = ExtractPropTypes<typeof proTableProps>