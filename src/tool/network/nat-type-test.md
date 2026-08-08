---
routeMeta:
  itemTitle: NAT Type Test
  itemDesc: WebRTC NAT 与公网端点检测
  itemIcon: https://natchecker.com/icon.svg
---
# NAT 类型检测
<section class="vp-custom-surface nat-app" aria-label="NAT 类型与公网端点检测工具">
  <form class="vp-custom-glass-card nat-config" :aria-busy="testing" @submit.prevent="startTest">
    <div class="nat-section-head">
      <div>
        <p class="nat-section-kicker">检测设置</p>
        <p id="nat-config-title" class="nat-section-title">选择首选 STUN 节点</p>
      </div>
      <span class="nat-privacy-note">映射检测会搭配两个辅助节点</span>
    </div>
    <div class="nat-fields">
      <label class="nat-field" for="nat-server-mode">
        <span>首选节点</span>
        <select
          id="nat-server-mode"
          v-model="selectedMode"
          class="vp-custom-control nat-select"
          :disabled="testing"
          aria-describedby="nat-server-help"
          @change="clearNotice"
        >
          <option v-for="option in serverOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
        </select>
      </label>
      <label v-if="selectedMode === 'custom'" class="nat-field" for="nat-custom-server">
        <span>自定义 STUN 地址</span>
        <input
          id="nat-custom-server"
          v-model="customServer"
          class="vp-custom-control nat-input"
          type="text"
          inputmode="url"
          autocomplete="off"
          spellcheck="false"
          placeholder="stun:example.com:3478"
          :disabled="testing"
          :aria-invalid="notice.tone === 'error' ? 'true' : 'false'"
          @input="clearNotice"
        >
      </label>
    </div>
    <p id="nat-server-help" class="nat-field-help">同一 ICE 会话会同时访问三个节点判断映射是否随目标变化，并用独立会话验证节点可达性；自定义地址仅支持 <code>stun:主机:端口</code>。</p>
    <div class="nat-actions">
      <button class="vp-custom-button vp-custom-button-primary nat-primary-action" type="submit" :disabled="testing">
        <span class="nat-button-icon" aria-hidden="true">{{ testing ? '◌' : '▶' }}</span>
        {{ testing ? `检测中 ${completedCount}/${totalCount}` : '开始检测' }}
      </button>
      <button v-if="testing" class="vp-custom-button vp-custom-button-secondary" type="button" @click="stopTest">停止检测</button>
      <button v-else class="vp-custom-button vp-custom-button-secondary" type="button" :disabled="!canReset" @click="resetTest">重置结果</button>
    </div>
    <div v-if="testing" class="nat-progress" role="progressbar" aria-label="检测进度" :aria-valuenow="progressPercent" aria-valuemin="0" aria-valuemax="100">
      <span :style="{ width: `${progressPercent}%` }"></span>
    </div>
    <p
      v-if="notice.text"
      class="nat-notice"
      :class="`nat-notice-${notice.tone}`"
      :role="notice.tone === 'error' ? 'alert' : 'status'"
    >{{ notice.text }}</p>
  </form>
  <section class="nat-summary-grid" aria-live="polite" :aria-busy="testing">
    <article class="vp-custom-glass-card nat-overall" :class="`nat-tone-${overall.tone}`">
      <div class="nat-overall-mark" aria-hidden="true"><span></span></div>
      <div>
        <p class="nat-section-kicker">当前结论</p>
        <p class="nat-overall-title">{{ overall.title }}</p>
        <p class="nat-overall-desc">{{ overall.description }}</p>
      </div>
    </article>
    <article class="vp-custom-glass-card vp-custom-glass-muted nat-metric">
      <span>STUN 节点</span>
      <strong>{{ serverSummary }}</strong>
    </article>
    <article class="vp-custom-glass-card vp-custom-glass-muted nat-metric">
      <span>唯一候选</span>
      <strong>{{ candidateSummary }}</strong>
    </article>
    <article class="vp-custom-glass-card vp-custom-glass-muted nat-metric">
      <span>检测耗时</span>
      <strong>{{ durationSummary }}</strong>
    </article>
  </section>
  <section class="nat-result-grid" aria-label="IPv4 与 IPv6 检测结果">
    <article v-for="result in familyResults" :key="result.family" class="vp-custom-glass-card nat-result-card" :class="`nat-tone-${result.tone}`">
      <div class="nat-result-head">
        <div class="nat-family-label">
          <span class="nat-status-dot" aria-hidden="true"></span>
          <div>
            <p class="nat-section-kicker">{{ result.family }} 网络</p>
            <p class="nat-result-title">{{ result.title }}</p>
          </div>
        </div>
        <span class="nat-state-badge">{{ result.badge }}</span>
      </div>
      <p class="nat-result-desc">{{ result.description }}</p>
      <dl class="nat-detail-list">
        <div>
          <dt>公网地址</dt>
          <dd class="nat-mono">{{ result.address }}</dd>
        </div>
        <div>
          <dt>观测端口</dt>
          <dd class="nat-mono">{{ result.port }}</dd>
        </div>
        <div>
          <dt>节点观测</dt>
          <dd>{{ result.reachability }}</dd>
        </div>
        <div>
          <dt>NAT 判断</dt>
          <dd>{{ result.nat }}</dd>
        </div>
        <div>
          <dt>映射行为</dt>
          <dd>{{ result.mapping }}</dd>
        </div>
        <div>
          <dt>过滤行为</dt>
          <dd>{{ result.filtering }}</dd>
        </div>
      </dl>
      <ul v-if="result.notes.length" class="nat-result-notes">
        <li v-for="note in result.notes" :key="note">{{ note }}</li>
      </ul>
    </article>
  </section>
  <section v-if="probeRows.length" class="vp-custom-glass-card nat-nodes" aria-labelledby="nat-node-title">
    <div class="nat-section-head">
      <div>
        <p class="nat-section-kicker">节点明细</p>
        <p id="nat-node-title" class="nat-section-title">映射证据与节点采样</p>
      </div>
      <span class="nat-privacy-note">只有同一 ICE 会话的端口才参与 NAT 分型</span>
    </div>
    <div class="nat-mapping-strip" :class="`nat-tone-${mappingSummary.tone}`">
      <div>
        <span>同一 ICE 会话映射</span>
        <strong>{{ mappingSummary.title }}</strong>
      </div>
      <p>{{ mappingSummary.description }}</p>
    </div>
    <div class="nat-node-list">
      <article v-for="node in probeRows" :key="node.id" class="nat-node-row" :class="`nat-node-${node.tone}`">
        <div class="nat-node-main">
          <div>
            <strong>{{ node.name }}</strong>
            <span class="nat-node-url">{{ node.url }}</span>
          </div>
          <span class="nat-node-state">{{ node.status }}</span>
        </div>
        <div class="nat-node-meta">
          <span>{{ node.candidateText }}</span>
          <span>{{ node.duration }}</span>
        </div>
        <p v-if="node.endpoint" class="nat-node-endpoint nat-mono">{{ node.endpoint }}</p>
        <p v-if="node.detail" class="nat-node-detail">{{ node.detail }}</p>
      </article>
    </div>
  </section>
  <section class="nat-capability-grid" aria-label="检测能力说明">
    <article class="vp-custom-glass-card nat-capability-card nat-can-card">
      <div class="nat-capability-icon" aria-hidden="true">✓</div>
      <div>
        <p class="nat-section-title">本页可以确认</p>
        <ul>
          <li>公网直连、锥形 NAT、对称 NAT 或 UDP/STUN 受限</li>
          <li>同一 ICE 基址的公网映射是否随 STUN 目标变化</li>
          <li>公网 IP、端口样本与 IPv4 / IPv6 候选</li>
        </ul>
      </div>
    </article>
    <article class="vp-custom-glass-card nat-capability-card nat-cannot-card">
      <div class="nat-capability-icon" aria-hidden="true">!</div>
      <div>
        <p class="nat-section-title">浏览器无法可靠确认</p>
        <ul>
          <li>全锥、地址受限锥与端口受限锥的细分</li>
          <li>地址相关、地址和端口相关等过滤行为</li>
          <li>任意业务端口的真实入站开放状态</li>
        </ul>
      </div>
    </article>
  </section>
  <details class="vp-custom-glass-card nat-log-card">
    <summary>
      <span>检测日志</span>
      <span>{{ logs.length ? `${logs.length} 条` : '暂无记录' }}</span>
    </summary>
    <div class="nat-log-content">
      <div class="nat-log-toolbar">
        <p>日志只显示节点状态，不记录本地主机候选明文。</p>
        <button class="vp-custom-button vp-custom-button-quiet" type="button" :disabled="!logs.length" @click="clearLogs">清空日志</button>
      </div>
      <div class="nat-log-box" role="log" aria-live="polite">
        <p v-if="!logs.length" class="nat-log-empty">开始检测后，这里会显示各节点的进度与错误信息。</p>
        <p v-for="entry in logs" :key="entry.id" class="nat-log-line" :class="`nat-log-${entry.level}`">
          <time>{{ entry.time }}</time>
          <span>{{ entry.message }}</span>
        </p>
      </div>
    </div>
  </details>
