<!--
 * @Description: 个人主页组件
 * @Author: chowyonken
 * @Date: 2022-07-01
 * @update: 2022-07-01
 -->
<template>
  <div id="setup">
    <!--返回主页-->
    <el-card class="back-home" shadow="always">
      <router-link to="/profile">
        <span>
          <i class="el-icon-arrow-left"></i>
          返回个人主页
        </span>
      </router-link>
    </el-card>
    <div class="setup-content">
      <!--导航栏-->
      <el-menu
               class="el-menu-vertical-demo"
               :router="true"
               :default-active="$route.path">
        <!--个人资料-->
        <el-menu-item index="/userInfo">
          <i class="iconfont icon-gerenziliao"></i>
          <span>个人资料</span>
        </el-menu-item>
        <el-menu-item index="/idSet">
          <i class="iconfont icon-zhanghaoshezhi"></i>
          <span>账号设置</span>
        </el-menu-item>
      </el-menu>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

  import UserInfo from '@/views/setup/childComponent/UserInfo'
  import IdSet from '@/views/setup/childComponent/IdSet'

  export default {
    name: "SetUp",
    components: {
      UserInfo,
      IdSet
    }
  }
</script>

<style scoped>
  #setup {
    width: 1225px;
    margin: 0 auto;
  }

  .back-home {
    margin-bottom: 20px;
  }

  .back-home span {
    color: #909090;
    font-size: 14px;
  }

  .back-home a:hover span{
    color: #4b8dc3;
  }

  .setup-content {
    display: flex;
  }

  /deep/ .el-menu-vertical-demo {
    width: 230px;
    height: 400px;
  }

  /deep/ .el-menu-item.is-active {
    background-color: #fff!important;
  }

  .iconfont {
    margin-right: 5px;
  }

  span {
    font-size: 16px;
  }

</style>
