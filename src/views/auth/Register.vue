<!--
 * @Description: 注册组件
 * @Author: chowyonken
 * @Date: 2022-05-13
 -->
<template>
  <div id="register">
    <div class="bgc_img">
      <img src="@/assets/img/register_bg.svg" alt="">
    </div>
    <el-card class="box-card">
      <div slot="header" class="clearfix title">
        <span>新用户入驻</span>
        <div class="to-login">
          <span>已有账号，</span>
          <span class="login">
            <router-link :to="{path: '/login'}">去登录</router-link>
          </span>
        </div>
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
          <!-- 密码表单域-->
          <el-form-item prop="pass">
            <el-input v-model="ruleForm.pass"
                      type="password"
                      autocomplete="off"
                      placeholder="请输入密码"/>
          </el-form-item>
          <!-- 确认密码表单域-->
          <el-form-item prop="checkPass">
            <el-input v-model="ruleForm.checkPass"
                      type="password"
                      autocomplete="off"
                      placeholder="请再次输入密码"/>
          </el-form-item>
          <!-- 注册，重置 按钮表单域-->
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
<!--            <el-button @click="resetForm('ruleForm')">重置</el-button>-->
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "Register",
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        // 表单数据对象
        ruleForm: {
          email: '',
          pass: '',
          checkPass:''
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
              min: 6,
              max: 20,
              message: '长度在 6 到 20 个字符',
              trigger: 'blur'
            }
          ],
          checkPass: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            { validator: validatePass, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      // 注册的点击事件
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$message({
              type: "success",
              message: '注册成功'
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 重置的点击事件
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style scoped>
  .title {
    /*text-align: center;*/
    font-weight: 700;
    font-size: 18px;
  }

  .title .to-login {
    float: right;
    font-size: 14px;
    font-weight: 400;
  }

  .login a {
    color: #526ECC;
  }

  #register {
    display: flex;
  }

  #register .bgc_img {
    width: 50%;
    margin-left: 130px;
  }

  .box-card {
    width: 400px;
    margin: 100px 100px auto;
    border-radius: 10px;
    box-shadow: 0 0 4px #cac6c6;
  }

  /deep/ .el-form-item .el-form-item__content {
    margin: 0 25px!important;
  }
  /deep/ .el-form-item .el-form-item__content .el-button--primary {
    width: 308px;
  }
</style>
