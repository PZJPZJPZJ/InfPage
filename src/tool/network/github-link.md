---
routeMeta:
  itemTitle: GitHub Link Generator
  itemDesc: GitHub 链接生成器
  itemIcon: github.com
---
<h1 class="linkgen-page-title">GitHub 链接生成器</h1>
<section class="linkgen-app" aria-label="GitHub 链接生成器">
  <header class="linkgen-hero"><h2>从一个链接开始</h2><p>支持 GitHub 仓库页、文件页和 Release 下载地址，自动生成适合使用的链接。</p></header>
  <div class="linkgen-input-card">
    <label class="linkgen-label" for="linkgen-source">GitHub 地址</label>
    <div class="linkgen-input-wrap"><input id="linkgen-source" v-model="sourceUrl" class="linkgen-input" type="url" inputmode="url" autocomplete="url" spellcheck="false" placeholder="https://github.com/owner/repo" @input="generateLinks" @keyup.enter="generateLinks"><button class="linkgen-generate" type="button" :disabled="loading" @click="generateLinks">{{ loading ? '读取中…' : '生成链接' }}</button></div>
    <div class="linkgen-input-foot"><p>仓库页将读取最新 Release；文件页生成 jsDelivr CDN 链接。</p><button v-if="sourceUrl" class="linkgen-clear" type="button" @click="clearAll">清空</button></div>
  </div>
  <div class="linkgen-settings-card"><div><label class="linkgen-label" for="linkgen-proxy">Release 下载代理</label><p>仅对 Release 文件链接及仓库发布文件生效。</p></div><select id="linkgen-proxy" v-model="selectedProxy" class="linkgen-select" @change="refreshProxyLinks"><option v-for="service in proxyServices" :key="service.id" :value="service.id">{{ service.name }}</option></select></div>
  <p v-if="notice" class="linkgen-notice" :class="`linkgen-notice-${noticeType}`" role="status">{{ notice }}</p>
  <section class="linkgen-results" aria-live="polite">
    <div class="linkgen-results-head"><div><p class="linkgen-results-label">{{ links.length ? resultLabel : 'RESULT' }}</p><h2>{{ links.length ? resultTitle : '生成结果' }}</h2><p v-if="releaseInfo" class="linkgen-release-info">{{ releaseInfo }}</p></div><button v-if="links.length > 1" class="linkgen-copy-all" type="button" :disabled="copyingAll" @click="copyAll">{{ copyingAll ? '复制中…' : '复制全部' }}</button></div>
    <div v-if="links.length" class="linkgen-result-list"><article v-for="link in links" :key="link.id" class="linkgen-result-card"><div class="linkgen-result-top"><div><span class="linkgen-type-tag" :class="`linkgen-type-${link.id}`">{{ link.badge }}</span><h3>{{ link.name }}</h3><p>{{ link.description }}</p></div><button class="linkgen-copy" type="button" :aria-label="`复制${link.name}`" @click="copyText(link.url, link.id)">{{ copiedId === link.id ? '已复制' : '复制' }}</button></div><a class="linkgen-url" :href="link.url" target="_blank" rel="noopener noreferrer" :title="`在新标签页打开${link.name}`"><span>{{ link.url }}</span><b>打开</b></a></article></div>
    <div v-else class="linkgen-empty"><h3>{{ loading ? '正在获取最新 Release' : '等待输入链接' }}</h3><p>{{ loading ? '请求 GitHub 官方 API 可能需要几秒钟。' : '粘贴 GitHub 地址后，生成结果会显示在这里。' }}</p></div>
  </section>
</section>

<script setup>
import { onUnmounted, ref } from 'vue'

const sourceUrl = ref('')
const links = ref([])
const notice = ref('')
const noticeType = ref('info')
const copiedId = ref('')
const copyingAll = ref(false)
const loading = ref(false)
const resultLabel = ref('RESULT')
const resultTitle = ref('生成结果')
const releaseInfo = ref('')
const selectedProxy = ref('gh-proxy')
const proxyServices = [
  { id: 'gh-proxy', name: 'gh-proxy.com', base: 'https://gh-proxy.com/', format: 'path' },
  { id: 'ghproxy', name: 'ghproxy.net', base: 'https://ghproxy.net/', format: 'path' },
  { id: 'ghfast', name: 'ghfast.top', base: 'https://ghfast.top/', format: 'full' },
]
let copiedTimer
let requestController

