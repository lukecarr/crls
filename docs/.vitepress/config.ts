import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'CRLS',
  description: 'Dead easy column and row-level security for TypeScript!',
  lastUpdated: true,
  appearance: 'dark',
  themeConfig: {
    siteTitle: 'CRLS',
    nav: [
      { text: 'Docs', link: '/guide/installation' },
      { text: 'NPM', link: 'https://www.npmjs.com/package/crls' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/lukecarr/crls' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present Luke Carr',
    },
    sidebar: [
      {
        items: [
          {
            text: 'Installation',
            link: '/guide/installation',
          },
          {
            text: 'Quick start',
            link: '/guide/quick-start',
          },
          {
            text: 'Using asynchronously',
            link: '/guide/async',
          },
          {
            text: 'Changelog',
            link: '/changelog',
          },
        ],
      },
    ],
    editLink: {
      pattern: 'https://github.com/lukecarr/crls/edit/main/docs/:path',
    },
  },
})
