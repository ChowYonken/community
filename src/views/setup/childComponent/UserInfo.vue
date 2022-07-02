<template>
  <el-card class="user-setup" shadow="always">
    <div class="title">个人资料</div>
    <div class="content">
      <el-form :model="form">
        <el-form-item label="头像" prop="dialogImageUrl" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="http://192.168.149.198:8090/upload/image"
            :headers="config"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            @click.native="updateImage"
            name="image">
            <img v-if="form.dialogImageUrl" :src="form.dialogImageUrl" class="avatar">
            <i v-else class="iconfont icon-yonghu"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="用户名" prop="name" :label-width="formLabelWidth" placeholder="请输入你的用户名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        <el-form-item label="性别" prop="radio" :label-width="formLabelWidth">
          <el-radio v-model="form.radio" :label="0">男</el-radio>
          <el-radio v-model="form.radio" :label="1">女</el-radio>
        </el-form-item>
        <el-form-item label="所在地" prop="selectedOptions" :label-width="formLabelWidth">
          <el-cascader size="large"
                       :options="options"
                       v-model="form.selectedOptions"
                       @change="handleChange">
          </el-cascader>
        </el-form-item>
      </el-form>
      <div class="btn">
        <el-button @click="removeImage">取 消</el-button>
        <el-button type="primary" @click="confirmUser">保 存</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>

  import {deleteImg} from '@/network/api/userEdit'
  import {editUser, userInfo} from "@/network/api/userEdit";
  import { CodeToText, regionData, TextToCode } from 'element-china-area-data' //导入地图数据

  export default {
    name: "userInfo",
    data() {
      return {
        token: '',
        default_img: require("@/assets/img/defaultImg.jpg"), // 默认头像
        imageUrl: '', //保存图片地址
        imageName: '',  //保存图片的名字
        form: {
          dialogImageUrl: '',
          name: '',
          radio: '',
          selectedOptions: [],
          address: '',
          province: '',
          city: '',
          area: ''
        },
        formLabelWidth: '120px',
        options: regionData
      }
    },
    mounted() {
      // 获取token
      this.token = this.$store.getters.getLocalStorage
      // 获取用户信息
      userInfo()
        .then(res => {
          this.form.selectedOptions = []
          this.form.dialogImageUrl = res.data.data.avatar
          this.form.name = res.data.data.nickname
          this.form.radio = res.data.data.sex
          this.form.address = res.data.data.location
          let address = res.data.data.location.split('/')
          this.form.selectedOptions.push(TextToCode[address[0]].code,TextToCode[address[0]][address[1]].code,TextToCode[address[0]][address[1]][address[2]].code)
        })
        .catch(err => {
          console.log(err)
        })
    },
    methods: {
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
      },
      // 获取省市区级联数据
      handleChange (value) {
        console.log(value)
        //因为上边选择好城市之后打印出来的是编码，这里是将编码转换为文字
        let province = CodeToText[this.form.selectedOptions[0]] //省
        let city = CodeToText[this.form.selectedOptions[1]] //市
        let area = CodeToText[this.form.selectedOptions[2]] //区
        // if (city == '市辖区') {//选择北京市的话，第二个选项为输入框
        //   city = province //这里根据后台需求，给它赋值，我这里是如果为市辖区，城市和省名字保持一致
        // }
        let dz = province + '/' + city + '/' + area
        this.form.address = dz
      },
      // 编辑个人信息
      confirmUser() {
        this.dialogFormVisible = false
        editUser(this.form.name,this.form.radio,this.form.address,this.form.dialogImageUrl)
          .then(res => {
            location.reload();
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
  .user-setup {
    margin-left: 24px;
    width: calc(100% - 254px);
  }

  .user-setup .title {
    border-bottom: 1px solid #f1f1f1;
    font-size: 24px;
    font-weight: 700;
    padding: 0 0 10px 10px;
  }

  .user-setup .content {
    margin-top: 30px;
  }

  .content .btn {
    margin: 60px 0 0 200px;
  }

  /deep/ el-form {
    display: flex!important;
  }

  /deep/ .avatar-uploader .el-upload {
    width: 51px;
    height: 51px;
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

  /deep/ .el-input {
    width: 400px;
  }

  /deep/ .el-form-item__label {
    padding: 0 20px 0 0;
  }

  /deep/ .el-form-item {
    margin-bottom: 45px;
  }
</style>
