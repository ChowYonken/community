<!--
 * @Description: 消息组件
 * @Author: chowyonken
 * @Date: 2022-06-10
 * @update: 2022-06-11
 -->
<template>
  <div id="message">
    <tab-control
      :titles="['评论消息', '点赞消息', '关注消息', '系统消息']"
      class="tab-control" 
      @tabClick="tabClick"/>
    <!--有数据显示-->
    <msg-list v-if="isData" :msg-list="allIntelligence"/>
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
  import {getSystemMsg, getCommentMsg, getFollowMsg, getLikeMsg} from "@/network/api/message"

  export default {
    name: "Message",
    components: {
      TabControl,
      PostList,
      MsgList
    },
    data() {
      return {
        activeName: 'follow',
        currentIndex: 0, // 导航栏索引值]
        isData: false, // 是否有数据
        allIntelligence: [], // 列表所有数据
        current: 1, // 当前页码
        size: 20 // 页码大小
      }
    },
    created() {
      this._getCommentMsg()
    },
    methods: {
      // 获取系统通知列表
      _getSystemMsg() {
        let that = this
        getSystemMsg(that.current, that.size)
        .then(res => {
          that.allIntelligence = res.data.data
          if(that.allIntelligence.length !== 0) {
            that.isData = true
          }
        })
        .catch(err => {
          console.log(err);
        })
      },
      // 获取评论通知列表
      _getCommentMsg() {
        let that = this
        getCommentMsg(that.current,that.size)
        .then(res => {
          that.allIntelligence = res.data.data
          // 判断是否为空 如果不为空 将isData设为true
          if(that.allIntelligence.length !== 0) {
            that.isData = true
          }
        })
        .catch(err => {
          console.log(err);
        })
      },
      // 获取关注通知列表
      _getFollowMsg() {
        let that = this
        getFollowMsg(that.current,that.size)
        .then(res => {
          that.allIntelligence = res.data.data
          // 判断是否为空 如果不为空 将isData设为true
          if(that.allIntelligence.length !== 0) {
            that.isData = true
          }
        })
        .catch(err => {
          console.log(err);
        })
      },
      // 获取点赞通知列表
      _getLikeMsg() {
        let that = this
        getLikeMsg()
        .then(res => {
          that.allIntelligence = res.data.data
          // 判断是否为空 如果不为空 将isData设为true
          if(that.allIntelligence.length !== 0) {
            that.isData = true
          }
        })
        .catch(err => {
          console.log(err);
        })
      },
      // 获取导航栏的index值 并网络请求
      tabClick(index) {
        // 每次点击后 将isData设为false
        this.isData = false
        // 根据不同的索引值调用不同的网络请求
        if(index === 3) {
          this._getSystemMsg()
        } else if(index === 2) {
          this._getFollowMsg()
        } else if(index === 1) {
          this._getLikeMsg()
        } else if(index === 0) {
          this._getCommentMsg()
        }
      }
    }
  }
</script>

<style scoped>

  div/deep/ .el-tabs__item {
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
