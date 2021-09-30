<template>
  <div class="warning-list">
    <BaseCard title="警告">
      <template v-slot:card-content>
        <el-table :data="warningList" border height="140" style="width: 100%;">
          <el-table-column prop="host" label="主机" width="250" align="center"> </el-table-column>
          <el-table-column prop="tag" label="标签" align="center"> </el-table-column>
          <el-table-column prop="type" label="类型" width="250" align="center"> </el-table-column>
          <el-table-column prop="message" label="消息" width="180" align="center">
          </el-table-column>
          <el-table-column
            prop="datetime"
            label="监控时间"
            width="180"
            align="center"
          ></el-table-column>
          <el-table-column prop="status" label="当前状态" width="180" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.status ? 'info' : 'danger'" disable-transitions>{{
                scope.row.status ? '已处置' : '未处置'
              }}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </BaseCard>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, PropSync } from 'vue-property-decorator';
import BaseCard from '@/template/VueTemplate/BaseCard.vue';

@Component({
  components: { BaseCard },
})
export default class TransferStatistics extends Vue {
  @Prop({ type: Array, default: [] })
  readonly warningList: any[];

  public statusFormatter(row: any) {
    if (row.status) {
      return '已处置';
    }
    return '未处置';
  }
}
</script>
<style lang="scss" scoped>
.warning-list {
  // width: 100%;
  // height: 100%;
}
</style>
