<template>
  <div id="post-manage">
    <el-card class="box-card" shadow="never">
      <span><i class="iconfont icon-yuanshuju-liebiaoshitu"></i> 数据列表</span>
      <el-button type="primary" plain class="block" @click="blockList">拉黑列表</el-button>
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
        prop="author"
        label="作者"
        width="170"
        align="center" 
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width=""
        align="center" 
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="likeCount"
        label="点赞数"
        width="80"
        align="center">
      </el-table-column>
      <el-table-column
        prop="commentCount"
        label="评论数"
        width="80"
        align="center">
      </el-table-column>
      <el-table-column
        prop="topic"
        label="话题"
        width="100"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="发布时间"
        width="160"
        align="center">
      </el-table-column>
      <el-table-column
        label="加精" 
        width="100" 
        align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isEssence"
            active-color="#409eff"
            @change="clickEssence(scope.row)">
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
          type="mini"
          @click="cancelBlock(scope.row)">拉黑</el-button>
          <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)">删除</el-button>   
          <el-button
          size="mini"
          @click="getDetail(scope.row)" class="detailBtn">查看详情</el-button>
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
  </div>
</template>

<script>

  import {getShowPost, getCount, deletePost, essencePost, blockPost} from "@/network/api/post";

  export default {
    name: "PostManage",
    data() {
      return {
        tableData: [],
        userId: 0, // 返回所有帖子
        currentPage: 1, // 当前页面
        size: 5, // 每页显示条数
        mode: 2, // 显示最新
        isEssence: false, // 加精帖子
        block: false, // 拉黑帖子
        total: null, // 帖子总数
      }
    },
    created() {
      this._getShowPost(this.userId, this.currentPage, this.size, this.mode)
      this._getCount()
    },
    methods: {
      // 获取所有最新帖子
      _getShowPost(userId, currentPage, size, mode) {
        getShowPost(userId, currentPage, size, mode)
        .then(res => {
          this.tableData = res.data.data
        })
        .catch(err => {
          console.log(err);
        })
      },
      // 获取帖子总数
      _getCount() {
        getCount(this.userId)
        .then(res => {
          this.total = res.data.data
        })
        .catch(err => {
          console.log(err);
        })
      },
      // 删除帖子网路请求
      _deletePost(id) {
        deletePost(id)
        .then(res => {
          this._getShowPost(this.userId, this.currentPage, this.size, this.mode)
          this._getCount()
          if (res.data.data === 1) {
            this.$message({
              type: "success",
              message: "成功删除帖子"
            })
          } else {
            this.$message.error('删除失败，请重试');
          }
        })
        .catch(err => {
          console.log(err);
        })
      },
      // 删除帖子
      handleDelete(row) {
        this._deletePost(row.id)
      },
      // 跳转帖子详情页面
      getDetail(row) {
        this.$router.push('/discussPost/' + row.id)
      },
      // 加精帖子
      clickEssence(row) {
        let mode = null
        const formData = new FormData
        if(!row.isEssence) {
          // 取消加精
          mode = 0
          formData.append("mode", mode)
        } else {
          // 加精
          mode = 1
          formData.append("mode", mode)
        }
        essencePost(row.id, formData)
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
      // 拉黑帖子
      cancelBlock(row) {
        const mode = 1
        const formData = new FormData
        formData.append("mode", mode)
        blockPost(row.id, formData)
        .then(res => {
          console.log(res);
          this._getShowPost(this.userId, this.currentPage, this.size, this.mode)
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
      // 跳转拉黑页面
      blockList() {
        this.$router.push("/block")
      },
      // 改变页面大小
      handleSizeChange(val) {
        this.size = val
        this._getShowPost(this.userId, this.currentPage, this.size, this.mode)
      },
      // 改变当前页码
      handleCurrentChange(val) {
        this._getShowPost(this.userId, val, this.size, this.mode)
      }
    }
  }
</script>

<style scoped>
  #post-manage {
    width: 1360px;
  }

  .box-card {
    width: 1306px;
    margin: -25px 0 15px 195px;
  }

  .el-table {
    margin-left: 195px;
  }

  .block {
    float: right;
    padding: 6px 5px;
  }

  .detailBtn {
    margin-top: 5px;
  }

  div/deep/ .el-pagination {
    float: right;
    margin-top: 15px;
  }
</style>