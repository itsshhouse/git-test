<template>
  <div class="info-box">
    <v-chart class="chart" :option="ChartOption" autoresize />
    <div class="info-detail">
      <span class="info-title"
        ><span class="icon-point" :style="{ background: color }"></span>总数：</span
      ><span class="info-num">{{ total }}</span>
    </div>
    <div class="info-detail">
      <span class="info-title"
        ><span class="icon-point" :style="{ background: color }"></span>离线：</span
      ><span class="info-num">{{ offline }}</span>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, PropSync } from 'vue-property-decorator';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { GaugeChart } from 'echarts/charts';
import { TitleComponent } from 'echarts/components';

use([CanvasRenderer, GaugeChart, TitleComponent]);

@Component
export default class TransferStatistics extends Vue {
  @Prop({ type: Number, default: () => 0 })
  readonly rate: number;

  @Prop({ type: String, default: () => '' })
  readonly title: string;

  @Prop({ type: Number, default: () => 0 })
  readonly total: number;

  @Prop({ type: Number, default: () => 0 })
  readonly offline: number;

  @Prop({ type: String, default: () => '' })
  readonly color: string;

  get ChartOption() {
    const option = {
      title: {
        text: this.title,
        left: 'center',
        top: 0,
        textStyle: {
          fontSize: 20,
          fontFamily: 'Source Han Sans CN',
          fontWeight: 400,
          color: '#000000',
        },
      },
      series: [
        {
          type: 'gauge',
          // radius: '90%',
          center: ['50%', '50%'],
          progress: {
            show: true,
            width: 18,
          },
          axisLine: {
            lineStyle: {
              width: 18,
            },
          },
          pointer: { show: false },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          anchor: {
            show: false,
          },
          title: {
            show: false,
          },
          itemStyle: { color: this.color },
          detail: {
            valueAnimation: true,
            fontSize: 24,
            fontFamily: 'Source Han Sans CN',
            fontWeight: 400,
            color: '#515367',

            offsetCenter: [0, 0],
            formatter(value: any) {
              return `${value}%`;
            },
          },
          data: [{ name: '离线率', value: this.rate }],
        },
      ],
    };
    return option;
  }
}
</script>
<style lang="scss" scoped>
.content-box {
  display: flex;
  width: 4.94rem;
  height: 2.37rem;
  .info-box {
    flex: 1;
    .chart {
      width: 100%;
      height: 1.8rem;
    }
    .info-detail {
      width: 50%;
      margin: 0 auto;
      font-size: 0.16rem;
      font-family: 'Source Han Sans CN';
      font-weight: 400;
      color: #515367;
      line-height: 0.28rem;
      white-space: nowrap;

      .icon-point {
        display: inline-block;
        width: 0.1rem;
        height: 0.1rem;
        margin-right: 0.15rem;
        border: 0;
        border-radius: 0.05rem;
      }
      .info-title {
        letter-spacing: 0.05rem;
        text-align: right;
      }
      .info-num {
        letter-spacing: 0;
        text-align: left;
      }
    }
  }
}
</style>
