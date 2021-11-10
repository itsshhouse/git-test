<template>
  <div>
    <BaseCard title="本期已收停车费">
      <template v-slot:card-content>
        <v-chart class="chart" :option="ChartOption" autoresize />
      </template>
    </BaseCard>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, PropSync } from 'vue-property-decorator';
import BaseCard from '@/template/VueTemplate/BaseCard.vue';
import { use } from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { TitleComponent, LegendComponent } from 'echarts/components';

use([BarChart, TitleComponent, LegendComponent]);

@Component({
  components: { BaseCard },
})
export default class Order extends Vue {
  get ChartOption() {
    const option = {
      title: {
        text: '本期已收停车费\n',
        left: '50%',
        top: 'center',
        textAlign: 'center',
        itemGap: -20,
        padding: 0,
        textStyle: {
          verticalAlign: 'top',
          fontSize: 20,
          fontFamily: 'Source Han Sans CN',
          fontWeight: 500,
          color: '#2645A9',
          lineHeight: 24,
        },
        subtext: '1000',
        subtextStyle: {
          fontSize: 24,
          fontFamily: 'Source Han Sans CN',
          fontWeight: 'bold',
          color: '#2645A9',
          lineHeight: 24,
        },
      },
      legend: {
        orient: 'horizontal',
        left: 'center',
        itemWidth: 14,
        itemHeight: 14,
        itemGap: 50,
      },
      color: ['#1FD86E', '#1677FF', '#89DDDB', '#89CBDD'],
      series: [
        {
          name: '面积模式',
          type: 'pie',
          clockwise: false,
          startAngle: 90,
          radius: ['50%', '80%'],
          center: ['50%', '50%'],
          roseType: 'area',
          label: {
            fontSize: '16',
            fontWeight: 'bold',
            formatter: '{d}%',
          },
          labelLine: { length: 10, showAbove: true },
          data: [
            { value: 40, name: '微信', label: { color: '#1FD86E' } },
            { value: 38, name: '支付宝', label: { color: '#1677FF' } },
            { value: 32, name: '其它', label: { color: '#89DDDB' } },
            { value: 21, name: '退款', label: { color: '#89CBDD' } },
          ],
        },
      ],
    };
    return option;
  }
}
</script>
<style lang="scss" scoped>
.chart {
  height: 3.5rem;
}
</style>
