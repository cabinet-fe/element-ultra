import { inject } from 'vue'
import { elPaginationKey } from '@element-pro/tokens'

export const usePagination = () => inject(elPaginationKey, {})
