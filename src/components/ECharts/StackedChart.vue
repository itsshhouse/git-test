<template>
  <v-chart class="chart" :option="ChartOption" autoresize />
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, PropSync } from 'vue-property-decorator';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';

export interface legendPosiModel {
  orient: string;
  top: string | number;
  bottom: string | number;
  left: string | number;
  right: string | number;
}

use([CanvasRenderer, BarChart, GridComponent, TooltipComponent, LegendComponent]);

@Component
export default class StackedBarChart extends Vue {
  @Prop({ type: Array, default: () => ['#506EB3', '#6FBFE7', '#3E52C1'] })
  readonly color: string[];

  @Prop({
    type: Object,
    default: { orient: 'vertical', top: 'bottom', bottom: null, left: null, right: '0' },
  })
  readonly legendPosi: legendPosiModel;

  @Prop({ type: Array, default: [], required: true })
  readonly xAxisData: string[];

  @Prop({ type: Array, default: [], required: true })
  readonly seriesData: { name: string; value: number | number[]; stack?: string }[];

  get ChartOption() {
    const series = [];
    for (let i = 0, il = this.seriesData.length; i < il; i++) {
      const obj = {
        type: 'bar',
        barWidth: 50,
        name: this.seriesData[i].name,
        stack: this.seriesData[i].stack || '',
        data: this.seriesData[i].value,
      };
      series.push(obj);
    }
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
        // formatter: '{b}:<br/>{c}',
        // formatter: (params: any) => {
        //   let tooltip = '';
        //   for (const item of params) {
        //     tooltip += `${item.data[item.dimensionNames[0]]}:${item.data[item.dimensionNames[1]]}`;
        //   }
        //   return tooltip;
        // },
      },
      legend: {
        itemWidth: 20,
        itemHeight: 10,
        zlevel: 0,
        z: 0,
        top: this.legendPosi.top,
        bottom: this.legendPosi.bottom,
        left: this.legendPosi.left,
        right: this.legendPosi.right,
        orient: this.legendPosi.orient, // 'vertical',
      },
      grid: {
        top: '10%',
        bottom: '10%',
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
