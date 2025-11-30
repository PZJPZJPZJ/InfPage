---
home: true
---
<div class="home-container">
  <div class="home-grid">
    <template v-for="category in sites" :key="category.category">
      <div class="home-category">{{ category.category }}</div>
      <a v-for="site in category.items" :key="site.url" :href="site.url" class="home-link" target="_blank"
        rel="noopener">
        <div class="home-wrapper">
          <div class="home-icon" :style="{ backgroundImage: `url(${getFavicon(site.url)})` }"></div>
        </div>
        <span class="home-site">{{ site.name }}</span>
      </a>
    </template>
    <div class="home-fixed-import-button">
      <button class="home-import-button" @click="importBookmarks">
        <span class="home-plus-icon">+</span>
        <span>导入收藏夹</span>
      </button>
    </div>
  </div>
</div>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'

  const STORAGE_KEY = 'VUEPRESS_HOME_BOOKMARKS'

  const loadSavedBookmarks = () => {
    try {
      if (typeof window === 'undefined') return []
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch (error) {
      console.error(error)
      return []
    }
  }

  const sites = ref([])
  const showImportDialog = ref(false)

  onMounted(() => {
    sites.value = loadSavedBookmarks()
  })

  const saveBookmarks = (bookmarks) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks))
    } catch (error) {
      console.error(error)
    }
  }

  const importBookmarks = async () => {
    try {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = '.html'

      input.onchange = (e) => {
        const file = e.target.files[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = (e) => {
          const content = e.target.result
          const parser = new DOMParser()
          const doc = parser.parseFromString(content, 'text/html')

          const bookmarks = []
          const categoryMap = new Map()

          const links = doc.querySelectorAll('A')
          links.forEach(link => {
            if (link.href) {
              let current = link.parentElement
              let category = '未分类'

              while (current) {
                if (current.tagName === 'DT') {
                  const h3 = current.querySelector('H3')
                  if (h3) {
                    category = h3.textContent.trim()
                    break
                  }
                }
                current = current.parentElement
              }

              let categoryItems = bookmarks.find(b => b.category === category)
              if (!categoryItems) {
                categoryItems = {
                  category,
                  items: []
                }
                bookmarks.push(categoryItems)
              }

              categoryItems.items.push({
                name: link.textContent.trim(),
                url: link.href
              })
            }
          })

          sites.value = bookmarks
          saveBookmarks(bookmarks)
        }
        reader.readAsText(file)
      }

      input.click()
    } catch (error) {
      console.error(error)
    }
  }

  const getFavicon = (url) => {
    const domain = new URL(url).hostname
    const favicon = `https://${domain}/favicon.ico`
    const iconAPI = `https://icon.bqb.cool/?url=${url}`
    return iconAPI
  }
</script>

<style scoped>
  .home-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(https://theme-reco.vuejs.press/bg.svg) center/cover fixed no-repeat;
    min-height: 100vh;
    padding: 0;
  }

  .home-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 10px;
    width: min(1000px, 100%);
    margin: var(--navbar-height) auto;
    padding: 20px;
    position: relative;
  }

  .home-category {
    grid-column: 1 / -1;
    height: 30px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 15px;
    display: inline-flex;
    align-items: center;
    padding: 0 20px;
    margin: 5px 0;
    color: var(--vp-c-text);
    ;
    font-weight: 500;
    font-size: 14px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    justify-self: start;
  }

  .home-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: var(--vp-c-text);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-2px);
    }
  }

  .home-wrapper {
    width: 60px;
    height: 60px;
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 8px;
  }

  .home-icon {
    width: 32px;
    height: 32px;
    background: center / contain no-repeat;
  }

  .home-site {
    font-size: 13px;
    font-weight: 600;
    text-align: center;
    color: var(--vp-c-text);
  }

  .home-empty-state {
    grid-column: 1 / -1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 300px;
  }

  .home-fixed-import-button {
    grid-column: 1 / -1;
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .home-import-button {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 15px;
    color: var(--vp-c-text);
    padding: 0 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: transform 0.3s ease, background 0.3s ease;
    font-weight: 500;
    font-size: 14px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    &:hover {
      transform: translateY(-2px);
    }
  }

  .home-plus-icon {
    font-size: 24px;
    font-weight: 300;
  }

  .home-empty-text {
    margin-top: 20px;
    color: var(--vp-c-text);
    opacity: 0.7;
    font-size: 14px;
  }

  .home-import-more-button {
    background: transparent;
    border: none;
    color: var(--vp-c-text);
    opacity: 0.7;
    font-size: 12px;
    cursor: pointer;
    margin-left: 10px;
    padding: 2px 8px;
    border-radius: 10px;
    transition: background 0.3s ease;
  }
</style>