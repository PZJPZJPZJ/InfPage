---
routeMeta:
  itemTitle: GitHub Link Generator
  itemDesc: GitHub 链接识别与转换
  itemIcon: github.com
---
# GitHub 链接转换器
<section class="vp-custom-surface linkgen-app" aria-label="GitHub 链接转换器">
  <header class="linkgen-hero">
    <p class="linkgen-hero-title">粘贴链接，自动判断用途</p>
    <p>根据仓库、文件、Release、压缩包或克隆地址，生成对应的下载、CDN 或代理链接。</p>
  </header>
  <form class="vp-custom-glass-card linkgen-input-card" @submit.prevent="analyzeLink">
    <label class="linkgen-label" for="linkgen-source">GitHub 地址</label>
    <div class="linkgen-input-row">
      <input
        id="linkgen-source"
        v-model="sourceUrl"
        class="vp-custom-control linkgen-input"
        type="text"
        inputmode="url"
        autocomplete="url"
        spellcheck="false"
        placeholder="https://github.com/owner/repo"
        aria-describedby="linkgen-input-help"
        :aria-invalid="noticeType === 'error' && !detected ? 'true' : 'false'"
        @input="handleSourceInput"
      >
      <button class="vp-custom-button vp-custom-button-primary linkgen-analyze" type="submit" :disabled="loading">
        {{ loading ? '判断中…' : '判断并生成' }}
      </button>
    </div>
    <div class="linkgen-input-foot">
      <p id="linkgen-input-help">支持 github.com 文件页、仓库页、Release、Archive、.git 和 raw.githubusercontent.com。</p>
      <button v-if="sourceUrl" class="vp-custom-button vp-custom-button-quiet linkgen-clear" type="button" @click="clearAll">清空</button>
    </div>
  </form>
  <div class="linkgen-context-grid">
    <section class="vp-custom-glass-card linkgen-settings-card" aria-labelledby="linkgen-proxy-title">
      <div>
        <p class="linkgen-card-label">链接服务</p>
        <p id="linkgen-proxy-title" class="linkgen-section-title">代理与文件 CDN</p>
        <p>下载代理用于 Release、Archive 和 .git，文件 CDN 用于仓库文件。</p>
      </div>
      <div class="linkgen-settings-fields">
        <div class="linkgen-setting-field">
          <label class="linkgen-select-label" for="linkgen-proxy">下载代理</label>
          <select id="linkgen-proxy" v-model="selectedProxy" class="vp-custom-control linkgen-select" :disabled="loading" @change="refreshProxyLinks">
            <option v-for="service in proxyServices" :key="service.id" :value="service.id">{{ service.name }}</option>
          </select>
        </div>
        <div class="linkgen-setting-field">
          <label class="linkgen-select-label" for="linkgen-cdn">文件 CDN</label>
          <select id="linkgen-cdn" v-model="selectedCdn" class="vp-custom-control linkgen-select" @change="refreshCdnLinks">
            <option v-for="service in cdnServices" :key="service.id" :value="service.id">{{ service.name }}</option>
          </select>
        </div>
      </div>
    </section>
    <section
      class="vp-custom-glass-card linkgen-detection-card"
      :class="{ 'linkgen-detection-card-error': detected?.status === 'error' }"
      aria-labelledby="linkgen-detection-title"
      aria-live="polite"
    >
      <div>
        <p class="linkgen-card-label">链接判断</p>
        <p id="linkgen-detection-title" class="linkgen-section-title">识别结果</p>
      </div>
      <div v-if="detected" class="linkgen-detected">
        <div>
          <strong>{{ detected.title }}</strong>
          <p>{{ detected.detail }}</p>
          <p v-if="detected.message" class="linkgen-detected-message">{{ detected.message }}</p>
        </div>
      </div>
      <div v-else class="linkgen-detected linkgen-detected-empty">
        <div>
          <strong>等待链接</strong>
          <p>提交后会先显示判断类型，再生成相应结果。</p>
        </div>
      </div>
    </section>
  </div>
  <p
    v-if="notice"
    class="vp-custom-status linkgen-notice"
    :class="`vp-custom-status-${noticeType}`"
    :role="noticeType === 'error' ? 'alert' : 'status'"
  >{{ notice }}</p>
  <section v-if="loading || links.length" class="vp-custom-glass-card linkgen-results" aria-live="polite" :aria-busy="loading">
    <div class="linkgen-results-head">
      <div>
        <p class="linkgen-card-label">{{ resultLabel }}</p>
        <p class="linkgen-result-title">{{ resultTitle }}</p>
        <p v-if="resultMeta" class="linkgen-result-meta">{{ resultMeta }}</p>
      </div>
      <button v-if="links.length > 1" class="vp-custom-button vp-custom-button-secondary linkgen-copy-all" type="button" :disabled="copyingAll" @click="copyAll">
        {{ copyingAll ? '复制中…' : '复制全部' }}
      </button>
    </div>
    <div v-if="links.length" class="linkgen-result-list">
      <article v-for="link in links" :key="link.id" class="vp-custom-glass-card vp-custom-glass-muted linkgen-result-card">
        <div class="linkgen-result-top">
          <div>
            <span class="linkgen-type-tag">{{ link.badge }}</span>
            <strong class="linkgen-result-name">{{ link.name }}</strong>
            <p>{{ link.description }}</p>
          </div>
          <button class="vp-custom-button vp-custom-button-secondary linkgen-copy" type="button" :aria-label="`复制${link.name}`" @click="copyText(link.url, link.id)">
            {{ copiedId === link.id ? '已复制' : '复制' }}
          </button>
        </div>
        <div class="linkgen-url-row">
          <code>{{ link.url }}</code>
          <a class="linkgen-open" :href="link.url" target="_blank" rel="noopener noreferrer" :aria-label="`在新标签页打开${link.name}`">打开</a>
        </div>
      </article>
    </div>
  </section>
