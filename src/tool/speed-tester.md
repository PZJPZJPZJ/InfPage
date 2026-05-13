# 加速度测量工具

<div class="container">
  <!-- GPS Status -->
  <div class="statusBar">
    <span :class="['statusDot', gpsStatus ? 'active' : '']"></span>
    <span class="statusText">{{ gpsStatus ? '定位服务已连接' : '定位服务未连接' }}</span>
    <span v-if="gpsStatus && accuracy" class="accText">±{{ accuracy }}m</span>
  </div>

  <!-- Speed Display -->
  <div class="dashboard">
    <div class="speedBox">
      <div :class="['speedValue', gForceColor]">{{ speed.toFixed(1) }}</div>
      <div :class="['speedUnit', gForceColor]">km/h</div>
    </div>
    <div class="gForceBox">
      <div class="gLabel">GPS G值</div>
      <div :class="['gValue', gForceColor]">{{ gForce >= 0 ? '+' : '' }}{{ gForce.toFixed(3) }}</div>
    </div>
    <div class="gForceBox" :class="{ clickable: !accelAvail && isIOS }">
      <div class="gLabel">ACC G值</div>
      <div v-if="accelAvail" :class="['gValue', accGColor]">{{ accelG >= 0 ? '+' : '' }}{{ accelG.toFixed(3) }}</div>
      <div v-else-if="isIOS" class="gValue gDisabled" @click="requestAccelPermission">点击启用</div>
      <div v-else class="gValue gDisabled">不可用</div>
    </div>
  </div>

  <!-- Peak Stats -->
  <div class="statsRow">
    <div class="statItem">
      <div class="statLabel">峰值G值(GPS)</div>
      <div class="statValue">{{ peakG.toFixed(3) }} <small>G</small></div>
    </div>
    <div class="statItem">
      <div class="statLabel">峰值G值(ACC)</div>
      <div class="statValue">{{ peakAccG.toFixed(3) }} <small>G</small></div>
    </div>
    <div class="statItem">
      <div class="statLabel">最高速度</div>
      <div class="statValue">{{ maxSpeed.toFixed(1) }} <small>km/h</small></div>
    </div>
  </div>

  <!-- G-Force Bar (GPS) -->
  <div class="gBarContainer">
    <div class="gBarLabel">GPS G值指示</div>
    <div class="gBarTrack">
      <div class="gBarFill" :style="{ width: gBarWidth + '%' }" :class="gForceColor"></div>
    </div>
    <div class="gBarScale">
      <span>0</span><span>0.5</span><span>1.0</span><span>1.5+</span>
    </div>
  </div>

  <!-- 0-100 Section -->
  <div class="sectionCard">
    <div class="sectionTitle">零百加速计时</div>
    <div class="timerBox">
      <div class="timerValue">{{ zeroToHundredTime > 0 ? zeroToHundredTime.toFixed(3) : '---' }}<small v-if="estimatedError" class="errorEstimate">{{ estimatedError }}</small></div>
      <div class="timerUnit">秒</div>
    </div>
    <div class="timerStatus" :class="timerStatusClass">{{ zeroHundredStatus }}</div>
    <div class="btnGroup">
      <button @click="startZeroHundred" class="btn btnStart" :disabled="zeroHundredRunning || zeroHundredStandby || !gpsStatus">
        {{ zeroHundredStandby ? '等待起步...' : (zeroHundredRunning ? '计时中...' : '开始') }}
      </button>
      <button @click="resetZeroHundred" class="btn btnReset">{{ zeroHundredStandby ? '取消' : '重置' }}</button>
    </div>
  </div>

  <!-- Acceleration Segments Table (0-100 detail) -->
  <div v-if="segmentsActive" class="sectionCard">
    <div class="sectionTitle">0-100km/h 分段数据</div>
    <div class="segTable">
      <div class="segHeader">
        <span class="segColSpeed">区间</span>
        <span class="segColTime">分段用时</span>
        <span class="segColCum">累计时间</span>
        <span class="segColG">GPS-G</span>
        <span class="segColG">ACC-G</span>
      </div>
      <div v-for="(seg, idx) in accelSegments" :key="idx" :class="['segRow', seg.reached ? 'segDone' : (seg.active ? 'segActive' : 'segPending')]">
        <span class="segColSpeed">{{ seg.speed }}</span>
        <span class="segColTime">{{ seg.segTime > 0 ? seg.segTime.toFixed(3) + 's' : '---' }}</span>
        <span class="segColCum">{{ seg.cumTime > 0 ? seg.cumTime.toFixed(3) + 's' : '---' }}</span>
        <span class="segColG">{{ seg.gpsG > 0 ? seg.gpsG.toFixed(3) + 'G' : '---' }}</span>
        <span class="segColG">{{ seg.accG > 0 ? seg.accG.toFixed(3) + 'G' : '---' }}</span>
      </div>
    </div>
  </div>

  <!-- Run History -->
  <div v-if="runHistory.length > 0" class="sectionCard">
    <div class="sectionTitle">历史记录</div>
    <div class="historyList">
      <div v-for="(run, index) in runHistory" :key="index" class="historyItem">
        <span class="hIndex">#{{ runHistory.length - index }}</span>
        <span class="hTime">{{ run.time.toFixed(3) }}s</span>
        <span class="hG">GPS {{ run.peakG.toFixed(3) }}G</span>
        <span class="hG">ACC {{ run.peakAccG.toFixed(3) }}G</span>
        <span class="hDate">{{ run.date }}</span>
      </div>
    </div>
  </div>

  <!-- Control Buttons -->
  <div class="ctrlGroup">
    <button @click="resetAll" class="btn btnReset">重置所有数据</button>
  </div>

  <!-- Debug Info -->
  <div class="sectionCard">
    <div class="sectionTitle debugTitle" @click="showDebug = !showDebug">
      🔧 定位服务数据 {{ showDebug ? '▲' : '▼' }}
    </div>
    <div v-if="showDebug" class="debugGrid">
      <div class="debugItem"><span class="debugLabel">纬度</span><span class="debugValue">{{ debug.lat ?? '---' }}</span></div>
      <div class="debugItem"><span class="debugLabel">经度</span><span class="debugValue">{{ debug.lng ?? '---' }}</span></div>
      <div class="debugItem"><span class="debugLabel">定位精度</span><span class="debugValue">{{ debug.accuracy ?? '---' }}m</span></div>
      <div class="debugItem"><span class="debugLabel">海拔</span><span class="debugValue">{{ debug.altitude ?? '---' }}m</span></div>
      <div class="debugItem"><span class="debugLabel">方向角</span><span class="debugValue">{{ debug.heading ?? '---' }}°</span></div>
      <div class="debugItem"><span class="debugLabel">GPS原始速度</span><span class="debugValue">{{ debug.rawSpeed ?? '---' }} m/s</span></div>
      <div class="debugItem"><span class="debugLabel">ACC X</span><span class="debugValue">{{ debug.accX ?? '---' }} m/s²</span></div>
      <div class="debugItem"><span class="debugLabel">ACC Y</span><span class="debugValue">{{ debug.accY ?? '---' }} m/s²</span></div>
      <div class="debugItem"><span class="debugLabel">ACC Z</span><span class="debugValue">{{ debug.accZ ?? '---' }} m/s²</span></div>
      <div class="debugItem"><span class="debugLabel">GPS计算G值</span><span class="debugValue">{{ gForce.toFixed(4) }} G</span></div>
      <div class="debugItem"><span class="debugLabel">传感器G值</span><span class="debugValue">{{ accelG.toFixed(4) }} G</span></div>
      <div class="debugItem"><span class="debugLabel">GPS更新时间</span><span class="debugValue">{{ debug.updateTime || '---' }}</span></div>
    </div>
  </div>

  <!-- Notes -->
  <div class="noteBox">
    <strong>使用说明：</strong><br>
    1. 请在开阔地带使用，确保GPS信号良好<br>
    2. 点击"开始"后进入待命状态，车辆开始移动(≥3km/h)自动开始计时<br>
    3. GPS G值通过速度变化率计算，ACC G值来自设备加速度传感器(合量纲)<br>
    4. iOS需授予定位权限，首次使用加速度传感器时可能需额外授权<br>
    5. 由于设备精度限制，数据仅供娱乐参考
  </div>
