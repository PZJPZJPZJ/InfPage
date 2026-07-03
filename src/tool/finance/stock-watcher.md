---
routeMeta:
  itemTitle: Stock Watcher
  itemDesc: 实时看盘工具
  itemIcon: xueqiu.com
---
<div class="stock-watcher">
  <div class="sw-card sw-toolbar">
    <div class="sw-toolbar-main">
      <label class="sw-field sw-code-field">
        <span class="sw-field-label">股票代码</span>
        <div class="sw-input-wrap">
          <input
            v-model.trim="stockCodeInput"
            class="sw-input"
            type="text"
            inputmode="text"
            placeholder="例如 600000 / sz000001"
            @keyup.enter="addWatchItem"
          />
          <button class="sw-btn sw-btn-primary" type="button" @click="addWatchItem">
            新增自选
          </button>
        </div>
        <span v-if="inputError" class="sw-inline-error">{{ inputError }}</span>
      </label>
      <label class="sw-field sw-interval-field">
        <span class="sw-field-label">刷新频率</span>
        <div class="sw-input-wrap">
          <input
            v-model="refreshIntervalInput"
            class="sw-input sw-input-short"
            type="number"
            min="3"
            max="300"
            step="1"
            @change="commitRefreshInterval"
            @blur="commitRefreshInterval"
            @keyup.enter="commitRefreshInterval"
          />
          <span class="sw-input-suffix">秒</span>
        </div>
      </label>
    </div>
    <div class="sw-toolbar-actions">
      <button
        class="sw-btn sw-btn-secondary"
        type="button"
        :disabled="isRefreshing || !watchlist.length"
        @click="handleManualRefresh"
      >
        {{ isRefreshing ? "刷新中..." : "立即刷新" }}
      </button>
      <button
        class="sw-btn sw-btn-secondary"
        type="button"
        :disabled="!watchlist.length"
        @click="exportConfig"
      >
        导出配置
      </button>
      <button class="sw-btn sw-btn-secondary" type="button" @click="triggerImport">
        导入配置
      </button>
      <input
        ref="fileInputRef"
        class="sw-hidden-input"
        type="file"
        accept=".json,application/json"
        @change="handleImportFile"
      />
    </div>
  </div>
  <div class="sw-card sw-status-bar">
    <div class="sw-status-item">
      <span class="sw-status-label">数据源</span>
      <span class="sw-status-value">{{ currentProvider.label }}</span>
    </div>
    <div class="sw-status-item">
      <span class="sw-status-label">最近刷新</span>
      <span class="sw-status-value">{{ lastRefreshDisplay }}</span>
    </div>
    <div class="sw-status-item">
      <span class="sw-status-label">状态</span>
      <span class="sw-status-value" :class="{ 'is-loading': isRefreshing }">
        {{ isRefreshing ? "行情更新中" : "空闲" }}
      </span>
    </div>
    <div v-if="requestError" class="sw-status-error">
      {{ requestError }}
    </div>
  </div>
  <div v-if="!watchlist.length" class="sw-card sw-empty-state">
    <div class="sw-empty-title">还没有自选股</div>
    <div class="sw-empty-text">
      输入 6 位股票代码或带市场前缀的代码，例如 `600000`、`000001`、`sz300750`，即可开始看盘。
    </div>
  </div>
  <div v-else class="sw-list">
    <div
      v-for="row in watchRows"
      :key="row.item.symbol"
      :class="[
        'sw-card',
        'sw-stock-card',
        priceClass(row.quote),
        highlightedSymbol === row.item.symbol ? 'is-highlighted' : '',
        row.quote?.stale ? 'is-stale' : ''
      ]"
    >
      <div class="sw-stock-main">
        <div class="sw-stock-id">
          <div class="sw-stock-name-row">
            <span class="sw-stock-name">{{ row.quote?.name || "--" }}</span>
            <span class="sw-stock-code">{{ row.item.symbol }}</span>
          </div>
          <div class="sw-stock-meta">
            <span>代码 {{ row.item.code }}</span>
            <span>更新时间 {{ row.quote?.updatedAt || "--" }}</span>
            <span v-if="row.quote?.stale" class="sw-stale-badge">数据可能已过期</span>
          </div>
        </div>
        <div class="sw-stock-price">
          <div class="sw-price">{{ formatPrice(row.quote?.price) }}</div>
          <div class="sw-change-row">
            <span class="sw-change">{{ formatSigned(row.quote?.change) }}</span>
            <span class="sw-change-percent">{{ formatPercent(row.quote?.changePercent) }}</span>
          </div>
        </div>
        <div class="sw-stock-actions">
          <button class="sw-btn sw-btn-ghost" type="button" @click="toggleExpanded(row.item.symbol)">
            {{ isExpanded(row.item.symbol) ? "收起盘口" : "展开盘口" }}
          </button>
          <button class="sw-btn sw-btn-danger" type="button" @click="removeWatchItem(row.item.symbol)">
            删除
          </button>
        </div>
      </div>
      <div class="sw-quick-stats">
        <div class="sw-stat">
          <span class="sw-stat-label">今开</span>
          <span class="sw-stat-value">{{ formatPrice(row.quote?.open) }}</span>
        </div>
        <div class="sw-stat">
          <span class="sw-stat-label">昨收</span>
          <span class="sw-stat-value">{{ formatPrice(row.quote?.preClose) }}</span>
        </div>
        <div class="sw-stat">
          <span class="sw-stat-label">最高</span>
          <span class="sw-stat-value">{{ formatPrice(row.quote?.high) }}</span>
        </div>
        <div class="sw-stat">
          <span class="sw-stat-label">最低</span>
          <span class="sw-stat-value">{{ formatPrice(row.quote?.low) }}</span>
        </div>
        <div class="sw-stat">
          <span class="sw-stat-label">成交量</span>
          <span class="sw-stat-value">{{ formatVolume(row.quote?.volume) }}</span>
        </div>
        <div class="sw-stat">
          <span class="sw-stat-label">成交额</span>
          <span class="sw-stat-value">{{ formatAmountWan(row.quote?.amountWan) }}</span>
        </div>
      </div>
      <div v-if="row.quote?.error" class="sw-item-error">
        {{ row.quote.error }}
      </div>
      <div v-if="isExpanded(row.item.symbol)" class="sw-depth-panel">
        <div class="sw-depth-grid">
          <div class="sw-depth-card sw-depth-card-ask">
            <div class="sw-depth-title">卖盘五档</div>
            <div class="sw-depth-table">
              <div class="sw-depth-head">
                <span>档位</span>
                <span>价格</span>
                <span>数量</span>
              </div>
              <div
                v-for="level in askLevels(row.quote)"
                :key="'ask-' + level.level"
                class="sw-depth-row"
              >
                <span>{{ level.label }}</span>
                <span>{{ formatPrice(level.price) }}</span>
                <span>{{ formatVolume(level.volume) }}</span>
              </div>
            </div>
          </div>
          <div class="sw-depth-card sw-depth-card-bid">
            <div class="sw-depth-title">买盘五档</div>
            <div class="sw-depth-table">
              <div class="sw-depth-head">
                <span>档位</span>
                <span>价格</span>
                <span>数量</span>
              </div>
              <div
                v-for="level in bidLevels(row.quote)"
                :key="'bid-' + level.level"
                class="sw-depth-row"
              >
                <span>{{ level.label }}</span>
                <span>{{ formatPrice(level.price) }}</span>
                <span>{{ formatVolume(level.volume) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";

const STORAGE_KEY = "infpage.stockWatcher.v1";
const DEFAULT_REFRESH_INTERVAL_SEC = 5;
const MIN_REFRESH_INTERVAL_SEC = 3;
const MAX_REFRESH_INTERVAL_SEC = 300;
const REQUEST_TIMEOUT_MS = 10000;

const isBrowser = typeof window !== "undefined";

const stockCodeInput = ref("");
const inputError = ref("");
const requestError = ref("");
const isRefreshing = ref(false);
const lastRefreshAt = ref(null);
const watchlist = ref([]);
const refreshIntervalSec = ref(DEFAULT_REFRESH_INTERVAL_SEC);
const refreshIntervalInput = ref(String(DEFAULT_REFRESH_INTERVAL_SEC));
const providerId = ref("tencent");
const quotesBySymbol = ref({});
const expandedState = ref({});
const highlightedSymbol = ref("");
const fileInputRef = ref(null);

let refreshTimerId = null;
let highlightTimerId = null;
let activeScript = null;
let activeScriptTimeoutId = null;
let queuedRefresh = false;
let disposed = false;

const providers = {
  tencent: {
    id: "tencent",
    label: "腾讯行情",
    loadQuotes: loadTencentQuoteModels,
  },
};

const currentProvider = computed(() => providers[providerId.value] || providers.tencent);

const watchRows = computed(() =>
  watchlist.value.map((item) => ({
    item,
    quote: quotesBySymbol.value[item.symbol] || createEmptyQuote(item.symbol, item.code),
  }))
);

const lastRefreshDisplay = computed(() => {
  if (!lastRefreshAt.value) return "尚未刷新";
  return formatLocalDateTime(lastRefreshAt.value);
});

function createDefaultState() {
  return {
    version: 1,
    provider: "tencent",
    refreshIntervalSec: DEFAULT_REFRESH_INTERVAL_SEC,
    watchlist: [],
  };
}

function sanitizeRefreshInterval(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return DEFAULT_REFRESH_INTERVAL_SEC;
  return Math.min(MAX_REFRESH_INTERVAL_SEC, Math.max(MIN_REFRESH_INTERVAL_SEC, Math.round(parsed)));
}

function toNumber(value) {
  if (value === null || value === undefined || value === "" || value === "-") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function normalizeInputCode(input) {
  const normalized = String(input || "").trim().toLowerCase();

  if (/^(sh|sz|bj)\d{6}$/.test(normalized)) {
    return {
      symbol: normalized,
      code: normalized.slice(2),
    };
  }

  if (/^\d{6}$/.test(normalized)) {
    if (normalized.startsWith("6")) return { symbol: `sh${normalized}`, code: normalized };
    if (normalized.startsWith("0") || normalized.startsWith("3")) {
      return { symbol: `sz${normalized}`, code: normalized };
    }
    if (normalized.startsWith("4") || normalized.startsWith("8")) {
      return { symbol: `bj${normalized}`, code: normalized };
    }
  }

  throw new Error("请输入有效的股票代码，例如 600000、000001 或 sz300750");
}

function parseProviderDateTime(value) {
  if (!/^\d{14}$/.test(String(value || ""))) {
    return {
      time: null,
      updatedAt: null,
    };
  }

  const raw = String(value);
  const year = raw.slice(0, 4);
  const month = raw.slice(4, 6);
  const day = raw.slice(6, 8);
  const hour = raw.slice(8, 10);
  const minute = raw.slice(10, 12);
  const second = raw.slice(12, 14);

  return {
    time: `${hour}:${minute}:${second}`,
    updatedAt: `${year}-${month}-${day} ${hour}:${minute}:${second}`,
  };
}

function createEmptyQuote(symbol, code) {
  return {
    symbol,
    code: code || symbol.replace(/^(sh|sz|bj)/, ""),
    name: null,
    price: null,
    preClose: null,
    open: null,
    high: null,
    low: null,
    change: null,
    changePercent: null,
    volume: null,
    amountWan: null,
    time: null,
    bid1: null,
    bid1Volume: null,
    bid2: null,
    bid2Volume: null,
    bid3: null,
    bid3Volume: null,
    bid4: null,
    bid4Volume: null,
    bid5: null,
    bid5Volume: null,
    ask1: null,
    ask1Volume: null,
    ask2: null,
    ask2Volume: null,
    ask3: null,
    ask3Volume: null,
    ask4: null,
    ask4Volume: null,
    ask5: null,
    ask5Volume: null,
    updatedAt: null,
    stale: false,
    error: null,
  };
}

function parseTencentQuote(symbol, rawText) {
  if (typeof rawText !== "string" || !rawText.trim()) {
    return null;
  }

  const raw = rawText.split("~");
  if (raw.length < 10) {
    return null;
  }

  return {
    symbol,
    name: raw[1] || null,
    code: raw[2] || symbol.replace(/^(sh|sz|bj)/, ""),
    price: toNumber(raw[3]),
    preClose: toNumber(raw[4]),
    open: toNumber(raw[5]),
    volume: toNumber(raw[6]),
    bid1: toNumber(raw[9]),
    bid1Volume: toNumber(raw[10]),
    bid2: toNumber(raw[11]),
    bid2Volume: toNumber(raw[12]),
    bid3: toNumber(raw[13]),
    bid3Volume: toNumber(raw[14]),
    bid4: toNumber(raw[15]),
    bid4Volume: toNumber(raw[16]),
    bid5: toNumber(raw[17]),
    bid5Volume: toNumber(raw[18]),
    ask1: toNumber(raw[19]),
    ask1Volume: toNumber(raw[20]),
    ask2: toNumber(raw[21]),
    ask2Volume: toNumber(raw[22]),
    ask3: toNumber(raw[23]),
    ask3Volume: toNumber(raw[24]),
    ask4: toNumber(raw[25]),
    ask4Volume: toNumber(raw[26]),
    ask5: toNumber(raw[27]),
    ask5Volume: toNumber(raw[28]),
    datetime: raw[30] || null,
    change: toNumber(raw[31]),
    changePercent: toNumber(raw[32]),
    high: toNumber(raw[33]),
    low: toNumber(raw[34]),
    amountWan: toNumber(raw[37]),
  };
}

function toQuoteModel(parsed) {
  if (!parsed) return null;

  const timeInfo = parseProviderDateTime(parsed.datetime);

  return {
    symbol: parsed.symbol,
    code: parsed.code,
    name: parsed.name,
    price: parsed.price,
    preClose: parsed.preClose,
    open: parsed.open,
    high: parsed.high,
    low: parsed.low,
    change: parsed.change,
    changePercent: parsed.changePercent,
    volume: parsed.volume,
    amountWan: parsed.amountWan,
    time: timeInfo.time,
    bid1: parsed.bid1,
    bid1Volume: parsed.bid1Volume,
    bid2: parsed.bid2,
    bid2Volume: parsed.bid2Volume,
    bid3: parsed.bid3,
    bid3Volume: parsed.bid3Volume,
    bid4: parsed.bid4,
    bid4Volume: parsed.bid4Volume,
    bid5: parsed.bid5,
    bid5Volume: parsed.bid5Volume,
    ask1: parsed.ask1,
    ask1Volume: parsed.ask1Volume,
    ask2: parsed.ask2,
    ask2Volume: parsed.ask2Volume,
    ask3: parsed.ask3,
    ask3Volume: parsed.ask3Volume,
    ask4: parsed.ask4,
    ask4Volume: parsed.ask4Volume,
    ask5: parsed.ask5,
    ask5Volume: parsed.ask5Volume,
    updatedAt: timeInfo.updatedAt,
    stale: false,
    error: null,
  };
}

function cleanupActiveScript() {
  if (!isBrowser) return;

  if (activeScriptTimeoutId !== null) {
    window.clearTimeout(activeScriptTimeoutId);
    activeScriptTimeoutId = null;
  }

  if (activeScript) {
    activeScript.onload = null;
    activeScript.onerror = null;
    activeScript.remove();
    activeScript = null;
  }
}

function loadTencentQuotes(symbols) {
  return new Promise((resolve, reject) => {
    if (!isBrowser) {
      reject(new Error("当前环境不支持浏览器行情请求"));
      return;
    }

    const uniqueSymbols = Array.from(new Set(symbols.filter(Boolean)));
    if (!uniqueSymbols.length) {
      resolve({});
      return;
    }

    cleanupActiveScript();

    const query = uniqueSymbols.join(",");
    const script = document.createElement("script");
    const url = `https://qt.gtimg.cn/q=${query}&_=${Date.now()}`;

    activeScript = script;
    script.async = true;
    script.charset = "gb18030";
    script.src = url;

    const finish = () => {
      if (activeScript === script) {
        activeScript = null;
      }

      if (activeScriptTimeoutId !== null) {
        window.clearTimeout(activeScriptTimeoutId);
        activeScriptTimeoutId = null;
      }

      script.onload = null;
      script.onerror = null;
      script.remove();
    };

    activeScriptTimeoutId = window.setTimeout(() => {
      finish();
      reject(new Error("行情请求超时，请稍后重试"));
    }, REQUEST_TIMEOUT_MS);

    script.onload = () => {
      const payload = {};

      uniqueSymbols.forEach((symbol) => {
        const variableName = `v_${symbol}`;
        payload[symbol] = typeof window[variableName] === "string" ? window[variableName] : "";

        try {
          delete window[variableName];
        } catch (error) {
          window[variableName] = undefined;
        }
      });

      finish();
      resolve(payload);
    };

    script.onerror = () => {
      finish();
      reject(new Error("行情脚本加载失败，请检查网络后重试"));
    };

    document.body.appendChild(script);
  });
}

async function loadTencentQuoteModels(symbols) {
  const payload = await loadTencentQuotes(symbols);
  const models = {};

  symbols.forEach((symbol) => {
    const parsed = parseTencentQuote(symbol, payload[symbol]);
    if (parsed) {
      models[symbol] = toQuoteModel(parsed);
      return;
    }

    const empty = createEmptyQuote(symbol);
    empty.stale = true;
    empty.error = "该股票暂未返回有效行情数据";
    models[symbol] = empty;
  });

  return models;
}

function saveState() {
  if (!isBrowser) return;

  const state = {
    version: 1,
    provider: providerId.value,
    refreshIntervalSec: sanitizeRefreshInterval(refreshIntervalSec.value),
    watchlist: watchlist.value.map((item) => ({
      symbol: item.symbol,
      code: item.code,
      addedAt: item.addedAt,
    })),
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function sanitizeImportedState(candidate) {
  const fallback = createDefaultState();

  if (!candidate || typeof candidate !== "object") {
    return fallback;
  }

  if (candidate.version !== 1) {
    throw new Error("暂不支持该版本的配置文件");
  }

  const provider = candidate.provider === "tencent" ? candidate.provider : fallback.provider;
  const sanitizedWatchlist = [];
  const seen = new Set();
  const rawWatchlist = Array.isArray(candidate.watchlist) ? candidate.watchlist : [];

  rawWatchlist.forEach((item) => {
    try {
      const normalized = normalizeInputCode(item?.symbol || item?.code || "");
      if (seen.has(normalized.symbol)) return;
      seen.add(normalized.symbol);
      sanitizedWatchlist.push({
        symbol: normalized.symbol,
        code: normalized.code,
        addedAt: typeof item?.addedAt === "string" ? item.addedAt : new Date().toISOString(),
      });
    } catch (error) {
      // Skip invalid imported items.
    }
  });

  return {
    version: 1,
    provider,
    refreshIntervalSec: sanitizeRefreshInterval(candidate.refreshIntervalSec),
    watchlist: sanitizedWatchlist,
  };
}

function loadState() {
  if (!isBrowser) return createDefaultState();

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return createDefaultState();

  try {
    const parsed = JSON.parse(raw);
    return sanitizeImportedState(parsed);
  } catch (error) {
    return createDefaultState();
  }
}

function applyState(state) {
  providerId.value = state.provider;
  watchlist.value = state.watchlist;
  refreshIntervalSec.value = sanitizeRefreshInterval(state.refreshIntervalSec);
  refreshIntervalInput.value = String(refreshIntervalSec.value);
}

function restartRefreshTimer() {
  if (!isBrowser) return;

  if (refreshTimerId !== null) {
    window.clearInterval(refreshTimerId);
    refreshTimerId = null;
  }

  if (!watchlist.value.length) {
    return;
  }

  refreshTimerId = window.setInterval(() => {
    void refreshQuotes();
  }, refreshIntervalSec.value * 1000);
}

async function refreshQuotes() {
  if (!watchlist.value.length) {
    requestError.value = "";
    return;
  }

  if (isRefreshing.value) {
    queuedRefresh = true;
    return;
  }

  const symbols = watchlist.value.map((item) => item.symbol);
  const provider = currentProvider.value;

  isRefreshing.value = true;
  requestError.value = "";

  try {
    const freshQuotes = await provider.loadQuotes(symbols);
    if (disposed) return;

    const nextQuotes = { ...quotesBySymbol.value };
    symbols.forEach((symbol) => {
      if (freshQuotes[symbol]) {
        nextQuotes[symbol] = freshQuotes[symbol];
      }
    });

    quotesBySymbol.value = nextQuotes;
    lastRefreshAt.value = new Date().toISOString();
  } catch (error) {
    requestError.value = error instanceof Error ? error.message : "行情刷新失败";

    const nextQuotes = { ...quotesBySymbol.value };
    watchlist.value.forEach((item) => {
      const current = nextQuotes[item.symbol] || createEmptyQuote(item.symbol, item.code);
      nextQuotes[item.symbol] = {
        ...current,
        stale: true,
        error: current.error || "本次刷新失败，已保留上次成功数据",
      };
    });

    quotesBySymbol.value = nextQuotes;
  } finally {
    isRefreshing.value = false;
    if (!disposed && queuedRefresh) {
      queuedRefresh = false;
      void refreshQuotes();
    }
  }
}

function flashSymbol(symbol) {
  highlightedSymbol.value = symbol;

  if (!isBrowser) return;

  if (highlightTimerId !== null) {
    window.clearTimeout(highlightTimerId);
  }

  highlightTimerId = window.setTimeout(() => {
    highlightedSymbol.value = "";
    highlightTimerId = null;
  }, 1800);
}

async function addWatchItem() {
  inputError.value = "";

  try {
    const normalized = normalizeInputCode(stockCodeInput.value);
    const exists = watchlist.value.find((item) => item.symbol === normalized.symbol);

    if (exists) {
      inputError.value = "该股票已在自选列表中";
      flashSymbol(normalized.symbol);
      return;
    }

    watchlist.value = [
      ...watchlist.value,
      {
        symbol: normalized.symbol,
        code: normalized.code,
        addedAt: new Date().toISOString(),
      },
    ];

    stockCodeInput.value = "";
    saveState();
    restartRefreshTimer();
    flashSymbol(normalized.symbol);
    void refreshQuotes();
  } catch (error) {
    inputError.value = error instanceof Error ? error.message : "股票代码格式不正确";
  }
}

function removeWatchItem(symbol) {
  watchlist.value = watchlist.value.filter((item) => item.symbol !== symbol);

  const nextExpanded = { ...expandedState.value };
  delete nextExpanded[symbol];
  expandedState.value = nextExpanded;

  const nextQuotes = { ...quotesBySymbol.value };
  delete nextQuotes[symbol];
  quotesBySymbol.value = nextQuotes;

  if (!watchlist.value.length) {
    requestError.value = "";
    lastRefreshAt.value = null;
  }

  saveState();
  restartRefreshTimer();
}

function isExpanded(symbol) {
  return Boolean(expandedState.value[symbol]);
}

function toggleExpanded(symbol) {
  expandedState.value = {
    ...expandedState.value,
    [symbol]: !expandedState.value[symbol],
  };
}

function commitRefreshInterval() {
  const sanitized = sanitizeRefreshInterval(refreshIntervalInput.value);
  refreshIntervalSec.value = sanitized;
  refreshIntervalInput.value = String(sanitized);
  saveState();
  restartRefreshTimer();
}

function handleManualRefresh() {
  void refreshQuotes();
}

function triggerImport() {
  if (!isBrowser) return;
  fileInputRef.value?.click();
}

function buildExportFileName() {
  const now = new Date();
  const pad = (value) => String(value).padStart(2, "0");

  return [
    "stock-watcher-config-",
    now.getFullYear(),
    pad(now.getMonth() + 1),
    pad(now.getDate()),
    "-",
    pad(now.getHours()),
    pad(now.getMinutes()),
    pad(now.getSeconds()),
    ".json",
  ].join("");
}

function exportConfig() {
  if (!isBrowser) return;

  const payload = {
    version: 1,
    provider: providerId.value,
    refreshIntervalSec: sanitizeRefreshInterval(refreshIntervalSec.value),
    watchlist: watchlist.value.map((item) => ({
      symbol: item.symbol,
      code: item.code,
      addedAt: item.addedAt,
    })),
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json;charset=utf-8",
  });
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = buildExportFileName();
  anchor.click();

  window.URL.revokeObjectURL(url);
}

async function handleImportFile(event) {
  const input = event.target;
  const file = input?.files?.[0];

  if (!file) return;

  try {
    const text = await file.text();
    const parsed = JSON.parse(text);
    const nextState = sanitizeImportedState(parsed);

    applyState(nextState);
    quotesBySymbol.value = {};
    expandedState.value = {};
    inputError.value = "";
    requestError.value = "";

    saveState();
    restartRefreshTimer();
    void refreshQuotes();
  } catch (error) {
    requestError.value = error instanceof Error ? error.message : "导入配置失败";
  } finally {
    if (input) {
      input.value = "";
    }
  }
}

function priceClass(quote) {
  if (!quote) return "is-flat";
  const change = toNumber(quote.change);
  if (change === null || change === 0) return "is-flat";
  return change > 0 ? "is-up" : "is-down";
}

function formatPrice(value) {
  const parsed = toNumber(value);
  if (parsed === null) return "--";
  return parsed.toFixed(2);
}

function formatSigned(value) {
  const parsed = toNumber(value);
  if (parsed === null) return "--";
  const sign = parsed > 0 ? "+" : "";
  return `${sign}${parsed.toFixed(2)}`;
}

function formatPercent(value) {
  const parsed = toNumber(value);
  if (parsed === null) return "--";
  const sign = parsed > 0 ? "+" : "";
  return `${sign}${parsed.toFixed(2)}%`;
}

function formatVolume(value) {
  const parsed = toNumber(value);
  if (parsed === null) return "--";
  return `${parsed.toLocaleString("zh-CN")} 手`;
}

function formatAmountWan(value) {
  const parsed = toNumber(value);
  if (parsed === null) return "--";
  return `${parsed.toLocaleString("zh-CN")} 万`;
}

function formatLocalDateTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "--";

  return date.toLocaleString("zh-CN", {
    hour12: false,
  });
}

function askLevels(quote) {
  return [
    { level: 5, label: "卖五", price: quote?.ask5, volume: quote?.ask5Volume },
    { level: 4, label: "卖四", price: quote?.ask4, volume: quote?.ask4Volume },
    { level: 3, label: "卖三", price: quote?.ask3, volume: quote?.ask3Volume },
    { level: 2, label: "卖二", price: quote?.ask2, volume: quote?.ask2Volume },
    { level: 1, label: "卖一", price: quote?.ask1, volume: quote?.ask1Volume },
  ];
}

function bidLevels(quote) {
  return [
    { level: 1, label: "买一", price: quote?.bid1, volume: quote?.bid1Volume },
    { level: 2, label: "买二", price: quote?.bid2, volume: quote?.bid2Volume },
    { level: 3, label: "买三", price: quote?.bid3, volume: quote?.bid3Volume },
    { level: 4, label: "买四", price: quote?.bid4, volume: quote?.bid4Volume },
    { level: 5, label: "买五", price: quote?.bid5, volume: quote?.bid5Volume },
  ];
}

onMounted(() => {
  const state = loadState();
  applyState(state);
  restartRefreshTimer();

  if (watchlist.value.length) {
    void refreshQuotes();
  }
});

onUnmounted(() => {
  disposed = true;
  cleanupActiveScript();

  if (!isBrowser) return;

  if (refreshTimerId !== null) {
    window.clearInterval(refreshTimerId);
    refreshTimerId = null;
  }

  if (highlightTimerId !== null) {
    window.clearTimeout(highlightTimerId);
    highlightTimerId = null;
  }
});
</script>

<style scoped>
.stock-watcher {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.sw-card {
  background:
    radial-gradient(circle at top right, rgba(207, 35, 56, 0.06), transparent 32%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(247, 248, 250, 0.96));
  border: 1px solid rgba(148, 163, 184, 0.22);
  border-radius: 18px;
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.06);
}

[data-theme="dark"] .sw-card {
  background:
    radial-gradient(circle at top right, rgba(248, 113, 113, 0.12), transparent 28%),
    linear-gradient(180deg, rgba(19, 24, 34, 0.96), rgba(13, 17, 23, 0.98));
  border-color: rgba(148, 163, 184, 0.16);
  box-shadow: 0 18px 36px rgba(0, 0, 0, 0.28);
}

.sw-toolbar {
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
}

.sw-toolbar-main {
  flex: 1 1 540px;
  display: grid;
  grid-template-columns: minmax(280px, 2.2fr) minmax(180px, 1fr);
  gap: 0.9rem;
}

.sw-toolbar-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 0.65rem;
}

.sw-field {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.sw-field-label {
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-2);
}

.sw-input-wrap {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.sw-input {
  flex: 1;
  min-width: 0;
  padding: 0.82rem 0.95rem;
  border-radius: 12px;
  border: 1px solid var(--vp-c-border);
  background: rgba(255, 255, 255, 0.86);
  color: var(--vp-c-text-1);
  font-size: 0.95rem;
  transition: border-color 0.18s ease, box-shadow 0.18s ease, background-color 0.18s ease;
}

[data-theme="dark"] .sw-input {
  background: rgba(30, 41, 59, 0.72);
}

.sw-input:focus {
  outline: none;
  border-color: #d43d51;
  box-shadow: 0 0 0 4px rgba(212, 61, 81, 0.14);
}

.sw-input-short {
  max-width: 120px;
}

.sw-input-suffix {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.sw-inline-error {
  font-size: 0.82rem;
  color: #cf2338;
}

.sw-btn {
  border: none;
  border-radius: 12px;
  padding: 0.78rem 1rem;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.16s ease, opacity 0.16s ease, box-shadow 0.16s ease, background-color 0.16s ease;
  white-space: nowrap;
}

.sw-btn:hover:not(:disabled) {
  transform: translateY(-1px);
}

.sw-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.sw-btn-primary {
  background: linear-gradient(135deg, #cf2338, #f97316);
  color: #fff;
  box-shadow: 0 10px 20px rgba(207, 35, 56, 0.2);
}

.sw-btn-secondary {
  background: rgba(148, 163, 184, 0.12);
  color: var(--vp-c-text-1);
  border: 1px solid rgba(148, 163, 184, 0.2);
}

.sw-btn-ghost {
  background: rgba(59, 130, 246, 0.08);
  color: #2563eb;
}

[data-theme="dark"] .sw-btn-ghost {
  color: #93c5fd;
}

.sw-btn-danger {
  background: rgba(207, 35, 56, 0.1);
  color: #cf2338;
}

.sw-hidden-input {
  display: none;
}

.sw-status-bar {
  padding: 0.95rem 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem 1.2rem;
  align-items: center;
}

.sw-status-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 180px;
}

.sw-status-label {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
}

.sw-status-value {
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.sw-status-value.is-loading {
  color: #cf2338;
}

.sw-status-error {
  color: #cf2338;
  font-size: 0.88rem;
  font-weight: 600;
}

.sw-empty-state {
  padding: 1.35rem 1.2rem;
}

.sw-empty-title {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
}

.sw-empty-text {
  margin-top: 0.45rem;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}

.sw-list {
  display: flex;
  flex-direction: column;
  gap: 0.95rem;
}

.sw-stock-card {
  padding: 1rem;
  position: relative;
  overflow: hidden;
}

.sw-stock-card::before {
  content: "";
  position: absolute;
  inset: 0 auto 0 0;
  width: 5px;
  border-radius: 18px 0 0 18px;
  background: rgba(148, 163, 184, 0.35);
}

.sw-stock-card.is-up::before {
  background: linear-gradient(180deg, #ef4444, #fb7185);
}

.sw-stock-card.is-down::before {
  background: linear-gradient(180deg, #16a34a, #4ade80);
}

.sw-stock-card.is-flat::before {
  background: linear-gradient(180deg, #64748b, #94a3b8);
}

.sw-stock-card.is-highlighted {
  box-shadow:
    0 0 0 2px rgba(212, 61, 81, 0.28),
    0 18px 36px rgba(15, 23, 42, 0.12);
}

.sw-stock-card.is-stale {
  opacity: 0.9;
}

.sw-stock-main {
  display: grid;
  grid-template-columns: minmax(220px, 2fr) minmax(120px, 0.8fr) auto;
  gap: 1rem;
  align-items: center;
}

.sw-stock-name-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
}

.sw-stock-name {
  font-size: 1.12rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.sw-stock-code {
  font-size: 0.85rem;
  padding: 0.22rem 0.55rem;
  border-radius: 999px;
  background: rgba(148, 163, 184, 0.12);
  color: var(--vp-c-text-2);
  font-family: "JetBrains Mono", "Consolas", monospace;
}

.sw-stock-meta {
  margin-top: 0.45rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem 0.8rem;
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
}

.sw-stale-badge {
  color: #cf2338;
  font-weight: 700;
}

.sw-stock-price {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.3rem;
  font-variant-numeric: tabular-nums;
}

.sw-price {
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1;
}

.sw-change-row {
  display: flex;
  gap: 0.55rem;
  font-size: 0.95rem;
  font-weight: 700;
}

.sw-stock-actions {
  display: flex;
  gap: 0.6rem;
  justify-content: flex-end;
  flex-wrap: wrap;
}

.sw-quick-stats {
  margin-top: 0.95rem;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 0.7rem;
}

.sw-stat {
  padding: 0.72rem 0.8rem;
  border-radius: 14px;
  background: rgba(148, 163, 184, 0.08);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

[data-theme="dark"] .sw-stat {
  background: rgba(51, 65, 85, 0.5);
}

.sw-stat-label {
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
}

.sw-stat-value {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  font-variant-numeric: tabular-nums;
}

.sw-item-error {
  margin-top: 0.8rem;
  color: #cf2338;
  font-size: 0.85rem;
  font-weight: 600;
}

.sw-depth-panel {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px dashed rgba(148, 163, 184, 0.35);
}

.sw-depth-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9rem;
}

.sw-depth-card {
  border-radius: 16px;
  padding: 0.9rem;
  background: rgba(255, 255, 255, 0.54);
  border: 1px solid rgba(148, 163, 184, 0.18);
}

[data-theme="dark"] .sw-depth-card {
  background: rgba(30, 41, 59, 0.48);
}

.sw-depth-card-ask {
  box-shadow: inset 0 0 0 1px rgba(239, 68, 68, 0.08);
}

.sw-depth-card-bid {
  box-shadow: inset 0 0 0 1px rgba(22, 163, 74, 0.08);
}

.sw-depth-title {
  font-size: 0.95rem;
  font-weight: 800;
  margin-bottom: 0.7rem;
  color: var(--vp-c-text-1);
}

.sw-depth-table {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-variant-numeric: tabular-nums;
}

.sw-depth-head,
.sw-depth-row {
  display: grid;
  grid-template-columns: 70px 1fr 1fr;
  gap: 0.6rem;
  align-items: center;
}

.sw-depth-head {
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
  padding: 0 0.2rem 0.15rem;
}

.sw-depth-row {
  padding: 0.6rem 0.7rem;
  border-radius: 12px;
  background: rgba(148, 163, 184, 0.08);
  font-size: 0.88rem;
  color: var(--vp-c-text-1);
}

.sw-stock-card.is-up .sw-price,
.sw-stock-card.is-up .sw-change,
.sw-stock-card.is-up .sw-change-percent {
  color: #dc2626;
}

.sw-stock-card.is-down .sw-price,
.sw-stock-card.is-down .sw-change,
.sw-stock-card.is-down .sw-change-percent {
  color: #16a34a;
}

.sw-stock-card.is-flat .sw-price,
.sw-stock-card.is-flat .sw-change,
.sw-stock-card.is-flat .sw-change-percent {
  color: var(--vp-c-text-1);
}

@media (max-width: 980px) {
  .sw-toolbar-main {
    grid-template-columns: 1fr;
  }

  .sw-stock-main {
    grid-template-columns: 1fr;
  }

  .sw-stock-price {
    align-items: flex-start;
  }

  .sw-stock-actions {
    justify-content: flex-start;
  }

  .sw-quick-stats {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .sw-toolbar {
    padding: 0.9rem;
  }

  .sw-toolbar-actions {
    width: 100%;
  }

  .sw-toolbar-actions .sw-btn {
    flex: 1 1 calc(50% - 0.33rem);
  }

  .sw-input-wrap {
    flex-wrap: wrap;
  }

  .sw-code-field .sw-btn-primary {
    width: 100%;
  }

  .sw-quick-stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .sw-depth-grid {
    grid-template-columns: 1fr;
  }

  .sw-depth-head,
  .sw-depth-row {
    grid-template-columns: 64px 1fr 1fr;
  }
}
</style>
