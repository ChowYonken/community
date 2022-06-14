<template>
  <div id="search">
    <!--有数据显示-->
    <el-card class="content" shadow="always">
      <div class="title">
        <i class="iconfont icon-tiezi"></i>
        <span>相关帖子</span>
      </div>
      <!--有数据-->
      <search-list v-if="false"/>
      <!--无数据-->
      <div class="noData" v-else>
        <img src="@/assets/img/search/noData.png" alt="">
        <div class="noData-font">抱歉，没有找到您想要的帖子</div>
        <el-button type="primary" class="btn" @click="backHome">返回主页</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>

  import SearchList from "@/components/content/searchList/SearchList"

  export default {
    name: "Search",
    components: {
      SearchList
    },
    methods: {
      backHome() {
        this.$router.push('./home')
      }
    }
  }
</script>

<style scoped>
  #search {
    width: 1225px;
    margin: 0 auto;
  }

  .title {
    font-weight: 700;
  }

  .title i {
    display: inline-block;
    margin-right: 5px;
  }

  /deep/ .el-tabs__item {
    font-weight: 700!important;
  }

  .content .noData {
    padding-top: 40px;
    text-align: center;
  }

  .content .noData img {
    width: 230px;
    height: 230px;
    opacity: .7;
  }

  .content .noData .noData-font {
    font-size: 13px;
    font-weight: 400;
    color: #8c8c8c;
    line-height: 18px;
  }

  .btn {
    margin: 20px 0;
  }
</style>