</div>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const speed = ref(0);
const gpsStatus = ref(false);
const accuracy = ref(0);
const accelAvail = ref(false);
let watchId = null;
let motionHandler = null;

const peakG = ref(0);
const peakAccG = ref(0);
const maxSpeed = ref(0);
const gForce = ref(0);
const accelG = ref(0);
let lastThresholdSpeed = 0;   // km/h, for speed threshold interpolation
let lastThresholdTime = 0;    // ms, for speed threshold interpolation
const gpsInterval = ref(1000); // ms, GPS update interval for error estimation
let lastSpeed = 0;
let lastTime = 0;

// Debug data
const showDebug = ref(true);
const debug = ref({
  lat: null, lng: null, accuracy: null,
  altitude: null, heading: null, rawSpeed: null,
  accX: null, accY: null, accZ: null,
  updateTime: null
});

// 0-100
const zeroHundredStandby = ref(false);
const zeroHundredRunning = ref(false);
const zeroToHundredTime = ref(0);
const zeroHundredStatus = ref('就绪 — 点击"开始"');
const zeroHundredStartTime = ref(0);
const zeroHundredComplete = ref(false);
let zeroHundredIntId = null;

// 0-100 segments
const speedThresholds = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const accelSegments = ref([]);
const segmentsActive = ref(false);
let currentThresholdIdx = 0;
let segStartTime = 0;
let segPeakGpsG = 0;
let segPeakAccG = 0;

