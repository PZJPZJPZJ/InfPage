---
routeMeta:
  itemTitle: TOTP Generator
  itemDesc: 动态验证码工具
  itemIcon: 1password.com
---
# 动态验证码工具
<section class="vp-custom-surface totp-app" aria-label="动态验证码工具">
  <section class="vp-custom-glass-card totp-card" aria-labelledby="totp-generator-title">
    <div class="totp-head">
      <div>
        <p class="totp-kicker">TOTP GENERATOR</p>
        <p id="totp-generator-title" class="totp-title">生成动态验证码</p>
        <p class="totp-desc">输入 Base32、Base64、HEX 密钥或 otpauth URI，在浏览器本地计算验证码。</p>
        <p v-if="storageNotice" class="totp-storage-notice" role="status">{{ storageNotice }}</p>
      </div>
    </div>
    <div class="totp-input-section">
      <label class="totp-label" for="totp-secret">密钥或 otpauth URI</label>
      <input
        id="totp-secret"
        v-model="input"
        class="vp-custom-control totp-input"
        type="text"
        autocomplete="off"
        autocapitalize="none"
        spellcheck="false"
        placeholder="例如 JBSWY3DPEHPK3PXP"
        aria-describedby="totp-secret-help"
        :aria-invalid="error ? 'true' : 'false'"
        @paste="onPaste"
      >
      <p id="totp-secret-help" class="totp-help">支持 URL 参数 secret 自动填入。密钥只在当前页面内存中使用，不会保存到本地设置。</p>
    </div>
    <div class="totp-settings" aria-label="验证码设置">
      <label class="totp-field" for="totp-algorithm">
        <span>算法</span>
        <select id="totp-algorithm" v-model="algorithm" class="vp-custom-control totp-select">
          <option value="SHA-1">SHA-1</option>
          <option value="SHA-256">SHA-256</option>
          <option value="SHA-512">SHA-512</option>
        </select>
      </label>
      <label class="totp-field" for="totp-period">
        <span>周期</span>
        <select id="totp-period" v-model="period" class="vp-custom-control totp-select">
          <option :value="15">15 秒</option>
          <option :value="30">30 秒</option>
          <option :value="60">60 秒</option>
        </select>
      </label>
      <label class="totp-field" for="totp-digits">
        <span>位数</span>
        <select id="totp-digits" v-model="digits" class="vp-custom-control totp-select">
          <option :value="6">6 位</option>
          <option :value="7">7 位</option>
          <option :value="8">8 位</option>
        </select>
      </label>
      <label class="totp-field" for="totp-input-format">
        <span>密钥格式</span>
        <select id="totp-input-format" v-model="inputFormat" class="vp-custom-control totp-select">
          <option value="base32">Base32</option>
          <option value="base64">Base64</option>
          <option value="hex">HEX</option>
        </select>
      </label>
    </div>
    <p v-if="error" class="vp-custom-status vp-custom-status-error totp-status" role="alert">{{ error }}</p>
    <div class="vp-custom-glass-muted totp-result" aria-live="polite">
      <div class="totp-result-left">
        <div class="totp-code-section">
          <span class="totp-result-label">当前验证码</span>
          <strong :class="['totp-code', { 'totp-code-empty': !secret || error }]">{{ otp }}</strong>
        </div>
      </div>
      <div class="totp-clock" aria-label="验证码剩余时间">
        <svg class="totp-clock-svg" viewBox="0 0 100 100" aria-hidden="true">
          <circle class="totp-clock-bg" cx="50" cy="50" r="42"></circle>
          <circle :class="`totp-clock-fg totp-clock-fg-${countdownTone}`" cx="50" cy="50" r="42" :style="{ strokeDashoffset: dashOffset }"></circle>
        </svg>
        <div class="totp-clock-value">
          <strong>{{ secret && !error ? remain : '--' }}</strong>
          <span>秒</span>
        </div>
      </div>
    </div>
    <div class="totp-actions">
      <button class="vp-custom-button vp-custom-button-primary" type="button" :disabled="!secret || Boolean(error) || otp === '------'" @click="copyOTP">
        {{ copied ? '已复制验证码' : '复制验证码' }}
      </button>
    </div>
  </section>
  <section class="vp-custom-glass-card totp-card" aria-labelledby="totp-keygen-title">
    <div class="totp-head">
      <div>
        <p class="totp-kicker">SECRET GENERATOR</p>
        <p id="totp-keygen-title" class="totp-title">生成安全密钥</p>
        <p class="totp-desc">使用浏览器加密随机数生成 TOTP 密钥。生成结果不会写入本地存储。</p>
      </div>
    </div>
    <div class="totp-settings totp-key-settings" aria-label="密钥生成设置">
      <label class="totp-field" for="totp-key-bits">
        <span>密钥长度</span>
        <select id="totp-key-bits" v-model="keyBits" class="vp-custom-control totp-select">
          <option :value="128">128 位（16 字节）</option>
          <option :value="160">160 位（20 字节）</option>
          <option :value="256">256 位（32 字节）</option>
          <option :value="512">512 位（64 字节）</option>
        </select>
      </label>
      <label class="totp-field" for="totp-key-format">
        <span>输出格式</span>
        <select id="totp-key-format" v-model="keyFormat" class="vp-custom-control totp-select">
          <option value="base32">Base32</option>
          <option value="base64">Base64</option>
          <option value="hex">HEX</option>
        </select>
      </label>
    </div>
    <div class="totp-key-output" aria-live="polite">
      <span>生成的 {{ keyFormatLabel }} 密钥</span>
      <p class="totp-key-value" :class="{ 'totp-key-empty': !generatedKey }">{{ generatedKey || '尚未生成密钥' }}</p>
    </div>
    <div class="totp-actions">
      <button class="vp-custom-button vp-custom-button-primary" type="button" @click="generateKey">生成新密钥</button>
      <button class="vp-custom-button vp-custom-button-secondary" type="button" :disabled="!generatedKey" @click="copyKey">{{ keyCopied ? '已复制密钥' : '复制密钥' }}</button>
    </div>
  </section>
