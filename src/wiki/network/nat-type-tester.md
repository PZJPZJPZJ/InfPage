---
routeMeta:
  itemTitle: NAT Type Tester
  itemDesc: NAT类型检测工具
  itemIcon: github.com
---
# NatTypeTester:网络地址转换类型测试
## 下载地址
- [NatTypeTester-Github](https://github.com/HMBSbige/NatTypeTester)

## 在线检测器
<div class="container">
  <div class="config-section">
    <span>STUN 服务器</span>
    <div class="server-select">
      <select v-model="selectedServer" @change="onServerChange" class="select-box">
        <option v-for="server in presetServers" :key="server" :value="server">
          {{ server }}
        </option>
        <option value="custom">自定义...</option>
      </select>
      <input 
        v-if="selectedServer === 'custom'" 
        v-model="customServer" 
        type="text" 
        placeholder="stun:example.com:3478"
        class="input-box"
      />
    </div>
  </div>

  <button @click="startTest" :disabled="testing" class="test-btn">
    {{ testing ? '检测中...' : '开始检测' }}
  </button>

  <div class="result-section">
    <span>检测结果</span>
    <div class="result-grid">
      <div class="result-card">
        <div class="result-header">
          <span class="result-title">IPv4</span>
        </div>
        <div class="result-item">
          <span class="result-label">NAT 类型：</span>
          <span class="result-value" :class="resultIPv4.class">{{ resultIPv4.type }}</span>
        </div>
        <div class="result-item">
          <span class="result-label">公网 IP：</span>
          <span class="result-value">{{ resultIPv4.publicIp }}</span>
        </div>
        <div class="result-item">
          <span class="result-label">公网端口：</span>
          <span class="result-value">{{ resultIPv4.publicPort }}</span>
        </div>
        <div class="result-item">
          <span class="result-label">映射行为：</span>
          <span class="result-value">{{ resultIPv4.mapping }}</span>
        </div>
        <div class="result-item">
          <span class="result-label">过滤行为：</span>
          <span class="result-value">{{ resultIPv4.filtering }}</span>
        </div>
      </div>
      <div class="result-card">
        <div class="result-header">
          <span class="result-title">IPv6</span>
        </div>
        <div class="result-item">
          <span class="result-label">NAT 类型：</span>
          <span class="result-value" :class="resultIPv6.class">{{ resultIPv6.type }}</span>
        </div>
        <div class="result-item">
          <span class="result-label">公网 IP：</span>
          <span class="result-value">{{ resultIPv6.publicIp }}</span>
        </div>
        <div class="result-item">
          <span class="result-label">公网端口：</span>
          <span class="result-value">{{ resultIPv6.publicPort }}</span>
        </div>
        <div class="result-item">
          <span class="result-label">映射行为：</span>
          <span class="result-value">{{ resultIPv6.mapping }}</span>
        </div>
        <div class="result-item">
          <span class="result-label">过滤行为：</span>
          <span class="result-value">{{ resultIPv6.filtering }}</span>
        </div>
      </div>
    </div>
  </div>

  <div v-if="error" class="error-section">
    <p class="error-msg">❌ {{ error }}</p>
  </div>

  <div class="log-section">
    <span>检测日志</span>
    <div class="log-box">
      <p v-if="log.length === 0" class="log-item log-placeholder">点击"开始检测"按钮开始检测...</p>
      <p v-for="(item, index) in log" :key="index" class="log-item">{{ item }}</p>
    </div>
  </div>
</div>

<script setup>
import { ref } from "vue";

const presetServers = [
  "stun:stun.qq.com:3478",
  "stun:stun.miwifi.com:3478",
  "stun:stun.syncthing.net:3478",
  "stun:stun.stunprotocol.org:3478",
  "stun:stun.stun.hot-chilli.net:3478",
  "stun:stun.internetcalls.com:3478",
  "stun:stun.cloudflare.com:3478",
  "stun:stun.l.google.com:19302",
  "stun:stun1.l.google.com:19302",
  "stun:stun2.l.google.com:19302",
  "stun:stun3.l.google.com:19302",
  "stun:stun4.l.google.com:19302",
];

const selectedServer = ref("stun:stun.qq.com:3478");
const customServer = ref("");
const testing = ref(false);
const resultIPv4 = ref({
  type: "等待检测",
  publicIp: "-",
  publicPort: "-",
  mapping: "-",
  filtering: "-",
  class: "nat-waiting"
});
const resultIPv6 = ref({
  type: "等待检测",
  publicIp: "-",
  publicPort: "-",
  mapping: "-",
  filtering: "-",
  class: "nat-waiting"
});
const error = ref("");
const log = ref([]);

const natTypeMap = {
  OpenInternet: {
    type: "开放互联网 (NAT0)",
    mapping: "Direct",
    filtering: "EndpointIndependent",
    class: "nat-open"
  },
  FullCone: {
    type: "全圆锥型 (NAT1)",
    mapping: "EndpointIndependent",
    filtering: "EndpointIndependent",
    class: "nat-good"
  },
  AddressRestrictedCone: {
    type: "地址受限圆锥型 (NAT2)",
    mapping: "EndpointIndependent",
    filtering: "AddressDependent",
    class: "nat-medium"
  },
  PortRestrictedCone: {
    type: "端口受限圆锥型 (NAT3)",
    mapping: "EndpointIndependent",
    filtering: "AddressAndPortDependent",
    class: "nat-medium"
  },
  Symmetric: {
    type: "对称型 (NAT4)",
    mapping: "AddressAndPortDependent",
    filtering: "AddressAndPortDependent",
    class: "nat-strict"
  },
  SymmetricUdpFirewall: {
    type: "对称型防火墙",
    mapping: "Direct",
    filtering: "AddressAndPortDependent",
    class: "nat-firewall"
  },
  Blocked: {
    type: "UDP 被阻止",
    mapping: "N/A",
    filtering: "N/A",
    class: "nat-blocked"
  }
};

function addLog(msg) {
  const time = new Date().toLocaleTimeString();
  log.value.push(`[${time}] ${msg}`);
}

function onServerChange() {
  if (selectedServer.value !== "custom") {
    customServer.value = "";
  }
}

function getStunServer() {
  return selectedServer.value === "custom" ? customServer.value : selectedServer.value;
}

async function getLocalCandidates(servers) {
  return new Promise((resolve, reject) => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: servers }]
    });

    const candidates = [];
    const timeout = setTimeout(() => {
      pc.close();
      if (candidates.length > 0) {
        resolve(candidates);
      } else {
        reject(new Error("获取候选超时"));
      }
    }, 10000);

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        addLog(`收到候选: ${event.candidate.candidate}`);
        candidates.push(event.candidate);
      } else {
        clearTimeout(timeout);
        pc.close();
        resolve(candidates);
      }
    };

    pc.onicegatheringstatechange = () => {
      if (pc.iceGatheringState === "complete") {
        clearTimeout(timeout);
        pc.close();
        resolve(candidates);
      }
    };

    pc.createDataChannel("test");
    pc.createOffer()
      .then(offer => pc.setLocalDescription(offer))
      .catch(reject);
  });
}

