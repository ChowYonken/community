<!--
 * @Description: 发帖子组件
 * @Author: chowyonken
 * @Date: 2022-07-23
 * @update: 2022-07-23
 -->
<template>
  <div id="create-post">
    <mavon-editor v-model="value" :externalLink="externalLink"/>
  </div>
</template>
 
<script>

  import {mavonEditor} from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'

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
            return '/public/mavon-editor/markdown/github-markdown.min.css'
          },
          hljs_js: function () {
            // 这是你的hljs文件路径
            return '/public/mavon-editor/highlightjs/highlight.min.js'
          },
          hljs_css: function (css) {
            // 这是你的代码高亮配色文件路径
            return '/public/mavon-editor/highlightjs/styles/' + css + '.min.css'
          },
          hljs_lang: function (lang) {
            // 这是你的代码高亮语言解析路径
            return '/public/mavon-editor/highlightjs/languages/' + lang + '.min.js'
          },
          katex_css: function () {
            // 这是你的katex配色方案路径路径
            return '/public/mavon-editor/katex/katex.min.css'
          },
          katex_js: function () {
            // 这是你的katex.js路径
            return '/public/mavon-editor/katex/katex.min.js'
          }
        },
        value: ""
      }
    }
  }
</script>
 
<style scoped>
 
</style>