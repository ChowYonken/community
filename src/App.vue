<!--
 * @Description: 登录组件
 * @Author: chowyonken
 * @Date: 2022-05-15
 -->
<template>
  <div id="app">
  <!--导航栏-->
    <header>
      <main-tab-bar/>
    </header>
    <!--内容-->
    <main>
      <router-view/>
    </main>
    <!--尾部-->
    <footer>
      ul>li{$}*1000
    </footer>
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

  main {
    margin-top: 120px;
  }

</style>