</section>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

const B32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
const STORAGE_KEY = 'infpage:tool:totp-generator'
const SETTINGS_VERSION = 1
const COPY_FEEDBACK_MS = 1500

function base32Decode(value) {
  const clean = value.replace(/\s/g, '').replace(/=+$/, '').toUpperCase()
  const bytes = []
  let buffer = 0
  let bits = 0
  for (const character of clean) {
    const index = B32.indexOf(character)
    if (index === -1) throw new Error(`无效字符: ${character}`)
    buffer = (buffer << 5) | index
    bits += 5
    if (bits >= 8) {
      bits -= 8
      bytes.push((buffer >> bits) & 0xff)
    }
  }
  if (!bytes.length) throw new Error('密钥不能为空')
  return new Uint8Array(bytes)
}

function base32Encode(bytes) {
  let result = ''
  let buffer = 0
  let bits = 0
  for (const byte of bytes) {
    buffer = (buffer << 8) | byte
    bits += 8
    while (bits >= 5) {
      bits -= 5
      result += B32[(buffer >> bits) & 0x1f]
    }
  }
  if (bits > 0) result += B32[(buffer << (5 - bits)) & 0x1f]
  return result
}

function base64Decode(value) {
  const normalized = value.replace(/\s/g, '')
  const binary = atob(normalized)
  if (!binary.length) throw new Error('密钥不能为空')
  return Uint8Array.from(binary, (character) => character.charCodeAt(0))
}

function base64Encode(bytes) {
  return btoa(String.fromCharCode(...bytes))
}

function hexDecode(value) {
  const clean = value.replace(/\s/g, '')
  if (!clean || clean.length % 2 !== 0) throw new Error('HEX 字符串长度必须为非零偶数')
  if (!/^[0-9a-f]+$/i.test(clean)) throw new Error('HEX 密钥只能包含 0-9 和 A-F')
  return Uint8Array.from({ length: clean.length / 2 }, (_, index) => Number.parseInt(clean.slice(index * 2, index * 2 + 2), 16))
}

function hexEncode(bytes) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0').toUpperCase()).join('')
}

function decodeKey(value, format) {
  if (format === 'base64') return base64Decode(value)
  if (format === 'hex') return hexDecode(value)
  return base32Decode(value)
}

function encodeKey(bytes, format) {
  if (format === 'base64') return base64Encode(bytes)
  if (format === 'hex') return hexEncode(bytes)
  return base32Encode(bytes)
}