</section>

<script setup>
import { onUnmounted, ref } from 'vue'

const sourceUrl = ref('')
const links = ref([])
const detected = ref(null)
const notice = ref('')
const noticeType = ref('info')
const copiedId = ref('')
const copyingAll = ref(false)
const loading = ref(false)
const resultLabel = ref('生成结果')
const resultTitle = ref('等待输入链接')
const resultMeta = ref('')
const selectedProxy = ref('gh-proxy')
const selectedCdn = ref('jsdelivr')
const proxyServices = [
  { id: 'gh-proxy', name: 'gh-proxy.com', base: 'https://gh-proxy.com/' },
  { id: 'ghproxy', name: 'ghproxy.net', base: 'https://ghproxy.net/' },
  { id: 'ghfast', name: 'ghfast.top', base: 'https://ghfast.top/' },
]
const cdnServices = [
  { id: 'jsdelivr', name: 'jsDelivr', base: 'https://cdn.jsdelivr.net/gh/', format: 'at', description: '适合公开仓库中的图片、脚本和小型静态文件。' },
  { id: 'statically', name: 'Statically', base: 'https://cdn.statically.io/gh/', format: 'at', description: '通过 Statically 分发公开仓库静态文件。' },
  { id: 'githack', name: 'GitHack', base: 'https://raw.githack.com/', format: 'path', description: '适合开发预览，并提供正确的静态文件类型。' },
]
let copiedTimer
let requestController

const showNotice = (text, type = 'info') => {
  notice.value = text
  noticeType.value = type
}

const resetResult = () => {
  links.value = []
  copiedId.value = ''
  resultLabel.value = '生成结果'
  resultTitle.value = '等待输入链接'
  resultMeta.value = ''
}

