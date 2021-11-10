<template>
  <div class="base-card">
    <el-card class="box-card">
      <div
        v-if="title !== '' && title !== undefined && title !== null"
        slot="header"
        class="clearfix"
      >
        <span class="base-card-title">{{ title }}</span>
        <!-- <div v-show="showDate" class="date-controll">
          <el-date-picker
            v-model="dateTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd HH"
          >
          </el-date-picker>
          <el-button type="primary" class="search-btn">查询</el-button>
        </div> -->
      </div>
      <!-- body上下左右边距各20 -->
      <slot name="card-content"> </slot>
    </el-card>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class BaseCard extends Vue {
  @Prop()
  readonly title: string;

  // @Prop({ type: Boolean, default: true })
  // readonly showDate: boolean;

  // public dateTime = [
  //   moment().startOf('day'),
  //   moment()
  //     .add(1, 'day')
  //     .startOf('day'),
  // ];
}
</script>
<style lang="scss" scoped>
.base-card-title {
  font-size: 0.18rem;
  font-family: Source Han Sans CN;
  font-weight: bold;
  color: #293aa7;
  border-left: 0.02rem solid #293aa7;
  padding-left: 0.1rem;
  flex: 1;
}
.date-controll {
  flex: 1;
  align-self: end;
}
.search-btn {
  margin-left: 0.1rem;
}
.clearfix {
  display: flex;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card {
  box-shadow: 0px 8px 13px 0px rgba(0, 20, 85, 0.09);
}
::v-deep {
  .el-date-editor.el-input__inner {
    width: 2.5rem;
  }
}
</style>
