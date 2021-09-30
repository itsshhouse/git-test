<template>
  <div>
    <BaseCard title="日周转率TOP10">
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
import { BarChart } from 'echarts/charts';
import { TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';

use([BarChart, TooltipComponent, LegendComponent, GridComponent]);

@Component({
  components: { BaseCard },
})
export default class Order extends Vue {
  public chartData = [
    { name: '太原路1111111111111', value: 8.4 },
    { name: '襄阳北路', value: 7.4 },
    { name: '桃江路', value: 6.4 },
    { name: '桂林路', value: 4.1 },
    { name: '永康路', value: 3.3 },
  ];

  public firstBg = require('@/assets/images/Home/icon-first.png');

  public secondBg = require('@/assets/images/Home/icon-second.png');

  public thirdBg = require('@/assets/images/Home/icon-third.png');

  get ChartOption() {
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // Use axis to trigger tooltip
          type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
        },
      },
      grid: {
        top: '3%',
        left: '30%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        show: false,
      },
      yAxis: {
        type: 'category',
        inverse: true,
        axisTick: { show: false },
        axisLabel: {
          inside: true,
          align: 'left',
          margin: -150,
          fontSize: 14,
          fontFamily: 'Source Han Sans CN',
          fontWeight: 500,
          color: '#3288BF',
          formatter(value: string, index: number) {
            let val = value.length > 10 ? `${value.substr(0, 10)}...` : value;
            switch (index) {
              case 0:
                val = `{firstBg|}{label|${val}}`;
                break;
              case 1:
                val = `{secondBg|}{label|${val}}`;
                break;
              case 2:
                val = `{thirdBg|}{label|${val}}`;
                break;
              default:
                val = `{default|}{label|${val}}`;
                break;
            }
            return val;
          },
          rich: {
            firstBg: {
              width: 22,
              height: 22,
              backgroundColor: {
                image: this.firstBg,
              },
            },
            secondBg: {
              width: 22,
              height: 22,
              backgroundColor: {
                image: this.secondBg,
              },
            },
            thirdBg: {
              width: 22,
              height: 22,
              backgroundColor: {
                image: this.thirdBg,
              },
            },
            default: {
              padding: [0, 0, 0, 22],
            },
            label: {
              padding: [0, 0, 0, 10],
            },
          },
        },
      },
      dataset: {
        dimensions: ['name', 'value'],
        source: this.chartData,
      },
      color: '#86b3f4',
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: 20,
          label: {
            show: true,
            position: 'right',
            color: '#86C9F4',
          },
          emphasis: {
            focus: 'series',
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
  width: 4.94rem;
  height: 2.67rem;
}
</style>
