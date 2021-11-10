<template>
  <div class="summarize-container">
    <div
      v-for="(item, index) in summarizeData"
      :key="index"
      class="info-box"
      :style="{
        backgroundImage: 'url(' + item.img + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
      }"
    >
      {{ item.name }}<br /><span>{{ item.value }}</span>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, PropSync } from 'vue-property-decorator';

@Component
export default class Summarize extends Vue {
  public summarizeData = [
    {
      name: '总订单',
      value: 100000,
      img: require('@/assets/images/Operations/bg-total@2x.png'),
    },
    {
      name: '总微信支付记录笔数',
      value: 100000,
      img: require('@/assets/images/Operations/bg-wechat@2x.png'),
    },
    {
      name: '总支付宝支付记录笔数',
      value: 100000,
      img: require('@/assets/images/Operations/bg-alipay@2x.png'),
    },
  ];
}
</script>
<style lang="scss" scoped>
.summarize-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 0.3rem;
  .info-box {
    width: 4.98rem;
    height: 1.6rem;
    padding-top: 0.25rem;
    font-size: 0.3rem;
    font-family: 'Source Han Sans CN';
    font-weight: 400;
    color: #ffffff;
    text-align: center;
    line-height: 0.6rem;
    span {
      font-size: 0.48rem;
      font-weight: 500;
    }
  }
}
</style>
