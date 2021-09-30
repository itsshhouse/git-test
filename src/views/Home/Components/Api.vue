<template>
  <div class="database">
    <BaseCard title="API调用情况">
      <template v-slot:card-content>
        <div class="info-box">
          <div
            v-for="(item, index) in totalState"
            :key="index"
            class="info-box-item"
            :style="{
              backgroundImage: 'url(' + infoData[item.name] + ')',
              backgroundRepeat: 'no-repeat',
            }"
          >
            <span class="info-box-item-num">{{ item.value }}</span
            ><br />
            {{ item.name }}
          </div>
        </div>
        <LineChart
          title="API实时调用情况"
          :color="color"
          :series-data="seriesData"
          :x-axis-data="xAxisData"
        />
      </template>
    </BaseCard>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, PropSync } from 'vue-property-decorator';
import BaseCard from '@/template/VueTemplate/BaseCard.vue';
import LineChart from '@/components/ECharts/LineChart.vue';
import { TotalStateModel } from '../Model';

@Component({
  components: { BaseCard, LineChart },
})
export default class TransferStatistics extends Vue {
  color = '#6800FF';

  @Prop({ type: Array, default: [], required: true })
  readonly xAxisData: string[];

  @Prop({ type: Array, default: [], required: true })
  readonly seriesData: number[];

  @Prop()
  readonly totalState: TotalStateModel[];

  // public infoData = [
  //   { name: '监测服务(个)', value: 0, bg: require('@/assets/images/Home/service-bg.png') },
  //   { name: '今日调用总量(次)', value: 0, bg: require('@/assets/images/Home/transfer-bg.png') },
  //   { name: '今日服务异常(次)', value: 0, bg: require('@/assets/images/Home/unusual-bg.png') },
  //   { name: '平均响应时间(秒)', value: 0, bg: require('@/assets/images/Home/response-bg.png') },
  // ];
  public infoData = {
    '监测服务(个)': require('@/assets/images/Home/service-bg.png'),
    '今日调用总量(次)': require('@/assets/images/Home/transfer-bg.png'),
    '今日服务异常(次)': require('@/assets/images/Home/unusual-bg.png'),
    '平均响应时间(秒)': require('@/assets/images/Home/response-bg.png'),
  };
}
</script>
<style lang="scss" scoped>
.database {
  .info-box {
    display: flex;
    width: 100%;
    margin-bottom: 0.26rem;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    .info-box-item {
      flex: 1;
      min-width: 1.07rem;
      height: 0.54rem;
      padding-left: 0.64rem;
      background: #efefef;
      margin: 0 0 0 0.2rem;
      font-size: 0.1rem;
      font-family: 'Source Han Sans CN';
      font-weight: 300;
      color: #6483be;
      text-align: center;
    }
    .info-box-item-num {
      font-size: 0.18rem;
      font-family: 'Source Han Sans CN';
      font-weight: bold;
      color: #6483be;
      line-height: 0.34rem;
    }
  }
  .chart {
    height: 2rem;
  }
}
</style>
