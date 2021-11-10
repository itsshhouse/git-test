<template>
  <div class="filter-tools">
    <el-select v-model="company" placeholder="请选择">
      <el-option v-for="item in companys" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <el-select v-model="value" filterable placeholder="请输入员工姓名">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <el-select v-model="method" placeholder="请选择统计方式" @change="methodChange">
      <el-option
        v-for="item in methodList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <label>缴费时间：</label>
    <el-date-picker
      v-model="dateTime"
      :type="method === 'month' ? 'month' : 'date'"
      placeholder="选择日期"
      :picker-options="pickerOptions"
    >
    </el-date-picker>

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

  public staffList: { [x: string]: any }[] = [
    {
      value: '张三',
      label: '张三',
    },
    {
      value: '李四',
      label: '李四',
    },
    {
      value: '王五',
      label: '王五',
    },
    {
      value: '赵六',
      label: '赵六',
    },
  ];

  public parking = '';

  public methodList: { [x: string]: any }[] = [
    {
      value: 'day',
      label: '按日统计',
    },
    {
      value: 'month',
      label: '按月统计',
    },
  ];

  public method = 'day';

  public dateTime = moment().startOf('day');

  get pickerOptions() {
    return {
      disabledDate: (date: any) =>
        date > (this.method === 'month' ? moment().startOf('month') : moment().startOf('day')),
    };
  }

  public methodChange(value: string) {
    this.dateTime = value === 'month' ? moment().startOf('month') : moment().startOf('day');
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
}
</style>
