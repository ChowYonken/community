<template>
  <div id="app">
    <el-card class="content" shadow="always">
      <comment @doSend="doSend"
               @doChidSend="doChidSend"
               :commentList="commentList"
               :commentNum="commentNum"
               :label="label" 
               :avatar="avatar"/>
    </el-card>
  </div>
</template>

<script>

  import comment from 'bright-comment'
  import {getReply} from '@/network/api/reply'

  export default {
    name: "PostReply",
    components: {
      comment
    },
    data() {
      return {
        // 标签名
        label: '',
        // 头像
        avatar: "https://s1.ax1x.com/2022/06/10/Xc9lUf.png",
        // 评论条数
        commentNum: 0,
        // 评论列表
        commentList: [],
        // 当前页码
        currentL: 1,
        // 页码大小
        size: 20,
        // 帖子Id
        postId: null,
        // 评论用户
        commentUser: {
          nickName: '',
          avatar: ''
        }
      }
    },
    created() {
      this.postId = this.$route.params.id
      //获取评论
      this._getReply()
    },
    watch: {
      '$route' (to, from) {
        if(from.path === '/home' || from.path ==='message') {
          // 保存本帖子的id
          this.postId = this.$route.params.id
          //获取评论
          this._getReply()
        }
      }
    },
    methods: {
      _getReply() {
        getReply(this.current, this.size, this.postId)
        .then(res => {
          console.log(res)
          this.commentList = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
      },
      // 初始文本框发送事件
      doSend(content) {
        console.log(content)
      },
      // 评论列表中文本框发送事件
      doChidSend(content,bid,pid) { // 参数：评论内容,被评论用户id,父级评论id
        console.log(content)
        console.log(bid)
        console.log(pid)
      }
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
