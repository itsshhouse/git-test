<template>
  <el-dialog title="设置总票据数" :visible.sync="dialogTableVisible">
    <el-table :data="gridData">
      <el-table-column type="index" label="序号" width="150"></el-table-column>
      <el-table-column label="票据数" width="200">
        <template slot-scope="scope">
          <el-input-number :value="scope.row.date" :min="1"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column property="name" label="操作人" width="200"></el-table-column>
      <el-table-column property="address" label="操作时间"></el-table-column>
      <el-table-column property="address" label="操作"></el-table-column>
    </el-table>
    <!-- <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number> -->
  </el-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, PropSync } from 'vue-property-decorator';

@Component
export default class Summarize extends Vue {}
</script>
<style lang="scss" scoped></style>
