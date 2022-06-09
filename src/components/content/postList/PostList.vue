<template>
  <div class="text-list-model">
    <div class="list-item-wrap">
      <div class="list-item">
        <!--帖子标题-->
        <div class="info">
          <router-link to="/detail">
            <span class="title">金州勇士，天道酬勤：合计98岁的库里克雷追梦，八年六总决赛</span>
          </router-link>
          <span>50赞</span>
          <span>744回复</span>
        </div>
        <!--帖子分类-->
        <div class="lable">
          <router-link to="/topic">
            <span>娱乐圈</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PostList"
  }
</script>

<style scoped>
  .list-item-wrap .list-item {
    display: flex;
    height: 40px;
    line-height: 40px;
    justify-content: space-between;
    border-bottom: 1px solid #e3e3e4;
    font-size: 14px;
  }

  .list-item-wrap .list-item .info {
    display: flex;
  }

  .list-item-wrap .list-item .info .title{
    display: inline-block;
    color: #2D3137;
    max-width: 414px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space:nowrap;

  }

  .list-item-wrap .list-item .info span {
    margin-left: 10px;
    color: #7B7E86;
  }

  .list-item .info a:hover .title {
    color: #409EFF;
  }

  .list-item .lable a:hover {
    color: #409EFF;
  }
</style>
