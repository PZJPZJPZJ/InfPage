---
routeMeta:
  itemTitle: Stock Watcher
  itemDesc: 实时看盘工具
  itemIcon: xueqiu.com
---
# 实时看盘工具
<div class="stock-watcher">
  <div v-if="!watchlist.length" class="sw-card sw-empty-state">
    <div class="sw-empty-title">还没有自选股</div>
    <div class="sw-empty-text">
      输入 6 位股票或 ETF 代码，或带市场前缀的代码，例如 `600000`、`510300`、`159915`、`sz300750`，即可开始看盘。
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
      @click="toggleExpanded(row.item.symbol)"
    >
      <div class="sw-stock-main">
        <div class="sw-stock-top">
          <div class="sw-stock-id">
            <div class="sw-stock-name-row">
              <span class="sw-stock-name">{{ row.quote?.name || "--" }}</span>
              <span class="sw-stock-code">{{ row.item.symbol }}</span>
              <span :class="['sw-stock-code', isQuoteExpired(row.quote) ? 'is-expired' : '']">
                {{ formatQuoteBadge(row.quote) }}
              </span>
            </div>
          </div>
          <div class="sw-stock-price">
            <span class="sw-change">{{ formatSigned(row.quote, "change") }}</span>
            <span class="sw-change-percent">{{ formatPercent(row.quote?.changePercent) }}</span>
            <div class="sw-price">{{ formatPrice(row.quote, "price") }}</div>
          </div>
        </div>
        <div v-if="editMode" class="sw-stock-actions" @click.stop>
          <button class="sw-btn sw-btn-ghost" type="button" :disabled="isFirstItem(row.item.symbol)" @click="moveWatchItem(row.item.symbol, -1)">
            上移
          </button>
          <button class="sw-btn sw-btn-ghost" type="button" :disabled="isLastItem(row.item.symbol)" @click="moveWatchItem(row.item.symbol, 1)">
            下移
          </button>
          <button class="sw-btn sw-btn-ghost" type="button" :disabled="isFirstItem(row.item.symbol)" @click="moveWatchItemTo(row.item.symbol, 0)">
            置顶
          </button>
          <button class="sw-btn sw-btn-ghost" type="button" :disabled="isLastItem(row.item.symbol)" @click="moveWatchItemTo(row.item.symbol, watchlist.length - 1)">
            置底
          </button>
          <button class="sw-btn sw-btn-danger" type="button" @click="removeWatchItem(row.item.symbol)">
            删除
          </button>
        </div>
      </div>
      <div v-if="row.quote?.error" class="sw-item-error">
        {{ row.quote.error }}
      </div>
      <div v-if="isExpanded(row.item.symbol)" class="sw-depth-panel" @click.stop>
        <div class="sw-depth-card sw-info-table-card">
          <div class="sw-info-table">
            <div class="sw-info-row"><span class="sw-info-label">今开</span><span class="sw-info-value">{{ formatPrice(row.quote, "open") }}</span></div>
            <div class="sw-info-row"><span class="sw-info-label">昨收</span><span class="sw-info-value">{{ formatPrice(row.quote, "preClose") }}</span></div>
            <div class="sw-info-row"><span class="sw-info-label">最高</span><span class="sw-info-value">{{ formatPrice(row.quote, "high") }}</span></div>
            <div class="sw-info-row"><span class="sw-info-label">最低</span><span class="sw-info-value">{{ formatPrice(row.quote, "low") }}</span></div>
            <div class="sw-info-row"><span class="sw-info-label">成交量</span><span class="sw-info-value">{{ formatVolume(row.quote?.volume) }}</span></div>
            <div class="sw-info-row"><span class="sw-info-label">成交额</span><span class="sw-info-value">{{ formatAmountWan(row.quote?.amountWan) }}</span></div>
            <div class="sw-info-row"><span class="sw-info-label">外盘</span><span class="sw-info-value">{{ formatVolume(row.quote?.outerVolume) }}</span></div>
            <div class="sw-info-row"><span class="sw-info-label">内盘</span><span class="sw-info-value">{{ formatVolume(row.quote?.innerVolume) }}</span></div>
            <div class="sw-info-row"><span class="sw-info-label">换手率</span><span class="sw-info-value">{{ formatRatio(row.quote?.turnoverRate, '%') }}</span></div>
            <div class="sw-info-row"><span class="sw-info-label">量比</span><span class="sw-info-value">{{ formatVolumeRatio(row.quote?.volumeRatio) }}</span></div>
            <div class="sw-info-row"><span class="sw-info-label">涨停价</span><span class="sw-info-value">{{ formatPrice(row.quote, "limitUp") }}</span></div>
            <div class="sw-info-row"><span class="sw-info-label">跌停价</span><span class="sw-info-value">{{ formatPrice(row.quote, "limitDown") }}</span></div>
          </div>
        </div>
        <div class="sw-depth-grid">
          <div class="sw-depth-card sw-depth-card-ask">
            <div class="sw-depth-title-row">
              <span class="sw-depth-title sw-depth-title-ask">卖盘五档</span>
              <span class="sw-pressure-text sw-pressure-sell">卖压 {{ formatDepthPressureSummary(row.quote, "ask") }}</span>
            </div>
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
                <span>{{ formatPrice(row.quote, level.priceField) }}</span>
                <span>{{ formatVolume(level.volume) }}</span>
              </div>
            </div>
          </div>
          <div class="sw-depth-card sw-depth-card-bid">
            <div class="sw-depth-title-row">
              <span class="sw-depth-title sw-depth-title-bid">买盘五档</span>
              <span class="sw-pressure-text sw-pressure-buy">买压 {{ formatDepthPressureSummary(row.quote, "bid") }}</span>
            </div>
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
                <span>{{ formatPrice(row.quote, level.priceField) }}</span>
                <span>{{ formatVolume(level.volume) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
            placeholder="600000 / sh000001 / hk00700"
            @keyup.enter="addWatchItem"
          />
        </div>
        <span v-if="inputError" class="sw-inline-error">{{ inputError }}</span>
      </label>
      <label class="sw-field sw-interval-field">
        <span class="sw-field-label">刷新频率(秒)</span>
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
        </div>
      </label>
      <label class="sw-field sw-source-field">
        <span class="sw-field-label">数据源</span>
        <select v-model="providerId" class="sw-select" @change="handleProviderChange">
          <option v-for="option in providerOptions" :key="option.id" :value="option.id">
            {{ option.label }}
          </option>
        </select>
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
      <button class="sw-btn sw-btn-secondary" type="button" @click="toggleEditMode">
        {{ editMode ? "完成编辑" : "编辑模式" }}
      </button>
      <button class="sw-btn sw-btn-secondary" type="button" @click="toggleDigitGrouping">
        {{ digitGrouping === 3 ? "数字分组: 3位" : "数字分组: 4位" }}
      </button>
      <input
        ref="fileInputRef"
        class="sw-hidden-input"
        type="file"
        accept=".json,application/json"
        @change="handleImportFile"
      />
    </div>
    <div v-if="requestError" class="sw-toolbar-error">
      {{ requestError }}
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
const digitGrouping = ref(3);
const editMode = ref(false);
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
  sina: {
    id: "sina",
    label: "新浪行情",
    loadQuotes: loadSinaQuoteModels,
  },
  eastmoney: {
    id: "eastmoney",
    label: "东方财富",
    loadQuotes: loadEastmoneyQuoteModels,
  },
};

const providerOptions = Object.values(providers);
const currentProvider = computed(() => providers[providerId.value] || providers.tencent);

const watchRows = computed(() =>
  watchlist.value.map((item) => ({
    item,
    quote: quotesBySymbol.value[item.symbol] || createEmptyQuote(item.symbol, item.code),
  }))
);

function createDefaultState() {
  return {
    version: 1,
    provider: "tencent",
    digitGrouping: 3,
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

function getDecimalPlaces(value) {
  if (value === null || value === undefined || value === "" || value === "-") return null;
  const text = String(value).trim();
  if (!text || /e/i.test(text)) return null;
  const decimalPart = text.split(".")[1];
  return decimalPart === undefined ? 0 : decimalPart.length;
}

function buildPriceDecimals(entries) {
  return Object.fromEntries(
    entries
      .map(([field, value]) => [field, getDecimalPlaces(value)])
      .filter(([, decimals]) => decimals !== null)
  );
}

function normalizeInputCode(input) {
  const raw = String(input || "").trim();
  const normalized = raw.replace(/\s+/g, "");
  const lower = normalized.toLowerCase();

  if (!normalized) {
    throw new Error("请输入股票代码");
  }

  if (/^(sh|sz|bj)\d{6}$/.test(lower)) {
    return {
      symbol: lower,
      code: lower.slice(2),
    };
  }

  if (/^\d{6}$/.test(lower)) {
    if (lower.startsWith("5") || lower.startsWith("6")) {
      return { symbol: `sh${lower}`, code: lower };
    }
    if (
      lower.startsWith("0") ||
      lower.startsWith("1") ||
      lower.startsWith("2") ||
      lower.startsWith("3")
    ) {
      return { symbol: `sz${lower}`, code: lower };
    }
    if (lower.startsWith("4") || lower.startsWith("8")) {
      return { symbol: `bj${lower}`, code: lower };
    }
  }

  return {
    symbol: normalized,
    code: normalized,
  };
}

function toProviderSymbol(codeOrSymbol) {
  return normalizeInputCode(codeOrSymbol).symbol;
}

function toNeteaseCode(codeOrSymbol) {
  const { code } = normalizeInputCode(codeOrSymbol);

  if (/^\d{6}$/.test(code) && (code.startsWith("5") || code.startsWith("6"))) {
    return `0${code}`;
  }

  if (/^\d{6}$/.test(code) && (code.startsWith("0") || code.startsWith("1") || code.startsWith("2") || code.startsWith("3"))) {
    return `1${code}`;
  }

  throw new Error(`网易行情暂不支持该代码: ${code}`);
}

function toEastmoneySecid(codeOrSymbol) {
  const { code } = normalizeInputCode(codeOrSymbol);

  if (/^\d{6}$/.test(code) && (code.startsWith("5") || code.startsWith("6"))) {
    return `1.${code}`;
  }

  if (/^\d{6}$/.test(code) && (code.startsWith("0") || code.startsWith("1") || code.startsWith("2") || code.startsWith("3"))) {
    return `0.${code}`;
  }

  throw new Error(`东方财富暂不支持该代码: ${code}`);
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

function buildUpdatedAt(dateText, timeText) {
  if (!dateText || !timeText) return null;
  return `${dateText} ${timeText}`;
}

function formatUnixTimestamp(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return null;

  const timestamp = parsed > 1e12 ? parsed : parsed * 1000;
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return null;

  const pad = (part) => String(part).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function formatUnixTimeOnly(value) {
  const full = formatUnixTimestamp(value);
  if (!full) return null;
  return full.slice(11);
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
    outerVolume: null,
    innerVolume: null,
    turnoverRate: null,
    volumeRatio: null,
    limitUp: null,
    limitDown: null,
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
    priceDecimals: {},
  };
}

function convertAmountWan(value, divisor = 10000) {
  const parsed = toNumber(value);
  if (parsed === null) return null;
  return parsed / divisor;
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
    outerVolume: toNumber(raw[7]),
    innerVolume: toNumber(raw[8]),
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
    turnoverRate: toNumber(raw[38]),
    volumeRatio: toNumber(raw[49]),
    limitUp: toNumber(raw[47]),
    limitDown: toNumber(raw[48]),
    priceDecimals: buildPriceDecimals([
      ["price", raw[3]],
      ["preClose", raw[4]],
      ["open", raw[5]],
      ["bid1", raw[9]],
      ["bid2", raw[11]],
      ["bid3", raw[13]],
      ["bid4", raw[15]],
      ["bid5", raw[17]],
      ["ask1", raw[19]],
      ["ask2", raw[21]],
      ["ask3", raw[23]],
      ["ask4", raw[25]],
      ["ask5", raw[27]],
      ["change", raw[31]],
      ["high", raw[33]],
      ["low", raw[34]],
      ["limitUp", raw[47]],
      ["limitDown", raw[48]],
    ]),
  };
}

function parseSinaQuote(symbol, rawText) {
  if (typeof rawText !== "string" || !rawText.trim()) {
    return null;
  }

  const raw = rawText.split(",");
  if (raw.length < 32 || !raw[0]) {
    return null;
  }

  return {
    symbol,
    name: raw[0] || null,
    code: symbol.replace(/^(sh|sz|bj)/, ""),
    price: toNumber(raw[3]),
    preClose: toNumber(raw[2]),
    open: toNumber(raw[1]),
    high: toNumber(raw[4]),
    low: toNumber(raw[5]),
    change: null,
    changePercent: null,
    volume: toNumber(raw[8]),
    amountWan: convertAmountWan(raw[9]),
    bid1Volume: toNumber(raw[10]),
    bid1: toNumber(raw[11]),
    bid2Volume: toNumber(raw[12]),
    bid2: toNumber(raw[13]),
    bid3Volume: toNumber(raw[14]),
    bid3: toNumber(raw[15]),
    bid4Volume: toNumber(raw[16]),
    bid4: toNumber(raw[17]),
    bid5Volume: toNumber(raw[18]),
    bid5: toNumber(raw[19]),
    ask1Volume: toNumber(raw[20]),
    ask1: toNumber(raw[21]),
    ask2Volume: toNumber(raw[22]),
    ask2: toNumber(raw[23]),
    ask3Volume: toNumber(raw[24]),
    ask3: toNumber(raw[25]),
    ask4Volume: toNumber(raw[26]),
    ask4: toNumber(raw[27]),
    ask5Volume: toNumber(raw[28]),
    ask5: toNumber(raw[29]),
    date: raw[30] || null,
    time: raw[31] || null,
    priceDecimals: buildPriceDecimals([
      ["open", raw[1]],
      ["preClose", raw[2]],
      ["price", raw[3]],
      ["high", raw[4]],
      ["low", raw[5]],
      ["bid1", raw[11]],
      ["bid2", raw[13]],
      ["bid3", raw[15]],
      ["bid4", raw[17]],
      ["bid5", raw[19]],
      ["ask1", raw[21]],
      ["ask2", raw[23]],
      ["ask3", raw[25]],
      ["ask4", raw[27]],
      ["ask5", raw[29]],
    ]),
  };
}

function parseNeteaseQuote(symbol, data) {
  if (!data || typeof data !== "object") {
    return null;
  }

  const percentNumber = toNumber(data.percent);

  return {
    symbol,
    name: data.name ?? null,
    code: data.symbol ?? symbol.replace(/^(sh|sz|bj)/, ""),
    price: toNumber(data.price),
    preClose: toNumber(data.yestclose),
    open: toNumber(data.open),
    high: toNumber(data.high),
    low: toNumber(data.low),
    change: toNumber(data.updown),
    changePercent: percentNumber === null ? null : percentNumber * 100,
    volume: toNumber(data.volume),
    amountWan: convertAmountWan(data.turnover),
    bid1: toNumber(data.bid1),
    bid1Volume: toNumber(data.bidvol1),
    bid2: toNumber(data.bid2),
    bid2Volume: toNumber(data.bidvol2),
    bid3: toNumber(data.bid3),
    bid3Volume: toNumber(data.bidvol3),
    bid4: toNumber(data.bid4),
    bid4Volume: toNumber(data.bidvol4),
    bid5: toNumber(data.bid5),
    bid5Volume: toNumber(data.bidvol5),
    ask1: toNumber(data.ask1),
    ask1Volume: toNumber(data.askvol1),
    ask2: toNumber(data.ask2),
    ask2Volume: toNumber(data.askvol2),
    ask3: toNumber(data.ask3),
    ask3Volume: toNumber(data.askvol3),
    ask4: toNumber(data.ask4),
    ask4Volume: toNumber(data.askvol4),
    ask5: toNumber(data.ask5),
    ask5Volume: toNumber(data.askvol5),
    updatedAt: data.update || data.time || null,
    time: data.time || null,
    priceDecimals: buildPriceDecimals([
      ["price", data.price],
      ["preClose", data.yestclose],
      ["open", data.open],
      ["high", data.high],
      ["low", data.low],
      ["change", data.updown],
      ["bid1", data.bid1],
      ["bid2", data.bid2],
      ["bid3", data.bid3],
      ["bid4", data.bid4],
      ["bid5", data.bid5],
      ["ask1", data.ask1],
      ["ask2", data.ask2],
      ["ask3", data.ask3],
      ["ask4", data.ask4],
      ["ask5", data.ask5],
    ]),
  };
}

function parseEastmoneyQuote(symbol, data) {
  if (!data || typeof data !== "object") {
    return null;
  }

  return {
    symbol,
    name: data.f58 ?? null,
    code: data.f57 ?? symbol.replace(/^(sh|sz|bj)/, ""),
    price: toNumber(data.f43),
    preClose: toNumber(data.f60),
    open: toNumber(data.f46),
    high: toNumber(data.f44),
    low: toNumber(data.f45),
    change: toNumber(data.f169),
    changePercent: toNumber(data.f170),
    volume: toNumber(data.f47),
    amountWan: convertAmountWan(data.f48),
    bid1: toNumber(data.f19),
    bid1Volume: toNumber(data.f20),
    bid2: toNumber(data.f17),
    bid2Volume: toNumber(data.f18),
    bid3: toNumber(data.f15),
    bid3Volume: toNumber(data.f16),
    bid4: toNumber(data.f13),
    bid4Volume: toNumber(data.f14),
    bid5: toNumber(data.f11),
    bid5Volume: toNumber(data.f12),
    ask1: toNumber(data.f31),
    ask1Volume: toNumber(data.f32),
    ask2: toNumber(data.f33),
    ask2Volume: toNumber(data.f34),
    ask3: toNumber(data.f35),
    ask3Volume: toNumber(data.f36),
    ask4: toNumber(data.f37),
    ask4Volume: toNumber(data.f38),
    ask5: toNumber(data.f39),
    ask5Volume: toNumber(data.f40),
    updatedAt: data.f86 ? formatUnixTimestamp(data.f86) : null,
    time: data.f86 ? formatUnixTimeOnly(data.f86) : null,
    priceDecimals: buildPriceDecimals([
      ["price", data.f43],
      ["preClose", data.f60],
      ["open", data.f46],
      ["high", data.f44],
      ["low", data.f45],
      ["change", data.f169],
      ["bid1", data.f19],
      ["bid2", data.f17],
      ["bid3", data.f15],
      ["bid4", data.f13],
      ["bid5", data.f11],
      ["ask1", data.f31],
      ["ask2", data.f33],
      ["ask3", data.f35],
      ["ask4", data.f37],
      ["ask5", data.f39],
    ]),
  };
}

function toQuoteModel(parsed) {
  if (!parsed) return null;

  let timeInfo = {
    time: parsed.time ?? null,
    updatedAt: parsed.updatedAt ?? null,
  };

  if (parsed.datetime) {
    timeInfo = parseProviderDateTime(parsed.datetime);
  } else if (parsed.date && parsed.time) {
    timeInfo = {
      time: parsed.time,
      updatedAt: buildUpdatedAt(parsed.date, parsed.time),
    };
  }

  let change = parsed.change;
  let changePercent = parsed.changePercent;
  if ((change === null || changePercent === null) && parsed.price !== null && parsed.preClose) {
    const nextChange = parsed.price - parsed.preClose;
    change = change ?? nextChange;
    changePercent = changePercent ?? (nextChange / parsed.preClose) * 100;
  }

  return {
    symbol: parsed.symbol,
    code: parsed.code,
    name: parsed.name,
    price: parsed.price,
    preClose: parsed.preClose,
    open: parsed.open,
    high: parsed.high,
    low: parsed.low,
    change,
    changePercent,
    volume: parsed.volume,
    amountWan: parsed.amountWan,
    outerVolume: parsed.outerVolume ?? null,
    innerVolume: parsed.innerVolume ?? null,
    turnoverRate: parsed.turnoverRate ?? null,
    volumeRatio: parsed.volumeRatio ?? null,
    limitUp: parsed.limitUp ?? null,
    limitDown: parsed.limitDown ?? null,
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
    priceDecimals: parsed.priceDecimals || {},
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

function loadScriptWithHandlers(url, options = {}) {
  return new Promise((resolve, reject) => {
    if (!isBrowser) {
      reject(new Error("当前环境不支持浏览器行情请求"));
      return;
    }

    cleanupActiveScript();

    const script = document.createElement("script");
    activeScript = script;
    script.async = true;
    script.charset = options.charset || "utf-8";
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
      if (typeof options.cleanup === "function") {
        options.cleanup();
      }
      finish();
      reject(new Error("行情请求超时，请稍后重试"));
    }, REQUEST_TIMEOUT_MS);

    script.onload = () => {
      try {
        const result = typeof options.onLoad === "function" ? options.onLoad() : {};
        finish();
        resolve(result);
      } catch (error) {
        if (typeof options.cleanup === "function") {
          options.cleanup();
        }
        finish();
        reject(error);
      }
    };

    script.onerror = () => {
      if (typeof options.cleanup === "function") {
        options.cleanup();
      }
      finish();
      reject(new Error("行情脚本加载失败，请检查网络后重试"));
    };

    if (typeof options.beforeAppend === "function") {
      options.beforeAppend();
    }

    document.body.appendChild(script);
  });
}

function loadTencentQuotes(symbols) {
  const uniqueSymbols = Array.from(new Set(symbols.filter(Boolean)));
  if (!uniqueSymbols.length) {
    return Promise.resolve({});
  }

  const query = uniqueSymbols.map((symbol) => encodeURIComponent(symbol)).join(",");
  const url = `https://qt.gtimg.cn/q=${query}&_=${Date.now()}`;

  return loadScriptWithHandlers(url, {
    charset: "gb18030",
    onLoad: () => {
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

      return payload;
    },
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

function loadSinaQuotes(symbols) {
  const uniqueSymbols = Array.from(new Set(symbols.filter(Boolean)));
  if (!uniqueSymbols.length) {
    return Promise.resolve({});
  }

  const query = uniqueSymbols.map((symbol) => encodeURIComponent(symbol)).join(",");
  const url = `https://hq.sinajs.cn/list=${query}&rn=${Date.now()}`;

  return loadScriptWithHandlers(url, {
    charset: "gb18030",
    onLoad: () => {
      const payload = {};

      uniqueSymbols.forEach((symbol) => {
        const variableName = `hq_str_${symbol}`;
        payload[symbol] = typeof window[variableName] === "string" ? window[variableName] : "";

        try {
          delete window[variableName];
        } catch (error) {
          window[variableName] = undefined;
        }
      });

      return payload;
    },
  });
}

async function loadSinaQuoteModels(symbols) {
  const uniqueSymbols = symbols.map((symbol) => toProviderSymbol(symbol));
  const payload = await loadSinaQuotes(uniqueSymbols);
  const models = {};

  uniqueSymbols.forEach((symbol) => {
    const parsed = parseSinaQuote(symbol, payload[symbol]);
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

function loadEastmoneyQuotes(symbols) {
  const uniqueSymbols = Array.from(new Set(symbols.filter(Boolean)));
  if (!uniqueSymbols.length) {
    return Promise.resolve({});
  }
  const fields = [
    "f57","f58","f43","f169","f170","f46","f44","f45","f60","f47","f48","f86",
    "f19","f20","f17","f18","f15","f16","f13","f14","f11","f12",
    "f31","f32","f33","f34","f35","f36","f37","f38","f39","f40"
  ].join(",");

  return Promise.allSettled(
    uniqueSymbols.map(async (symbol) => {
      const secid = toEastmoneySecid(symbol);
      const url = `https://push2.eastmoney.com/api/qt/stock/get?invt=2&fltt=2&secid=${secid}&fields=${fields}&_=${Date.now()}`;
      const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`东方财富 HTTP ${response.status}`);
      }

      const json = await response.json();
      return [symbol, json?.data || null];
    })
  ).then((results) => {
    const payload = {};

    results.forEach((result, index) => {
      const symbol = uniqueSymbols[index];
      payload[symbol] = result.status === "fulfilled" ? result.value[1] : null;
    });

    return payload;
  });
}

async function loadEastmoneyQuoteModels(symbols) {
  const uniqueSymbols = Array.from(new Set(symbols.filter(Boolean)));
  const payload = await loadEastmoneyQuotes(uniqueSymbols);
  const models = {};

  uniqueSymbols.forEach((symbol) => {
    const parsed = parseEastmoneyQuote(symbol, payload[symbol]);
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

function loadNeteaseQuotes(symbols) {
  const uniqueSymbols = Array.from(new Set(symbols.filter(Boolean)));
  if (!uniqueSymbols.length) {
    return Promise.resolve({});
  }

  const mapping = {};
  const neteaseCodes = uniqueSymbols.map((symbol) => {
    const neteaseCode = toNeteaseCode(symbol);
    mapping[neteaseCode] = symbol;
    return neteaseCode;
  });

  const callbackName = `__stockWatcherNeteaseCallback_${Date.now()}`;
  let callbackPayload = null;
  const url = `https://api.money.126.net/data/feed/${neteaseCodes.join(",")},money.api?callback=${callbackName}&_=${Date.now()}`;

  return loadScriptWithHandlers(url, {
    beforeAppend: () => {
      window[callbackName] = (payload) => {
        callbackPayload = payload;
      };
    },
    cleanup: () => {
      try {
        delete window[callbackName];
      } catch (error) {
        window[callbackName] = undefined;
      }
    },
    onLoad: () => {
      if (!callbackPayload || typeof callbackPayload !== "object") {
        throw new Error("网易行情未返回有效数据");
      }

      const payload = {};
      Object.entries(callbackPayload).forEach(([neteaseCode, value]) => {
        const symbol = mapping[neteaseCode];
        if (symbol) {
          payload[symbol] = value;
        }
      });

      return payload;
    },
  });
}

async function loadNeteaseQuoteModels(symbols) {
  const uniqueSymbols = Array.from(new Set(symbols.filter(Boolean)));
  const payload = await loadNeteaseQuotes(uniqueSymbols);
  const models = {};

  uniqueSymbols.forEach((symbol) => {
    const parsed = parseNeteaseQuote(symbol, payload[symbol]);
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
    digitGrouping: digitGrouping.value,
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

  const provider = typeof candidate.provider === "string" && providers[candidate.provider]
    ? candidate.provider
    : fallback.provider;
  const grouping = candidate.digitGrouping === 4 ? 4 : 3;
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
    digitGrouping: grouping,
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
  digitGrouping.value = state.digitGrouping === 4 ? 4 : 3;
  watchlist.value = state.watchlist;
  refreshIntervalSec.value = sanitizeRefreshInterval(state.refreshIntervalSec);
  refreshIntervalInput.value = String(refreshIntervalSec.value);
}

function isValidQuoteModel(quote) {
  if (!quote || quote.error || quote.stale) return false;
  return Boolean(
    quote.name ||
    toNumber(quote.price) !== null ||
    toNumber(quote.open) !== null ||
    toNumber(quote.preClose) !== null ||
    toNumber(quote.volume) !== null
  );
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

    const freshQuotes = await currentProvider.value.loadQuotes([normalized.symbol]);
    const freshQuote = freshQuotes[normalized.symbol];

    if (!isValidQuoteModel(freshQuote)) {
      inputError.value = freshQuote?.error || "该代码未返回有效行情数据，请检查代码或切换数据源";
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
    quotesBySymbol.value = {
      ...quotesBySymbol.value,
      [normalized.symbol]: freshQuote,
    };
    saveState();
    restartRefreshTimer();
    flashSymbol(normalized.symbol);
  } catch (error) {
    inputError.value = error instanceof Error ? error.message : "该代码未返回有效行情数据";
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

function moveWatchItem(symbol, direction) {
  const currentIndex = watchlist.value.findIndex((item) => item.symbol === symbol);
  if (currentIndex === -1) return;

  const nextIndex = currentIndex + direction;
  if (nextIndex < 0 || nextIndex >= watchlist.value.length) return;

  const nextWatchlist = [...watchlist.value];
  const [moved] = nextWatchlist.splice(currentIndex, 1);
  nextWatchlist.splice(nextIndex, 0, moved);
  watchlist.value = nextWatchlist;
  saveState();
}

function moveWatchItemTo(symbol, targetIndex) {
  const currentIndex = watchlist.value.findIndex((item) => item.symbol === symbol);
  if (currentIndex === -1) return;

  const boundedIndex = Math.min(Math.max(targetIndex, 0), watchlist.value.length - 1);
  if (currentIndex === boundedIndex) return;

  const nextWatchlist = [...watchlist.value];
  const [moved] = nextWatchlist.splice(currentIndex, 1);
  nextWatchlist.splice(boundedIndex, 0, moved);
  watchlist.value = nextWatchlist;
  saveState();
}

function isFirstItem(symbol) {
  return watchlist.value.findIndex((item) => item.symbol === symbol) === 0;
}

function isLastItem(symbol) {
  const index = watchlist.value.findIndex((item) => item.symbol === symbol);
  return index !== -1 && index === watchlist.value.length - 1;
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

function handleProviderChange() {
  saveState();
  void refreshQuotes();
}

function handleManualRefresh() {
  void refreshQuotes();
}

function toggleEditMode() {
  editMode.value = !editMode.value;
}

function toggleDigitGrouping() {
  digitGrouping.value = digitGrouping.value === 3 ? 4 : 3;
  saveState();
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
    digitGrouping: digitGrouping.value,
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

function getQuoteValue(target, field) {
  if (!field) return target;
  return target?.[field];
}

function getQuoteDecimals(target, field, fallback = 2) {
  const decimals = field ? target?.priceDecimals?.[field] : null;
  return Number.isInteger(decimals) && decimals >= 0 ? decimals : fallback;
}

function formatPrice(target, field) {
  const parsed = toNumber(getQuoteValue(target, field));
  if (parsed === null) return "--";
  return parsed.toFixed(getQuoteDecimals(target, field));
}

function formatSigned(target, field) {
  const parsed = toNumber(getQuoteValue(target, field));
  if (parsed === null) return "--";
  const sign = parsed > 0 ? "+" : "";
  return `${sign}${parsed.toFixed(getQuoteDecimals(target, field))}`;
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
  return `${formatGroupedNumber(parsed)} 手`;
}

function formatAmountWan(value) {
  const parsed = toNumber(value);
  if (parsed === null) return "--";
  return `${formatGroupedNumber(parsed)} 万`;
}

function formatRatio(value, suffix = "") {
  const parsed = toNumber(value);
  if (parsed === null) return "--";
  return `${parsed.toFixed(2)}${suffix}`;
}

function getTradingProgress(now = new Date()) {
  const minutes = now.getHours() * 60 + now.getMinutes();
  const sessions = [
    [9 * 60 + 30, 11 * 60 + 30],
    [13 * 60, 15 * 60],
  ];
  const elapsed = sessions.reduce((total, [start, end]) => {
    if (minutes <= start) return total;
    return total + Math.min(minutes, end) - start;
  }, 0);
  return Math.min(1, Math.max(0, elapsed / 240));
}

function classifyVolumeRatio(value) {
  const parsed = toNumber(value);
  if (parsed === null) return "";
  const progress = getTradingProgress();

  if (progress === 0) {
    if (parsed >= 2) return "明显放量";
    if (parsed <= 0.5) return "明显缩量";
    return "待观察";
  }

  if (progress < 0.08) {
    if (parsed >= 2.5) return "异常放量";
    if (parsed >= 2) return "明显放量";
    if (parsed <= 0.45) return "明显缩量";
    return "早盘观察";
  }

  if (progress < 0.25) {
    if (parsed >= 2.3) return "异常放量";
    if (parsed >= 1.7) return "明显放量";
    if (parsed >= 1.35) return "温和放量";
    if (parsed <= 0.55) return "明显缩量";
    if (parsed <= 0.72) return "缩量";
    return "平量";
  }

  if (progress < 0.5) {
    if (parsed >= 2.2) return "异常放量";
    if (parsed >= 1.55) return "明显放量";
    if (parsed >= 1.25) return "温和放量";
    if (parsed <= 0.6) return "明显缩量";
    if (parsed <= 0.8) return "缩量";
    return "平量";
  }

  if (parsed >= 2) return "异常放量";
  if (parsed >= 1.45) return "明显放量";
  if (parsed >= 1.15) return "温和放量";
  if (parsed <= 0.65) return "明显缩量";
  if (parsed <= 0.88) return "缩量";
  return "平量";
}

function formatVolumeRatio(value) {
  const parsed = toNumber(value);
  if (parsed === null) return "--";
  return `${parsed.toFixed(2)}（${classifyVolumeRatio(parsed)}）`;
}

function formatGroupedNumber(value) {
  const parsed = toNumber(value);
  if (parsed === null) return "--";

  const grouping = digitGrouping.value === 4 ? 4 : 3;
  const [integerPart, decimalPart = ""] = String(parsed).split(".");
  const sign = integerPart.startsWith("-") ? "-" : "";
  const digits = sign ? integerPart.slice(1) : integerPart;
  const pattern = new RegExp(`\\B(?=(\\d{${grouping}})+(?!\\d))`, "g");
  const formattedInteger = digits.replace(pattern, ",");

  if (!decimalPart) {
    return `${sign}${formattedInteger}`;
  }

  return `${sign}${formattedInteger}.${decimalPart}`;
}

function parseUpdatedAt(value) {
  if (typeof value !== "string" || !value.trim()) return null;
  const normalized = value.replace(" ", "T");
  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? null : date;
}

function isSameLocalDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isQuoteExpired(quote) {
  if (quote?.stale) return true;
  const updatedAt = parseUpdatedAt(quote?.updatedAt);
  if (!updatedAt) return true;
  return !isSameLocalDay(updatedAt, new Date());
}

function formatQuoteBadge(quote) {
  if (isQuoteExpired(quote)) return "数据过期";
  return quote?.time || "--";
}

function formatLocalDateTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "--";

  return date.toLocaleString("zh-CN", {
    hour12: false,
  });
}

function sumDepthVolumes(quote, side) {
  const prefix = side === "bid" ? "bid" : "ask";
  return [1, 2, 3, 4, 5].reduce((total, level) => {
    const volume = toNumber(quote?.[`${prefix}${level}Volume`]);
    return volume === null ? total : total + volume;
  }, 0);
}

function hasDepthPressure(quote) {
  return sumDepthVolumes(quote, "bid") > 0 || sumDepthVolumes(quote, "ask") > 0;
}

function formatDepthPressure(quote, side) {
  if (!hasDepthPressure(quote)) return "--";
  return formatVolume(sumDepthVolumes(quote, side));
}

function formatDepthPressureShare(quote, side) {
  if (!hasDepthPressure(quote)) return "--";
  const bidPressure = sumDepthVolumes(quote, "bid");
  const askPressure = sumDepthVolumes(quote, "ask");
  const total = bidPressure + askPressure;
  if (total <= 0) return "--";
  const value = side === "bid" ? bidPressure : askPressure;
  return `${((value / total) * 100).toFixed(1)}%`;
}

function formatDepthPressureSummary(quote, side) {
  if (!hasDepthPressure(quote)) return "--";
  return `${formatDepthPressure(quote, side)} ${formatDepthPressureShare(quote, side)}`;
}

function askLevels(quote) {
  return [
    { level: 5, label: "卖五", priceField: "ask5", volume: quote?.ask5Volume },
    { level: 4, label: "卖四", priceField: "ask4", volume: quote?.ask4Volume },
    { level: 3, label: "卖三", priceField: "ask3", volume: quote?.ask3Volume },
    { level: 2, label: "卖二", priceField: "ask2", volume: quote?.ask2Volume },
    { level: 1, label: "卖一", priceField: "ask1", volume: quote?.ask1Volume },
  ];
}

function bidLevels(quote) {
  return [
    { level: 1, label: "买一", priceField: "bid1", volume: quote?.bid1Volume },
    { level: 2, label: "买二", priceField: "bid2", volume: quote?.bid2Volume },
    { level: 3, label: "买三", priceField: "bid3", volume: quote?.bid3Volume },
    { level: 4, label: "买四", priceField: "bid4", volume: quote?.bid4Volume },
    { level: 5, label: "买五", priceField: "bid5", volume: quote?.bid5Volume },
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
  font-size: 0.92rem;
}

.sw-card {
  background:
    radial-gradient(circle at top right, rgba(148, 163, 184, 0.06), transparent 32%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(247, 248, 250, 0.96));
  border: 1px solid rgba(148, 163, 184, 0.22);
  border-radius: 18px;
}

[data-theme="dark"] .sw-card {
  background:
    radial-gradient(circle at top right, rgba(148, 163, 184, 0.08), transparent 28%),
    linear-gradient(180deg, rgba(19, 24, 34, 0.96), rgba(13, 17, 23, 0.98));
  border-color: rgba(148, 163, 184, 0.16);
}

.sw-toolbar {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.sw-toolbar-main {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.9rem;
  width: 100%;
}

.sw-toolbar-actions {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.65rem;
  width: 100%;
}

.sw-toolbar-actions .sw-btn {
  width: 100%;
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
  flex-wrap: nowrap;
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
  transition: border-color 0.18s ease, background-color 0.18s ease;
}

[data-theme="dark"] .sw-input {
  background: rgba(30, 41, 59, 0.72);
}

.sw-input-short {
  max-width: none;
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
  transition: transform 0.16s ease, opacity 0.16s ease, background-color 0.16s ease;
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

.sw-btn-ghost:disabled,
.sw-btn-danger:disabled,
.sw-btn-secondary:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

[data-theme="dark"] .sw-btn-ghost {
  color: #93c5fd;
}

.sw-btn-danger {
  background: rgba(207, 35, 56, 0.1);
  color: #cf2338;
}

.sw-select {
  min-width: 150px;
  padding: 0.78rem 0.9rem;
  border-radius: 12px;
  border: 1px solid var(--vp-c-border);
  background: rgba(255, 255, 255, 0.86);
  color: var(--vp-c-text-1);
  font-size: 0.92rem;
}

[data-theme="dark"] .sw-select {
  background: rgba(30, 41, 59, 0.72);
}

.sw-select:focus {
  outline: auto;
}

.sw-hidden-input {
  display: none;
}

.sw-toolbar-error {
  width: 100%;
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
  padding: 0.78rem 0.9rem;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.sw-stock-card.is-highlighted {
  border-color: rgba(212, 61, 81, 0.55);
}

.sw-stock-card.is-stale {
  opacity: 0.9;
}

.sw-stock-main {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.sw-stock-top {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.sw-stock-id {
  min-width: 0;
  flex: 1 1 auto;
}

.sw-stock-name-row {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 0.4rem;
  min-width: 0;
}

.sw-stock-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sw-stock-code {
  font-size: 0.78rem;
  padding: 0.18rem 0.48rem;
  border-radius: 999px;
  background: rgba(148, 163, 184, 0.12);
  color: var(--vp-c-text-2);
  font-family: "JetBrains Mono", "Consolas", monospace;
  line-height: 1.2;
  white-space: nowrap;
}

.sw-stock-code.is-expired {
  color: #cf2338;
  background: rgba(207, 35, 56, 0.1);
}

.sw-stock-price {
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
  gap: 0.55rem;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  margin-left: auto;
}

.sw-price {
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1;
  color: var(--vp-c-text-1);
}

.sw-change-row {
  display: contents;
}

.sw-change,
.sw-change-percent {
  font-size: 0.84rem;
  font-weight: 600;
}

.sw-stock-actions {
  display: flex;
  gap: 0.45rem;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.sw-stock-actions .sw-btn {
  padding: 0.28rem 0.5rem;
  font-size: 0.76rem;
  line-height: 1.15;
  border-radius: 9px;
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

.sw-info-table-card {
  margin-bottom: 0.95rem;
}

.sw-info-table {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.35rem 0.9rem;
}

.sw-info-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  padding: 0.5rem 0.15rem;
  border-bottom: 1px dashed rgba(148, 163, 184, 0.22);
  font-variant-numeric: tabular-nums;
}

.sw-info-label {
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.sw-info-value {
  font-size: 0.84rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  text-align: right;
  min-width: 0;
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

.sw-depth-title {
  font-size: 0.84rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
}

.sw-depth-title-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.65rem;
  margin-bottom: 0.7rem;
}

.sw-depth-title-ask,
.sw-pressure-sell {
  color: #dc2626;
}

.sw-depth-title-bid,
.sw-pressure-buy {
  color: #16a34a;
}

.sw-pressure-text {
  font-size: 0.76rem;
  font-weight: 700;
  text-align: right;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
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
  font-size: 0.78rem;
  color: var(--vp-c-text-1);
}

.sw-stock-card.is-up .sw-price,
.sw-stock-card.is-down .sw-price,
.sw-stock-card.is-flat .sw-price {
  color: var(--vp-c-text-1);
}

.sw-stock-card.is-up .sw-change,
.sw-stock-card.is-up .sw-change-percent {
  color: #dc2626;
}

.sw-stock-card.is-down .sw-change,
.sw-stock-card.is-down .sw-change-percent {
  color: #16a34a;
}

.sw-stock-card.is-flat .sw-change,
.sw-stock-card.is-flat .sw-change-percent {
  color: var(--vp-c-text-1);
}

@media (max-width: 980px) {
  .sw-toolbar-main {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.55rem;
  }

  .sw-field-label {
    font-size: 0.74rem;
  }

  .sw-input,
  .sw-select {
    padding: 0.68rem 0.72rem;
    font-size: 0.84rem;
  }

  .sw-stock-main {
    gap: 0.4rem;
  }

  .sw-stock-top {
    gap: 0.5rem;
  }

  .sw-stock-price {
    align-items: baseline;
    gap: 0.35rem;
  }

  .sw-stock-actions {
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 0.3rem;
  }

}

@media (max-width: 720px) {
  .sw-toolbar {
    padding: 0.9rem;
  }

  .sw-toolbar-main {
    grid-template-columns: 1fr;
    gap: 0.4rem;
  }

  .sw-toolbar-actions {
    width: 100%;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .sw-toolbar-actions .sw-btn {
    padding: 0.56rem 0.6rem;
    font-size: 0.76rem;
  }

  .sw-field-label {
    font-size: 0.68rem;
  }

  .sw-input,
  .sw-select {
    padding: 0.56rem 0.52rem;
    font-size: 0.76rem;
  }

  .sw-input::placeholder {
    font-size: 0.72rem;
  }

  .sw-stock-card {
    padding: 0.64rem 0.7rem;
  }

  .sw-stock-main {
    gap: 0.32rem;
  }

  .sw-stock-top {
    gap: 0.35rem;
  }

  .sw-stock-name {
    font-size: 0.9rem;
  }

  .sw-stock-code {
    font-size: 0.7rem;
    padding: 0.12rem 0.35rem;
  }

  .sw-stock-price {
    gap: 0.28rem;
  }

  .sw-price {
    font-size: 1rem;
  }

  .sw-change,
  .sw-change-percent {
    font-size: 0.72rem;
  }

  .sw-stock-actions {
    gap: 0.22rem;
    flex-wrap: wrap;
  }

  .sw-stock-actions .sw-btn {
    padding: 0.34rem 0.44rem;
    font-size: 0.72rem;
    border-radius: 8px;
  }

  .sw-item-error {
    font-size: 0.78rem;
  }

  .sw-info-table {
    grid-template-columns: 1fr;
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
