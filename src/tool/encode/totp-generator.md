---
routeMeta:
  itemTitle: TOTP Generator
  itemDesc: 动态验证码工具
  itemIcon: 1password.com
---
# 动态验证码工具
<div class="totp-card">
  <div class="totp-field">
    <label class="totp-label">TOTP验证码生成</label>
    <input
      v-model="input"
      placeholder="输入密钥或otpauth链接，自动读取URL参数secret"
      class="totp-input"
      @paste="onPaste"
    />
  </div>

  <div class="totp-options">
    <label class="totp-opt-item">
      <span>算法</span>
      <select v-model="algorithm" class="totp-select">
        <option value="SHA-1">SHA-1(默认)</option>
        <option value="SHA-256">SHA-256</option>
        <option value="SHA-512">SHA-512</option>
      </select>
    </label>
    <label class="totp-opt-item">
      <span>周期</span>
      <select v-model="period" class="totp-select">
        <option :value="15">15s</option>
        <option :value="30">30s(默认)</option>
        <option :value="60">60s</option>
      </select>
    </label>
    <label class="totp-opt-item">
      <span>位数</span>
      <select v-model="digits" class="totp-select">
        <option :value="6">6 位(默认)</option>
        <option :value="7">7 位</option>
        <option :value="8">8 位</option>
      </select>
    </label>
    <label class="totp-opt-item">
      <span>格式</span>
      <select v-model="inputFormat" class="totp-select">
        <option value="base32">Base32(默认)</option>
        <option value="base64">Base64</option>
        <option value="hex">HEX</option>
      </select>
    </label>
  </div>

  <div class="totp-body">
    <div class="totp-otp-section">
      <div class="totp-label">验证码</div>
      <div :class="['totp-otp', { 'totp-otp--empty': !secret }]">{{ otp }}</div>
    </div>
    <div class="totp-clock">
      <svg viewBox="0 0 100 100" class="totp-svg">
        <circle r="42" cx="50" cy="50" class="totp-svg-bg" />
        <circle
          r="42" cx="50" cy="50"
          class="totp-svg-fg"
          :style="{
            strokeDashoffset: dashOffset,
            stroke: remainColor,
          }"
        />
      </svg>
      <div class="totp-remain">
        <span :style="{ color: remainColor }" class="totp-remain-num">{{ remain }}</span>
        <span class="totp-remain-unit">秒</span>
      </div>
    </div>
  </div>

  <div class="totp-actions">
    <button
      v-if="secret && otp !== 'Error'"
      class="vp-custom-btn vp-custom-btn--secondary"
      @click="copyOTP"
    >
      {{ copied ? '已复制' : '复制验证码' }}
    </button>
  </div>

  <p v-if="error" class="totp-error">{{ error }}</p>
</div>

<div class="keygen-card">
  <div class="totp-field">
    <label class="totp-label">TOTP密钥生成</label>
  </div>
  <div class="totp-options">
    <label class="totp-opt-item">
      <span>长度</span>
      <select v-model="keyBits" class="totp-select">
        <option :value="128">128 位（16 字节）</option>
        <option :value="160">160 位（20 字节）</option>
        <option :value="256" selected>256 位（32 字节，推荐）</option>
        <option :value="512">512 位（64 字节）</option>
      </select>
    </label>
    <label class="totp-opt-item">
      <span>格式</span>
      <select v-model="keyFormat" class="totp-select">
        <option value="base32">Base32(默认)</option>
        <option value="base64">Base64</option>
        <option value="hex">HEX</option>
      </select>
    </label>
  </div>

  <div class="keygen-output">
    <div class="keygen-label">生成的密钥</div>
    <div :class="['keygen-key', { 'keygen-key--empty': !generatedKey }]">{{ generatedKey || '------' }}</div>
  </div>

  <div class="keygen-actions">
    <button class="vp-custom-btn vp-custom-btn--secondary" @click="generateAndCopyKey">{{ keyCopied ? '已复制' : '生成并复制' }}</button>
  </div>
</div>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";

/* ====== Base32 ====== */
const B32 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