function counterBytes(counter) {
  const buffer = new ArrayBuffer(8)
  const view = new DataView(buffer)
  view.setUint32(0, Math.floor(counter / 0x100000000))
  view.setUint32(4, counter >>> 0)
  return buffer
}

async function generateTOTP(value, hash, codeDigits, codePeriod, format) {
  const keyBytes = decodeKey(value, format)
  const counter = Math.floor(Date.now() / 1000 / codePeriod)
  const cryptoKey = await crypto.subtle.importKey('raw', keyBytes, { name: 'HMAC', hash }, false, ['sign'])
  const signature = new Uint8Array(await crypto.subtle.sign('HMAC', cryptoKey, counterBytes(counter)))
  const offset = signature[signature.length - 1] & 0x0f
  const binary = ((signature[offset] & 0x7f) << 24) | ((signature[offset + 1] & 0xff) << 16) | ((signature[offset + 2] & 0xff) << 8) | (signature[offset + 3] & 0xff)
  return String(binary % 10 ** codeDigits).padStart(codeDigits, '0')
}

function parseURI(text) {
  if (!/^otpauth:\/\/totp\//i.test(text)) return null
  try {
    const url = new URL(text)
    const uriSecret = url.searchParams.get('secret')
    if (!uriSecret) return null
    const rawAlgorithm = (url.searchParams.get('algorithm') || 'SHA1').toUpperCase().replace(/-/g, '')
    const algorithms = { SHA1: 'SHA-1', SHA256: 'SHA-256', SHA512: 'SHA-512' }
    const uriDigits = Number.parseInt(url.searchParams.get('digits') || '6', 10)
    const uriPeriod = Number.parseInt(url.searchParams.get('period') || '30', 10)
    return {
      secret: uriSecret,
      algorithm: algorithms[rawAlgorithm] || 'SHA-1',
      digits: [6, 7, 8].includes(uriDigits) ? uriDigits : 6,
      period: [15, 30, 60].includes(uriPeriod) ? uriPeriod : 30,
    }
  } catch {
    return null
  }
}

const input = ref('')
const algorithm = ref('SHA-1')
const period = ref(30)
const digits = ref(6)
const inputFormat = ref('base32')
const secret = ref('')
const otp = ref('------')
const remain = ref('--')
const error = ref('')
const copied = ref(false)
const keyBits = ref(256)
const keyFormat = ref('base32')
const generatedKey = ref('')
const keyCopied = ref(false)
const storageNotice = ref('')
let intervalId
let otpCopyTimer
let keyCopyTimer
let refreshSequence = 0
let settingsReady = false

const remainNumber = computed(() => Number.parseInt(remain.value, 10) || 0)
const remainPercent = computed(() => secret.value && !error.value ? Math.max(0, Math.min(100, remainNumber.value / period.value * 100)) : 0)
const countdownTone = computed(() => remainPercent.value > 50 ? 'safe' : remainPercent.value > 25 ? 'warning' : 'danger')
const dashOffset = computed(() => 2 * Math.PI * 42 * (1 - remainPercent.value / 100))
const keyFormatLabel = computed(() => ({ base32: 'Base32', base64: 'Base64', hex: 'HEX' })[keyFormat.value])

function loadSettings() {
  if (typeof window === 'undefined') return
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return
    const saved = JSON.parse(raw)
    if (!saved || saved.version !== SETTINGS_VERSION || typeof saved.settings !== 'object') throw new Error('设置结构不兼容')
    const settings = saved.settings
    if (['SHA-1', 'SHA-256', 'SHA-512'].includes(settings.algorithm)) algorithm.value = settings.algorithm
    if ([15, 30, 60].includes(settings.period)) period.value = settings.period
    if ([6, 7, 8].includes(settings.digits)) digits.value = settings.digits
    if (['base32', 'base64', 'hex'].includes(settings.inputFormat)) inputFormat.value = settings.inputFormat
    if ([128, 160, 256, 512].includes(settings.keyBits)) keyBits.value = settings.keyBits
    if (['base32', 'base64', 'hex'].includes(settings.keyFormat)) keyFormat.value = settings.keyFormat
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
        algorithm: algorithm.value,
        period: period.value,
        digits: digits.value,
        inputFormat: inputFormat.value,
        keyBits: keyBits.value,
        keyFormat: keyFormat.value,
      },
    }))
    storageNotice.value = ''
  } catch {
    storageNotice.value = '浏览器存储不可用，本次设置不会被记住。'
  }
}