function parseCandidate(candidateStr) {
  const c = typeof candidateStr === 'string' ? candidateStr : candidateStr.candidate;
  const parts = c.split(" ");
  const result = {
    protocol: parts[2],
    ip: parts[4],
    port: parts[5],
    type: ""
  };

  const typIndex = parts.indexOf("typ");
  if (typIndex !== -1 && typIndex + 1 < parts.length) {
    result.type = parts[typIndex + 1];
  }

  const raddrIndex = parts.indexOf("raddr");
  if (raddrIndex !== -1 && raddrIndex + 1 < parts.length) {
    result.relatedAddress = parts[raddrIndex + 1];
  }

  const rportIndex = parts.indexOf("rport");
  if (rportIndex !== -1 && rportIndex + 1 < parts.length) {
    result.relatedPort = parts[rportIndex + 1];
  }

  return result;
}

function isIPv6(ip) {
  return ip && ip.includes(":");
}

const waitingResult = {
  type: "等待检测",
  publicIp: "-",
  publicPort: "-",
  mapping: "-",
  filtering: "-",
  class: "nat-waiting"
};

const testingResult = {
  type: "检测中...",
  publicIp: "-",
  publicPort: "-",
  mapping: "-",
  filtering: "-",
  class: "nat-testing"
};

const noSupportResult = {
  type: "不支持",
  publicIp: "-",
  publicPort: "-",
  mapping: "-",
  filtering: "-",
  class: "nat-blocked"
};