const safeDecode = (value) => {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

const normalizeInput = (value) => {
  const trimmed = value.trim()
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  if (/^(?:www\.)?github\.com\//i.test(trimmed) || /^raw\.githubusercontent\.com\//i.test(trimmed)) return `https://${trimmed}`
  return trimmed
}

const stripGitSuffix = (repo) => repo.replace(/\.git$/i, '')
const encodeSegments = (segments) => segments.map((segment) => encodeURIComponent(segment)).join('/')
const getProxyService = () => proxyServices.find((service) => service.id === selectedProxy.value) || proxyServices[0]
const getCdnService = () => cdnServices.find((service) => service.id === selectedCdn.value) || cdnServices[0]
const makeProxyUrl = (targetUrl) => `${getProxyService().base}${targetUrl}`
const makeLink = (id, badge, name, description, url, extra = {}) => ({ id, badge, name, description, url, ...extra })

const makeCdnUrl = (address) => {
  const service = getCdnService()
  const owner = encodeURIComponent(address.owner)
  const repo = encodeURIComponent(address.repo)
  const ref = encodeURIComponent(address.ref)
  const filePath = encodeSegments(address.fileParts)
  if (service.format === 'at') return `${service.base}${owner}/${repo}@${ref}/${filePath}`
  return `${service.base}${owner}/${repo}/${ref}/${filePath}`
}

const makeProxyLink = (id, name, targetUrl, description) => {
  const service = getProxyService()
  return makeLink(id, '代理', name, `${description} · ${service.name}`, makeProxyUrl(targetUrl), {
    proxyTarget: targetUrl,
    proxyDescription: description,
  })
}

const getRefAndFile = (parts, startIndex) => {
  if (parts[startIndex] === 'refs' && ['heads', 'tags'].includes(parts[startIndex + 1]) && parts.length > startIndex + 3) {
    return {
      ref: parts[startIndex + 2],
      rawRef: parts.slice(startIndex, startIndex + 3).join('/'),
      fileParts: parts.slice(startIndex + 3),
    }
  }
  return {
    ref: parts[startIndex],
    rawRef: parts[startIndex],
    fileParts: parts.slice(startIndex + 1),
  }
}

const parseGitHubLink = (value) => {
  const url = new URL(normalizeInput(value))
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.port) throw new Error('仅支持标准 HTTP 或 HTTPS GitHub 链接。')
  const hostname = url.hostname.toLowerCase()
  const parts = url.pathname.split('/').filter(Boolean).map(safeDecode)
  if (hostname === 'raw.githubusercontent.com') {
    if (parts.length < 4) throw new Error('Raw 文件链接缺少仓库、版本或文件路径。')
    const file = getRefAndFile(parts, 2)
    return {
      kind: 'file',
      owner: parts[0],
      repo: stripGitSuffix(parts[1]),
      sourceUrl: url.href,
      ...file,
    }
  }
  if (hostname !== 'github.com' && hostname !== 'www.github.com') throw new Error('请输入 github.com 或 raw.githubusercontent.com 链接。')
  if (parts.length < 2) throw new Error('链接中缺少仓库所有者或仓库名称。')
  const owner = parts[0]
  const rawRepo = parts[1]
  const repo = stripGitSuffix(rawRepo)
  const base = { owner, repo, sourceUrl: url.href }
  if (parts.length === 2 && /\.git$/i.test(rawRepo)) return { ...base, kind: 'git-clone' }
  if (parts.length === 2) return { ...base, kind: 'repository' }
  if (['blob', 'raw'].includes(parts[2]) && parts.length >= 5) {
    return { ...base, kind: 'file', ...getRefAndFile(parts, 3) }
  }
  if (parts[2] === 'archive' && parts.length >= 4) {
    return { ...base, kind: 'archive', fileName: parts.at(-1) }
  }
  if (parts[2] === 'releases') {
    if (parts[3] === 'download' && parts.length >= 6) {
      return { ...base, kind: 'release-asset', tag: parts[4], fileName: parts.slice(5).join('/') }
    }
    if (parts[3] === 'latest' && parts[4] === 'download' && parts.length >= 6) {
      return { ...base, kind: 'release-asset', tag: 'latest', fileName: parts.slice(5).join('/') }
    }
    if (parts[3] === 'tag' && parts[4]) {
      return { ...base, kind: 'release-tag', tag: parts.slice(4).join('/') }
    }
    if (!parts[3] || (parts[3] === 'latest' && parts.length === 4)) {
      return { ...base, kind: 'latest-release' }
    }
  }
  return { ...base, kind: 'unsupported', path: parts.slice(2).join('/') }
}

const setDetected = (address) => {
  const repoName = `${address.owner}/${address.repo}`
  const presentations = {
    repository: () => ({ code: '仓', title: '仓库主页', detail: `${repoName}，将读取最新公开 Release。` }),
    'latest-release': () => ({ code: '版', title: '最新 Release 页面', detail: `${repoName}，将读取最新发布文件。` }),
    'release-tag': () => ({ code: '版', title: '指定 Release', detail: `${repoName} · ${address.tag}` }),
    'release-asset': () => ({ code: '载', title: 'Release 文件直链', detail: `${repoName} · ${address.fileName}` }),
    file: () => ({ code: '文', title: '仓库文件链接', detail: `${repoName} · ${address.ref} · ${address.fileParts.join('/')}` }),
    archive: () => ({ code: '包', title: '仓库压缩包', detail: `${repoName} · ${address.fileName}` }),
    'git-clone': () => ({ code: '克', title: 'Git 克隆地址', detail: `${repoName}.git` }),
    unsupported: () => ({ code: '!', title: '暂不支持的 GitHub 页面', detail: `${repoName} · ${address.path}` }),
  }
  const presentation = presentations[address.kind]?.()
  detected.value = presentation ? { ...presentation, status: address.kind === 'unsupported' ? 'error' : 'success' } : null
}

const setDetectionError = (detail) => {
  detected.value = { code: '!', title: '识别失败', detail, status: 'error' }
}

const formatBytes = (bytes) => {
  if (!Number.isFinite(bytes) || bytes < 0) return ''
  if (bytes < 1024) return `${bytes} B`
  const units = ['KB', 'MB', 'GB', 'TB']
  let value = bytes / 1024
  let unitIndex = 0
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024
    unitIndex += 1
  }
  return `${value >= 10 ? value.toFixed(1) : value.toFixed(2)} ${units[unitIndex]}`
}

