import {
  defineComponent,
  getCurrentInstance,
  watch,
  computed,
  ref,
  provide,
  onMounted,
  h,
  reactive,
  nextTick,
  type PropType
} from 'vue'
import { isString, isObject } from '@element-ultra/utils'
import ElMenuCollapseTransition from './menu-collapse-transition.vue'
import { useMenuCssVar } from './use-menu-css-var'

import type { MenuItemClicked, MenuProvider, SubMenuProvider } from './types'
import type { NavigationFailure, Router } from 'vue-router'
import type { VNode, ExtractPropTypes, VNodeNormalizedChildren } from 'vue'
import { SizeProp } from '@element-ultra/constants'
import { useNamespace, useSize } from '@element-ultra/hooks'

export const menuProps = {
  defaultActive: {
    type: String,
    default: ''
  },
  defaultOpeneds: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  uniqueOpened: Boolean,
  router: Boolean,
  collapse: Boolean,
  backgroundColor: String,
  textColor: String,
  activeTextColor: String,
  collapseTransition: {
    type: Boolean,
    default: true
  },
  ellipsis: {
    type: Boolean,
    default: true
  },
  size: SizeProp
}
export type MenuProps = ExtractPropTypes<typeof menuProps>

const checkIndexPath = (indexPath: unknown): indexPath is string[] =>
  Array.isArray(indexPath) && indexPath.every(path => isString(path))

export const menuEmits = {
  close: (index: string, indexPath: string[]) =>
    isString(index) && checkIndexPath(indexPath),

  open: (index: string, indexPath: string[]) =>
    isString(index) && checkIndexPath(indexPath),

  select: (
    index: string,
    indexPath: string[],
    item: MenuItemClicked,
    routerResult?: Promise<void | NavigationFailure>
  ) =>
    isString(index) &&
    checkIndexPath(indexPath) &&
    isObject(item) &&
    (routerResult === undefined || routerResult instanceof Promise)
}
export type MenuEmits = typeof menuEmits

