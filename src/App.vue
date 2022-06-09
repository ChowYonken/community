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
      <footer-bar/>
    </footer>
    <!--回到顶部-->
    <back-top></back-top>
  </div>
</template>

<script>

  import MainTabBar from "@/components/content/mainTabBar/MainTabBar";
  import FooterBar from "@/components/content/footer/FooterBar";
  import BackTop from "@/components/common/backTop/BackTop";

  export default {
    name: 'App',
    components: {
      MainTabBar,
      FooterBar,
      BackTop
    }
  }
</script>

<style>
  @import "./assets/css/base.css";
  @import "./assets/css/wangeditor/style.css";

  main {
    margin-top: 120px;
  }

</style>