const showNotice = (text, type = 'info') => {
  notice.value = text
  noticeType.value = type
}

const normalizeInput = (value) => /^https?:\/\//i.test(value) ? value : `https://${value.replace(/^\/+/, '')}`
const makeLink = (id, badge, name, description, url) => ({ id, badge, name, description, url })
const getProxyService = () => proxyServices.find((service) => service.id === selectedProxy.value) || proxyServices[0]

const makeProxyUrl = (downloadUrl) => {
  const service = getProxyService()
  if (service.format === 'full') return `${service.base}${downloadUrl}`
  const url = new URL(downloadUrl)
  return `${service.base}${url.hostname}${url.pathname}${url.search}`
}

const getGitHubAddress = (url) => {
  const hostname = url.hostname.toLowerCase()
  if (hostname !== 'github.com' && hostname !== 'www.github.com') return null
  const parts = url.pathname.split('/').filter(Boolean)
  if (parts.length < 2) return null
  return { owner: parts[0], repo: parts[1], parts }
}

const setDirectReleaseLink = (url, fileName) => {
  links.value = [makeLink('proxy', '下载', `${getProxyService().name} 下载链接`, '当前 Release 文件的代理下载地址。', makeProxyUrl(url.href))]
  resultLabel.value = 'RELEASE ASSET'
  resultTitle.value = fileName
  releaseInfo.value = '已识别 Release 文件直链。'
  showNotice('已生成当前文件的代理下载链接。', 'success')
}

const setFileLink = ({ owner, repo, parts }) => {
  const ref = parts[3]
  const filePath = parts.slice(4).join('/')
  links.value = [makeLink('cdn', 'CDN', 'jsDelivr CDN 链接', '适合图片、脚本和其他较小的静态文件。', `https://cdn.jsdelivr.net/gh/${owner}/${repo}@${ref}/${filePath}`)]
  resultLabel.value = 'FILE LINK'
  resultTitle.value = filePath.split('/').at(-1) || 'jsDelivr 文件链接'
  releaseInfo.value = `${owner}/${repo} @ ${ref}`
  showNotice('已识别 GitHub 文件页，并生成 jsDelivr 链接。', 'success')
}

const fetchReleaseAssets = async (owner, repo, endpoint = 'latest') => {
  requestController?.abort()
  requestController = new AbortController()
  loading.value = true
  links.value = []
  resultLabel.value = 'LOADING'
  resultTitle.value = '正在读取最新 Release'
  releaseInfo.value = '正在向 GitHub 官方 API 请求发布信息。'
  showNotice('正在读取 GitHub 最新 Release。', 'info')
  try {
    const response = await fetch(`https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/releases/${endpoint}`, {
      headers: { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' },
      signal: requestController.signal,
    })
    if (response.status === 404) throw new Error('未找到公开 Release')
    if (!response.ok) throw new Error(`GitHub API 请求失败（${response.status}）`)
    const release = await response.json()
    const assets = Array.isArray(release.assets) ? release.assets : []
    if (!assets.length) throw new Error('该 Release 没有可下载的文件')
    links.value = assets.map((asset, index) => makeLink(`release-${asset.id || index}`, '下载', asset.name || '未命名文件', 'Release 发布文件。', makeProxyUrl(asset.browser_download_url)))
    resultLabel.value = 'LATEST RELEASE'
    resultTitle.value = release.name || release.tag_name || '最新 Release'
    releaseInfo.value = `${owner}/${repo} · ${assets.length} 个文件${release.published_at ? ` · 发布于 ${new Date(release.published_at).toLocaleDateString('zh-CN')}` : ''}`
    showNotice(`已获取最新 Release 的 ${assets.length} 个文件。`, 'success')
  } catch (error) {
    if (error.name === 'AbortError') return
    links.value = []
    resultLabel.value = 'REQUEST FAILED'
    resultTitle.value = '无法获取 Release'
    releaseInfo.value = ''
    showNotice(error.message || '获取 Release 失败，请稍后重试。', 'error')
  } finally {
    loading.value = false
  }
}

const generateLinks = async () => {
  const value = sourceUrl.value.trim()
  requestController?.abort()
  links.value = []
  copiedId.value = ''
  releaseInfo.value = ''
  if (!value) {
    notice.value = ''
    resultLabel.value = 'RESULT'
    resultTitle.value = '生成结果'
    return
  }
  try {
    const url = new URL(normalizeInput(value))
    const address = getGitHubAddress(url)
    if (!address) {
      showNotice('请输入 github.com 的仓库页、文件页或 Release 地址。', 'error')
      return
    }
    const { owner, repo, parts } = address
    if (parts.length === 2 || (parts[2] === 'releases' && parts[3] === 'latest')) {
      await fetchReleaseAssets(owner, repo)
      return
    }
    if (parts[2] === 'blob' && parts.length >= 5) {
      setFileLink(address)
      return
    }
    if (parts[2] === 'releases' && parts[3] === 'download' && parts.length >= 5) {
      setDirectReleaseLink(url, parts.at(-1))
      return
    }
    if (parts[2] === 'releases' && parts[3] === 'tag' && parts[4]) {
      await fetchReleaseAssets(owner, repo, `tags/${encodeURIComponent(parts[4])}`)
      return
    }
    showNotice('该 GitHub 地址暂不支持。请使用仓库页、文件页或 Release 地址。', 'error')
  } catch {
    showNotice('链接格式不正确，请检查后重试。', 'error')
  }
}

const refreshProxyLinks = () => {
  if (sourceUrl.value.trim()) generateLinks()
}

const writeClipboard = async (text) => {
  if (typeof window === 'undefined') return false
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
    copiedTimer = setTimeout(() => { copiedId.value = '' }, 1800)
  } catch {
    showNotice('复制失败，请手动复制链接。', 'error')
  }
}

