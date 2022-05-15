<!--
 * @Description: 导航栏组件
 * @Author: chowyonken
 * @Date: 2022-05-15
 -->
<template>
  <el-menu :default-active="activeIndex"
           class="el-menu-demo"
           mode="horizontal"
           active-text-color="#409eff"
           router>
    <div class="logo">
        <img src="@/assets/img/logo.png" alt />
    </div>
    <!--首页-->
    <div class="homePage">
      <el-menu-item index="/home">首页</el-menu-item>
    </div>

    <!--搜索框-->
    <div class="search">
      <el-input placeholder="请输入搜索内容">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <!--个人中心-->
    <div class="userCenter">
      <el-menu-item index="/login">个人中心</el-menu-item>
    </div>
    <!--未登录时-->
    <el-menu-item class="auth" v-if="isShowLogin">
      <el-button type="text" @click="toLogin">登录</el-button>
      <span class="sep">|</span>
      <el-button type="text" @click="toRegister">注册</el-button>
    </el-menu-item>
    <!--已登录-->
    <div class="user" v-else>
      <i class="el-icon-s-custom"></i>
      <el-popover placement="top" width="180" v-model="visible">
        <p>确定退出登录吗？</p>
        <div style="text-align: right; margin: 10px 0 0">
          <el-button size="mini" type="text" @click="visible = false">取消</el-button>
          <el-button type="primary" size="mini" @click="logout">确定</el-button>
        </div>
        <el-button type="text" slot="reference">kk</el-button>
      </el-popover>
    </div>
  </el-menu>
</template>

<script>
  export default {
    name: "MainTabBar",
    data() {
      return {
        activeIndex: '',
        isShowLogin: false, // 是否显示登录注册按钮
        visible: false // 是否退出登录
      };
    },
    methods: {
      // 跳转登录页面
      toLogin() {
        this.$router.push('./login')
      },
      // 退出登录
      logout() {
        this.isShowLogin = true
        this.$notify({
          title: '成功',
          message: '成功退出登录',
          type: 'success'
        });

      },
      toRegister() {
        this.$router.push('./register')
      },
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
  /* 顶部导航栏CSS */
  .el-header .el-menu {
    max-width: 1225px;
    margin: 0 auto;
  }

  .el-header .logo {
    height: 60px;
    width: 189px;
    float: left;
    margin-right: 100px;
  }

  .el-header .homePage {
    float: left;

  }

  .el-header .search {
    margin-top: 10px;
    margin-left: 30px;
    width: 300px;
    float: left;
  }

  .el-header .auth {
    float: right;
  }

  .el-header .user {
    float: right;
    margin: 10px 10px;
  }

  .el-header .userCenter {
    float: right;
  }
  /* 顶部导航栏CSS END */
</style>
