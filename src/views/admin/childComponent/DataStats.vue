<template>
  <div class="data-stats">
    <!-- 网站UV -->
    <el-card class="box-card">
      <div class="title"><i class="iconfont icon-wangzhan"></i> 网站UV</div>
      <div class="dateSelect">
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日" 
          value-format="yyyy-MM-dd">
        </el-date-picker>
        <el-date-picker
          v-model="value2"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日" 
          value-format="yyyy-MM-dd">
        </el-date-picker>
        <el-button type="primary" @click="_getDataUv">开始统计</el-button>
      </div>
      <div class="statsResult">
        <span class="result">统计结果</span>
        <span class="number" v-show="uvNumber !== null">{{uvNumber}}</span>
      </div>
    </el-card>
    <!-- 活跃用户 -->
    <el-card class="box-card">
      <div class="title"><i class="iconfont icon-huoyueshijianduan"></i> 活跃用户</div>
      <div class="dateSelect">
        <el-date-picker
          v-model="value3"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd">
        </el-date-picker>
        <el-date-picker
          v-model="value4"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd">
        </el-date-picker>
        <el-button type="primary" @click="_getDataDau">开始统计</el-button>
      </div>
      <div class="statsResult">
        <span class="result">统计结果</span>
        <span class="number" v-show="daoNumber !== null">{{daoNumber}}</span>
      </div>
    </el-card>
  </div>
</template>

<script>

  import {getDataUv, getDataDau} from "@/network/api/dataStats"

  export default {
    name: "DataStats",
    data() {
      return {
        value1: "",
        value2: "",
        value3: "",
        value4: "",
        uvNumber: null,
        daoNumber: null,
      }
    },
    methods: {
      // 获取网站UV
      _getDataUv() {
        getDataUv(this.value1, this.value2)
        .then(res => {
          this.uvNumber = res.data.data
          if (res.data.status === 100) {
            this.$message({
              type: "success",
              message: "获取成功"
            })
          } else {
            this.$message.error('获取失败，请重试');
          }
        })
        .catch(err => {
          console.log(err);
        })
      },
      // 获取日活跃用户
      _getDataDau() {
        getDataDau(this.value3, this.value4)
        this.daoNumber = res.data.data
        .then(res => {
          if (res.data.status === 100) {
            this.$message({
              type: "success",
              message: "获取成功"
            })
          } else {
            this.$message.error('获取失败，请重试');
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
  .data-stats {
    margin-left: 300px;
  }

  div/deep/ .el-date-editor.el-input {
    margin-right: 20px!important;
  }

  .box-card {
    margin-top: 30px;
  }

  .title {
    margin-bottom: 10px;
    /* font-weight: 700; */
  }

  .statsResult {
    width: 900px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    margin-top: 10px;
    padding: 0 10px;
  }

  .statsResult .result {
    float: left;
  }

  .statsResult .number {
    float: right;
    min-width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    color: #fff;
    background-color: red;
    margin-top: 4px;
    border-radius: 2px;
    padding: 0 2px;
  }
</style>