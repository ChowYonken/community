<!--
 * @Description: 导航栏组件
 * @Author: chowyonken
 * @Date: 2022-05-15
 * @update: 2022-05-25
 -->
<template>
  <div id="header">
    <!--logo-->
    <div class="logo">
      <router-link to="/home"><img src="@/assets/img/logo.png" alt=""></router-link>
    </div>
    <!--搜索-->
    <div class="search">
      <el-input placeholder="请输入搜索内容" v-model="keyWord" @keyup.enter.native="searchKeyWord">
        <el-button slot="append" icon="el-icon-search" @click.native="searchKeyWord" ></el-button>
      </el-input>
    </div>
    <!--未登录-->
    <div class="user-to-login" v-if="this.$store.getters.getLocalStorage == null || this.$store.getters.getLocalStorage === ''">
      <div class="login" @click="toLogin">
        <router-link to="/login">
          <span>登录</span>
        </router-link>
      </div>
      <div class="register">
        <router-link to="/register">
          <span>注册</span>
        </router-link>
      </div>
    </div>
    <!--用户 已登录-->
    <div class="user" v-else>
      <div class="user-msg">
        <router-link to="/chat">
          <i class="iconfont icon-rcd-dialogue"></i>
          <span>私信</span>
        </router-link>
      </div>
      <div class="user-tongzhi">
        <router-link to="/message">
          <i class="iconfont icon-sixin1"></i>
          <span>通知</span>
        </router-link>
      </div>
      <div class="user-login">
        <el-dropdown>
          <span class="el-dropdown-link touxiang">
            <img src="@/assets/img/touxiang.jpg" alt="">
          </span>
          <el-dropdown-menu slot="dropdown">
            <div @click="toProfile"><el-dropdown-item><i class="iconfont icon-shouye"></i>个人主页</el-dropdown-item></div>
            <div @click="logout"><el-dropdown-item ><i class="iconfont icon-tuichu"></i>退出</el-dropdown-item></div>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>

</template>

<script>
  import {LogoutPostData} from "@/network/api/login";

  export default {
    name: "MainTabBar",
    data() {
      return {
        activeIndex: '',
        keyWord: ''
      };
    },
    methods: {
      // 跳转登录页面
      toLogin() {
        this.$router.push('./login')
      },
      // 退出登录
      logout() {
        LogoutPostData(this.$store.getters.getLocalStorage)
        .then(res => {
          console.log(res)
          // 退出登录，清空token
          this.$store.commit('removeToken');
          this.$routerpush('/home');
          location.reload();
          this.$message({
            title: '成功',
            message: '成功退出登录',
            type: 'success'
          })
        })
        .catch(err => {
          console.log(err)
        })
      },
      // 跳转注册页面
      toRegister() {
        this.$router.push('./register')
      },
      // 跳转个人主页
      toProfile() {
        this.$router.push('./profile')
      },
      // 搜索帖子关键字
      searchKeyWord() {
        this.$router.push('./search')
      }
    }
  }
</script>

<style scoped>
  #header {
    display: flex;
    position: fixed;
    top: 0px;
    width: 100%;
    height: 80px;
    padding: 0 20px;
    background-color: white;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.06);
    z-index: 100;
  }

  #header .logo {
    flex: 1;
    max-width: 155px;
    margin: 20px 135px;
  }

  #header .search {
    flex: 1;
    margin: 20px 100px;
    max-width: 400px;
  }

  #header .user {
    flex: 1;
    display: flex;
  }

  #header .user-login {
    width: 270px!important;
  }

  /deep/ .el-dropdown {
    width: 100%;
  }

  #header .user-msg,
  .user-tongzhi {
    width: 58px;
    margin-left: 30px;
  }

  /deep/ .el-dropdown {
    width: 165px!important;
  }

  #header .user-msg span,
  .user-tongzhi span{
    display: inline-block;
    font-size: 18px;
    color: #222226;
    line-height: 80px;
    vertical-align: 1px;
    margin-left: 2px;
  }

  #header .user .touxiang {
    display: inline-block;
    width: 50px;
    height: 50px;
    border: 1px solid #DCDCDC;
    border-radius: 50%;
    margin: 14px 55px 10px;
    overflow: hidden;
  }

  .user .touxiang img {
    display: inline-block;
    width: 100%;
    height: 100%;
    margin-right: 100px;
  }

  .user-to-login {
    display: flex;
    padding: 0 20px 0 150px;
  }

  .user-to-login .login {
    color: #222226;
    margin: 0 20px;
  }

  .user-to-login span {
    color: #222226;
    line-height: 75px;
  }

  .iconfont {
    font-size: 20px;
    color: #222226;
    font-weight: 700;
  }
</style>
