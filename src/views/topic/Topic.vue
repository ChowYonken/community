<!--
 * @Description: 登录组件
 * @Author: chowyonken
 * @Date: 2022-06-05
 * @update: 2022-06-05
 -->
<template>
  <div id="topic">
    <!--分类导航栏-->
    <category/>
    <!--话题内容-->
    <topic-content/>
  </div>
</template>

<script>

  import Category from "@/components/content/category/Category";
  import TopicContent from "@/views/topic/childComponent/TopicContent";

  export default {
    name: "Topic",
    components: {
      Category,
      TopicContent,
    }
  }
</script>

<style scoped>
  #topic {
    display: flex;
    margin: 0 auto;
    max-width: 1225px;
  }
</style>