// Run history
const runHistory = ref([]);

// Computed
const gForceColor = computed(() => {
  const g = Math.abs(gForce.value);
  if (g < 0.25) return 'gLow';
  if (g < 0.5) return 'gMedium';
  return 'gHigh';
});

const accGColor = computed(() => {
  const g = Math.abs(accelG.value);
  if (g < 0.25) return 'gLow';
  if (g < 0.5) return 'gMedium';
  return 'gHigh';
});

const gBarWidth = computed(() => Math.min(Math.abs(gForce.value) / 1.5 * 100, 100));

const isIOS = computed(() =>
  typeof DeviceMotionEvent !== 'undefined' &&
  typeof DeviceMotionEvent.requestPermission === 'function'
);

const estimatedError = computed(() => {
  if (zeroToHundredTime.value > 0 && gpsInterval.value > 0) {
    return `±~${(gpsInterval.value / 2000).toFixed(2)}s`;
  }
  return '';
});

const timerStatusClass = computed(() => {
  if (zeroHundredStandby.value) return 'statusStandby';
  if (zeroHundredRunning.value) return 'statusRunning';
  if (zeroToHundredTime.value > 0) return 'statusDone';
  return '';
});

// Init segments
function initSegments() {
  const segs = [];
  for (let i = 0; i < 10; i++) {
    segs.push({
      speed: `${i * 10}-${(i + 1) * 10}`,
      segTime: 0,
      cumTime: 0,
      gpsG: 0,
      accG: 0,
      reached: false,
      active: false
    });
  }
  accelSegments.value = segs;
  segmentsActive.value = true;
}

function resetSegments() {
  accelSegments.value = [];
  segmentsActive.value = false;
  currentThresholdIdx = 0;
  segStartTime = 0;
  segPeakGpsG = 0;
  segPeakAccG = 0;
}

