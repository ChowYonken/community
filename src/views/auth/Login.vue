<!--
 * @Description: 登录组件
 * @Author: chowyonken
 * @Date: 2022-06-24
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
              <span class="forget" @click="dialogFormVisible = true">
                <a href="javascript:;">忘记密码</a>
              </span>
              <!--重置密码弹框-->
              <el-dialog title="重置密码" :visible.sync="dialogFormVisible">
                <el-form ref="form"
                         :model="form"
                         :rules="rules">
                  <el-form-item prop="email">
                    <el-input v-model="form.email"class="email-input" placeholder="请输入邮箱"></el-input>
                  </el-form-item>
                  <el-form-item prop="oldPwd">
                    <el-input v-model="form.oldPwd" class="email-input" placeholder="请输入旧密码"></el-input>
                  </el-form-item>
                  <el-form-item prop="newPwd">
                    <el-input v-model="form.newPwd" class="email-input" placeholder="请输入新密码"></el-input>
                  </el-form-item>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                  </div>
                </el-form>
              </el-dialog>
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
        dialogFormVisible: false,
        // 重置密码表单数据对象
        form: {
          email: '',
          oldPwd: '',
          newPwd: ''
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      // 登录点击事件
      login() {
        // 登录接口
        LoginPostData(this.ruleForm.email,this.ruleForm.pass)
        .then((res) => {
          console.log(res)
          if(res.data.status === 100) {
            // 将token存到userToken中
            this.userToken = res.data.data
            // 将token本地存储到回话中
            this.$store.commit('setToken', this.userToken);
            this.$router.push('/')
            this.$message({
              message: '恭喜你，登录成功',
              type: 'success'
            });
            setTimeout(() => {
              location.reload()
            }, 500)
          } else {
            this.$message.error("账号或密码错误，请重新输入");
          }
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

  a:hover {
    color: #526ECC;
  }

  /deep/ .el-form-item .el-form-item__content {
    margin: 0 25px!important;
  }
  /deep/ .el-form-item .el-form-item__content .el-button--primary {
    width: 308px;
  }

  /*重置密码弹窗*/
  /deep/ .el-dialog {
    width: 475px;
  }

  .email-input {
    margin-bottom: 20px;
  }

</style>
