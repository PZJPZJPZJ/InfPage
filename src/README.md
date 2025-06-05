---
home: true
---
<div vp-content>
  <div class="container">
    <div class="grid">
      <template v-for="category in sites" :key="category.category">
        <div class="category-title">{{ category.category }}</div>
        <a v-for="site in category.items" 
            :key="site.url" 
            :href="site.url" 
            class="site-link" 
            target="_blank" 
            rel="noopener">
          <div class="icon-wrapper">
            <div class="icon" :style="{ backgroundImage: `url(${getFavicon(site.url)})` }"></div>
          </div>
          <span class="site-name">{{ site.name }}</span>
        </a>
      </template>
    </div>
  </div>
</div>

<script setup lang="ts">
import { ref } from 'vue'

const sites = ref([
  {
    category: '搜索引擎',
    items: [
      { name: 'Bing', url: 'https://www.bing.com' },
      { name: 'Google', url: 'https://google.com' },
      { name: 'Baidu', url: 'https://www.baidu.com' },
    ]
  },
  {
    category: '开发工具',
    items: [
      { name: 'GitHub', url: 'https://github.com' },
      { name: 'Gitee', url: 'https://gitee.com/' },
    ]
  },
  {
    category: '视频平台',
    items: [
      { name: 'BiliBili', url: 'https://www.bilibili.com' },
      { name: 'YouTube', url: 'https://youtube.com' },
    ]
  },
    {
    category: '人工智能',
    items: [
      { name: 'ChatGPT', url: 'https://chatgpt.com/' },
      { name: 'Claude', url: 'https://claude.ai/' },
      { name: 'Gemini', url: 'https://gemini.google.com/' },
      { name: 'Grok', url: 'https://grok.com/' },
      { name: 'DeepSeek', url: 'https://www.deepseek.com/' },
      { name: 'Midjourney', url: 'https://www.midjourney.com/' },
      { name: 'Coze', url: 'https://www.coze.com/' },
    ]
  },
])

const getFavicon = (url) => {
  const domain = new URL(url).hostname
  return `https://${domain}/favicon.ico`
}
</script>

<style lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--vp-c-bg-alt) url(https://theme-reco.vuejs.press/bg.svg) center/cover fixed no-repeat;
  min-height: 100vh;
  width: 100%;
  padding: 0;
}

.grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  width: min(1000px, 90%);
  margin: var(--navbar-height) auto;
  padding: 20px;
}

.site-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: var(--vp-c-text);
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.site-link:hover {
  text-decoration: none;
  transform: translateY(-2px);
}

.icon-wrapper {
  width: 60px;
  height: 60px;
  background: rgba(255,255,255,0.8);
  border: 1px solid rgba(255,255,255,0.4);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  margin-bottom: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.site-link:hover .icon-wrapper {
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
}

.icon {
  width: 32px;
  height: 32px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.site-name {
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  color: var(--vp-c-text);
}

.category-title {
  grid-column: 1 / -1;
  height: 30px;
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255,255,255,0.4);
  border-radius: 15px;
  display: inline-flex;
  align-items: center;
  padding: 0 20px;
  margin: 5px 0;
  color: var(--vp-c-text);;
  font-weight: 500;
  font-size: 14px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  justify-self: start;
}

.grid > :first-child {
  margin-top: 0;
}

@media (max-width: 1000px) {
  .grid {
    grid-template-columns: repeat(6, 1fr);
  }
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(5, 1fr);
    gap: 15px;
    padding: 15px;
  }
}

@media (max-width: 480px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    padding: 10px;
  }
}
</style>