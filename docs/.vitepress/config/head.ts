
import type { HeadConfig } from 'vitepress'

// head标签中的东西
export const head: HeadConfig[] = [

  [
    'link',
    {
      rel: 'stylesheet',
      href: '//fonts.loli.net/css?family=Inter:300,400,500,600|Open+Sans:400,600;display=swap',
    },
  ],
  [
    'link',
    {
      rel: 'stylesheet',
      href: '//unpkg.com/nprogress@0.2.0/nprogress.css',
    },
  ],

  [
    'script',
    {
      async: 'true',
      src: 'https://www.googletagmanager.com/gtag/js?id=UA-175337989-1',
    },
  ],
  [
    'script',
    {},
    `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-175337989-1');`,
  ],
]
