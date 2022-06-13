<template>
  <div id="app">
    <el-card class="content" shadow="always">
      <comment/>
    </el-card>
  </div>
</template>

<script>

  import comment from 'hbl-comment'

  export default {
    name: "PostReply",
    components: {
      comment
    },
    methods: {

    }
  }
</script>

<style scoped>
  .content {
    width: 1225px;
    padding: 20px;
    margin: 20px auto 0;
  }
</style>