</section>

<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'

const TEST_TIMEOUT_MS = 8000
const MAX_LOG_ITEMS = 120
const AUTO_SERVERS = [
  { id: 'qq', name: '腾讯 STUN', url: 'stun:stun.qq.com:3478' },
  { id: 'cloudflare', name: 'Cloudflare STUN', url: 'stun:stun.cloudflare.com:3478' },
  { id: 'google', name: 'Google STUN', url: 'stun:stun.l.google.com:19302' },
]
const PRESET_SERVERS = [
  ...AUTO_SERVERS,
  { id: 'syncthing', name: 'Syncthing STUN', url: 'stun:stun.syncthing.net:3478' },
  { id: 'miwifi', name: '小米 STUN', url: 'stun:stun.miwifi.com:3478' },
]
const serverOptions = [
  { value: 'auto', label: '自动交叉检测（推荐）' },
  ...PRESET_SERVERS.map((server) => ({ value: server.id, label: `${server.name} · ${server.url.replace('stun:', '')}` })),
  { value: 'custom', label: '自定义 STUN 节点' },
]

const makeOverall = (tone = 'neutral', title = '等待检测', description = '开始后将测试公网端点、映射变化、UDP/STUN 可达性与 IPv6 候选。') => ({ tone, title, description })
const makeMappingSummary = (tone = 'neutral', title = '等待检测', description = '开始后会在同一个 ICE 会话内比较多个 STUN 目标返回的映射端点。') => ({ tone, title, description })
const makeFamilyResult = (family, state = 'idle') => {
  const running = state === 'running'
  return {
    family,
    tone: running ? 'accent' : 'neutral',
    title: running ? '正在收集 ICE 候选' : '等待检测',
    badge: running ? '检测中' : '未开始',
    description: running ? '正在建立独立 WebRTC 会话，请稍候。' : `尚未获取 ${family} 网络信息。`,
    address: '—',
    port: '—',
    reachability: running ? '正在测试节点' : '等待检测',
    nat: '尚未判断',
    mapping: '尚未检测',
    filtering: '尚未检测',
    notes: [],
  }
}

const selectedMode = ref('auto')
const customServer = ref('')
const testing = ref(false)
const hasRun = ref(false)
const completedCount = ref(0)
const totalCount = ref(0)
const elapsedMs = ref(0)
const uniqueCandidateCount = ref(0)
const overall = ref(makeOverall())
const mappingSummary = ref(makeMappingSummary())
const resultIPv4 = ref(makeFamilyResult('IPv4'))
const resultIPv6 = ref(makeFamilyResult('IPv6'))
const probeRows = ref([])
const logs = ref([])
const notice = ref({ tone: 'info', text: '' })
const activeSessions = new Set()
let currentRun = 0
let logSequence = 0

const familyResults = computed(() => [resultIPv4.value, resultIPv6.value])
const progressPercent = computed(() => totalCount.value ? Math.round((completedCount.value / totalCount.value) * 100) : 0)
const canReset = computed(() => hasRun.value || logs.value.length > 0 || Boolean(notice.value.text))
const serverSummary = computed(() => {
  if (!probeRows.value.length) return '未开始'
  if (testing.value) return `${completedCount.value}/${totalCount.value} 完成`
  const responded = probeRows.value.filter((row) => row.hasReflexive).length
  return `${responded}/${probeRows.value.length} 返回端点`
})
const candidateSummary = computed(() => testing.value && !uniqueCandidateCount.value ? '收集中' : `${uniqueCandidateCount.value} 个`)
const durationSummary = computed(() => {
  if (testing.value) return '计时中'
  if (!elapsedMs.value) return '—'
  return elapsedMs.value >= 1000 ? `${(elapsedMs.value / 1000).toFixed(1)} 秒` : `${elapsedMs.value} 毫秒`
})

function addLog(message, level = 'info') {
  const now = new Date()
  logs.value.push({
    id: ++logSequence,
    time: now.toLocaleTimeString('zh-CN', { hour12: false }),
    level,
    message,
  })
  if (logs.value.length > MAX_LOG_ITEMS) logs.value.splice(0, logs.value.length - MAX_LOG_ITEMS)
}

function clearLogs() {
  logs.value = []
}

function clearNotice() {
  notice.value = { tone: 'info', text: '' }
}

