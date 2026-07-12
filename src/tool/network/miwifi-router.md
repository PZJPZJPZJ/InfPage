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
    <label class="miwifi-label">固件下载器</label>
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
        <option value="STA">稳定版</option>
        <option value="DEV">开发版</option>
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
            <span>{{ item.version || '未知版本' }}</span>
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

const snString = ref("");
const pwdCopied = ref(false);

const routerCode = ref("");
const routerList = ref([]);
const firmwareType = ref("STA");
const firmwareList = ref([]);
const firmwareLoading = ref(false);
const firmwareError = ref("");
const miwifiDataUrl = "https://www.miwifi.com/statics/json/index.json";

const pwdString = computed(() => {
  const sn = snString.value.trim();
  return sn ? calculate(sn) : "--------";
});
const canCopyPwd = computed(() => Boolean(snString.value.trim() && pwdString.value !== "--------"));
const normalizedRouterCode = computed(() => routerCode.value.trim().toUpperCase());
const firmwareApiUrl = computed(() => {
  return `https://api.miwifi.com/upgrade/log/list?typeList=${normalizedRouterCode.value}${firmwareType.value}`;
});
const routerSelectPlaceholder = computed(() => {
  if (!routerList.value.length) return "正在加载";
  return "选择路由器型号";
});
const firmwareStatus = computed(() => {
  if (firmwareLoading.value) return "正在获取固件列表...";
  if (firmwareError.value) return firmwareError.value;
  if (normalizedRouterCode.value && !firmwareList.value.length) return "暂无固件列表";
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
  }, 1500);
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
  script.src = miwifiDataUrl;
  script.async = true;
  script.onload = () => {
    if (Array.isArray(window.downloadList)) {
      setRouterList(window.downloadList);
    } else {
      firmwareError.value = "官方型号列表暂不可用";
    }
  };
  script.onerror = () => {
    firmwareError.value = "官方型号列表加载失败";
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

  const callbackName = `miwifiFirmware_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  const script = document.createElement("script");

  firmwareLoading.value = true;
  firmwareError.value = "";
  window[callbackName] = (result) => {
    const list = result?.data?.list;
    firmwareList.value = Array.isArray(list) ? list : [];
    firmwareLoading.value = false;
    if (!firmwareList.value.length) {
      firmwareError.value = "暂无固件列表";
    }
    cleanup();
  };

  script.src = `${firmwareApiUrl.value}&callback=${callbackName}`;
  script.async = true;
  script.onerror = () => {
    firmwareLoading.value = false;
    firmwareError.value = "固件列表加载失败";
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
  if (!time) return "未知日期";
  const date = new Date(time);
  if (Number.isNaN(date.getTime())) return "未知日期";
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

function calculate(sn) {
  const r1d_salt = "A2E371B0-B34B-48A5-8C40-A7133F3B5D88";
  let others_salt = "d44fb0960aa0-a5e6-4a30-250f-6d2df50a";
  others_salt = others_salt.split("-").reverse().join("-");

  const hexcase = 0;
  const chrsz = 8;

  function hex_md5(s) {
    return binl2hex(core_md5(str2binl(s), s.length * chrsz));
  }
  function core_md5(x, len) {
    x[len >> 5] |= 0x80 << (len % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;
    let a = 1732584193,
      b = -271733879,
      c = -1732584194,
      d = 271733878;
    for (let i = 0; i < x.length; i += 16) {
      const olda = a,
        oldb = b,
        oldc = c,
        oldd = d;
      a = md5_ff(a, b, c, d, x[i], 7, -680876936);
      d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
      c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
      b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
      a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
      d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
      c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
      b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
      a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
      d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
      c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
      b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
      a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
      d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
      c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
      b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

      a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
      d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
      c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
      b = md5_gg(b, c, d, a, x[i], 20, -373897302);
      a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
      d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
      c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
      b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
      a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
      d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
      c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
      b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
      a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
      d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
      c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
      b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

      a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
      d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
      c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
      b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
      a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
      d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
      c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
      b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
      a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
      d = md5_hh(d, a, b, c, x[i], 11, -358537222);
      c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
      b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
      a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
      d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
      c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
      b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

      a = md5_ii(a, b, c, d, x[i], 6, -198630844);
      d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
      c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
      b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
      a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
      d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
      c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
      b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
      a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
      d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
      c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
      b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
      a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
      d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
      c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
      b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
      a = safe_add(a, olda);
      b = safe_add(b, oldb);
      c = safe_add(c, oldc);
      d = safe_add(d, oldd);
    }
    return [a, b, c, d];
  }
  function md5_cmn(q, a, b, x, s, t) {
    return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
  }
  function md5_ff(a, b, c, d, x, s, t) {
    return md5_cmn((b & c) | (~b & d), a, b, x, s, t);
  }
  function md5_gg(a, b, c, d, x, s, t) {
    return md5_cmn((b & d) | (c & ~d), a, b, x, s, t);
  }
  function md5_hh(a, b, c, d, x, s, t) {
    return md5_cmn(b ^ c ^ d, a, b, x, s, t);
  }
  function md5_ii(a, b, c, d, x, s, t) {
    return md5_cmn(c ^ (b | ~d), a, b, x, s, t);
  }
  function safe_add(x, y) {
    const lsw = (x & 0xffff) + (y & 0xffff);
    const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
  }
  function bit_rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
  }
  function str2binl(str) {
    const bin = [];
    const mask = (1 << chrsz) - 1;
    for (let i = 0; i < str.length * chrsz; i += chrsz)
      bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
    return bin;
  }
  function binl2hex(binarray) {
    const hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    let str = "";
    for (let i = 0; i < binarray.length * 4; i++) {
      str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xf) +
             hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xf);
    }
    return str;
  }
  
  const salt = sn.indexOf("/") > -1 ? others_salt : r1d_salt;
  return hex_md5(sn + salt).substr(0, 8);
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
