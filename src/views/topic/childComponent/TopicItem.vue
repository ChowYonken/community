<template>
  <!--分栏-->
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="最新回复" name="latest">
      <!--数据-->
      <el-table
        :data="tableData"
        style="width: 100%">
        <!--标题-->
        <el-table-column
          prop="title"
          label="标题"
          width="508">
          <span class="title"><router-link to="/detail">郝蕾美的风韵气质什么水平？</router-link></span>
        </el-table-column>
        <!--回复/浏览-->
        <el-table-column
          prop="reply"
          label="回复/浏览"
          width="130">
          <span class="reply">32 / 40393</span>
        </el-table-column>
        <!--作者-->
        <el-table-column
          prop="author"
          label="作者"
          width="150">
          <span class="author"><router-link to="/profile">kkkkkkkkkkkkkkkkkkkkkkkkk</router-link></span>
        </el-table-column>
        <!--时间-->
        <el-table-column
          prop="time"
          label="时间">
          <span class="time">06-05 15:36</span>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="最热发布" name="hot">

    </el-tab-pane>
    <el-tab-pane label="24小时榜" name="hour">

    </el-tab-pane>
  </el-tabs>
</template>

<script>
  export default {
    name: "TopicItem",
    data() {
      return {
        activeName: "latest",
        tableData: [{
          title: '郝蕾美的风韵气质什么水平？',
          reply: '32 / 40393',
          author: '我要你管我做什么呢',
          time: '06-05 15:36'
        }]
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
  /deep/ .el-tabs__item {
    font-weight: 700;
  }

  .title a {
    color: #2D3137;
  }

  .title a:hover {
    color: #409EFF;
  }

  .reply {
    font-size: 12px;
    color: #7b7e86;
  }

  .author a {
    color: #4b8dc3;
    cursor: pointer;
    font-size: 12px;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .time {
    font-size: 12px;
    color: #96999f;
  }

</style>
