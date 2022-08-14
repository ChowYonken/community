<template>
  <div class="comment">
    <div>
      <!-- 登录用户评论框 -->
      <div v-clickoutside="hideReplyBtn" @click="inputFocus" class="my-reply">
        <el-avatar class="header-img" :size="40" :src="avatar"></el-avatar>
        <div class="reply-info">
          <div
            tabindex="0"
            contenteditable="true"
            id="replyInput"
            spellcheck="false"
            placeholder="输入评论..."
            class="reply-input"
            @focus="showReplyBtn"
            @input="onDivInput($event)"
          ></div>
        </div>
        <div class="reply-btn-box" v-show="btnShow">
          <el-button
            class="reply-btn"
            size="medium"
            @click="sendComment"
            type="primary"
          >发表评论</el-button
          >
        </div>
      </div>
      <!-- 查询评论列表 -->
      <div
        v-for="(item, i) in comments"
        :key="i"
        class="author-title reply-father"
      >
        <!-- 评论用户头像 -->
        <el-avatar class="header-img" :size="40" src="https://s1.ax1x.com/2022/06/10/Xc9lUf.png"></el-avatar>
        <!-- 评论用户名字 -->
        <div class="author-info">
          <span class="author-name">{{ item.nickname }}</span>
          <!-- <span class="author-time">{{ item.time }}</span> -->
        </div>
        <!-- 右侧评论与点赞 -->
        <div class="icon-btn">
          <!-- 点击显示回复框 -->
          <span @click="showReplyInput(i, item.nickname, item.id)">
            <!-- 显示评论数 -->
            <i class="iconfont icon-rcd-dialogue"></i>{{ getParentLength(i) }}
          </span>
          <!-- 点赞 -->
          <i
            v-if="item.is_like"
            class="iconfont icon-dianzan likeIcon"
            @click="like(item.id)"
          ></i>
          <!-- 显示喜欢的数量 -->
          <i
            v-else
            class="iconfont icon-dianzan"
            @click="like(item.id)"
          ></i>{{ item.like_count }}
        </div>
        <!-- 评论内容 -->
        <div class="talk-box">
          <p>
            <span class="reply"> {{ item.content }}</span>
          </p>
        </div>
        <!-- 子评论内容 -->
        <div class="reply-box">
          <div v-for="(reply, j) in item.reply_comment_list" :key="j" class="author-title">
            <el-avatar
              class="header-img"
              :size="40"
              src="https://s1.ax1x.com/2022/06/10/Xc9lUf.png"
            ></el-avatar>
            <!-- 子评论人的名字 -->
            <div class="author-info">
              <span class="author-name">{{ reply.reply_nickname }}</span>
              <!-- <span class="author-time">{{ reply.time }}</span> -->
            </div>
            <!-- 点击弹出回复框 -->
            <div class="icon-btn">
              <span @click="showReplyInput(i, reply.reply_nickname, reply.id)"
              ><i class="iconfont icon-rcd-dialogue"></i
              >{{ 1 }}</span
              >
              <i
                v-if="reply.is_like"
                class="iconfont icon-dianzan likeIcon"
                @click="like(reply.id)"
              ></i>
              <i
                v-else
                class="iconfont icon-dianzan"
                @click="like(reply.id)"
              ></i
              >{{ reply.like_count }}
            </div>
            <!-- 子评论内容 -->
            <div class="talk-box">
              <p>
                回复<span> @{{ reply.target_nickname }}: </span>
                <span class="reply"> {{ reply.content }}</span>
              </p>
            </div>
            <div class="reply-box"></div>
          </div>
        </div>
        <!-- 显示评论输入框 -->
        <div v-show="_inputShow(i)" class="my-reply my-comment-reply">
          <el-avatar class="header-img" :size="40" :src="avatar"></el-avatar>
          <div class="reply-info">
            <div
              tabindex="0"
              contenteditable="true"
              spellcheck="false"
              :placeholder="placeholder"
              @input="onDivInput($event)"
              class="reply-input reply-comment-input"
            ></div>
          </div>
          <div class="reply-btn-box">
            <el-button
              class="reply-btn"
              size="medium"
              @click="sendCommentReply(i)"
              type="primary"
            >发表评论</el-button
            >
          </div>
        </div>
      </div>
      
    </div>
    <!-- 分页区域 -->
    <el-pagination
      @size-change="size_change"
      @current-change="current_change"
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size">
    </el-pagination>
  </div>
</template>

