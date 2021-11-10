<template>
  <div>
    <BaseCard title="本期停车订单详情">
      <template v-slot:card-content>
        <div class="chart-container">
          <v-chart class="chart" :option="ChartOption" autoresize />
          <v-chart class="chart" :option="orderChartOption" autoresize />
        </div>
      </template>
    </BaseCard>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import BaseCard from '@/template/VueTemplate/BaseCard.vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { GaugeChart } from 'echarts/charts';
import { TitleComponent } from 'echarts/components';

use([CanvasRenderer, GaugeChart, TitleComponent]);

@Component({
  components: { BaseCard },
})
export default class OrderDetail extends Vue {
  get ChartOption() {
    const option = this.getChartOption('本期新增订单', 30, '笔', 123456, ['#fecb86', '#fdb160']);
    return option;
  }

  get orderChartOption() {
    const option = this.getChartOption('新增订单金额', 30, '元', 123456, ['#17b2fc', '#5186df']);
    return option;
  }

  public getChartOption(title: string, value: number, unit: string, rate: number, color: string[]) {
    const option = {
      title: {
        text: title,
        bottom: 30,
        left: 'center',
        textStyle: {
          color: '#000',
        },
      },
      series: [
        {
          type: 'gauge',
          center: ['50%', '60%'],

          radius: '85%',
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 100,
          splitNumber: 12,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: color[0], // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: color[1], // 100% 处的颜色
                },
              ],
              globalCoord: false, // 缺省为 false
            },
          },
          progress: {
            show: true,
            width: 10,
          },
          pointer: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              width: 10,
            },
          },
          axisTick: {
            distance: -25,
            splitNumber: 5,
            length: 10,
            lineStyle: {
              width: 1,
              color: '#999',
            },
          },
          splitLine: {
            show: false,
            distance: -32,
            length: 5,
            lineStyle: {
              width: 1,
              color: '#999',
            },
          },
          axisLabel: {
            show: false,
          },
          anchor: {
            show: false,
          },
          detail: {
            valueAnimation: true,
            width: '60%',
            lineHeight: 40,
            borderRadius: 8,
            offsetCenter: [0, '-15%'],
            fontSize: 20,
            fontWeight: 'bolder',
            formatter: `${rate} ${unit}`,
            color: 'auto',
          },
          data: [
            {
              value,
            },
          ],
        },
      ],
    };
    return option;
  }
}
</script>
<style lang="scss" scoped>
.chart-container {
  height: 2.5rem;

  .chart {
    height: 100%;
    width: 50%;
    float: left;
  }
}
</style>
