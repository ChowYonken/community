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
        <el-button type="primary" plain @click="toSetup()" class="edit" v-if="this.uid === this.id">编辑资料</el-button>
        <el-button type="success" plain @click="_clickFollow()" class="fllow" v-else>关注</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>

  import {userInfo} from "@/network/api/userEdit";
  import {clickFollow, getUserInfo} from "@/network/api/user";

  export default {
    name: "CardInfoContainer",
    data() {
      return {
        default_img: require("@/assets/img/defaultImg.jpg"), // 默认头像
        dialogImageUrl: '',
        name: '',
        joinDay: '', // 加入社区天数
        createTime: '', // 用户创建日期
        uid: '', // 获取登录用户id
        id: '', // 获取当前页面用户id
        entityType: 1, // 实体类型：1-用户；2-话题 
      }
    },
    created() {
      // 获取用户信息和当前登录用户的信息
      this._getUserInfo()
      // 获取url的id
      this.id = Number(this.$route.params.id)
    },
    watch: {
      //监听相同路由下参数变化的时候，从而实现异步刷新
      '$route' (to, from) {
        // 保存本帖子的id
        this.id = Number(this.$route.params.id)    
        if(this.id) {
          // 获取用户信息和当前登录用户的信息
          this._getUserInfo()
        }
      }
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
      // 获取用户信息和当前登录用户的信息
      async _getUserInfo() {
        await userInfo()
        .then(res => {
          let data = res.data.data
          this.uid = data.id
        })
        .catch(err => {
          console.log(err)
        });
        await getUserInfo(this.id)
        .then(res => {
          let data = res.data.data
          this.dialogImageUrl = data.avatar
          this.name = data.nickname
          let time = data.createTime
          // 将获取的时间改为 yyyy-mm-dd 格式
          let appointDate = /\d{4}-\d{1,2}-\d{1,2}/g.exec(time)[0];
          this.joinDay = appointDate
        })
        .catch(err => {
          console.log(err);
        })
      },
      // 关注用户
      _clickFollow() {
        const formData = new FormData()
        formData.append("entityType", this.entityType)
        formData.append("entityId", this.id)
        clickFollow(formData)
        .then(res => {
          console.log(res);
          this.$message({
            message: '关注成功',
            type: 'success'
          })
        })
        .catch(err => {
          console.log(err);
        })
      }
    }
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

  .edit,
  .fllow {
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