function readURLParams() {
  if (typeof window === 'undefined') return
  const urlSecret = new URLSearchParams(window.location.search).get('secret')
  if (urlSecret) input.value = urlSecret
}

function onPaste(event) {
  const text = (event.clipboardData || window.clipboardData).getData('text').trim()
  if (!parseURI(text)) return
  event.preventDefault()
  input.value = text
  error.value = ''
}

async function refresh() {
  const currentSequence = ++refreshSequence
  if (!secret.value) {
    otp.value = '------'
    remain.value = '--'
    error.value = ''
    return
  }
  try {
    const nextOtp = await generateTOTP(secret.value, algorithm.value, digits.value, period.value, inputFormat.value)
    if (currentSequence !== refreshSequence) return
    otp.value = nextOtp
    error.value = ''
  } catch (refreshError) {
    if (currentSequence !== refreshSequence) return
    otp.value = '------'
    if (refreshError.message?.includes('无效字符')) error.value = '密钥包含无效字符，请检查输入格式。'
    else if (refreshError.message?.includes('HEX')) error.value = refreshError.message
    else error.value = '生成失败，请检查密钥内容和格式。'
  }
  remain.value = period.value - Math.floor(Date.now() / 1000) % period.value
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
  }
}

async function copyOTP() {
  await copyText(otp.value)
  copied.value = true
  window.clearTimeout(otpCopyTimer)
  otpCopyTimer = window.setTimeout(() => { copied.value = false }, COPY_FEEDBACK_MS)
}

function generateKey() {
  const bytes = new Uint8Array(keyBits.value / 8)
  crypto.getRandomValues(bytes)
  generatedKey.value = encodeKey(bytes, keyFormat.value)
  keyCopied.value = false
}

async function copyKey() {
  if (!generatedKey.value) return
  await copyText(generatedKey.value)
  keyCopied.value = true
  window.clearTimeout(keyCopyTimer)
  keyCopyTimer = window.setTimeout(() => { keyCopied.value = false }, COPY_FEEDBACK_MS)
}

watch(input, (value) => {
  const parsed = parseURI(value.trim())
  if (parsed) {
    inputFormat.value = 'base32'
    secret.value = parsed.secret
    algorithm.value = parsed.algorithm
    period.value = parsed.period
    digits.value = parsed.digits
  } else secret.value = value.trim()
  refresh()
})
watch([algorithm, period, digits, inputFormat], () => {
  saveSettings()
  refresh()
})
watch([keyBits, keyFormat], saveSettings)
watch(keyFormat, () => {
  if (generatedKey.value) generateKey()
})

onMounted(async () => {
  loadSettings()
  readURLParams()
  await nextTick()
  settingsReady = true
  refresh()
  intervalId = window.setInterval(refresh, 1000)
})

onUnmounted(() => {
  window.clearInterval(intervalId)
  window.clearTimeout(otpCopyTimer)
  window.clearTimeout(keyCopyTimer)
})
</script>

<style scoped>
.totp-app {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 2px 0 28px;
}

.totp-card {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: clamp(18px, 2.5vw, 28px);
  width: 100%;
}

.totp-head {
  align-items: flex-start;
  display: flex;
}

.totp-kicker,
.totp-title,
.totp-desc,
.totp-help,
.totp-storage-notice {
  margin: 0;
}

.totp-kicker {
  color: var(--vp-custom-text-3);
  font-size: 0.71rem;
  font-weight: 720;
}

.totp-title {
  color: var(--vp-custom-text-1);
  font-size: 1.14rem;
  font-weight: 750;
  line-height: 1.35;
  margin-top: 2px;
}

.totp-desc {
  color: var(--vp-custom-text-2);
  font-size: 0.83rem;
  line-height: 1.65;
  margin-top: 5px;
}

.totp-storage-notice {
  color: var(--vp-c-yellow-text);
  font-size: 0.72rem;
  margin-top: 7px;
}

.totp-input-section,
.totp-field {
  display: flex;
  flex-direction: column;
}