function normalizeStunUrl(value) {
  const trimmed = value.trim()
  if (!trimmed) throw new Error('请输入 STUN 节点地址。')
  const normalized = /^stun:/i.test(trimmed) ? trimmed : `stun:${trimmed}`
  if (/\s/.test(normalized)) throw new Error('STUN 地址中不能包含空格。')
  const match = normalized.match(/^stun:(?:\/\/)?(\[[0-9a-f:.]+\]|[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?)(?::(\d{1,5}))?$/i)
  if (!match) throw new Error('地址格式无效，请使用 stun:主机:端口。')
  const port = match[2] ? Number(match[2]) : 3478
  if (port < 1 || port > 65535) throw new Error('STUN 端口必须在 1 到 65535 之间。')
  return `stun:${match[1]}:${port}`
}

function getServersForRun() {
  if (selectedMode.value === 'auto') return AUTO_SERVERS.map((server) => ({ ...server }))
  let primary
  if (selectedMode.value === 'custom') {
    const url = normalizeStunUrl(customServer.value)
    primary = { id: 'custom', name: '自定义 STUN', url }
  } else {
    const preset = PRESET_SERVERS.find((server) => server.id === selectedMode.value)
    if (!preset) throw new Error('所选 STUN 节点不存在，请重新选择。')
    primary = { ...preset }
  }
  const seen = new Set()
  return [primary, ...AUTO_SERVERS]
    .filter((server) => {
      const key = server.url.toLowerCase()
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
    .slice(0, 3)
}

function getAddressFamily(address) {
  const value = String(address || '').replace(/^\[|\]$/g, '').split('%')[0]
  if (/^(?:\d{1,3}\.){3}\d{1,3}$/.test(value)) return 'ipv4'
  if (value.includes(':')) return 'ipv6'
  return 'unknown'
}

function isPublicIPv4(address) {
  const parts = String(address || '').split('.').map(Number)
  if (parts.length !== 4 || parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255)) return false
  const [a, b, c] = parts
  if (a === 0 || a === 10 || a === 127 || a >= 224) return false
  if (a === 100 && b >= 64 && b <= 127) return false
  if (a === 169 && b === 254) return false
  if (a === 172 && b >= 16 && b <= 31) return false
  if (a === 192 && b === 168) return false
  if (a === 192 && b === 0 && (c === 0 || c === 2)) return false
  if (a === 198 && (b === 18 || b === 19 || (b === 51 && c === 100))) return false
  if (a === 203 && b === 0 && c === 113) return false
  return true
}

function isLocalIPv4(address) {
  const parts = String(address || '').split('.').map(Number)
  if (parts.length !== 4 || parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255)) return false
  const [a, b] = parts
  return a === 10
    || (a === 100 && b >= 64 && b <= 127)
    || (a === 169 && b === 254)
    || (a === 172 && b >= 16 && b <= 31)
    || (a === 192 && b === 168)
}

function isGlobalIPv6(address) {
  const value = String(address || '').toLowerCase().replace(/^\[|\]$/g, '').split('%')[0]
  if (!value.includes(':') || value === '::' || value === '::1' || value.startsWith('::ffff:')) return false
  if (/^f[cd]/.test(value) || /^f[efab]/.test(value) || value.startsWith('ff')) return false
  if (value.startsWith('2001:db8:')) return false
  const first = Number.parseInt(value.split(':')[0], 16)
  return Number.isFinite(first) && first >= 0x2000 && first <= 0x3fff
}

function parseCandidate(candidate, servers, eventUrl = '') {
  const raw = String(candidate?.candidate || '')
  const parts = raw.trim().split(/\s+/)
  const findValue = (key) => {
    const index = parts.indexOf(key)
    return index >= 0 ? parts[index + 1] || '' : ''
  }
  const address = String(candidate?.address || parts[4] || '').replace(/^\[|\]$/g, '')
  const portValue = candidate?.port ?? parts[5]
  const relatedAddress = String(candidate?.relatedAddress || findValue('raddr') || '').replace(/^\[|\]$/g, '')
  const serverUrl = String(candidate?.url || eventUrl || '')
  const server = servers.find((item) => item.url.toLowerCase() === serverUrl.toLowerCase())
  return {
    serverId: server?.id || 'unknown',
    serverName: server?.name || '未知 STUN 节点',
    serverUrl,
    foundation: String(candidate?.foundation || parts[0]?.replace(/^candidate:/, '') || ''),
    component: Number(candidate?.component === 'rtcp' ? 2 : candidate?.component === 'rtp' ? 1 : parts[1]) || 1,
    type: String(candidate?.type || findValue('typ') || 'unknown').toLowerCase(),
    protocol: String(candidate?.protocol || parts[2] || 'unknown').toLowerCase(),
    address,
    port: Number.isFinite(Number(portValue)) ? Number(portValue) : null,
    relatedAddress,
    relatedPort: Number.isFinite(Number(candidate?.relatedPort ?? findValue('rport'))) ? Number(candidate?.relatedPort ?? findValue('rport')) : null,
    family: getAddressFamily(address),
  }
}

function candidateKey(candidate, includeServer = false) {
  return [includeServer ? candidate.serverUrl || candidate.serverId : '', candidate.type, candidate.protocol, candidate.family, candidate.address, candidate.port || '', candidate.relatedAddress, candidate.relatedPort || ''].join('|')
}

function uniqueCandidates(candidates, includeServer = false) {
  const seen = new Set()
  return candidates.filter((candidate) => {
    const key = candidateKey(candidate, includeServer)
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function uniqueValues(values) {
  return [...new Set(values.filter((value) => value !== '' && value !== null && value !== undefined))]
}

function summarizeValues(values, limit = 2) {
  const unique = uniqueValues(values)
  if (!unique.length) return '—'
  if (unique.length <= limit) return unique.join('、')
  return `${unique.slice(0, limit).join('、')} 等 ${unique.length} 项`
}

function formatEndpoint(candidate) {
  if (!candidate.address) return ''
  const address = candidate.family === 'ipv6' ? `[${candidate.address}]` : candidate.address
  return candidate.port ? `${address}:${candidate.port}/${candidate.protocol.toUpperCase()}` : address
}

function gatherCandidates(servers, sessionName) {
  return new Promise((resolve) => {
    let pc
    let timer
    let settled = false
    const candidates = []
    const iceErrors = []
    const startedAt = typeof performance !== 'undefined' ? performance.now() : Date.now()
    const finish = (state, errorText = '') => {
      if (settled) return
      settled = true
      if (timer) window.clearTimeout(timer)
      if (pc) {
        pc.onicecandidate = null
        pc.onicegatheringstatechange = null
        pc.onicecandidateerror = null
        pc.close()
      }
      activeSessions.delete(session)
      const finishedAt = typeof performance !== 'undefined' ? performance.now() : Date.now()
      resolve({
        servers,
        sessionName,
        state,
        candidates: uniqueCandidates(candidates, true),
        iceErrors,
        errorText,
        durationMs: Math.max(0, Math.round(finishedAt - startedAt)),
      })
    }
    const session = { cancel: () => finish('cancelled', '检测已停止') }
    activeSessions.add(session)
    try {
      pc = new window.RTCPeerConnection({
        iceServers: servers.map((server) => ({ urls: [server.url] })),
        iceTransportPolicy: 'all',
        bundlePolicy: 'max-bundle',
      })
      pc.onicecandidate = (event) => {
        if (event.candidate) candidates.push(parseCandidate(event.candidate, servers, event.url))
        else finish('complete')
      }
      pc.onicegatheringstatechange = () => {
        if (pc.iceGatheringState === 'complete') finish('complete')
      }
      pc.onicecandidateerror = (event) => {
        const code = Number(event.errorCode) || 0
        const text = String(event.errorText || 'ICE 节点请求失败')
        const url = String(event.url || '')
        if (!iceErrors.some((item) => item.code === code && item.text === text && item.url === url)) iceErrors.push({ code, text, url })
      }
      pc.createDataChannel('nat-probe', { ordered: false, maxRetransmits: 0 })
      timer = window.setTimeout(() => finish('timeout', candidates.length ? '候选收集未在时限内结束' : '候选收集超时'), TEST_TIMEOUT_MS)
      Promise.resolve()
        .then(() => pc.createOffer())
        .then((offer) => pc.setLocalDescription(offer))
        .catch((error) => finish('error', error instanceof Error ? error.message : '无法创建 WebRTC 检测会话'))
    } catch (error) {
      finish('error', error instanceof Error ? error.message : '无法初始化 WebRTC')
    }
  })
}

function makeWaitingNode(server) {
  return {
    id: server.id,
    name: server.name,
    url: server.url,
    status: '等待响应',
    tone: 'running',
    candidateText: '正在收集候选',
    duration: '计时中',
    endpoint: '',
    detail: '',
    hasReflexive: false,
  }
}

function makeProbeRow(probe) {
  const server = probe.servers[0]
  const reflexive = probe.candidates.filter((candidate) => candidate.type === 'srflx')
  const endpoints = uniqueValues(reflexive.map(formatEndpoint))
  let status = '未返回公网端点'
  let tone = 'warning'
  if (reflexive.length) {
    status = '已返回公网端点'
    tone = 'success'
  } else if (probe.state === 'cancelled') {
    status = '已停止'
    tone = 'neutral'
  } else if (probe.state === 'error') {
    status = '会话失败'
    tone = 'error'
  } else if (probe.state === 'timeout') {
    status = '收集超时'
    tone = 'warning'
  }
  const errorDetails = probe.iceErrors.map((item) => item.code ? `ICE ${item.code}: ${item.text}` : item.text)
  const details = uniqueValues([probe.errorText, ...errorDetails])
  return {
    id: server.id,
    name: server.name,
    url: server.url,
    status,
    tone,
    candidateText: `${probe.candidates.length} 个候选`,
    duration: probe.durationMs >= 1000 ? `${(probe.durationMs / 1000).toFixed(1)} 秒` : `${probe.durationMs} 毫秒`,
    endpoint: endpoints.length ? summarizeValues(endpoints, 3) : '',
    detail: details.length ? details.join('；') : reflexive.length ? '节点已返回服务器反射候选。' : '只发现本地候选，不能据此断言 UDP 被封锁。',
    hasReflexive: reflexive.length > 0,
  }
}

function getMappingEvidence(mappingProbe, family = 'ipv4') {
  const candidates = mappingProbe.candidates.filter((candidate) => candidate.family === family && candidate.type === 'srflx')
  const endpoints = uniqueValues(candidates.map((candidate) => `${candidate.address}:${candidate.port || ''}`))
  const serverUrls = uniqueValues(candidates.map((candidate) => candidate.serverUrl))
  const baseGroups = new Map()
  for (const candidate of candidates) {
    if (!candidate.relatedPort || candidate.relatedPort <= 0) continue
    const relatedAddress = candidate.relatedAddress && !['0.0.0.0', '::'].includes(candidate.relatedAddress) ? candidate.relatedAddress : '*'
    const key = [candidate.family, candidate.protocol, candidate.component, relatedAddress, candidate.relatedPort].join('|')
    if (!baseGroups.has(key)) baseGroups.set(key, { reliable: relatedAddress !== '*', candidates: [] })
    baseGroups.get(key).candidates.push(candidate)
  }
  const changedBase = [...baseGroups.values()].find((group) => {
    const groupEndpoints = uniqueValues(group.candidates.map((candidate) => `${candidate.address}:${candidate.port || ''}`))
    const groupServers = uniqueValues(group.candidates.map((candidate) => candidate.serverUrl))
    return groupEndpoints.length > 1 && groupServers.length > 1
  })
  if (changedBase) {
    const changedEndpoints = uniqueValues(changedBase.candidates.map((candidate) => `${candidate.address}:${candidate.port || ''}`))
    return {
      kind: 'dependent',
      confidence: changedBase.reliable ? 'confirmed' : 'likely',
      tone: changedBase.reliable ? 'error' : 'warning',
      title: changedBase.reliable ? '映射随目标变化' : '疑似映射随目标变化',
      description: changedBase.reliable
        ? `同一 ICE 基址访问不同 STUN 目标时产生了 ${changedEndpoints.length} 个公网端点。`
        : `相同关联端口产生了 ${changedEndpoints.length} 个公网端点，但浏览器隐藏了关联地址。`,
      candidates,
      endpoints,
      serverUrls,
    }
  }
  if (endpoints.length > 1 && (serverUrls.length > 1 || candidates.length > 1)) {
    return {
      kind: 'dependent',
      confidence: 'likely',
      tone: 'warning',
      title: '疑似映射随目标变化',
      description: `同一 ICE 会话出现 ${endpoints.length} 个公网端点，但浏览器隐藏了候选基址，无法排除多网卡影响。`,
      candidates,
      endpoints,
      serverUrls,
    }
  }
  if (endpoints.length === 1) {
    return {
      kind: 'independent',
      confidence: 'inferred',
      tone: 'success',
      title: '映射未随目标变化',
      description: '多 STUN 的同一 ICE 会话只保留了一个公网端点，未发现端点相关映射特征。',
      candidates,
      endpoints,
      serverUrls,
    }
  }
  return {
    kind: 'unavailable',
    confidence: 'none',
    tone: 'neutral',
    title: '没有可比较的映射',
    description: '映射会话未获得 IPv4 服务器反射候选，无法比较不同 STUN 目标。',
    candidates,
    endpoints,
    serverUrls,
  }
}

function analyzeIPv4(mappingProbe, nodeProbes, mappingEvidence) {
  const probes = [mappingProbe, ...nodeProbes]
  const candidates = probes.flatMap((probe) => probe.candidates)
  const mappingCandidates = mappingEvidence.candidates
  const srflx = candidates.filter((candidate) => candidate.family === 'ipv4' && candidate.type === 'srflx')
  const hosts = candidates.filter((candidate) => candidate.family === 'ipv4' && candidate.type === 'host')
  const publicHosts = hosts.filter((candidate) => isPublicIPv4(candidate.address))
  const localHosts = hosts.filter((candidate) => isLocalIPv4(candidate.address))
  const hiddenHosts = candidates.filter((candidate) => candidate.type === 'host' && candidate.family === 'unknown')
  const publicCandidates = mappingCandidates.length ? mappingCandidates : srflx
  const reflectedAddresses = uniqueValues(publicCandidates.map((candidate) => candidate.address))
  const respondingServers = nodeProbes.filter((probe) => probe.candidates.some((candidate) => candidate.family === 'ipv4' && candidate.type === 'srflx')).length
  const unreachableServers = nodeProbes.filter((probe) => probe.iceErrors.some((item) => item.code === 701)).length
  const directMatch = srflx.some((candidate) => publicHosts.some((host) => host.address === candidate.address && host.port === candidate.port))
    || srflx.some((candidate) => isPublicIPv4(candidate.relatedAddress) && candidate.relatedAddress === candidate.address && candidate.relatedPort === candidate.port)
  const notes = []
  if (hiddenHosts.length) notes.push('浏览器隐藏了部分主机候选地址，基址相关结论会降低置信度。')
  if (directMatch) {
    return {
      family: 'IPv4',
      tone: 'success',
      title: '开放互联网（NAT0）',
      badge: 'NAT0',
      description: '公网主机候选与服务器反射端点一致，未发现 IPv4 地址转换。',
      address: summarizeValues(reflectedAddresses),
      port: summarizeValues(publicCandidates.map((candidate) => candidate.port)),
      reachability: `${respondingServers}/${nodeProbes.length} 个节点返回 IPv4 端点`,
      nat: '开放互联网 / 无 NAT',
      mapping: 'Direct',
      filtering: '防火墙行为未测试',
      notes,
    }
  }
  if (mappingEvidence.kind === 'dependent') {
    const confirmed = mappingEvidence.confidence === 'confirmed'
    notes.push(confirmed
      ? '同一 related address / port 的映射随 STUN 目标变化。'
      : '多个公网端点来自同一 ICE 会话，但浏览器未暴露可靠基址。')
    return {
      family: 'IPv4',
      tone: confirmed ? 'error' : 'warning',
      title: confirmed ? '对称型 NAT（NAT4）' : '疑似对称型 NAT（NAT4）',
      badge: confirmed ? 'NAT4' : '疑似 NAT4',
      description: confirmed ? '同一本地 ICE 基址对不同 STUN 目标产生不同公网映射。' : '同一 ICE 会话出现多个公网映射，符合对称 NAT 特征，但可能受多网卡影响。',
      address: summarizeValues(reflectedAddresses),
      port: summarizeValues(publicCandidates.map((candidate) => candidate.port)),
      reachability: `${respondingServers}/${nodeProbes.length} 个节点返回 IPv4 端点`,
      nat: confirmed ? '对称型 NAT' : '疑似对称型 NAT',
      mapping: confirmed ? '地址和端口相关' : '疑似端点相关',
      filtering: '未主动测试',
      notes,
    }
  }
  if (srflx.length && mappingEvidence.kind === 'independent') {
    notes.push('WebRTC 没有 CHANGE-REQUEST 能力，因此无法继续区分全锥、地址受限锥和端口受限锥。')
    return {
      family: 'IPv4',
      tone: 'success',
      title: '锥形 NAT（NAT1–NAT3）',
      badge: 'NAT1–NAT3',
      description: '同一 ICE 会话未发现映射随 STUN 目标变化，属于非对称映射。',
      address: summarizeValues(reflectedAddresses),
      port: summarizeValues(publicCandidates.map((candidate) => candidate.port)),
      reachability: `${respondingServers}/${nodeProbes.length} 个节点返回 IPv4 端点`,
      nat: '锥形 / 非对称 NAT',
      mapping: '端点无关（推断）',
      filtering: '无法细分 NAT1 / NAT2 / NAT3',
      notes,
    }
  }
  if (srflx.length) {
    notes.push('已检测到 NAT，但映射会话只有不足的有效节点，无法区分锥形与对称型。')
    return {
      family: 'IPv4',
      tone: 'warning',
      title: '检测到 NAT，类型待确认',
      badge: 'NAT 未细分',
      description: '独立节点返回了公网端点，但同一 ICE 会话没有足够映射证据。',
      address: summarizeValues(srflx.map((candidate) => candidate.address)),
      port: summarizeValues(srflx.map((candidate) => candidate.port)),
      reachability: `${respondingServers}/${nodeProbes.length} 个节点返回 IPv4 端点`,
      nat: '存在 IPv4 NAT',
      mapping: '证据不足',
      filtering: '未测试',
      notes,
    }
  }
  if (publicHosts.length) {
    const udpRestricted = unreachableServers >= 2
    return {
      family: 'IPv4',
      tone: udpRestricted ? 'error' : 'success',
      title: udpRestricted ? '对称 UDP 防火墙' : '开放互联网（NAT0）',
      badge: udpRestricted ? 'UDP 受限' : 'NAT0',
      description: udpRestricted ? '发现公网主机候选，但多个 STUN 节点均不可达，符合无 NAT 且 UDP 受限的特征。' : '发现公网主机候选，且没有产生需要保留的服务器反射映射。',
      address: summarizeValues(publicHosts.map((candidate) => candidate.address)),
      port: summarizeValues(publicHosts.map((candidate) => candidate.port)),
      reachability: `${respondingServers}/${nodeProbes.length} 个节点返回 IPv4 端点`,
      nat: udpRestricted ? '无 NAT / UDP 受限' : '开放互联网 / 无 NAT',
      mapping: 'Direct',
      filtering: udpRestricted ? 'STUN/UDP 无法到达' : '防火墙行为未测试',
      notes: udpRestricted ? ['ICE 701 表示对应 STUN URL 无法从任何主机候选到达。'] : notes,
    }
  }
  if (unreachableServers >= 2 && (localHosts.length || hiddenHosts.length)) {
    return {
      family: 'IPv4',
      tone: 'error',
      title: 'UDP / STUN 受限',
      badge: 'UDP 受限',
      description: '多个独立 STUN 节点均不可达，未能取得公网映射。',
      address: '—',
      port: '—',
      reachability: `0/${nodeProbes.length} 个节点返回 IPv4 端点`,
      nat: '无法分型',
      mapping: '无结果',
      filtering: 'UDP/STUN 可能被阻止',
      notes: ['也可能是 VPN、浏览器策略或当前网络统一拦截了所选 STUN 服务。'],
    }
  }
  const hasLocalEvidence = localHosts.length || hiddenHosts.length
  return {
    family: 'IPv4',
    tone: 'warning',
    title: hasLocalEvidence ? '未获得 IPv4 公网端点' : '未发现 IPv4 候选',
    badge: '无法分型',
    description: hasLocalEvidence ? '只发现本地或被隐藏的主机候选，当前证据不足以判断 NAT 类型。' : '本次 WebRTC 会话没有产生可识别的 IPv4 候选。',
    address: '—',
    port: '—',
    reachability: `0/${nodeProbes.length} 个节点返回 IPv4 端点`,
    nat: '无法判定',
    mapping: '无法判定',
    filtering: '无法判定',
    notes: ['请更换首选节点，或检查 WebRTC 隐私设置、VPN 与网络策略。'],
  }
}

function analyzeIPv6(probes) {
  const candidates = probes.flatMap((probe) => probe.candidates)
  const ipv6 = candidates.filter((candidate) => candidate.family === 'ipv6')
  const global = ipv6.filter((candidate) => isGlobalIPv6(candidate.address))
  const respondingSessions = new Set(global.map((candidate) => candidate.serverId)).size
  if (global.length) {
    const addresses = uniqueValues(global.map((candidate) => candidate.address))
    return {
      family: 'IPv6',
      tone: 'success',
      title: '发现全局 IPv6 候选',
      badge: 'IPv6 可见',
      description: '浏览器拥有可用于 ICE 的全局 IPv6 地址，但这不代表入站端口已经开放。',
      address: summarizeValues(addresses),
      port: summarizeValues(global.map((candidate) => candidate.port)),
      reachability: `${respondingSessions}/${probes.length} 个测试会话发现全局 IPv6`,
      nat: 'IPv6 通常不需要地址转换',
      mapping: '通常不适用',
      filtering: '防火墙行为无法由候选判定',
      notes: addresses.length > 1 ? ['发现多个全局 IPv6，可能来自临时地址、多个接口或不同网络路径。'] : [],
    }
  }
  if (ipv6.length) {
    return {
      family: 'IPv6',
      tone: 'warning',
      title: '仅发现本地 IPv6',
      badge: '无全局地址',
      description: '检测到了 IPv6 候选，但没有发现全局单播地址。',
      address: '—',
      port: '—',
      reachability: '未发现全局 IPv6 候选',
      nat: '不适用或无法判定',
      mapping: '通常不适用',
      filtering: '无法判定',
      notes: ['链路本地地址或唯一本地地址不能代表公网 IPv6 可用。'],
    }
  }
  return {
    family: 'IPv6',
    tone: 'neutral',
    title: '未发现 IPv6 候选',
    badge: '未检测到',
    description: '本次 WebRTC 会话没有产生可识别的 IPv6 ICE 候选。',
    address: '—',
    port: '—',
    reachability: '未发现 IPv6 候选',
    nat: '不适用',
    mapping: '不适用',
    filtering: '未检测',
    notes: ['可能是当前网络没有 IPv6，也可能是浏览器、VPN 或系统策略未暴露 IPv6 候选。'],
  }
}

function analyzeResults(mappingProbe, nodeProbes) {
  const probes = [mappingProbe, ...nodeProbes]
  const allCandidates = probes.flatMap((probe) => probe.candidates)
  const reflexiveCount = nodeProbes.filter((probe) => probe.candidates.some((candidate) => candidate.type === 'srflx')).length
  const mappingEvidence = getMappingEvidence(mappingProbe)
  uniqueCandidateCount.value = uniqueCandidates(allCandidates).length
  mappingSummary.value = {
    tone: mappingEvidence.tone,
    title: mappingEvidence.title,
    description: mappingEvidence.description,
  }
  resultIPv4.value = analyzeIPv4(mappingProbe, nodeProbes, mappingEvidence)
  resultIPv6.value = analyzeIPv6(probes)
  if (!allCandidates.length) {
    overall.value = makeOverall('error', '未获得有效 ICE 候选', '请更换节点、关闭可能拦截 WebRTC 的扩展，或检查 VPN 与网络策略后重试。')
  } else if (resultIPv4.value.title !== '未发现 IPv4 候选' && resultIPv4.value.title !== '未获得 IPv4 公网端点') {
    overall.value = makeOverall(resultIPv4.value.tone, resultIPv4.value.title, `${reflexiveCount}/${nodeProbes.length} 个独立 STUN 节点返回公网端点。`)
  } else if (resultIPv6.value.title === '发现全局 IPv6 候选') {
    overall.value = makeOverall('success', 'IPv6 网络可用', '未完成 IPv4 NAT 分型，但浏览器发现了全局 IPv6 候选。')
  } else if (allCandidates.length) {
    overall.value = makeOverall('warning', 'NAT 类型无法确认', '已收集 ICE 候选，但没有足够的 IPv4 公网映射证据。')
  }
  const failedCount = nodeProbes.filter((probe) => probe.state === 'error' || probe.state === 'timeout' || probe.iceErrors.length).length
  if (failedCount && reflexiveCount) notice.value = { tone: 'warning', text: `有 ${failedCount} 个节点出现超时或 ICE 错误，成功节点的端点结果仍可参考。` }
}

async function startTest() {
  if (testing.value) return
  if (typeof window === 'undefined') return
  if (typeof window.RTCPeerConnection !== 'function') {
    notice.value = { tone: 'error', text: '当前浏览器不支持 RTCPeerConnection，无法执行检测。' }
    overall.value = makeOverall('error', '浏览器不支持 WebRTC', '请使用较新的 Chrome、Edge、Firefox 或 Safari 浏览器。')
    return
  }
  let servers
  try {
    servers = getServersForRun()
  } catch (error) {
    notice.value = { tone: 'error', text: error instanceof Error ? error.message : 'STUN 节点地址无效。' }
    return
  }
  const runId = ++currentRun
  const startedAt = Date.now()
  testing.value = true
  hasRun.value = true
  completedCount.value = 0
  totalCount.value = servers.length + 1
  elapsedMs.value = 0
  uniqueCandidateCount.value = 0
  notice.value = { tone: 'info', text: '' }
  overall.value = makeOverall('accent', '正在检测', `已启动 1 个多节点映射会话和 ${servers.length} 个独立节点会话。`)
  mappingSummary.value = makeMappingSummary('accent', '正在比较映射', '同一 ICE 会话正在访问多个 STUN 目标。')
  resultIPv4.value = makeFamilyResult('IPv4', 'running')
  resultIPv6.value = makeFamilyResult('IPv6', 'running')
  probeRows.value = servers.map(makeWaitingNode)
  logs.value = []
  addLog(`开始检测：${servers.map((server) => server.name).join('、')}`)
  const mappingTask = gatherCandidates(servers, 'mapping').then((probe) => {
    if (runId !== currentRun) return probe
    completedCount.value += 1
    const endpoints = uniqueValues(probe.candidates.filter((candidate) => candidate.family === 'ipv4' && candidate.type === 'srflx').map(formatEndpoint))
    addLog(endpoints.length ? `映射会话发现 ${endpoints.length} 个 IPv4 公网端点。` : '映射会话未获得 IPv4 公网端点。', endpoints.length ? 'success' : 'warning')
    return probe
  })
  const nodeTasks = servers.map(async (server, index) => {
    const probe = await gatherCandidates([server], `node:${server.id}`)
    if (runId !== currentRun) return probe
    completedCount.value += 1
    probeRows.value.splice(index, 1, makeProbeRow(probe))
    const reflexiveCount = probe.candidates.filter((candidate) => candidate.type === 'srflx').length
    if (reflexiveCount) addLog(`${server.name} 返回 ${reflexiveCount} 个服务器反射候选。`, 'success')
    else if (probe.state === 'error') addLog(`${server.name} 会话失败：${probe.errorText || '未知错误'}`, 'error')
    else addLog(`${server.name} 未返回服务器反射候选。`, 'warning')
    return probe
  })
  const [mappingProbe, nodeProbes] = await Promise.all([mappingTask, Promise.all(nodeTasks)])
  if (runId !== currentRun) return
  elapsedMs.value = Math.max(1, Date.now() - startedAt)
  analyzeResults(mappingProbe, nodeProbes)
  testing.value = false
  addLog('检测完成，已生成 NAT 分型结果。', 'success')
}

function stopTest() {
  if (!testing.value) return
  currentRun += 1
  activeSessions.forEach((session) => session.cancel())
  activeSessions.clear()
  testing.value = false
  elapsedMs.value = 0
  overall.value = makeOverall('neutral', '检测已停止', '本次会话已关闭，可以调整节点后重新开始。')
  mappingSummary.value = makeMappingSummary('neutral', '检测已停止', '映射比较会话已关闭。')
  resultIPv4.value = makeFamilyResult('IPv4')
  resultIPv6.value = makeFamilyResult('IPv6')
  probeRows.value = probeRows.value.map((row) => row.tone === 'running' ? { ...row, status: '已停止', tone: 'neutral', candidateText: '未完成', duration: '—', detail: '检测由用户停止。' } : row)
  notice.value = { tone: 'info', text: '检测已停止，所有活动的 WebRTC 会话均已关闭。' }
  addLog('用户停止了检测。', 'warning')
}

function resetTest() {
  overall.value = makeOverall()
  mappingSummary.value = makeMappingSummary()
  resultIPv4.value = makeFamilyResult('IPv4')
  resultIPv6.value = makeFamilyResult('IPv6')
  probeRows.value = []
  logs.value = []
  completedCount.value = 0
  totalCount.value = 0
  elapsedMs.value = 0
  uniqueCandidateCount.value = 0
  notice.value = { tone: 'info', text: '' }
  hasRun.value = false
}

onBeforeUnmount(() => {
  currentRun += 1
  activeSessions.forEach((session) => session.cancel())
  activeSessions.clear()
})
</script>

<style scoped>
.nat-app {
  --nat-tone: var(--vp-custom-text-3);
  --nat-tone-soft: var(--vp-c-grey-soft);
  display: grid;
  gap: 18px;
  margin-top: 18px;
}

.nat-app :where(p, ul, dl, dd) {
  margin: 0;
}

.nat-section-kicker {
  color: var(--vp-custom-accent);
  font-size: 0.76rem;
  font-weight: 750;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.nat-state-badge,
.nat-node-state {
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 3px 9px;
  border: 1px solid var(--vp-custom-glass-border);
  border-radius: 999px;
  color: var(--vp-custom-text-2);
  background: var(--vp-custom-glass-strong);
  font-size: 0.75rem;
  font-weight: 650;
  line-height: 1.2;
  white-space: nowrap;
}

.nat-config,
.nat-nodes,
.nat-log-card {
  padding: 20px;
}

.nat-section-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.nat-section-title {
  margin-top: 3px !important;
  color: var(--vp-custom-text-1);
  font-size: 1.02rem;
  font-weight: 720;
  line-height: 1.4;
}

.nat-privacy-note {
  color: var(--vp-custom-text-3);
  font-size: 0.78rem;
  line-height: 1.5;
  text-align: right;
}

.nat-fields {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-top: 17px;
}

.nat-fields > :only-child {
  grid-column: 1 / -1;
}

.nat-field {
  display: grid;
  gap: 7px;
  color: var(--vp-custom-text-2);
  font-size: 0.82rem;
  font-weight: 650;
}

.nat-select,
.nat-input {
  width: 100%;
  padding: 0 12px;
}

.nat-select {
  cursor: pointer;
}

.nat-field-help {
  margin-top: 9px !important;
  color: var(--vp-custom-text-3);
  font-size: 0.78rem;
  line-height: 1.55;
}

.nat-field-help code {
  padding: 1px 5px;
  border-radius: 5px;
  color: var(--vp-custom-text-2);
  background: var(--vp-custom-glass-muted);
  font-size: 0.76rem;
}

.nat-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin-top: 17px;
}

.nat-primary-action {
  min-width: 150px;
}

.nat-button-icon {
  display: inline-block;
  width: 1em;
  margin-right: 5px;
}

.nat-progress {
  height: 5px;
  margin-top: 14px;
  overflow: hidden;
  border-radius: 999px;
  background: var(--vp-custom-glass-muted);
}

.nat-progress span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--vp-custom-accent);
  transition: width 180ms ease;
}

.nat-notice {
  margin-top: 13px !important;
  padding: 10px 12px;
  border: 1px solid var(--vp-custom-glass-border);
  border-radius: 10px;
  color: var(--vp-custom-text-2);
  background: var(--vp-custom-glass-strong);
  font-size: 0.84rem;
  line-height: 1.55;
}

.nat-notice-warning {
  border-color: color-mix(in srgb, var(--vp-c-yellow-bg) 42%, var(--vp-custom-glass-border));
  color: var(--vp-c-yellow-text);
  background: color-mix(in srgb, var(--vp-c-yellow-soft) 72%, var(--vp-custom-glass-strong));
}

.nat-notice-error {
  border-color: color-mix(in srgb, var(--vp-c-red-bg) 42%, var(--vp-custom-glass-border));
  color: var(--vp-c-red-text);
  background: color-mix(in srgb, var(--vp-c-red-soft) 72%, var(--vp-custom-glass-strong));
}

.nat-summary-grid {
  display: grid;
  grid-template-columns: minmax(280px, 2fr) repeat(3, minmax(110px, 0.7fr));
  gap: 12px;
}

.nat-overall {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 17px;
  border-color: color-mix(in srgb, var(--nat-tone) 28%, var(--vp-custom-glass-border));
}

.nat-overall-mark {
  display: grid;
  flex: 0 0 40px;
  width: 40px;
  height: 40px;
  place-items: center;
  border: 1px solid color-mix(in srgb, var(--nat-tone) 32%, var(--vp-custom-glass-border));
  border-radius: 13px;
  background: var(--nat-tone-soft);
}

.nat-overall-mark span,
.nat-status-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--nat-tone);
}

