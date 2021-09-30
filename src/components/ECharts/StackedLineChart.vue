<template>
  <v-chart class="chart" :option="ChartOption" autoresize />
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, PropSync } from 'vue-property-decorator';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from 'echarts/components';
import { hex2rgb } from '@/common/rgbUtils';

use([CanvasRenderer, LineChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent]);

@Component
export default class lineChart extends Vue {
  @Prop({
    type: Array,
    default: () => [
      '#3682E1',
      '#5DDD9F',
      '#9DCFD8',
      '#BA5879',
      '#D3DA1D',
      '#21F1EF',
      '#2459E0',
      '#EBA116',
      '#6600FF',
      '#A230E4',
    ],
  })
  public color: string;

  // @Prop({ type: Array, default: [], required: true })
  public xAxisData: string[];

  @Prop({ type: Array, default: [] })
  readonly seriesData: { name: string; value: { [x: string]: any }[] }[];

  get ChartOption() {
    const series = [];
    for (let i = 0, il = this.seriesData.length; i < il; i++) {
      const obj = {
        name: this.seriesData[i].name,
        type: 'line',
        data: this.seriesData[i].value.map(a => a.SESSIONTOTAL),
        showSymbol: false,
      };
      series.push(obj);
      if (i === 0) {
        this.xAxisData = this.seriesData[i].value.map(a => a.TIME);
      }
    }
    return {
      title: {
        show: false,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'line', // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: '{b}:<br/>{c}',
      },
      color: this.color,
      xAxis: {
        type: 'category',
        data: this.xAxisData, // ['监测服务（个）', '今日调用总量（次）', '今日服务异常（次）', '平均响应时间（秒）'],
      },
      yAxis: {
        type: 'value',
      },
      series,
    };
  }
}
</script>
<style lang="scss" scoped>
.chart {
  flex-direction: column;
  flex: 1;
  position: relative;
  z-index: 1;
}
</style>
