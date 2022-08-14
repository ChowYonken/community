<!--
 * @Description: 底部组件
 * @Author: chowyonken
 * @Date: 2022-05-28
 * @update: 2022-05-28
 -->
<template>
  <div id="footer-bar">
    <div class="content">
      <!--版权-->
      <div class="copyright">
        <!-- 网站备案 -->
        <span>
          <a href="https://beian.miit.gov.cn" target="_blank">
            粤ICP备2022084416号-1
          </a>
        </span>
        <!-- 公安备案号 -->
        <span class="beian">
          <a href="#" target="_blank">
            <img src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/police.d0289dc.png" alt="">
          </a>
        </span>
        <span>©2022 sesee ALL RIGHTS RESERVED</span>
        <span>联系我们：chowyonken@163.com / 18026553956</span>
      </div>
      <!--微信二维码-->
      <div class="wechat">
        <img src="@/assets/img/wechat.jpg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "FooterBar"
  }
</script>

<style scoped>
  #footer-bar {
    position: relative;
    height: 150px;
    background-color: #363636;
    color: #B5B5B5;
    margin-top: 120px;
  }

  .content {
    display: flex;
  }

  .content .copyright {
    flex: 1;
    margin-left: 300px;
    margin-top: 30px;
  }

  .content .copyright span {
    display: block;
    margin-bottom: 10px;
  }

  a:hover {
    color: #409EFF;
  }

  .beian a img {
    display: inline-block;
    vertical-align: middle;
  }

  .content .wechat {
    flex: 1;
    margin-left: 425px;
    margin-top: 25px;
  }

  .content .wechat img {
    width: 100px;
    height: 100px;
  }
</style>
