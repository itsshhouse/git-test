<template>
  <div class="statistics-container">
    <BaseCard>
      <template v-slot:card-content>
        <el-button type="success" style="float:right;" @click="exportData">导出</el-button>
        <el-table
          id="rebateSetTable"
          :data="statisticsData"
          style="width: 100%;"
          :stripe="true"
          :height="tableHeight"
        >
          <el-table-column prop="company" label="所属公司" width="180"> </el-table-column>
          <el-table-column prop="date" label="日期" width="180"> </el-table-column>
          <el-table-column prop="total" label="日订单总量"> </el-table-column>
          <el-table-column prop="turnover" label="平台周转率"> </el-table-column>
          <el-table-column prop="pay" label="已支付订单"> </el-table-column>
          <el-table-column prop="arrears" label="欠费订单"> </el-table-column>
          <el-table-column prop="payRate" label="订单日内支付率"> </el-table-column>
          <el-table-column prop="arrearsRate" label="订单日内缴费率"> </el-table-column>
          <el-table-column prop="payRateAvg" label="订单日内支付率历史平均"> </el-table-column>
          <el-table-column prop="arrearsRateAvg" label="订单日内缴费率历史平均"> </el-table-column>
          <el-table-column prop="wechat" label="日微信支付记录笔数"> </el-table-column>
          <el-table-column prop="alipay" label="日支付宝支付记录笔数"> </el-table-column>
        </el-table>
      </template>
    </BaseCard>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, PropSync } from 'vue-property-decorator';
import BaseCard from '@/template/VueTemplate/BaseCard.vue';
import exportExcel from '@/components/ExcelAction/ExportExcel';
import { utils, write } from 'xlsx';

@Component({ components: { BaseCard } })
export default class Statistics extends Vue {
  public statisticsData = [
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 1000,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 1000,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 1000,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 1000,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 1000,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 1000,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 1000,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 1000,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 1000,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 1000,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 1000,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 1000,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 1000,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 1000,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 1000,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 1000,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 1000,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 1000,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 1000,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 1000,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 1000,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 1000,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
    {
      company: '上海智能交通有限公司',
      date: '2021-10-22',
      total: 1000,
      turnover: 5.4,
      pay: 650,
      arrears: 350,
      payRate: '65%',
      arrearsRate: '65%',
      payRateAvg: '65%',
      arrearsRateAvg: '65%',
      wechat: '300',
      alipay: '300',
    },
  ];

  get tableHeight() {
    return window.innerHeight * 0.5;
  }

  public exportData() {
    const wb = utils.table_to_book(document.querySelector('#rebateSetTable'));
    const fileName = '订单统计';
    exportExcel(wb, fileName);
  }
}
</script>
<style lang="scss" scoped>
.statistics-container {
  margin: 0.2rem;
}
</style>
