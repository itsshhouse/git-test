<template>
  <div>
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
        >
          <el-table-column prop="name" label="收费员姓名" :sortable="sortable" align="center">
          </el-table-column>
          <el-table-column label="总金额" align="center">
            <el-table-column prop="totalNow" label="现收" :sortable="sortable" align="center">
            </el-table-column>
            <el-table-column prop="totalRecover" label="追缴" :sortable="sortable" align="center">
            </el-table-column>
          </el-table-column>
          <el-table-column label="微信" align="center">
            <el-table-column prop="wechatNow" label="现收" :sortable="sortable" align="center">
            </el-table-column>
            <el-table-column prop="wechatRecover" label="追缴" :sortable="sortable" align="center">
            </el-table-column>
          </el-table-column>
          <el-table-column label="支付宝" align="center">
            <el-table-column prop="aliNow" label="现收" :sortable="sortable" align="center">
            </el-table-column>
            <el-table-column prop="aliRecover" label="追缴" :sortable="sortable" align="center">
            </el-table-column>
          </el-table-column>
          <el-table-column label="其它" align="center">
            <el-table-column prop="otherNow" label="现收" :sortable="sortable" align="center">
            </el-table-column>
            <el-table-column prop="otherRecover" label="追缴" :sortable="sortable" align="center">
            </el-table-column>
          </el-table-column>
        </el-table>
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

  public activated() {
    this.$nextTick(() => {
      const el = document.querySelector('#rebateSetTable') as HTMLElement;
      this.tableHeight = window.innerHeight - el.offsetTop - 140;
    });
  }

  public exportData() {
    const wb = utils.table_to_book(document.querySelector('#rebateSetTable'));
    this.$emit('exportData', wb, this.tableData);
  }
}
</script>
<style lang="scss" scoped>
::v-deep {
  .el-table th {
    font-size: 0.18rem;
    font-family: 'Source Han Sans CN';
    font-weight: 500;
    color: #090909;
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
  .el-table__header thead.is-group th {
    background: rgba(215, 224, 254, 0.52);
  }
  .el-table--border th {
    border-bottom: 1px solid #e5e5e5;
    border-right: 1px solid #e5e5e5;
  }
}
</style>