function base32Decode(str) {
  const clean = str.replace(/=+$/, "").toUpperCase();
  const bytes = [];
  let buf = 0, bits = 0;
  for (const ch of clean) {
    const val = B32.indexOf(ch);
    if (val === -1) throw new Error(`无效字符: ${ch}`);
    buf = (buf << 5) | val;
    bits += 5;
    if (bits >= 8) {
      bits -= 8;
      bytes.push((buf >> bits) & 0xff);
    }
  }
  return new Uint8Array(bytes);
}

function base32Encode(bytes) {
  let result = "";
  let buf = 0, bits = 0;
  for (const b of bytes) {
    buf = (buf << 8) | b;
    bits += 8;
    while (bits >= 5) {
      bits -= 5;
      result += B32[(buf >> bits) & 0x1f];
    }
  }
  if (bits > 0) {
    result += B32[(buf << (5 - bits)) & 0x1f];
  }
  return result;
}

/* ====== Base64 / HEX ====== */
function base64Decode(str) {
  const bin = atob(str.replace(/=+$/, ""));
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

function base64Encode(bytes) {
  return btoa(String.fromCharCode(...bytes));
}

function hexDecode(str) {
  const clean = str.replace(/\s/g, "");
  if (clean.length % 2 !== 0) throw new Error("HEX 字符串长度必须为偶数");
  const bytes = new Uint8Array(clean.length / 2);
  for (let i = 0; i < clean.length; i += 2) {
    bytes[i / 2] = parseInt(clean.substring(i, i + 2), 16);
  }
  return bytes;
}

function hexEncode(bytes) {
  return Array.from(bytes, b => b.toString(16).padStart(2, "0").toUpperCase()).join("");
}

function decodeKey(str, fmt) {
  if (fmt === "base64") return base64Decode(str);
  if (fmt === "hex") return hexDecode(str);
  return base32Decode(str);
}

function encodeKey(bytes, fmt) {
  if (fmt === "base64") return base64Encode(bytes);
  if (fmt === "hex") return hexEncode(bytes);
  return base32Encode(bytes);
}

/* ====== TOTP ====== */
const HMAC_ALGO = { "SHA-1": "SHA-1", "SHA-256": "SHA-256", "SHA-512": "SHA-512" };

function counterBytes(n) {
  const buf = new ArrayBuffer(8);
  const dv = new DataView(buf);
  dv.setUint32(0, Math.floor(n / 0x100000000));
  dv.setUint32(4, n >>> 0);
  return buf;
}

async function generateTOTP(secret, algo, digits, period, fmt) {
  if (!secret) return null;
  const keyBytes = decodeKey(secret, fmt || "base32");
  const counter = Math.floor(Date.now() / 1000 / period);

  const cryptoKey = await crypto.subtle.importKey(
    "raw", keyBytes,
    { name: "HMAC", hash: algo },
    false, ["sign"]
  );
  const hmac = await crypto.subtle.sign("HMAC", cryptoKey, counterBytes(counter));
  const hmacBytes = new Uint8Array(hmac);
  const offset = hmacBytes[hmacBytes.length - 1] & 0x0f;
  const binary =
    ((hmacBytes[offset] & 0x7f) << 24) |
    ((hmacBytes[offset + 1] & 0xff) << 16) |
    ((hmacBytes[offset + 2] & 0xff) << 8) |
    (hmacBytes[offset + 3] & 0xff);
  return String(binary % 10 ** digits).padStart(digits, "0");
}

/* ====== otpauth URI parser ====== */
function parseURI(text) {
  const m = text.match(/^otpauth:\/\/totp\//i);
  if (!m) return null;
  try {
    const u = new URL(text);
    const params = u.searchParams;
    const s = params.get("secret");
    if (!s) return null;
    const algo = (params.get("algorithm") || "SHA1").toUpperCase().replace(/^SHA$/, "SHA-1").replace(/^SHA(\d)$/, "SHA-$1");
    return {
      secret: s,
      algorithm: algo,
      digits: parseInt(params.get("digits")) || 6,
      period: parseInt(params.get("period")) || 30,
    };
  } catch {
    return null;
  }
}

/* ====== State ====== */
const input = ref("");
const algorithm = ref("SHA-1");
const period = ref(30);
const digits = ref(6);

const secret = ref("");
const otp = ref("------");
const remain = ref("--");
const error = ref("");
const copied = ref(false);

/* ====== Key Generator State ====== */
const keyBits = ref(256);
const generatedKey = ref("");
const keyCopied = ref(false);

const inputFormat = ref("base32");
const keyFormat = ref("base32");

let timer = null;

/* ====== URL query params ====== */
function readURLParams() {
  if (typeof window === "undefined") return;
  const p = new URLSearchParams(window.location.search);
  const s = p.get("secret");
  if (s) {
    input.value = s;
    secret.value = s;
  }
}

/* ====== Paste handler ====== */
function onPaste(e) {
  const text = (e.clipboardData || window.clipboardData).getData("text");
  if (parseURI(text)) {
    e.preventDefault();
    input.value = text;
    error.value = "";
  }
}

/* ====== Copy ====== */
async function copyOTP() {
  try {
    await navigator.clipboard.writeText(otp.value);
    copied.value = true;
    setTimeout(() => { copied.value = false; }, 1500);
  } catch {
    // fallback
    const ta = document.createElement("textarea");
    ta.value = otp.value;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    copied.value = true;
    setTimeout(() => { copied.value = false; }, 1500);
  }
}

/* ====== Key Generator ====== */
function generateKey() {
  const bytes = new Uint8Array(keyBits.value / 8);
  crypto.getRandomValues(bytes);
  generatedKey.value = encodeKey(bytes, keyFormat.value);
  keyCopied.value = false;
}

async function copyKey() {
  try {
    await navigator.clipboard.writeText(generatedKey.value);
    keyCopied.value = true;
    setTimeout(() => { keyCopied.value = false; }, 1500);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = generatedKey.value;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    keyCopied.value = true;
    setTimeout(() => { keyCopied.value = false; }, 1500);
  }
}

async function generateAndCopyKey() {
  generateKey();
  /* small delay to let generateKey update the ref */
  await new Promise(r => setTimeout(r, 0));
  await copyKey();
}

/* ====== Computed ====== */
const circumference = 2 * Math.PI * 42;

const dashOffset = computed(() => {
  if (!secret.value) return circumference;
  const p = period.value;
  const r = parseInt(remain.value) || 0;
  return circumference * (1 - r / p);
});

const remainRatio = computed(() => {
  if (!secret.value || remain.value === "--") return 1;
  const p = period.value;
  const r = parseInt(remain.value) || 0;
  return p > 0 ? r / p : 1;
});

const remainColor = computed(() => {
  const r = remainRatio.value;
  if (r > 0.5) return "#4caf50";
  if (r > 0.25) return "#ff9800";
  return "#e53e3e";
});

const keyFormatLabel = computed(() => {
  const labels = { base32: "Base32", base64: "Base64", hex: "HEX" };
  return labels[keyFormat.value] || "Base32";
});

/* ====== Refresh ====== */
async function refresh() {
  if (!secret.value) {
    otp.value = "------";
    remain.value = "--";
    error.value = "";
    return;
  }
  try {
    otp.value = await generateTOTP(secret.value, algorithm.value, digits.value, period.value, inputFormat.value);
    error.value = "";
  } catch (e) {
    otp.value = "Error";
    if (e.message?.includes("无效字符")) {
      error.value = "密钥包含无效字符，请检查密钥格式是否正确";
    } else if (e.message?.includes("HEX")) {
      error.value = e.message;
    } else {
      error.value = "生成失败，请检查密钥是否正确";
    }
  }
  const p = period.value;
  remain.value = p - Math.floor(Date.now() / 1000) % p;
}

/* ====== Watchers ====== */
watch(algorithm, refresh);
watch(period, refresh);
watch(digits, refresh);
watch(inputFormat, refresh);

watch(input, (val) => {
  const parsed = parseURI(val);
  if (parsed) {
    inputFormat.value = "base32";
    secret.value = parsed.secret;
    algorithm.value = HMAC_ALGO[parsed.algorithm] || "SHA-1";
    period.value = parsed.period;
    digits.value = parsed.digits;
  } else {
    secret.value = val;
  }
  refresh();
});

/* ====== Lifecycle ====== */
onMounted(() => {
  readURLParams();
  refresh();
  timer = setInterval(refresh, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style lang="scss" scoped>
.totp-card,
.keygen-card {
  background: var(--vp-c-bg-soft);
  border-radius: 14px;
  padding: 1.4rem 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid var(--vp-c-border);
}
.totp-card {
  margin-bottom: 1.25rem;
}

/* ---- Input ---- */
.totp-field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.totp-field .totp-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  letter-spacing: 0.02em;
}

.totp-input {
  padding: 0.65rem 0.8rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  font-size: 0.9rem;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.totp-input:focus {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-rgb, 66,133,244), 0.12);
}

/* ---- Options row ---- */
.totp-options {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.totp-opt-item {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  padding: 0.35rem 0.6rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-border);
  cursor: pointer;
  transition: border-color 0.2s;
}
.totp-opt-item:hover {
  border-color: var(--vp-c-text-3);
}
.totp-opt-item:focus-within {
  border-color: var(--vp-c-brand);
}

.totp-opt-item em {
  font-style: normal;
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  margin-left: 0.1rem;
}

.totp-select {
  margin-left: auto;
  border: none;
  background: transparent;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  outline: none;
  cursor: pointer;
}

/* ---- Body (OTP + Clock) ---- */
.totp-body {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1rem 1.2rem;
  border: 1px solid var(--vp-c-border);
}

.totp-otp-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.15rem;
  min-width: 0;
}

.totp-otp-section .totp-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--vp-c-text-3);
  letter-spacing: 0.03em;
}