// GPS
function handlePosition(position) {
  const coords = position.coords;
  gpsStatus.value = true;

  // Debug data
  const now = new Date();
  debug.value.lat = coords.latitude.toFixed(6);
  debug.value.lng = coords.longitude.toFixed(6);
  debug.value.accuracy = coords.accuracy ? Math.round(coords.accuracy) : null;
  debug.value.altitude = coords.altitude != null ? coords.altitude.toFixed(1) : null;
  debug.value.heading = coords.heading != null ? coords.heading.toFixed(1) : null;
  debug.value.rawSpeed = coords.speed != null ? (coords.speed * 3.6).toFixed(1) : null;
  debug.value.updateTime = now.toLocaleTimeString();

  accuracy.value = debug.value.accuracy;

  const speedMs = coords.speed || 0;
  speed.value = speedMs * 3.6;

  if (speed.value > maxSpeed.value) {
    maxSpeed.value = speed.value;
  }

  // G-force from position
  const ts = now.getTime();
  if (lastTime > 0 && speedMs >= 0) {
    const dt = (ts - lastTime) / 1000;
    gpsInterval.value = ts - lastTime; // Track actual GPS interval
    if (dt > 0.01 && dt < 3) {
      const accel = (speedMs - lastSpeed) / dt;
      gForce.value = accel / 9.80665;

      const absG = Math.abs(gForce.value);
      if (absG > peakG.value) peakG.value = absG;

      // Track segment peak G from GPS
      if (zeroHundredRunning.value && absG > segPeakGpsG) {
        segPeakGpsG = absG;
      }
    }
  }
  lastSpeed = speedMs;
  lastTime = ts;

  // Standby → detect vehicle start (speed >= 3 km/h)
  if (zeroHundredStandby.value && speed.value >= 3) {
    zeroHundredStandby.value = false;
    zeroHundredRunning.value = true;
    zeroHundredStartTime.value = Date.now();
    segStartTime = zeroHundredStartTime.value;
    segPeakGpsG = 0;
    segPeakAccG = 0;
    accelSegments.value[0].active = true;
    zeroHundredStatus.value = '加速中... 等待突破10km/h';

    zeroHundredIntId = setInterval(() => {
      if (zeroHundredRunning.value) {
        const elapsed = (Date.now() - zeroHundredStartTime.value) / 1000;
        if (elapsed > 120) {
          zeroHundredRunning.value = false;
          zeroHundredStatus.value = '超时 — 120秒内未达到100km/h';
          clearInterval(zeroHundredIntId);
          zeroHundredIntId = null;
        } else {
          const nextTarget = speedThresholds[Math.min(currentThresholdIdx + 1, 10)];
          zeroHundredStatus.value = `加速中... ${elapsed.toFixed(1)}s | ${speed.value.toFixed(1)} km/h (目标: ${nextTarget} km/h)`;
        }
      }
    }, 100);
  }

  // Check speed thresholds for segments
  if (zeroHundredRunning.value) {
    checkThreshold(speed.value, lastThresholdSpeed, lastThresholdTime);
  }

  // Update interpolation tracking for next GPS callback
  lastThresholdSpeed = speed.value;
  lastThresholdTime = ts;
}

function checkThreshold(currentSpeedKmh, prevSpeedKmh, prevTimeMs) {
  const nextThresholdIdx = currentThresholdIdx + 1;
  if (nextThresholdIdx > 10) return;

  const threshold = speedThresholds[nextThresholdIdx];
  if (currentSpeedKmh >= threshold) {
    const now = Date.now();
    const segIdx = nextThresholdIdx - 1;

    // Linear interpolation: estimate exact time when speed == threshold
    // Uses the previous GPS sample and current sample to find the crossing point
    let timeAtThreshold = now;
    if (prevTimeMs > 0 && prevSpeedKmh < threshold && currentSpeedKmh > prevSpeedKmh) {
      const ratio = (threshold - prevSpeedKmh) / (currentSpeedKmh - prevSpeedKmh);
      timeAtThreshold = prevTimeMs + ratio * (now - prevTimeMs);
    }

    // Finalize current segment
    const seg = accelSegments.value[segIdx];
    seg.segTime = (timeAtThreshold - segStartTime) / 1000;
    seg.cumTime = (timeAtThreshold - zeroHundredStartTime.value) / 1000;
    seg.gpsG = segPeakGpsG;
    seg.accG = segPeakAccG;
    seg.reached = true;
    seg.active = false;

    // Move to next threshold
    currentThresholdIdx = nextThresholdIdx;
    segStartTime = timeAtThreshold;
    segPeakGpsG = 0;
    segPeakAccG = 0;

    // Mark next segment as active
    if (currentThresholdIdx < 10) {
      accelSegments.value[currentThresholdIdx].active = true;
    }

    // Check if we've reached 100 km/h (threshold 10)
    if (currentThresholdIdx === 10) {
      const elapsed = (timeAtThreshold - zeroHundredStartTime.value) / 1000;
      zeroToHundredTime.value = elapsed;
      zeroHundredRunning.value = false;
      zeroHundredComplete.value = true;
      zeroHundredStatus.value = `完成！零百加速 ${elapsed.toFixed(3)}s`;

      runHistory.value.unshift({
        time: elapsed,
        peakG: peakG.value,
        peakAccG: peakAccG.value,
        segments: JSON.parse(JSON.stringify(accelSegments.value)),
        date: now.toLocaleTimeString()
      });

      if (zeroHundredIntId) {
        clearInterval(zeroHundredIntId);
        zeroHundredIntId = null;
      }
    }
  }
}

