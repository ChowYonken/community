<template>
  <el-container>
    <el-header>
      <el-menu :default-active="activeIndex"
               class="el-menu-demo"
               mode="horizontal"
               @select="handleSelect"
               active-text-color="#9393FF">
        <el-menu-item index="1" class="first-page">alibb社区</el-menu-item>
        <el-menu-item class="search">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
              <el-input v-model="formInline.user" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </el-menu-item>

      </el-menu>
    </el-header>
  </el-container>

</template>

<script>
  export default {
    name: "MainTabBar",
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        input: '',
        formInline: {
          user: '',
          region: ''
        }
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style scoped>
  ul {
    float: left;
    text-align: center;
  }

  ul .first-page {
  }

  ul .search {
    margin-left: 20px;
  }

  .el-input.is-active .el-input__inner, .el-input__inner:focus {
    border-color: #9393FF!important;
    outline: 0!important;
  }

  .el-button--primary {
    margin-left: 20px;
    height: 40px;
    color: #FFF;
    background-color: #9393FF;
    border-color: #9393FF;
  }

  .el-menu.el-menu--horizontal {
    border: none;
  }

</style>