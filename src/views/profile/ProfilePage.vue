<!--
 * @Description: 登录组件
 * @Author: chowyonken
 * @Date: 2022-06-06
 * @update: 2022-06-06
 -->
<template>
  <div id="profile">
    <card-info-container/>
    <card-info-body/>
  </div>
</template>

<script>

  import CardInfoContainer from "@/views/profile/childComponent/CardInfoContainer";
  import CardInfoBody from "@/views/profile/childComponent/CardInfoBody";

  export default {
    name: "ProfilePage",
    components: {
      CardInfoContainer,
      CardInfoBody
    },
  }
</script>

<style scoped>
  #profile {
    margin: 0 auto;
    max-width: 1225px;
  }
</style>
