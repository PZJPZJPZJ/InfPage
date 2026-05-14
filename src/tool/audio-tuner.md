# 声音频率检测器
<div class="tuner_pitch_scale">
  <span v-for="(note, index) in surroundingNotes" :key="note" :class="{ 'tuner_pitch_current': index === 3 }">
    {{ note }}
  </span>
</div>
<div class="tuner_deviation">
  <div class="tuner_deviation_wrapper">
    <!-- 刻度线容器 -->
    <div class="tuner_deviation_scale">
      <div class="tuner_deviation_mark tuner_deviation_mark_prev">
        <div class="tuner_deviation_mark_line"></div>
        <span class="tuner_deviation_mark_label">-50</span>
      </div>
      <div class="tuner_deviation_mark tuner_deviation_mark_current">
        <div class="tuner_deviation_mark_line"></div>
        <span class="tuner_deviation_mark_label">0</span>
      </div>
      <div class="tuner_deviation_mark tuner_deviation_mark_next">
        <div class="tuner_deviation_mark_line"></div>
        <span class="tuner_deviation_mark_label">+50</span>
      </div>
    </div>
    <!-- 实时指示器条 -->
    <div class="tuner_deviation_bar">
      <div class="tuner_deviation_indicator" :style="{ left: deviationPosition + '%' }"></div>
    </div>
  </div>
  <div>
    <span>频率:</span>
    <div class="tuner_frequency">{{ detectedFrequency.toFixed(1) }} Hz</div>
  </div>
  <div>
    <span>偏移:</span>
    <div class="tuner_frequency">{{ pitchDeviation.toFixed(1) }} cents</div>
  </div>
  <div class="tuner_controls">
  <button class="tuner_btn" @click="toggleListening">
    {{ isListening ? '停止监听' : '开始监听' }}
  </button>
</div>
</div>
<div v-if="isListening" class="tuner_chart_wrapper">
  <canvas ref="pitchCanvas" class="tuner_chart"></canvas>
</div>

