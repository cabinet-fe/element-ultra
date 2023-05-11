import { inject } from 'vue'
import { elPaginationKey } from 'tokens'

export const usePagination = () => inject(elPaginationKey, {})
