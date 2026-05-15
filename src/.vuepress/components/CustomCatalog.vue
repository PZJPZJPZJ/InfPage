<script setup lang="ts">
import { RouteLink } from 'vuepress/client'
import { useData } from 'vuepress/client'
import { computed } from 'vue'

const { page, routes } = useData()

interface CatItem {
  path: string
  title: string
  desc: string
  icon: string
}

interface SubDirSection {
  dirPath: string
  title: string
  items: CatItem[]
}

// 当前目录路径，以 / 结尾
const basePath = computed(() => {
  const p = page.value.path
  return p.endsWith('/') ? p : p + '/'
})

// 当前目录下的直接子项
const directItems = computed(() => {
  const b = basePath.value
  const items: CatItem[] = []

  for (const [path, route] of Object.entries(routes.value)) {
    if (path === b || path === '/404.html') continue
    if (!path.startsWith(b)) continue
    if (path.endsWith('/')) continue

    const rel = path.slice(b.length)
    if (rel.includes('/')) continue

    const meta = route.meta as Record<string, unknown>
    const title = (meta.itemTitle as string) || (meta.title as string) || ''
    if (!title) continue

    items.push({
      path,
      title,
      desc: (meta.itemDesc as string) ?? '',
      icon: (meta.itemIcon as string) ?? '',
    })
  }

  items.sort((a, b) => a.title.localeCompare(b.title))
  return items
})

// 下一级子目录中的 item 列表
const subDirSections = computed<SubDirSection[]>(() => {
  const b = basePath.value
  const sections: SubDirSection[] = []

  // 先找所有直接子目录
  const subDirPaths: string[] = []
  for (const [path] of Object.entries(routes.value)) {
    if (path === b || path === '/404.html') continue
    if (!path.startsWith(b)) continue
    if (!path.endsWith('/')) continue

    const rel = path.slice(b.length).replace(/\/$/, '')
    if (rel.includes('/')) continue

    subDirPaths.push(path)
  }

  // 为每个子目录收集 item
  for (const dirPath of subDirPaths) {
    const dirRoute = routes.value[dirPath]
    const dirMeta = (dirRoute?.meta as Record<string, unknown>) || {}
    const dirTitle = (dirMeta.itemTitle as string) || (dirMeta.title as string) || ''
    if (!dirTitle) continue

    const items: CatItem[] = []

    for (const [path, route] of Object.entries(routes.value)) {
      if (path === dirPath || path === '/404.html') continue
      if (!path.startsWith(dirPath)) continue

      const rel = path.slice(dirPath.length)
      if (rel.includes('/')) continue
      if (path.endsWith('/')) continue

      const meta = route.meta as Record<string, unknown>
      const title = (meta.itemTitle as string) || (meta.title as string) || ''
      if (!title) continue

      items.push({
        path,
        title,
        desc: (meta.itemDesc as string) ?? '',
        icon: (meta.itemIcon as string) ?? '',
      })
    }

    if (items.length === 0) continue

    items.sort((a, b) => a.title.localeCompare(b.title))

    sections.push({ dirPath, title: dirTitle, items })
  }

  return sections.sort((a, b) => a.dirPath.localeCompare(b.dirPath))
})
</script>

<template>
  <div class="vp-custom-catalog">
    <template v-if="directItems.length || subDirSections.length">
      <!-- 当前目录的直接子项 -->
      <div v-if="directItems.length" class="vp-custom-catalog-section">
        <div class="vp-custom-catalog-list">
          <div
            v-for="item in directItems"
            :key="item.path"
            class="vp-custom-catalog-card"
          >
            <RouteLink :to="item.path" class="vp-custom-catalog-link">
              <img
                :src="item.icon
                  ? (item.icon.startsWith('https')
                    ? item.icon
                    : `https://favicon.im/${item.icon}`)
                  : `https://favicon.im/board.zash.run.place`"
                :alt="item.title"
                class="vp-custom-catalog-icon"
                loading="lazy"
                @error="($event) => (($event.target as HTMLImageElement).style.visibility = 'hidden')"
              />
              <div class="vp-custom-catalog-text">
                <span>{{ item.title }}</span>
                <p>{{ item.desc }}</p>
              </div>
            </RouteLink>
          </div>
        </div>
      </div>

      <!-- 子目录区块 -->
      <div
        v-for="section in subDirSections"
        :key="section.dirPath"
        class="vp-custom-catalog-section"
      >
        <div class="vp-custom-catalog-dir-path">
          <RouteLink :to="section.dirPath" class="vp-custom-catalog-dir-link">
            {{ section.title }}
          </RouteLink>
        </div>

        <div class="vp-custom-catalog-list">
          <div
            v-for="item in section.items"
            :key="item.path"
            class="vp-custom-catalog-card"
          >
            <RouteLink :to="item.path" class="vp-custom-catalog-link">
              <img
                :src="item.icon
                  ? (item.icon.startsWith('https')
                    ? item.icon
                    : `https://favicon.im/${item.icon}`)
                  : `https://favicon.im/board.zash.run.place`"
                :alt="item.title"
                class="vp-custom-catalog-icon"
                loading="lazy"
                @error="($event) => (($event.target as HTMLImageElement).style.visibility = 'hidden')"
              />
              <div class="vp-custom-catalog-text">
                <span>{{ item.title }}</span>
                <p>{{ item.desc }}</p>
              </div>
            </RouteLink>
          </div>
        </div>
      </div>
    </template>
    <p v-else class="vp-custom-catalog-empty">该目录下无文档</p>
  </div>
</template>

<style lang="scss">
@use '@vuepress/theme-default/lib/client/styles/variables' as *;

.vp-custom-catalog {

  .vp-custom-catalog-section {
    & + & {
      margin-top: 1.5rem;
    }
  }

  .vp-custom-catalog-dir-path {
    margin-bottom: 0.5rem;
    padding-bottom: 0.25rem;
    border-bottom: 1px solid var(--vp-c-border, #e2e2e3);

    .vp-custom-catalog-dir-link {
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--vp-c-text);
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: var(--vp-c-brand);
      }
    }
  }

  .vp-custom-catalog-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 0.75rem;
  }

  .vp-custom-catalog-text {
    flex: 1;
    min-width: 0;

    p {
      font-size: 0.9rem;
      color: var(--vp-c-text-mute);
    }
  }

  .vp-custom-catalog-icon {
    flex-shrink: 0;
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.75rem;
    border-radius: 4px;
    object-fit: contain;
  }

  a.vp-custom-catalog-link {
    display: flex;
    align-items: flex-start;
    text-decoration: none;
    color: inherit;
    padding: 0.75rem;
    border-radius: 10px;
    transition: 0.2s ease;

    &:hover {
      background-color: rgba(240, 240, 240, 0.5);

      span {
        color: var(--vp-c-brand);
      }
    }

    [data-theme='dark'] & {
      &:hover {
        background-color: rgba(50, 50, 50, 0.5);
      }
    }
  }

  .vp-custom-catalog-empty {
    text-align: center;
    color: var(--vp-c-text-mute);
    padding: 3rem 0;
    font-size: 1rem;
  }
}
</style>
