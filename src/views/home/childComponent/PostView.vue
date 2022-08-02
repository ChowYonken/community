<template>
  <el-card class="content" shadow="always">
    <el-tabs v-model="activeName" @tab-click="tabClick">
      <el-tab-pane label="最热主题" name="1">
        <post-list :post-list="allIntelligence"/>
      </el-tab-pane>
      <el-tab-pane label="最新主题" name="2">
        <post-list :post-list="allIntelligence"/>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>

  import PostList from "@/components/content/postList/PostList";
  import {getShowPost, getCount} from "@/network/api/post";

  export default {
    name: "PostView",
    components: {
      PostList
    },
    data() {
      return {
        activeName: '1', // 1表示最新 2表示最热
        userId: 0, // 查询所有帖子
        total: 0, // 数据总条数
        currentIndex: 0, // 当前页
        page: 1, // 初始化显示的页数
        pageSize: 20, // 每页显示数量
        allIntelligence: [] // 所有的数据
      }
    },
    created() {
      // 请求帖子列表数据
      this.getPost(this.userId, this.currentIndex, this.pageSize, this.activeName)
    },
    mounted() {
      // 获取数据总条数
      getCount(this.userId)
      .then(res => {
        this.total = res.data.data
      })
      .catch(err => {
        console.log(err)
      })

    },
    methods: {
      tabClick(tab, event) {
        // 获取tabId
        let tabId = event.target.getAttribute('id')
        // 判断点击哪个tab
        if(tabId === 'tab-1') {
          this.activeName = "1"
          this.getPost(this.userId, this.currentIndex, this.pageSize, this.activeName)
        } else if(tabId === 'tab-2') {
          this.activeName = "2"
          this.getPost(this.userId, this.currentIndex, this.pageSize, this.activeName)
        }
      },
      getPost(userId,currentIndex,pageSize,activeName) {
        let that = this;
        getShowPost(userId,currentIndex,pageSize,activeName)
          .then(res => {
            that.allIntelligence = res.data.data
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
</script>

<style scoped>
  .content {
    position: relative;
    flex: 0 0 708px;
    margin-right: 10px;
  }

  div/deep/ .el-tabs__item {
    font-weight: 700;
  }

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

  div/deep/ .el-pagination {
    position: relative;
    top: 440px;
    /*left: 120px;*/
  }

</style>
