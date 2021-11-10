<template>
  <div class="root">
    <filter-tools />
    <summarize />
    <base-table
      class="table-box"
      :table-data="statisticsData"
      :data-model="tableModel"
      :enable-export="true"
      :sortable="false"
      @exportData="exportData"
    />
  </div>
</template>
<style lang="scss" scoped>
@import './styles';
</style>
