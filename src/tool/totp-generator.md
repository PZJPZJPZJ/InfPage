# 动态验证码生成器

<div class="totp-card">
  <div class="totp-field">
    <label class="totp-label">密钥（读取URL的secret参数）</label>
    <input
      v-model="input"
      placeholder="输入 Base32 密钥，或粘贴 otpauth:// 链接自动解析"
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
  </div>

  <div class="totp-body">
    <div class="totp-otp-section">
      <div class="totp-label">验证码</div>
      <div :class="['totp-otp', { 'totp-otp--empty': !secret }]">{{ otp }}</div>
      <div class="totp-copy-wrap">
        <button
          v-if="secret && otp !== 'Error'"
          class="totp-copy"
          @click="copyOTP"
        >
          {{ copied ? '已复制' : '复制' }}
        </button>
      </div>
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

  <p v-if="error" class="totp-error">{{ error }}</p>
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

/* ====== TOTP ====== */
const HMAC_ALGO = { "SHA-1": "SHA-1", "SHA-256": "SHA-256", "SHA-512": "SHA-512" };

function counterBytes(n) {
  const buf = new ArrayBuffer(8);
  const dv = new DataView(buf);
  dv.setUint32(0, Math.floor(n / 0x100000000));
  dv.setUint32(4, n >>> 0);
  return buf;
}

async function generateTOTP(secret, algo, digits, period) {
  if (!secret) return null;
  const keyBytes = base32Decode(secret);
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

/* ====== Refresh ====== */
async function refresh() {
  if (!secret.value) {
    otp.value = "------";
    error.value = "";
    return;
  }
  try {
    otp.value = await generateTOTP(secret.value, algorithm.value, digits.value, period.value);
    error.value = "";
  } catch (e) {
    otp.value = "Error";
    if (e.message?.includes("无效字符")) {
      error.value = "密钥包含无效字符，请检查 Base32 编码";
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

watch(input, (val) => {
  const parsed = parseURI(val);
  if (parsed) {
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

<style scoped>
.totp-card {
  background: var(--vp-c-bg-soft);
  border-radius: 14px;
  padding: 1.4rem 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  border: 1px solid var(--vp-c-border);
}

/* ---- Input ---- */
.totp-field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.totp-field .totp-label {
  font-size: 0.78rem;
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

.totp-otp {
  font-size: 2.6rem;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.1em;
  color: var(--vp-c-brand);
  line-height: 1.2;
  font-family: "SF Mono", "Cascadia Code", "Consolas", "JetBrains Mono", monospace;
  transition: color 0.3s;
}
.totp-otp--empty {
  color: var(--vp-c-text-3);
  font-weight: 600;
  letter-spacing: normal;
}

/* ---- Copy button ---- */
.totp-copy-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.3rem;
}

.totp-copy {
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 5px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
  line-height: 1.6;
}
.totp-copy:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  background: color-mix(in srgb, var(--vp-c-brand) 6%, var(--vp-c-bg));
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

/* ---- Error ---- */
.totp-error {
  font-size: 0.8rem;
  color: #e53e3e;
  margin: -0.25rem 0 0;
  padding: 0.4rem 0.6rem;
  background: rgba(229, 62, 62, 0.06);
  border-radius: 6px;
}
</style>