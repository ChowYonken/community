<template>
  <div id="block-post">
    <el-card class="box-card" shadow="never">
      <span><i class="iconfont icon-yuanshuju-liebiaoshitu"></i> 数据列表</span>
    </el-card>
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
        width="220"
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
        width="120"
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
        label="操作"
        align="center"
        width="200">
        <template slot-scope="scope">
          <el-button
          size="mini"
          @click="cancelBlock(scope.row)">取消拉黑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

  import {blockPost, getBlockPost} from "@/network/api/post";

  export default {
    name: "BlockPost",
    data() {
      return {
        tableData: [],
        userId: 0, // 返回所有帖子
        currentPage: 1, // 当前页面
        size: 20, // 每页显示条数
        mode: 0, // 0-取消拉黑
      }
    },
    created() {
      this._getBlockPost(this.userId, this.currentPage, this.size)
    },
    methods: {
      // 查询拉黑帖子
      _getBlockPost(userId, currentPage, size) {
        getBlockPost(userId,currentPage, size)
        .then(res => {
          this.tableData = res.data.data
        })
        .catch(err => {
          console.log(err);
        })
      },
      // 点击取消拉黑
      cancelBlock(row) {
        const mode = 0
        const formData = new FormData
        formData.append("mode", mode)
        blockPost(row.id, formData)
        .then(res => {
          this._getBlockPost(this.userId, this.currentPage, this.size)
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
      }
    }
  }
</script>

<style scoped>
  #block-post {
    width: 1360px;
  }

  .box-card {
    width: 1306px;
    margin: -25px 0 15px 195px;
  }

  .el-table {
    margin-left: 195px;
  }
</style>