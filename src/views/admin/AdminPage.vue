<template>
  <div id="admin">
    <div class="content">
      <el-menu 
      default-active="/postManage" 
      class="el-menu-vertical-demo menu"
      :router="true">
        <el-menu-item index="/postManage">
          <span slot="title"><i class="iconfont icon-tieziguanli"></i> 帖子管理</span>
        </el-menu-item>
        <el-menu-item index="/userManage" >
          <span slot="title"><i class="iconfont icon-yonghuguanli" v-show="role === 'admin'"></i> 用户管理</span>
        </el-menu-item>
        <el-menu-item index="/roleManage" >
          <span slot="title"><i class="iconfont icon-jiaoseguanli" v-show="role === 'admin'"></i> 角色管理</span>
        </el-menu-item>
        <el-menu-item index="/sourceManage" >
          <span slot="title"><i class="iconfont icon-ziyuanguanli" v-show="role === 'admin'"></i> 资源管理</span>
        </el-menu-item>
        <el-menu-item index="/topicManage" >
          <span slot="title"><i class="iconfont icon-huatiguanli" v-show="role === 'admin'"></i> 话题管理</span>
        </el-menu-item>
        <el-menu-item index="/dataStats" >
          <span slot="title"><i class="iconfont icon-shujutongji" v-show="role === 'admin'"></i> 数据统计</span>
        </el-menu-item>
      </el-menu>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

  export default {
    name: "AdminPage",
    data() {
      return {
        role: '', // 角色
      }
    },
    created() {
      this.role = localStorage.getItem('role')
    }
  }
</script>

<style scoped>
  .content {
    display: flex;
  }

  .content .menu{
    position: fixed;
    top: 81px;
    left: 0;
    height: 100%;
  }

  div/deep/ .el-menu-vertical-demo {
    width: 180px;
  }

</style>