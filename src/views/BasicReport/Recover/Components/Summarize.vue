<template>
  <div class="summarize-container">
    <BaseCard>
      <template v-slot:card-content>
        <div class="info-box">
          总员工记录数<br /><span class="info-num">{{ count }}</span
          >条
        </div>
        <div class="info-box">
          总收入金额<br /><span class="info-num">{{ income }}</span
          >元
        </div>
      </template>
    </BaseCard>
    <BaseCard>
      <template v-slot:card-content>
        <div class="chart-box">
          <div class="total-info">
            总现收金额：<span class="total-num">{{ receiptAmount }}</span
            >元
          </div>
          <v-chart class="chart" :option="ChartOption" autoresize />
        </div>
      </template>
    </BaseCard>
    <BaseCard>
      <template v-slot:card-content>
        <div class="chart-box">
          <div class="total-info">
            总追缴金额：<span class="total-num">{{ recoverAmount }}</span
            >元
          </div>
        </div>
        <v-chart class="chart" :option="orderChartOption" autoresize />
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
export default class Sumarize extends Vue {
  public count = 6;

  public income = 222680;

  public receipt = [
    { value: 1048, name: '总微信现收金额' },
    { value: 735, name: '总支付宝现收金额' },
    { value: 580, name: '总现金现收金额' },
    { value: 484, name: '总其它现收金额' },
  ];

  public recover = [
    { value: 1048, name: '总微信追缴金额' },
    { value: 735, name: '总支付宝追缴金额' },
    { value: 580, name: '总现金追缴金额' },
    { value: 484, name: '总其它追缴金额' },
  ];

  get receiptAmount() {
    return this.receipt.map(item => item.value).reduce((x, y) => x + y);
  }

  get recoverAmount() {
    return this.recover.map(item => item.value).reduce((x, y) => x + y);
  }

  get ChartOption() {
    const option = this.getChartOption('现收金额', this.receipt);
    return option;
  }

  get orderChartOption() {
    const option = this.getChartOption('追缴金额', this.recover);
    return option;
  }

  public getChartOption(title: string, seriesData: any) {
    const option = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        top: 'center',
        right: '50',
        itemWidth: 14,
        itemHeight: 14,
        itemGap: 15,
        textStyle: {
          color: 'inherit',
          fontSize: 14,
          fontFamily: 'Source Han Sans CN',
          fontWeight: 400,
        },
      },
      color: ['#61D79B', '#1773DD', '#5DB7D2', '#BF8AF2'],
      series: [
        {
          name: title,
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['30%', '50%'],
          avoidLabelOverlap: false,
          clockwise: false,
          startAngle: 90,
          label: {
            show: true,
            position: 'outside',
            textStyle: {
              color: 'inherit',
            },
          },
          labelLine: {
            show: true,
          },
          itemStyle: {
            borderColor: 'rgba(255,255,255,1)',
            borderWidth: 5,
          },
          data: seriesData,
        },
      ],
    };
    return option;
  }
}
</script>
<style lang="scss" scoped>
.summarize-container {
  margin: 0.1rem 0.1rem 0;
  display: flex;
  gap: 0.1rem;
  .info-box {
    width: 1.55rem;
    height: 0.72rem;
    margin: 0.17rem 0.48rem;
    font-size: 0.16rem;
    font-family: 'Source Han Sans CN';
    font-weight: 400;
    color: #f9faff;
    line-height: 46px;
    text-align: center;
    &:first-child {
      background: url('../.././../../assets/images/BasicReport/bg-red.png') no-repeat;
      background-size: contain;
    }
    &:last-child {
      background: url('../.././../../assets/images/BasicReport/bg-orange.png') no-repeat;
      background-size: contain;
    }
    .info-num {
      font-size: 0.24rem;
      line-height: 0.24rem;
    }
  }
  .chart-box {
    position: relative;
    .total-info {
      position: absolute;
      right: 0.5rem;
      top: 0.15rem;
      font-size: 0.18rem;
      font-family: 'Source Han Sans CN';
      font-weight: 500;
      color: #090909;
    }
    .total-num {
      font-size: 0.26rem;
      color: #ffc67e;
      padding-right: 0.1rem;
    }
  }
}
.chart {
  height: 2.11rem;
  min-width: 6.54rem;
  float: left;
}
</style>
