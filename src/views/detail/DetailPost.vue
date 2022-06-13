<!--
 * @Description: 帖子详情组件
 * @Author: chowyonken
 * @Date: 2022-06-11
 * @update: 2022-06-12
 -->
<template>
  <div id="detail">
    <post-content/>
    <post-reply/>
  </div>
</template>

<script>

  import PostContent from "@/views/detail/childComponent/PostContent"
  import PostReply from "@/views/detail/childComponent/PostReply"

  export default {
    name: "DetailPost",
    components: {
      PostContent,
      PostReply
    }
  }
</script>

<style scoped>

</style>
