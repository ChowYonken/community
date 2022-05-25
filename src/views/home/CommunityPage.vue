<!--
 * @Description: 登录组件
 * @Author: chowyonken
 * @Date: 2022-05-18
 -->
<template>
  <div id="community">
    <!--分类-->
    <category/>
    <!--帖子内容-->
    <post-view/>
    <!--发表帖子-->
    <create/>
  </div>
</template>

<script>

  import Category from "@/views/home/childComponent/Category";
  import PostView from "@/views/home/childComponent/PostView";
  import Create from "@/views/home/childComponent/Create";

  export default {
    name: "Home",
    components: {
      Category,
      PostView,
      Create
    }
  }
</script>

<style scoped>
  #community {
    display: flex;
    margin: 0 auto;
    max-width: 1225px;
  }

</style>
