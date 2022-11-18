import { computed } from 'vue'
import { useRoute, useData } from 'vitepress'
import { ensureStartingSlash } from '../utils'

export const useSidebar = () => {
  const route = useRoute()
  const { site, page, theme, frontmatter } = useData()

  if (!page.value) {
    return {
      sidebars: computed(() => []),
      hasSidebar: computed(() => false),
    }
  }


  const sidebars = computed(() => {
    if (frontmatter.value.sidebar === false) return []

    const sidebars = getSidebarConfig(
      site.value.themeConfig.sidebars,
      route.data.relativePath,
      site.value.base
    )

    return sidebars
  })

  return {
    sidebars,
    hasSidebar: computed(() => sidebars.value.length > 0),
  }
}

export function isSideBarConfig(sidebar) {
  return sidebar === false || sidebar === 'auto' || Array.isArray(sidebar)
}
export function isSideBarGroup(item) {
  return item.children !== undefined
}
export function isSideBarEmpty(sidebar) {
  return Array.isArray(sidebar) ? sidebar.length === 0 : !sidebar
}

type SidebarItem = {
  text: string
  link: string
}

type SidebarConfig = SidebarItem[]

type Sidebar =
  | {
      [key: string]: SidebarConfig
    }
  | false
  | 'auto'

export function getSidebarConfig(sidebar: Sidebar, path: string, base = '/') {
  if (sidebar === false || Array.isArray(sidebar) || sidebar === 'auto') {
    return []
  }

  const addPrefix = (sidebars: Record<string, any>) => {
    // 暂时只有两级
    return sidebars.map((level1Item) => {
      let ret = {
        ...level1Item,
      }
      if (ret.link) {
        ret.link = base + level1Item.link.slice(1)
      }
      if (ret.children) {
        ret.children = ret.children.map((level2Item) => {
          let ret = {
            ...level2Item,
          }

          if (ret.link) {
            ret.link = base + level2Item.link.slice(1)
          }

          return ret
        })
      }
      return ret
    })
  }

  path = ensureStartingSlash(path)
  for (const dir in sidebar) {
    if (path.startsWith(ensureStartingSlash(`${dir}`))) {
      let sidebars = sidebar[dir]
      return addPrefix(sidebars)
    }
  }
  return []
}

