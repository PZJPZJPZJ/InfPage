import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'
import { catalogPlugin } from '@vuepress/plugin-catalog'
import path from 'path'

const clarityScript = `
(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "rur8p5yygl");
`

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'InfPage',
  description: 'InfinityPage',
  base: '/InfPage/',
  dest: 'docs/',
  head: [
    ['script', { type: 'text/javascript' }, clarityScript],
    ['meta', { name: 'msvalidate.01', content: '988938DE60E20025E035A14D20877665' }],
    ['link', { rel: 'icon', href: 'https://infinityicon.infinitynewtab.com/assets/logo-pro.png' }],
  ],
  theme: defaultTheme({
    navbar: [
      {
        text: 'Wiki',
        link: '/wiki/',
      },
      {
        text: 'Github',
        link: 'https://github.com/pzjpzjpzj',
      },
    ],
    sidebarDepth: 5,
  }),
  alias: {
    '@theme/VPHome.vue': path.resolve(__dirname,'./components/VPHome.vue'),
    '@theme/VPNavbar.vue': path.resolve(__dirname,'./components/VPNavbar.vue'),
  },
  bundler: viteBundler(),
  plugins: [
    catalogPlugin({
      level: 3,
    }),
  ],
})