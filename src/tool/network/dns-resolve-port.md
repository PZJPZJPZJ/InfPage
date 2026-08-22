---
routeMeta:
  itemTitle: DNS Resolve Port
  itemDesc: 打洞端口查询工具
  itemIcon: cloud.tencent.com
---
# 打洞端口查询工具
<section class="vp-custom-surface dns-app" aria-label="打洞端口查询工具">
  <section class="vp-custom-glass-card dns-card" aria-labelledby="dns-query-title">
    <div class="dns-head">
      <div>
        <p class="dns-kicker">DNS PORT RESOLVER</p>
        <p id="dns-query-title" class="dns-title">查询打洞端口</p>
        <p class="dns-desc">解析域名中的 TXT、AAAA/IP4P 与 SRV 记录，并生成可直接访问的端口链接。</p>
      </div>
    </div>
    <form class="dns-form" @submit.prevent="updateResults">
      <label class="dns-label" for="dns-name">查询域名</label>
      <input
        id="dns-name"
        v-model="name"
        class="vp-custom-control dns-control"
        type="text"
        inputmode="url"
        autocomplete="off"
        autocapitalize="none"
        spellcheck="false"
        placeholder="例如 tunnel.example.com"
        aria-describedby="dns-name-help"
        :aria-invalid="inputError ? 'true' : 'false'"
      >
      <p id="dns-name-help" class="dns-help">直接输入只查询、不修改当前 URL。参数访问示例：?name=tunnel.example.com&amp;type=AAAA；若结果唯一会自动跳转。</p>
      <p v-if="inputError" class="dns-error" role="alert">{{ inputError }}</p>
      <div class="dns-actions">
        <button class="vp-custom-button vp-custom-button-primary" type="submit" :disabled="loading">{{ loading ? '查询中…' : '开始查询' }}</button>
        <button class="vp-custom-button vp-custom-button-secondary" type="button" :disabled="!name && !results.length" @click="clearAll">清空</button>
      </div>
    </form>
  </section>
  <section class="vp-custom-glass-card dns-card dns-settings-card" aria-labelledby="dns-settings-title">
    <div class="dns-head">
      <div>
        <p class="dns-kicker">QUERY SETTINGS</p>
        <p id="dns-settings-title" class="dns-title">查询设置</p>
        <p class="dns-desc">输入或设置变化后等待 500ms 自动查询，也可点击上方按钮立即查询。</p>
        <p v-if="storageNotice" class="dns-storage-notice" role="status">{{ storageNotice }}</p>
      </div>
    </div>
    <div class="dns-group" aria-labelledby="dns-request-settings">
      <p id="dns-request-settings" class="dns-group-title">解析请求</p>
      <div class="dns-grid dns-grid-four">
        <label class="dns-field" for="dns-provider">
          <span>DNS 服务</span>
          <select id="dns-provider" v-model="providerId" class="vp-custom-control dns-control">
            <option v-for="provider in PROVIDERS" :key="provider.id" :value="provider.id">{{ provider.label }}</option>
          </select>
        </label>
        <label class="dns-field" for="dns-strategy">
          <span>查询策略</span>
          <select id="dns-strategy" v-model="strategy" class="vp-custom-control dns-control">
            <option value="parallel">并行查询</option>
            <option value="sequential">顺序查询</option>
          </select>
        </label>
        <label class="dns-field" for="dns-timeout">
          <span>单项超时</span>
          <select id="dns-timeout" v-model="timeoutMs" class="vp-custom-control dns-control">
            <option v-for="item in TIMEOUTS" :key="item.value" :value="item.value">{{ item.label }}</option>
          </select>
        </label>
        <label class="dns-field" for="dns-scheme">
          <span>链接协议</span>
          <select id="dns-scheme" v-model="scheme" class="vp-custom-control dns-control"><option value="https">HTTPS</option><option value="http">HTTP</option></select>
        </label>
      </div>
    </div>
    <fieldset class="dns-group dns-fieldset">
      <legend class="dns-group-title">记录类型</legend>
      <p class="dns-help">URL 参数 type 支持 TXT/16、AAAA/28、IP4P/28、SRV/33；指定单一类型且结果唯一时自动跳转。</p>
      <div class="dns-grid dns-grid-three">
        <label v-for="record in RECORDS" :key="record.value" class="dns-choice">
          <input v-model="selectedTypes" type="checkbox" :value="record.value" :disabled="selectedTypes.length === 1 && selectedTypes.includes(record.value)">
          <span><strong>{{ record.label }}</strong><small>{{ record.desc }}</small></span>
        </label>
      </div>
    </fieldset>
  </section>
  <section class="vp-custom-glass-card dns-card" aria-labelledby="dns-results-title" :aria-busy="loading">
    <div class="dns-head">
      <div>
        <p class="dns-kicker">RESOLVE RESULTS</p>
        <p id="dns-results-title" class="dns-title">查询结果</p>
        <p class="dns-desc">结果按类型汇总，可筛选、复制或打开。</p>
      </div>
    </div>
    <div v-if="statusMessage" class="vp-custom-status dns-status" :class="statusClass" :role="statusTone === 'error' ? 'alert' : 'status'" aria-live="polite">
      <span v-if="loading" class="dns-spinner" aria-hidden="true"></span><span>{{ statusMessage }}</span>
    </div>
    <div v-if="results.length" class="dns-list">
      <article v-for="item in results" :key="`${item.type}-${item.url}`" class="vp-custom-glass-muted dns-result">
        <div class="dns-result-main">
          <span class="dns-badge">{{ item.type }}</span><p class="dns-target">{{ item.target }}</p><p class="dns-meta">端口 <strong>{{ item.port }}</strong></p><code>{{ item.url }}</code>
        </div>
        <div class="dns-actions dns-result-actions">
          <button class="vp-custom-button vp-custom-button-secondary" type="button" @click="copyOne(item)">{{ copiedId === item.url ? '已复制' : '复制链接' }}</button>
          <button class="vp-custom-button vp-custom-button-secondary" type="button" @click="copyQueryLink(item)">{{ copiedId === `query-${item.type}` ? '已复制直链' : '复制查询直链' }}</button>
          <button class="vp-custom-button vp-custom-button-primary" type="button" @click="openResult(item.url)">打开链接</button>
        </div>
      </article>
    </div>
    <div v-else-if="!loading && !statusMessage" class="dns-empty"><strong>等待查询</strong><p>输入域名并完成设置后，查询结果会显示在这里。</p></div>
  </section>
