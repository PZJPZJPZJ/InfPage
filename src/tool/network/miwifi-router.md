---
routeMeta:
  itemTitle: MiWiFi
  itemDesc: 小米路由器工具
  itemIcon: www.miwifi.com
---
# 小米路由器工具
<section class="vp-custom-surface miwifi-app" aria-label="小米路由器工具">
  <header class="vp-custom-glass-card miwifi-hero">
    <div>
      <p class="miwifi-eyebrow">MIWIFI TOOLKIT</p>
      <p class="miwifi-hero-title">路由器维护</p>
      <p class="miwifi-hero-desc">根据设备序列号计算管理密码，或从官方接口查询对应型号的历史固件。</p>
    </div>
    <div class="miwifi-hero-tags" aria-label="工具能力">
      <span>本地计算</span>
      <span>官方固件</span>
    </div>
  </header>
  <div class="miwifi-layout">
    <section class="vp-custom-glass-card miwifi-card miwifi-password-card" aria-labelledby="miwifi-password-title">
      <div class="miwifi-card-head">
        <div>
          <p class="miwifi-kicker">设备访问</p>
          <p id="miwifi-password-title" class="miwifi-section-title">SSH / Telnet 密码</p>
          <p class="miwifi-section-desc">输入机身标签上的 SN，密码会在浏览器中即时计算。</p>
        </div>
      </div>
      <form class="miwifi-password-form" @submit.prevent="copyPwd">
        <label class="miwifi-label" for="miwifi-sn">路由器序列号</label>
        <input
          id="miwifi-sn"
          v-model="snString"
          class="vp-custom-control miwifi-input"
          type="text"
          autocomplete="off"
          autocapitalize="characters"
          spellcheck="false"
          placeholder="例如 12345/A1B2C3D4E"
          aria-describedby="miwifi-sn-help"
        >
        <p id="miwifi-sn-help" class="miwifi-field-help">序列号仅用于本地计算，不会发送到服务器。</p>
        <div class="vp-custom-glass-muted miwifi-output" aria-live="polite">
          <div class="miwifi-output-copy">
            <span class="miwifi-output-label">计算结果</span>
            <strong :class="['miwifi-result', { 'miwifi-result--empty': !snString.trim() }]">{{ pwdString }}</strong>
          </div>
          <button
            class="vp-custom-button vp-custom-button-primary miwifi-copy"
            type="submit"
            :disabled="!canCopyPwd"
          >
            {{ pwdCopied ? '已复制' : '复制密码' }}
          </button>
        </div>
      </form>
    </section>
    <section class="vp-custom-glass-card miwifi-card miwifi-firmware-card" aria-labelledby="miwifi-firmware-title">
      <div class="miwifi-card-head miwifi-firmware-headline">
        <div>
          <p class="miwifi-kicker">系统恢复</p>
          <p id="miwifi-firmware-title" class="miwifi-section-title">历史固件下载</p>
          <p class="miwifi-section-desc">选择设备型号与固件通道，查看版本记录和更新内容。</p>
        </div>
      </div>
      <div class="miwifi-options">
        <label class="miwifi-option" for="miwifi-router-model">
          <span>设备型号</span>
          <select
            id="miwifi-router-model"
            v-model="routerCode"
            class="vp-custom-control miwifi-select"
            :disabled="!routerList.length"
          >
            <option value="">{{ routerSelectPlaceholder }}</option>
            <option v-for="router in routerList" :key="router.model" :value="router.model">
              {{ router.title }} ({{ router.model }})
            </option>
          </select>
        </label>
        <label class="miwifi-option" for="miwifi-firmware-type">
          <span>固件通道</span>
          <select id="miwifi-firmware-type" v-model="firmwareType" class="vp-custom-control miwifi-select">
            <option v-for="type in FIRMWARE_TYPE_OPTIONS" :key="type.value" :value="type.value">
              {{ type.label }}
            </option>
          </select>
        </label>
      </div>
      <div
        v-if="firmwareStatus"
        class="vp-custom-status miwifi-status"
        :class="{ 'vp-custom-status-error': firmwareError && firmwareError !== STATUS_TEXT.emptyFirmware }"
        :role="firmwareError && firmwareError !== STATUS_TEXT.emptyFirmware ? 'alert' : 'status'"
        aria-live="polite"
      >
        <span v-if="firmwareLoading" class="miwifi-spinner" aria-hidden="true"></span>
        <span>{{ firmwareStatus }}</span>
      </div>
      <div v-else-if="!routerCode" class="miwifi-empty">
        <div class="miwifi-router-glyph" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <strong>先选择你的路由器</strong>
        <p>固件版本、发布日期与更新日志会显示在这里。</p>
      </div>
      <div v-if="firmwareList.length" class="firmware-list" aria-live="polite">
        <article
          v-for="item in firmwareList"
          :key="`${item.realType}-${item.version}-${item.time}`"
          class="vp-custom-glass-muted firmware-item"
        >
          <div class="firmware-head">
            <div class="firmware-summary">
              <span class="firmware-version">{{ item.version || UNKNOWN_VERSION_TEXT }}</span>
              <p class="firmware-title">{{ item.title || item.type }}</p>
              <p class="firmware-meta">
                <span>{{ formatDate(item.time) }}</span>
                <span>{{ firmwareType === 'DEV' ? '开发版' : '稳定版' }}</span>
              </p>
            </div>
            <a
              v-if="item.url"
              class="vp-custom-button vp-custom-button-secondary firmware-download"
              :href="normalizeUrl(item.url)"
              target="_blank"
              rel="noopener noreferrer"
            >下载固件</a>
          </div>
          <div v-if="parseContents(item.contents).length" class="firmware-content">
            <template v-for="(block, index) in parseContents(item.contents)" :key="index">
              <p v-if="block.type === 'title'" class="firmware-subtitle">{{ block.text }}</p>
              <p v-else-if="block.type === 'paragraph'" class="firmware-paragraph">{{ block.text }}</p>
              <ol v-else class="firmware-changes">
                <li v-for="(text, idx) in block.items" :key="idx">{{ text }}</li>
              </ol>
            </template>
          </div>
        </article>
      </div>
    </section>
  </div>