<script setup>
  import { ref, onUnmounted, nextTick } from 'vue'

  const isListening = ref(false)
  const detectedFrequency = ref(0)
  const pitchDeviation = ref(0)
  const deviationPosition = ref(50)
  const currentPitch = ref('-')
  const surroundingNotes = ref([])
  const pitchCanvas = ref(null)
  const pitchHistory = ref([])
  let animFrameId = null

  let audioContext = null
  let analyser = null
  let microphone = null
  let javascriptNode = null

  // 标准音高频率表 (A4=440Hz)
  const noteFrequencies = {
    'C': 16.35,
    'C#': 17.32,
    'D': 18.35,
    'D#': 19.45,
    'E': 20.60,
    'F': 21.83,
    'F#': 23.12,
    'G': 24.50,
    'G#': 25.96,
    'A': 27.50,
    'A#': 29.14,
    'B': 30.87
  }

  const toggleListening = () => {
    if (isListening.value) {
      stopListening()
    } else {
      startListening()
    }
  }

  const startListening = async () => {
    try {
      if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)()
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        }
      })

      microphone = audioContext.createMediaStreamSource(stream)
      analyser = audioContext.createAnalyser()
      analyser.fftSize = 32768 // 更大的FFT大小以获得更高的频率分辨率
      analyser.smoothingTimeConstant = 0.85 // 平滑系数
      analyser.minDecibels = -90 // 降低最小分贝以检测更小的信号
      analyser.maxDecibels = -10 // 调整最大分贝以避免失真

      javascriptNode = audioContext.createScriptProcessor(2048, 1, 1)

      microphone.connect(analyser)
      analyser.connect(javascriptNode)
      javascriptNode.connect(audioContext.destination)

      javascriptNode.onaudioprocess = processAudio

      isListening.value = true
      await nextTick()
      startChartAnimation()
    } catch (error) {
      console.error(error)
      alert(error)
    }
  }

  const stopListening = () => {
    if (javascriptNode) {
      javascriptNode.onaudioprocess = null
      javascriptNode.disconnect()
    }
    if (microphone) {
      microphone.disconnect()
    }
    if (analyser) {
      analyser.disconnect()
    }

    isListening.value = false
    stopChartAnimation()
    detectedFrequency.value = 0
    currentPitch.value = '-'
    surroundingNotes.value = []
    pitchHistory.value = []
  }

  // ===== 音高记录图 (Canvas) =====

  const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
  const midiFreq = (m) => 440 * Math.pow(2, (m - 69) / 12)
  const midiName = (m) => `${noteNames[m % 12]}${Math.floor(m / 12) - 1}`

  const drawChart = () => {
    const canvas = pitchCanvas.value
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) { animFrameId = requestAnimationFrame(drawChart); return }
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    const W = rect.width, H = rect.height
    const pad = { top: 16, right: 16, bottom: 28, left: 48 }
    const pW = W - pad.left - pad.right, pH = H - pad.top - pad.bottom

    // ---- 计算动态 Y 轴范围 ----
    const data = pitchHistory.value
    const cutoff = Date.now() - 30000
    const visible = data.filter(p => p.t >= cutoff)

    ctx.clearRect(0, 0, W, H)

    // 背景
    ctx.fillStyle = 'rgba(0,0,0,0.03)'
    ctx.fillRect(0, 0, W, H)

    // 边框
    ctx.strokeStyle = 'rgba(128,128,128,0.15)'
    ctx.lineWidth = 1
    ctx.strokeRect(0.5, 0.5, W - 1, H - 1)

    if (visible.length === 0) {
      animFrameId = requestAnimationFrame(drawChart)
      return
    }

    let minFreq = Infinity, maxFreq = 0
    for (const p of visible) {
      if (p.f < minFreq) minFreq = p.f
      if (p.f > maxFreq) maxFreq = p.f
    }
    // 上下各扩展 4 个半音，让曲线不贴边
    const expand = Math.pow(2, 4 / 12)
    minFreq = Math.max(16.35, minFreq / expand)
    maxFreq = Math.min(8000, maxFreq * expand)

    // 计算范围内覆盖的半音
    const midiMin = Math.max(0, Math.floor(12 * Math.log2(minFreq / 440) + 69))
    const midiMax = Math.min(127, Math.ceil(12 * Math.log2(maxFreq / 440) + 69))

    const logMin = Math.log2(minFreq), logMax = Math.log2(maxFreq)
    const yP = (f) => pad.top + pH * (1 - (Math.log2(f) - logMin) / (logMax - logMin))
    const xP = (t) => { const e = Date.now() - t; return pad.left + pW * Math.max(0, Math.min(1, 1 - e / 30000)) }

    // ---- 将数据按时间间隙分段（>1000ms 视为中断） ----
    const GAP_MS = 1000
    const segments = []
    let cur = []
    for (const p of visible) {
      if (cur.length && p.t - cur[cur.length - 1].t > GAP_MS) {
        segments.push(cur)
        cur = []
      }
      cur.push(p)
    }
    if (cur.length) segments.push(cur)

    // ---- 半音网格线 ----
    // 始终绘制所有半音格线，但仅当范围 >24 个半音时减少标签密度
    const denseLabels = (midiMax - midiMin) <= 24
    ctx.textBaseline = 'middle'
    for (let m = midiMin; m <= midiMax; m++) {
      const freq = midiFreq(m)
      const y = yP(freq)
      const isOctave = m % 12 === 0
      // 标签规则：八度音始终标注；密集时每隔一个半音标注；稀疏时全部标注
      const showLabel = isOctave || denseLabels || (m - midiMin) % 2 === 0

      ctx.strokeStyle = isOctave ? 'rgba(128,128,128,0.35)' : 'rgba(128,128,128,0.12)'
      ctx.lineWidth = isOctave ? 1.5 : 0.5
      ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W - pad.right, y); ctx.stroke()

      if (showLabel) {
        ctx.fillStyle = isOctave ? '#666' : '#999'
        ctx.font = isOctave ? 'bold 11px sans-serif' : '10px sans-serif'
        ctx.textAlign = 'right'
        ctx.fillText(midiName(m), pad.left - 4, y)
      }
    }

    // ---- 时间垂直网格 (每5秒) ----
    ctx.strokeStyle = 'rgba(128,128,128,0.12)'
    ctx.fillStyle = '#999'
    ctx.font = '10px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    for (let t = 0; t <= 30000; t += 5000) {
      const x = pad.left + pW * (1 - t / 30000)
      ctx.beginPath(); ctx.moveTo(x, pad.top); ctx.lineTo(x, H - pad.bottom); ctx.stroke()
      ctx.fillText(`-${t / 1000}s`, x, H - pad.bottom + 6)
    }

    // ---- 按分段绘制音高（中断处断开） ----
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'

    for (const seg of segments) {
      if (seg.length < 2) continue

      // 填充区域
      ctx.beginPath()
      ctx.fillStyle = 'rgba(40,167,69,0.12)'
      ctx.moveTo(xP(seg[0].t), yP(seg[0].f))
      for (let i = 1; i < seg.length; i++) {
        ctx.lineTo(xP(seg[i].t), yP(seg[i].f))
      }
      ctx.lineTo(xP(seg[seg.length - 1].t), pad.top + pH)
      ctx.lineTo(xP(seg[0].t), pad.top + pH)
      ctx.closePath(); ctx.fill()

      // 线条
      ctx.beginPath()
      ctx.strokeStyle = '#28a745'
      ctx.lineWidth = 2
      ctx.moveTo(xP(seg[0].t), yP(seg[0].f))
      for (let i = 1; i < seg.length; i++) {
        ctx.lineTo(xP(seg[i].t), yP(seg[i].f))
      }
      ctx.stroke()
    }

    animFrameId = requestAnimationFrame(drawChart)
  }

  const startChartAnimation = () => {
    drawChart()
  }

  const stopChartAnimation = () => {
    if (animFrameId) { cancelAnimationFrame(animFrameId); animFrameId = null }
  }

  const processAudio = () => {
    if (!analyser) return

    const dataArray = new Float32Array(analyser.frequencyBinCount)
    analyser.getFloatFrequencyData(dataArray)

    // 找到最强的频率
    let maxIndex = 0
    let maxValue = -Infinity

    // 只在有效的频率范围内搜索（20Hz - 20kHz）
    const minBin = Math.floor(20 * analyser.fftSize / audioContext.sampleRate)
    const maxBin = Math.floor(20000 * analyser.fftSize / audioContext.sampleRate)

    for (let i = minBin; i < maxBin; i++) {
      if (dataArray[i] > maxValue) {
        maxValue = dataArray[i]
        maxIndex = i
      }
    }

    // 使用抛物线插值提高频率精度
    if (maxIndex > 0 && maxIndex < dataArray.length - 1) {
      const alpha = dataArray[maxIndex - 1]
      const beta = dataArray[maxIndex]
      const gamma = dataArray[maxIndex + 1]
      const p = 0.5 * (alpha - gamma) / (alpha - 2 * beta + gamma)
      maxIndex = maxIndex + p
    }

    // 计算频率
    const frequency = maxIndex * audioContext.sampleRate / analyser.fftSize

    // 检查是否有足够的信号强度（避免噪音）
    const signalStrength = Math.pow(10, maxValue / 20) // 将dB转换为线性幅度
    if (maxValue > -70 && frequency >= 20 && frequency <= 20000) { // 调整阈值
      detectedFrequency.value = frequency
      detectPitch(frequency)
      pitchHistory.value.push({ f: frequency, t: Date.now() })
      // 裁剪30秒以外的旧数据
      const cutoff = Date.now() - 30000
      while (pitchHistory.value.length && pitchHistory.value[0].t < cutoff) {
        pitchHistory.value.shift()
      }
    }
  }

  const detectPitch = (frequency) => {
    if (frequency < 16.35) return

    // 计算最接近的音符
    let closestNote = ''
    let closestDiff = Infinity
    let octave = 0

    // 创建有序的音符数组
    const notes = Object.keys(noteFrequencies)
    for (let note in noteFrequencies) {
      for (let i = 0; i < 8; i++) {
        const baseFreq = noteFrequencies[note] * Math.pow(2, i)
        const diff = Math.abs(frequency - baseFreq)

        if (diff < closestDiff) {
          closestDiff = diff
          closestNote = note
          octave = i
        }
      }
    }

    // 计算音高偏移度（cents）
    const exactFreq = noteFrequencies[closestNote] * Math.pow(2, octave)
    const cents = 1200 * Math.log2(frequency / exactFreq)
    pitchDeviation.value = cents
    deviationPosition.value = Math.max(0, Math.min(100, (cents + 50) / 100 * 100))

    // 获取前后3个音符
    const currentIndex = notes.indexOf(closestNote)
    const surroundingNotesArray = []

    for (let i = -3; i <= 3; i++) {
      let noteIndex = (currentIndex + i + notes.length) % notes.length
      let noteOctave = octave

      // 处理跨越八度的情况
      if (noteIndex > currentIndex && i < 0) noteOctave--
      if (noteIndex < currentIndex && i > 0) noteOctave++

      surroundingNotesArray.push(`${notes[noteIndex]}${noteOctave}`)
    }

    surroundingNotes.value = surroundingNotesArray
    currentPitch.value = `${closestNote}${octave}`
  }

  onUnmounted(() => {
    stopListening()
    stopChartAnimation()
  })
