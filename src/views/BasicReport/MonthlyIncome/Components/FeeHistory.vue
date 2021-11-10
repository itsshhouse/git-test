<template>
  <div>
    <BaseCard title="本期停车订单详情">
      <template v-slot:card-content>
        <v-chart class="chart" :option="ChartOption" autoresize />
      </template>
    </BaseCard>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import BaseCard from '@/template/VueTemplate/BaseCard.vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
import { LegendComponent } from 'echarts/components';

use([CanvasRenderer, BarChart, LegendComponent]);

@Component({
  components: { BaseCard },
})
export default class OrderDetail extends Vue {
  get ChartOption() {
    const option = this.getChartOption();
    return option;
  }

  public getChartOption() {
    const option = {
      legend: {
        show: false,
      },
      color: ['#86B3F4', '#89CBDD', '#89DDDB'],
      dataset: {
        // 提供一份数据。
        source: [
          ['year', '2021'],
          ['一月', 43.3],
          ['二月', 83.1],
          ['三月', 86.4],
          ['四月', 72.4],
          ['五月', 72.4],
          ['六月', 72.4],
          ['七月', 72.4],
          ['八月', 72.4],
          ['九月', 72.4],
          ['十月', 72.4],
          ['十一月', 72.4],
          ['十二月', 72.4],
        ],
      },
      // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
      xAxis: { type: 'category' },
      // 声明一个 Y 轴，数值轴。
      yAxis: {},
      // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
      series: [
        {
          type: 'bar',
          barWidth: 22,
          label: {
            show: true,
            fontSize: 8,
            fontFamily: 'Source Han Sans CN',
            fontWeight: 400,
            color: '#A2ACB4',
            position: 'top',
          },
          itemStyle: {
            borderRadius: [10, 10, 0, 0],
          },
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
