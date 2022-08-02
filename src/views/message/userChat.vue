<template>
  <div id="chat">
    <h1 style="color: #000">私信</h1>
    <div class="chat-box">
      <!-- 左边聊天列表 -->
      <div class="user-list">
        <div class="user-list-title">
          <span>聊天列表</span>
        </div>
        <ul class="user">
          <li :class="{active: currentUser === index}" v-for="(item, index) in chatList" :key="index" @click="showChatDetail(item.conversationId, index)">
            <!-- 未读数量为0 则el-badge不显示 -->
            <div class="user-avatar" v-if="item.unReadCount === 0">
                <img :src="item.avatar" alt="">
            </div>
            <!-- 未读数量不为0 则el-badge显示 -->
            <el-badge class="item" :value="item.unReadCount" v-else>
              <div class="user-avatar">
                <img :src="item.avatar" alt="">
              </div>
            </el-badge>
            <div class="user-info">
              <span class="nickname">{{item.nickname}}</span>
              <span class="content">{{item.content}}</span>
            </div>
          </li>
        </ul>
      </div>
      <!-- 右边聊天框 -->
      <div class="user-detail">
        <div class="user-detail-title">
          <span>{{toName}}</span>
        </div>
        <div class="user-detail-content">
          <ul class="msg-box" >
            <li :class=" {ownMsg: item.fromId === id} " v-for="(item, index) in detailList"> 
              <div class="time">{{item.createTime | showDate}}</div>
              <div class="msg-box-info">
                <div class="msg-content">{{item.content}}</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="send-btn">
          <!-- <el-input v-model.lazy="sendMsg" placeholder="请输入内容"></el-input> -->
          <textarea v-model.lazy="sendMsg" placeholder="请输入内容" cols="101" rows="4"></textarea>
          <el-button type="primary" @click="_sendMessage()">发送</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import {userInfo} from "@/network/api/userEdit";
  import {getList, chatDetail, sendMessage} from "@/network/api/chat";
  import {formatDate} from "@/common/utils"

  export default {
    name: "userChat",
    data() {
      return {
        avatar: require("@/assets/img/touxiang.jpg"),
        id: '', // 登录用户id
        current: 1, // 当前页码
        size: 20, // 页码大小
        chatList: [], // 用户对话列表
        detailList: [], // 私信详情列表
        sendMsg: '', // 发消息框
        currentUser: -1, // 当前点击用户
        toName: '', // 当前的对话用户名
        toId: '', // 接收信息的用户
        conversationId: '', // 当前对话人ID
      }
    },
    created() {
      this._getLoginUser()
      // 获取用户对话列表
      this._getChatList()
    },
    watch: {
      '$route' (to, from) {
        this._getChatList()
      }
    },
    // 过滤器
    filters: {
      showDate(value) {
        // 1.将时间戳转化为Date对象
        const date = new Date(value)
        // 2.调用时间格式化封装函数
        return formatDate(date, 'yyyy/MM/dd hh:mm:ss')
      }
    },
    methods: {
      // 获取当前登录用户信息
      _getLoginUser() {
        userInfo()
        .then(res => {
          console.log(res);
          this.id = res.data.data.id
        })
        .catch(err => {
          console.log(err);
        })
      },
      // 获取用户对话列表
      _getChatList() {
        getList(this.current, this.size)
        .then(res => {
          console.log(res);
          this.chatList = res.data.data
        })
        .catch(err => {
          console.log(err);
        })
      },
      // 获取私信详情
      _getChatDetail(conversationId) {
        chatDetail(conversationId)
        .then(res => {
          console.log(res);
          this.detailList = res.data.data
          this.formId = res.data.data.fromId
        })
        .catch(err => {
          console.log(err);
        })
      },
      // 展示某个对话的详情
      showChatDetail(conversationId, index) {
        this.conversationId = conversationId
        this.currentUser = index
        this.toName = this.chatList[index].nickname
        this.toId = this.chatList[index].toId
        this._getChatDetail(conversationId)
      },
      // 发送信息
      _sendMessage() {
        let formData = new FormData()
        formData.append('toId', this.toId)
        formData.append('content', this.sendMsg)
        sendMessage(formData)
        .then(res => {
          console.log(res);
          this.sendMsg = ''
          this.showChatDetail(this.conversationId, this.currentUser)
        })
        .catch(err => {
          console.log(err);
        })
      }
    }
  }
</script>

<style scoped>
  #chat {
    width: 1125px;
    margin: 0 auto;
  }

  .chat-box {
    display: flex;
    width: 100%;
    height: 600px;
    padding: 10px;
    background-color: #fff;
    border: 2px solid #B3D8FF;
    border-radius: 5px;
  }

  .user-list {
    width: 250px;
    margin-right: 10px;
  }

  .user-detail {
    width: 840px;
  }

  .user-list,
  .user-detail {
    height: 100%;
    border: 2px solid #B3D8FF;
    border-radius: 5px;
  }
 
  .user-list .user-list-title {
    text-align: center;
    border-bottom: 2px solid #B3D8FF;
    padding: 10px 0;
    font-size: 18px;
    font-weight: 700;
  }

  .user-list-title .iconfont {
    font-size: 17px;
    color: #1296db;
  }

  .user li {
    display: flex;
    padding: 10px;
  }

  .user li .user-avatar {
    width: 50px;
    height: 50px;
    overflow: hidden;
    margin-right: 10px;
  }

  .user li .user-avatar img {
    width: 100%;
    height: 100%;
  }

  .user li .user-info span {
    display: block;
    margin-top: 5px;
  }

  .user li .user-info .nickname {
    color: #000;
  }

  .user li .user-info .content {
    width: 140px;
    margin-top: 8px;
    font-size: 12px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }

  .user li:hover {
    background-color: #D9ECFF;
  } 
  
  .user-detail .user-detail-title {
    min-height: 55px;
    line-height: 55px;
    color: #000;
    font-size: 20px;
    padding-left: 20px;
    border-bottom: 2px solid #B3D8FF;
  }

  .user-detail .user-detail-content {
    width: 100%;
    height: 380px;
    border-bottom: 2px solid #B3D8FF;
    overflow-y: scroll;
  }

  .user-detail .user-detail-content li {
    width: 100%;
    margin: 15px 0;
  }

  .user-detail .user-detail-content li .time {
    font-size: 12px;
    margin-left: 10px;
  }

  .user-detail-content li  {
    float: left;
    margin: 10px 10px;

  }

  .user-detail-content li .time {
    text-align: center;
    margin-bottom: 10px;
  }

  .user-detail-content li .msg-box-info .msg-content {
    width: fit-content;
    max-width: 450px;
    min-height: 30px;
    line-height: 30px;
    height: auto;
    word-break: break-all;
    overflow: hidden;
    background-color: #ccc;
    margin-left: 10px;
    padding: 0 5px;
    border-radius: 4px;
  }

  .user-detail .send-btn {
    position: relative;
  }

  .user-detail .send-btn textarea {
    outline: none;
    border: none;
    resize: none;
  }

  .ownMsg .msg-box-info {
    float: right!important;
    margin-right: 10px;
  }

  .ownMsg .msg-content {
    float: right;
    background-color: #03e940!important;
  }

  .active {
    background-color: #D9ECFF;
  }

  div/deep/.el-badge__content.is-fixed {
    top: 1px!important;
    right: 22px!important;
    z-index: 99!important;
  }  

  div/deep/ .el-button {
    position: relative;
    bottom: -25px;
    right: -790px;
    padding: 6px 5px!important;
  }

</style>