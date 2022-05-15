<!--
 * @Description: 登录组件
 * @Author: chowyonken
 * @Date: 2022-05-13
 -->
<template>
  <div id="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix title">
        用户登录
      </div>
      <div>
        <el-form ref="ruleForm"
                 :model="ruleForm"
                 status-icon
                 :rules="rules"
                 label-width="100px"
                 class="demo-ruleForm">
          <!-- 邮箱表单域-->
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email"/>
          </el-form-item>
          <!--密码表单域-->
          <el-form-item label="密码" prop="pass">
            <el-input v-model="ruleForm.pass"
                      type="password"
                      autocomplete="off"/>
          </el-form-item>
          <!--记住账号密码-->
          <el-form-item label="记住" prop="delivery">
            <el-switch v-model="ruleForm.rememberMe"></el-switch>
          </el-form-item>
          <!-- 登录，重置 按钮表单域-->
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
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
              min: 6,
              max: 20,
              message: '长度在 6 到 20 个字符',
              trigger: 'blur'
            }
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
              message: '登录成功'
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
    text-align: center;
  }

  #login {
    width: 450px;
    margin: 50px auto;
    border-radius: 10px;
    box-shadow: 0 0 4px #cac6c6;
  }
</style>
