<template>
  <div id="card-info-body">
    <!--帖子内容-->
    <el-card class="content" shadow="always">
      <el-tabs v-model="activeName" @tab-click="indexClick">
        <el-tab-pane label="发帖" name="post">
          <!--有数据显示-->
          <post-list v-if="isPost" :post-list="postList"/>
          <!--无数据显示-->
          <div class="noData" v-else>
            <img src="@/assets/img/profile/noData.png" alt="">
            <div class="noData-font">暂无数据 去其他地方看看</div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="回帖" name="reply">
          <!--有数据显示-->
          <post-list v-if="false"/>
          <!--无数据显示-->
          <div class="noData" v-else>
            <img src="@/assets/img/profile/noData.png" alt="">
            <div class="noData-font">暂无数据 去其他地方看看</div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="推荐" name="recommend">
          <!--有数据显示-->
          <post-list v-if="false"/>
          <!--无数据显示-->
          <div class="noData" v-else>
            <img src="@/assets/img/profile/noData.png" alt="">
            <div class="noData-font">暂无数据 去其他地方看看</div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="收藏" name="collect">
          <!--有数据显示-->
          <post-list v-if="false"/>
          <!--无数据显示-->
          <div class="noData" v-else>
            <img src="@/assets/img/profile/noData.png" alt="">
            <div class="noData-font">暂无数据 去其他地方看看</div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="关注" name="follow">
          <follow-control
            :titles="['关注', '粉丝']"
            class="tab-control" 
            @tabClick="tabClick"/>
          <!-- 有数据显示 -->
          <follow-list v-if="isData" :follow-list="allIntelligence"/>
          <!-- 无数据显示 -->
          <div class="noData" v-else>
            <img src="@/assets/img/profile/noData.png" alt="">
            <div class="noData-font">暂无数据 去其他地方看看</div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!--关注-->
    <el-card class="follow" shadow="always">
      <div class="hotSearch">

        <div class="follow">
          <div class="hotTitle">关注</div>
          <div class="hotValue">{{followerCount}}</div>
        </div>
        <div class="fans">
          <div class="hotTitle">粉丝</div>
          <div class="hotValue">{{fansCount}}</div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>

  import FollowControl from "@/components/content/followControl/followControl"
  import PostList from "@/components/content/postList/PostList";
  import FollowList from "@/components/content/followList/FollowList"
  import {getUserInfo, getFollowList, getFansList} from "@/network/api/user";
  import {getShowPost} from "@/network/api/post"

  export default {
    name: "CardInfoBody",
    components: {
      FollowControl,
      PostList,
      FollowList
    },
    data() {
      return {
        activeName: 'post',
        follow: 'followUser',
        id: '', // 用户id
        fansCount: 0, // 粉丝数
        followerCount: 0, // 关注数
        isData: false, // 是否有关注数据
        allIntelligence: [], // 关注列表所有数据
        postList: [], // 用户所有帖子
        isPost: false // 是否有帖子数据
      }
    },
    created() {
      // 获取用户的id
      this.id = Number(this.$route.params.id)
      // 获取用户信息
      this._getUserInfo()
      // 获取用户关注列表
      this._getFollowList()
      // 获取用户所有帖子
      this._getShowPost()
    },
    watch: {
      '$route' (to, from) {
        this.id = Number(this.$route.params.id)
        if(this.id) {
          // 获取用户信息
          this._getUserInfo()
          // 获取用户关注列表
          this._getFollowList()
          // 获取用户所有帖子
          this._getShowPost()
        }
      }
    },
    methods: {
      // 获取用户信息
      async _getUserInfo() {
        await getUserInfo(this.id)
        .then(res => {
          let data = res.data.data
          this.fansCount = data.fansCount
          this.followerCount = data.followerCount
        })
        .catch(err => {
          console.log(err);
        })
      },
      // 获取用户的帖子
      _getShowPost() {
        let that = this
        getShowPost(that.id)
        .then(res => {
          console.log(res);
          this.postList = res.data.data
          this.isPost = true
        })
        .catch(err => {
          console.log(err);
        })
      },
      // 获取用户关注列表
      _getFollowList() {
        let that = this
        getFollowList(this.id)
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
      // 获取用户粉丝列表
      _getFansList() {
        let that = this
        getFansList(that.id)
        .then(res => {
          console.log(res);
          that.allIntelligence = res.data.data
          if(that.allIntelligence.length !== 0) {
            that.isData = true
          }
        })
        .catch(err => {
          console.log(err);
        })
      },
      // 点击导航栏
      indexClick(tab, event) {
        // 获取tabId
        let tabId = event.target.getAttribute('id')
        console.log(tabId);
        if(tabId === 'tab-post') {
          // 获取用户的帖子
          this._getShowPost()
        }
      },
      // 点击关注导航栏
      tabClick(index) {
        this.data = false
        if(index === 0) {
          this._getFollowList()
        } else if(index === 1) {
          this._getFansList()
        }
      }
    }
  }
</script>

<style scoped>
  #card-info-body {
    display: flex;
    margin: 20px 0 auto;
    max-width: 1225px;
  }

  .content {
    width: 823px;
    margin-right: 20px;
    padding: 8px 20px;
    min-height: 500px;
  }

  div/deep/ .el-tabs__item {
    font-weight: 700;
  }

  .content .noData {
    padding-top: 40px;
    text-align: center;
  }

  .content .noData img {
    width: 176px;
    height: 176px;
    opacity: .7;
  }

  .content .noData .noData-font {
    font-size: 13px;
    font-weight: 400;
    color: #8c8c8c;
    line-height: 18px;
  }

  .follow {
    width: 400px;
    height: 100px;
  }

  .hotSearch {
    display: flex;
    width: 400px;
    height: 100px;
  }

  .hotSearch .follow,
  .hotSearch .fans{
    /*display: inline-block;*/
    flex: 1;
    text-align: center;
    margin: 20px 0;
  }

  .hotSearch .hotTitle {
    font-size: 14px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: #4e5158;
    line-height: 20px;
  }

  .hotSearch .hotValue {
    margin-top: 13px;
    font-size: 18px;
    font-family: PingFangSC-Semibold,PingFang SC;
    font-weight: 600;
    color: #2d3137;
    line-height: 25px;
  }

   div/deep/ .el-card__body, .el-main {
      padding: 0;
   }
</style>