</script>

<style scoped>
  .tuner_btn {
    margin: 20px 0;
    padding: 10px 20px;
    border: 1px solid var(--vp-c-text);
    border-radius: 6px;
    color: var(--vp-c-text);
    cursor: pointer;
    font-size: 14px;
    min-width: 120px;
  }

  .tuner_frequency {
    font-size: 24px;
    font-weight: bold;
    color: var(--vp-c-accent);
  }

  .tuner_pitch_scale {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin: 20px 0;
    font-size: 16px;
  }

  .tuner_pitch_current {
    font-size: 20px;
    font-weight: bold;
    color: var(--vp-c-accent);
  }

  .tuner_deviation {
    margin-top: 15px;
  }

  .tuner_deviation_wrapper {
    position: relative;
    margin: 30px 0 15px;
  }

  .tuner_deviation_scale {
    position: absolute;
    top: -25px;
    left: 0;
    right: 0;
    height: 25px;
    display: flex;
    justify-content: space-between;
  }

  .tuner_deviation_mark {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 2px;
  }

  .tuner_deviation_mark_line {
    width: 2px;
    height: 15px;
    background-color: #dc3545;
  }

  .tuner_deviation_mark_current .tuner_deviation_mark_line {
    background-color: #28a745;
    height: 20px;
  }

  .tuner_deviation_mark_label {
    font-size: 12px;
    color: #6c757d;
    margin-top: 2px;
  }

  .tuner_deviation_bar {
    height: 20px;
    border: 1px solid #dee2e6;
    border-radius: 10px;
    position: relative;
    background: linear-gradient(to right,
        #dc3545 0%,
        #ffc107 40%,
        #28a745 50%,
        #ffc107 60%,
        #dc3545 100%);
  }

  .tuner_deviation_indicator {
    width: 4px;
    height: calc(100% + 10px);
    background: var(--vp-c-text-mute);
    position: absolute;
    top: -5px;
    transform: translateX(-50%);
    transition: left 0.1s;
    border-radius: 2px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }

  .tuner_chart_wrapper {
    margin-top: 24px;
    width: 100%;
  }

  .tuner_chart {
    display: block;
    width: 100%;
    height: 60vh;
    border-radius: 8px;
    background: var(--vp-c-bg-soft);
  }
</style>