import { head } from './config/head'
import { sidebars } from './config/sidebars'
import { nav } from './config/nav'
import { mdPlugin } from './config/plugins'
import { features } from './config/features'
import type { UserConfig } from 'vitepress'
import { BASE_PATH } from './utils/shared'

const buildTransformers = () => {
  const transformer = () => {
    return {
      props: [],
      needRuntime: true,
    }
  }

  const transformers = {}
  const directives = [
    'infinite-scroll',
    'loading',
    'popover',
    'click-outside',
    'repeat-click',
    'trap-focus',
    'mousewheel',
    'resize',
  ]
  directives.forEach((k) => {
    transformers[k] = transformer
  })

  return transformers
}

// eslint-disable-next-line no-console
console.log(`DOC_ENV: ${process.env.DOC_ENV}`)

export const config: UserConfig = {
  title: 'Element Ultra',
  description: '一个专为设计师和开发者打造的Vue3组件库',
  head,
  lang: 'zh-CN',
  base: BASE_PATH,

  themeConfig: {
    repo: 'cabinet-fe/element-ultra',
    docsDir: 'docs',

    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: 'Last Updated',

    sidebars,
    nav,
    // agolia: {
    //   apiKey: '377f2b647a96d9b1d62e4780f2344da2',
    //   appId: 'BH4D9OD16A',
    // },
    features,
  },

  markdown: {
    config: (md) => {

      return mdPlugin(md)
    },
  },

  vue: {
    // template: {
    //   ssr: true,
    //   compilerOptions: {
    //     directiveTransforms: buildTransformers(),
    //   },
    // },
  },
}

export default config
