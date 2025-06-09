---
home: true
---
<div class="container">
  <div class="grid">
    <template v-for="category in sites" :key="category.category">
      <div class="category">{{ category.category }}</div>
      <a v-for="site in category.items" 
          :key="site.url" 
          :href="site.url" 
          class="link" 
          target="_blank" 
          rel="noopener">
        <div class="wrapper">
          <div class="icon" :style="{ backgroundImage: `url(${getFavicon(site.url)})` }"></div>
        </div>
        <span class="site">{{ site.name }}</span>
      </a>
    </template>
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
      { name: 'DeepSeek', url: 'https://www.deepseek.com/' },
      { name: 'ChatGPT', url: 'https://chatgpt.com/' },
      { name: 'Claude', url: 'https://claude.ai/' },
      { name: 'Gemini', url: 'https://gemini.google.com/' },
      { name: 'Grok', url: 'https://grok.com/' },

    ]
  },
])

const getFavicon = (url) => {
  const domain = new URL(url).hostname
  return `https://${domain}/favicon.ico`
}
</script>

<style lang="scss">
.vp-home{
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(https://theme-reco.vuejs.press/bg.svg) center/cover fixed no-repeat;
    min-height: 100vh;
    padding: 0;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 10px;
    width: min(1000px, 100%);
    margin: var(--navbar-height) auto;
    padding: 20px;
  }

  .category {
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

  .link {
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

  .wrapper {
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
  }

  .icon {
    width: 32px;
    height: 32px;
    background: center / contain no-repeat;
  }

  .site {
    font-size: 13px;
    font-weight: 600;
    text-align: center;
    color: var(--vp-c-text);
  }
}
</style>