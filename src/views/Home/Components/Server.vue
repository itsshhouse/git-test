<template>
  <div class="database">
    <BaseCard title="服务器">
      <template v-slot:card-content>
        <div class="info-box">
          <div
            v-for="(val, key, i) of infoData"
            :key="i"
            class="info-box-item"
            :style="{
              backgroundImage: 'url(' + val.bg + ')',
              backgroundRepeat: 'no-repeat',
            }"
          >
            <span class="info-box-item-num">{{ Math.floor(val.value) }}</span>
            <br />
            {{ key }}
          </div>
        </div>
        <BarChart :legend-posi="legendPosi" :series-data="seriesData" :x-axis-data="xAxisData" />
      </template>
    </BaseCard>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, PropSync } from 'vue-property-decorator';
import BaseCard from '@/template/VueTemplate/BaseCard.vue';
import BarChart, { legendPosiModel } from '@/components/ECharts/StackedChart.vue';
import { GetServersInfoModel } from '@/api/ApiService';

@Component({
  components: { BaseCard, BarChart },
})
export default class TransferStatistics extends Vue {
  color: string[] = ['#27BCE3', '#9044FF', '#4B8CFE'];

  public xAxisData: string[] = [];

  public seriesData: { name: string; value: number | number[]; stack?: string }[] = [];

  public server: GetServersInfoModel[] = this.$store.state.Server;

  public legendPosi: legendPosiModel = {
    orient: 'vertical',
    top: 'center',
    bottom: null,
    left: 'right',
    right: null,
  };

  public infoData = {
    '主机总数(个)': { value: 0, bg: require('@/assets/images/Home/zhuji.png') },
    'CPU总核数(个)': { value: 0, bg: require('@/assets/images/Home/cpu.png') },
    '内存总和(G)': { value: 0, bg: require('@/assets/images/Home/neicun.png') },
  };

  public mounted() {
    const data: { [x: string]: any } = {};
    for (let i = 0, il = this.server.length; i < il; i++) {
      this.infoData['CPU总核数(个)'].value += this.server[i].cpuCount;
      this.infoData['内存总和(G)'].value += this.server[i].totalMem / 1024;
      data[this.server[i].osName] = data[this.server[i].osName] || { num: 0, down: 0 };
      data[this.server[i].osName].num++;
      // if(this.server[i].status){
      //   data[this.server[i].osName].normal++;
      // }
    }
    this.infoData['主机总数(个)'].value = this.server.length;
    const normal = [];
    const down = [];
    for (const i in data) {
      if (Object.prototype.hasOwnProperty.call(data, i)) {
        normal.push(data[i].num - data[i].down);
        down.push(data[i].down);
        this.xAxisData.push(i);
      }
    }
    this.seriesData.push({ name: '正常', value: normal, stack: 'server' });
    this.seriesData.push({ name: '离线', value: down, stack: 'server' });
  }
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
