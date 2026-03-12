<script setup lang="ts">
import VPAutoLink from '@theme/VPAutoLink.vue'
import { useData } from '@theme/useData'
import { computed } from 'vue'
import type { DefaultThemeHomePageFrontmatter } from '@vuepress/theme-default/lib/shared/index.js'

interface FeatureSection {
  header?: string
  description?: string
  items?: FeatureItem[]
}

interface FeatureItem {
  title: string
  details: string
  link?: string
  icon?: string
}

const { frontmatter } = useData<DefaultThemeHomePageFrontmatter>()

const features = computed(() => frontmatter.value.features as FeatureSection[] ?? [])
</script>

<template>
  <div v-if="features.length" class="vp-features">
    <!-- 遍历每个板块 -->
    <section 
      v-for="(section, sectionIndex) in features" 
      :key="sectionIndex" 
      class="vp-feature-section"
    >
      <div class="vp-feature-section-inner">
        <!-- 内容区域 -->
        <div class="vp-feature-content">
          <!-- 板块头部 -->
          <div class="vp-feature-section-header">
            <h2 v-if="section.header">{{ section.header }}</h2>
            <p v-if="section.description" class="section-description">{{ section.description }}</p>
          </div>
          <!-- 板块内的功能项 -->
          <div v-if="section.items && section.items.length" class="vp-feature-items">
            <div v-for="item in section.items" :key="item.title" class="vp-feature">
              <VPAutoLink :config="{ link: item.link ?? '', text: '' }" class="vp-feature-link">
                <img 
                  v-if="item.icon"
                  :src="item.icon.startsWith('https') ? item.icon : `https://favicon.im/${item.icon}`"
                  :alt="item.title"
                  class="vp-feature-icon"
                  @error="($event: Event) => (($event.target as HTMLImageElement).style.visibility = 'hidden')"
                  loading="lazy"
                  />
                <div class="vp-feature-text">
                  <h3>{{ item.title }}</h3>
                  <p>{{ item.details }}</p>
                </div>
              </VPAutoLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
@use '@vuepress/theme-default/lib/client/styles/variables' as *;

.vp-features {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2.5rem;
  padding: 1.2rem 0;
  border-top: 1px solid var(--vp-c-divider);
  transition: border-color var(--vp-t-color);
}

// 每个板块
.vp-feature-section {
  width: 100%;
}

// 板块内部容器
.vp-feature-section-inner {
  padding: 0;
  max-width: var(--homepage-width);
  margin: 0 auto;
}

// 内容区域
.vp-feature-content {
  width: 100%;
}

// 板块头部
.vp-feature-section-header {
  margin-bottom: 1.5rem;

  h2 {
    padding-bottom: 0;
    border-bottom: none;
    font-weight: 600;
    font-size: 1.6rem;
    margin-bottom: 0.5rem;

    @media (max-width: $MQMobileNarrow) {
      font-size: 1.4rem;
    }
  }

  .section-description {
    color: var(--vp-c-text-mute);
    font-size: 1rem;
    max-width: 600px;
  }
}

// 功能项容器 - CSS Grid 自适应布局
.vp-feature-items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 0.75rem;
}

// 单个功能项
.vp-feature {
  // 文本区域
  .vp-feature-text {
    flex: 1;
    min-width: 0;
  }

  h3 {
    padding-bottom: 0;
    border-bottom: none;
    font-weight: 500;
    font-size: 1.1rem;
    margin: 0.25rem;
  }

  p {
    color: var(--vp-c-text-mute);
    margin: 0.25rem;
    font-size: 0.9rem;
  }
}

// 功能项图标
.vp-feature-icon {
  flex-shrink: 0;
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.75rem;
  border-radius: 4px;
  object-fit: contain;
}

// 可点击链接样式
.vp-feature-link {
  display: flex;
  align-items: flex-start;
  text-decoration: none;
  color: inherit;
  padding: 0.75rem;
  border-radius: 10px;
  transition: 0.2s ease;

  &:hover {
    background-color: rgba(240, 240, 240, 0.5);
    backdrop-filter: blur(10px) saturate(200%);
    h3 {
      color: var(--vp-c-brand);
    }
  }
  [data-theme='dark'] & {
    &:hover {
      background-color: rgba(50, 50, 50, 0.5);
    }
  }
}
</style>