function handleError(error) {
  gpsStatus.value = false;
  console.warn('GPS error:', error.message);
}

function startGPS() {
  if (!navigator.geolocation) {
    alert('您的设备不支持地理定位功能，请使用支持GPS的移动设备访问。');
    return;
  }
  watchId = navigator.geolocation.watchPosition(handlePosition, handleError, {
    enableHighAccuracy: true,
    maximumAge: 100,
    timeout: 5000
  });
}

function stopGPS() {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }
  if (zeroHundredIntId) {
    clearInterval(zeroHundredIntId);
    zeroHundredIntId = null;
  }
}

// Accelerometer
function startAccelerometer() {
  const handler = (event) => {
    const acc = event.acceleration;
    if (acc) {
      const mag = Math.sqrt(acc.x * acc.x + acc.y * acc.y + acc.z * acc.z);
      accelG.value = mag / 9.80665;

      debug.value.accX = acc.x.toFixed(3);
      debug.value.accY = acc.y.toFixed(3);
      debug.value.accZ = acc.z.toFixed(3);

      const absG = Math.abs(accelG.value);
      if (absG > peakAccG.value) peakAccG.value = absG;

      // Track segment peak from accelerometer
      if (zeroHundredRunning.value && absG > segPeakAccG) {
        segPeakAccG = absG;
      }
    }
  };

  if (typeof DeviceMotionEvent !== 'undefined' &&
      typeof DeviceMotionEvent.requestPermission === 'function') {
    // iOS 13+
    DeviceMotionEvent.requestPermission().then(state => {
      if (state === 'granted') {
        window.addEventListener('devicemotion', handler);
        motionHandler = handler;
        accelAvail.value = true;
      }
    }).catch(() => {});
  } else {
    // Android & others
    window.addEventListener('devicemotion', handler);
    motionHandler = handler;
    accelAvail.value = true;
  }
}

function stopAccelerometer() {
  if (motionHandler) {
    window.removeEventListener('devicemotion', motionHandler);
    motionHandler = null;
  }
}

function requestAccelPermission() {
  if (typeof DeviceMotionEvent?.requestPermission === 'function') {
    DeviceMotionEvent.requestPermission().then(state => {
      if (state === 'granted') {
        startAccelerometer();
      } else {
        alert('加速度传感器授权被拒绝，ACC G值不可用');
      }
    }).catch(() => {
      alert('请求加速度传感器授权失败，请在浏览器设置中允许');
    });
  }
}

