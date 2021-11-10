<template>
  <div class="root">
    <el-row>
      <el-col :span="24"
        ><div class="filter-tools">
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
            type="month"
            placeholder="选择日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>

          <el-button type="primary">查询</el-button>
        </div></el-col
      >
    </el-row>
    <el-row :gutter="10">
      <el-col :span="16"><order class="order"/></el-col>
      <el-col :span="8"><order-detail class="order-detail"/></el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="16"><fee-history class="order"/></el-col>
      <el-col :span="8"><charge class="order-detail"/></el-col>
    </el-row>
  </div>
</template>
<style lang="scss" scoped>
@import './styles';
</style>