</section>

<script setup>
import { computed, onMounted, ref, watch } from "vue";

const MIWIFI_DATA_URL = "https://www.miwifi.com/statics/json/index.json";
const FIRMWARE_LOG_API_URL = "https://api.miwifi.com/upgrade/log/list";
const DEFAULT_FIRMWARE_TYPE = "STA";
const FIRMWARE_TYPE_OPTIONS = [
  { value: "STA", label: "稳定版" },
  { value: "DEV", label: "开发版" },
];
const JSONP_CALLBACK_PARAM = "callback";
const JSONP_CALLBACK_PREFIX = "miwifiFirmware";
const COPY_FEEDBACK_MS = 1500;
const PASSWORD_EMPTY_TEXT = "--------";
const ROUTER_SELECT_PLACEHOLDER = "选择路由器型号";
const R1D_SALT = "A2E371B0-B34B-48A5-8C40-A7133F3B5D88";
const OTHER_SALT = "d44fb0960aa0-a5e6-4a30-250f-6d2df50a".split("-").reverse().join("-");
const UNKNOWN_VERSION_TEXT = "未知版本";
const UNKNOWN_DATE_TEXT = "未知日期";
const STATUS_TEXT = {
  routerLoading: "正在加载",
  firmwareLoading: "正在获取固件列表...",
  emptyFirmware: "暂无固件列表",
  routerUnavailable: "官方型号列表暂不可用",
  routerLoadFailed: "官方型号列表加载失败",
  firmwareLoadFailed: "固件列表加载失败",
};

const snString = ref("");
const pwdCopied = ref(false);