// 0-100 controls
function startZeroHundred() {
  if (!gpsStatus.value) {
    alert('请等待GPS连接后再试');
    return;
  }
  if (speed.value > 10) {
    if (!confirm('当前速度约 ' + speed.value.toFixed(1) + ' km/h，建议车辆静止时开始计时。是否继续？')) {
      return;
    }
  }

  // Request accelerometer permission again if needed
  if (!accelAvail.value && typeof DeviceMotionEvent !== 'undefined' &&
      typeof DeviceMotionEvent.requestPermission === 'function') {
    DeviceMotionEvent.requestPermission().then(state => {
      if (state === 'granted') accelAvail.value = true;
    }).catch(() => {});
  }

  zeroHundredStandby.value = true;
  zeroHundredRunning.value = false;
  zeroToHundredTime.value = 0;
  zeroHundredStartTime.value = 0;
  zeroHundredComplete.value = false;

  initSegments();
  currentThresholdIdx = 0;
  segStartTime = 0;
  segPeakGpsG = 0;
  segPeakAccG = 0;
  lastThresholdSpeed = 0;
  lastThresholdTime = 0;

  zeroHundredStatus.value = '等待起步... 车辆开始移动后自动计时';
}

function resetZeroHundred() {
  zeroHundredStandby.value = false;
  zeroHundredRunning.value = false;
  zeroToHundredTime.value = 0;
  zeroHundredStartTime.value = 0;
  zeroHundredComplete.value = false;
  zeroHundredStatus.value = '已重置';
  resetSegments();
  lastThresholdSpeed = 0;
  lastThresholdTime = 0;
  if (zeroHundredIntId) {
    clearInterval(zeroHundredIntId);
    zeroHundredIntId = null;
  }
}

function resetAll() {
  resetZeroHundred();
  peakG.value = 0;
  peakAccG.value = 0;
  maxSpeed.value = 0;
  gForce.value = 0;
  accelG.value = 0;
  lastSpeed = 0;
  lastTime = 0;
  lastThresholdSpeed = 0;
  lastThresholdTime = 0;
  runHistory.value = [];
  speed.value = 0;
  zeroHundredStatus.value = '就绪 — 点击"开始"';
}

onMounted(() => {
  startGPS();
  startAccelerometer();
});

onUnmounted(() => {
  stopGPS();
  stopAccelerometer();
});
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

/* Status Bar */
.statusBar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  padding: 0.4rem 0.6rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.statusDot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #666;
  flex-shrink: 0;
}
.statusDot.active {
  background: #4caf50;
  box-shadow: 0 0 6px #4caf50;
}

.accelBadge {
  font-size: 0.7rem;
  background: var(--vp-c-brand);
  color: #fff;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  font-weight: 600;
}

.accText {
  margin-left: auto;
  font-size: 0.8rem;
}

/* Dashboard */
.dashboard {
  display: flex;
  gap: 0.6rem;
}

.speedBox {
  flex: 2;
  background: var(--vp-c-bg-soft);
  border-radius: 14px;
  padding: 1.2rem;
  text-align: center;
}

.speedValue {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  transition: color 0.3s;
}

.speedUnit {
  font-size: 0.9rem;
  margin-top: 0.3rem;
  transition: color 0.3s;
}

