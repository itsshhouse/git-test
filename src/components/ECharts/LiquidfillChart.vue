<template>
  <v-chart class="chart" :option="ChartOption" autoresize />
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, PropSync } from 'vue-property-decorator';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import { hex2rgb } from '@/common/rgbUtils';

use([CanvasRenderer, BarChart, GridComponent, TooltipComponent]);

@Component
export default class vBarChart extends Vue {
  @Prop({ type: String, default: () => '#4090EA' })
  readonly color: string;

  @Prop({ type: Number, default: () => 0.5 })
  readonly percent: number;

  get ChartOption() {
    return {
      series: [
        {
          type: 'liquidFill',
          radius: '90%',
          data: [this.percent, this.percent, this.percent],
          label: {
            normal: {
              color: this.percent <= 0.4 ? this.color : '#fff',
              insideColor: 'transparent',
              textStyle: {
                fontSize: '30%',
                fontWeight: 'bold',
              },
            },
          },
          backgroundStyle: {
            borderWidth: 1,
            borderColor: this.color,
            color: 'rgba(255,255,255,0)',
            shadowColor: 'rgba(0, 0, 0, 0)',
            shadowBlur: 0,
          },
          color: [this.color],
          outline: {
            show: true,
            borderDistance: 10,
            itemStyle: {
              shadowColor: 'rgba(0, 0, 0, 0)',
              shadowBlur: 0,
              borderColor: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: hex2rgb(this.color, 0), // 'rgba(64,144,234,0)', // 0% 处的颜色
                  },
                  {
                    offset: 1 - this.percent,
                    color: hex2rgb(this.color, 0), // 0% 处的颜色
                  },
                  {
                    offset: 1 - this.percent,
                    color: this.color, // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: this.color, // 100% 处的颜色
                  },
                ],
                global: false,
              },
              borderWidth: 5,
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
