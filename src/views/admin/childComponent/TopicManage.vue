<template>
  <div id="topic-manage">
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
        label="话题名称"
        width="150"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="summary"
        label="简介"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="160"
        align="center"
        :formatter="dateFormat">
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
          @click="handleUpdate(scope.row)">修改</el-button>
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
      :title="isEdit?'编辑用户':'添加用户'"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form
        :model="topic"
        label-width="150px" 
        size="small"> 
        <el-form-item label="话题名称：">
          <el-input v-model="topic.name" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="话题简介：">
          <el-input v-model="topic.summary" style="width: 250px"></el-input>
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

  import {getTopicPageList, deleteTopic, addTopic, updateTopic} from "@/network/api/topic"
  import {formatDate} from "@/common/utils"

  // 默认值为空的对象
  const defaultTopic = {
    id: null,
    name: null,
    summary: null
  }

  export default {
    name: "TopicManage",
    data() {
      return {
        tableData: [],
        currentPage: 1, // 当前页面
        size: 5, // 每页显示条数
        total: null, // 帖子总数
        topic: Object.assign({}, defaultTopic),
        dialogVisible: false,
        isEdit: false, // 判断添加还是编辑 默认添加
      }
    },
    created() {
      this._getTopicPageList(this.currentPage, this.size)
    },
    methods: {
      // 获取话题列表
      _getTopicPageList(currentPage, size) {
        getTopicPageList(currentPage, size)
        .then(res => {
          this.tableData = res.data.data.topicList
          this.total = res.data.data.total
        })
        .catch(err => {
          console.log(err);
        })
      },
      // 删除话题网络请求
      _deleteTopic(id) {
        deleteTopic(id)
        .then(res => {
          this._getTopicPageList(this.currentPage, this.size)
          if (res.data.data === 1) {
            this.$message({
              type: "success",
              message: "成功删除话题"
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
          updateTopic(this.topic.id, this.topic.name, this.topic.summary)
          .then(res => {
            this.dialogVisible = false
            this._getTopicPageList(this.currentPage, this.size)
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
          addTopic(this.topic.name, this.topic.summary)
          .then(res => {
            this.dialogVisible = false
            this._getTopicPageList(this.currentPage, this.size)
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
      // 点击添加
      handleAdd() {
        this.dialogVisible = true
        this.isEdit = false
        this.topic = Object.assign({}, defaultTopic)
      },
      // 点击修改
      handleUpdate(row) {
        this.dialogVisible = true
        this.isEdit = true
        this.topic = Object.assign({}, row)
      },
      // 点击删除
      handleDelete(row) {
        this._deleteTopic(row.id)
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
      handleSizeChange(val) {
        this.size = val
        this._getTopicPageList(this.currentPage, this.size)
      },
      // 改变当前页码
      handleCurrentChange(val) {
        this._getTopicPageList(val, this.size)
      }
    }  
  }
</script>

<style scoped>
  #topic-manage {
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