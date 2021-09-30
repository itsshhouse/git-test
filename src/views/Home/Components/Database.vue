<template>
  <div class="database">
    <BaseCard title="数据库">
      <template v-slot:card-content>
        <div class="text-box">
          <span class="text-box-num">{{ databaseList.length }}</span
          ><br />数据库总数
        </div>
        <DiagramChart
          class="chart"
          :color="color"
          :series-data="seriesData"
          :legend-posi="legendPosi"
        />
      </template>
    </BaseCard>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, PropSync } from 'vue-property-decorator';
import BaseCard from '@/template/VueTemplate/BaseCard.vue';
import DiagramChart, { legendPosiModel } from '@/components/ECharts/DiagramChart.vue';
import { HomeDataModel } from '@/api/ApiService';

@Component({
  components: { BaseCard, DiagramChart },
})
export default class TransferStatistics extends Vue {
  color: string[] = ['#27BCE3', '#9044FF', '#4B8CFE'];

  public databaseList: HomeDataModel[] = this.$store.state.DBList;

  public seriesData: { name: string; value: number }[] = [];

  public mounted() {
    const data: { [x: string]: any } = {};
    this.databaseList.forEach(a => {
      data[a.type] = data[a.type] || 0;
      data[a.type]++;
    });

    for (const i in data) {
      if (Object.prototype.hasOwnProperty.call(data, i)) {
        this.seriesData.push({ name: i, value: data[i] });
      }
    }
  }

  public legendPosi: legendPosiModel = {
    orient: 'horizontal',
    top: 'top',
    bottom: null,
    left: 'center',
    right: null,
  };
}
</script>
<style lang="scss" scoped>
.database {
  .text-box {
    position: relative;
    top: 0.49rem;
    left: 0.31rem;
    float: left;
    width: 2.88rem;
    height: 1.04rem;
    padding-top: 0.8rem;
    background: url('../../../assets/images/Home/db_bg.png') no-repeat;
    text-align: center;
    font-size: 0.16rem;
    font-family: 'Source Han Sans CN';
    font-weight: 400;
    color: #f9faff;
  }
  .text-box-num {
    font-size: 0.36rem;
    font-weight: bold;
    color: #ffffff;
    line-height: 0.46rem;
  }
  .chart {
    float: left;
    position: relative;
    left: 0.8rem;
    width: 4rem;
    height: 3rem;
  }
}
</style>
