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
              <span>加入社区{{dateDiff}}天</span>
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
  import {getFollowNum} from "@/network/api/user";

  export default {
    name: "CardInfoContainer",
    data() {
      return {
        default_img: require("@/assets/img/defaultImg.jpg"), // 默认头像
        dialogImageUrl: '',
        name: '',
        joinDay: '', // 加入社区天数
        createTime: '', // 用户创建日期
        uid: '' // 获取用户id
      }
    },
    created() {
      // 获取用户信息
      this.getUserInfo()
      // 获取用户关注人数
      this._getFollowNum(this.uid)
    },
    computed: {
      // 计算日期天数
      dateDiff() {
			 	var date2 = new Date();
			 	var date1 = new Date(Date.parse(this.joinDay.replace(/-/g,   "/")));
			 	var iDays = parseInt(Math.abs(date2.getTime()- date1.getTime()) /1000/60/60/24); 
			 	return iDays;
			 },
    },
    methods: {
      // 点击编辑跳转账号设置页面
      toSetup() {
        this.$router.push('/setup')
      },
      getUserInfo() {
        let that = this
        // 获取用户信息
        userInfo()
          .then(res => {
            console.log(res);
            // this.form.selectedOptions = []
            let data = res.data.data
            this.dialogImageUrl = data.avatar
            this.name = data.nickname
            this.uid = data.id
            let time = data.createTime
            // 将获取的时间改为 yyyy-mm-dd 格式
            let appointDate = /\d{4}-\d{1,2}-\d{1,2}/g.exec(time)[0];
            that.joinDay = appointDate
          })
          .catch(err => {
            console.log(err)
          })
      },
      // 获取用户关注总人数
      _getFollowNum(uid) {
        getFollowNum(uid)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
      }
    },
  }
</script>

<style scoped>
  div/deep/ .el-card__body, .el-main {
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