const setFileLinks = (address) => {
  const owner = encodeURIComponent(address.owner)
  const repo = encodeURIComponent(address.repo)
  const rawPath = encodeSegments([...address.rawRef.split('/'), ...address.fileParts])
  const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${rawPath}`
  const fileName = address.fileParts.at(-1)
  const cdnService = getCdnService()
  links.value = [
    makeLink('cdn', 'CDN', `${cdnService.name} CDN 链接`, cdnService.description, makeCdnUrl(address), { cdnAddress: address }),
    makeLink('raw', 'RAW', 'GitHub Raw 链接', '直接读取该文件的原始内容。', rawUrl),
  ]
  resultLabel.value = '文件转换结果'
  resultTitle.value = fileName
  resultMeta.value = `${address.owner}/${address.repo} @ ${address.ref}`
  detected.value = detected.value ? { ...detected.value, message: '已根据文件链接生成 CDN 与 Raw 地址。' } : detected.value
  notice.value = ''
}

const setDirectLinks = (address) => {
  const labels = {
    'release-asset': ['Release 下载结果', address.fileName, 'Release 文件代理下载地址。'],
    archive: ['压缩包下载结果', address.fileName, '仓库 Archive 代理下载地址。'],
    'git-clone': ['Git 克隆结果', `${address.repo}.git`, 'Git 仓库代理克隆地址。'],
  }
  const [label, title, description] = labels[address.kind]
  links.value = [
    makeProxyLink('proxy', '代理地址', address.sourceUrl, description),
    makeLink('original', '原始', 'GitHub 原始地址', '保留提交的 GitHub 官方链接。', address.sourceUrl),
  ]
  resultLabel.value = label
  resultTitle.value = title
  resultMeta.value = `${address.owner}/${address.repo}`
  showNotice(`已识别${detected.value.title}，并生成对应代理地址。`, 'success')
}

const fetchReleaseAssets = async (address) => {
  requestController?.abort()
  const controller = new AbortController()
  requestController = controller
  loading.value = true
  links.value = []
  resultLabel.value = '正在读取'
  resultTitle.value = address.kind === 'release-tag' ? `Release ${address.tag}` : '最新 Release'
  resultMeta.value = '正在请求 GitHub 官方 API。'
  showNotice('正在读取公开 Release 信息。', 'info')
  const endpoint = address.kind === 'release-tag' ? `tags/${encodeURIComponent(address.tag)}` : 'latest'
  try {
    const response = await fetch(`https://api.github.com/repos/${encodeURIComponent(address.owner)}/${encodeURIComponent(address.repo)}/releases/${endpoint}`, {
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      signal: controller.signal,
    })
    if (response.status === 404) throw new Error(address.kind === 'release-tag' ? '没有找到该公开 Release。' : '该仓库没有公开 Release。')
    if (response.status === 403 && response.headers.get('x-ratelimit-remaining') === '0') throw new Error('GitHub API 匿名请求额度已用完，请稍后重试。')
    if (!response.ok) throw new Error(`GitHub API 请求失败（${response.status}）。`)
    const release = await response.json()
    const assets = Array.isArray(release.assets) ? release.assets.filter((asset) => asset?.browser_download_url) : []
    if (!assets.length) throw new Error('已找到 Release，但其中没有可下载文件。')
    links.value = assets.map((asset, index) => {
      const size = formatBytes(asset.size)
      const description = ['Release 发布文件', size].filter(Boolean).join(' · ')
      return makeProxyLink(`release-${asset.id || index}`, asset.name || '未命名文件', asset.browser_download_url, description)
    })
    const publishedDate = release.published_at ? new Date(release.published_at).toLocaleDateString('zh-CN') : ''
    resultLabel.value = address.kind === 'release-tag' ? '指定 Release' : '最新 Release'
    resultTitle.value = release.name || release.tag_name || 'Release 文件'
    resultMeta.value = [`${address.owner}/${address.repo}`, release.tag_name, `${assets.length} 个文件`, publishedDate].filter(Boolean).join(' · ')
    showNotice(`已根据链接读取到 ${assets.length} 个 Release 文件。`, 'success')
  } catch (error) {
    if (error.name === 'AbortError') return
    links.value = []
    if (detected.value) detected.value = { ...detected.value, status: 'error' }
    resultLabel.value = '读取失败'
    resultTitle.value = '无法生成 Release 下载链接'
    resultMeta.value = ''
    showNotice(error.message || '获取 Release 失败，请稍后重试。', 'error')
  } finally {
    if (requestController === controller) {
      requestController = undefined
      loading.value = false
    }
  }
}

