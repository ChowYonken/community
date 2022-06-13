<!--
 * @Description: 登录组件
 * @Author: chowyonken
 * @Date: 2022-05-13
 -->
<template>
  <div id="login">
    <div class="bgc_img">
      <img src="@/assets/img/login_bg.svg" alt="">
    </div>
    <el-card class="box-card">
      <div slot="header" class="clearfix title">
        社区用户登录
      </div>
      <div>
        <el-form ref="ruleForm"
                 :model="ruleForm"
                 status-icon
                 :rules="rules"
                 label-width="100px"
                 class="demo-ruleForm">
          <!-- 邮箱表单域-->
          <el-form-item prop="email">
            <el-input v-model="ruleForm.email" placeholder="请输入邮箱"/>
          </el-form-item>
          <!--密码表单域-->
          <el-form-item prop="pass">
            <el-input v-model="ruleForm.pass"
                      type="password"
                      autocomplete="off"
                      placeholder="请输入密码"/>
          </el-form-item>
          <!-- 登录，重置 按钮表单域-->
          <el-form-item>
            <el-button type="primary" @click="login">立即登录</el-button>
          </el-form-item>
          <el-form-item>
            <div class="last">
              <span class="register">
                <router-link :to="{path: '/register'}">注册</router-link>
              </span>
              <span class="forget">忘记密码</span>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>

  import {LoginPostData} from '@/network/api/login';

  export default {
    name: "Login",
    data() {
      return {
        // 表单数据对象
        ruleForm: {
          email: '',
          pass: '',
        },
        rules: {
          email: [
            // required 是否必填
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            {
              type: 'email',
              message: '请输入正确的邮箱地址',
              trigger: ['blur', 'change']
            }
          ],
          pass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            {
              min: 2,
              max: 20,
              message: '长度在 6 到 20 个字符',
              trigger: 'blur'
            }
          ]
        },
        userToken: '', // 用于存储从后台获取的token
      }
    },
    methods: {
      // 登录点击事件
      login() {
        // 登录接口
        LoginPostData(this.ruleForm.email,this.ruleForm.pass)
        .then((res) => {
          console.log(res)
          // 将token存到userToken中
          this.userToken = res.data.data
          this.$store.commit('setToken', this.userToken);
          // 将token本地存储到回话中
          this.$router.push('/home')
          this.$message({
            message: '恭喜你，登录成功',
            type: 'success'
          });
        })
        .catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>
  #login {
    display: flex;
    min-width: 1225px;
  }

  #login .bgc_img {
    min-width: 767px;
    min-height: 592px;
    margin-left: 130px;
  }

  .title {
    text-align: center;
    font-weight: 700;
    font-size: 18px;
  }

  .box-card {
    /*flex: 450px 288px 1;*/
    min-width: 400px;
    margin: 100px 100px auto;
    border-radius: 10px;
    box-shadow: 0 0 4px #cac6c6;
  }

  .last {
    float: right;
    color: #606266;
  }

  .last .register {
    display: inline-block;
    padding-right: 15px;
  }

  /deep/ .el-form-item .el-form-item__content {
    margin: 0 25px!important;
  }
  /deep/ .el-form-item .el-form-item__content .el-button--primary {
    width: 308px;
  }
</style>
