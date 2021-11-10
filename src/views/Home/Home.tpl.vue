<template>
  <div class="root">
    <topContainer class="database" />
    <el-row :gutter="21">
      <el-col :span="8"><deviceStatus class="ml mt"/></el-col>
      <el-col :span="8"><order class="mt"/></el-col>
      <el-col :span="8"><warning class="mr mt"/></el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="16"> <turnover class="ml mt"/></el-col>
      <el-col :span="8"><turnover-top class="mr mt"/></el-col>
    </el-row>
  </div>
</template>
<style lang="scss" scoped>
@import './styles';
</style>
