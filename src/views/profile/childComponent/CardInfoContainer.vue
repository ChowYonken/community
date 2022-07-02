<template>
  <el-card class="content" shadow="always">
    <div class="CardInfo">
      <div class="leftInfo">
        <span>
          <img :src="dialogImageUrl ? dialogImageUrl : default_img" alt="">
        </span>
        <div class="leftInfo-Content">
          <div class="title">
            <h2>{{name}}</h2>
          </div>
          <span class="tagTitleList">
              <i class="iconfont icon-tubiao_rili"></i>
              <span>加入社区i天</span>
          </span>
        </div>
      </div>
      <!--编辑资料-->
      <div class="rightInfo">
        <el-button type="primary" plain @click="toSetup" class="edit">编辑资料</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>

  import {userInfo} from "@/network/api/userEdit";

  export default {
    name: "CardInfoContainer",
    data() {
      return {
        default_img: require("@/assets/img/defaultImg.jpg"), // 默认头像
        dialogImageUrl: '',
        name: ''
      }
    },
    mounted() {
      // 获取用户信息
      userInfo()
        .then(res => {
          // this.form.selectedOptions = []
          this.dialogImageUrl = res.data.data.avatar
          this.name = res.data.data.nickname
        })
        .catch(err => {
          console.log(err)
        })
    },
    methods: {
      // 点击编辑跳转账号设置页面
      toSetup() {
        this.$router.push('/setup')
      },
    },
  }
</script>

<style scoped>
  /deep/ .el-card__body, .el-main {
    padding: 0;
  }

  .CardInfo {
    display: flex;
    width: 1225px;
    padding: 20px;
  }

  .leftInfo {
    display: flex;
  }

  .leftInfo img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }

  .leftInfo-Content {
    width: 800px;
    margin-left: 24px;
  }

  .leftInfo-Content .title h2 {
    display: inline-block;
    margin: 30px 0 10px;
    line-height: 30px;
    font-size: 22px;
    font-weight: 400;
    font-family: PingFangSC-Semibold,PingFang SC;
    color: #191c22;
  }

  .leftInfo .tagTitleList span {
    display: inline-block;
    font-size: 14px;
    margin-left: 5px;
  }

  .edit{
    margin: 90px 0 0 130px;
  }

  .iconfont {
    font-size: 30px;
  }

  .icon-tubiao_rili {
    font-size: 18px;
    color: #409EFF;
  }
</style>
