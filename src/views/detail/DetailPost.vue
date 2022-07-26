<!--
 * @Description: 帖子详情组件
 * @Author: chowyonken
 * @Date: 2022-06-11
 * @update: 2022-06-12
 -->
<template>
  <div id="detail">
    <post-content/>
    <!-- <post-reply/> -->
    <reply/>
  </div>
</template>

<script>

  import PostContent from "@/views/detail/childComponent/PostContent"
  // import PostReply from "@/views/detail/childComponent/PostReply"
  import Reply from "@/views/detail/childComponent/Reply"

  export default {
    name: "DetailPost",
    components: {
      PostContent,
      // PostReply
      Reply
    }
  }
</script>

<style scoped>

</style>
