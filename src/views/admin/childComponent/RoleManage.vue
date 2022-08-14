<template>
  <div id="role-manage">
    <el-card class="box-card" shadow="never">
      <span><i class="iconfont icon-yuanshuju-liebiaoshitu"></i> 数据列表</span>
      <el-button type="primary" plain class="add" @click="handleAdd">添加</el-button>
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
        prop="name"
        label="角色名称"
        width="250"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="添加时间"
        align="center"
        width="160"
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
          @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button
          size="mini"
          @click="handleResource(scope.row)" class="resBtn">分配资源</el-button>
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
      :title="isEdit?'编辑资源':'添加资源'"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form
        :model="role"
        label-width="150px" 
        size="small"> 
        <el-form-item label="角色名称：">
          <el-input v-model="role.name" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="角色描述：">
          <el-input v-model="role.description" style="width: 250px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

  import {getRolePage, deleteRole, addRole, editRole, updateRole} from "@/network/api/role"
  import {formatDate} from "@/common/utils"

  const defaultRole = {
    id: null,
    name: null,
    description: null
  }

  export default {
    name: "RoleManage",
    data() {
      return {
        tableData: [],
        currentPage: 1, // 当前页面
        size: 5, // 每页显示条数
        total: null, // 帖子总数
        role: Object.assign({}, defaultRole),
        dialogVisible: false,
        isEdit: false, // 判断添加还是编辑 默认添加
      }
    },
    created() {
      this._getRolePage(this.currentPage, this.size)
    },
    methods: {
      _getRolePage(currentPage, size) {
        getRolePage(currentPage, size)
        .then(res => {
          this.tableData = res.data.data.roleList
          this.total = res.data.data.total
        })
        .catch(err => {
          console.log(err);
        })
      },
      // 删除角色网络请求
      _deleteRole(id) {
        deleteRole(id)
        .then(res => {
          this._getRolePage(this.currentPage, this.size)
          if (res.data.data === 1) {
            this.$message({
              type: "success",
              message: "成功删除角色"
            })
          } else {
            this.$message.error('删除失败，请重试');
          }
        })
        .catch(err => {
          console.log(err);
        })
      },
      // 确定上传
      handleDialogConfirm() {
        // 编辑
        if (this.isEdit) {
          editRole(this.role.id, this.role.name, this.role.description)
          .then(res => {
            this.dialogVisible = false
            this._getRolePage(this.currentPage, this.size)
            if (res.data.status === 100) {
              this.$message({
                type: "success",
                message: "修改成功"
              })
            } else {
              this.$message.error('修改失败，请重试');
            }
          })
        } else {    // 添加
          addRole(this.role.name, this.role.description)
          .then(res => {
            this.dialogVisible = false
            this._getRolePage(this.currentPage, this.size)
            if (res.data.data === 1) {
              this.$message({
                type: "success",
                message: "添加成功"
              })
            } else {
              this.$message.error('添加失败，请重试');
            }
          })
        }
      },
      // 改变状态
      clickStatus(row) {
        let status = null
        const formData = new FormData()
        if (!row.status) {
          // 停用
          status = 0
          formData.append("status", status)
        } else {
          status = 1
          formData.append("status", status)
        }
        updateRole(row.id, formData)
        .then(res => {
          console.log(res);
          if (res.data.data === 1) {
            this.$message({
              type: "success",
              message: "操作成功"
            })
          } else {
            this.$message.error('操作失败，请重试');
          }
        }) 
        .catch(err => {
          console.log(err);
        })
      },
      // 点击删除
      handleDelete(row) {
        this._deleteRole(row.id)
      },
      // 点击添加
      handleAdd() {
        this.dialogVisible = true
        this.isEdit = false
        this.role = Object.assign({}, defaultRole)
      },
      // 点击编辑
      handleUpdate(row) {
        this.dialogVisible = true
        this.isEdit = true
        this.role = Object.assign({}, row)
      },
      // 点击分配资源
      handleResource(row) {
        this.$router.push("/resourceList/" + row.id)
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
      // 改变页面大小
      handleSizeChange() {
        this.size = val
        this._getRolePage(this.currentPage, this.size)
      },
      // 改变当前页码
      handleCurrentChange() {
        this._getRolePage(val, this.size)
      }
    }  
  }
</script>

<style scoped>
  #role-manage {
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

  .resBtn {
    margin-top: 5px;
  }

  div/deep/ .el-pagination {
    float: right;
    margin-top: 15px;
  }
</style>