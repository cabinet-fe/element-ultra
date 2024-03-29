// For this project development

// GlobalComponents for Volar
declare module 'vue' {
  export interface GlobalComponents {
    ElAction: typeof import('../packages/element-ultra')['ElAction']
    ElActionGroup: typeof import('../packages/element-ultra')['ElActionGroup']
    ElAffix: typeof import('../packages/element-ultra')['ElAffix']
    ElAlert: typeof import('../packages/element-ultra')['ElAlert']
    ElAside: typeof import('../packages/element-ultra')['ElAside']
    ElAutocomplete: typeof import('../packages/element-ultra')['ElAutocomplete']
    ElAvatar: typeof import('../packages/element-ultra')['ElAvatar']
    ElBacktop: typeof import('../packages/element-ultra')['ElBacktop']
    ElBadge: typeof import('../packages/element-ultra')['ElBadge']
    ElBatchInput: typeof import('../packages/element-ultra')['ElBatchInput']
    ElBreadcrumb: typeof import('../packages/element-ultra')['ElBreadcrumb']
    ElBreadcrumbItem: typeof import('../packages/element-ultra')['ElBreadcrumbItem']
    ElButton: typeof import('../packages/element-ultra')['ElButton']
    ElButtonGroup: typeof import('../packages/element-ultra')['ElButtonGroup']
    ElCalendar: typeof import('../packages/element-ultra')['ElCalendar']
    ElCard: typeof import('../packages/element-ultra')['ElCard']
    ElCarousel: typeof import('../packages/element-ultra')['ElCarousel']
    ElCarouselItem: typeof import('../packages/element-ultra')['ElCarouselItem']
    ElCascade: typeof import('../packages/element-ultra')['ElCascade']
    ElCascaderPanel: typeof import('../packages/element-ultra')['ElCascaderPanel']
    ElCheckbox: typeof import('../packages/element-ultra')['ElCheckbox']
    ElCheckboxButton: typeof import('../packages/element-ultra')['ElCheckboxButton']
    ElCheckboxGroup: typeof import('../packages/element-ultra')['ElCheckboxGroup']
    ElCol: typeof import('../packages/element-ultra')['ElCol']
    ElCollapse: typeof import('../packages/element-ultra')['ElCollapse']
    ElCollapseItem: typeof import('../packages/element-ultra')['ElCollapseItem']
    ElCollapseTransition: typeof import('../packages/element-ultra')['ElCollapseTransition']
    ElColorPicker: typeof import('../packages/element-ultra')['ElColorPicker']
    ElContainer: typeof import('../packages/element-ultra')['ElContainer']
    ElDataTable: typeof import('../packages/element-ultra')['ElDataTable']
    ElDatePicker: typeof import('../packages/element-ultra')['ElDatePicker']
    ElDialog: typeof import('../packages/element-ultra')['ElDialog']
    ElDivider: typeof import('../packages/element-ultra')['ElDivider']
    ElDrawer: typeof import('../packages/element-ultra')['ElDrawer']
    ElDropdown: typeof import('../packages/element-ultra')['ElDropdown']
    ElDropdownItem: typeof import('../packages/element-ultra')['ElDropdownItem']
    ElDropdownMenu: typeof import('../packages/element-ultra')['ElDropdownMenu']
    ElEditBar: typeof import('../packages/element-ultra')['ElEditBar']
    ElEmpty: typeof import('../packages/element-ultra')['ElEmpty']
    ElFooter: typeof import('../packages/element-ultra')['ElFooter']
    ElForm: typeof import('../packages/element-ultra')['ElForm']
    ElFormItem: typeof import('../packages/element-ultra')['ElFormItem']
    ElFormDialog: typeof import('../packages/element-ultra')['ElFormDialog']
    ElGrid: typeof import('../packages/element-ultra')['ElGrid']
    ElGridInput: typeof import('../packages/element-ultra')['ElGridInput']
    ElHeader: typeof import('../packages/element-ultra')['ElHeader']
    ElIcon: typeof import('../packages/element-ultra')['ElIcon']
    ElImage: typeof import('../packages/element-ultra')['ElImage']
    ElImageViewer: typeof import('../packages/element-ultra')['ElImageViewer']
    ElInput: typeof import('../packages/element-ultra')['ElInput']
    ElInputNumber: typeof import('../packages/element-ultra')['ElInputNumber']
    ElLink: typeof import('../packages/element-ultra')['ElLink']
    ElMain: typeof import('../packages/element-ultra')['ElMain']
    ElMenu: typeof import('../packages/element-ultra')['ElMenu']
    ElMenuItem: typeof import('../packages/element-ultra')['ElMenuItem']
    ElMenuItemGroup: typeof import('../packages/element-ultra')['ElMenuItemGroup']
    ElMultipleForm: typeof import('../packages/element-ultra')['ElMultipleForm']
    ElOption: typeof import('../packages/element-ultra')['ElOption']
    ElOptionGroup: typeof import('../packages/element-ultra')['ElOptionGroup']
    ElPage: typeof import('../packages/element-ultra')['ElPage']
    ElPageHeader: typeof import('../packages/element-ultra')['ElPageHeader']
    ElPagination: typeof import('../packages/element-ultra')['ElPagination']
    ElPopconfirm: typeof import('../packages/element-ultra')['ElPopconfirm']
    ElPopper: typeof import('../packages/element-ultra')['ElPopper']
    ElPopover: typeof import('../packages/element-ultra')['ElPopover']
    ElProgress: typeof import('../packages/element-ultra')['ElProgress']
    ElRadio: typeof import('../packages/element-ultra')['ElRadio']
    ElRadioButton: typeof import('../packages/element-ultra')['ElRadioButton']
    ElRadioGroup: typeof import('../packages/element-ultra')['ElRadioGroup']
    ElRate: typeof import('../packages/element-ultra')['ElRate']
    ElRow: typeof import('../packages/element-ultra')['ElRow']
    ElScrollbar: typeof import('../packages/element-ultra')['ElScrollbar']
    ElSelect: typeof import('../packages/element-ultra')['ElSelect']
    ElSlider: typeof import('../packages/element-ultra')['ElSlider']
    ElNodeRender: typeof import('../packages/element-ultra')['ElNodeRender']
    ElStep: typeof import('../packages/element-ultra')['ElStep']
    ElSteps: typeof import('../packages/element-ultra')['ElSteps']
    ElSubMenu: typeof import('../packages/element-ultra')['ElSubMenu']
    ElSwitch: typeof import('../packages/element-ultra')['ElSwitch']
    ElTabPane: typeof import('../packages/element-ultra')['ElTabPane']
    ElTable: typeof import('../packages/element-ultra')['ElTable']
    ElProTable: typeof import('../packages/element-ultra')['ElProTable']
    ElTableColumn: typeof import('../packages/element-ultra')['ElTableColumn']
    ElTabs: typeof import('../packages/element-ultra')['ElTabs']
    ElTag: typeof import('../packages/element-ultra')['ElTag']
    ElTextarea: typeof import('../packages/element-ultra')['ElTextarea']
    ElTextEditor: typeof import('../packages/element-ultra')['ElTextEditor']
    ElTimePicker: typeof import('../packages/element-ultra')['ElTimePicker']
    ElTimeSelect: typeof import('../packages/element-ultra')['ElTimeSelect']
    ElTimeline: typeof import('../packages/element-ultra')['ElTimeline']
    ElTimelineItem: typeof import('../packages/element-ultra')['ElTimelineItem']
    ElTooltip: typeof import('../packages/element-ultra')['ElTooltip']
    ElTransfer: typeof import('../packages/element-ultra')['ElTransfer']
    ElTree: typeof import('../packages/element-ultra')['ElTree']
    ElTreeSelect: typeof import('../packages/element-ultra')['ElTreeSelect']
    ElTableSelect: typeof import('../packages/element-ultra')['ElTableSelect']
    ElUpload: typeof import('../packages/element-ultra')['ElUpload']
    ElSpace: typeof import('../packages/element-ultra')['ElSpace']
    ElSkeleton: typeof import('../packages/element-ultra')['ElSkeleton']
    ElSkeletonItem: typeof import('../packages/element-ultra')['ElSkeletonItem']
    ElCheckTag: typeof import('../packages/element-ultra')['ElCheckTag']
    ElDescriptions: typeof import('../packages/element-ultra')['ElDescriptions']
    ElDescriptionsItem: typeof import('../packages/element-ultra')['ElDescriptionsItem']
    ElResult: typeof import('../packages/element-ultra')['ElResult']
    ElSelect: typeof import('../packages/element-ultra')['ElSelect']
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $message: typeof import('../packages/element-ultra')['ElMessage']
    $notify: typeof import('../packages/element-ultra')['ElNotification']
    $msgbox: typeof import('../packages/element-ultra')['ElMessageBox']
    $messageBox: typeof import('../packages/element-ultra')['ElMessageBox']
    $alert: typeof import('../packages/element-ultra')['ElMessageBox']['alert']
    $confirm: typeof import('../packages/element-ultra')['ElMessageBox']['confirm']
    $prompt: typeof import('../packages/element-ultra')['ElMessageBox']['prompt']
    $loading: typeof import('../packages/element-ultra')['ElLoadingService']
  }
}

export {}
