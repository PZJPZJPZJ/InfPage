# AudioTuner:声音频率检测器
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

<script setup>
  import { ref, onUnmounted } from 'vue'

  const isListening = ref(false)
  const detectedFrequency = ref(0)
  const pitchDeviation = ref(0)
  const deviationPosition = ref(50)
  const currentPitch = ref('-')
  const surroundingNotes = ref([])

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
    detectedFrequency.value = 0
    currentPitch.value = '-'
    surroundingNotes.value = []
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
</style>