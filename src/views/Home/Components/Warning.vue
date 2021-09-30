<template>
  <div>
    <BaseCard title="预警信息">
      <template v-slot:card-content>
        <div style="width: 100%;height: 2.67rem;">
          <v-chart class="chart" :option="ChartOption" autoresize />
          <el-radio-group v-model="arrearsType" class="arreats-btn" @change="radioBtnChange">
            <el-radio-button label="当月欠费"></el-radio-button>
            <el-radio-button label="全部欠费"></el-radio-button>
          </el-radio-group>
          <el-table
            height="2.2rem"
            :data="tableData"
            class="table-box"
            :row-class-name="tableRowClassName"
            :header-cell-style="{
              background: 'rgba(32, 59, 145, 0.6)',
              color: '#fff',
              fontSize: '0.14rem',
              fontFamily: 'Source Han Sans CN',
              fontWeight: 'bold',
              borderRight: '1px dashed #b6bfd3',
            }"
            :cell-class-name="tableCellClassName"
          >
            <el-table-column type="index" label="序号" align="center"> </el-table-column>
            <el-table-column prop="plate" label="车牌" align="center"> </el-table-column>
            <el-table-column prop="count" label="笔数" align="center"> </el-table-column>
            <el-table-column prop="money" label="金额" align="center"> </el-table-column>
          </el-table>
        </div>
      </template>
    </BaseCard>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, PropSync } from 'vue-property-decorator';
import BaseCard from '@/template/VueTemplate/BaseCard.vue';
import { use } from 'echarts/core';
import { TitleComponent, LegendComponent } from 'echarts/components';

use([TitleComponent, LegendComponent]);

@Component({
  components: { BaseCard },
})
export default class Order extends Vue {
  public tableData = [
    { plate: '沪A26D72', count: 15, money: 2000 },
    { plate: '沪A26D72', count: 15, money: 2000 },
    { plate: '沪A26D72', count: 15, money: 2000 },
    { plate: '沪A26D72', count: 15, money: 2000 },
    { plate: '沪A26D72', count: 15, money: 2000 },
    { plate: '沪A26D72', count: 15, money: 2000 },
    { plate: '沪A26D72', count: 15, money: 2000 },
  ];

  public arrearsType = '当月欠费'; // 欠费类型：当月欠费、全部欠费

  get ChartOption() {
    const option = {
      title: {
        text: '预警值\n1000',
        left: '39%',
        top: 'center',
        textAlign: 'center',
        textStyle: {
          fontSize: 18,
          fontFamily: 'Microsoft YaHei',
          fontWeight: 'bold',
          color: '#2767DD',
          lineHeight: 32,
        },
      },
      legend: {
        width: 200,
        orient: 'horizontal',
        top: 'top',
        right: 'center',
        itemHeight: 10,
        itemWidth: 10,
      },
      color: ['#5ED7FF', '#5E7CFF'],
      series: [
        {
          name: '面积模式',
          type: 'pie',
          clockwise: false,
          startAngle: 0,
          radius: ['70%', '100%'],
          center: ['50%', '50%'],
          roseType: 'area',
          label: {
            fontSize: '16',
            fontWeight: 'bold',
            formatter: '{d}%',
          },
          labelLine: { length: 10, showAbove: true },
          data: [
            { value: 40, name: '当前消耗', label: { color: '#5ED7FF' } },
            { value: 38, name: '剩余数值', label: { color: '#5E7CFF' } },
          ],
        },
      ],
    };
    return option;
  }

  public radioBtnChange(value: string) {
    console.log(value);
  }

  public tableRowClassName(item: any) {
    return item.rowIndex % 2 === 0 ? 'bg-row' : '';
  }

  public tableCellClassName() {
    return 'cell-border';
  }
}
</script>
<style lang="scss" scoped>
.chart {
  // width: 100%;
  // height: 100%;
  float: left;
  width: 1.8rem;
  height: 2.67rem;
}
.arreats-btn {
  float: right;
  margin-bottom: 0.1rem;
}
.table-box {
  font-size: 0.12rem;
  font-family: 'Source Han Sans CN';
  font-weight: bold;
  color: #808080;
  width: 60%;
  float: right;
}
::v-deep {
  .el-table__body-wrapper {
    overflow-x: hidden;
  }
  .el-table .has-gutter tr {
    background: rgba(32, 59, 145, 1);
  }
  .el-table .bg-row {
    background: #b6c8f6;
  }
  .el-table .cell-border {
    border: 1px dashed #b6bfd3;
    border-left: none;
  }
  .el-radio-button {
    margin-left: 0.1rem;
  }
  .el-radio-button__inner {
    background: #d5d5d5;
    border-radius: 4px;
    width: 0.6rem;
    padding: 0.07rem 0;
  }
  .el-radio-button:last-child .el-radio-button__inner {
    border-radius: 4px;
  }
}
</style>
