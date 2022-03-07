import { inject } from 'vue'
import { elPaginationKey } from '@element-ultra/tokens'

export const usePagination = () => inject(elPaginationKey, {})
