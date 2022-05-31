<template>
  <div class="create">
    <el-card class="send">
      <div class="header">
        <span>💐 发帖</span>
      </div>
      <!--已登录-->
      <div class="btn">
        <el-button type="primary" plain @click="toPost">发表帖子</el-button>
      </div>
    </el-card>
    <el-card class="hot-search">
      <div class="hot-search-title">
        <span>热门搜索</span>
      </div>
      <div class="content">
        <router-link to="/topic">
          <div class="hot-search-item">
            <span class="hot-index">1</span>
            <span class="hot-title">维金斯</span>
          </div>
        </router-link>
        <router-link to="/topic">
          <div class="hot-search-item">
            <span class="hot-index">2</span>
            <span class="hot-title">维金斯</span>
          </div>
        </router-link>
        <router-link to="/topic">
          <div class="hot-search-item">
            <span class="hot-index">3</span>
            <span class="hot-title">维金斯</span>
          </div>
        </router-link>
        <router-link to="/topic">
          <div class="hot-search-item">
            <span class="hot-index">4</span>
            <span class="hot-title">维金斯</span>
          </div>
        </router-link>
        <router-link to="/topic">
          <div class="hot-search-item">
            <span class="hot-index">5</span>
            <span class="hot-title">维金斯</span>
          </div>
        </router-link>
        <router-link to="/topic">
          <div class="hot-search-item">
            <span class="hot-index">6</span>
            <span class="hot-title">维金斯</span>
          </div>
        </router-link>
        <router-link to="/topic">
          <div class="hot-search-item">
            <span class="hot-index">7</span>
            <span class="hot-title">维金斯</span>
          </div>
        </router-link>
        <router-link to="/topic">
          <div class="hot-search-item">
            <span class="hot-index">8</span>
            <span class="hot-title">维金斯</span>
          </div>
        </router-link>
        <router-link to="/topic">
          <div class="hot-search-item">
            <span class="hot-index">9</span>
            <span class="hot-title">维金斯</span>
          </div>
        </router-link>
        <router-link to="/topic">
          <div class="hot-search-item">
            <span class="hot-index">10</span>
            <span class="hot-title">维金斯</span>
          </div>
        </router-link>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "Create",
    data() {
      return {
        isShowLogin: true // 判断登录注册是否显示
      }
    },
    methods: {
      // 跳转登录页面
      toLogin() {
        this.$router.push('./login')
      },
      // 跳转注册页面
      toRegister() {
        this.$router.push('./register')
      },
      // 跳转发帖子页面
      toPost() {
        this.$router.push('./post')
      }
    }
  }
</script>

<style scoped>
  .create {
    flex: 0 0 280px;
  }

  .btn {
    text-align: center;
    padding: 30px 0;
  }

  .hot-search {
    height: 420px;
    margin-top: 20px;
  }

  .hot-search .hot-search-title {
    height: 45px;
    font-weight: 700;
    font-size: 15px;
    color: #191c22;
  }

  .hot-search .hot-search-item {
    height: 36px;
    font-size: 14px;
    color: #191C22;
  }

  .hot-search .hot-search-item .hot-index {
    margin-right: 13px;
  }
</style>
