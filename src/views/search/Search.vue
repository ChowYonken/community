<template>
  <div id="search">
    <div class="search">
      <!--搜索关键字-->
      <div class="search-keyword">
        <span>关键字：</span>
        <el-input placeholder="请输入关键字" v-model="keyword" @keyup.enter.native="searchKeyWord" class="searchInput">
          <el-button class="searchBtn" slot="append" icon="el-icon-search" @click.native="searchKeyWord" ></el-button>
        </el-input>

      </div>
      <!-- 专区选择 -->
      <div class="search-topic">
        <span>专区：</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            @change="searchTopic">
          </el-option>
        </el-select>
      </div>
      <!-- 排序 -->
      <div class="sort">
        <span>排序：</span>
        <el-radio v-model="radio" label="1" @change="searchSort">热度</el-radio>
        <el-radio v-model="radio" label="2" @change="searchSort">最新</el-radio>
      </div>
    </div>
    <!-- 搜索内容 -->
    <el-card class="content" shadow="always">
      <div class="title">
        <i class="iconfont icon-tiezi"></i>
        <span>相关帖子</span>
      </div>
      <!--有数据-->
      <el-table
      :data="tableData"
      style="width: 100%" v-if="hasData">
      <!-- 帖子标题 -->
      <el-table-column
        prop="title"
        label="帖子标题"
        width="680">
        <!-- 将后台返回的html动态渲染 -->
        <template slot-scope="scope">
          <!-- <div v-html="scope.row.title"></div> -->
          <span v-html="showData(scpoe.row.title)"></span>
        </template>     
      </el-table-column>
      <!-- 专区 -->
      <el-table-column
        prop="plate"
        label="专区"
        width="150">
      </el-table-column>
      <!-- 发布时间 -->
      <el-table-column
        prop="createTime"
        label="发布时间"
        width="140">
      </el-table-column>
      <!-- 回复数 -->
      <el-table-column
        prop="commentCount"
        label="回复"
        width="80">
      </el-table-column>
      <!-- 点赞 -->
      <el-table-column
        prop="likeCount"
        label="点赞"
        width="80">
      </el-table-column>
    </el-table>
      <!--无数据-->
      <div class="noData" v-else>
        <img src="@/assets/img/search/noData.png" alt="">
        <div class="noData-font">抱歉，没有找到您想要的帖子</div>
        <el-button type="primary" class="btn" @click="backHome">返回主页</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>

  import SearchList from "@/components/content/searchList/SearchList"
  import {search} from "@/network/api/search"

  export default {
    name: "Search",
    components: {
      SearchList
    },
    data() {
      return {
        tableData: [],
        keyword: '', // 搜索框内容
        hasData: false,
        options: [{       // 选择器选项
          value: '0',
          label: '影视圈'
        }, {
          value: '1',
          label: '娱乐圈'
        }, {
          value: '2',
          label: '音乐圈'
        }, {
          value: '3',
          label: '综艺圈'
        }],
        value: '',
        radio: '1', // 排序默认
        current: 1, // 当前页码
        size: 20, // 页码大小
      }
    },
    created() {
      this.keyword = this.$route.params.keyword
      this._search()
    },
    watch: {
      '$route' (to, from) {
        this.keyword = this.$route.params.keyword
      }
    },
    methods: {
      // 返回主页
      backHome() {
        this.$router.push('/home')
      },
      // 搜索帖子
      _search() {
        search(this.keyword, this.value, this.radio)
        .then(res => {
          console.log(res);
          if(res.data.data.content.length !== 0) {
            this.tableData = res.data.data.content
            this.hasData = true
          }
        })
        .catch(err => {
          console.log(err);
        })
      },
      // 按关键字搜索
      searchKeyWord() {
        this._search()
      },
      // 按话题搜索
      searchTopic() {
        this._search()
      },
      // 按排序搜索
      searchSort() {
        this._search()
      },
      // 高亮显示关键字
      showDate(val) {
        if (
          val.indexOf(this.keyword) !== -1 && 
          this.keyword !== ''
        ) {
          return val.replace(
            this.keyword,
            '<font color="#f00">' + this.keyword + '</font>'
          )
        } else {
          return val
        }
      }
    }
  }
</script>

<style scoped>
  #search {
    width: 1225px;
    margin: 0 auto;
  }

  .searchInput {
    width: 500px;
    margin-bottom: 30px;
  }

  .searchInput .searchBtn {
    background-color: #409eff;
  }

  .search-topic,
  .sort {
    margin: 0px 0 30px 16px;
  }

  div/deep/ .el-icon-search {
    color: #fff;
  }

  .title {
    font-weight: 700;
    margin-bottom: 10px;
  }

  .title i {
    display: inline-block;
    margin-right: 5px;
  }

  div/deep/ .el-tabs__item {
    font-weight: 700!important;
  }

  .content .noData {
    padding-top: 40px;
    text-align: center;
  }

  .content .noData img {
    width: 230px;
    height: 230px;
    opacity: .7;
  }

  .content .noData .noData-font {
    font-size: 13px;
    font-weight: 400;
    color: #8c8c8c;
    line-height: 18px;
  }

  .btn {
    margin: 20px 0;
  }
</style>
