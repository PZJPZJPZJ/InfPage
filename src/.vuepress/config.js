import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'
import { catalogPlugin } from '@vuepress/plugin-catalog'
import { shikiPlugin } from '@vuepress/plugin-shiki'
import { copyCodePlugin } from '@vuepress/plugin-copy-code'
import { markdownChartPlugin } from '@vuepress/plugin-markdown-chart'
import { googleTagManagerPlugin } from '@vuepress/plugin-google-tag-manager'
import path from 'path'

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'InfPage',
  description: 'InfinityPage',
  base: '/InfPage/',  // 部署URL前缀
  dest: 'docs/',  // 编译输出目录
  head: [
    ['link', { rel: 'icon', href: 'https://infinityicon.infinitynewtab.com/assets/logo-pro.png' }, null],
  ],
  theme: defaultTheme({
    navbar: [
      {
        text: '百科',
        link: '/wiki/',
      },
      {
        text: '工具',
        link: '/tool/',
      },
      {
        text: '笔记',
        link: '/note/',
      }
    ],
    sidebarDepth: 5,
    themePlugins: {
      prismjs: false, // 禁用默认主题的代码块解析，使用shiki代替
      copyCode: false, // 禁用默认主题的代码复制插件，使用手动配置的版本
    },
  }),
  alias: {
    '@theme/VPNavbar.vue': path.resolve(__dirname, './components/VPNavbar.vue'),
    '@theme/VPHome.vue': path.resolve(__dirname, './components/VPHome.vue'),
    '@theme/VPHomeHero.vue': path.resolve(__dirname, './components/VPHomeHero.vue'),
    '@theme/VPHomeFeatures.vue': path.resolve(__dirname, './components/VPHomeFeatures.vue'),
    '@theme/VPSidebar.vue': path.resolve(__dirname, './components/VPSidebar.vue'),
  },
  bundler: viteBundler(),
  plugins: [
    catalogPlugin({
      level: 3,
    }),
    shikiPlugin({
      themes: {
        light: 'light-plus',
        dark: 'dark-plus',
      },
      collapsedLines: true, // 折叠代码块
    }),
    copyCodePlugin({
      showInMobile: true, // 移动端设备上显示代码复制按钮
    }),
    markdownChartPlugin({
      mermaid: true, // 启用 Mermaid 图表支持
    }),
    googleTagManagerPlugin({
      id: 'GTM-MWP63S78', // 谷歌跟踪代码管理器 ID
    }),
  ],
})