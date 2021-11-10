<template>
  <el-container class="its-container">
    <el-header class="its-header">
      <h2 class="its-header-title">{{ appTitle }}</h2>
    </el-header>
    <el-container>
      <el-aside class="its-aside" width="2.2rem">
        <el-menu
          :default-active="activeMenu"
          class="its-menu"
          mode="vertical"
          :unique-opened="true"
          @select="handleSelect"
        >
          <el-menu-item index="/menu/home">
            <span class="icon-home">首页</span>
          </el-menu-item>
          <el-submenu index="/menu/operations">
            <template slot="title">
              <span class="icon-operations">运营分析</span>
            </template>
            <el-menu-item
              v-for="(item, index) in menus.operations"
              :key="item + index"
              :index="'/menu/operations/' + item.value"
              >{{ item.label }}</el-menu-item
            >
          </el-submenu>
          <el-submenu index="/menu/basicReport">
            <template slot="title">
              <span class="icon-basic-report">基础报表</span>
            </template>
            <el-menu-item
              v-for="(item, index) in menus.basicReport"
              :key="item + index"
              :index="'/menu/basicReport/' + item.value"
              >{{ item.label }}</el-menu-item
            >
          </el-submenu>
          <el-submenu index="/menu/custom">
            <template slot="title">
              <span class="icon-custom-report">定制报表</span>
            </template>
            <el-menu-item
              v-for="(item, index) in menus.custom"
              :key="item + index"
              :index="'/menu/custom/' + item.value"
              >{{ item.label }}</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>
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
  .its-aside {
    background: #203b91;
    box-shadow: 0px 8px 7px 0px rgba(0, 20, 85, 0.56);
  }
  .its-menu {
    width: 100%;
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
    width: 100vw;
    height: 100vh;
    flex: 1;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    background-color: #f4f8ff;
    overflow-y: scroll;
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
$imgName: ('home', 'operations', 'custom-report', 'basic-report');
$imgHover: '-hover';
$imgExtension: '@2x.png';

@each $item in $imgName {
  .icon- {
    &#{$item} {
      padding-left: 0.3rem;
      display: block;
      background: url($imgFolder+'icon-'+$item+$imgExtension) no-repeat 0 center;
      background-size: 0.2rem 0.2rem;
    }
  }
}
</style>
