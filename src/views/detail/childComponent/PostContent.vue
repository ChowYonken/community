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
            <span class="name">{{author}}</span>
          </div>
          <!--发布时间-->
          <span class="time">{{createTime}}</span>
          <!-- 帖子类型 -->
          <span class="plate">{{plate}}</span>
        </div>
      </div>
      <div class="rightInfo">
        <span>已赞{{likeCount}}</span> |
        <span>回帖{{commentCount}}</span>
      </div>
    </div>
    <div class="post-text">
      <!--标题-->
      <div class="title">
        <h3>{{title}}</h3>
      </div>
      <!-- 帖子内容 -->
      <div class="text">
        <span>{{content}}</span>
      </div>
      <ul class="operate" ref="operate">
        <li class="zan common" @click="_zanClick">
          <i class="iconfont icon-dianzan" :class="{active: isLike}"></i>
          <span>点赞（{{likeCount}}）</span>
        </li>
        <li class="reply common" @click="toClick">
          <i class="iconfont icon-pinglun"></i>
          <span>评论（{{commentCount}}）</span>
        </li>
        <li class="like common"  @click="saveClick">
          <i class="iconfont icon-shoucang" :class="{active2: isSave}"></i>
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

  import {getPostDetail} from "@/network/api/post";
  import {clickLike} from "@/network/api/user"

  export default {
    name: "PostContent",
    data() {
      return {
        id: null, // 保存本帖子id
        entityId: null, // 对应实体的id
        entityType: "1", // 1-对应帖子类型
        isLike: '',
        isSave: '',
        author: '', // 作者名字
        commentCount: null, // 评论数
        content: '', // 帖子内容
        likeCount: null, // 点赞数
        createTime: '', // 发布帖子时间
        plate: '', // 帖子类型
        title: '' // 帖子标题
      }
    },
    created() {
      // 保存本帖子的id
      this.id = this.$route.params.id
      // 用于当做点赞网络请求的对应实体id
      this.entityId = this.$route.params.id
      // 请求帖子的详情信息
      if(this.id) {
        this.getPost(this.id)
      }
    },
    watch: {
      //监听相同路由下参数变化的时候，从而实现异步刷新
      '$route' (to, from) {
        //你在create里的方法
        // 保存本帖子的id
        this.id = this.$route.params.id
        // 请求帖子的详情信息
        if(this.id) {
          // 可以实时获取isLike数据
          this.getPost(this.id)
        }
      }
    },
    methods: {
      // 点赞
      _zanClick() {
        this.zanCurrent = !this.zanCurrent
        // 将entityType entityId转为formData格式
        const formData = new FormData()
        formData.append('entityType', this.entityType)
        formData.append('entityId', this.entityId)
        clickLike(this.id, formData)
        .then(res => {
          this.getPost(this.id)
        })
        .catch(err => {
          console.log(err);
        })
      },
      // 收藏
      saveClick() {
        this.saveCurrent = !this.saveCurrent
      },
      // 点击评论跳转到评论输入框
      toClick() {
        window.scrollTo({
          top: this.$refs['operate'].offsetTop + 55,
          behavior: "smooth"
        })
      },
      // 请求帖子详情信息的方法
      getPost(id) {
        getPostDetail(id)
        .then(res => {
          const data = res.data.data
          this.author = data.author
          this.commentCount = data.commentCount
          this.content = data.content
          this.likeCount = data.likeCount
          this.createTime = data.createTime
          this.plate = data.plate
          this.title = data.title
          this.isLike = data.isLike
        })
      }
    }
  }
</script>

<style scoped>
  div/deep/ .el-card__body, .el-main {
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

  .leftInfo-Content .time,
  .leftInfo-Content .plate {
    font-size: 14px;
    color: #7B7E86;
  }

  .leftInfo-Content .plate {
    margin-left: 10px;
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
