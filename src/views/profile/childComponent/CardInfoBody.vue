<template>
  <div id="card-info-body">
    <!--帖子内容-->
    <el-card class="content" shadow="always">
      <el-tabs v-model="activeName" @tab-click="">
        <el-tab-pane label="发帖" name="post">
          <!--有数据显示-->
          <post-list v-if="false"/>
          <!--无数据显示-->
          <div class="noData" v-else>
            <img src="@/assets/img/profile/noData.png" alt="">
            <div class="noData-font">暂无数据 去其他地方看看</div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="回帖" name="reply">

        </el-tab-pane>
        <el-tab-pane label="推荐" name="recommend"></el-tab-pane>
        <el-tab-pane label="收藏" name="collect"></el-tab-pane>
        <el-tab-pane label="关注" name="follow"></el-tab-pane>
      </el-tabs>
    </el-card>
    <!--关注-->
    <el-card class="follow" shadow="always">
      <div class="hotSearch">
        <a href="javaScript:;">
          <div class="hotTitle">我关注的人</div>
          <div class="hotValue">0</div>
        </a>
        <a href="javaScript:;">
          <div class="hotTitle">关注我的人</div>
          <div class="hotValue">0</div>
        </a>
      </div>
    </el-card>
  </div>
</template>

<script>

  import PostList from "@/components/content/postList/PostList";

  export default {
    name: "CardInfoBody",
    components: {
      PostList
    },
    data() {
      return {
        activeName: 'post'
      }
    }
  }
</script>

<style scoped>
  #card-info-body {
    display: flex;
    margin: 20px 0 auto;
    max-width: 1225px;
  }

  .content {
    width: 823px;
    margin-right: 20px;
    padding: 8px 20px;
  }

  div/deep/ .el-tabs__item {
    font-weight: 700;
  }

  .content .noData {
    padding-top: 40px;
    text-align: center;
  }

  .content .noData img {
    width: 176px;
    height: 176px;
    opacity: .7;
  }

  .content .noData .noData-font {
    font-size: 13px;
    font-weight: 400;
    color: #8c8c8c;
    line-height: 18px;
  }

  .follow {
    width: 400px;
    height: 100px;
  }

  .hotSearch {
    display: flex;
    width: 400px;
    height: 100px;
  }

  .hotSearch a {
    /*display: inline-block;*/
    flex: 1;
    text-align: center;
    margin: 20px 0;
  }

  .hotSearch .hotTitle {
    font-size: 14px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: #4e5158;
    line-height: 20px;
  }

  .hotSearch .hotValue {
    margin-top: 13px;
    font-size: 18px;
    font-family: PingFangSC-Semibold,PingFang SC;
    font-weight: 600;
    color: #2d3137;
    line-height: 25px;
  }

   div/deep/ .el-card__body, .el-main {
      padding: 0;
   }
</style>