</section>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

const PROVIDERS = [
  { id: 'alidns', label: '阿里 DNS', endpoint: 'https://dns.alidns.com/resolve', headers: {} },
  { id: 'google', label: 'Google Public DNS', endpoint: 'https://dns.google/resolve', headers: {} },
  { id: 'cloudflare', label: 'Cloudflare 1.1.1.1', endpoint: 'https://cloudflare-dns.com/dns-query', headers: { Accept: 'application/dns-json' } },
]
const RECORDS = [
  { value: '16', label: 'TXT', type: 'TXT', desc: 'URL 参数：type=TXT 或 16' },
  { value: '28', label: 'AAAA / IP4P', type: 'IP4P', desc: '仅解析 2001::port:IPv4；type=AAAA/IP4P/28' },
  { value: '33', label: 'SRV', type: 'SRV', desc: 'URL 参数：type=SRV 或 33' },
]
const TIMEOUTS = [3, 5, 10, 15].map((seconds) => ({ value: seconds * 1000, label: `${seconds} 秒` }))
const DEFAULT_TYPES = RECORDS.map(({ value }) => value)
const DOH_PASSTHROUGH_PARAMS = ['cd', 'do', 'edns_client_subnet', 'random_padding']
const STORAGE_KEY = 'infpage:tool:dns-resolve-port'
const SETTINGS_VERSION = 1
const name = ref('')
const providerId = ref('alidns')
const selectedTypes = ref([...DEFAULT_TYPES])
const scheme = ref('https')
const timeoutMs = ref(10000)
const strategy = ref('parallel')
const results = ref([])
const loading = ref(false)
const inputError = ref('')
const statusMessage = ref('')
const statusTone = ref('neutral')
const copiedId = ref('')
const storageNotice = ref('')
let autoTimer
let copyTimer
let sequence = 0
let passthroughParams = new URLSearchParams()
let initializingUrlState = true
let settingsReady = false
const controllers = new Set()

const provider = computed(() => PROVIDERS.find(({ id }) => id === providerId.value) || PROVIDERS[0])
const statusClass = computed(() => ({
  'vp-custom-status-error': statusTone.value === 'error',
  'vp-custom-status-success': statusTone.value === 'success',
  'dns-warning': statusTone.value === 'warning',
}))

