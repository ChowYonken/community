<template>
  <div class="comment">
    <div>
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
      <div
        v-for="(item, i) in comments"
        :key="i"
        class="author-title reply-father"
      >
        <el-avatar class="header-img" :size="40" :src="item.avatar"></el-avatar>
        <div class="author-info">
          <span class="author-name">{{ item.username }}</span>
          <span class="author-time">{{ item.time }}</span>
        </div>
        <div class="icon-btn">
          <span @click="showReplyInput(i, item.username, item.id)">
            <i class="iconfont el-icon-s-comment"></i>{{ item.commentNum }}
          </span>
          <i
            v-if="item.likeFlag"
            class="iconfont el-icon-caret-top likeIcon"
            @click="like(item.id)"
          ></i>
          <i
            v-else
            class="iconfont el-icon-caret-top"
            @click="like(item.id)"
          ></i
          >{{ item.like }}
        </div>
        <div class="talk-box">
          <p>
            <span class="reply"> {{ item.comment }}</span>
          </p>
        </div>
        <div class="reply-box">
          <div v-for="(reply, j) in item.reply" :key="j" class="author-title">
            <el-avatar
              class="header-img"
              :size="40"
              :src="reply.avatar"
            ></el-avatar>
            <div class="author-info">
              <span class="author-name">{{ reply.username }}</span>
              <span class="author-time">{{ reply.time }}</span>
            </div>
            <div class="icon-btn">
              <span @click="showReplyInput(i, reply.username, reply.id)"
              ><i class="iconfont el-icon-s-comment"></i
              >{{ reply.commentNum }}</span
              >
              <i
                v-if="reply.likeFlag"
                class="iconfont el-icon-caret-top likeIcon"
                @click="like(reply.id)"
              ></i>
              <i
                v-else
                class="iconfont el-icon-caret-top"
                @click="like(reply.id)"
              ></i
              >{{ reply.like }}
            </div>
            <div class="talk-box">
              <p>
                回复<span> @{{ reply.parentName }}: </span>
                <span class="reply"> {{ reply.comment }}</span>
              </p>
            </div>
            <div class="reply-box"></div>
          </div>
        </div>
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
  </div>
</template>

<script>
  export default {
    name: "Reply",
    data() {
      return {
        placeholder: "", // 回复者名称
        btnShow: false,
        index: "0",
        replyComment: "", // 评论输入内容
        username: "jaychou", // 登录的用户名
        avatar: "https://s1.ax1x.com/2022/06/10/Xc9lUf.png", // 登录用户头像
        userId: "", // 登录用户id
        parentName: "", // 回复的对象（父评论）用户名
        parentId: 0, // 父id
        itemId: "6666", // 文章等等id
      }
    },
    methods: {
      hideReplyBtn() {
        this.btnShow = false;
        replyInput.style.padding = "10px";
        replyInput.style.border = "none";
      },
      inputFocus() {
        var replyInput = document.getElementById("replyInput");
        replyInput.style.padding = "8px 8px";
        replyInput.style.border = "2px solid #409EFF";
        replyInput.focus();
      },
      showReplyBtn() {
        this.btnShow = true;
      },
      onDivInput: function (e) {
        this.replyComment = e.target.innerHTML;
      },
      sendComment() {

      }
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
    background-color: #fafbfc;
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
    color: #ccc;
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
</style>
