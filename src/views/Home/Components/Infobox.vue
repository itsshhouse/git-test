<template>
  <div class="info-box" :style="{ background: 'url(' + bgImg + ')', backgroundSize: 'contain' }">
    <h3 class="info-box-title">{{ name }}</h3>
    <v-chart class="chart" :option="ChartOption" autoresize />
    <div v-for="(item, index) in detail" :key="index" class="info-box-text">
      {{ item.name }}<span style="padding-left:0.3rem;">{{ item.value }}</span>
    </div>
    <!-- <div class="info-box-text">已缴总额<span style="padding-left:0.3rem;">100000</span></div>
    <div class="info-box-text">欠费总额<span style="padding-left:0.3rem;">100000</span></div> -->
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, PropSync } from 'vue-property-decorator';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import { TitleComponent } from 'echarts/components';

use([CanvasRenderer, PieChart, TitleComponent]);

@Component
export default class InfoBox extends Vue {
  @Prop({ type: Number, default: () => 0 })
  readonly rate: number;

  @Prop({ type: String, default: () => '' })
  readonly title: string;

  @Prop({ type: String, default: () => '' })
  readonly name: string;

  @Prop({ type: Array, default: [] })
  readonly detail: any[];

  @Prop({ type: String, default: [] })
  readonly bgImg: string;

  get ChartOption() {
    const option = {
      title: {
        text: `${this.title}\n${this.rate}%`,
        textStyle: {
          fontSize: '16',
          fontFamily: 'Source Han Sans CN',
          fontWeight: 'bold',
          color: '#fff',
          lineHeight: 21,
        },
        left: 'center',
        top: 'center',
      },
      series: [
        {
          name: this.name,
          type: 'pie',
          radius: ['90%', '100%'],
          avoidLabelOverlap: false,
          silent: true,
          itemStyle: {
            borderRadius: 40,
            borderColor: 'rgba(255,255,255,0.5)',
            borderWidth: 0,
          },
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: this.rate, name: this.title, itemStyle: { color: 'rgba(255,255,255,1)' } },
            {
              value: 100 - this.rate,
              name: this.title,
              itemStyle: { color: 'rgba(255,255,255,0.5)', borderRadius: 0 },
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
.info-box {
  position: relative;
  width: 3.98rem;
  height: 1.91rem;
  //background: url('../../../assets/images/Home/bg-blue@2x.png');
  //background-size: contain;
  .info-box-text {
    font-size: 0.16rem;
    font-family: 'Source Han Sans CN';
    font-weight: 400;
    color: #ffffff;
    line-height: 0.38rem;
    text-indent: 0.3rem;
  }
  .info-box-text:nth-child(4) {
    float: left;
  }
}
.info-box-title {
  margin: 0 0 0.2rem 0;
  font-size: 0.24rem;
  font-family: 'Source Han Sans CN';
  font-weight: 500;
  color: #ffffff;
  line-height: 0.24rem;
  text-indent: 0.3rem;
  padding-top: 0.65rem;
}
.chart {
  width: 1.1rem;
  height: 1.1rem;
  position: absolute;
  right: 0.38rem;
  top: 0.14rem;
}
</style>