export default defineComponent({
  name: 'ElMenu',

  props: menuProps,
  emits: menuEmits,

  setup(props, { emit, slots, expose }) {
    const instance = getCurrentInstance()!
    const router = instance.appContext.config.globalProperties.$router as Router
    const menu = ref<HTMLUListElement>()

    // data
    const openedMenus = ref<MenuProvider['openedMenus']>(
      props.defaultOpeneds && !props.collapse
        ? props.defaultOpeneds.slice(0)
        : []
    )
    const activeIndex = ref<MenuProvider['activeIndex']>(props.defaultActive)
    const items = ref<MenuProvider['items']>({})
    const subMenus = ref<MenuProvider['subMenus']>({})

    // computed
    const isMenuPopup = computed<MenuProvider['isMenuPopup']>(() => {
      return props.collapse
    })

    // methods
    const initMenu = () => {
      const activeItem = activeIndex.value && items.value[activeIndex.value]
      if (!activeItem || props.collapse) return

      const indexPath = activeItem.indexPath

      // 展开该菜单项的路径上所有子菜单
      // expand all subMenus of the menu item
      indexPath.forEach(index => {
        const subMenu = subMenus.value[index]
        subMenu && openMenu(index, subMenu.indexPath)
      })
    }

    const openMenu: MenuProvider['openMenu'] = (index, indexPath) => {
      if (openedMenus.value.includes(index)) return
      // 将不在该菜单路径下的其余菜单收起
      // collapse all menu that are not under current menu item
      if (props.uniqueOpened) {
        openedMenus.value = openedMenus.value.filter((index: string) =>
          indexPath.includes(index)
        )
      }
      openedMenus.value.push(index)
      emit('open', index, indexPath)
    }

    const closeMenu: MenuProvider['closeMenu'] = (index, indexPath) => {
      const i = openedMenus.value.indexOf(index)
      if (i !== -1) {
        openedMenus.value.splice(i, 1)
      }
      emit('close', index, indexPath)
    }

    const handleSubMenuClick: MenuProvider['handleSubMenuClick'] = ({
      index,
      indexPath
    }) => {
      const isOpened = openedMenus.value.includes(index)

      if (isOpened) {
        closeMenu(index, indexPath)
      } else {
        openMenu(index, indexPath)
      }
    }

    const handleMenuItemClick: MenuProvider['handleMenuItemClick'] =
      menuItem => {
        if (props.collapse) {
          openedMenus.value = []
        }

        const { index, indexPath } = menuItem
        if (index === undefined || indexPath === undefined) return

        if (props.router && router) {
          const route = menuItem.route || index
          const routerResult = router.push(route).then(res => {
            if (!res) activeIndex.value = index
            return res
          })
          emit(
            'select',
            index,
            indexPath,
            { index, indexPath, route },
            routerResult
          )
        } else {
          activeIndex.value = index
          emit('select', index, indexPath, { index, indexPath })
        }
      }

    const updateActiveIndex = (val: string) => {
      const itemsInData = items.value
      const item =
        itemsInData[val] ||
        (activeIndex.value && itemsInData[activeIndex.value]) ||
        itemsInData[props.defaultActive]

      if (item) {
        activeIndex.value = item.index
        initMenu()
      } else {
        activeIndex.value = val
      }
    }
    const handleResize = () => {
      nextTick(() => instance.proxy!.$forceUpdate())
    }

    watch(
      () => props.defaultActive,
      currentActive => {
        if (!items.value[currentActive]) {
          activeIndex.value = ''
        }
        updateActiveIndex(currentActive)
      }
    )

    watch(items.value, () => initMenu())

    watch(
      () => props.collapse,
      value => {
        if (value) openedMenus.value = []
      }
    )

    // provide
    {
      const addSubMenu: MenuProvider['addSubMenu'] = item => {
        subMenus.value[item.index] = item
      }

      const removeSubMenu: MenuProvider['removeSubMenu'] = item => {
        delete subMenus.value[item.index]
      }

      const addMenuItem: MenuProvider['addMenuItem'] = item => {
        items.value[item.index] = item
      }

      const removeMenuItem: MenuProvider['removeMenuItem'] = item => {
        delete items.value[item.index]
      }
      provide<MenuProvider>(
        'rootMenu',
        reactive({
          props,
          openedMenus,
          items,
          subMenus,
          activeIndex,
          isMenuPopup,

          addMenuItem,
          removeMenuItem,
          addSubMenu,
          removeSubMenu,
          openMenu,
          closeMenu,
          handleMenuItemClick,
          handleSubMenuClick
        })
      )
      provide<SubMenuProvider>(`subMenu:${instance.uid}`, {
        addSubMenu,
        removeSubMenu,
        mouseInChild: ref(false)
      })
    }

    // lifecycle
    onMounted(() => {
      initMenu()
    })

    {
      const open = (index: string) => {
        const { indexPath } = subMenus.value[index]
        indexPath.forEach(i => openMenu(i, indexPath))
      }
      expose({
        open,
        close: closeMenu,
        handleResize
      })
    }

    const flattedChildren = (children: VNodeNormalizedChildren) => {
      const vnodes = Array.isArray(children) ? children : [children]
      const result: any[] = []
      vnodes.forEach((child: any) => {
        if (Array.isArray(child.children)) {
          result.push(...flattedChildren(child.children))
        } else {
          result.push(child)
        }
      })
      return result
    }

    const useVNodeResize = (vnode: VNode) => vnode

    const ns = useNamespace('menu')

    const size = useSize({ props })

    return () => {
      const slot = slots.default?.() ?? []
      const vShowMore: VNode[] = []

      const ulStyle = useMenuCssVar(props)

      const resizeMenu = (vNode: VNode) =>
        props.ellipsis ? useVNodeResize(vNode) : vNode

      const vMenu = resizeMenu(
        h(
          'ul',
          {
            key: String(props.collapse),
            role: 'menubar',
            ref: menu,
            style: ulStyle.value,
            class: {
              [ns.b()]: true,
              [ns.m(size.value)]: true,
              [ns.m('collapse')]: props.collapse
            }
          },
          [...slot.map(vnode => resizeMenu(vnode)), ...vShowMore]
        )
      )

      if (props.collapseTransition) {
        return h(ElMenuCollapseTransition, () => vMenu)
      }

      return vMenu
    }
  }
})
