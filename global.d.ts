// GlobalComponents for Volar
declare module 'vue' {
  export interface GlobalComponents {
    ElAction: typeof import('element-ultra')['ElAction']
    ElActionGroup: typeof import('element-ultra')['ElActionGroup']
    ElAffix: typeof import('element-ultra')['ElAffix']
    ElAlert: typeof import('element-ultra')['ElAlert']
    ElAside: typeof import('element-ultra')['ElAside']
    ElAutocomplete: typeof import('element-ultra')['ElAutocomplete']
    ElAvatar: typeof import('element-ultra')['ElAvatar']
    ElBacktop: typeof import('element-ultra')['ElBacktop']
    ElBadge: typeof import('element-ultra')['ElBadge']
    ElBreadcrumb: typeof import('element-ultra')['ElBreadcrumb']
    ElBreadcrumbItem: typeof import('element-ultra')['ElBreadcrumbItem']
    ElButton: typeof import('element-ultra')['ElButton']
    ElButtonGroup: typeof import('element-ultra')['ElButtonGroup']
    ElCalendar: typeof import('element-ultra')['ElCalendar']
    ElCard: typeof import('element-ultra')['ElCard']
    ElCarousel: typeof import('element-ultra')['ElCarousel']
    ElCarouselItem: typeof import('element-ultra')['ElCarouselItem']
    ElCascader: typeof import('element-ultra')['ElCascader']
    ElCascaderPanel: typeof import('element-ultra')['ElCascaderPanel']
    ElCheckbox: typeof import('element-ultra')['ElCheckbox']
    ElCheckboxButton: typeof import('element-ultra')['ElCheckboxButton']
    ElCheckboxGroup: typeof import('element-ultra')['ElCheckboxGroup']
    ElCol: typeof import('element-ultra')['ElCol']
    ElCollapse: typeof import('element-ultra')['ElCollapse']
    ElCollapseItem: typeof import('element-ultra')['ElCollapseItem']
    ElCollapseTransition: typeof import('element-ultra')['ElCollapseTransition']
    ElColorPicker: typeof import('element-ultra')['ElColorPicker']
    ElContainer: typeof import('element-ultra')['ElContainer']
    ElConfigProvider: typeof import('element-ultra')['ElConfigProvider']
    ElDatePicker: typeof import('element-ultra')['ElDatePicker']
    ElDialog: typeof import('element-ultra')['ElDialog']
    ElDivider: typeof import('element-ultra')['ElDivider']
    ElDrawer: typeof import('element-ultra')['ElDrawer']
    ElDropdown: typeof import('element-ultra')['ElDropdown']
    ElDropdownItem: typeof import('element-ultra')['ElDropdownItem']
    ElDropdownMenu: typeof import('element-ultra')['ElDropdownMenu']
    ElEditBar: typeof import('element-ultra')['ElEditBar']
    ElEmpty: typeof import('element-ultra')['ElEmpty']
    ElFooter: typeof import('element-ultra')['ElFooter']
    ElForm: typeof import('element-ultra')['ElForm']
    ElFormItem: typeof import('element-ultra')['ElFormItem']
    ElFormDialog: typeof import('element-ultra')['ElFormDialog']
    ElGrid: typeof import('element-ultra')['ElGrid']
    ElGridInput: typeof import('element-ultra')['ElGridInput']
    ElHeader: typeof import('element-ultra')['ElHeader']
    ElIcon: typeof import('element-ultra')['ElIcon']
    ElImage: typeof import('element-ultra')['ElImage']
    ElImageViewer: typeof import('element-ultra')['ElImageViewer']
    ElInput: typeof import('element-ultra')['ElInput']
    ElInputNumber: typeof import('element-ultra')['ElInputNumber']
    ElLink: typeof import('element-ultra')['ElLink']
    ElMain: typeof import('element-ultra')['ElMain']
    ElMenu: typeof import('element-ultra')['ElMenu']
    ElMenuItem: typeof import('element-ultra')['ElMenuItem']
    ElMenuItemGroup: typeof import('element-ultra')['ElMenuItemGroup']
    ElMultipleForm: typeof import('element-ultra')['ElMultipleForm']
    ElOption: typeof import('element-ultra')['ElOption']
    ElOptionGroup: typeof import('element-ultra')['ElOptionGroup']
    ElPageHeader: typeof import('element-ultra')['ElPageHeader']
    ElPagination: typeof import('element-ultra')['ElPagination']
    ElPopconfirm: typeof import('element-ultra')['ElPopconfirm']
    ElPopper: typeof import('element-ultra')['ElPopper']
    ElProgress: typeof import('element-ultra')['ElProgress']
    ElRadio: typeof import('element-ultra')['ElRadio']
    ElRadioButton: typeof import('element-ultra')['ElRadioButton']
    ElRadioGroup: typeof import('element-ultra')['ElRadioGroup']
    ElRate: typeof import('element-ultra')['ElRate']
    ElRow: typeof import('element-ultra')['ElRow']
    ElScrollbar: typeof import('element-ultra')['ElScrollbar']
    ElSelect: typeof import('element-ultra')['ElSelect']
    ElSlider: typeof import('element-ultra')['ElSlider']
    ElStep: typeof import('element-ultra')['ElStep']
    ElSteps: typeof import('element-ultra')['ElSteps']
    ElSubMenu: typeof import('element-ultra')['ElSubMenu']
    ElSwitch: typeof import('element-ultra')['ElSwitch']
    ElTabPane: typeof import('element-ultra')['ElTabPane']
    ElTable: typeof import('element-ultra')['ElTable']
    ElProTable: typeof import('element-ultra')['ElProTable']
    ElTableColumn: typeof import('element-ultra')['ElTableColumn']
    ElTabs: typeof import('element-ultra')['ElTabs']
    ElTag: typeof import('element-ultra')['ElTag']
    ElTimePicker: typeof import('element-ultra')['ElTimePicker']
    ElTimeSelect: typeof import('element-ultra')['ElTimeSelect']
    ElTimeline: typeof import('element-ultra')['ElTimeline']
    ElTimelineItem: typeof import('element-ultra')['ElTimelineItem']
    ElTooltip: typeof import('element-ultra')['ElTooltip']
    ElTransfer: typeof import('element-ultra')['ElTransfer']
    ElTree: typeof import('element-ultra')['ElTree']
    ElTreeSelect: typeof import('element-ultra')['ElTreeSelect']
    ElTreeV2: typeof import('element-ultra')['ElTreeV2']
    ElTextEditor: typeof import('element-ultra')['ElTextEditor']
    ElUpload: typeof import('element-ultra')['ElUpload']
    ElSpace: typeof import('element-ultra')['ElSpace']
    ElSkeleton: typeof import('element-ultra')['ElSkeleton']
    ElSkeletonItem: typeof import('element-ultra')['ElSkeletonItem']
    ElCheckTag: typeof import('element-ultra')['ElCheckTag']
    ElDescriptions: typeof import('element-ultra')['ElDescriptions']
    ElDescriptionsItem: typeof import('element-ultra')['ElDescriptionsItem']
    ElResult: typeof import('element-ultra')['ElResult']
    ElSelectV2: typeof import('element-ultra')['ElSelectV2']
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $message: typeof import('element-ultra')['ElMessage']
    $notify: typeof import('element-ultra')['ElNotification']
    $msgbox: typeof import('element-ultra')['ElMessageBox']
    $messageBox: typeof import('element-ultra')['ElMessageBox']
    $alert: typeof import('element-ultra')['ElMessageBox']['alert']
    $confirm: typeof import('element-ultra')['ElMessageBox']['confirm']
    $prompt: typeof import('element-ultra')['ElMessageBox']['prompt']
    $loading: typeof import('element-ultra')['ElLoadingService']
  }
}

export {}