const routerCode = ref("");
const routerList = ref([]);
const firmwareType = ref(DEFAULT_FIRMWARE_TYPE);
const firmwareList = ref([]);
const firmwareLoading = ref(false);
const firmwareError = ref("");

const pwdString = computed(() => {
  const sn = snString.value.trim();
  return sn ? calculate(sn) : PASSWORD_EMPTY_TEXT;
});
const canCopyPwd = computed(() => Boolean(snString.value.trim() && pwdString.value !== PASSWORD_EMPTY_TEXT));
const normalizedRouterCode = computed(() => routerCode.value.trim().toUpperCase());
const firmwareApiUrl = computed(() => {
  return `${FIRMWARE_LOG_API_URL}?typeList=${normalizedRouterCode.value}${firmwareType.value}`;
});
const routerSelectPlaceholder = computed(() => {
  if (!routerList.value.length) return STATUS_TEXT.routerLoading;
  return ROUTER_SELECT_PLACEHOLDER;
});
const firmwareStatus = computed(() => {
  if (firmwareLoading.value) return STATUS_TEXT.firmwareLoading;
  if (firmwareError.value) return firmwareError.value;
  if (normalizedRouterCode.value && !firmwareList.value.length) return STATUS_TEXT.emptyFirmware;
  return "";
});

async function copyText(text, onDone) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }

  onDone.value = true;
  setTimeout(() => {
    onDone.value = false;
  }, COPY_FEEDBACK_MS);
}

function copyPwd() {
  if (!canCopyPwd.value) return;
  copyText(pwdString.value, pwdCopied);
}

onMounted(() => {
  loadRouterList();
});

watch([normalizedRouterCode, firmwareType], () => {
  firmwareList.value = [];
  firmwareError.value = "";
  if (normalizedRouterCode.value) {
    loadFirmwareList();
  }
});

function loadRouterList() {
  if (typeof window === "undefined") return;

  if (Array.isArray(window.downloadList)) {
    setRouterList(window.downloadList);
    return;
  }

  const script = document.createElement("script");
  script.src = MIWIFI_DATA_URL;
  script.async = true;
  script.onload = () => {
    if (Array.isArray(window.downloadList)) {
      setRouterList(window.downloadList);
    } else {
      firmwareError.value = STATUS_TEXT.routerUnavailable;
    }
  };
  script.onerror = () => {
    firmwareError.value = STATUS_TEXT.routerLoadFailed;
  };

  document.head.appendChild(script);
}

function setRouterList(downloadList) {
  const modelMap = new Map();

  for (const item of downloadList) {
    const model = String(item?.model ?? "").trim().toUpperCase();
    const title = String(item?.title ?? item?.name ?? "").trim();
    if (!model || !title || modelMap.has(model)) continue;

    modelMap.set(model, {
      model,
      title: title.replace(/\s+/g, " "),
    });
  }

  routerList.value = Array.from(modelMap.values());
}

