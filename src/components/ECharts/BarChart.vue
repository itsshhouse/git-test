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
  show: boolean;
  orient: string;
  top: string | number;
  bottom: string | number;
  left: string | number;
  right: string | number;
}

use([CanvasRenderer, BarChart, GridComponent, TooltipComponent, LegendComponent]);

@Component
export default class vBarChart extends Vue {
  @Prop({ type: String, default: () => 'rgba(13,144,255,1)' })
  readonly color: string;

  @Prop({
    type: Object,
    default: {
      show: true,
      orient: 'vertical',
      top: 'bottom',
      bottom: null,
      left: null,
      right: '0',
    },
  })
  readonly legendPosi: legendPosiModel;

  @Prop({ type: Array, default: [], required: true })
  readonly xAxisData: string[];

  @Prop({ type: Array, default: [], required: true })
  readonly seriesData: string[];

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
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: '{b}:<br/>{c}',
        // formatter: (params: any) => {
        //   let tooltip = '';
        //   for (const item of params) {
        //     tooltip += `${item.data[item.dimensionNames[0]]}:${item.data[item.dimensionNames[1]]}`;
        //   }
        //   return tooltip;
        // },
      },
      legend: {
        show: this.legendPosi.show,
        itemWidth: 10,
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
        top: this.title === '' ? '5%' : '18%',
        bottom: '8%',
      },
      color: this.color,
      // color: {
      //   type: 'linear',
      //   x: 0,
      //   y: 0,
      //   x2: 0,
      //   y2: 1,
      //   colorStops: [
      //     {
      //       offset: 0,
      //       color: this.color, // 0% 处的颜色
      //     },
      //     {
      //       offset: 1,
      //       color: 'rgba(13,144,255,0.1)', // 100% 处的颜色
      //     },
      //   ],
      //   globalCoord: false, // 缺省为 false
      // },
      xAxis: {
        type: 'category',
        data: this.xAxisData, // ['监测服务（个）', '今日调用总量（次）', '今日服务异常（次）', '平均响应时间（秒）'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          type: 'bar',
          barWidth: 20,
          data: this.seriesData,
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
