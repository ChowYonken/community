<template>
  <el-card class="content" shadow="always">
    <div class="CardInfo">
      <div class="leftInfo">
        <span>
          <img src="@/assets/img/profile/touxiang.png" alt="">
        </span>
        <div class="leftInfo-Content">
          <div class="title">
            <h2>今天没吃饭</h2>
          </div>
          <span class="tagTitleList">
              <i class="iconfont icon-tubiao_rili"></i>
              <span>加入社区i天</span>
          </span>
        </div>
      </div>
      <!--编辑资料-->
      <div class="rightInfo">
        <el-button type="primary" plain @click="showDialog" class="edit">编辑资料</el-button>
        <!--编辑资料弹窗-->
        <el-dialog title="编辑个人资料" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="头像" :label-width="formLabelWidth">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="iconfont icon-yonghu"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="名称" :label-width="formLabelWidth">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth">
              <el-radio v-model="radio" label="1">男</el-radio>
              <el-radio v-model="radio" label="2">女</el-radio>
            </el-form-item>
            <el-form-item label="所在地" :label-width="formLabelWidth">
              <el-select v-model="form.region" placeholder="请选择所在地">
                <el-option label="北京" value="shanghai"></el-option>
                <el-option label="上海" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: "CardInfoContainer",
    data() {
      return {
        dialogFormVisible: false,
        imageUrl: '',
        radio: '1',
        form: {
          name: ''
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      // 是否显示编辑信息弹窗
      showDialog() {
        this.dialogFormVisible = true
      },
      // 上传头像
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      // 图片格式
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
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

  /deep/ .el-dialog {
    width: 500px;
  }

  /deep/ .el-form-item__label {
    margin-right: 25px!important;
  }

  /deep/ .avatar-uploader .el-upload {
    width: 50px;
    height: 50px;
    border: 1px dashed #d9d9d9;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    line-height: 50px;
  }

  /deep/ .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .iconfont {
    font-size: 30px;
  }

  .icon-tubiao_rili {
    font-size: 18px;
    color: #409EFF;
  }

  /deep/ .el-input {
    width: 200px;
  }
</style>