.nat-overall-title {
  margin-top: 2px !important;
  color: var(--vp-custom-text-1);
  font-size: 1rem;
  font-weight: 720;
}

.nat-overall-desc {
  margin-top: 4px !important;
  color: var(--vp-custom-text-2);
  font-size: 0.79rem;
  line-height: 1.55;
}

.nat-metric {
  display: flex;
  min-height: 92px;
  padding: 14px;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
}

.nat-metric span {
  color: var(--vp-custom-text-3);
  font-size: 0.75rem;
}

.nat-metric strong {
  color: var(--vp-custom-text-1);
  font-size: 0.98rem;
  font-weight: 720;
  line-height: 1.35;
}

.nat-result-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.nat-result-card {
  padding: 19px;
  border-color: color-mix(in srgb, var(--nat-tone) 25%, var(--vp-custom-glass-border));
}

.nat-tone-neutral {
  --nat-tone: var(--vp-c-grey-text);
  --nat-tone-soft: var(--vp-c-grey-soft);
}

.nat-tone-accent {
  --nat-tone: var(--vp-custom-accent);
  --nat-tone-soft: var(--vp-c-accent-soft);
}

.nat-tone-success {
  --nat-tone: var(--vp-c-green-text);
  --nat-tone-soft: var(--vp-c-green-soft);
}

