<template>
  <!--话题内容-->
  <el-card class="content" shadow="always">
    <div class="topic-content">
      <!--话题介绍-->
      <topic-introduce/>
      <!--分栏-->
      <topic-item/>
    </div>
  </el-card>
</template>

<script>

  import TopicIntroduce from "@/views/topic/childComponent/TopicIntroduce";
  import TopicItem from "@/views/topic/childComponent/TopicItem";

  export default {
    name: "TopicContent",
    components: {
      TopicIntroduce,
      TopicItem
    }
  }
</script>

<style scoped>
  .content {
    flex: 1 1;
    padding: 0 20px 30px;
    background-color: #fff;
  }
</style>
