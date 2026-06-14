<script setup lang="ts">
import { computed } from 'vue'
import { RouteLink, useData } from 'vuepress/client'

const { page, routes } = useData()

interface CatItem {
  path: string
  title: string
  desc: string
  icon: string
}

interface SubDirSection {
  dirPath: string
  slug: string
  title: string
  items: CatItem[]
}

const routesSnapshot = routes.value

const basePath = computed(() => {
  const path = page.value.path
  return path.endsWith('/') ? path : `${path}/`
})

const directItems = computed(() => {
  const currentBasePath = basePath.value
  const items: CatItem[] = []

  for (const [path, route] of Object.entries(routesSnapshot)) {
    if (path === currentBasePath || path === '/404.html') continue
    if (!path.startsWith(currentBasePath) || path.endsWith('/')) continue

    const relativePath = path.slice(currentBasePath.length)
    if (relativePath.includes('/')) continue

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

const subDirSections = computed<SubDirSection[]>(() => {
  const currentBasePath = basePath.value
  const sections: SubDirSection[] = []
  const subDirPaths: string[] = []

  for (const [path] of Object.entries(routesSnapshot)) {
    if (path === currentBasePath || path === '/404.html') continue
    if (!path.startsWith(currentBasePath) || !path.endsWith('/')) continue

    const relativePath = path.slice(currentBasePath.length).replace(/\/$/, '')
    if (relativePath.includes('/')) continue

    subDirPaths.push(path)
  }

  for (const dirPath of subDirPaths) {
    const dirRoute = routesSnapshot[dirPath]
    const dirMeta = (dirRoute?.meta as Record<string, unknown>) || {}
    const dirTitle =
      (dirMeta.itemTitle as string) || (dirMeta.title as string) || ''

    if (!dirTitle) continue

    const items: CatItem[] = []

    for (const [path, route] of Object.entries(routesSnapshot)) {
      if (path === dirPath || path === '/404.html') continue
      if (!path.startsWith(dirPath) || path.endsWith('/')) continue

      const relativePath = path.slice(dirPath.length)
      if (relativePath.includes('/')) continue

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

    sections.push({
      dirPath,
      slug: `catalog-${dirPath.split('/').filter(Boolean).join('-')}`,
      title: dirTitle,
      items,
    })
  }

  return sections.sort((a, b) => a.dirPath.localeCompare(b.dirPath))
})
</script>

<template>
  <div class="vp-custom-catalog">
    <template v-if="directItems.length || subDirSections.length">
      <div v-if="directItems.length" class="vp-custom-catalog-section">
        <div class="vp-custom-catalog-list">
          <div
            v-for="item in directItems"
            :key="item.path"
            class="vp-custom-catalog-card"
          >
            <RouteLink :to="item.path" class="vp-custom-catalog-link">
              <img
                v-if="item.icon"
                :src="item.icon.startsWith('https') ? item.icon : `https://favicon.im/${item.icon}`"
                :alt="item.title"
                class="vp-custom-catalog-icon"
                loading="lazy"
                @error="($event) => (($event.target as HTMLImageElement).style.visibility = 'hidden')"
              />
              <span v-else class="vp-custom-catalog-icon vp-custom-catalog-icon--fallback">○</span>
              <div class="vp-custom-catalog-text">
                <span>{{ item.title }}</span>
                <p>{{ item.desc }}</p>
              </div>
            </RouteLink>
          </div>
        </div>
      </div>

      <div
        v-for="section in subDirSections"
        :key="section.dirPath"
        class="vp-custom-catalog-section"
      >
        <h2 :id="section.slug" class="vp-custom-catalog-dir-path">
          <RouteLink :to="section.dirPath" class="vp-custom-catalog-dir-link">
            <span class="vp-custom-catalog-dir-title">{{ section.title }}</span>
          </RouteLink>
        </h2>

        <div class="vp-custom-catalog-list">
          <div
            v-for="item in section.items"
            :key="item.path"
            class="vp-custom-catalog-card"
          >
            <RouteLink :to="item.path" class="vp-custom-catalog-link">
              <img
                v-if="item.icon"
                :src="item.icon.startsWith('https') ? item.icon : `https://favicon.im/${item.icon}`"
                :alt="item.title"
                class="vp-custom-catalog-icon"
                loading="lazy"
                @error="($event) => (($event.target as HTMLImageElement).style.visibility = 'hidden')"
              />
              <span v-else class="vp-custom-catalog-icon vp-custom-catalog-icon--fallback">○</span>
              <div class="vp-custom-catalog-text">
                <span>{{ item.title }}</span>
                <p>{{ item.desc }}</p>
              </div>
            </RouteLink>
          </div>
        </div>
      </div>
    </template>
    <p v-else class="vp-custom-catalog-empty">No documents in this directory</p>
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
    margin: 0.8rem 0;
    padding: 0;
    border-bottom: none;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;

    .vp-custom-catalog-dir-link {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 0.8rem 1.5rem;
      box-sizing: border-box;
      border-radius: 25px;
      background-color: rgba(0, 0, 0, 0.02);
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--vp-c-text);
      text-decoration: none !important;
      transition: color 0.2s, background-color 0.2s;

      &:hover {
        color: var(--vp-c-brand);
        background-color: rgba(0, 0, 0, 0.05);
      }

      [data-theme='dark'] & {
        background-color: rgba(255, 255, 255, 0.06);

        &:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
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

  .vp-custom-catalog-icon--fallback {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    color: var(--vp-c-text-mute, #999);
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
