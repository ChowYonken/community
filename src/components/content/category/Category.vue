<template>
  <el-card class="category" shadow="always">
    <!--标题-->
    <div class="title">话题广场</div>
    <!--类别-->
    <div class="content">
      <ul>
        <li v-for="(item, index) in topicList" @click="topicDetail(item.id)">
          {{item.name}}
        </li>
        <!-- <li>
          <router-link to="/topic">
            <svg class="icon-font">
              <use xlink:href="#icon-yingshi"></use>
            </svg>
            影视圈
          </router-link>
        </li>
        <li>
          <router-link to="/topic">
            <svg class="icon-font">
              <use xlink:href="#icon-yule"></use>
            </svg>
            娱乐圈
          </router-link>
        </li>
        <li>
          <router-link to="/topic">
            <svg class="icon-font">
              <use xlink:href="#icon-yinle"></use>
            </svg>
            音乐圈
          </router-link>
        </li>
        <li>
          <router-link to="/topic">
            <svg class="icon-font">
              <use xlink:href="#icon-zongyi"></use>
            </svg>
            综艺圈
          </router-link>
        </li> -->
      </ul>
    </div>
  </el-card>
</template>

<script>

  import {getTopic} from "@/network/api/topic"

  export default {
    name: "Category",
    data() {
      return {
        topicList: [] // 话题列表
      }
    },
    created() {
      this._getTopic()
    },
    methods: {
      // 获取话题列表
      _getTopic() {
        getTopic()
        .then(res => {
          console.log(res);
          this.topicList = res.data.data
        })
        .catch(err => {
          console.log(err);
        })
      },
      // 话题详情
      topicDetail(topicId) {
        this.$router.push('/topic/' + topicId)
      }
    }
  }
</script>

<style scoped>
  li {
    list-style: none;
  }

  .category {
    flex: 0 0 216px;
    margin-right: 10px;
    min-height: 290px;
  }

  .category .title {
    text-align: center;
    font-size: 14px;
    font-weight: 700;
    padding: 20px 0;
    border-bottom: 1px solid #e3e3e4;
  }

  .content ul {
    margin-top: 20px;
  }

  .content ul li {
    width: 214px;
    height: 40px;
    color: #2D3137;
    line-height: 40px;
    padding-left: 80px;
  }

  /* .content ul li a {
    display: inline-block;
    width: 100%;
    height: 100%;
    padding-left: 45px;
  } */

  .content li {
    background-color: #fff;
  }

  .content li:hover {
    color: #409EFF;
    background-color: #ecf5ff;
  }

  .icon-font {
    width: 1em;
    height: 1em;
    fill: currentColor;
    overflow: hidden;
    vertical-align: -2px;
  }

  div/deep/ .el-card__body, .el-main {
    padding: 0!important;
  }
</style>
