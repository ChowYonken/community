<template>
  <div class="create">
    <el-card class="send">
      <div class="header">
        <span>💐 发帖</span>
      </div>
      <!--已登录-->
      <div class="btn">
        <el-button type="primary" plain @click="toPost">发表帖子</el-button>
      </div>
    </el-card>
    <el-card class="hot-search" v-show="length > 8">
      <div class="hot-search-title">
        <span>热门搜索</span>
      </div>
      <ul>
        <li class="hot-search-item" @click="hotWordSearch(item)" v-for="(item, index) in hotWordList" :key="item">
          <span class="hot-index">{{index + 1}}</span>
          <span class="hot-title">{{item}}</span>
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script>

  import {getHotWord} from "@/network/api/search"

  export default {
    name: "Create",
    data() {
      return {
        isShowLogin: true, // 判断登录注册是否显示
        hotWordList: [], // 保存热词
        length: null // 热词长度
      }
    },
    created() {
      this._getHotWord()
    },
    methods: {
      // 获取24小时搜索热词
      _getHotWord() {
        // 声明一个临时数组保存热词数组的值
        let box = []
        console.log(box);
        getHotWord()
        .then(res => {
          console.log(res);
          if(box) {
            box = []
            box = res.data.data
            console.log(box);
            if (box.length > 8) {
              // 只保存前8个
              for (let i = 0; i < 8; i++) {
                this.hotWordList.push(box[i])
              }
            } else {
              this.hotWordList = box
            }
          }
          this.length = res.data.data.length
        })
        .catch(err => {
          console.log(err);
        })
      }, 
      hotWordSearch(item) {
        this.$router.push('./search/' + item)
      },
      // 跳转登录页面
      toLogin() {
        this.$router.push('./login')
      },
      // 跳转注册页面
      toRegister() {
        this.$router.push('./register')
      },
      // 跳转发帖子页面
      toPost() {
        if (this.$store.getters.getLocalStorage !== '') {
          this.$router.push('./post')
        } else {
          this.$message('亲~先登录');
          this.$router.push('./login')
        }
      }
    }
  }
</script>

<style scoped>
  .create {
    flex: 0 0 280px;
  }

  .btn {
    text-align: center;
    padding: 30px 0;
  }

  .hot-search {
    min-height: 420px;
    margin-top: 20px;
  }

  .hot-search .hot-search-title {
    height: 45px;
    font-weight: 700;
    font-size: 15px;
    color: #191c22;
  }

  .hot-search .hot-search-item {
    height: 36px;
    font-size: 14px;
    color: #191C22;
  }

  .hot-search .hot-search-item .hot-index {
    margin-right: 13px;
  }

  li:hover .hot-title{
    color: #409EFF;
  }
</style>
