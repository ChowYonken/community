<template>
  <div class="text-list-model">
    <div class="list-item-wrap" v-for="item in postList">
      <div class="list-item">
        <!--帖子标题-->
        <div class="info">
          <div @click="itemClick(item)" >
            <li><span class="title" :class="{'active': item.isEssence}">{{item.title}}</span></li>
          </div>
          <span>{{item.likeCount}} 赞</span>
          <span>{{item.commentCount}} 回复</span>
        </div>
        <!--帖子分类-->
        <div class="lable">
          <router-link to="/topic">
            <span>{{item.plate}}</span>
          </router-link>
          <!-- 发布时间 -->
          <span class="create-time">{{getTime(item.createTime)}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PostList",
    props: {
      postList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        
      }
    },
    computed: {
      getTime() {
        return time => {
          // 将获取的时间改为 yyyy-mm-dd 格式
          let appointDate = /\d{4}-\d{1,2}-\d{1,2}/g.exec(time)[0];
          return appointDate
        }
      }
    },
    methods: {
      itemClick(item) {
        this.$router.push('/discussPost/' + item.id)
        // location.reload()
      }
    }
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

  .list-item .info li:hover .title {
    color: #409EFF;
  }

  .list-item .lable a:hover {
    color: #409EFF;
  }

  .list-item .lable .create-time {
    color: #7B7E86;
    margin-left: 10px;
  }

  .active {
    color: #409EFF!important;
  }
</style>
