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
      <img src="@/assets/img/logo1.png" alt="">
    </div>
    <!-- 首页 -->
    <div class="homePage">
      <router-link to="/home">
      <i class="iconfont icon-shouye"></i>
        <span>首页</span>
      </router-link>
    </div>
    <!--搜索-->
    <div class="search">
      <el-input placeholder="请输入关键字" v-model="keyword" @keyup.enter.native="searchKeyWord">
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
      <!--私信-->
      <div class="user-msg">
        <router-link to="/chat">
          <i class="iconfont icon-rcd-dialogue"></i>
          <!-- 未读数量为0 则el-badge不显示 -->
          <span v-if="value === 0">私信</span>
          <!-- 未读数量不为0 则el-badge显示 -->
          <el-badge :value="value" class="item" v-else>
            <span>私信</span>
          </el-badge>
        </router-link>
      </div>
      <!--通知-->
      <div class="user-tongzhi">
        <router-link to="/message">
          <i class="iconfont icon-sixin1"></i>
          <span>通知</span>
        </router-link>
      </div>
      <!--用户信息-->
      <div class="user-login">
        <el-dropdown>
          <span class="el-dropdown-link touxiang">
            <img :src="docUrl ? docUrl : default_img" alt="">
          </span>
          <el-dropdown-menu slot="dropdown">
            <div @click="toUserPage"><el-dropdown-item><i class="iconfont icon-shouye"></i>个人主页</el-dropdown-item></div>
            <router-link to="/setup"><div><el-dropdown-item><i class="iconfont icon-rcd-setting-f"></i>账号设置</el-dropdown-item></div></router-link>
            <div @click="logout"><el-dropdown-item ><i class="iconfont icon-tuichu"></i>退出</el-dropdown-item></div>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>

</template>

<script>
  import {LogoutPostData} from "@/network/api/login";
  import {userInfo} from "@/network/api/userEdit";
  import {search} from "@/network/api/search"
  import {unRead} from "@/network/api/chat"

  export default {
    name: "MainTabBar",
    data() {
      return {
        id: null, // 获取登录用户id
        activeIndex: '',
        keyword: '',
        docUrl: '',  //头像
        default_img: require("@/assets/img/defaultImg.jpg"),
        dialogFormVisible: false,
        searchData: [], // 搜索内容
        value: '' // 私信未读数量
      };
    },
    created() {
      // 登录后获取用户头像
      if(this.$store.getters.getLocalStorage !== '') {
        this.getLoginInfo()
      }
      // 获取私信未读数量
      this._unRead()
    },
    watch: {
      'route'(to, from) {
        this._unRead()
      }
    },
    methods: {
      // 跳转登录页面
      toLogin() {
        this.$router.push('./login')
      },
      // 获取登录用户信息
      getLoginInfo() {
        userInfo()
        .then(res => {
          if(this.docUrl !== res.data.data.avatar) {
            this.docUrl = res.data.data.avatar
            this.id = res.data.data.id
          }
        })
        .catch(err => {
          console.log(err)
        })
      },
      // 退出登录
      logout() {
        LogoutPostData(this.$store.getters.getLocalStorage)
        .then(res => {
          console.log(res)
          // 退出登录，清空token
          this.$store.commit('removeToken');
          this.$router.push('/home');
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
      // 搜索帖子 可只搜索关键字
      _search() {
        search(this.keyWord)
        .then(res => {
          console.log(res);
          // 搜索成功后跳转搜索页面
          this.$router.push('./search/' + this.keyword)
        })
        .catch(err => {
          console.log(err);
        })
      },
      // 获取私信未读总数量
      _unRead() {
        unRead()
        .then(res => {
          this.value = res.data.data
        })
        .catch(err => {
          console.log(err);
        })
      },
      // 跳转注册页面
      toRegister() {
        this.$router.push('./register')
      },
      // 搜索帖子关键字
      searchKeyWord() {
        if (this.keyword !== '') {
          this._search()
        } else {
          this.$message({
            message: '请输入的关键字为空',
            type: 'warning'
          })
        }
        // this.$router.push('/search/'+this.keyword)
      },
      // 跳转个人主页
      toUserPage() {
        this.$router.push('/user/' + this.id)
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
    z-index: 999;
  }

  #header .logo {
    flex: 1;
    max-width: 155px;
    margin: 20px 75px 20px 135px;
  }

  #header .logo img {
    width: 155px;
    height: 100%;
  }

  #header .homePage {
    min-width: 78px;
  }

  #header .homePage span {
    display: inline-block;
    font-size: 18px;
    color: #222226;
    line-height: 80px;
    vertical-align: 1px;
    min-width: 58px;
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

  div/deep/ .el-dropdown {
    width: 100%;
  }

  #header .user-msg,
  .user-tongzhi {
    width: 58px;
    margin-left: 30px;
  }

  div/deep/ .el-dropdown {
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
    width: 51px;
    height: 51px;
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
    width: 50px;
    margin: 0 20px;
  }

  .user-to-login .register {
    width: 50px;
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

  div/deep/.el-badge__content.is-fixed {
    top: 20px!important;
    right: 2px!important;
  }  
</style>
