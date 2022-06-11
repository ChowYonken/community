<!--
 * @Description: 消息组件
 * @Author: chowyonken
 * @Date: 2022-06-10
 * @update: 2022-06-11
 -->
<template>
  <div id="message">
    <tab-control
      :titles="['评论信息', '点赞消息', '关注消息', '系统消息']"
      class="tab-control" />
    <!--有数据显示-->
    <msg-list v-if="true"/>
    <!--无数据显示-->
    <el-card class="content" shadow="always" v-else>
      <div class="noData">
        <img src="@/assets/img/message/noData.png" alt="">
        <div class="noData-font">暂无消息</div>
      </div>
    </el-card>
  </div>
</template>

<script>

  import TabControl from "@/views/message/childComponent/TabControl"
  import PostList from "@/components/content/postList/PostList"
  import MsgList from "@/components/content/msgList/MsgList"

  export default {
    name: "Message",
    components: {
      TabControl,
      PostList,
      MsgList
    },
    data() {
      return {
        activeName: 'follow'
      }
    }
  }
</script>

<style scoped>

  /deep/ .el-tabs__item {
    font-weight: 700!important;
  }

  .content {
    width: 960px;
    margin: 145px 0 0 290px;
    background-color: #fff;
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
</style>
