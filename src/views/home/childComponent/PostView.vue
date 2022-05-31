<template>
  <el-card class="content" shadow="always">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="最新主题" name="latest">
        <!--循环遍历后台的数据-->
        <article>
          <div class="text-list-model">
            <div class="list-item-wrap">
              <div class="list-item">
                <div class="info">
                  <router-link to="/detail">
                    <span class="title">金州勇士，天道酬勤：合计98岁的库里克雷追梦，八年六总决赛</span>
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
<!--        <article>-->
<!--          <div class="list-item">-->
<!--            &lt;!&ndash;内容&ndash;&gt;-->
<!--            <div class="media">-->
<!--              <div class="title">-->
<!--                <p>-->
<!--                  <el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">-->
<!--                    <router-link :to="{path:'detail'}">-->
<!--                      <span>准备辞职，但是又迷茫了。（轨道or水厂）</span>-->
<!--                    </router-link>-->
<!--                  </el-tooltip>-->
<!--                </p>-->
<!--              </div>-->
<!--              <div class="info">-->
<!--                <router-link :to="{path:'detail'}">-->
<!--                  小弟不才，大专文凭，自己水平也清楚。毕业后也算运气好进入广东轨道行业国企上班，-->
<!--                  一年大概到手10w左右，工作也还算轻松，但是远离家乡，这边没亲人朋友，想着回家乡-->
<!--                  工作，家乡有房，生活成本也低一点。于是就报名了当地水务集团自来水厂值班员的工作，-->
<!--                  毕竟有一些设备维护的经验，也就录取我了，体检也过了，本来欢欢喜喜的想着可以回家了，-->
<!--                  昨晚父母打了电话过来说还是要想清楚，毕竟回来了就再也进不去这个单位了。他们也找退休-->
<!--                  职工打听了水厂的工作内容和待遇，具体就是三班倒但也很清闲，没什么上升空间，工作环境-->
<!--                  有水泵的噪音，全厂都是摄像头，不能夜班睡觉，一年到手8w，要我自己想好如何选择。搞得-->
<!--                  我昨晚心乱如麻，今早五点就醒来了，发这个帖子想让大家帮我参考下如何选择，顺便也问问-->
<!--                  有没有干自来水行业的，和我分享一下平时工作内容，这一行到底好不好干。-->
<!--                </router-link>-->
<!--              </div>-->
<!--              <div class="light">-->
<!--                <div>-->
<!--                  <span class="zan">5赞</span>-->
<!--                  <span class="huifu">50回复</span>-->
<!--                </div>-->
<!--                <div class="author">-->
<!--                  作者笔名-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--            &lt;!&ndash;图片&ndash;&gt;-->
<!--            <div class="img">-->
<!--              <router-link :to="{path:'detail'}">-->
<!--                <img src="~/assets/img/img.png" alt="">-->
<!--              </router-link>-->
<!--            </div>-->
<!--          </div>-->
<!--        </article>-->
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

  /*.list-item .media {*/
  /*  width: 475px;*/
  /*  max-height: 116px;*/

  /*  margin-right: 10px;*/
  /*}*/

  /*.list-item .title {*/
  /*  font-weight: 700;*/
  /*  font-size: 18px;*/
  /*  margin-bottom: 5px;*/
  /*}*/

  /*.list-item .info a {*/
  /*  height: 74px;*/
  /*  overflow: hidden;*/
  /*  text-overflow: ellipsis;*/
  /*  display: -webkit-box;*/
  /*  -webkit-line-clamp: 4;*/
  /*  -webkit-box-orient: vertical;*/
  /*}*/

  /*.list-item .light {*/
  /*  display: flex;*/
  /*  margin-top: 6px;*/
  /*  font-size: 12px;*/
  /*  color: #7B7E86;*/
  /*  justify-content:space-between;*/
  /*}*/

  /*.list-item .light .zan {*/
  /*  flex: 1;*/
  /*  display: inline-block;*/
  /*  margin-right: 5px;*/
  /*}*/

  /*.list-item img {*/
  /*  width: 176px;*/
  /*  height: 116px;*/
  /*}*/


</style>
