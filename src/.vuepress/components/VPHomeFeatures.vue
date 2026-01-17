<script setup lang="ts">
import VPAutoLink from '@theme/VPAutoLink.vue'
import { useData } from '@theme/useData'
import { computed } from 'vue'
import type { DefaultThemeHomePageFrontmatter } from '@vuepress/theme-default/lib/shared/index.js'

const { frontmatter } = useData<DefaultThemeHomePageFrontmatter>()

const features = computed(() => frontmatter.value.features ?? [])
</script>

<template>
  <div v-if="features.length" class="vp-features">
    <!-- 遍历每个板块 -->
    <section 
      v-for="(section, sectionIndex) in features" 
      :key="sectionIndex" 
      class="vp-feature-section"
      :style="section.bgImage ? { backgroundImage: `url(${section.bgImage})` } : {}"
    >
      <div class="vp-feature-section-inner">
        <!-- 左侧：图片 -->
        <div class="vp-feature-image" v-if="section.image">
          <img :src="section.image" :alt="section.header || 'feature image'" />
        </div>
        
        <!-- 右侧：内容区域 -->
        <div class="vp-feature-content">
          <!-- 板块头部 -->
          <div class="vp-feature-section-header">
            <h2 v-if="section.header">{{ section.header }}</h2>
            <p v-if="section.description" class="section-description">{{ section.description }}</p>
          </div>
          <!-- 板块内的功能项 -->
          <div v-if="section.items && section.items.length" class="vp-feature-items">
            <div v-for="item in section.items" :key="item.title" class="vp-feature">
              <VPAutoLink v-if="item.link" :config="{ link: item.link, text: '' }" class="vp-feature-link">
                <h3>{{ item.title }}</h3>
                <p>{{ item.details }}</p>
              </VPAutoLink>
              <div v-else class="vp-feature-link">
                <h3>{{ item.title }}</h3>
                <p>{{ item.details }}</p>
              </div>
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
  border-radius: 10px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  position: relative;

  // 背景遮罩，提高文字可读性
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(240, 240, 240, 0.25);
    z-index: 0;
  }

  // 深色模式下的遮罩
  [data-theme='dark'] & {
    &::before {
      background: rgba(10, 10, 10, 0.25);
    }
  }
}

// 板块内部容器 - 左右布局
.vp-feature-section-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
  position: relative;
  z-index: 1;
  max-width: var(--homepage-width);
  margin: 0 auto;

  @media (max-width: $MQMobile) {
    flex-direction: column;
    padding: 1.5rem;
  }
}

// 左侧：图片区域
.vp-feature-image {
  flex: 0 0 auto;
  width: 20%;
  max-width: 200px; // 限制最大宽度，防止超宽屏上图片过大

  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    object-fit: cover;
  }

  @media (max-width: $MQMobile) {
    width: 50%;
    max-width: 150px;
    margin: 0 auto;
  }
}

// 右侧：内容区域
.vp-feature-content {
  flex: 1;
  min-width: 0;
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

  h3 {
    padding-bottom: 0;
    border-bottom: none;
    font-weight: 500;
    font-size: 1.1rem;
    margin-bottom: 0.25rem;
  }

  p {
    color: var(--vp-c-text-mute);
    margin: 0;
    font-size: 0.9rem;
  }
}

// 功能项图标
.vp-feature-icon {
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  color: var(--vp-c-brand);
  line-height: 1.5rem;
}

// 可点击链接样式
.vp-feature-link {
  display: block;
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