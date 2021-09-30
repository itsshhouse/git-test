<template>
  <div class="top-container">
    <infoBox
      v-for="(item, index) in infoData"
      :key="index"
      :title="item.title"
      :rate="item.rate"
      :name="item.name"
      :detail="item.detail"
      :bg-img="item.bg"
    />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, PropSync } from 'vue-property-decorator';
import infoBox from './Infobox.vue';

@Component({ components: { infoBox } })
export default class TransferStatistics extends Vue {
  // public infoData = [
  //   { name: '监测服务(个)', value: 0, bg: require('@/assets/images/Home/service-bg.png') },
  //   { name: '今日调用总量(次)', value: 0, bg: require('@/assets/images/Home/transfer-bg.png') },
  //   { name: '今日服务异常(次)', value: 0, bg: require('@/assets/images/Home/unusual-bg.png') },
  //   { name: '平均响应时间(秒)', value: 0, bg: require('@/assets/images/Home/response-bg.png') },
  // ];
  // public infoData = {
  //   '监测服务(个)': require('@/assets/images/Home/service-bg.png'),
  //   '今日调用总量(次)': require('@/assets/images/Home/transfer-bg.png'),
  //   '今日服务异常(次)': require('@/assets/images/Home/unusual-bg.png'),
  //   '平均响应时间(秒)': require('@/assets/images/Home/response-bg.png'),
  // };
  public infoData = [
    {
      name: '营收情况',
      detail: [
        { name: '订单总额', value: 10000 },
        { name: '已缴总额', value: 10000 },
        { name: '欠费总额', value: 10000 },
      ],
      title: '缴费率',
      rate: 70,
      bg: require('@/assets/images/Home/bg-blue@2x.png'),
    },
    {
      name: '计时停车',
      detail: [
        { name: '车场总数', value: 10000 },
        { name: '总车位数', value: 10000 },
        { name: '空余车位数', value: 10000 },
      ],
      title: '使用率',
      rate: 70,
      bg: require('@/assets/images/Home/bg-cyan@2x.png'),
    },
    {
      name: '计次停放',
      detail: [
        { name: '停放次数', value: 10000 },
        { name: '已支付笔数', value: 10000 },
        { name: '未支付笔数', value: 10000 },
      ],
      title: '有效使用率',
      rate: 70,
      bg: require('@/assets/images/Home/bg-green@2x.png'),
    },
    {
      name: '在岗情况',
      detail: [
        { name: '设备总数', value: 10000 },
        { name: '签到人数', value: 10000 },
      ],
      title: '缴费率',
      rate: 70,
      bg: require('@/assets/images/Home/bg-purple@2x.png'),
    },
  ];
}
</script>
<style lang="scss" scoped>
.top-container {
  display: flex;
  justify-content: space-around;
}
</style>
