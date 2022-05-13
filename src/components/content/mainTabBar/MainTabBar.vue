<template>
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#fff"
    text-color="#000"
    active-text-color="#9393FF"
    :router="true">
    <el-menu-item index="/home">
      <i class="el-icon-sunny"></i>
      alibb社区
    </el-menu-item>
    <el-menu-item>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="审批人">
          <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-menu-item>
    <el-menu-item index="/register" class="register">注册</el-menu-item>
    <el-menu-item index="/login" class="login">登录</el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: "MainTabBar",
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        input: '',
        formInline: {
          user: '',
          region: ''
        }
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style scoped>
  .el-menu--horizontal>.el-menu-item .login,
  .el-menu--horizontal>.el-menu-item .register {
    float: right;
  }
</style>
