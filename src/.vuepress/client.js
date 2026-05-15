import { defineClientConfig } from 'vuepress/client'
import CustomCatalog from './components/CustomCatalog.vue'

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component('CustomCatalog', CustomCatalog)
  },
})
