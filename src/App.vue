<!--
 * @Description: 登录组件
 * @Author: chowyonken
 * @Date: 2022-05-15
 -->
<template>
  <div id="app">
    <el-container>
      <!--顶栏容器-->
      <el-header>
        <main-tab-bar/>
      </el-header>
      <!--内容区域-->
      <el-main>
        <router-view/>
      </el-main>
      <!--底部容器-->
      <el-footer>

      </el-footer>
    </el-container>
  </div>
</template>

<script>

  import MainTabBar from "@/components/content/mainTabBar/MainTabBar";

  export default {
    name: 'App',
    components: {
      MainTabBar
    }
  }
</script>

<style>
  @import "./assets/css/base.css";
</style>
