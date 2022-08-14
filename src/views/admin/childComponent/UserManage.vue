<template>
  <div id="user-manage">
    <el-card class="box-card" shadow="never">
      <span><i class="iconfont icon-yuanshuju-liebiaoshitu"></i> 数据列表</span>
    </el-card>
    <!-- 数据列表 -->
    <el-table
      :data="tableData"
      border
      style="width: 96%">
      <el-table-column
        prop="id"
        label="编号"
        width="80"
        align="center">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="160"
        align="center" 
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="用户名称"
        width="160"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        width="80"
        align="center"
        :formatter="sexFormat">
      </el-table-column>
      <el-table-column
        prop="location"
        label="地址"
        width="180"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column 
        prop="avatar" 
        label="头像"  
        align="center">
        <!-- 图片的显示 -->
        <template slot-scope="scope">            
          <el-image style="width: 50px; height: 50px" :src="scope.row.avatar" :preview-src-list="[scope.row.avatar]"></el-image>
        </template>         
      </el-table-column> 
      <el-table-column
        prop="createTime"
        label="注册时间"
        width="180"
        align="center"
        :formatter="dateFormat">
      </el-table-column>
      <el-table-column
        prop="lastLogin"
        label="最后登录"
        width="160"
        align="center"
        :formatter="dateFormat">
      </el-table-column>
      <el-table-column
        label="是否启用" 
        width="100" 
        align="center">
        <template slot-scope="scope">
          <el-switch
            :active-value=1
            :inactive-value=0
            v-model.number="scope.row.status"
            active-color="#409eff"
            @change="clickStatus(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="200">
        <template slot-scope="scope">
          <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)">删除</el-button>   
          <el-button
          size="mini"
          @click="handleRole(scope.row)" class="roleBtn">分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- 弹窗 -->
    <el-dialog
      title="分配角色"
      :visible.sync="dialogVisible"
      width="30%">
      <el-select v-model="allocRoleIds" multiple placeholder="请选择" size="small" style="width: 80%">
        <el-option
          v-for="item in allRoleList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleAllocDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
 
  import {getUserPage, giveUserRole, getRole} from "@/network/api/user"
  import {getRolePage} from "@/network/api/role"
  import {formatDate} from "@/common/utils"

  export default {
    name: "userManage",
    data() {
      return {
        tableData: [],
        currentPage: 1, // 当前页面
        size: 5, // 每页显示条数
        total: null, // 帖子总数
        dialogVisible: false,
        allocRoleIds: [], // 选择的id
        allRoleList: [], // 保存全部角色
        allocAdminId: null, // 保存当前用户的id
      }
    },
    created() {
      this._getUserPage(this.currentPage, this.size)
    },
    methods: {
      // 分页获取用户详情
      _getUserPage(currentPage, size) {
        getUserPage(currentPage, size)
        .then(res => {
          this.tableData = res.data.data.userList
          this.total = res.data.data.total
        })
        .catch(err => {
          console.log(err);
        })
      },
      // 获取角色列表
      _getRolePage() {
        getRolePage()
        .then(res => {
          this.allRoleList = res.data.data.roleList
        })
        .catch(err => {
          console.log(err);
        })
      },
      // 获取用户拥有的角色
      _getRole(userId) {
        getRole(userId)
        .then(res => {
          // 声明一个数组装用户拥有的角色
          let allocRoleList = res.data.data
          // 将原来有的设为空
          this.allocRoleIds=[];
          // 遍历新数组并将内容复制到this.allocRoleIds
          if(allocRoleList!=null&&allocRoleList.length>0){
            for(let i=0;i<allocRoleList.length;i++){
              this.allocRoleIds.push(allocRoleList[i].id);
            }
          }
        })
        .catch(err => {
          console.log(err);
        })
      },
      // 性别格式化
      sexFormat(row) {
        if (row.sex == 1) {
          return "女";
        } else if(row.sex == 0){
          return "男";
        }
      },
      // 时间戳格式转换
      dateFormat(row, column) {
        if (row[column.property] !== null) {
          const date = new Date(row[column.property])
          return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
        } else {
          return
        }
      },
      // 确认分配角色
      handleAllocDialogConfirm() {
        const formData = new FormData()
        formData.append("userId", this.allocAdminId)
        formData.append("roleIds", this.allocRoleIds)
        if (this.allocRoleIds.length !== 0) {
          giveUserRole(formData)
          .then(res => {
            console.log(res);
            this.dialogVisible = false
            if (res.data.status === 100) {
              this.$message({
                type: "success",
                message: "分配成功"
              })
            } else {
              this.$message.error('分配失败，请重试');
            }
          })
          .catch(err => {
            console.log(err);
          })
        }
      },
      // 点击分配角色
      handleRole(row) {
        this.allocAdminId = row.id
        this.dialogVisible = true
        this._getRolePage()
        // 获取用户拥有的角色
        this._getRole(row.id)
      },
      // 改变页面大小
      handleSizeChange() {
        this.size = val
        this._getUserPage(this.currentPage, this.size)
      },
      // 改变当前页码
      handleCurrentChange() {
        this._getUserPage(val, this.size)
      }
    }  
  }
</script>

<style scoped>
  #user-manage {
    width: 1360px;
  }

  .box-card {
    width: 1306px;
    margin: -25px 0 15px 195px;
  }

  .el-table {
    margin-left: 195px;
  }

  .add {
    float: right;
    padding: 6px 5px;
  }

  div/deep/ .el-pagination {
    float: right;
    margin-top: 15px;
  }
</style>