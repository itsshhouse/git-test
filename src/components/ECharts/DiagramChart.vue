<template>
  <v-chart class="chart" :option="ChartOption" autoresize />
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, PropSync } from 'vue-property-decorator';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';

export interface legendPosiModel {
  orient: string;
  top: string | number;
  bottom: string | number;
  left: string | number;
  right: string | number;
}

use([CanvasRenderer, PieChart, GridComponent, TooltipComponent]);

@Component
export default class DiagramChart extends Vue {
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
  readonly color: string[];

  @Prop({
    type: Object,
    default: { orient: 'vertical', top: 'bottom', bottom: null, left: null, right: '0' },
  })
  readonly legendPosi: legendPosiModel;

  @Prop({ type: Array, default: [], required: true })
  readonly seriesData: string[];

  get ChartOption() {
    return {
      tooltip: {
        show: true,
        confine: true,
        // formatter: '{b}:<br/>数量{c}<br/>百分:{d}%',
      },
      legend: {
        itemWidth: 10,
        itemHeight: 10,
        zlevel: 0,
        z: 0,
        formatter: (name: string) => {
          if (!name) return '';
          name = name.substring(name.lastIndexOf('/') + 1);
          // 超出几个字符隐藏，鼠标悬浮时显示
          if (name.length > 6) {
            name = `${name.slice(0, 10)}...`;
          }
          return name;
        },
        tooltip: {
          show: true,
        },
        textStyle: {
          color: '#B4E2E9',
        },
        top: this.legendPosi.top,
        bottom: this.legendPosi.bottom,
        left: this.legendPosi.left,
        right: this.legendPosi.right,
        orient: this.legendPosi.orient, // 'vertical',
      },
      color: this.color,
      series: [
        {
          // name: '面积模式',
          type: 'pie',
          radius: [40, 90],
          center: ['50%', '50%'],
          roseType: 'area',
          label: {
            color: '#FF8400',
            fontSize: '16',
            fontWeight: 'bold',
            formatter: '{d}%',
          },
          labelLine: { length: 2 },
          data: this.seriesData,
          // [
          //   { value: 40, name: 'rose 1' },
          //   { value: 38, name: 'rose 2' },
          //   { value: 32, name: 'rose 3' },
          //   { value: 30, name: 'rose 4' },
          //   { value: 28, name: 'rose 5' },
          //   { value: 26, name: 'rose 6' },
          //   { value: 22, name: 'rose 7' },
          //   { value: 18, name: 'rose 8' },
          // ],
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
