<template>
  <div class="follow-list">
    <div class="list-item" v-for="item in FollowList">
      <span class="avatar">
        <img :src="item.avatar" alt="">
      </span>
      <div class="info-box">
        <span class="nickname">{{item.nickname}}</span>
        <span class="follow-time">关注时间 {{item.followTime}}</span>
      </div>
      <div class="follow-btn">
        <el-button type="info" v-if="item.follow">已关注</el-button>
        <el-button type="success" plain v-else @click="_clickFollow()">关注</el-button>
      </div>
    </div>
  </div>
</template>

<script>

  import {clickFollow} from "@/network/api/user"

  export default {
    name: "FollowList",
    props: {
      FollowList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      // 关注用户
      _clickFollow() {
        clickFollow(this.FollowList.id)
        .then(res => {
          this.$message({
            message: '关注成功',
            type: "success"
          })
        })
        .catch(err => {
          console.log(err);
        })
      }
    }
  }
</script>

<style scoped>
  .list-item {
    display: flex;
    width: 743px;
    height: 111px;
    margin-top: 10px;
    cursor: pointer;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #E4E7ED;
  }

  .list-item .avatar {
    display: inline-block;
    width: 50px;
    height: 50px;
    margin-right: 30px;
  }

  .list-item .avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  
  .list-item .info-box {
    width: 582px;
  }

  .list-item .info-box .nickname {
    font-size: 18px;
    color: #2e3135;
    font-weight: 700;
  }

  .list-item .info-box .follow-time {
    display: block;
    margin-top: 6px;
    font-size: 12px;
    color: #B9C0C8;
  }
</style>