function normalizeDomain(value) {
  const domain = value.trim().replace(/\.$/, '')
  if (!domain) return { error: '请输入需要查询的域名。' }
  if (/[:/\\?#\s]/.test(domain)) return { error: '请输入纯域名，不要包含协议、路径、端口或空格。' }
  if (domain.length > 253) return { error: '域名长度不能超过 253 个字符。' }
  const valid = domain.split('.').every((label) => label && label.length <= 63 && /^[\p{L}\p{N}_](?:[\p{L}\p{N}_-]*[\p{L}\p{N}_])?$/u.test(label))
  return valid ? { domain } : { error: '域名格式不正确，请检查空标签或特殊字符。' }
}
const validPort = (port) => Number.isInteger(port) && port > 0 && port <= 65535
const cleanTarget = (value) => String(value || '').trim().replace(/\.$/, '')
const makeResult = (type, target, port) => target && validPort(port) ? { type, target, port, url: `${scheme.value}://${target}:${port}` } : null

function expandIpv6(value) {
  const address = String(value || '').trim().toLowerCase()
  if (!address || address.includes('.') || !/^[0-9a-f:]+$/.test(address)) return null
  const halves = address.split('::')
  if (halves.length > 2) return null
  const left = halves[0] ? halves[0].split(':') : []
  const right = halves[1] ? halves[1].split(':') : []
  if (![...left, ...right].every((part) => /^[0-9a-f]{1,4}$/.test(part))) return null
  if (halves.length === 1) return left.length === 8 ? left.map((part) => Number.parseInt(part, 16)) : null
  const missing = 8 - left.length - right.length
  if (missing < 1) return null
  return [...left, ...Array(missing).fill('0'), ...right].map((part) => Number.parseInt(part, 16))
}

function decodeIp4p(value) {
  const groups = expandIpv6(value)
  if (!groups || groups.length !== 8) return null
  if (groups[0] !== 0x2001 || groups.slice(1, 5).some((part) => part !== 0)) return null
  const port = groups[5]
  if (!validPort(port)) return null
  const hi = groups[6]
  const lo = groups[7]
  return {
    target: `${hi >> 8}.${hi & 255}.${lo >> 8}.${lo & 255}`,
    port,
  }
}

function decode(data, queryType) {
  const decoded = []
  for (const answer of data?.Answer || []) {
    let item
    if (queryType === '16') {
      item = makeResult('TXT', cleanTarget(answer.name), Number.parseInt(String(answer.data || '').replace(/\D/g, ''), 10))
    } else if (queryType === '28') {
      const ip4p = decodeIp4p(answer.data)
      if (ip4p) item = makeResult('IP4P', ip4p.target, ip4p.port)
    } else {
      const parts = String(answer.data || '').trim().split(/\s+/)
      if (parts.length >= 4) item = makeResult('SRV', cleanTarget(parts[3]), Number.parseInt(parts[2], 10))
    }
    if (item) decoded.push(item)
  }
  return decoded
}

async function fetchType(domain, queryType) {
  if (typeof window === 'undefined') return []
  const controller = new AbortController()
  controllers.add(controller)
  let timedOut = false
  const timer = window.setTimeout(() => { timedOut = true; controller.abort() }, timeoutMs.value)
  try {
    const query = new URLSearchParams({ name: domain, type: queryType })
    for (const key of DOH_PASSTHROUGH_PARAMS) {
      if (passthroughParams.has(key)) query.set(key, passthroughParams.get(key))
    }
    const response = await fetch(`${provider.value.endpoint}?${query}`, { headers: provider.value.headers, signal: controller.signal })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const data = await response.json()
    if (typeof data.Status === 'number' && data.Status !== 0) throw new Error(`DNS 状态码 ${data.Status}`)
    return decode(data, queryType)
  } catch (error) {
    if (timedOut) throw new Error('请求超时')
    throw error
  } finally {
    window.clearTimeout(timer)
    controllers.delete(controller)
  }
}
function cancelRequests() { for (const controller of controllers) controller.abort(); controllers.clear() }

async function updateResults({ redirectUnique = false } = {}) {
  const validation = normalizeDomain(name.value)
  inputError.value = validation.error || ''
  if (validation.error) return
  name.value = validation.domain
  cancelRequests()
  const current = ++sequence
  loading.value = true
  results.value = []
  statusTone.value = 'neutral'
  statusMessage.value = `正在通过 ${provider.value.label} 查询 ${selectedTypes.value.length} 种记录…`
  const found = []
  const failures = []
  const run = async (type) => {
    try { found.push(...await fetchType(validation.domain, type)) }
    catch (error) { if (error?.name !== 'AbortError') failures.push(`${RECORDS.find((item) => item.value === type)?.type}：${error?.message || '请求失败'}`) }
  }
  if (strategy.value === 'parallel') await Promise.all(selectedTypes.value.map(run))
  else for (const type of selectedTypes.value) { if (current !== sequence) return; await run(type) }
  if (current !== sequence) return
  results.value = Array.from(new Map(found.map((item) => [`${item.type}-${item.url}`, item])).values())
  loading.value = false
  if (redirectUnique && results.value.length === 1) {
    statusTone.value = 'success'
    statusMessage.value = '已解析到唯一目标，正在跳转…'
    window.location.replace(results.value[0].url)
    return
  }
  if (results.value.length && failures.length) { statusTone.value = 'warning'; statusMessage.value = `查询部分完成，获得 ${results.value.length} 条结果；${failures.join('；')}` }
  else if (results.value.length) { statusTone.value = 'success'; statusMessage.value = '查询完成。' }
  else if (failures.length) { statusTone.value = 'error'; statusMessage.value = `查询失败：${failures.join('；')}` }
  else statusMessage.value = '查询完成，但所选记录类型中没有可用的端口链接。'
}

function scheduleQuery() {
  if (typeof window === 'undefined') return
  window.clearTimeout(autoTimer)
  if (initializingUrlState) return
  if (name.value.trim()) autoTimer = window.setTimeout(updateResults, 500)
}
function readState() {
  const params = new URLSearchParams(window.location.search)
  name.value = params.get('name') || ''
  if (PROVIDERS.some(({ id }) => id === params.get('resolver'))) providerId.value = params.get('resolver')
  const typeAliases = { TXT: '16', AAAA: '28', IP4P: '28', SRV: '33' }
  const declaredType = params.get('type')
  const normalizedType = DEFAULT_TYPES.includes(declaredType) ? declaredType : typeAliases[declaredType?.toUpperCase()]
  if (normalizedType) selectedTypes.value = [normalizedType]
  else {
    const types = (params.get('types') || '').split(',').filter((type) => DEFAULT_TYPES.includes(type))
    if (types.length) selectedTypes.value = [...new Set(types)]
    if (declaredType) inputError.value = `不支持的 DoH type 参数：${declaredType}`
  }
  passthroughParams = new URLSearchParams()
  for (const key of DOH_PASSTHROUGH_PARAMS) {
    if (params.has(key)) passthroughParams.set(key, params.get(key))
  }
  if (['http', 'https'].includes(params.get('scheme'))) scheme.value = params.get('scheme')
  return Boolean(normalizedType)
}
function loadSettings() {
  if (typeof window === 'undefined') return
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return
    const saved = JSON.parse(raw)
    if (!saved || saved.version !== SETTINGS_VERSION || typeof saved.settings !== 'object') throw new Error('设置结构不兼容')
    const settings = saved.settings
    if (PROVIDERS.some(({ id }) => id === settings.providerId)) providerId.value = settings.providerId
    const types = Array.isArray(settings.selectedTypes) ? settings.selectedTypes.filter((type) => DEFAULT_TYPES.includes(type)) : []
    if (types.length) selectedTypes.value = [...new Set(types)]
    if (settings.scheme === 'http' || settings.scheme === 'https') scheme.value = settings.scheme
    if (TIMEOUTS.some(({ value }) => value === settings.timeoutMs)) timeoutMs.value = settings.timeoutMs
    if (settings.strategy === 'parallel' || settings.strategy === 'sequential') strategy.value = settings.strategy
  } catch {
    storageNotice.value = '已忽略无法读取的旧设置，并恢复默认值。'
    try { window.localStorage.removeItem(STORAGE_KEY) } catch {}
  }
}
function saveSettings() {
  if (typeof window === 'undefined' || !settingsReady) return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
      version: SETTINGS_VERSION,
      settings: {
        providerId: providerId.value,
        selectedTypes: [...selectedTypes.value],
        scheme: scheme.value,
        timeoutMs: timeoutMs.value,
        strategy: strategy.value,
      },
    }))
    storageNotice.value = ''
  } catch {
    storageNotice.value = '浏览器存储不可用，本次设置不会被记住。'
  }
}
async function copyText(text, id) {
  try { await navigator.clipboard.writeText(text) }
  catch {
    const field = document.createElement('textarea'); field.value = text; field.style.position = 'fixed'; field.style.opacity = '0'; document.body.appendChild(field); field.select(); document.execCommand('copy'); field.remove()
  }
  copiedId.value = id
  window.clearTimeout(copyTimer)
  copyTimer = window.setTimeout(() => { copiedId.value = '' }, 1600)
}
const copyOne = (item) => copyText(item.url, item.url)
function copyQueryLink(item) {
  if (typeof window === 'undefined') return
  const typeNames = { TXT: 'TXT', IP4P: 'AAAA', SRV: 'SRV' }
  const url = new URL(window.location.href)
  url.searchParams.set('name', name.value.trim())
  url.searchParams.set('type', typeNames[item.type])
  url.searchParams.set('resolver', providerId.value)
  url.searchParams.set('scheme', scheme.value)
  url.searchParams.delete('types')
  copyText(url.toString(), `query-${item.type}`)
}
function openResult(url) { window.open(url, '_blank', 'noopener,noreferrer') }
function clearAll() { cancelRequests(); sequence += 1; name.value = ''; results.value = []; loading.value = false; inputError.value = ''; statusMessage.value = ''; statusTone.value = 'neutral' }

