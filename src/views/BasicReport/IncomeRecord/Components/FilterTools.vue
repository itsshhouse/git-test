<template>
  <div class="filter-tools">
    <el-select v-model="company" placeholder="请选择">
      <el-option v-for="item in companys" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <el-input v-model="plateNo" placeholder="请输入车牌号码" maxlength="15"> </el-input>
    <el-input v-model="orderNo" placeholder="请输入订单编号" maxlength="15"> </el-input>
    <el-input v-model="dealNo" placeholder="请输入交易编号" maxlength="15"> </el-input>

    <el-date-picker
      v-model="dateTime"
      type="datetimerange"
      range-separator="至"
      start-placeholder="支付开始时间"
      end-placeholder="支付结束时间"
      :picker-options="pickerOptions"
    >
    </el-date-picker>
    <el-select v-model="payType" placeholder="请选择统支付渠道">
      <el-option
        v-for="item in payTypeList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-select v-model="plateColor" placeholder="请选择车牌颜色">
      <el-option
        v-for="item in plateColorList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>

    <el-button type="primary" @click="inquireClick">查询</el-button>
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

  public company = '';

  public plateNo = '';

  public orderNo = '';

  public dealNo = '';

  public payTypeList: { [x: string]: any }[] = [
    {
      value: 'wechat',
      label: '微信支付',
    },
    {
      value: 'alipay',
      label: '支付宝支付',
    },
    {
      value: 'cash',
      label: '现金支付',
    },
  ];

  public payType = '';

  public plateColorList: { [x: string]: any }[] = [
    {
      value: 'blue',
      label: '蓝色',
    },
    {
      value: 'yellow',
      label: '黄色',
    },
    {
      value: 'green',
      label: '绿色',
    },
    {
      value: 'black',
      label: '黑色',
    },
    {
      value: 'white',
      label: '白色',
    },
    {
      value: 'other',
      label: '其它',
    },
  ];

  public plateColor = '';

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
  flex-wrap: wrap;
}
::v-deep {
  .el-input {
    max-width: 2rem;
  }
}
</style>
