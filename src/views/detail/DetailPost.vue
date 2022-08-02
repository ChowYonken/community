<!--
 * @Description: 帖子详情组件
 * @Author: chowyonken
 * @Date: 2022-06-11
 * @update: 2022-06-12
 -->
<template>
  <div id="detail">
    <post-content/>
    <reply/>
  </div>
</template>

<script>

  import PostContent from "@/views/detail/childComponent/PostContent"
  import Reply from "@/views/detail/childComponent/Reply"

  export default {
    name: "DetailPost",
    components: {
      PostContent,
      Reply
    }
  }
</script>

<style scoped>

</style>
