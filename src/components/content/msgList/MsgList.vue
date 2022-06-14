<template>
  <div class="msg-container">
    <el-card class="content" shadow="always">
      <div class="MsgList">
        <!--头像-->
        <div class="touxiang">
          <router-link to="/profile">
            <span>
              <img src="@/assets/img/touxiang.jpg" alt="">
            </span>
          </router-link>
        </div>
        <!--文本-->
        <div class="text">
          <span class="text-content">
            【即将结束】 掘金会员1元抵100优惠券即将结束，倒计时7天，马上恢复原价！不要犹豫，立刻点击链接抢购，手慢无！
            【即将结束】 掘金会员1元抵100优惠券即将结束，倒计时7天，马上恢复原价！不要犹豫，立刻点击链接抢购，手慢无！
            【即将结束】 掘金会员1元抵100优惠券即将结束，倒计时7天，马上恢复原价！不要犹豫，立刻点击链接抢购，手慢无！
            【即将结束】 掘金会员1元抵100优惠券即将结束，倒计时7天！马上恢复原价！不要犹豫，立刻点击链接抢购，手慢无！
          </span>
          <!--时间-->
          <span class="time">20小时前</span>
        </div>
      </div>
    </el-card>
    <el-card class="content" shadow="always">
      <div class="MsgList">
        <!--头像-->
        <div class="touxiang">
          <router-link to="/profile">
            <span>
              <img src="@/assets/img/touxiang.jpg" alt="">
            </span>
          </router-link>
        </div>
        <!--文本-->
        <div class="text">
          <span class="text-content">
            【即将结束】 掘金会员1元抵100优惠券即将结束，倒计时7天，马上恢复原价！不要犹豫，立刻点击链接抢购，手慢无！
            【即将结束】 掘金会员1元抵100优惠券即将结束，倒计时7天，马上恢复原价！不要犹豫，立刻点击链接抢购，手慢无！
            【即将结束】 掘金会员1元抵100优惠券即将结束，倒计时7天，马上恢复原价！不要犹豫，立刻点击链接抢购，手慢无！
            【即将结束】 掘金会员1元抵100优惠券即将结束，倒计时7天！马上恢复原价！不要犹豫，立刻点击链接抢购，手慢无！
          </span>
          <!--时间-->
          <span class="time">20小时前</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "MsgList"
  }
</script>

<style scoped>
  .msg-container {
    margin-top: 145px;
  }

  .content {
    width: 960px;
    margin: 5px auto 5px;
    background-color: #fff;
  }

  .MsgList {
    display: flex;
  }

  .MsgList .touxiang {
    display: inline-block;
    width: 50px;
    height: 50px;
    border: 1px solid #DCDCDC;
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

  .MsgList .text .time {
    display: block;
    color: #7B7E86;
    font-size: 14px;
    margin-top: 10px;
  }
</style>
