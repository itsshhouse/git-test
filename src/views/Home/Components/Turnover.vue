<template>
  <div>
    <BaseCard title="日周转率">
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
import { BarChart, LineChart } from 'echarts/charts';
import { TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';

use([BarChart, LineChart, TooltipComponent, LegendComponent, GridComponent]);

@Component({
  components: { BaseCard },
})
export default class Order extends Vue {
  public chartData = [
    { time: '0', today: 3.5, lastMonth: 3.3, lastYear: 2.8, max: 4.2 },
    { time: '1', today: 4.5, lastMonth: 4.3, lastYear: 3.8, max: 5.2 },
    { time: '2', today: 5.5, lastMonth: 5.3, lastYear: 4.8, max: 6.2 },
    { time: '3', today: 6.5, lastMonth: 6.3, lastYear: 5.8, max: 7.2 },
    { time: '4', today: 7.5, lastMonth: 7.3, lastYear: 6.8, max: 8.2 },
    { time: '5', today: 8.5, lastMonth: 8.3, lastYear: 7.8, max: 9.2 },
    { time: '6', today: 9.5, lastMonth: 9.3, lastYear: 8.8, max: 10.2 },
    { time: '7', today: 8.5, lastMonth: 8.3, lastYear: 9.8, max: 9.2 },
    { time: '8', today: 7.5, lastMonth: 7.3, lastYear: 8.8, max: 8.2 },
    { time: '9', today: 6.5, lastMonth: 6.3, lastYear: 7.8, max: 7.2 },
    { time: '10', today: 5.5, lastMonth: 5.3, lastYear: 6.8, max: 6.2 },
    { time: '11', today: 4.5, lastMonth: 4.3, lastYear: 5.8, max: 5.2 },
    { time: '12', today: 3.5, lastMonth: 3.3, lastYear: 4.8, max: 4.2 },
  ];

  get ChartOption() {
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999',
          },
        },
      },
      grid: {
        top: '5%',
        left: '5%',
        right: '5%',
      },
      legend: {
        left: 'center',
        top: 'bottom',
      },
      xAxis: [
        {
          type: 'category',
          // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisPointer: {
            type: 'shadow',
          },
        },
      ],
      yAxis: {
        type: 'value',
      },
      dataset: {
        // 用 dimensions 指定了维度的顺序。直角坐标系中，如果 X 轴 type 为 category，
        // 默认把第一个维度映射到 X 轴上，后面维度映射到 Y 轴上。
        // 如果不指定 dimensions，也可以通过指定 series.encode
        // 完成映射，参见后文。
        dimensions: ['time', 'today', 'lastMonth', 'lastYear', 'max'],
        source: this.chartData,
      },
      series: [
        {
          name: '当天',
          type: 'bar',
          barWidth: 22,
          // data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
          itemStyle: {
            color: '#5C7BD9',
          },
        },
        {
          name: '环比',
          type: 'line',
          // data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
          itemStyle: {
            color: '#FFB400',
          },
        },
        {
          name: '同比',
          type: 'line',
          // data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
          itemStyle: {
            color: '#D15BFD',
          },
        },
        {
          name: '极值',
          type: 'line',
          // data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
          itemStyle: {
            color: '#23E0A0',
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
  // width: 100%;
  // height: 100%;
  width: 10.38rem;
  height: 2.47rem;
}
</style>
