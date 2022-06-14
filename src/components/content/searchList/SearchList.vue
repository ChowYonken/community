<template>
  <div class="content">
    <div class="search-list">
      <div class="list">
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
          <!--用户名-->
          <span class="userName">今天没吃饭</span>
          <!--帖子标题-->
          <span class="postTitle">NBA总比分：勇士-凯尔特人：3-2</span>
          <span class="time">发布于 2022-6-14 20:05:27</span>
        </div>
        <!--统计-->
        <div class="num">
          <span>赞 1  |  回复 1</span>
        </div>
      </div>
    </div>
    <div class="search-list">
      <div class="list">
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
          <!--用户名-->
          <span class="userName">今天没吃饭</span>
          <!--帖子标题-->
          <span class="postTitle">NBA总比分：勇士-凯尔特人：3-2</span>
          <span class="time">发布于 2022-6-14 20:05:27</span>
        </div>
        <!--统计-->
        <div class="num">
          <span>赞 1  |  回复 1</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SearchList"
  }
</script>

<style scoped>
  .search-list {
    margin-top: 20px;
    border: 1px solid #ccc;
    border-radius: 20px;
    padding: 15px 30px 0;
  }

  .list {
    display: flex;
  }

  .list .touxiang {
    display: inline-block;
    width: 50px;
    height: 50px;
    /*border: 1px solid #DCDCDC;*/
    border-radius: 50%;
    overflow: hidden;
    margin-right: 20px;
  }

  .list .touxiang img {
    width: 100%;
    height: 100%;
  }

  .list .text {
    width: 800px;
    overflow: hidden;
  }

  .list .text span {
    display: block;
    margin-bottom: 20px;
  }

  .list .text .userName {
    color: #191c22;
  }

  .list .text .postTitle {
    color: #191c22;
    font-size: 14px;
  }

  .list .text .time,
  .list .num {
    display: block;
    color: #7B7E86;
    font-size: 12px;
  }

  .list .num {
    font-size: 14px;
    margin: 74px 0 0 150px;
  }
</style>
