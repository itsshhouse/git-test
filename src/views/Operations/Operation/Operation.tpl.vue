<template>
  <div class="root">
    <div class="filter-tools">
      <label>名称：</label>
      <el-select v-model="company" placeholder="请选择">
        <el-option
          v-for="item in companys"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
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
    <summarize />
    <!-- <statistics /> -->
    <base-table
      class="table-box"
      :table-data="statisticsData"
      :data-model="tableModel"
      :enable-export="true"
      @exportData="exportData"
    />
  </div>
</template>
<style lang="scss" scoped>
@import './styles';
</style>