const analyzeLink = async () => {
  const value = sourceUrl.value.trim()
  requestController?.abort()
  requestController = undefined
  loading.value = false
  resetResult()
  notice.value = ''
  detected.value = null
  if (!value) {
    const message = '请先输入需要判断的 GitHub 链接。'
    setDetectionError(message)
    showNotice(message, 'error')
    return
  }
  try {
    const address = parseGitHubLink(value)
    setDetected(address)
    if (address.kind === 'unsupported') {
      resultTitle.value = '暂不支持该页面类型'
      showNotice('该链接属于 GitHub，但不是可转换的文件、Release、Archive 或克隆地址。', 'error')
      return
    }
    if (address.kind === 'file') {
      setFileLinks(address)
      return
    }
    if (['release-asset', 'archive', 'git-clone'].includes(address.kind)) {
      setDirectLinks(address)
      return
    }
    await fetchReleaseAssets(address)
  } catch (error) {
    resetResult()
    const message = error.message || '链接格式不正确，请检查后重试。'
    setDetectionError(message)
    showNotice(message, 'error')
  }
}

const refreshProxyLinks = () => {
  const service = getProxyService()
  let updated = false
  links.value = links.value.map((link) => {
    if (!link.proxyTarget) return link
    updated = true
    return {
      ...link,
      url: makeProxyUrl(link.proxyTarget),
      description: `${link.proxyDescription} · ${service.name}`,
    }
  })
  if (updated) showNotice(`已切换为 ${service.name}，结果已重新生成。`, 'success')
}

const refreshCdnLinks = () => {
  const service = getCdnService()
  links.value = links.value.map((link) => {
    if (!link.cdnAddress) return link
    return {
      ...link,
      name: `${service.name} CDN 链接`,
      description: service.description,
      url: makeCdnUrl(link.cdnAddress),
    }
  })
}

const handleSourceInput = () => {
  requestController?.abort()
  requestController = undefined
  loading.value = false
  detected.value = null
  notice.value = ''
  resetResult()
}

const writeClipboard = async (text) => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return true
  }
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  const copied = document.execCommand('copy')
  document.body.removeChild(textarea)
  return copied
}

const copyText = async (text, id) => {
  try {
    if (!await writeClipboard(text)) throw new Error('copy failed')
    copiedId.value = id
    showNotice('链接已复制到剪贴板。', 'success')
    clearTimeout(copiedTimer)
    copiedTimer = setTimeout(() => {
      copiedId.value = ''
    }, 1800)
  } catch {
    showNotice('复制失败，请手动复制链接。', 'error')
  }
}

