# Lucky:网络打洞穿透工具
## 下载地址
- [Github](https://github.com/gdy666/lucky)

## DockerCompose部署
```yaml
services:
  lucky:
    image: gdy666/lucky:latest
    container_name: lucky
    volumes:
      - ./goodluck:/goodluck
    network_mode: host
    restart: always
```

## 相关仓库
- [Natter](https://github.com/MikeWang000000/Natter)
- [NATMap](https://github.com/heiher/natmap)
- [N4](https://github.com/MikeWang000000/n4)
- [DDNS Go](https://github.com/jeessy2/ddns-go)
- [EasyTier](https://github.com/EasyTier/EasyTier)

## 相关论坛
- [V2EX](https://www.v2ex.com/)
- [恩山无线论坛](https://www.right.com.cn/forum/)

## 打洞端口查询工具
<div class="container">
  <input
      class="inputBox"
      type="text"
      placeholder="输入需要查询的域名(Enter)(读取URL参数name)"
      v-model="name"
      @keyup.enter="updateResults"
  />
  <div v-for="(item, index) in urlList" :key="index" class="list-item" @click="redirectPage(item.url)">
    <img class="favicon" :src="item.url + '/favicon.ico'">
    <span class="info">[{{ item.type }}]</span>
    <span class="info">{{ item.url }}</span>
  </div>
</div>

<script setup>
import { ref, onMounted } from "vue";

const urlList = ref([]);
const name = ref('');
const types = ['16', '28', '33'];

const dnsResolve = async (hostname, type) => {
  if (typeof window === 'undefined') return [];
  
  const url = `https://dns.alidns.com/resolve?name=${hostname}&type=${type}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    let items = [];
    if (type === '16') {
      items = txtDecode(data);
    } else if (type === '28') {
      items = ip4pDecode(data);
    } else if (type === '33') {
      items = srvDecode(data);
    }
    const typeMapping = { '16': 'TXT', '28': 'IP4P', '33': 'SRV' };
    items.forEach(item => item.type = typeMapping[type]);
    return items;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const txtDecode = (data) => {
  const items = [];
  if (data.Answer) {
    data.Answer.forEach(ans => {
      const name = ans.name.replace(/\.$/, '');
      const port = ans.data.replace(/[^0-9]/ig, '');
      items.push({ url: 'https://' + name + ':' + port });
    });
  }
  return items;
};

const ip4pDecode = (data) => {
  const items = [];
  if (data.Answer) {
    data.Answer.forEach(ans => {
      const parts = ans.data.split(':');
      const ipHi = parseInt(parts[3], 16);
      const ipLo = parseInt(parts[4], 16);
      const ipv4 = `${(ipHi >> 8)}.${ipHi & 0xFF}.${(ipLo >> 8)}.${ipLo & 0xFF}`;
      const port = parseInt(parts[2], 16);
      items.push({ url: 'https://' + ipv4 + ':' + port });
    });
  }
  return items;
};

const srvDecode = (data) => {
  const items = [];
  if (data.Answer) {
    data.Answer.forEach(ans => {
      const parts = ans.data.split(' ');
      const server = parts[3].replace(/\.$/, '');
      const port = parts[2];
      items.push({ url: 'https://' + server + ':' + port });
    });
  }
  return items;
};

const getParams = () => {
  if (typeof window === 'undefined') return;
  const queryParams = new URLSearchParams(window.location.search);
  const queryName = queryParams.get('name');
  if (queryName) {
    name.value = queryName;
  }
};

const updateResults = async () => {
  if (!name.value) return;
  let results = [];
  for (const type of types) {
    const res = await dnsResolve(name.value, type);
    results = results.concat(res);
  }
  urlList.value = results;
};

const redirectPage = (url) => {
  if (typeof window !== 'undefined') {
    window.open(url, '_blank');
  }
};

onMounted(() => {
  getParams();
  updateResults();
});
</script>
<style scoped>
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
.list-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid var(--vp-c-control);
  border-radius: 10px;
  cursor: pointer;
}
.favicon {
  width: 16px;
  height: 16px;
  padding: 0.2rem;
}
.info{
  padding: 0.2rem;
}
</style>