<script>

  import {getReply, comment, getCommentTotal} from '@/network/api/reply'
  import {userInfo} from '@/network/api/userEdit'
  import {clickLike} from '@/network/api/user'

  const clickoutside = {
    // 初始化指令
    bind(el, binding, vnode) {
      function documentHandler(e) {
        // 这里判断点击的元素是否是本身，是本身，则返回
        if (el.contains(e.target)) {
          return false;
        }
        // 判断指令中是否绑定了函数
        if (binding.expression) {
          // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
          binding.value(e);
        }
      }
      // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
      el.vueClickOutside = documentHandler;
      document.addEventListener("click", documentHandler);
    },
    update() {},
    unbind(el, binding) {
      // 解除事件监听
      document.removeEventListener("click", el.vueClickOutside);
      delete el.vueClickOutside;
    },
  };

  export default {
    name: "Reply",
    data() {
      return {
        placeholder: "", // 回复者名称
        btnShow: false,
        index: "0", // 评论列表的索引值
        replyComment: "", // 评论输入内容
        username: "", // 登录的用户名
        avatar: "https://s1.ax1x.com/2022/06/10/Xc9lUf.png", // 登录用户头像
        userId: "", // 登录用户id
        parentName: "", // 回复的对象（父评论）用户名
        parentId: 0, // 父id
        postId: "", // 文章id
        comments: [], // 评论列表
        entityType: 2, // 2-点赞评论类型
        entityPostType: 1, // 评论目标的类型1-帖子；2-评论
        entityReplyType: 2, 
        current: 1, //当前页码
        size: 3, // 每页显示条数
        total: 0 // 总条目数
      }
    },
    directives: { clickoutside }, // 自定义指令(点击评论区外触发事件)
    created() {
      // 获取登录用户信息
      this._userInfo()
      this.postId = this.$route.params.id
      // 获取评论列表
      this._getReply()
      // 获取评论总数
      this._getCommentTotal()
    },
    watch: {
      '$route' (to, from) {
        if(from.path === '/home' || from.path ==='message') {
          // 保存本帖子的id
          this.postId = this.$route.params.id
          // 获取登录用户信息
          this._userInfo()
          // 获取评论列表
          this._getReply()
          // 获取评论总数
          this._getCommentTotal()
        }
        if(to.path) {
          location.reload()
        }
      }
    },
    computed: {
      getParentLength() {
        return function(i) {
          return this.comments[i].reply_comment_list.length
        }
      }
    },
    methods: {
      // 获取登录用户信息
      _userInfo() {
        userInfo()
        .then(res => {
          let data = res.data.data
          this.username = data.nickname
          this.userId = data.id
          this.avatar = data.avatar
        })
        .catch(err => {
          console.log(err);
        })
      },
      // 获取评论列表
      _getReply() {
        getReply(this.current, this.size, this.postId)
        .then(res => {
          this.comments = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
      },
      // 获取评论总数
      _getCommentTotal() {
        getCommentTotal(this.postId)
        .then(res => {
          this.total = res.data.data.parentCommentCount
        })
        .catch(err => {
          console.log(err);
        })
      },
      // 点击评论框获得焦点
      inputFocus() {
        var replyInput = document.getElementById("replyInput");
        replyInput.style.padding = "8px 8px";
        replyInput.style.border = "2px solid #409EFF";
        replyInput.focus();
      },
      // 点击显示评论回复编辑框
      showReplyInput(i, name, id) {
        console.log(i);
        this.comments[this.index].is_show = false
        this.index = i
        this.comments[i].is_show = true
        this.parentName = name
        this.parentId = id
        this.placeholder = "回复 @" + name
      },
      // 显示评论输入框
      _inputShow(i) {
        return this.comments[i].is_show
      },
      // 隐藏评论提交按钮
      hideReplyBtn() {
        this.btnShow = false;
        replyInput.style.padding = "10px";
        replyInput.style.border = "none";
      },
      // 显示评论提交按钮
      showReplyBtn() {
        this.btnShow = true;
      },
      // 获取输入框输入的信息
      onDivInput: function (e) {
        this.replyComment = e.target.innerHTML;
      },
      // 发送父评论
      sendComment() {
        // 判断输入框是否为空
        if (!this.replyComment) {
          this.$message({
            showClose: true,
            type: "warning",
            message: "评论不能为空",
          });
        } else {
          let bodyData = {}
          bodyData.parentId = this.parentId
          bodyData.entityType = this.entityPostType
          bodyData.entityId = this.postId
          bodyData.content = this.replyComment

          // 发送帖子评论的网络请求
          comment(this.postId, bodyData)
          .then(res => {
            console.log(res);
            if (res.data.data === 1) {
              this.$message.success("回复成功！");
            } else {
              this.$message.error("回复失败，请稍后重试！");
            }
            // 重新请求列表获取新的评论数据
            this._getReply()
          })
          .catch(err => {
            console.log(err);
          })
          // 发送成功后将输入框的内容设为空
          document.getElementById("replyInput").innerHTML = "";
          this.replyComment = "";
        }
      },
      // 发送子评论
      sendCommentReply(i) {
        if (!this.replyComment) {
          this.$message({
            showClose: true,
            type: "warning",
            message: "评论不能为空",
          });
        } else {
          let bodyData = {}
          bodyData.parentId = this.parentId
          bodyData.entityType = this.entityReplyType
          bodyData.entityId = this.parentId
          bodyData.content = this.replyComment
          // 发送帖子评论的网络请求
          comment(this.postId, bodyData)
          .then(res => {
            console.log(res);
            if (res.data.data === 1) {
              this.$message.success("回复成功！");
            } else {
              this.$message.error("回复失败，请稍后重试！");
            }
            // 重新请求列表获取新的评论数据
            this._getReply()
          })
          .catch(err => {
            console.log(err);
          })
          // 发送成功后将输入框的内容设为空
          document.getElementsByClassName("reply-comment-input")[i].innerHTML = "";
          this.replyComment = "";
        }
      },
      // 点赞评论
      like(id) {
        const formData = new FormData()
        formData.append('entityType', this.entityType)
        formData.append('entityId', id)
        clickLike(this.postId, formData)
        .then(res => {
          console.log(res);
          // 实时获取点赞
          this._getReply()
        })
        .catch(err => {
          console.log(err);
        })
      },
      //监听 size 改变的事件
      size_change(newSize){
        console.log(newSize);
        this.size = newSize
      },
      //监听 页码值 改变的事件
      current_change(newPage){
        this.current = newPage
        // 页码值改变时 重新获取
        this._getReply()
      },  
    }
  }
</script>

<style scoped>
  .comment {
    width: 1225px;
    margin: 20px auto;
    font-family: PingFang SC, HarmonyOS_Regular, Helvetica Neue, Microsoft YaHei,
    sans-serif;
  }
  .my-reply {
    padding: 10px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    border-bottom: 1px solid rgba(178, 186, 194, 0.3);
  }
  .my-reply .header-img {
    display: inline-block;
    vertical-align: top;
  }
  .my-reply .reply-info {
    display: inline-block;
    margin-left: 5px;
    width: 90%;
  }
  @media screen and (max-width: 1200px) {
    .my-reply .reply-info {
      width: 80%;
    }
  }
  .my-reply .reply-info .reply-input {
    min-height: 20px;
    line-height: 22px;
    padding: 10px 10px;
    color: #606266;
    background-color: #fff;
    border-radius: 5px;
  }
  .my-reply .reply-info .reply-input:empty:before {
    content: attr(placeholder);
  }
  .my-reply .reply-info .reply-input:focus:before {
    content: none;
  }
  .my-reply .reply-info .reply-input:focus {
    padding: 8px 8px;
    border: 2px solid #409eff;
    box-shadow: none;
    outline: none;
  }
  /* .reply-info>div .reply-input:focus{
      border: 2px solid #409EFF;
  } */
  .my-reply .reply-btn-box {
    height: 25px;
    margin: 10px 0;
  }
  .my-reply .reply-btn-box .reply-btn {
    position: relative;
    float: right;
    margin-right: 15px;
  }
  .my-comment-reply {
    margin-left: 50px;
  }
  .my-comment-reply .reply-input {
    width: flex;
  }
  .author-title:not(:last-child) {
    border-bottom: 1px solid rgba(178, 186, 194, 0.3);
  }
  .author-title {
    padding: 10px;
    padding-top: 20px;
  }
  .author-title.reply-father {
    background-color: #fff;
  }
  .author-title .header-img {
    display: inline-block;
    vertical-align: top;
  }
  .author-title .author-info {
    display: inline-block;
    margin-left: 5px;
    width: 60%;
    height: 40px;
    line-height: 20px;
  }
  .author-title .author-info > span {
    display: block;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .author-title .author-info .author-name {
    color: #303133;
    font-size: 18px;
    font-weight: 500;
  }
  .reply-box .talk-box {
    color: #606266;
  }
  .reply-box .talk-box span {
    color: #6298ce;
  }
  .author-title .author-info .author-time {
    font-size: 14px;
  }
  .author-time {
    color: #606266;
  }
  .author-title .icon-btn {
    width: 30%;
    padding: 0 !important;
    float: right;
  }
  @media screen and (max-width: 1200px) {
    .author-title .icon-btn {
      width: 20%;
      padding: 7px;
    }
  }
  .author-title .icon-btn > span {
    cursor: pointer;
  }
  .author-title .icon-btn .iconfont {
    margin: 0 5px;
  }
  .author-title .talk-box {
    margin: 0 50px;
  }
  .author-title .talk-box > p {
    margin: 0;
  }
  .author-title .talk-box .reply {
    font-size: 16px;
    color: #606266;
  }

  .author-title .reply-box {
    margin: 10px 0 0 50px;
    background-color: #efefef;
  }
  /* 点赞图标颜色 */
  .likeIcon {
    color: #40a0ff;
  }

  div/deep/ .el-pagination {
    float: right;
    margin-top: 15px;
  }
</style>