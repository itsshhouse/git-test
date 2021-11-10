<template>
  <div class="base-table">
    <BaseCard>
      <template v-slot:card-content>
        <el-button
          v-if="enableExport"
          type="success"
          style="float:right;margin-bottom:0.1rem;"
          @click="exportData"
          >导出</el-button
        >
        <el-table
          id="rebateSetTable"
          :data="tableData"
          style="width: 100%;"
          :stripe="true"
          :height="tableHeight"
          :border="true"
        >
          <el-table-column
            v-for="(val, key, index) in dataModel"
            :key="index"
            :type="val === '序号' ? 'index' : ''"
            :width="val === '序号' ? '80' : ''"
            :label="val.label ? val.label : val"
            :prop="val !== '序号' && key !== 'customSetting' ? key : ''"
            :sortable="val !== '序号' && key !== 'customSetting' ? sortable : false"
          >
            <template slot-scope="scope">
              <div v-if="key === 'customSetting'">
                <el-button
                  v-for="action in val.actions"
                  :key="action"
                  size="mini"
                  type="text"
                  @click="handleAction(scope.$index, scope.row)"
                  >{{ action }}</el-button
                >
              </div>
              {{ val === '序号' ? scope.$index + 1 : tableData[scope.$index][key] }}
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          :current-page="currentPage"
          :page-size="20"
          layout="total, prev, pager, next, jumper"
          :total="pageCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </template>
    </BaseCard>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, PropSync } from 'vue-property-decorator';
import BaseCard from '@/template/VueTemplate/BaseCard.vue';
import { utils } from 'xlsx';

@Component({ components: { BaseCard } })
export default class BaseTable extends Vue {
  @Prop()
  public tableData: { [x: string]: any }[];

  @Prop()
  public dataModel: { [x: string]: any };

  @Prop({ default: () => false })
  public enableExport: boolean;

  @Prop({ default: () => false })
  public sortable: boolean;

  public tableHeight = 0;

  public pageCount = 0;

  public currentPage = 1;

  public activated() {
    this.pageCount = this.tableData.length;
    this.$nextTick(() => {
      const el = document.querySelector('#rebateSetTable') as HTMLElement;
      this.tableHeight = window.innerHeight - el.offsetTop - 200;
    });
  }

  public exportData() {
    const wb = utils.table_to_book(document.querySelector('#rebateSetTable'));
    this.$emit('exportData', wb, this.tableData);
  }

  public handleAction(index: number, row: any) {
    this.$emit('tableAction', index, row);
  }

  public handleSizeChange(val: number) {
    console.log(`每页 ${val} 条`);
  }

  public handleCurrentChange(val: number) {
    console.log(`当前页: ${val}`);
  }
}
</script>
<style lang="scss" scoped>
::v-deep {
  .el-table th,
  .el-table__header th {
    font-size: 0.18rem;
    font-family: 'Source Han Sans CN';
    font-weight: 500;
    color: #090909;
    background: rgba(215, 224, 254, 0.52);
  }
  .el-table td {
    font-size: 0.16rem;
    font-family: 'Source Han Sans CN';
    font-weight: 400;
    color: #090909;
  }
  .el-table--striped .el-table__body tr.el-table__row--striped td {
    background: rgba(215, 224, 254, 0.52);
  }
  .el-table--border th {
    border-bottom: 1px solid #e5e5e5;
    border-right: 1px solid #e5e5e5;
  }
  .el-pagination {
    float: right;
    margin: 0.1rem 0;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background: #3e52c1;
  }
}
</style>
