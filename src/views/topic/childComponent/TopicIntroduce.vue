<template>
  <!--话题介绍-->
  <div class="topic-intro">
    <!--话题图标-->
    <div class="topic-intro-img">
      <img src="@/assets/img/category/yulequan.png" alt="">
    </div>
    <!--话题细节-->
    <div class="topic-intro-detail">
      <div class="topic-intro-detail-title-wrap">
        <span>#娱乐圈</span>
        <el-button type="primary" @click="toCreatePost">发帖</el-button>
      </div>
      <div class="topic-intro-detail-desc">
        <span class="topic-intro-detail-desc-title">话题介绍</span>
        <span class="topic-intro-detail-desc-text">不饭圈、不控评、不玻璃心，要玩就玩真实的娱乐圈</span>
      </div>
      <div class="topic-intro-detail-desc">
        <span class="topic-intro-detail-desc-title">话题热度</span>
        <span class="topic-intro-detail-desc-text">
              <i class="iconfont icon-icon"></i>
              114.1w
            </span>
      </div>
      <div class="topic-intro-detail-desc">
        <span class="topic-intro-detail-desc-title">版主</span>
        <div class="topic-intro-detail-desc-text"><a href="javascript:;">我是康康</a></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TopicIntroduce",
    methods: {
      // 跳转发表帖子页面
      toCreatePost() {
        this.$router.push('/post')
      }
    }
  }
</script>

<style scoped>
  .topic-intro {
    display: flex;
    margin: 20px 0;
    padding: 20px 0;
    border: 1px solid #f5f5f5;
    background: linear-gradient(90deg, #fff 20%, rgba(255, 255, 255, 0.9)),url(~@/assets/img/category/yulequan.png) no-repeat 0 center / 100%;
  }

  .topic-intro .topic-intro-img {
    width: 76px;
    height: 76px;
    border-radius: 12px;
    overflow: hidden;
  }

  .topic-intro .topic-intro-img img {
    width: 100%;
    height: 100%;
  }

  .topic-intro-detail {
    flex: 1 1;
    margin-left: 20px;
  }

  .topic-intro-detail .topic-intro-detail-title-wrap {
    padding-bottom: 8px;
  }

  .topic-intro-detail .topic-intro-detail-title-wrap span {
    padding-right: 6px;
    font-size: 20px;
    color: #191c22;
    font-weight: 600;
    vertical-align: middle;
  }
  /deep/ .el-button {
    width: 70px;
    height: 22px;
    font-size: 14px;
    line-height: 0;
    text-align: center;
  }

  .topic-intro-detail-desc {
    display: flex;
    margin-top: 6px;
    line-height: 18px;
  }

  .topic-intro-detail-desc-title {
    flex: 0 0 72px;
    font-size: 12px;
    color: #191c22;
    font-weight: 500;
    font-family: PingFangSC-Medium;
  }

  .topic-intro-detail-desc-text {
    font-size: 12px;
    color: #4e5158;
    font-family: PingFangSC-Regular;
  }
</style>
