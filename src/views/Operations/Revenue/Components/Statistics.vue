<template>
  <div class="statistics-container">
    <BaseCard>
      <template v-slot:card-content>
        <v-chart class="chart" :option="ChartOption" autoresize />
        <v-chart class="chart" :option="PayChartOption" autoresize />
      </template>
    </BaseCard>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, PropSync } from 'vue-property-decorator';
import BaseCard from '@/template/VueTemplate/BaseCard.vue';

@Component({ components: { BaseCard } })
export default class Statistics extends Vue {
  get ChartOption() {
    const option = {
      legend: {
        orient: 'vertical',
        top: 'center',
        right: 40,
      },
      color: ['#6375DE', '#6EB2B3', '#89D34F'],
      series: [
        {
          name: '面积模式',
          type: 'pie',
          clockwise: false,
          startAngle: 0,
          radius: ['50%', '80%'],
          center: ['40%', '50%'],
          roseType: 'area',
          label: {
            fontSize: '16',
            fontWeight: 'bold',
            formatter: '{d}%',
          },
          labelLine: { length: 10, showAbove: true },
          data: [
            { value: 40, name: '总订单金额', label: { color: '#6375DE' } },
            { value: 38, name: '总欠费金额', label: { color: '#6EB2B3' } },
            { value: 32, name: '总追缴金额', label: { color: '#89D34F' } },
          ],
        },
      ],
    };
    return option;
  }

  get PayChartOption() {
    const option = {
      legend: {
        orient: 'vertical',
        top: 'center',
        right: 40,
      },
      color: ['#1FD86E', '#0E7CE2', '#89D34F'],
      series: [
        {
          name: '面积模式',
          type: 'pie',
          clockwise: false,
          startAngle: 90,
          radius: ['50%', '80%'],
          center: ['40%', '50%'],
          roseType: 'area',
          label: {
            fontSize: '16',
            fontWeight: 'bold',
            formatter: '{d}%',
          },
          labelLine: { length: 10, showAbove: true },
          data: [
            { value: 40, name: '异常订单', label: { color: '#9A96F8' } },
            { value: 38, name: '欠费订单', label: { color: '#42A4FF' } },
            { value: 32, name: '已支付订单', label: { color: '#5EE6B1' } },
          ],
        },
      ],
    };
    return option;
  }
}
</script>
<style lang="scss" scoped>
.statistics-container {
  margin: 0.2rem;
  height: 2.58rem;
  .chart {
    height: 2.36rem;
    width: 50%;
    float: left;
  }
}
</style>
