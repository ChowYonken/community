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
                action="http://192.168.149.198:8090/upload/image"
                :headers="config"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                @click.native="updateImage"
                name="image">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="iconfont icon-yonghu"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="名称" :label-width="formLabelWidth">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth">
              <el-radio v-model="form.radio" label="1">男</el-radio>
              <el-radio v-model="form.radio" label="2">女</el-radio>
            </el-form-item>
            <el-form-item label="所在地" :label-width="formLabelWidth">
              <el-select v-model="form.region" placeholder="请选择所在地">
                <el-option label="北京" value="shanghai"></el-option>
                <el-option label="上海" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="removeImage">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </el-card>
</template>

<script>

  import {deleteImg} from '@/network/api/userEdit'

  export default {
    name: "CardInfoContainer",
    data() {
      return {
        token: '',
        dialogFormVisible: false,
        imageUrl: '', //保存图片地址
        imageName: '',  //保存图片的名字
        form: {
          dialogImageUrl: '',
          name: '',
          radio: '1',
          region: ''
        },
        formLabelWidth: '120px'
      }
    },
    mounted() {
      // 获取token
      this.token = this.$store.getters.getLocalStorage
    },
    methods: {
      // 是否显示编辑信息弹窗
      showDialog() {
        this.dialogFormVisible = true
      },
      // 上传头像
      handleAvatarSuccess(res, file) {
        console.log(res)
        if(this.imageUrl === '' || this.imageUrl === null) {
          // 将后端发送的地址赋值到我们需要显示的img中的src动态绑定的参数中
          this.imageUrl = res.data
          // 将图片地址绑定到我们的form表单数据中 后期存入数据库中
          this.form.dialogImageUrl = res.data
          // 将图片的名称截取并保存到imageName中(截取url地址最后一个斜杠后面的图片名称)
          let url = res.data
          let index = url.lastIndexOf("\/")
          this.imageName = url.substring(index + 1,url.length)
        }else {
        }
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
      },
      // 点击取消保存时，将图片在七牛云删除
      removeImage() {
        deleteImg(this.imageName)
        .then(res => {
          console.log(res)
          this.dialogFormVisible = false
          // 删除后将储存图片的data设置为空
          this.imageName = ''
          this.imageUrl = ''
          this.form.dialogImageUrl = ''
        })
        .catch(err => {
          console.log(err)
        })
      },
      // 修改头像时，将上一张图片删除
      updateImage() {
        deleteImg(this.imageName)
          .then(res => {
            // 删除后将储存图片的data设置为空
            this.imageName = ''
            this.imageUrl = ''
            this.form.dialogImageUrl = ''
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    computed: {
      // 将token作为请求头
      config() {
        return {
          'Authorization': 'Bearer ' + this.token
        }
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

  /deep/ .avatar-uploader .el-upload img {
    width: 100%;
    height: 100%;
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
