<template>
  <div class="filter-tools">
    <label>名称：</label>
    <el-select v-model="company" placeholder="请选择">
      <el-option v-for="item in companys" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <label>日期：</label>
    <el-date-picker
      v-model="dateTime"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions"
    >
    </el-date-picker>
    <p class="tips">
      (订单总数、订单总金额、未支付、月卡支付词素按照离位时间查询，APP支付、扫码支付、追缴金额按照支付时间查询)
    </p>
    <el-button type="primary">查询</el-button>
  </div>
</template>
<script lang="ts">
import moment from 'moment';
import { Vue, Component, Prop, Watch, PropSync } from 'vue-property-decorator';

@Component
export default class FilterTools extends Vue {
  public companys: { [x: string]: any }[] = [
    {
      value: 'shznjt',
      label: '上海智能交通有限公司',
    },
  ];

  public dateTime = [
    moment().startOf('day'),
    moment()
      .add(1, 'day')
      .startOf('day'),
  ];

  get pickerOptions() {
    return {
      disabledDate: (date: any) =>
        date >
        moment()
          .add(1, 'day')
          .startOf('day'),
    };
  }

  public inquireClick() {
    this.$emit('inquireClick', {});
  }
}
</script>
<style lang="scss" scoped>
.filter-tools {
  margin-top: 0.1rem;
  display: flex;
  padding-left: 0.32rem;
  justify-content: flex-start;
  align-items: center;
  gap: 0.16rem;
  min-width: 100%;
  flex: 3;
  .tips {
    font-size: 0.12rem;
    font-family: 'Source Han Sans CN';
    font-weight: 500;
    color: #5f5f5f;
  }
}
</style>
