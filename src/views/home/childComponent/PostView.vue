<template>
  <el-card class="content" shadow="always">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="最新主题" name="latest">
        <!--循环遍历后台的数据-->
        <article>
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
            <div class="list-item-wrap">
              <div class="list-item">
                <div class="info">
                  <router-link to="/detail">
                    <span class="title">金州勇士，天道酬勤：合计98岁的库里克雷追梦，八年六总决赛111111111111111111</span>
                  </router-link>
                  <span>50赞</span>
                  <span>744回复</span>
                </div>
                <div class="lable">
                  <router-link to="/topic">
                    <span>娱乐圈</span>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </article>
      </el-tab-pane>
      <el-tab-pane label="最热主题" name="hot">
        <article>
          <div class="text-list-model">
            <div class="list-item-wrap">
              <div class="list-item">
                <div class="info">
                  <router-link to="/detail">
                    <span class="title">威金斯：我感觉到有点儿累，但比赛所释放的肾上腺素帮助我度过难关</span>
                  </router-link>
                  <span>50赞</span>
                  <span>744回复</span>
                </div>
                <div class="lable">
                  <router-link to="/topic">
                    <span>娱乐圈</span>
                  </router-link>
                </div>
              </div>
            </div>
            <div class="list-item-wrap">
              <div class="list-item">
                <div class="info">
                  <router-link to="/detail">
                    <span class="title">金州勇士，天道酬勤：合计98岁的库里克雷追梦，八年六总决赛111111111111111111</span>
                  </router-link>
                  <span>50赞</span>
                  <span>744回复</span>
                </div>
                <div class="lable">
                  <router-link to="/topic">
                    <span>娱乐圈</span>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </article>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
  export default {
    name: "PostView",
    data() {
      return {
        activeName: 'latest'
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>

<style scoped>
  .content {
    flex: 0 0 708px;
    margin-right: 10px;
  }

  /deep/ .el-tabs__item {
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
</style>