watch(name, scheduleQuery)
watch([providerId, selectedTypes, timeoutMs, strategy], () => {
  saveSettings()
  scheduleQuery()
}, { deep: true })
watch(scheme, () => {
  results.value = results.value.map((item) => ({ ...item, url: `${scheme.value}://${item.target}:${item.port}` }))
  saveSettings()
  scheduleQuery()
})
onMounted(async () => {
  loadSettings()
  const redirectUnique = readState()
  await nextTick()
  initializingUrlState = false
  settingsReady = true
  if (name.value && !inputError.value) updateResults({ redirectUnique })
})
onUnmounted(() => { cancelRequests(); if (typeof window !== 'undefined') { window.clearTimeout(autoTimer); window.clearTimeout(copyTimer) } })
</script>

<style scoped>
.dns-app,.dns-card,.dns-form,.dns-field,.dns-group,.dns-list,.dns-result-main {
  display:flex;
  flex-direction:column
}

.dns-app {
  gap:18px;
  padding:2px 0 28px
}

.dns-card {
  box-sizing:border-box;
  gap:22px;
  padding:clamp(18px,2.5vw,28px);
  width:100%
}

.dns-settings-card {
  gap:16px;
  padding:18px
}

.dns-settings-card .dns-control {
  font-size:.78rem;
  min-height:40px
}