.nat-tone-warning {
  --nat-tone: var(--vp-c-yellow-text);
  --nat-tone-soft: var(--vp-c-yellow-soft);
}

.nat-tone-error {
  --nat-tone: var(--vp-c-red-text);
  --nat-tone-soft: var(--vp-c-red-soft);
}

.nat-result-head,
.nat-family-label,
.nat-node-main,
.nat-node-meta,
.nat-log-toolbar {
  display: flex;
  align-items: center;
}

.nat-result-head,
.nat-node-main,
.nat-log-toolbar {
  justify-content: space-between;
}

.nat-result-head {
  gap: 12px;
}

.nat-family-label {
  gap: 10px;
}

.nat-status-dot {
  flex: 0 0 9px;
}

.nat-result-title {
  margin-top: 2px !important;
  color: var(--vp-custom-text-1);
  font-size: 1.08rem;
  font-weight: 750;
}

.nat-state-badge {
  border-color: color-mix(in srgb, var(--nat-tone) 32%, var(--vp-custom-glass-border));
  color: var(--nat-tone);
  background: color-mix(in srgb, var(--nat-tone-soft) 68%, var(--vp-custom-glass-strong));
}

.nat-result-desc {
  min-height: 48px;
  margin-top: 13px !important;
  color: var(--vp-custom-text-2);
  font-size: 0.84rem;
  line-height: 1.65;
}

