<template>
  <v-chart class="chart" :option="ChartOption" autoresize @click="echartClick" />
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, PropSync } from 'vue-property-decorator';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';

use([CanvasRenderer, BarChart, GridComponent, TooltipComponent]);

@Component
export default class HorizontalBarChart extends Vue {
  @Prop({ type: Array, default: () => ['rgba(13,144,255,1)'] })
  readonly color: string[];

  @Prop({ type: Array, default: [], required: true })
  readonly xAxisData: string[];

  @Prop({ type: Array, default: [], required: true })
  readonly seriesData: { name: string; value: number }[];

  get ChartOption() {
    const barData: {
      name: string;
      value: number;
      itemStyle: { [key: string]: any };
    }[] = this.seriesData.map((a, i) => {
      const t: { name: string; value: number; itemStyle: { [key: string]: any } } = {
        name: '',
        value: null,
        itemStyle: null,
      };
      t.name = a.name;
      t.value = a.value;
      t.itemStyle = {
        color: this.color.length > i ? this.color[i] : this.color[0],
        backgroundColor: '#ff0000',
        // borderColor: i === 0 ? 'rgba(40, 57, 167, 0.3)' : 'rgba(40, 57, 167, 0)',
        // borderWidth: i === 0 ? 4 : 0,
      };
      return t;
    });
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: '{b}:{c}',
      },
      grid: {
        top: '5%',
        bottom: '8%',
      },
      xAxis: {
        show: false,
        type: 'value',
        position: 'top',
      },
      yAxis: {
        type: 'category',
        inverse: true,
        data: this.xAxisData,
        axisLine: { show: false },
        axisTick: { show: false },
      },
      series: [
        {
          type: 'bar',
          barWidth: 20,
          selectedMode: 'single',
          select: {
            itemStyle: { borderColor: 'rgba(40, 57, 167, 0.3)', borderWidth: 4 },
          },
          label: {
            show: true,
            position: 'inside',
            color: '#fff',
          },
          data: barData,
        },
      ],
    };
  }

  public echartClick(item: Object) {
    this.$emit('echartClick', item);
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