.dns-head {
  align-items:flex-start;
  display:flex
}

.dns-kicker,.dns-title,.dns-desc,.dns-help,.dns-error,.dns-group-title,.dns-target,.dns-meta,.dns-empty p {
  margin:0
}

.dns-kicker {
  color:var(--vp-custom-text-3);
  font-size:.71rem;
  font-weight:720
}

.dns-title {
  color:var(--vp-custom-text-1);
  font-size:1.14rem;
  font-weight:750;
  line-height:1.35;
  margin-top:2px
}

.dns-desc {
  color:var(--vp-custom-text-2);
  font-size:.83rem;
  line-height:1.65;
  margin-top:5px
}

.dns-label,.dns-field>span {
  color:var(--vp-custom-text-2);
  font-size:.78rem;
  font-weight:680;
  margin-bottom:7px
}

.dns-control {
  box-sizing:border-box;
  padding:0 12px;
  width:100%
}

.dns-help {
  color:var(--vp-custom-text-3);
  font-size:.74rem;
  line-height:1.55;
  margin-top:7px
}

.dns-error {
  color:var(--vp-c-red-text);
  font-size:.78rem;
  margin-top:8px
}

.dns-storage-notice {
  color:var(--vp-c-yellow-text);
  font-size:.72rem;
  line-height:1.5;
  margin:7px 0 0
}

.dns-actions {
  display:flex;
  flex-wrap:wrap;
  gap:9px;
  margin-top:18px
}

.dns-actions button {
  min-width:112px
}