const copyAll = async () => {
  if (!links.value.length) return
  copyingAll.value = true
  try {
    const text = links.value.map((link) => `${link.name}\n${link.url}`).join('\n\n')
    if (!await writeClipboard(text)) throw new Error('copy failed')
    showNotice('全部结果已复制到剪贴板。', 'success')
  } catch {
    showNotice('复制失败，请逐条复制链接。', 'error')
  } finally {
    copyingAll.value = false
  }
}

const clearAll = () => {
  requestController?.abort()
  requestController = undefined
  sourceUrl.value = ''
  detected.value = null
  notice.value = ''
  loading.value = false
  resetResult()
}

onUnmounted(() => {
  clearTimeout(copiedTimer)
  requestController?.abort()
})
</script>

<style scoped>
.linkgen-app {
  display: grid;
  max-width: 900px;
  gap: 16px;
  margin-top: 22px;
  padding: clamp(12px, 2.5vw, 22px);
  border: 1px solid color-mix(in srgb, var(--vp-custom-accent) 12%, var(--vp-c-border));
  border-radius: 22px;
  background:
    radial-gradient(circle at 92% 0%, color-mix(in srgb, var(--vp-custom-accent) 10%, transparent), transparent 34%),
    color-mix(in srgb, var(--vp-custom-bg-soft) 68%, transparent);
}

.linkgen-hero {
  padding: 6px 8px 8px;
}

.linkgen-card-label {
  margin: 0 0 5px;
  color: var(--vp-custom-accent);
  font-size: 0.72rem;
  font-weight: 750;
  letter-spacing: 0.08em;
}

.linkgen-hero-title,
.linkgen-section-title,
.linkgen-result-title {
  margin: 0;
  letter-spacing: -0.025em;
}

.linkgen-hero-title {
  font-size: clamp(1.35rem, 3vw, 1.75rem);
  font-weight: 700;
}

.linkgen-hero > p:last-child {
  max-width: 680px;
  margin: 8px 0 0;
  color: var(--vp-custom-text-2);
}

.linkgen-input-card,
.linkgen-settings-card,
.linkgen-detection-card,
.linkgen-results {
  padding: clamp(17px, 2.6vw, 23px);
}

.linkgen-label,
.linkgen-select-label {
  display: block;
  color: var(--vp-custom-text-1);
  font-size: 0.86rem;
  font-weight: 680;
}

.linkgen-input-row {
  display: flex;
  gap: 9px;
  margin-top: 9px;
}

.linkgen-input {
  min-width: 0;
  flex: 1;
  padding: 0 13px;
}

.linkgen-input::placeholder {
  color: var(--vp-custom-text-3);
}

.linkgen-analyze {
  flex: 0 0 auto;
  min-width: 126px;
}

.linkgen-input-foot {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-top: 9px;
}

.linkgen-input-foot p,
.linkgen-settings-card > div > p:last-child,
.linkgen-detected p,
.linkgen-result-meta {
  margin: 0;
  color: var(--vp-custom-text-3);
  font-size: 0.8rem;
  line-height: 1.55;
}

.linkgen-clear {
  flex: 0 0 auto;
  margin-top: -3px;
}

.linkgen-context-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 16px;
}

.linkgen-settings-card,
.linkgen-detection-card {
  display: grid;
  align-content: start;
  gap: 13px;
}

.linkgen-section-title {
  font-size: 1.02rem;
  font-weight: 700;
}

.linkgen-settings-card > div > p:last-child {
  margin-top: 5px;
}

