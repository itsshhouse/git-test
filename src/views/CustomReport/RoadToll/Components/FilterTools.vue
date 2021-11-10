<template>
  <div class="filter-tools">
    <label>路段：</label>
    <el-select v-model="company" placeholder="请选择路段">
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
}
</style>