.totp-otp,
.keygen-key {
  font-size: clamp(1.2rem, 2vw, 1.7rem);
  font-weight: 700;
  overflow-wrap: anywhere;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-brand);
  line-height: 1.3;
  transition: color 0.3s;
}
.totp-otp--empty,
.keygen-key--empty {
  color: var(--vp-c-text-3);
}

/* ---- Clock (SVG circle) ---- */
.totp-clock {
  position: relative;
  width: 72px;
  height: 72px;
  flex-shrink: 0;
}

.totp-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.totp-svg-bg {
  fill: none;
  stroke: var(--vp-c-bg-mute);
  stroke-width: 5;
}

.totp-svg-fg {
  fill: none;
  stroke-width: 5;
  stroke-linecap: round;
  stroke-dasharray: 263.89;
  transition: stroke-dashoffset 0.4s ease, stroke 0.4s ease;
}

.totp-remain {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 1.1;
}

.totp-remain-num {
  font-size: 1.15rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-1);
}

.totp-remain-unit {
  font-size: 0.6rem;
  font-weight: 500;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
}

.totp-actions,
.keygen-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

/* ---- Error ---- */
.totp-error {
  font-size: 0.8rem;
  color: #e53e3e;
  margin: -0.25rem 0 0;
  padding: 0.4rem 0.6rem;
  background: rgba(229, 62, 62, 0.06);
  border-radius: 6px;
}

.keygen-output {
  background: var(--vp-c-bg);
  border-radius: 10px;
  padding: 0.65rem 0.85rem;
  border: 1px solid var(--vp-c-border);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.keygen-output .keygen-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--vp-c-text-3);
}

.vp-custom-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.55rem 1.4rem;
  border: none;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
  -webkit-tap-highlight-color: transparent;
  user-select: none;

  &:active {
    transform: scale(0.96);
  }

  &--primary {
    background: var(--vp-c-accent-bg);
    color: #fff;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12);

    &:hover {
      opacity: 0.88;
      box-shadow: 0 2px 8px rgba(0,0,0,0.18);
    }
  }

  &--secondary {
    background: transparent;
    color: var(--vp-c-accent);
    border: 1.5px solid var(--vp-c-border);

    &:hover {
      background: var(--vp-c-accent-soft);
      border-color: var(--vp-c-accent-bg);
    }
  }
}
</style>