<template>
  <div class="msg-container">
    <div class="MsgList" v-for="(item, index) in msgList">
        <!--头像-->
        <div class="touxiang">
          <router-link to="/profile">
            <span>
              <img src="@/assets/img/defaultImg.jpg" alt="">
            </span>
          </router-link>
        </div>
        <!--文本-->
        <div class="text">
          <!-- entity_type===1 是评论帖子 且 tabType === 0 是点击评论消息列表-->
          <span class="text-content" v-if="item.entity_type===1 && tabType === 0">
            用户
            <span class="text-content-nickname">{{item.nickname}}</span>
            评论了你的帖子
            <span class="text-content-post" @click="postClick(index)">{{item.post_title}}</span>
            <span class="comment-content">{{item.comment_content}}</span>
          </span>
          <!-- entity_type===2 是评论评论 且 tabType === 0 是点击评论消息列表-->
          <span class="text-content" v-else-if="item.entity_type===2 && tabType === 0">
            用户
            <span class="text-content-nickname">{{item.nickname}}</span>
            回复了你在帖子
            <span class="text-content-post" @click="postClick(index)">{{item.post_title}}</span>
            下的评论
            <span class="comment-content">{{item.comment_content}}</span>
          </span>
          <!-- entity_type===1 是点赞帖子 且 tabType === 1 是点击点赞消息列表-->
          <span class="text-content" v-else-if="item.entity_type===1 && tabType === 1">
            用户
            <span class="text-content-nickname">{{item.nickname}}</span>
            赞了你的帖子
            <span class="text-content-post" @click="postClick(index)">{{item.post_title}}</span>
          </span>
          <!-- entity_type===2 是点赞评论 且 tabType === 1 是点击点赞消息列表-->
          <span class="text-content" v-else-if="item.entity_type===2 && tabType === 1">
            <span>
              用户 {{item.nickname}} 赞了你在文章 
              <span class="text-content-post" @click="postClick(index)">{{item.post_title}}</span>
               下的评论
            </span>
            <span class="comment-content">{{item.comment_content}}</span>
          </span>
          <!-- 关注消息列表 -->
          <span class="text-content" v-else-if="tabType === 2">
            <span>
              用户 {{item.nickname}} 关注了你
            </span>
            <el-button type="primary" @click="followUser(item.from_id)" class="followBtn">关注</el-button>
          </span>
          <!-- entity_type = fasle 只有content -->
          <span class="text-content" v-else>{{item.content}}</span>

          <!--时间-->
          <span class="time">{{getDateDiff(item.create_time)}}</span>
        </div>
      </div>
  </div>
</template>

<script>

  import {clickFollow} from "@/network/api/user"

  export default {
    name: "MsgList",
    props: {
      msgList: {
        type: Array,
        default() {
          return []
        }
      },
      tabType: {
        type: Number,
        default() {
          return null
        }
      }
    },
    data() {
      return {
      }
    },
    computed: {
      // 时间戳转化
      getDateDiff() {
        return function(dateTimeStamp) {
          if(dateTimeStamp) {
            var result = ''
            var minute = 1000 * 60
            var hour = minute * 60
            var day = hour * 24
            var month = day * 30
            var now = new Date().getTime()
            var diffValue = now - dateTimeStamp
            if (diffValue < 0) return
            var monthC = diffValue / month
            var weekC = diffValue / (7 * day)
            var dayC = diffValue / day
            var hourC = diffValue / hour
            var minC = diffValue / minute
            if (monthC >= 1) {
              result = "" + parseInt(monthC) + "月前"
            }
            else if (weekC>=1) {
              result = "" + parseInt(weekC) + "周前"
            }
            else if (dayC >= 1) {
              result = ""+ parseInt(dayC) + "天前"
            }
            else if (hourC >= 1){
              result = "" + parseInt(hourC) + "小时前"
            }
            else if (minC >= 1) {
              result = ""+ parseInt(minC) + "分钟前"
            } else {
              result = "刚刚"
            }
            return result
          }
        }
        return _getDateDiff(dateTimeStamp)
      }
    },
    methods: {
      // 点击文章跳转对应详情页
      postClick(index) {
        this.$router.push('/discussPost/' + this.msgList[index].post_id)
      },
      // 关注
      followUser(id) {
        const formData = new FormData()
        // 关注用户
        let entityType = 1
        formData.append("entityType", entityType)
        formData.append("entityId", id)
        clickFollow(formData)
        .then(res => {
          console.log(res);
          if (res.data.status === 100) {
            this.$message({
              type: "success",
              message: "关注成功"
            })
          } else {
            this.$message.error('关注失败，请重试');
          }
        })
        .catch(res => {
          console.log(err);
        })
      }
    }
  }
</script>

<style scoped>
  .msg-container {
    margin-top: 145px;
  }

  .MsgList {
    display: flex;
    width: 960px;
    margin: 5px auto 5px;
    background-color: #fff;
    padding: 20px 20px 15px 20px;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  }

  .MsgList .touxiang {
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 20px;
  }

  .MsgList .touxiang img {
    width: 100%;
    height: 100%;
  }

  .MsgList .text {
    width: 800px;
    overflow: hidden;
  }

  .MsgList .text .text-content {
    display: block;
    min-height: 40px;
    margin-top: 8px;
    font-size: 14px;
  }

  .MsgList .text .text-content .comment-content {
    display: block;
    width: 760px;
    height: 40px;
    line-height: 40px;
    background-color: #f1ecec94;
    padding-left: 10px;
    margin-top: 10px;
  }

  .MsgList .text .text-content .text-content-post {
    color: #409EFF;
  }

  div/deep/ .el-button--primary {
    float: right;
    padding: 10px 25px;
  }

  .MsgList .text .time {
    display: block;
    color: #7B7E86;
    font-size: 14px;
    margin-top: 10px;
  }
</style>
