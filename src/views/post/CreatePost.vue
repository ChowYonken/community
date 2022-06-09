<!--
 * @Description: 登录组件
 * @Author: chowyonken
 * @Date: 2022-06-09
 * @update: 2022-06-09
 -->
<template>
  <div id="editPost">
    <!--editor-->
    <div style="border: 1px solid #ccc;">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editor"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 500px; overflow-y: hidden;"
        v-model="html"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="onCreated"
      />
    </div>
    <!--帖子确认发布按钮-->
    <div class="post-edit">
      <el-button type="primary" class="post-btn" @click="centerDialogVisible = true">确定发布</el-button>
      <el-dialog
        title="发布帖子"
        :visible.sync="centerDialogVisible"
        width="40%"
        center>
        <li>
          <span>标题：</span> <br><el-input v-model="title" placeholder="请输入标题"></el-input>
        </li>
        <li>
          <span>专区：</span> <br><el-select v-model="category" clearable placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.category" :value="item.value"></el-option>
        </el-select><br>
        </li>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>

  import { Editor, Toolbar } from '@wangeditor/editor-for-vue';

  export default {
    name: "Create",
    components: {
      Editor,
      Toolbar
    },
    data() {
      return {
        editor: null,
        html: '<p>hello</p>',
        toolbarConfig: { },
        editorConfig: { placeholder: '请输入内容...' },
        mode: 'default',
        centerDialogVisible: false,
        title: '',
        category: '',
        options: []
      }
    },
    methods: {
      onCreated(editor) {
        this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
      },
    },
    mounted() {
      // 模拟 ajax 请求，异步渲染编辑器
      setTimeout(() => {
        this.html = '<p>模拟 Ajax 异步设置内容 HTML</p>'
      }, 1500)
    },
    beforeDestroy() {
      const editor = this.editor
      if (editor == null) return
      editor.destroy() // 组件销毁时，及时销毁编辑器
    }
  }
</script>

<style scoped>
  #editPost {
    width: 1225px;
    margin: 0 auto;
  }

  /deep/ .el-button--primary {
    width: 190px;
    height: 36px;
  }

  .post-edit {
    position: relative;
  }

  .post-edit li {
    list-style: none;
    margin-top: 10px;
  }

  .post-edit span {
    display: inline-block;
    margin: 10px 0 10px 0;
  }

  .post-btn {
    position: absolute;
    bottom: -75px;
    right: 20px;
  }
</style>
