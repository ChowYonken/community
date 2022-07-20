<template>
  <el-card class="user-setup" shadow="always">
    <div class="title">账号设置</div>
    <div class="content">
      <ul class="setting-list">
        <li>
          <span class="setting-list-title">邮箱</span>
          <div class="input-box">
            <span>{{email}}</span>
          </div>
        </li>
        <li>
          <span class="setting-list-title">最后登录</span>
          <div class="input-box">
            <span>{{lastLogin}}</span>
          </div>
        </li>
        <li>
          <span class="setting-list-title">创建时间</span>
          <div class="input-box">
            <span>{{createTime}}</span>
          </div>
        </li>
        <li>
          <span class="setting-list-title">密码</span>
          <div class="input-box">

          </div>
          <button @click="dialogFormVisible = true" class="reset">重置</button>
          <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
            <el-form :model="form"
                     :rules="rules">
              <el-form-item label="旧密码" prop="oldPwd" :label-width="formLabelWidth">
                <el-input v-model="form.oldPwd" placeholder="请输入旧密码" type="password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="newPwd" :label-width="formLabelWidth">
                <el-input v-model="form.newPwd" placeholder="请输入新密码" type="password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPwd" :label-width="formLabelWidth">
                <el-input v-model="form.checkPwd" placeholder="请再次输入新密码" type="password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="updatePwd" class="ok">确认修改</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </li>
        <li>
          <span class="setting-list-title">账号注销</span>
          <div class="input-box">

          </div>
          <button class="delete">注销</button>
        </li>
      </ul>
    </div>
  </el-card>
</template>

<script>

  import {userInfo, updatePwd} from "@/network/api/userEdit";

  export default {
    name: "IdSet",
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.newPwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        email: '',
        createTime: '',
        lastLogin: '',
        dialogFormVisible: false,
        form: {
          oldPwd: '',
          newPwd: '',
          checkPwd: ''
        },
        formData: new FormData(),
        rules: {
          oldPwd: [
            { required: true, message: '请输入旧密码', trigger: 'blur' },
            {
              min: 6,
              max: 20,
              message: '长度在 6 到 20 个字符',
              trigger: 'blur'
            }
          ],
          newPwd: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
            {
              min: 6,
              max: 20,
              message: '长度在 6 到 20 个字符',
              trigger: 'blur'
            }
          ],
          checkPwd: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            { validator: validatePass, trigger: 'blur' }
          ]
        },
        formLabelWidth: '120px'
      }
    },
    mounted() {
      // 获取用户信息
      userInfo()
      .then(res => {
        this.createTime = res.data.data.createTime
        this.lastLogin = res.data.data.lastLogin
        this.email = res.data.data.email
      })
      .catch(err => {
        console.log(err)
      })
    },
    methods: {
      // 修改密码
      updatePwd() {
        updatePwd(this.form.oldPwd,this.form.newPwd)
        .then(res => {
          console.log(res)
          if(res.data.data === 1) {
            this.$message({
              message: '修改成功，请重新登录',
              type: "success"
            })
            setTimeout(() => {
              this.$store.commit('removeToken');
              this.$router.push('/login');
              // setTimeout(() => {
              //   location.reload()
              // },10)
            },2000)
          } else {
            this.$message({
              message: res.data.message,
              type: 'warning'
            })
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
  .user-setup {
    margin-left: 24px;
    width: calc(100% - 254px);
    height: 555px;
  }

  .user-setup .title {
    border-bottom: 1px solid #f1f1f1;
    /*color: #909090;*/
    font-size: 24px;
    font-weight: 700;
    padding: 0 0 10px 10px;
  }

  .setting-list li {
    display: flex;
    padding: 25px 0 25px 10px ;
    border-bottom: 1px solid #f1f1f1;
  }

  .setting-list .setting-list-title {
    display: inline-block;
    width: 150px;
    color: #333;
    font-size: 14px;
  }

  .setting-list .input-box {
    font-size: 14px;
    color: #909090;
  }

  .reset,
  .delete {
    background-color: transparent;
    border: none;
    font-size: 14px;
    color: #007FFF;
    cursor: pointer;
    margin-left: 730px;
  }

  .ok {
    margin-left: 175px;
    margin-top: 20px;
  }

  div/deep/ .el-dialog {
    width: 500px;
  }

  div/deep/ .el-input {
    width: 280px!important;
  }
</style>
