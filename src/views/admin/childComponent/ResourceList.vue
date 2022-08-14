<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div class="title">
        <h4>分配资源</h4>
      </div>
      <div class="selectAll">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      </div>
      <div class="selectGroup">
        <el-row class="table-layout">
          <el-checkbox-group v-model="checkedResource" @change="handleCheckedResourceChange">
            <el-col :span="8" style="padding: 4px 0">
              <el-checkbox v-for="(resource,index) in resourceList" :label="resource.id" :key="index">{{resource.name}}</el-checkbox>
            </el-col>
          </el-checkbox-group>
        </el-row>
      </div>
      <div style="margin-top: 20px" align="center">
        <el-button type="primary" @click="handleSave()">保存</el-button>
    </div>
    </el-card>
  </div>
</template>

<script>

  import {getResource} from "@/network/api/resource"
  import {getRolehasResource, giveUserResource} from "@/network/api/role"

  export default {
    name: "ResourceList",
    data() {
      return {
        checkAll: false, 
        checkedResource: [], // 已有资源
        resourceList: [], // 资源列表
        isIndeterminate: true,
        roleId: ""
      }
    },
    created() {
      this.roleId = this.$route.params.id
      this._getResource()
      this._getRolehasResource()
    },
    methods: {
      // 获取资源列表
      _getResource() {
        getResource()
        .then(res => {
          this.resourceList = res.data.data
        })
        .catch(err => {
          console.log(err);
        })
      },
      // 获取角色拥有的资源
      _getRolehasResource() {
        getRolehasResource(this.roleId)
        .then(res => {
          let length = res.data.data.length
          for (let i = 0; i < length; i++) {
            this.checkedResource.push(res.data.data[i].id)
          }
          console.log(this.checkedResource)
        })
        .catch(err => {
          console.log(err);
        })
      },
      handleCheckAllChange(val) {
        this.checkedResource = val ? this.resourceList : [];
        this.isIndeterminate = false;
      },
      handleCheckedResourceChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.resourceList.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.resourceList.length;
      },
      // 点击保存
      handleSave() {
        const formData = new FormData()
        formData.append("roleId", this.roleId)
        formData.append("resourceIds", this.checkedResource)
        // 给角色分配资源
        giveUserResource(formData)
        .then(res => {
          console.log(res);
          if (res.data.status === 100) {
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
  .resource-list {
    margin-left: 415px;
  }

  .box-card {
    width: 700px;
  }

  .title {
    margin-bottom: 10px;
  }

  .selectAll {
    background-color: #f2f6fc;
    padding: 20px;
    border: 1px solid #dcdfe6;
    border-bottom: none;
  }

  .selectGroup{
     border: 1px solid #dcdfe6;
     padding: 20px;
  }

  div/deep/ .el-checkbox {
    margin-top: 5px;
  }
</style>