function loadFirmwareList() {
  if (typeof window === "undefined" || !normalizedRouterCode.value) return;

  const callbackName = `${JSONP_CALLBACK_PREFIX}_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  const script = document.createElement("script");

  firmwareLoading.value = true;
  firmwareError.value = "";
  window[callbackName] = (result) => {
    const list = result?.data?.list;
    firmwareList.value = Array.isArray(list) ? list : [];
    firmwareLoading.value = false;
    if (!firmwareList.value.length) {
      firmwareError.value = STATUS_TEXT.emptyFirmware;
    }
    cleanup();
  };

  script.src = `${firmwareApiUrl.value}&${JSONP_CALLBACK_PARAM}=${callbackName}`;
  script.async = true;
  script.onerror = () => {
    firmwareLoading.value = false;
    firmwareError.value = STATUS_TEXT.firmwareLoadFailed;
    cleanup();
  };

  function cleanup() {
    delete window[callbackName];
    script.remove();
  }

  document.head.appendChild(script);
}

function normalizeUrl(url) {
  if (!url) return "";
  return url.startsWith("http:") ? `https:${url.slice(5)}` : url;
}

function formatDate(time) {
  if (!time) return UNKNOWN_DATE_TEXT;
  const date = new Date(time);
  if (Number.isNaN(date.getTime())) return UNKNOWN_DATE_TEXT;
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function parseContents(html) {
  if (typeof window === "undefined" || !html) return [];

  const doc = new DOMParser().parseFromString(html, "text/html");
  const blocks = [];

  for (const node of doc.body.children) {
    const text = node.textContent?.trim();
    if (!text) continue;

    if (node.tagName === "OL" || node.tagName === "UL") {
      const items = Array.from(node.querySelectorAll("li"))
        .map((item) => item.textContent?.trim())
        .filter(Boolean);
      if (items.length) blocks.push({ type: "list", items });
    } else if (node.classList.contains("logtlt")) {
      blocks.push({ type: "title", text });
    } else {
      blocks.push({ type: "paragraph", text });
    }
  }

  return blocks;
}

function md5(input) {
  const add = (x, y) => (x + y) | 0;
  const rotate = (x, n) => (x << n) | (x >>> (32 - n));
  const shifts = [
    7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
    5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
    4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
    6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
  ];
  const table = Array.from({ length: 64 }, (_, i) => Math.floor(Math.abs(Math.sin(i + 1)) * 2 ** 32));
  const words = [];

  for (let i = 0; i < input.length; i += 1) {
    words[i >> 2] |= (input.charCodeAt(i) & 0xff) << ((i % 4) * 8);
  }
  words[input.length >> 2] |= 0x80 << ((input.length % 4) * 8);
  words[(((input.length + 8) >> 6) + 1) * 16 - 2] = input.length * 8;

  let a = 0x67452301;
  let b = 0xefcdab89;
  let c = 0x98badcfe;
  let d = 0x10325476;

  for (let i = 0; i < words.length; i += 16) {
    const aa = a;
    const bb = b;
    const cc = c;
    const dd = d;

    for (let j = 0; j < 64; j += 1) {
      let f;
      let g;
      if (j < 16) {
        f = (b & c) | (~b & d);
        g = j;
      } else if (j < 32) {
        f = (d & b) | (~d & c);
        g = (5 * j + 1) % 16;
      } else if (j < 48) {
        f = b ^ c ^ d;
        g = (3 * j + 5) % 16;
      } else {
        f = c ^ (b | ~d);
        g = (7 * j) % 16;
      }

      const next = d;
      d = c;
      c = b;
      b = add(b, rotate(add(add(a, f), add(table[j], words[i + g] || 0)), shifts[j]));
      a = next;
    }

    a = add(a, aa);
    b = add(b, bb);
    c = add(c, cc);
    d = add(d, dd);
  }

  return [a, b, c, d]
    .map((value) => {
      return Array.from({ length: 4 }, (_, i) => ((value >>> (i * 8)) & 0xff).toString(16).padStart(2, "0")).join("");
    })
    .join("");
}

function calculate(sn) {
  const salt = sn.includes("/") ? OTHER_SALT : R1D_SALT;

  return md5(sn + salt).slice(0, 8);
}
</script>

<style lang="scss" scoped>
.miwifi-app {
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding: 2px 0 28px;
}

.miwifi-hero {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: clamp(18px, 2.5vw, 28px);
}

.miwifi-eyebrow,
.miwifi-hero-title,
.miwifi-hero-desc,
.miwifi-kicker,
.miwifi-section-title,
.miwifi-section-desc,
.miwifi-field-help,
.miwifi-empty p,
.firmware-title,
.firmware-meta,
.firmware-subtitle,
.firmware-paragraph {
  margin: 0;
}

.miwifi-eyebrow {
  color: var(--vp-custom-accent);
  font-size: 0.72rem;
  font-weight: 750;
}

.miwifi-hero-title {
  color: var(--vp-custom-text-1);
  font-size: clamp(1.45rem, 3vw, 2.15rem);
  font-weight: 760;
  line-height: 1.2;
  margin-top: 6px;
}

.miwifi-hero-desc {
  color: var(--vp-custom-text-2);
  font-size: 0.93rem;
  line-height: 1.7;
  margin-top: 8px;
  max-width: 660px;
}

.miwifi-hero-tags {
  display: flex;
  flex-shrink: 0;
  gap: 8px;
}

.miwifi-hero-tags span {
  border: 1px solid var(--vp-custom-glass-border);
  border-radius: 999px;
  color: var(--vp-custom-text-2);
  font-size: 0.76rem;
  font-weight: 650;
  padding: 6px 10px;
  background: var(--vp-custom-glass-muted);
  box-shadow: inset 0 1px 0 var(--vp-custom-highlight);
}

.miwifi-layout {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.miwifi-card {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 22px;
  min-width: 0;
  padding: clamp(18px, 2.5vw, 28px);
  width: 100%;
}

.miwifi-card-head {
  align-items: flex-start;
  display: flex;
}

.miwifi-kicker {
  color: var(--vp-custom-text-3);
  font-size: 0.72rem;
  font-weight: 700;
}

.miwifi-section-title {
  color: var(--vp-custom-text-1);
  font-size: 1.12rem;
  font-weight: 750;
  line-height: 1.35;
  margin-top: 2px;
}

.miwifi-section-desc {
  color: var(--vp-custom-text-2);
  font-size: 0.83rem;
  line-height: 1.65;
  margin-top: 5px;
}

.miwifi-password-form {
  display: flex;
  flex-direction: column;
}

.miwifi-label,
.miwifi-option > span {
  color: var(--vp-custom-text-2);
  font-size: 0.78rem;
  font-weight: 680;
  margin-bottom: 7px;
}

.miwifi-input,
.miwifi-select {
  box-sizing: border-box;
  width: 100%;
}

.miwifi-input {
  font-family: var(--vp-font-family-mono);
  font-size: 0.88rem;
  padding: 0 13px;
  text-transform: uppercase;
}

.miwifi-field-help {
  color: var(--vp-custom-text-3);
  font-size: 0.74rem;
  line-height: 1.55;
  margin-top: 7px;
}

.miwifi-output {
  align-items: center;
  border: 1px solid var(--vp-custom-glass-border);
  border-radius: 13px;
  display: flex;
  gap: 14px;
  justify-content: space-between;
  margin-top: 20px;
  padding: 14px;
}

.miwifi-output-copy {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.miwifi-output-label {
  color: var(--vp-custom-text-3);
  font-size: 0.72rem;
  font-weight: 650;
}

.miwifi-result {
  color: var(--vp-custom-accent);
  font-family: var(--vp-font-family-mono);
  font-size: clamp(1.25rem, 3vw, 1.7rem);
  font-weight: 760;
  line-height: 1.3;
  overflow-wrap: anywhere;
}

.miwifi-result--empty {
  color: var(--vp-custom-text-3);
}

.miwifi-copy {
  flex: 0 0 auto;
  min-width: 96px;
}

.miwifi-options {
  display: grid;
  gap: 12px;
  grid-template-columns: minmax(220px, 1.6fr) minmax(130px, 0.7fr);
}

.miwifi-option {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.miwifi-select {
  cursor: pointer;
  font-size: 0.84rem;
  font-weight: 620;
  padding: 0 36px 0 12px;
}

.miwifi-status {
  align-items: center;
  display: flex;
  font-size: 0.82rem;
  gap: 9px;
}

.miwifi-spinner {
  border: 2px solid color-mix(in srgb, var(--vp-custom-accent) 22%, transparent);
  border-radius: 50%;
  border-top-color: var(--vp-custom-accent);
  flex: 0 0 16px;
  height: 16px;
  width: 16px;
  animation: miwifi-spin 700ms linear infinite;
}

.miwifi-empty {
  align-items: center;
  border: 1px dashed color-mix(in srgb, var(--vp-custom-text-3) 35%, transparent);
  border-radius: 13px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 166px;
  padding: 20px;
  text-align: center;
  background: color-mix(in srgb, var(--vp-custom-glass-muted) 60%, transparent);
}

.miwifi-empty strong {
  color: var(--vp-custom-text-2);
  font-size: 0.88rem;
  margin-top: 14px;
}

.miwifi-empty p {
  color: var(--vp-custom-text-3);
  font-size: 0.76rem;
  line-height: 1.6;
  margin-top: 4px;
}

.miwifi-router-glyph {
  align-items: flex-end;
  border: 1px solid var(--vp-custom-glass-border);
  border-radius: 9px;
  display: flex;
  gap: 5px;
  height: 30px;
  justify-content: flex-end;
  padding: 0 9px 7px;
  position: relative;
  width: 54px;
  background: var(--vp-custom-glass-strong);
  box-shadow: inset 0 1px 0 var(--vp-custom-highlight);
}

.miwifi-router-glyph::before,
.miwifi-router-glyph::after {
  background: var(--vp-custom-text-3);
  border-radius: 2px;
  content: '';
  height: 17px;
  position: absolute;
  top: -10px;
  width: 2px;
}

.miwifi-router-glyph::before {
  left: 8px;
}

.miwifi-router-glyph::after {
  right: 8px;
}

.miwifi-router-glyph span {
  background: var(--vp-custom-accent);
  border-radius: 50%;
  height: 4px;
  width: 4px;
}

.firmware-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.firmware-item {
  border: 1px solid var(--vp-custom-glass-border);
  border-radius: 13px;
  padding: 15px;
}

.firmware-head {
  align-items: flex-start;
  display: flex;
  gap: 14px;
  justify-content: space-between;
}

.firmware-summary {
  min-width: 0;
}

.firmware-version {
  border: 1px solid color-mix(in srgb, var(--vp-custom-accent) 26%, var(--vp-custom-glass-border));
  border-radius: 6px;
  color: var(--vp-custom-accent);
  display: inline-flex;
  font-family: var(--vp-font-family-mono);
  font-size: 0.73rem;
  font-weight: 700;
  line-height: 1.2;
  max-width: 100%;
  overflow-wrap: anywhere;
  padding: 4px 7px;
  background: color-mix(in srgb, var(--vp-custom-accent) 7%, transparent);
}

.firmware-title {
  color: var(--vp-custom-text-1);
  font-size: 0.94rem;
  font-weight: 720;
  line-height: 1.45;
  margin-top: 8px;
}

.firmware-meta {
  color: var(--vp-custom-text-3);
  display: flex;
  flex-wrap: wrap;
  font-size: 0.74rem;
  gap: 13px;
  margin-top: 4px;
}

.firmware-meta span + span::before {
  content: '·';
  margin-right: 13px;
}

.firmware-download {
  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  justify-content: center;
  text-decoration: none;
  white-space: nowrap;
}

.firmware-content {
  border-top: 1px solid var(--vp-custom-glass-border);
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 14px;
  padding-top: 13px;
}

.firmware-subtitle {
  color: var(--vp-custom-text-1);
  font-size: 0.82rem;
  font-weight: 700;
  margin-top: 3px;
}

.firmware-paragraph,
.firmware-changes {
  color: var(--vp-custom-text-2);
  font-size: 0.8rem;
  line-height: 1.7;
}

.firmware-changes {
  margin: 0;
  padding-left: 1.25rem;
}

@keyframes miwifi-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 720px) {
  .miwifi-app {
    gap: 18px;
  }

  .miwifi-hero {
    gap: 14px;
  }

  .miwifi-card {
    gap: 19px;
  }

  .miwifi-options {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 520px) {
  .miwifi-hero-tags {
    flex-wrap: wrap;
  }

  .miwifi-output,
  .firmware-head {
    align-items: stretch;
    flex-direction: column;
  }

  .miwifi-copy,
  .firmware-download {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .miwifi-spinner {
    animation-duration: 1.5s;
  }
}
</style>
