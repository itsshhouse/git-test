<template>
  <div>
    <BaseCard title="订单统计">
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
        text: '订单总数\n1000',
        left: '39%',
        top: 'center',
        textAlign: 'center',
        textStyle: {
          fontSize: 18,
          fontFamily: 'Microsoft YaHei',
          fontWeight: 'bold',
          color: '#2767DD',
          lineHeight: 32,
        },
      },
      legend: {
        orient: 'vertical',
        top: 'center',
        right: 40,
      },
      color: ['#9A96F8', '#42A4FF', '#5EE6B1'],
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
.chart {
  // width: 100%;
  // height: 100%;
  width: 4.94rem;
  height: 2.37rem;
}
</style>
