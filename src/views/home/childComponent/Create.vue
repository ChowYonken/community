<template>
  <el-card class="create">
    <div class="header">
      <span>💐 发帖</span>
    </div>
    <!--已登录-->
    <div v-if="isShowLogin" class="btn">
      <el-button type="success" plain @click="toPost">发表帖子</el-button>
    </div>
    <!--未登录-->
    <div v-else class="btn">
      <el-button type="success" plain @click="toRegister">马上入驻</el-button>
      <el-button type="danger" plain @click="toLogin">社区登录</el-button>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: "Create",
    data() {
      return {
        isShowLogin: false // 判断登录注册是否显示
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
</style>