.gForceBox {
  flex: 1;
  background: var(--vp-c-bg-soft);
  border-radius: 14px;
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.gLabel {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.2rem;
}

.gValue {
  font-size: 1.3rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  transition: color 0.3s;
}
.gLow { color: #4caf50; }
.gMedium { color: #ff9800; }
.gHigh { color: #f44336; }
.gDisabled { color: var(--vp-c-text-3); font-size: 0.85rem; }
.clickable { cursor: pointer; }
.clickable:hover { opacity: 0.8; }

/* Stats */
.statsRow {
  display: flex;
  gap: 0.5rem;
}

.statItem {
  flex: 1;
  background: var(--vp-c-bg-soft);
  border-radius: 10px;
  padding: 0.5rem;
  text-align: center;
}

.statLabel {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.2rem;
}

.statValue {
  font-size: 0.9rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.statValue small {
  font-size: 0.65rem;
  font-weight: 400;
  color: var(--vp-c-text-2);
}

/* G-force bar */
.gBarContainer {
  background: var(--vp-c-bg-soft);
  border-radius: 10px;
  padding: 0.5rem 0.8rem;
}

.gBarLabel {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.3rem;
}

.gBarTrack {
  height: 8px;
  background: var(--vp-c-bg-mute);
  border-radius: 4px;
  overflow: hidden;
}

.gBarFill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease;
}
.gBarFill.gLow { background: linear-gradient(90deg, #4caf50, #8bc34a); }
.gBarFill.gMedium { background: linear-gradient(90deg, #ff9800, #ffc107); }
.gBarFill.gHigh { background: linear-gradient(90deg, #f44336, #d32f2f); }

.gBarScale {
  display: flex;
  justify-content: space-between;
  font-size: 0.6rem;
  color: var(--vp-c-text-3);
  margin-top: 0.2rem;
}

/* Section */
.sectionCard {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1rem;
}

.sectionTitle {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.6rem;
}

/* Timer */
.timerBox {
  text-align: center;
  padding: 0.4rem 0;
}

.timerValue {
  font-size: 3rem;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-brand);
}
.timerValue .errorEstimate {
  font-size: 0.7rem;
  font-weight: 400;
  color: var(--vp-c-text-3);
  margin-left: 0.3rem;
}

.timerUnit {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.timerStatus {
  text-align: center;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin: 0.4rem 0;
  min-height: 1.2rem;
}
.statusStandby { color: #ff9800; font-weight: 600; }
.statusRunning { color: #4caf50; }
.statusDone { color: var(--vp-c-brand); font-weight: 600; }

/* Buttons */
.btnGroup {
  display: flex;
  gap: 0.6rem;
}

.ctrlGroup {
  display: flex;
  gap: 0.6rem;
}

.btn {
  flex: 1;
  padding: 0.7rem;
  border: none;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.btnStart {
  background: linear-gradient(135deg, #4caf50, #45a049);
  color: #fff;
}
.btnStart:not(:disabled):hover { opacity: 0.9; }
.btnReset {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
}
.btnReset:hover { opacity: 0.85; }

/* Segments Table */
.segTable {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-size: 0.8rem;
}

.segHeader {
  display: flex;
  gap: 0.3rem;
  padding: 0.4rem 0.5rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  border-bottom: 1px solid var(--vp-c-border);
  margin-bottom: 0.2rem;
}

.segRow {
  display: flex;
  gap: 0.3rem;
  padding: 0.35rem 0.5rem;
  border-radius: 6px;
  font-variant-numeric: tabular-nums;
  transition: background 0.2s;
}
.segRow.segDone {
  background: rgba(76, 175, 80, 0.08);
}
.segRow.segActive {
  background: rgba(255, 152, 0, 0.12);
  font-weight: 600;
}
.segRow.segPending {
  opacity: 0.4;
}

.segColSpeed { width: 20%; }
.segColTime { width: 22%; }
.segColCum { width: 22%; }
.segColG { width: 18%; }

/* History */
.historyList {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.historyItem {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.45rem 0.6rem;
  background: var(--vp-c-bg-mute);
  border-radius: 8px;
  font-size: 0.8rem;
  font-variant-numeric: tabular-nums;
}

.hIndex { font-weight: 600; color: var(--vp-c-text-2); min-width: 1.5rem; }
.hTime { font-weight: 700; color: var(--vp-c-brand); min-width: 4rem; }
.hG { min-width: 3.5rem; }
.hDate { margin-left: auto; font-size: 0.7rem; color: var(--vp-c-text-3); }

/* Debug Panel */
.debugTitle {
  cursor: pointer;
  user-select: none;
}
.debugTitle:hover {
  opacity: 0.8;
}

.debugGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.3rem;
  margin-top: 0.4rem;
}

.debugItem {
  display: flex;
  flex-direction: column;
  padding: 0.35rem 0.5rem;
  background: var(--vp-c-bg-mute);
  border-radius: 6px;
}

.debugLabel {
  font-size: 0.65rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.1rem;
}

.debugValue {
  font-size: 0.85rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

/* Notes */
.noteBox {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  border-radius: 10px;
  padding: 0.8rem;
  line-height: 1.8;
}
</style>