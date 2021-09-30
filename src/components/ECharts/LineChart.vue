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
  @Prop({ type: String, default: () => '#0D90FF' })
  public color: string;

  @Prop({ type: Array, default: [], required: true })
  readonly xAxisData: string[];

  @Prop({ type: Array, default: [], required: true })
  readonly seriesData: number[];

  @Prop({ type: String, default: () => '' })
  readonly title: string;

  get ChartOption() {
    return {
      title: {
        text: this.title,
        textStyle: {
          fontSize: '14px',
          fontFamily: 'Source Han Sans CN',
          fontWeight: 400,
          color: '#1B1B1B',
        },
        left: '30',
        top: 0,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'line', // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: '{b}:<br/>{c}',
      },
      grid: {
        top: this.title === '' ? '5%' : '18%',
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
      series: [
        {
          type: 'line',
          barWidth: 20,
          data: this.seriesData,
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: hex2rgb(this.color), // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: hex2rgb(this.color, 0.1), // 100% 处的颜色
                },
              ],
              globalCoord: false, // 缺省为 false
            },
          },
        },
      ],
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
