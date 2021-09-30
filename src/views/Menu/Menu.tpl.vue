<template>
  <el-container class="its-container">
    <el-header class="its-header">
      <h2 class="its-header-title">{{ appTitle }}</h2>
    </el-header>
    <el-menu
      :default-active="activeMenu"
      class="its-menu"
      mode="vertical"
      :unique-opened="true"
      @select="handleSelect"
    >
      <el-menu-item index="/menu/home">
        <span style="padding-left: 0.3rem;" class="icon-home">首页</span>
      </el-menu-item>

      <!-- <el-menu-item index="/menu/database" class="icon-analysis">
        数据库监控
      </el-menu-item> -->
      <!-- <el-menu-item index="/menu/api" class="icon-interface">
        API监控
      </el-menu-item> -->
      <el-submenu index="menu/financial">
        <template slot="title">
          <span style="padding-left: 0.3rem;" class="icon-financial">财务管理</span>
        </template>
        <!-- <el-menu-item index="/menu/db/monitor">基础报表</el-menu-item>
        <el-menu-item index="/menu/db/history">定制报表</el-menu-item> -->
        <el-submenu index="menu/financial/basic">
          <template slot="title">基础报表</template>
          <el-menu-item index="menu/financial/basic/monthlyIncome">月收入汇总</el-menu-item>
          <el-menu-item index="menu/financial/basic/detailIncome">详细收入统计</el-menu-item>
        </el-submenu>
        <el-submenu index="menu/financial/custom">
          <template slot="title">定制报表</template>
          <el-menu-item index="menu/financial/custom/performance">收费员绩效表</el-menu-item>
          <el-menu-item index="menu/financial/custom/employeeFee">员工收费统计</el-menu-item>
        </el-submenu>
      </el-submenu>
      <!-- <el-submenu index="menu/api">
        <template slot="title">
          <span style="padding-left: 0.3rem;" class="icon-api">API监控</span>
        </template>
        <el-menu-item index="/menu/api/analysis">API调用统计分析</el-menu-item>
        <el-menu-item index="/menu/api/interface">所有服务清单</el-menu-item>
        <el-menu-item index="/menu/api/recording">访问记录</el-menu-item>
      </el-submenu>
      <el-menu-item index="/menu/server">
        <span class="icon-server">服务器监控</span>
      </el-menu-item>
      <el-menu-item index="/menu/user">
        <span class="icon-user">用户管理</span>
      </el-menu-item> -->
    </el-menu>
    <el-main class="its-main">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index">{{
          menuNameCN[item]
        }}</el-breadcrumb-item>
      </el-breadcrumb>
      <keep-alive>
        <router-view />
      </keep-alive>
    </el-main>
  </el-container>
</template>
<style lang="scss" scoped>
@import '@/css/_variables.scss';
$imgFolder: '../../assets/images/';

.its-container ::v-deep {
  height: 100vh;
  width: 100vw;
  padding: 0;
  margin: 0;
  overflow: hidden;
  .el-header {
    height: 0.7rem !important;
    background: #3e52c1;
    .its-header-title {
      padding: 0;
      margin: 0;
      font-size: 0.32rem;
      font-family: 'AliHYAiHei-Beta';
      font-weight: 400;
      color: #fcfcfc;
      line-height: 0.7rem;
      text-indent: 0.2rem;
    }
  }

  .its-menu {
    width: 2.2rem;
    background: #203b91;
    box-shadow: 0px 8px 7px 0px rgba(0, 20, 85, 0.56);
    height: calc(100vh - 0.7rem);
  }
  .el-menu-item,
  .el-submenu__title {
    font-size: 0.2rem;
    font-family: 'Source Han Sans CN';
    font-weight: 400;
    color: #ffffff;
    background: #203b91;
  }

  .its-main {
    position: absolute;
    top: 0.7rem;
    left: 2.2rem;
    padding: 0;
    margin: 0;
    overflow-y: auto;
    height: calc(100% - 0.8rem);
    width: calc(100% - 2.2rem);
  }
  .el-breadcrumb {
    margin-left: 0.2rem;
  }
  .el-breadcrumb__item {
    margin: 0.05rem;
    font-size: 0.16rem;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #000;
  }
}
$imgName: ('home', 'financial');
$imgHover: '-hover';
$imgExtension: '@2x.png';

@each $item in $imgName {
  .icon- {
    &#{$item} {
      display: block;
      background: url($imgFolder+'icon-'+$item+$imgExtension) no-repeat 0 0.18rem;
      background-size: 0.2rem 0.2rem;
    }
  }
}
</style>
