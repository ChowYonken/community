<template>
  <el-card class="category" shadow="always">
    <!--标题-->
    <div class="title">话题广场</div>
    <!--类别-->
    <div class="content">
      <ul>
        <li>
          <router-link to="/home">
            <svg class="icon-font">
              <use xlink:href="#icon-shouye1"></use>
            </svg>
            社区首页
          </router-link>
        </li>
        <li>
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
        </li>
      </ul>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: "Category"
  }
</script>

<style scoped>
  li {
    list-style: none;
  }

  .category {
    flex: 0 0 216px;
    margin-right: 10px;
    height: 290px;
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
    /*margin: 20px 10px 0;*/
    /*font-weight: 700;*/
    width: 214px;
    height: 40px;
    color: #2D3137;
    line-height: 40px;
  }

  .content ul li a {
    display: inline-block;
    width: 100%;
    height: 100%;
    padding-left: 20px;
  }

  .content a {
    background-color: #fff;
  }

  .content a:hover {
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

  /deep/ .el-card__body, .el-main {
    padding: 0!important;
  }
</style>
