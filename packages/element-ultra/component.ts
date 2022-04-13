import { ElAction, ElActionGroup } from '@element-ultra/components/action'
import { ElAffix } from '@element-ultra/components/affix'
import { ElAlert } from '@element-ultra/components/alert'
import { ElAutocomplete } from '@element-ultra/components/autocomplete'
import { ElAvatar } from '@element-ultra/components/avatar'
import { ElBacktop } from '@element-ultra/components/backtop'
import { ElBadge } from '@element-ultra/components/badge'
import {
  ElBreadcrumb,
  ElBreadcrumbItem,
} from '@element-ultra/components/breadcrumb'
import { ElButton, ElButtonGroup } from '@element-ultra/components/button'
import { ElCalendar } from '@element-ultra/components/calendar'
import { ElCard } from '@element-ultra/components/card'
import { ElCarousel, ElCarouselItem } from '@element-ultra/components/carousel'
import { ElCascade } from '@element-ultra/components/cascade'
import { ElCascadePanel } from '@element-ultra/components/cascade-panel'
import { ElCheckTag } from '@element-ultra/components/check-tag'
import {
  ElCheckbox,
  ElCheckboxButton,
  ElCheckboxGroup,
} from '@element-ultra/components/checkbox'
import { ElCol } from '@element-ultra/components/col'
import { ElCollapse, ElCollapseItem } from '@element-ultra/components/collapse'
import { ElCollapseTransition } from '@element-ultra/components/collapse-transition'
import { ElColorPicker } from '@element-ultra/components/color-picker'
import { ElConfigProvider } from '@element-ultra/components/config-provider'
import {
  ElContainer,
  ElAside,
  ElFooter,
  ElHeader,
  ElMain,
} from '@element-ultra/components/container'
import { ElDataTable } from '@element-ultra/components/data-table'
import { ElDatePicker } from '@element-ultra/components/date-picker'
import {
  ElDescriptions,
  ElDescriptionsItem,
} from '@element-ultra/components/descriptions'
import { ElDialog } from '@element-ultra/components/dialog'
import { ElDivider } from '@element-ultra/components/divider'
import { ElDrawer } from '@element-ultra/components/drawer'
import {
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
} from '@element-ultra/components/dropdown'
import { ElEmpty } from '@element-ultra/components/empty'
import { ElEditBar } from '@element-ultra/components/edit-bar'
import { ElForm, ElFormItem } from '@element-ultra/components/form'
import { ElFormDialog } from '@element-ultra/components/form-dialog'

import { ElGrid } from '@element-ultra/components/grid'
import { ElGridInput } from '@element-ultra/components/grid-input'
import { ElIcon } from '@element-ultra/components/icon'
import { ElImage } from '@element-ultra/components/image'
import { ElImageViewer } from '@element-ultra/components/image-viewer'
import { ElInput } from '@element-ultra/components/input'
import { ElInputNumber } from '@element-ultra/components/input-number'
import { ElLink } from '@element-ultra/components/link'
import {
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
} from '@element-ultra/components/menu'
import { ElMultipleForm } from '@element-ultra/components/multiple-form'
import { ElPage } from '@element-ultra/components/page'
import { ElPageHeader } from '@element-ultra/components/page-header'
import { ElPagination } from '@element-ultra/components/pagination'
import { ElPopconfirm } from '@element-ultra/components/popconfirm'
import { ElPopover } from '@element-ultra/components/popover'
import { ElPopper } from '@element-ultra/components/popper'
import { ElProTable } from '@element-ultra/components/pro-table'
import { ElProgress } from '@element-ultra/components/progress'
import {
  ElRadio,
  ElRadioButton,
  ElRadioGroup,
} from '@element-ultra/components/radio'
import { ElRate } from '@element-ultra/components/rate'
import { ElResult } from '@element-ultra/components/result'
import { ElRow } from '@element-ultra/components/row'
import { ElScrollbar } from '@element-ultra/components/scrollbar'

import { ElSelect } from '@element-ultra/components/select'
import { ElSkeleton, ElSkeletonItem } from '@element-ultra/components/skeleton'
import { ElSlider } from '@element-ultra/components/slider'
import { ElSpace } from '@element-ultra/components/space'
import { ElSteps, ElStep } from '@element-ultra/components/steps'
import { ElSwitch } from '@element-ultra/components/switch'
import { ElTable, ElTableColumn } from '@element-ultra/components/table'
import { ElTabs, ElTabPane } from '@element-ultra/components/tabs'
import { ElTag } from '@element-ultra/components/tag'
import { ElTextarea } from '@element-ultra/components/textarea'
import { ElTextEditor } from '@element-ultra/components/text-editor'
import { ElTimePicker } from '@element-ultra/components/time-picker'
import { ElTimeSelect } from '@element-ultra/components/time-select'
import { ElTimeline, ElTimelineItem } from '@element-ultra/components/timeline'
import { ElTooltip } from '@element-ultra/components/tooltip'
import { ElTransfer } from '@element-ultra/components/transfer'
import { ElTree } from '@element-ultra/components/tree'
import { ElTreeSelect } from '@element-ultra/components/tree-select'
import { ElTableSelect } from '@element-ultra/components/table-select'
import { ElUpload } from '@element-ultra/components/upload'
import type { Plugin } from 'vue'

export default [
  ElAction,
  ElActionGroup,
  ElAffix,
  ElAlert,
  ElAutocomplete,
  ElAvatar,
  ElBacktop,
  ElBadge,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElButton,
  ElButtonGroup,
  ElCalendar,
  ElCard,
  ElCarousel,
  ElCarouselItem,
  ElCascade,
  ElCascadePanel,
  ElCheckTag,
  ElCheckbox,
  ElCheckboxButton,
  ElCheckboxGroup,
  ElCol,
  ElCollapse,
  ElCollapseItem,
  ElCollapseTransition,
  ElColorPicker,
  ElConfigProvider,
  ElContainer,
  ElAside,
  ElFooter,
  ElHeader,
  ElMain,
  ElDataTable,
  ElDatePicker,
  ElDescriptions,
  ElDescriptionsItem,
  ElDialog,
  ElDivider,
  ElDrawer,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElEditBar,
  ElEmpty,
  ElForm,
  ElFormItem,
  ElFormDialog,
  ElGrid,
  ElGridInput,
  ElIcon,
  ElImage,
  ElImageViewer,
  ElInput,
  ElInputNumber,
  ElLink,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElMultipleForm,
  ElPage,
  ElPageHeader,
  ElPagination,
  ElPopconfirm,
  ElPopover,
  ElPopper,
  ElProTable,
  ElProgress,
  ElRadio,
  ElRadioButton,
  ElRadioGroup,
  ElRate,
  ElResult,
  ElRow,
  ElScrollbar,
  ElSelect,
  ElSkeleton,
  ElSkeletonItem,
  ElSlider,
  ElSpace,
  ElSteps,
  ElStep,
  ElSwitch,
  ElTable,
  ElTableColumn,
  ElTabs,
  ElTabPane,
  ElTag,
  ElTextarea,
  ElTextEditor,
  ElTimePicker,
  ElTimeSelect,
  ElTimeline,
  ElTimelineItem,
  ElTooltip,
  ElTransfer,
  ElTree,
  ElTreeSelect,
  ElTableSelect,
  ElUpload,
] as Plugin[]
