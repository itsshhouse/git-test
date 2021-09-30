<template>
  <v-chart class="chart" :option="ChartOption" autoresize />
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, PropSync } from 'vue-property-decorator';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import { object, string } from 'underscore';

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

  @Prop({ type: Array, default: [], required: true })
  readonly seriesData: { name: string; value: number }[];

  get ChartOption() {
    const pieData: {
      name: string;
      value: number;
      label: { [key: string]: any };
    }[] = this.seriesData.map((a, i) => {
      const t: { name: string; value: number; label: { [key: string]: any } } = {
        name: '',
        value: null,
        label: null,
      };
      t.name = a.name;
      t.value = a.value;
      t.label = {
        show: true,
        position: 'outer',
        formatter: '{b}\n{hr|}\n{d}%',
        lineHeight: 18,
        width: '100',
        // padding: [0, -4, 0, 0],
        align: 'left',
        overflow: 'truncate',
        ellipsis: '...',
        alignTo: 'labelLine',
        distanceToLabelLine: 0,
        rich: {
          hr: {
            borderColor: this.color[i],
            width: '100%',
            borderWidth: 1,
            height: 0,
          },
        },
      };
      return t;
    });
    return {
      tooltip: {
        trigger: 'item',
      },
      color: this.color,
      series: [
        {
          name: '',
          type: 'pie',
          radius: ['40%', '60%'],
          labelLine: {
            show: true,
            length2: 30,
          },
          data: pieData, // this.seriesData,
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
