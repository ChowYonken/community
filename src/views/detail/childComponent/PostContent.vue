<template>
  <el-card class="content" shadow="always">
    <div class="card-info">
      <div class="leftInfo">
        <span>
          <img src="@/assets/img/profile/touxiang.png" alt="">
        </span>
        <div class="leftInfo-Content">
          <!--用户名-->
          <div class="title">
            <span class="name">今天没吃饭</span>
          </div>
          <!--发布时间-->
          <span class="time">发布于2022-06-11 17:35:45</span>
        </div>
      </div>
      <div class="rightInfo">
        <span>已赞1</span> |
        <span>回帖1</span>
      </div>
    </div>
    <div class="post-text">
      <!--标题-->
      <div class="title">
        <h3>王心凌是颜值与实力并存的女演员吗？</h3>
      </div>
      <div class="text">
        <span>王心凌是颜值与实力并存的女演员吗?
        王心凌是颜值与实力并存的女演员吗?
        王心凌是颜值与实力并存的女演员吗?
        王心凌是颜值与实力并存的女演员吗?
        王心凌是颜值与实力并存的女演员吗?</span>
        <img src="@/assets/img/detail/1.png" alt="">
        <img src="@/assets/img/detail/2.png" alt="">
        <img src="@/assets/img/detail/3.png" alt="">
      </div>
      <ul class="operate" ref="operate">
        <li class="zan common">
          <i class="iconfont icon-dianzan" :class="{active: zanCurrent}" @click="zanClick"></i>
          <span>点赞（8）</span>
        </li>
        <li class="reply common">
          <i class="iconfont icon-pinglun" @click="toClick"></i>
          <span>评论（8）</span>
        </li>
        <li class="like common">
          <i class="iconfont icon-shoucang" :class="{active2: likeCurrent}" @click="likeClick"></i>
          <span>收藏</span>
        </li>
        <li class="share common">
          <i class="iconfont icon-fenxiang"></i>
          <span>分享</span>
        </li>
      </ul>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: "PostContent",
    data() {
      return {
        zanCurrent: false,
        likeCurrent: false
      }
    },
    methods: {
      zanClick() {
        this.zanCurrent = !this.zanCurrent
      },
      likeClick() {
        this.likeCurrent = !this.likeCurrent
      },
      toClick() {
        window.scrollTo({
          top: this.$refs['operate'].offsetTop + 55,
          behavior: "smooth"
        })
      }
    }
  }
</script>

<style scoped>
  /deep/ .el-card__body, .el-main {
    padding: 20px 0px 20px 110px!important;
  }
  .content {
    display: flex;
    width: 1225px;
    padding: 20px;
    margin: 0 auto;
  }

  .card-info {
    display: flex;
  }

  .leftInfo {
    display: flex;
  }

  .leftInfo img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  .leftInfo-Content {
    width: 800px;
    margin-left: 24px;
  }

  .leftInfo-Content .title .name {
    display: inline-block;
    margin-bottom: 20px;
    font-family: PingFangSC-Semibold,PingFang SC;
    color: #191c22;
  }

  .leftInfo-Content .time {
    font-size: 14px;
    color: #7B7E86;
  }

  .leftInfo .tagTitleList span {
    display: inline-block;
    font-size: 14px;
    margin-left: 5px;
  }

  .rightInfo {
    margin-top: 40px;
    color: #409EFF;
    font-size: 14px;
  }

  .post-text {
    text-align: center;
    background-color: #f5f5f5;
    margin: 35px 95px 0 0;
    padding-bottom: 20px;
    border: 1px solid rgba(200,200,200,-0.5);
    border-radius: 30px;
  }

  .post-text .title {
    margin: 40px 0px;
  }

  .post-text .text span {
    display: block;
    width: 700px;
    margin: 0 auto 20px;
  }

  .post-text .text img {
    margin-top: 20px;
  }

  .post-text .operate {
    display: flex;
    color: #7B7E86;
    font-size: 14px;
    align-items: center;
    justify-content: flex-start;
    height: 32px;
    margin: 20px 0 20px 75px;
  }

  .post-text .operate .common {
    padding: 0 10px;
  }

  .iconfont {
    display: inline-block;
    font-size: 18px;
    margin-right: 8px;
  }

  .active {
    color: #409EFF;
  }

  .active2 {
    color: #f7b500;
  }

  li:hover {
    color: #555666;
  }

</style>