const copyAll = async () => {
  if (!links.value.length) return
  copyingAll.value = true
  try {
    if (!await writeClipboard(links.value.map((link) => `${link.name}\n${link.url}`).join('\n\n'))) throw new Error('copy failed')
    showNotice('全部链接已复制到剪贴板。', 'success')
  } catch {
    showNotice('复制失败，请逐条复制链接。', 'error')
  } finally {
    copyingAll.value = false
  }
}

const clearAll = () => {
  requestController?.abort()
  sourceUrl.value = ''
  links.value = []
  notice.value = ''
  releaseInfo.value = ''
  resultLabel.value = 'RESULT'
  resultTitle.value = '生成结果'
  copiedId.value = ''
}

onUnmounted(() => {
  clearTimeout(copiedTimer)
  requestController?.abort()
})
</script>

<style scoped>
.linkgen-page-title {
  margin-bottom: 8px;
}
.linkgen-app {
  position: relative;
  isolation: isolate;
  max-width: 840px;
  display: grid;
  gap: 16px;
  margin-top: 28px;
  padding: clamp(14px, 3vw, 26px);
  overflow: hidden;
  border-radius: 28px;
  color: var(--vp-c-text-1);
  background: linear-gradient(135deg, color-mix(in srgb, #67a9ff 19%, var(--vp-c-bg)), color-mix(in srgb, #73e2c2 15%, var(--vp-c-bg)) 58%, color-mix(in srgb, #b399ff 15%, var(--vp-c-bg)));
  box-shadow: 0 24px 60px color-mix(in srgb, var(--vp-c-text-1) 9%, transparent);
  font-variant-numeric: tabular-nums;
}

.linkgen-app::before,
.linkgen-app::after {
  position: absolute;
  z-index: -1;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  content: '';
  filter: blur(26px);
  opacity: .5;
  pointer-events: none;
}

.linkgen-app::before {
  top: -165px;
  right: -110px;
  background: #76b8ff;
}

.linkgen-app::after {
  bottom: -210px;
  left: -125px;
  background: #77dfc1;
}

.linkgen-hero,
.linkgen-input-card,
.linkgen-settings-card,
.linkgen-results,
.linkgen-notice {
  position: relative;
  z-index: 1;
}
.linkgen-hero {
  padding: 10px 10px 8px;
}
.linkgen-hero h2, .linkgen-results h2 {
  margin: 0;
  letter-spacing: -.03em;
}
.linkgen-hero h2 {
  font-size: clamp(1.35rem, 3vw, 1.7rem);
}
.linkgen-hero p {
  margin: 8px 0 0;
  color: var(--vp-c-text-2);
}
.linkgen-input-card, .linkgen-settings-card, .linkgen-results {
  padding: clamp(18px, 3vw, 24px);
  border: 1px solid color-mix(in srgb, #fff 32%, var(--vp-c-border));
  border-radius: 18px;
  background: color-mix(in srgb, var(--vp-c-bg) 66%, transparent);
  box-shadow: inset 0 1px color-mix(in srgb, #fff 42%, transparent), 0 10px 28px color-mix(in srgb, #1d3557 12%, transparent);
  backdrop-filter: blur(22px) saturate(145%);
  -webkit-backdrop-filter: blur(22px) saturate(145%);
}
.linkgen-label {
  display: block;
  color: var(--vp-c-text-1);
  font-size: .88rem;
  font-weight: 650;
}
.linkgen-input-wrap {
  display: flex;
  gap: 8px;
  margin-top: 10px;
  padding: 5px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--vp-c-bg) 76%, transparent);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, #fff 28%, var(--vp-c-border)), inset 0 1px color-mix(in srgb, #fff 38%, transparent);
}
.linkgen-input-wrap:focus-within {
  box-shadow: inset 0 0 0 2px var(--vp-c-brand), 0 0 0 4px color-mix(in srgb, var(--vp-c-brand) 16%, transparent);
}
.linkgen-input {
  min-width: 0;
  flex: 1;
  height: 40px;
  padding: 0 10px;
  outline: 0;
  border: 0;
  color: var(--vp-c-text-1);
  background: transparent;
  font: inherit;
}
.linkgen-input::placeholder {
  color: var(--vp-c-text-3);
}
.linkgen-generate, .linkgen-clear, .linkgen-copy, .linkgen-copy-all {
  border: 0;
  font: inherit;
  font-weight: 650;
  cursor: pointer;
}
.linkgen-generate {
  min-height: 40px;
  padding: 0 15px;
  border-radius: 9px;
  color: var(--vp-c-bg);
  background: var(--vp-c-brand);
  transition: filter .15s ease, transform .15s ease;
  white-space: nowrap;
}
.linkgen-generate:hover:not(:disabled) {
  filter: brightness(1.08);
  transform: translateY(-1px);
}
.linkgen-generate:disabled {
  cursor: wait;
  opacity: .7;
}
.linkgen-input-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-top: 10px;
}
.linkgen-input-foot p, .linkgen-settings-card p {
  margin: 0;
  color: var(--vp-c-text-3);
  font-size: .8rem;
}
.linkgen-clear {
  padding: 4px;
  color: var(--vp-c-text-2);
  background: transparent;
  font-size: .8rem;
}
.linkgen-clear:hover {
  color: var(--vp-c-brand);
}
.linkgen-settings-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding-block: 16px;
}
.linkgen-settings-card .linkgen-label {
  margin-bottom: 5px;
}
.linkgen-select {
  min-width: 170px;
  height: 40px;
  padding: 0 34px 0 12px;
  border: 0;
  border-radius: 9px;
  outline: 0;
  color: var(--vp-c-text-1);
  background: color-mix(in srgb, var(--vp-c-bg) 72%, transparent);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, #fff 28%, var(--vp-c-border));
  font: inherit;
  font-size: .86rem;
}
.linkgen-select:focus {
  box-shadow: inset 0 0 0 2px var(--vp-c-brand);
}
.linkgen-notice {
  margin: 0;
  padding: 11px 14px;
  border-radius: 10px;
  color: var(--vp-c-text-2);
  border: 1px solid color-mix(in srgb, #fff 26%, var(--vp-c-border));
  background: color-mix(in srgb, var(--vp-c-bg) 64%, transparent);
  box-shadow: inset 0 1px color-mix(in srgb, #fff 32%, transparent);
  backdrop-filter: blur(18px);
  font-size: .88rem;
}
.linkgen-notice-success {
  color: #13795b;
  background: color-mix(in srgb, #dff6ed 72%, transparent);
}
.linkgen-notice-error {
  color: #b33a4d;
  background: color-mix(in srgb, #ffeaee 72%, transparent);
}
.linkgen-results {
  min-height: 210px;
}
.linkgen-results-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}
.linkgen-results-label {
  margin: 0 0 5px;
  color: var(--vp-c-text-3);
  font-size: .72rem;
  font-weight: 700;
  letter-spacing: .09em;
}
.linkgen-results h2 {
  font-size: 1.15rem;
}
.linkgen-release-info {
  margin: 7px 0 0;
  color: var(--vp-c-text-3);
  font-size: .8rem;
}
.linkgen-copy-all, .linkgen-copy {
  min-height: 34px;
  padding: 0 11px;
  border-radius: 8px;
  color: var(--vp-c-brand);
  background: color-mix(in srgb, var(--vp-c-brand) 10%, var(--vp-c-bg));
}
.linkgen-copy-all:hover:not(:disabled), .linkgen-copy:hover {
  color: var(--vp-c-bg);
  background: var(--vp-c-brand);
}
.linkgen-copy-all:disabled {
  cursor: wait;
  opacity: .65;
}
.linkgen-result-list {
  display: grid;
  gap: 10px;
  margin-top: 18px;
}
.linkgen-result-card {
  padding: 15px;
  border-radius: 13px;
  border: 1px solid color-mix(in srgb, #fff 26%, var(--vp-c-border));
  background: color-mix(in srgb, var(--vp-c-bg) 68%, transparent);
  box-shadow: inset 0 1px color-mix(in srgb, #fff 35%, transparent), 0 2px 7px color-mix(in srgb, #1d3557 7%, transparent);
  backdrop-filter: blur(16px);
  transition: box-shadow .15s ease, transform .15s ease;
}
.linkgen-result-card:hover {
  box-shadow: inset 0 1px color-mix(in srgb, #fff 40%, transparent), 0 12px 24px color-mix(in srgb, #1d3557 12%, transparent);
  transform: translateY(-1px);
}
.linkgen-result-top {
  display: flex;
  justify-content: space-between;
  gap: 14px;
}
.linkgen-type-tag {
  display: inline-block;
  padding: 3px 7px;
  border-radius: 5px;
  color: var(--vp-c-brand);
  background: color-mix(in srgb, var(--vp-c-brand) 10%, var(--vp-c-bg));
  font-size: .7rem;
  font-weight: 700;
}
.linkgen-type-cdn {
  color: #067a88;
  background: #e1f7f5;
}
.linkgen-result-top h3 {
  margin: 8px 0 0;
  font-size: .95rem;
}
.linkgen-result-top p {
  margin: 4px 0 0;
  color: var(--vp-c-text-2);
  font-size: .82rem;
}
.linkgen-copy {
  flex: 0 0 auto;
  align-self: flex-start;
}
.linkgen-url {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 13px;
  padding: 10px 11px;
  border-radius: 8px;
  color: var(--vp-c-text-2);
  background: color-mix(in srgb, var(--vp-c-bg-mute) 62%, transparent);
  box-shadow: inset 0 1px color-mix(in srgb, #fff 20%, transparent);
  backdrop-filter: blur(12px);
  font-family: var(--vp-font-family-mono);
  font-size: .78rem;
  line-height: 1.5;
  text-decoration: none;
}
.linkgen-url:hover {
  color: var(--vp-c-brand);
}
.linkgen-url span {
  min-width: 0;
  overflow-wrap: anywhere;
}
.linkgen-url b {
  flex: 0 0 auto;
  color: var(--vp-c-brand);
  font-family: var(--vp-font-family-base);
  font-size: .74rem;
}
.linkgen-empty {
  display: grid;
  min-height: 130px;
  align-content: center;
}
.linkgen-empty h3 {
  margin: 0;
  font-size: 1rem;
}
.linkgen-empty p {
  max-width: 440px;
  margin: 8px 0 0;
  color: var(--vp-c-text-2);
  font-size: .88rem;
}
.linkgen-generate:focus-visible, .linkgen-clear:focus-visible, .linkgen-copy:focus-visible, .linkgen-copy-all:focus-visible, .linkgen-url:focus-visible {
  outline: 2px solid var(--vp-c-brand);
  outline-offset: 3px;
}
@media (max-width: 640px) {
  .linkgen-app {
    gap: 12px;
    padding: 12px;
    border-radius: 20px;
  }
  .linkgen-input-card, .linkgen-settings-card, .linkgen-results {
    padding: 18px;
    border-radius: 14px;
  }
  .linkgen-input-wrap {
    align-items: stretch;
    flex-direction: column;
  }
  .linkgen-generate {
    width: 100%;
  }
  .linkgen-settings-card {
    align-items: stretch;
    flex-direction: column;
    gap: 12px;
  }
  .linkgen-select {
    width: 100%;
  }
  .linkgen-input-foot {
    align-items: flex-start;
  }
  .linkgen-results-head {
    align-items: flex-start;
    flex-direction: column;
  }
  .linkgen-copy-all {
    width: 100%;
  }
  .linkgen-result-top p {
    line-height: 1.45;
  }
  .linkgen-url {
    align-items: flex-start;
  }
  .linkgen-url b {
    padding-top: 1px;
  }
}
</style>
