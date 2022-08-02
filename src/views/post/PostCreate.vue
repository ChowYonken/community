<!--
 * @Description: 发帖子组件
 * @Author: chowyonken
 * @Date: 2022-07-23
 * @update: 2022-07-23
 -->
<template>
  <div id="create-post">
    <h1 style="color: #000; text-align: center;">编辑帖子</h1>
    <!-- 编辑器 -->
    <el-container class="contentPlace">
      <el-main class="mainPlace">
        <el-form class="contentPlace" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label-position="top">
          <!-- 标题 -->
          <el-form-item class="labelPlace" label="标题" prop="title">
            <el-input v-model="ruleForm.title" />
          </el-form-item>
          <!-- 内容 -->
          <el-form-item class="labelPlace" label="内容" prop="content">
            <mavon-editor 
              ref = md
              v-model="ruleForm.content" 
              class="editor"
              :scrollStyle="true" 
              toolbarsBackground="#ECF5FF" 
              :ishljs="true"
              :codeStyle="codeStyle"
              @imgAdd="_imgAdd" 
              @imgDel="_imgDel"/>
          </el-form-item>
          <!-- 话题 -->
          <el-form-item class="labelPlace" label="话题" prop="value">
            <el-select v-model="ruleForm.value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm()">发布</el-button>
            <el-button type="info" @click="resetForm()">清空</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>
 
<script>

  import {mavonEditor} from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  import {createPost} from '@/network/api/post'
  import {uploadImg, deleteImg} from '@/network/api/userEdit'
 
  export default {
    name: "PostCreate",
    components: {
      mavonEditor
    },
    data() {
      return {
        externalLink: {
          markdown_css: function () {
            // 这是你的markdown css文件路径
            return 'mavon-editor/markdown/github-markdown.min.css'
          },
          hljs_js: function () {
            // 这是你的hljs文件路径
            return '/mavon-editor/highlightjs/highlight.min.js'
          },
          hljs_css: function (css) {
            // 这是你的代码高亮配色文件路径
            return '/mavon-editor/highlightjs/styles/' + css + '.min.css'
          },
          hljs_lang: function (lang) {
            // 这是你的代码高亮语言解析路径
            return '/mavon-editor/highlightjs/languages/' + lang + '.min.js'
          },
          katex_css: function () {
            // 这是你的katex配色方案路径路径
            return '/mavon-editor/katex/katex.min.css'
          },
          katex_js: function () {
            // 这是你的katex.js路径
            return '/mavon-editor/katex/katex.min.js'
          }
        },
        ruleForm: {
          title: '',
          content: '',
          value: ''
        },
        options: [{       // 选择器选项
          value: '0',
          label: '影视圈'
        }, {
          value: '1',
          label: '娱乐圈'
        }, {
          value: '2',
          label: '音乐圈'
        }, {
          value: '3',
          label: '综艺圈'
        }],
        rules: {
          title: [{
            required: true,
            message: "请输入标题",
            min: 3,
            max: 25,
            message: "长度在 3 到 25 个字符",
            trigger: "blur"
          }],
          content: [{ 
            required: true, 
            message: "请输入内容", 
            trigger: "blur" 
          }],
          value: [{
            required: true,
            message: "请选择话题",
            trigger: 'change'
          }]
        },
        imageName: [], // 存储照片名字
        type: 2, // 帖子图片
        codeStyle: 'light',
      }
    },
    methods: {
      // 发布帖子
      _createPost() {
        createPost(this.ruleForm.title, this.ruleForm.content, this.ruleForm.value)
        .then(res => {
          console.log(res);
          if(res.data.data !== '') {
            this.$message({
              type: 'success',
              message: '发布成功'
            })
            this.$router.push('./home')
          } else {
            this.$message.error('发布失败，请重试！');
          }
        })
        .catch(err => {
          console.log(err);
        })
      },
      // 上传图片
      _imgAdd(pos, $file) {
        let that = this
        let formData = new FormData()
        formData.append('img', $file)
        formData.append('type', that.type)
        uploadImg(formData)
        .then(res => {
          console.log(res);
          // 将图片的名称截取并保存到imageName中(截取url地址最后一个斜杠后面的图片名称)
          let url = res.data.data
          let index = url.lastIndexOf("\/")
          that.imageName.push(url.substring(index + 1,url.length))
          let name = $file.name
          if (name.includes('-')) {
            name = name.replace(/-/g, '')
          }
          let content = this.ruleForm.content
          // 将返回的url替换到文本原位置![...](0) -> ![...](url)  这里是必须要有的
          if (content.includes(name)) {
            let oStr = `(${pos})`
            let nStr = `(${url})`
            let index = content.indexOf(oStr)
            let str = content.replace(oStr, '')
            let insertStr = (soure, start, newStr) => {
              return soure.slice(0, start) + newStr + soure.slice(start)
            }
            this.ruleForm.content = insertStr(str, index, nStr)
          }
        })
        .catch(err => {
          console.log(err);
        })
      },
      // 删除图片
      _imgDel(pos) {
        let that = this
        let index = pos[0] - 1
        // 找到对应的图片名字
        let filename = that.imageName[index]
        deleteImg(filename, that.type)
        .then(res => {
          console.log(res);
        }, err => {
          console.log(err);
        })
      },
      // 提交
      submitForm() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this._createPost()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 清空
      resetForm() {
        this.$refs.ruleForm.resetFields();
        this.ruleForm.value = ''
      }
    }
  }
</script>
 
<style scoped>
  .create-post {
    width: 1225px;
    margin: 0 auto;
  }
 
  .editor {
    margin: 0 auto;
    border: 2px solid #B3D8FF;
    z-index: 99;
  }

  .contentPlace {
    width: auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .mainPlace {
    background-color: #fff;
    max-width: 1225px;
    height: 100%;
    border: 2px solid #B3D8FF;
    border-radius: 0.5rem;
  }

  .ruleForm {
    width: auto;
    height: 100%;
    margin: 0 auto;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .labelPlace {
    width: 100%;
    height: auto;
    margin: 1rem;
  }
  
  div/deep/ .el-main {
    margin-top: 10px;
  }

  div/deep/ .el-form--label-top .el-form-item__label {
    font-size: 22px;
    font-weight: 700;
    color: #333;
  }

  div/deep/.el-input__inner {
    border: 2px solid #B3D8FF!important;
  }

  .v-note-wrapper.shadow {
    border: 2px solid #B3D8FF!important;
  }

  .markdown-body {
    background-color: #fff!important;
  }

  .markdown-body pre {
    background-color: rgba(40, 44, 52, 1);
  }
</style>