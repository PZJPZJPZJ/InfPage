# TOTP动态验证码生成器
<div class="container">
<input
    v-model="secret"
    placeholder="输入Base32密钥(读取URL参数secret)"
    class="inputBox"
/>
<select v-model="digits" class="inputBox">
    <option value="6">6位验证码</option>
    <option value="8">8位验证码</option>
</select>
<div class="otp">{{ otp }}</div>
<div class="timer">剩余时间: {{ remain }} 秒</div>
</div>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

function base32Decode(base32) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let output = [];
  let buffer = 0, bitsLeft = 0;

  base32 = base32.replace(/=+$/, "").toUpperCase();
  for (let char of base32) {
    let val = alphabet.indexOf(char);
    if (val === -1) throw new Error("Invalid Base32 character.");
    buffer = (buffer << 5) | val;
    bitsLeft += 5;
    if (bitsLeft >= 8) {
      bitsLeft -= 8;
      output.push((buffer >> bitsLeft) & 0xff);
    }
  }
  return new Uint8Array(output);
}

async function generateTOTP(secretBase32, digits = 6, period = 30) {
  if (!secretBase32) return "------";
  try {
    const keyBytes = base32Decode(secretBase32);
    const counter = Math.floor(Date.now() / 1000 / period);

    const counterArray = new ArrayBuffer(8);
    const counterView = new DataView(counterArray);
    counterView.setUint32(4, counter);

    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyBytes,
      { name: "HMAC", hash: "SHA-1" },
      false,
      ["sign"]
    );
    const hmac = await crypto.subtle.sign("HMAC", cryptoKey, counterArray);
    const hmacBytes = new Uint8Array(hmac);

    const offset = hmacBytes[hmacBytes.length - 1] & 0x0f;
    const binary =
      ((hmacBytes[offset] & 0x7f) << 24) |
      ((hmacBytes[offset + 1] & 0xff) << 16) |
      ((hmacBytes[offset + 2] & 0xff) << 8) |
      (hmacBytes[offset + 3] & 0xff);

    const otp = binary % 10 ** digits;
    return otp.toString().padStart(digits, "0");
  } catch (e) {
    return "Error";
  }
}

const getParams = () => {
  if (typeof window === 'undefined') return;
  const queryParams = new URLSearchParams(window.location.search);
  if (queryParams) {
    secret.value = queryParams.get('secret');
  }
};

const secret = ref("");
const digits = ref(6);
const otp = ref("------");
const remain = ref("--");

let timerId;

async function updateOTP() {
  otp.value = await generateTOTP(secret.value, digits.value);
  if (secret.value) {
    const period = 30;
    remain.value = period - Math.floor(Date.now() / 1000) % period;
  } else {
    remain.value = '--';
  }
}

onMounted(() => {
  getParams();
  updateOTP();
  timerId = setInterval(updateOTP, 1000);
});

onUnmounted(() => {
  clearInterval(timerId);
});
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.inputBox {
  padding: 0.75rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 10px;
  font-size: 1rem;
}
.otp {
  font-size: 2rem;
  font-weight: bold;
}
.timer {
  font-size: 1rem;
  font-weight: normal;
}
</style>