.linkgen-settings-fields {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

.linkgen-setting-field {
  display: grid;
  gap: 6px;
}

.linkgen-select-label {
  color: var(--vp-custom-text-2);
  font-size: 0.78rem;
}

.linkgen-select {
  width: 100%;
  padding: 0 34px 0 12px;
}

.linkgen-detected {
  display: flex;
  align-items: center;
  min-height: 52px;
}

.linkgen-detection-card-error {
  border-color: color-mix(in srgb, var(--vp-c-red-bg) 42%, var(--vp-custom-glass-border));
  background: color-mix(in srgb, var(--vp-c-red-soft) 72%, var(--vp-custom-glass-bg));
  box-shadow: inset 0 1px 0 var(--vp-custom-highlight), 0 8px 24px color-mix(in srgb, var(--vp-c-red-bg) 10%, transparent);
}

.linkgen-detection-card-error .linkgen-card-label,
.linkgen-detection-card-error .linkgen-section-title {
  color: var(--vp-c-red-text);
}

.linkgen-detected strong {
  display: block;
  margin-bottom: 3px;
  font-size: 0.9rem;
}

.linkgen-detected .linkgen-detected-message {
  margin-top: 4px;
  color: var(--vp-c-green-text);
  font-weight: 600;
}

.linkgen-detected-empty {
  min-height: 0;
  opacity: 0.74;
}

.linkgen-notice {
  font-size: 0.87rem;
}

.linkgen-results-head,
.linkgen-result-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.linkgen-result-title {
  font-size: 1.15rem;
  font-weight: 700;
}

.linkgen-result-meta {
  margin-top: 6px;
}

.linkgen-copy-all,
.linkgen-copy {
  min-height: 36px;
  padding-inline: 11px;
}

.linkgen-result-list {
  display: grid;
  gap: 11px;
  margin-top: 17px;
}

.linkgen-result-card {
  padding: 15px;
  border-radius: 13px;
  transition: border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease;
}

.linkgen-result-card:hover {
  border-color: color-mix(in srgb, var(--vp-custom-accent) 32%, var(--vp-custom-glass-border));
  box-shadow: inset 0 1px 0 var(--vp-custom-highlight), 0 7px 18px color-mix(in srgb, var(--vp-custom-text-1) 8%, transparent);
  transform: translateY(-1px);
}

.linkgen-type-tag {
  display: inline-flex;
  min-height: 23px;
  align-items: center;
  padding: 0 8px;
  border: 1px solid color-mix(in srgb, var(--vp-custom-accent) 25%, var(--vp-custom-glass-border));
  border-radius: 7px;
  color: var(--vp-custom-accent);
  background: color-mix(in srgb, var(--vp-custom-accent) 8%, var(--vp-custom-glass-strong));
  font-size: 0.68rem;
  font-weight: 750;
}

.linkgen-result-name {
  display: block;
  margin: 7px 0 0;
  font-size: 0.94rem;
}

.linkgen-result-top p {
  margin: 4px 0 0;
  color: var(--vp-custom-text-2);
  font-size: 0.8rem;
}

.linkgen-copy {
  flex: 0 0 auto;
}

.linkgen-url-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
  padding: 8px 8px 8px 11px;
  border: 1px solid color-mix(in srgb, var(--vp-custom-glass-border) 70%, transparent);
  border-radius: 9px;
  background: color-mix(in srgb, var(--vp-custom-bg-muted) 58%, transparent);
  box-shadow: inset 0 1px 0 color-mix(in srgb, var(--vp-custom-highlight) 70%, transparent);
}

.linkgen-url-row code {
  min-width: 0;
  flex: 1;
  padding: 0;
  overflow-wrap: anywhere;
  color: var(--vp-custom-text-2);
  background: transparent;
  font-size: 0.76rem;
  line-height: 1.55;
}

.linkgen-open {
  display: inline-flex;
  min-width: 46px;
  min-height: 36px;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: var(--vp-custom-accent);
  background: color-mix(in srgb, var(--vp-custom-accent) 8%, transparent);
  font-size: 0.78rem;
  font-weight: 680;
  text-decoration: none;
}

.linkgen-open:hover {
  color: var(--vp-custom-accent-text);
  background: var(--vp-custom-accent);
}

.linkgen-open:focus-visible {
  outline: 2px solid var(--vp-custom-accent);
  outline-offset: 2px;
}

@media (max-width: 720px) {
  .linkgen-app {
    gap: 12px;
    padding: 10px;
    border-radius: 17px;
  }

  .linkgen-input-card,
  .linkgen-settings-card,
  .linkgen-detection-card,
  .linkgen-results {
    padding: 16px;
    border-radius: 13px;
  }

  .linkgen-input-row,
  .linkgen-results-head,
  .linkgen-result-top {
    flex-direction: column;
  }

  .linkgen-analyze,
  .linkgen-copy-all {
    width: 100%;
  }

  .linkgen-context-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .linkgen-copy {
    align-self: stretch;
  }

  .linkgen-url-row {
    align-items: stretch;
    flex-direction: column;
  }

  .linkgen-open {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .linkgen-result-card {
    transition: none;
  }
}
</style>
