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

## 相关论坛
- [V2EX](https://www.v2ex.com/)
- [恩山无线论坛](https://www.right.com.cn/forum/)

## 打洞端口重定向工具
- [点击加入URL示例参数](?name=www.baidu.com)，参数可修改为有TXT、IP4P、SRV记录的域名，列表点击跳转解析的端口
<div class="container">
<div v-for="(item, index) in urlList" :key="index" class="list-item" @click="redirectPage(item.url)">
    <img class="favicon" :src="item.url + '/favicon.ico'">
    <span class="info">[{{ item.type }}][{{ item.url }}]</span>
</div>
</div>

<script setup>
import { ref, onMounted } from "vue";

const urlList = ref([]);

const dnsResolve = async (name, type) => {
  if (typeof window === 'undefined') return [];
  
  const url = `https://dns.alidns.com/resolve?name=${name}&type=${type}`;
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

onMounted(async () => {
  if (typeof window === 'undefined') return;
  const queryParams = new URLSearchParams(window.location.search);
  const name = queryParams.get('name');
  const types = ['16', '28', '33'];
  let results = [];
  for (const t of types) {
    const res = await dnsResolve(name, t);
    results = results.concat(res);
  }
  urlList.value = results;
});

const redirectPage = (url) => {
  if (typeof window !== 'undefined') {
    window.open(url, '_blank');
  }
};
</script>
<style scoped>
.list-item {
  display: flex;
  align-items: center;
  margin: 5px;
  padding: 10px;
  background-color: #FAFAFA;
  border-radius: 10px;
  cursor: pointer;
}

.favicon {
  width: 16px;
  height: 16px;
}
</style>