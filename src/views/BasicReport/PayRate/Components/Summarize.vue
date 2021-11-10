<template>
  <div class="summarize-container">
    <BaseCard>
      <template v-slot:card-content>
        <div class="info-container">
          <div v-for="(item, index) in summarizeData" :key="index" class="info-box">
            {{ item.name }}<br /><span>{{ item.value }}{{ item.unit }}</span>
          </div>
        </div>
      </template>
    </BaseCard>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, PropSync } from 'vue-property-decorator';
import BaseCard from '@/template/VueTemplate/BaseCard.vue';

@Component({ components: { BaseCard } })
export default class Summarize extends Vue {
  public summarizeData = [
    {
      name: '总车场记录数',
      value: 563,
      unit: '条',
    },
    {
      name: '总泊位数',
      value: 100000,
      unit: '个',
    },
    {
      name: '总订单数',
      value: 100000,
      unit: '个',
    },
    {
      name: '总订单金额',
      value: 100000,
      unit: '元',
    },
    {
      name: '总已支付金额',
      value: 100000,
      unit: '元',
    },
    {
      name: '总未支付金额',
      value: 100000,
      unit: '元',
    },
    {
      name: '平均订单金额支付占比',
      value: 54.9,
      unit: '%',
    },
  ];
}
</script>
<style lang="scss" scoped>
.summarize-container {
  margin: 0.3rem 0.1rem 0;
  .info-container {
    display: flex;
    justify-content: space-around;
    gap: 0.07rem;
    .info-box {
      float: left;
      flex: 1;
      height: 1.57rem;
      font-size: 0.18rem;
      font-family: 'Source Han Sans CN';
      font-weight: 400;
      color: #8b8b8b;
      text-align: center;
      line-height: 0.6rem;
      text-indent: 0.15rem;
      background: #fff;
      span {
        padding-left: 0.15rem;
        font-size: 0.3rem;
        font-weight: bold;
        color: #55bdff;
      }
    }
  }
}
</style>
