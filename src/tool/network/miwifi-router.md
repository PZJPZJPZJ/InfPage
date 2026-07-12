---
routeMeta:
  itemTitle: MiWiFi
  itemDesc: 小米路由器工具
  itemIcon: www.miwifi.com
---
# 小米路由器工具
<div class="miwifi-card">
  <div class="miwifi-field">
    <label class="miwifi-label">SSH/Telnet密码计算</label>
    <input
      class="miwifi-input"
      type="text"
      placeholder="输入小米路由器SN，如 12345/A1B2C3D4E"
      v-model="snString"
    />
  </div>
  <div class="miwifi-output">
    <div class="miwifi-output-label">SSH/Telnet密码</div>
    <div :class="['miwifi-result', { 'miwifi-result--empty': !snString }]">{{ pwdString }}</div>
  </div>
  <div class="miwifi-actions">
    <button
      class="vp-custom-btn vp-custom-btn--secondary"
      :disabled="!canCopyPwd"
      @click="copyPwd"
    >
      {{ pwdCopied ? '已复制' : '复制密码' }}
    </button>
  </div>
</div>

<div class="miwifi-card">
  <div class="miwifi-field">
    <label class="miwifi-label">历史固件下载器</label>
  </div>
  <div class="miwifi-options">
    <label class="miwifi-opt-item">
      <span>型号</span>
      <select class="miwifi-select" v-model="routerCode" :disabled="!routerList.length">
        <option value="">{{ routerSelectPlaceholder }}</option>
        <option
          v-for="router in routerList"
          :key="router.model"
          :value="router.model"
        >
          {{ router.title }} ({{ router.model }})
        </option>
      </select>
    </label>
    <label class="miwifi-opt-item">
      <span>版本</span>
      <select class="miwifi-select" v-model="firmwareType">
        <option
          v-for="type in FIRMWARE_TYPE_OPTIONS"
          :key="type.value"
          :value="type.value"
        >
          {{ type.label }}
        </option>
      </select>
    </label>
  </div>
  <div v-if="firmwareStatus" class="miwifi-status">{{ firmwareStatus }}</div>
  <div v-if="firmwareList.length" class="firmware-list">
    <article
      v-for="item in firmwareList"
      :key="`${item.realType}-${item.version}-${item.time}`"
      class="firmware-item"
    >
      <div class="firmware-head">
        <div>
          <div class="firmware-title">{{ item.title || item.type }}</div>
          <div class="firmware-meta">
            <span>{{ item.version || UNKNOWN_VERSION_TEXT }}</span>
            <span>{{ formatDate(item.time) }}</span>
          </div>
        </div>
        <a
          v-if="item.url"
          class="vp-custom-btn vp-custom-btn--secondary firmware-download"
          :href="normalizeUrl(item.url)"
          target="_blank"
        >
          下载固件
        </a>
      </div>
      <div v-if="parseContents(item.contents).length" class="firmware-content">
        <template v-for="(block, index) in parseContents(item.contents)" :key="index">
          <div v-if="block.type === 'title'" class="firmware-subtitle">{{ block.text }}</div>
          <p v-else-if="block.type === 'paragraph'" class="firmware-paragraph">{{ block.text }}</p>
          <ol v-else class="firmware-changes">
            <li v-for="(text, idx) in block.items" :key="idx">{{ text }}</li>
          </ol>
        </template>
      </div>
    </article>
  </div>
</div>

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
.miwifi-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 14px;
  padding: 1.4rem 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.miwifi-field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.miwifi-label {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.miwifi-input {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
  outline: none;
  padding: 0.65rem 0.8rem;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    border-color: var(--vp-c-brand);
    box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-rgb, 66,133,244), 0.12);
  }
}

.miwifi-options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.miwifi-opt-item {
  align-items: center;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  display: flex;
  flex: 1;
  font-size: 0.82rem;
  gap: 0.4rem;
  min-width: 220px;
  padding: 0.35rem 0.6rem;
  transition: border-color 0.2s;

  &:hover {
    border-color: var(--vp-c-text-3);
  }

  &:focus-within {
    border-color: var(--vp-c-brand);
  }
}

.miwifi-select {
  background: transparent;
  border: none;
  color: var(--vp-c-text-1);
  cursor: pointer;
  flex: 1;
  font-size: 0.85rem;
  font-weight: 600;
  margin-left: auto;
  min-width: 0;
  outline: none;
}

.miwifi-output {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.65rem 0.85rem;
}

.miwifi-output-label {
  color: var(--vp-c-text-3);
  font-size: 0.75rem;
  font-weight: 500;
}

.miwifi-result {
  color: var(--vp-c-brand);
  font-size: clamp(1rem, 2vw, 1.5rem);
  font-weight: 700;
  line-height: 1.3;
  overflow-wrap: anywhere;
}

.miwifi-result--empty {
  color: var(--vp-c-text-3);
}

.miwifi-status {
  color: var(--vp-c-text-2);
  font-size: 0.82rem;
}

.miwifi-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.vp-custom-btn {
  align-items: center;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: inline-flex;
  font-size: 0.85rem;
  font-weight: 600;
  justify-content: center;
  padding: 0.55rem 1.4rem;
  text-decoration: none;
  transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
  user-select: none;
  white-space: nowrap;

  &:active {
    transform: scale(0.96);
  }

  &:disabled,
  &--disabled {
    cursor: not-allowed;
    opacity: 0.45;
    pointer-events: none;
  }

  &--secondary {
    background: transparent;
    border: 1.5px solid var(--vp-c-border);
    color: var(--vp-c-accent);

    &:hover {
      background: var(--vp-c-accent-soft);
      border-color: var(--vp-c-accent-bg);
    }
  }
}

.firmware-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.firmware-item {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 10px;
  padding: 0.85rem;
}

.firmware-head {
  align-items: flex-start;
  display: flex;
  gap: 0.75rem;
  justify-content: space-between;
}

.firmware-title {
  color: var(--vp-c-text-1);
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.35;
}

.firmware-meta {
  color: var(--vp-c-text-3);
  display: flex;
  flex-wrap: wrap;
  font-size: 0.78rem;
  gap: 0.6rem;
  margin-top: 0.2rem;
}

.firmware-download {
  flex-shrink: 0;
  padding-inline: 0.85rem;
}

.firmware-content {
  border-top: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-top: 0.75rem;
  padding-top: 0.75rem;
}

.firmware-subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  font-weight: 700;
  margin-top: 0.2rem;
}

.firmware-paragraph {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  line-height: 1.7;
  margin: 0;
}

.firmware-changes {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  line-height: 1.7;
  margin: 0;
  padding-left: 1.25rem;
}

@media (max-width: 640px) {
  .firmware-head {
    flex-direction: column;
  }
}
</style>
