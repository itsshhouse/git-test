<template>
  <div class="root">
    <topContainer class="database" />
    <deviceStatus class="device-status" />
    <order class="device-status" />
    <warning class="device-status" />
    <turnover class="turnover" />
    <turnover-top class="device-status" />
    <!-- <server class="server" :series-data="serverChart" :x-axis-data="['Windows', 'Linux']" /> -->
    <!-- <transfer-statistics :series-data="seriesData" :x-axis-data="xAxisData" /> -->
    <!-- <api
      class="api"
      :series-data="apiSeriesData"
      :x-axis-data="apiXAxisData"
      :total-state="totalState"
    />
    <warning class="warning" :series-data="warnSeriesData" :x-axis-data="warnXAxisData" />
    <warning-list class="warning-list" :warning-list="warningList" /> -->
  </div>
</template>
<style lang="scss" scoped>
@import './styles';
</style>