.nat-detail-list {
  display: grid;
  margin-top: 15px !important;
  border-top: 1px solid var(--vp-custom-glass-border);
}

.nat-detail-list > div {
  display: grid;
  grid-template-columns: minmax(84px, 0.6fr) minmax(0, 1.4fr);
  gap: 14px;
  padding: 10px 0;
  border-bottom: 1px solid color-mix(in srgb, var(--vp-custom-glass-border) 72%, transparent);
}

.nat-detail-list dt {
  color: var(--vp-custom-text-3);
  font-size: 0.78rem;
}

.nat-detail-list dd {
  min-width: 0;
  color: var(--vp-custom-text-1);
  font-size: 0.8rem;
  font-weight: 620;
  line-height: 1.5;
  overflow-wrap: anywhere;
  text-align: right;
}

.nat-mono {
  font-family: var(--font-family-mono, ui-monospace, SFMono-Regular, Consolas, monospace);
  font-variant-numeric: tabular-nums;
}

.nat-result-notes {
  display: grid;
  gap: 6px;
  margin-top: 13px !important;
  padding: 11px 12px 11px 28px;
  border-radius: 10px;
  color: var(--vp-custom-text-2);
  background: var(--nat-tone-soft);
  font-size: 0.77rem;
  line-height: 1.55;
}

