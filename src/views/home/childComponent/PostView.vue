<template>
  <el-card class="content" shadow="always">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="最新主题" name="latest">
        <!--循环遍历后台的数据-->
        <article>
          <post-list/>
        </article>
      </el-tab-pane>
      <el-tab-pane label="最热主题" name="hot">
        <article>
          <post-list/>
        </article>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>

  import PostList from "@/components/content/postList/PostList";

  export default {
    name: "PostView",
    components: {
      PostList
    },
    data() {
      return {
        activeName: 'latest'
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>

<style scoped>
  .content {
    flex: 0 0 708px;
    margin-right: 10px;
  }

  /deep/ .el-tabs__item {
    font-weight: 700;
  }

  .list-item-wrap .list-item {
    display: flex;
    height: 40px;
    line-height: 40px;
    justify-content: space-between;
    border-bottom: 1px solid #e3e3e4;
    font-size: 14px;
  }

  .list-item-wrap .list-item .info {
    display: flex;
  }

  .list-item-wrap .list-item .info .title{
    display: inline-block;
    color: #2D3137;
    max-width: 414px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space:nowrap;

  }

  .list-item-wrap .list-item .info span {
    margin-left: 10px;
    color: #7B7E86;
  }

  .list-item .info a:hover .title {
    color: #409EFF;
  }

  .list-item .lable a:hover {
    color: #409EFF;
  }
</style>