.totp-label,
.totp-field > span {
  color: var(--vp-custom-text-2);
  font-size: 0.77rem;
  font-weight: 680;
  margin-bottom: 7px;
}

.totp-input,
.totp-select {
  box-sizing: border-box;
  width: 100%;
}

.totp-input {
  font-family: var(--vp-font-family-mono);
  font-size: 0.84rem;
  padding: 0 12px;
}

.totp-help {
  color: var(--vp-custom-text-3);
  font-size: 0.72rem;
  line-height: 1.55;
  margin-top: 7px;
}

.totp-clear {
  align-self: flex-start;
  margin-top: 5px;
}

.totp-settings {
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.totp-key-settings {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.totp-select {
  cursor: pointer;
  font-size: 0.78rem;
  min-height: 40px;
  padding: 0 30px 0 10px;
}

.totp-status {
  font-size: 0.79rem;
}

.totp-result,
.totp-key-output {
  border: 1px solid var(--vp-custom-glass-border);
  border-radius: 13px;
  display: flex;
  flex-direction: column;
  padding: 15px;
}

.totp-result {
  align-items: center;
  flex-direction: row;
  gap: 18px;
  justify-content: space-between;
}

.totp-result-left {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 14px;
  min-width: 0;
}

.totp-code-section {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.totp-result-label,
.totp-key-output > span {
  color: var(--vp-custom-text-3);
  font-size: 0.72rem;
  font-weight: 650;
}

.totp-code {
  color: var(--vp-custom-accent);
  font-family: var(--vp-font-family-mono);
  font-size: clamp(1.4rem, 5vw, 2.2rem);
  font-variant-numeric: tabular-nums;
  line-height: 1.15;
  overflow-wrap: anywhere;
}

.totp-code-empty,
.totp-key-empty {
  color: var(--vp-custom-text-3);
}

.totp-clock {
  --totp-clock-size: 96px;
  flex: 0 0 var(--totp-clock-size);
  height: var(--totp-clock-size);
  position: relative;
  width: var(--totp-clock-size);
}

.totp-clock-svg {
  height: 100%;
  transform: rotate(-90deg);
  width: 100%;
}

.totp-clock-bg,
.totp-clock-fg {
  fill: none;
  stroke-width: 5;
}

.totp-clock-bg {
  stroke: var(--vp-custom-glass-border);
}

.totp-clock-fg {
  stroke-dasharray: 263.89;
  stroke-linecap: round;
  transition: stroke-dashoffset 180ms linear, stroke 180ms ease;
}

.totp-clock-fg-safe {
  stroke: var(--vp-c-green-bg);
}

.totp-clock-fg-warning {
  stroke: var(--vp-c-yellow-bg);
}

.totp-clock-fg-danger {
  stroke: var(--vp-c-red-bg);
}

.totp-clock-value {
  align-items: center;
  display: flex;
  flex-direction: column;
  inset: 0;
  justify-content: center;
  line-height: 1.05;
  position: absolute;
}

.totp-clock-value strong {
  color: var(--vp-custom-text-1);
  font-family: var(--vp-font-family-mono);
  font-size: calc(var(--totp-clock-size) * 0.22);
  font-variant-numeric: tabular-nums;
}

.totp-clock-value span {
  color: var(--vp-custom-text-3);
  font-size: calc(var(--totp-clock-size) * 0.09);
}

.totp-key-output {
  gap: 7px;
}

.totp-key-value {
  color: var(--vp-custom-accent);
  font-family: var(--vp-font-family-mono);
  font-size: clamp(0.95rem, 2.5vw, 1.15rem);
  font-weight: 650;
  line-height: 1.65;
  margin: 0;
  overflow-wrap: anywhere;
}

.totp-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
}

@media (max-width: 720px) {
  .totp-settings,
  .totp-key-settings {
    grid-template-columns: 1fr;
  }

  .totp-code {
    font-size: clamp(1.3rem, 8vw, 1.8rem);
  }
}

@media (max-width: 520px) {
  .totp-clock {
    --totp-clock-size: 78px;
  }

  .totp-actions {
    flex-direction: column;
  }

  .totp-actions .vp-custom-button {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .totp-clock-fg {
    transition: none;
  }
}
</style>
