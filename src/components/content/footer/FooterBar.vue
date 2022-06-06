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
        <span>©2022 alibb ALL RIGHTS RESERVED</span>
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
    margin-top: 50px;
  }

  .content .copyright span {
    display: block;
    margin-bottom: 10px;
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
