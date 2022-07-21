<!--
 * @Description: 消息组件
 * @Author: chowyonken
 * @Date: 2022-06-13
 * @update: 2022-06-13
 -->
<template>
  <JwChat-index
    :config="config"
    :showRightBox="false"
    :taleList="taleList"
    @enter="bindEnter"
    @clickTalk="talkEvent"
    v-model="inputMsg"
    scrollType="scroll"
    :winBarConfig="winBarConfig"
    :toolConfig="tool"
  />
</template>

<script>

  import JwChat from 'jwchat';
  import Vue from 'vue'

  Vue.use(JwChat)

  export default {
    name: "Chat",
    components: {
      JwChat
    },
    data() {
      return {
        // 输入框的内容
        inputMsg: '',
        taleList: [
          {
            "date": "2020/04/25 21:19:07",
            "text": { "text": "起床不" },
            "mine": false,
            "name": "留恋人间不羡仙",
            "img": "https://codegi.gitee.io/jwchatdoc/demo/image/three.jpeg"
          },
          {
            "date": "2020/04/25 21:19:07",
            "text": { "text": "<audio data-src='https://www.w3school.com.cn/i/horse.mp3'/>" },
            "mine": false,
            "name": "只盼流星不盼雨",
            "img": "../image/two.jpeg"
          },
          {
            "date": "2020/04/25 21:19:07",
            "text": { "text": "<img data-src='../image/three.jpeg'/>" },
            "mine": false,
            "name": "只盼流星不盼雨",
            "img": "../image/two.jpeg"
          },
          {
            "date": "2020/04/16 21:19:07",
            "text": { "text": "<video data-src='https://www.w3school.com.cn/i/movie.mp4' controls='controls' />" },
            "mine": true,
            "name": "JwChat",
            "img": "https://codegi.gitee.io/jwchatdoc/demo/image/cover.png"
          },
          {
            "date": "2021/03/02 13:14:21",
            "mine": false,
            "name": "留恋人间不羡仙",
            "img": "../image/one.jpeg",
            "text": {
              system: {
                title: '在接入人工前，智能助手将为您首次应答。',
                subtitle: '猜您想问:',
                content: [
                  {
                    id: `system1`,
                    text: '组件如何使用'
                  },
                  {
                    id: `system2`,
                    text: '组件参数在哪里查看'
                  },
                  {
                    id: 'system',
                    text: '我可不可把组件用在商业'
                  }
                ]
              }
            }
          }
        ],
        tool: {
          show: ['file', 'history', 'img', ['文件1', '', '美图']],
          showEmoji: true,
          callback: this.toolEvent
        },
        config: {
          img: '../image/cover.png',
          name: 'JwChat',
          dept: '最简单、最便捷',
          callback: this.bindCover,
          historyConfig:{
            show: true,
            tip: '加载更多',
            callback: this.bindLoadHistory,
          },
        },
        winBarConfig: {
          active: 'win00',
          width: '160px',
          listHeight: '60px',
          // 聊天框列中的信息
          list: [ {
            id: 'win00',
            img: 'https://codegi.gitee.io/jwchatdoc/demo/image/cover.png',
            name: 'JwChat',
            dept: '最简单、最便捷',
            // 未读条数
            readNum: 99
          },
            {
              id: 'win01',
              img: '..//image/three.jpeg',
              name: '阳光明媚爱万物',
              dept: '沙拉黑油',
              readNum: 12
            },
            {
              id: 'win02',
              img: '..//image/two.jpeg',
              name: '只盼流星不盼雨',
              dept: '最后说的话'
            },
            {
              id: 'win03',
              img: 'https://codegi.gitee.io/jwchatdoc/demo/image/three.jpeg',
              name: '留恋人间不羡仙',
              dept: '这里可以放万物'
            },
            {
              id: 'win04',
              img: '..//image/three.jpeg',
              name: '阳光明媚爱万物',
              dept: '官方客服'
            },
            {
              id: 'win05',
              img: '..//image/three.jpeg',
              name: '今天没吃饭',
              dept: '我是康康'
            }],
          callback: this.bindWinBar,
        }
      }
    },
    methods: {
      // 点击发送或回车触发的事件
      bindEnter() {
        const msg = this.inputMsg
        if(!msg) return;
        const msgObj = {
          "date": "2020/05/20 23:19:07",
          "text": { "text": msg },
          "mine": true,
          "name": "JwChat",
          "img": "../image/three.jpeg"
        }
        this.list.push(msgObj)
      },
      /**
       * @description:
       * @param {*} type 当前点击的按钮
       * @param {*} plyload 附加文件或者需要处理的数据
       * @return {*}
       */
      toolEvent (type, plyload) {
        console.log('tools', type, plyload)
      },
      /**
       * @description: 点击加载更多的回调函数
       * @param {*}
       * @return {*}
       */
      bindLoadHistory () {
        const history = new Array(3).fill().map((i, j) => {
          return {
            "date": "2020/05/20 23:19:07",
            "text": { "text": j + new Date() },
            "mine": false,
            "name": "JwChat",
            "img": "image/three.jpeg"
          }
        })
        let list = history.concat(this.list)
        this.list = list
        console.log('加载历史', list, history)
      },
      bindCover (type) {
        console.log('header', type)
      },
      bindWinBar (play = {}) {
        const {type, data={}} = play
        console.log(data);
        if(type==='winBar'){
          const { id, dept, name, img } = data
          this.winBarConfig.active = id
        }
      },
      talkEvent () {
        console.log(this.inputMsg)
      }
    }
  }
</script>

<style scoped>
  div/deep/.toolIcon[data-v-b4bb0df6] {
    padding-left: 6px;
    font-size: 25px;
    color: #888a91;
  }

</style>