async function detectNATType(primaryServer, ipVersion, logPrefix) {
  addLog(`${logPrefix}: 获取本地候选...`);

  // Choose some auxiliary servers for testing mapping behavior
  const auxiliaryServers = [
    "stun:stun1.l.google.com:19302",
    "stun:stun2.l.google.com:19302"
  ].filter(s => s !== primaryServer);

  // Take at most 2 auxiliary servers plus the primary
  const serversToUse = [primaryServer, ...auxiliaryServers].slice(0, 3);
  addLog(`${logPrefix}: 使用STUN服务器：\n  ` + serversToUse.join('\n  '));

  const candidates = await getLocalCandidates(serversToUse);

  const srflxCandidates = candidates.filter(c =>
    c.candidate.includes("typ srflx")
  );
  const hostCandidates = candidates.filter(c =>
    c.candidate.includes("typ host")
  );

  // 按IP版本过滤
  const filteredSrflx = srflxCandidates.filter(c => {
    const parsed = parseCandidate(c);
    if (ipVersion === "IPv4") return !isIPv6(parsed.ip);
    if (ipVersion === "IPv6") return isIPv6(parsed.ip);
    return true;
  });

  const filteredHost = hostCandidates.filter(c => {
    const parts = c.candidate.split(" ");
    const ip = parts[4];
    if (ipVersion === "IPv4") return !isIPv6(ip);
    if (ipVersion === "IPv6") return isIPv6(ip);
    return true;
  });

  if (filteredSrflx.length === 0) {
    if (filteredHost.length === 0) {
      addLog(`${logPrefix}: 无${ipVersion}支持`);
      return noSupportResult;
    }

    // 没有srflx，可能是开放互联网或被阻止
    addLog(`${logPrefix}: 未检测到服务器反射候选`);
    return {
      ...natTypeMap.Blocked,
      publicIp: "-",
      publicPort: "-"
    };
  }

  const candidateToUse = filteredSrflx[0] || filteredHost[0];
  const parsedMap = parseCandidate(candidateToUse);
  const publicIp = parsedMap ? parsedMap.ip : "-";
  const publicPort = parsedMap ? parsedMap.port : "-";

  // Check Open Internet
  // If an srflx IP matches a host IP, it's open internet
  const hostIPs = new Set(filteredHost.map(c => c.candidate.split(" ")[4]));
  const isOpenInternet = filteredSrflx.some(c => hostIPs.has(parseCandidate(c).ip));

  if (isOpenInternet) {
    addLog(`${logPrefix}: 本地IP与公网IP一致，属于开放互联网`);
    return {
      ...natTypeMap.OpenInternet,
      publicIp,
      publicPort
    };
  }

  // Check Mapping Behavior
  addLog(`${logPrefix}: 检测映射行为...`);
  const candidatesByLocalPort = {};

  for (const c of filteredSrflx) {
    const parsed = parseCandidate(c);
    // STUN returned external IP and port
    const extIP = parsed.ip;
    const extPort = parsed.port;
    // The local port that originated the request
    const relatedPort = parsed.relatedPort || 'unknown';

    if (!candidatesByLocalPort[relatedPort]) {
      candidatesByLocalPort[relatedPort] = [];
    }
    candidatesByLocalPort[relatedPort].push({ extIP, extPort, candidate: parsed });
  }

  for (const localPort in candidatesByLocalPort) {
    if (localPort === 'unknown') continue;

    const group = candidatesByLocalPort[localPort];
    const uniqueExtPorts = new Set(group.map(c => c.extPort));
    const uniqueExtIPs = new Set(group.map(c => c.extIP));

    if (uniqueExtPorts.size > 1 || uniqueExtIPs.size > 1) {
      addLog(`${logPrefix}: 相同本地端口(${localPort})映射到了不同的外部端口或IP`);
      addLog(`${logPrefix}: 这是端点相关的映射行为 (Symmetric NAT)`);
      return {
        ...natTypeMap.Symmetric,
        publicIp,
        publicPort
      };
    }
  }

  addLog(`${logPrefix}: 相同本地端口映射到了相同的外部端口和IP`);
  addLog(`${logPrefix}: 这是端点无关的映射行为`);
  addLog(`${logPrefix}: 注意：浏览器环境无法发送自定义STUN请求，无法区分全圆锥型/受限圆锥型。`);

  // Return PortRestrictedCone as a safe default for Cone NATs since most home routers are restricted
  return {
    ...natTypeMap.PortRestrictedCone,
    publicIp,
    publicPort
  };
}