.nat-node-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-top: 16px;
}

.nat-mapping-strip {
  --nat-tone: var(--vp-c-grey-text);
  --nat-tone-soft: var(--vp-c-grey-soft);
  display: grid;
  grid-template-columns: minmax(180px, 0.65fr) minmax(0, 1.35fr);
  gap: 18px;
  margin-top: 16px;
  padding: 13px 14px;
  border: 1px solid color-mix(in srgb, var(--nat-tone) 28%, var(--vp-custom-glass-border));
  border-radius: 12px;
  background: color-mix(in srgb, var(--nat-tone-soft) 56%, var(--vp-custom-glass-strong));
  box-shadow: inset 0 1px 0 var(--vp-custom-highlight);
}

.nat-mapping-strip span {
  display: block;
  color: var(--vp-custom-text-3);
  font-size: 0.7rem;
}

.nat-mapping-strip strong {
  display: block;
  margin-top: 3px;
  color: var(--nat-tone);
  font-size: 0.87rem;
  line-height: 1.4;
}

.nat-mapping-strip p {
  align-self: center;
  color: var(--vp-custom-text-2);
  font-size: 0.76rem;
  line-height: 1.55;
}

.nat-node-row {
  --node-tone: var(--vp-c-grey-text);
  min-width: 0;
  padding: 13px;
  border: 1px solid color-mix(in srgb, var(--node-tone) 22%, var(--vp-custom-glass-border));
  border-radius: 12px;
  background: var(--vp-custom-glass-muted);
  box-shadow: inset 0 1px 0 var(--vp-custom-highlight);
}

