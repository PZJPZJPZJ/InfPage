# IP地址查询工具
<div class="container">
  <input
      class="inputBox"
      type="text"
      placeholder="输入需要查询的IP(Enter)(默认获取本机IP)"
      v-model="inputIP"
      @keyup.enter="searchIP"
  />
  <div v-if="ipInfo" class="info-container">
    <div class="info-title">基本信息</div>
    <div class="info-item"><strong>IP地址:</strong> {{ ipInfo.ip }}</div>
    <div class="info-item"><strong>RIR:</strong> {{ ipInfo.rir }}</div>
    <div class="info-item"><strong>查询用时:</strong> {{ ipInfo.elapsed_ms }}ms</div>
    <div class="info-item"><strong>非正常IP:</strong> {{ ipInfo.is_bogon ? '是' : '否' }}</div>
    <div class="info-item"><strong>移动网络:</strong> {{ ipInfo.is_mobile ? '是' : '否' }}</div>
    <div class="info-item"><strong>卫星网络:</strong> {{ ipInfo.is_satellite ? '是' : '否' }}</div>
    <div class="info-item"><strong>爬虫IP:</strong> {{ ipInfo.is_crawler ? '是' : '否' }}</div>
    <div class="info-item"><strong>数据中心IP:</strong> {{ ipInfo.is_datacenter ? '是' : '否' }}</div>
    <div class="info-item"><strong>TOR出口:</strong> {{ ipInfo.is_tor ? '是' : '否' }}</div>
    <div class="info-item"><strong>代理IP:</strong> {{ ipInfo.is_proxy ? '是' : '否' }}</div>
    <div class="info-item"><strong>VPN IP:</strong> {{ ipInfo.is_vpn ? '是' : '否' }}</div>
    <div class="info-item"><strong>滥用IP:</strong> {{ ipInfo.is_abuser ? '是' : '否' }}</div>
    <div class="info-title">位置信息</div>
    <div class="info-item"><strong>欧盟成员:</strong> {{ ipInfo.location.is_eu_member ? '是' : '否' }}</div>
    <div class="info-item"><strong>国际区号:</strong> {{ ipInfo.location.calling_code }}</div>
    <div class="info-item"><strong>货币代码:</strong> {{ ipInfo.location.currency_code }}</div>
    <div class="info-item"><strong>大洲:</strong> {{ ipInfo.location.continent }}</div>
    <div class="info-item"><strong>国家:</strong> {{ ipInfo.location.country }}</div>
    <div class="info-item"><strong>国家代码:</strong> {{ ipInfo.location.country_code }}</div>
    <div class="info-item"><strong>省份:</strong> {{ ipInfo.location.state }}</div>
    <div class="info-item"><strong>城市:</strong> {{ ipInfo.location.city }}</div>
    <div class="info-item"><strong>纬度:</strong> {{ ipInfo.location.latitude }}</div>
    <div class="info-item"><strong>经度:</strong> {{ ipInfo.location.longitude }}</div>
    <div class="info-item"><strong>邮编:</strong> {{ ipInfo.location.zip }}</div>
    <div class="info-item"><strong>时区:</strong> {{ ipInfo.location.timezone }}</div>
    <div class="info-item"><strong>当前时间:</strong> {{ ipInfo.location.local_time }}</div>
    <div class="info-item"><strong>Unix时间戳:</strong> {{ ipInfo.location.local_time_unix }}</div>
    <div class="info-item"><strong>夏令时:</strong> {{ ipInfo.location.is_dst ? '是' : '否' }}</div>
    <div class="info-title">公司信息</div>
    <div class="info-item"><strong>名称:</strong> {{ ipInfo.company.name }}</div>
    <div class="info-item"><strong>滥用分数:</strong> {{ ipInfo.company.abuser_score }}</div>
    <div class="info-item"><strong>域名:</strong> {{ ipInfo.company.domain }}</div>
    <div class="info-item"><strong>类型:</strong> {{ ipInfo.company.type }}</div>
    <div class="info-item"><strong>网络范围:</strong> {{ ipInfo.company.network }}</div>
    <div class="info-item"><strong>Whois查询:</strong> <a :href="ipInfo.company.whois" target="_blank">点击查看</a></div>
    <div class="info-title">ASN信息</div>
    <div class="info-item"><strong>ASN号:</strong> AS{{ ipInfo.asn.asn }}</div>
    <div class="info-item"><strong>滥用分数:</strong> {{ ipInfo.asn.abuser_score }}</div>
    <div class="info-item"><strong>路由:</strong> {{ ipInfo.asn.route }}</div>
    <div class="info-item"><strong>描述:</strong> {{ ipInfo.asn.descr }}</div>
    <div class="info-item"><strong>国家:</strong> {{ ipInfo.asn.country.toUpperCase() }}</div>
    <div class="info-item"><strong>状态:</strong> {{ ipInfo.asn.active ? '活跃' : '非活跃' }}</div>
    <div class="info-item"><strong>组织:</strong> {{ ipInfo.asn.org }}</div>
    <div class="info-item"><strong>域名:</strong> {{ ipInfo.asn.domain }}</div>
    <div class="info-item"><strong>滥用邮箱:</strong> <a :href="'mailto:' + ipInfo.asn.abuse">{{ ipInfo.asn.abuse }}</a></div>
    <div class="info-item"><strong>类型:</strong> {{ ipInfo.asn.type }}</div>
    <div class="info-item"><strong>更新时间:</strong> {{ new Date(ipInfo.asn.updated).toLocaleDateString() }}</div>
    <div class="info-item"><strong>RIR:</strong> {{ ipInfo.asn.rir }}</div>
    <div class="info-item"><strong>Whois查询:</strong> <a :href="ipInfo.asn.whois" target="_blank">点击查看</a></div>
    <div class="info-title">滥用联系信息</div>
    <div class="info-item"><strong>名称:</strong> {{ ipInfo.abuse.name }}</div>
    <div class="info-item"><strong>地址:</strong> {{ ipInfo.abuse.address }}</div>
    <div class="info-item"><strong>邮箱:</strong> {{ ipInfo.abuse.email }}</div>
    <div class="info-item"><strong>电话:</strong> {{ ipInfo.abuse.phone }}</div>
  </div>
</div>

<script setup>
import { ref, onMounted } from 'vue';

const inputIP = ref('');
const ipInfo = ref(null);

const getIP = async () => {
  try {
    const res = await fetch('https://api.ipapi.is/');
    const data = await res.json();
    ipInfo.value = data;
    inputIP.value = data.ip;
  } catch (error) {
    console.error('获取IP信息失败:', error);
  }
};

const searchIP = async () => {
  if (!inputIP.value) return;
  try {
    const res = await fetch(`https://api.ipapi.is/?q=${inputIP.value}`);
    const data = await res.json();
    ipInfo.value = data;
  } catch (error) {
    console.error('查询IP信息失败:', error);
  }
};

onMounted(() => {
  getIP();
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

.info-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
}

.info-item {
  padding: 0.5rem 0;
}

.info-item:last-child {
  border-bottom: none;
}

.info-item strong {
  margin-right: 0.5rem;
}
</style>