async function startTest() {
  testing.value = true;
  resultIPv4.value = testingResult;
  resultIPv6.value = testingResult;
  error.value = "";
  log.value = [];

  const stunServer = getStunServer();
  if (!stunServer) {
    error.value = "请输入有效的 STUN 服务器地址";
    testing.value = false;
    resultIPv4.value = waitingResult;
    resultIPv6.value = waitingResult;
    return;
  }

  addLog(`开始检测，使用服务器: ${stunServer}`);

  try {
    // 检测 IPv4
    addLog("========== IPv4 检测 ==========");
    try {
      resultIPv4.value = await detectNATType(stunServer, "IPv4", "[IPv4]");
    } catch (err) {
      addLog(`[IPv4] 检测失败: ${err.message}`);
      resultIPv4.value = noSupportResult;
    }

    // 检测 IPv6
    addLog("========== IPv6 检测 ==========");
    try {
      resultIPv6.value = await detectNATType(stunServer, "IPv6", "[IPv6]");
    } catch (err) {
      addLog(`[IPv6] 检测失败: ${err.message}`);
      resultIPv6.value = noSupportResult;
    }

    addLog("========== 检测完成 ==========");

  } catch (err) {
    error.value = `检测失败: ${err.message}`;
    addLog(`错误: ${err.message}`);
  }

  testing.value = false;
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.config-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.server-select {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.select-box {
  flex: 1;
  min-width: 200px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  font-size: 0.9rem;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
}

.select-box:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
}

.input-box {
  flex: 1;
  min-width: 200px;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  font-size: 0.9rem;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.input-box:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
}

.test-btn {
  padding: 10px 20px;
  border: 1px solid var(--vp-c-text);
  border-radius: 6px;
  color: var(--vp-c-text);
  cursor: pointer;
  font-size: 14px;
}

.test-btn:hover:not(:disabled) {
  background: var(--vp-c-text);
  color: var(--vp-c-bg);
}

.test-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.config-section > span,
.result-section > span,
.log-section > span {
  display: block;
  font-weight: 600;
  font-size: 1.2rem;
  padding: 0.5rem 0;
  color: var(--vp-c-text-1);
}

.result-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.result-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 10px;
  padding: 1rem;
}

.result-header {
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.result-title {
  font-weight: 600;
  color: var(--vp-c-accent);
}

.result-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.result-item:last-child {
  border-bottom: none;
}

.result-label {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.result-value {
  font-weight: 600;
  color: var(--vp-c-text-1);
  word-break: break-all;
  text-align: right;
  margin-left: 10px;
  font-size: 1rem;
}

.nat-open { color: #10b981; }
.nat-good { color: #22c55e; }
.nat-medium { color: #f59e0b; }
.nat-strict { color: #ef4444; }
.nat-firewall { color: #8b5cf6; }
.nat-blocked { color: #6b7280; }
.nat-waiting { color: var(--vp-c-text-3); }
.nat-testing { color: var(--vp-c-accent); }

.error-section {
  padding: 1rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 8px;
}

.error-msg {
  color: #ef4444;
  margin: 0;
}

.log-box {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 0.75rem;
  max-height: 200px;
  overflow-y: auto;
}

.log-item {
  font-family: monospace;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin: 0.25rem 0;
}

.log-placeholder {
  color: var(--vp-c-text-3);
  font-style: italic;
}
</style>