.nat-node-success {
  --node-tone: var(--vp-c-green-text);
}

.nat-node-warning,
.nat-node-running {
  --node-tone: var(--vp-c-yellow-text);
}

.nat-node-error {
  --node-tone: var(--vp-c-red-text);
}

.nat-node-neutral {
  --node-tone: var(--vp-c-grey-text);
}

.nat-node-main {
  align-items: flex-start;
  gap: 9px;
}

.nat-node-main strong {
  display: block;
  color: var(--vp-custom-text-1);
  font-size: 0.83rem;
}

.nat-node-url {
  display: block;
  margin-top: 2px;
  color: var(--vp-custom-text-3);
  font-family: var(--font-family-mono, ui-monospace, SFMono-Regular, Consolas, monospace);
  font-size: 0.67rem;
  overflow-wrap: anywhere;
}

.nat-node-state {
  min-height: 24px;
  border-color: color-mix(in srgb, var(--node-tone) 30%, var(--vp-custom-glass-border));
  color: var(--node-tone);
  background: color-mix(in srgb, var(--node-tone) 8%, var(--vp-custom-glass-strong));
  font-size: 0.68rem;
}

.nat-node-meta {
  justify-content: flex-start;
  gap: 10px;
  margin-top: 10px;
  color: var(--vp-custom-text-3);
  font-size: 0.7rem;
}

.nat-node-meta span + span::before {
  margin-right: 10px;
  content: '·';
}

.nat-node-endpoint {
  margin-top: 9px !important;
  color: var(--vp-custom-text-1);
  font-size: 0.74rem;
  font-weight: 620;
  line-height: 1.55;
  overflow-wrap: anywhere;
}

.nat-node-detail {
  margin-top: 7px !important;
  color: var(--vp-custom-text-2);
  font-size: 0.71rem;
  line-height: 1.5;
}

.nat-capability-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.nat-capability-card {
  display: flex;
  gap: 13px;
  padding: 18px;
}

.nat-capability-icon {
  display: grid;
  flex: 0 0 34px;
  width: 34px;
  height: 34px;
  place-items: center;
  border-radius: 11px;
  font-weight: 800;
}

.nat-can-card .nat-capability-icon {
  color: var(--vp-c-green-text);
  background: var(--vp-c-green-soft);
}

.nat-cannot-card .nat-capability-icon {
  color: var(--vp-c-yellow-text);
  background: var(--vp-c-yellow-soft);
}

.nat-capability-card ul {
  display: grid;
  gap: 6px;
  margin-top: 10px !important;
  padding-left: 18px;
  color: var(--vp-custom-text-2);
  font-size: 0.79rem;
  line-height: 1.55;
}

.nat-log-card {
  padding-top: 0;
  padding-bottom: 0;
}

.nat-log-card summary {
  display: flex;
  min-height: 54px;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: var(--vp-custom-text-1);
  cursor: pointer;
  font-size: 0.88rem;
  font-weight: 680;
  list-style: none;
}

.nat-log-card summary::-webkit-details-marker {
  display: none;
}

.nat-log-card summary span:last-child {
  color: var(--vp-custom-text-3);
  font-size: 0.74rem;
  font-weight: 550;
}

.nat-log-card[open] summary {
  border-bottom: 1px solid var(--vp-custom-glass-border);
}

.nat-log-content {
  padding: 14px 0 18px;
}

.nat-log-toolbar {
  gap: 12px;
  margin-bottom: 10px;
}

.nat-log-toolbar p {
  color: var(--vp-custom-text-3);
  font-size: 0.75rem;
  line-height: 1.5;
}

.nat-log-box {
  max-height: 230px;
  padding: 10px 12px;
  overflow-y: auto;
  border: 1px solid var(--vp-custom-glass-border);
  border-radius: 10px;
  background: var(--vp-custom-glass-muted);
}

.nat-log-line {
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr);
  gap: 9px;
  padding: 5px 0;
  color: var(--vp-custom-text-2);
  font-family: var(--font-family-mono, ui-monospace, SFMono-Regular, Consolas, monospace);
  font-size: 0.72rem;
  line-height: 1.5;
}

.nat-log-line time {
  color: var(--vp-custom-text-3);
  font-variant-numeric: tabular-nums;
}

.nat-log-success span {
  color: var(--vp-c-green-text);
}

.nat-log-warning span {
  color: var(--vp-c-yellow-text);
}

.nat-log-error span {
  color: var(--vp-c-red-text);
}

.nat-log-empty {
  padding: 14px 2px;
  color: var(--vp-custom-text-3);
  font-size: 0.78rem;
  text-align: center;
}

@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .nat-node-row,
  .nat-log-box {
    background: var(--vp-c-bg-alt);
  }
}

@media (max-width: 900px) {
  .nat-summary-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .nat-overall {
    grid-column: 1 / -1;
  }

  .nat-node-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .nat-app {
    gap: 14px;
  }

  .nat-config,
  .nat-nodes,
  .nat-result-card {
    padding: 16px;
  }

  .nat-fields,
  .nat-result-grid,
  .nat-capability-grid {
    grid-template-columns: 1fr;
  }

  .nat-result-desc {
    min-height: 0;
  }

  .nat-section-head {
    flex-direction: column;
  }

  .nat-privacy-note {
    text-align: left;
  }

  .nat-mapping-strip {
    grid-template-columns: 1fr;
    gap: 7px;
  }
}

@media (max-width: 520px) {
  .nat-summary-grid {
    grid-template-columns: 1fr;
  }

  .nat-overall {
    grid-column: auto;
  }

  .nat-metric {
    min-height: 70px;
  }

  .nat-actions > button {
    width: 100%;
  }

  .nat-detail-list > div {
    grid-template-columns: 1fr;
    gap: 4px;
  }

  .nat-detail-list dd {
    text-align: left;
  }

  .nat-result-head,
  .nat-node-main,
  .nat-log-toolbar {
    align-items: flex-start;
    flex-direction: column;
  }

  .nat-log-line {
    grid-template-columns: 1fr;
    gap: 1px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .nat-progress span {
    transition: none;
  }
}
</style>
