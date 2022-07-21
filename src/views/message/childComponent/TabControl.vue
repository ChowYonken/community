<template>
  <div class="tab-control">
    <div class="tab-control-item" v-for="(item, index) in titles"
         :class="{active: currentIndex === index}"
         @click="itemClick(index)">
      <span>
        <el-badge :value="12" class="item">
          {{item}}
        </el-badge>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TabControl',
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        this.$emit('tabClick', index)
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    display: flex;
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding-left: 290px;
    text-align: center;
    font-size: 14px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
    z-index: 99;
  }

  /*.tab-control-list {*/
  /*  display: flex;*/
  /*  max-width: 960px;*/

  /*}*/

  .tab-control-item {
    min-width: 130px;
    padding: 0 12px;
  }

  .tab-control-item span {
    padding: 5px;
    color: #71777c;
    font-size: 14px;
  }

  div/deep/ .el-badge__content.is-fixed {
    position: absolute;
    top: 10px;
    right: -3px;
  }

  .active {
    color: #409EFF;
    border-bottom: 3px solid #409EFF;
  }

  .tab-control-item.active span {
    color: #409EFF;
  }
</style>