.dns-group {
  border-top:1px solid var(--vp-custom-glass-border);
  gap:9px;
  padding-top:12px
}

.dns-group-title {
  color:var(--vp-custom-text-1);
  font-size:.9rem;
  font-weight:720
}

.dns-grid {
  display:grid;
  gap:8px
}

.dns-grid-three {
  grid-template-columns:repeat(3,minmax(0,1fr))
}

.dns-grid-four {
  grid-template-columns:repeat(4,minmax(0,1fr))
}

.dns-fieldset {
  border-bottom:0;
  border-left:0;
  border-right:0;
  margin:0;
  min-width:0
}

.dns-fieldset legend {
  padding:0
}

.dns-choice {
  border:1px solid var(--vp-custom-glass-border);
  border-radius:11px;
  background:var(--vp-custom-glass-strong);
  box-shadow:inset 0 1px 0 var(--vp-custom-highlight)
}

.dns-choice {
  align-items:flex-start;
  cursor:pointer;
  display:flex;
  gap:8px;
  min-height:52px;
  padding:9px
}

.dns-choice input {
  accent-color:var(--vp-custom-accent);
  flex:0 0 auto
}

.dns-choice span {
  display:flex;
  flex-direction:column;
  gap:3px
}

.dns-choice strong {
  color:var(--vp-custom-text-1);
  font-size:.8rem
}

.dns-choice small {
  color:var(--vp-custom-text-3);
  font-size:.69rem;
  line-height:1.45
}

.dns-choice:focus-within {
  outline:2px solid var(--vp-custom-accent);
  outline-offset:2px
}

.dns-status {
  align-items:center;
  display:flex;
  font-size:.81rem;
  gap:9px
}

.dns-warning {
  border-color:var(--vp-c-yellow-bg);
  color:var(--vp-c-yellow-text);
  background:var(--vp-c-yellow-soft)
}

.dns-spinner {
  border:2px solid color-mix(in srgb,var(--vp-custom-accent) 24%,transparent);
  border-radius:50%;
  border-top-color:var(--vp-custom-accent);
  height:16px;
  width:16px;
  animation:dns-spin .7s linear infinite
}

.dns-result {
  border:1px solid var(--vp-custom-glass-border);
  border-radius:13px;
  padding:14px
}

.dns-list {
  gap:12px
}

.dns-result {
  display:flex;
  flex-direction:column;
  gap:14px
}

.dns-badge {
  align-self:flex-start;
  border:1px solid color-mix(in srgb,var(--vp-custom-accent) 30%,var(--vp-custom-glass-border));
  border-radius:6px;
  color:var(--vp-custom-accent);
  font:720 .71rem var(--vp-font-family-mono);
  padding:4px 7px
}

.dns-target {
  color:var(--vp-custom-text-1);
  font-size:.94rem;
  font-weight:720;
  margin-top:8px;
  overflow-wrap:anywhere
}

.dns-meta {
  color:var(--vp-custom-text-3);
  font-size:.75rem;
  margin-top:3px
}

.dns-result code {
  border:1px solid var(--vp-custom-glass-border);
  border-radius:8px;
  color:var(--vp-custom-text-2);
  font-size:.76rem;
  margin-top:11px;
  overflow-wrap:anywhere;
  padding:9px 10px;
  white-space:normal;
  background:var(--vp-custom-glass-strong)
}

.dns-result-actions {
  border-top:1px solid var(--vp-custom-glass-border);
  padding-top:13px
}

.dns-empty {
  align-items:center;
  border:1px dashed var(--vp-custom-glass-border);
  border-radius:13px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  min-height:145px;
  padding:20px;
  text-align:center
}

.dns-empty strong {
  color:var(--vp-custom-text-2);
  font-size:.88rem
}

.dns-empty p {
  color:var(--vp-custom-text-3);
  font-size:.76rem;
  margin-top:5px
}

@keyframes dns-spin {
  to {
    transform:rotate(360deg)
  }

}

@media(max-width:720px) {
  .dns-grid-three,.dns-grid-four {
    grid-template-columns:1fr
  }

}

@media(max-width:520px) {
  .dns-actions {
    flex-direction:column
  }

  .dns-actions button {
    width:100%
  }

}

@media(prefers-reduced-motion:reduce) {
  .dns-spinner {
    animation-duration:1.5s
  }

}
</style>
