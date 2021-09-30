<template>
  <div class="login-wrap">
    <el-form class="login-container">
      <h3 class="title">用户登录</h3>
      <el-form-item label="">
        <el-input v-model="username" type="text" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="password" type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%;" @click="doSubmit()">登录</el-button>
      </el-form-item>
      <el-row style="text-align: center; margin-top: -10px;;">
        <el-link type="primary">忘记密码</el-link>
      </el-row>
    </el-form>
  </div>
</template>
<style lang="scss" scoped>
.login-wrap {
  height: 100vh;
  width: 100vw;
  padding: 0;
  margin: 0;
  overflow: hidden;
  background: #fff;
  .login-container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    width: 3rem;
  }
}
</style>
