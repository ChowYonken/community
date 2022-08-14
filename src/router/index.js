import Vue from 'vue'
import Router from 'vue-router'

// 懒加载
const CommunityPage = () => import('@/views/home/CommunityPage')
const DetailPost = () => import('@/views/detail/DetailPost')
const Login = () => import('@/views/auth/Login')
const Register = () => import('@/views/auth/Register')
const PostCreate = () => import('@/views/post/PostCreate')
const Profile = () => import('@/views/profile/ProfilePage')
const Topic = () => import('@/views/topic/Topic')
const Message = () => import('@/views/message/Message')
const Chat = () => import('@/views/message/userChat')
const Search = () => import('@/views/search/Search')
const SetUp = () => import('@/views/setup/SetUp')
const UserInfo = () => import('@/views/setup/childComponent/UserInfo')
const IdSet = () => import('@/views/setup/childComponent/IdSet')
// 管理员和版主访问的页面
const AdminPost = () => import('@/views/admin/AdminPage')
const PostManage = () => import('@/views/admin/childComponent/PostManage')
const BlockPost = () => import("@/views/admin/childComponent/BlockPost")
const UserManage = () => import('@/views/admin/childComponent/UserManage')
const RoleManage = () => import('@/views/admin/childComponent/RoleManage')
const SourceManage = () => import('@/views/admin/childComponent/SourceManage')
const TopicManage = () => import('@/views/admin/childComponent/TopicManage')
const DataStats = () => import('@/views/admin/childComponent/DataStats')
const ResourceList = () => import("@/views/admin/childComponent/ResourceList")
 
Vue.use(Router)
// 任何角色都可以访问的页面
const routes = [
  // 重定向 初始页面是首页
  {
    path: '',
    redirect: '/home'
  },
  // 社区首页
  {
    path: '/home',
    component: CommunityPage,
  },
  // 帖子详情页
  {
    path: '/discussPost/:id',
    component: DetailPost
  },
  // 注册
  {
    path: '/register',
    component: Register
  },
  // 登录
  {
    path: '/login',
    component: Login
  },
  // 发布
  {
    path: '/post',
    component: PostCreate
  },
  // 个人主页
  {
    path: '/user/:id',
    component: Profile
  },
  // 话题
  {
    path: '/topic/:id',
    component: Topic
  },
  // 系统消息
  {
    path: '/message',
    component: Message
  },
  // 聊天界面
  {
    path: '/chat',
    component: Chat
  },
  // 搜索页面
  {
    path: '/search/:keyword',
    component: Search
  },
  // 个人设置
  {
    path: '/setup',
    component: SetUp,
    redirect: '/userInfo',
    children: [  // 嵌套路由
      {
        path: '/userInfo',
        component: UserInfo
      },
      {
        path: '/idSet',
        component: IdSet
      }
    ]
  }
]

// admin, moderator权限分配
const token_routes = [
  {
    path: '/adminPost',
    component: AdminPost,
    meta: {role: 'admin'},
    children: [
      {
        path: '/postManage',
        component: PostManage
      },
      {
        path: '/block',
        component: BlockPost
      },
      {
        path: '/userManage',
        component: UserManage
      },
      {
        path: '/roleManage',
        component: RoleManage
      },
      {
        path: '/sourceManage',
        component: SourceManage
      },
      {
        path: '/resourceList/:id',
        component: ResourceList
      },
      {
        path: '/topicManage',
        component: TopicManage
      },
      // 数据统计页
      {
        path: '/dataStats',
        component: DataStats
      }
    ]
  },
  {
    path: '/adminPost',
    component: AdminPost,
    meta: {role: 'moderator'},
    children: [
      {
        path: 'postManage',
        component: PostManage
      }
    ]
  }
]


// 动态把路由挂载上去
let commonUser=[localStorage.getItem('role')]
// let commonUser=['admin']
let commonUserRoute = token_routes.filter(function(page) {
  return commonUser.includes(page.meta.role)
})

const router = new Router({
  routes,
  mode: 'history'
})

router.addRoutes(commonUserRoute)


// // 导航守卫
// // 如果token过期 就会让用户自动登录
// router.beforeEach((to, from, next) => {
//   // 获取存储localStorage的token
//   let token = window.localStorage.getItem('token')
//   // 获取存储token的开始时间
//   const tokenStartTime = window.localStorage.getItem('tokenStartTime')
//   // 定义一天过期
//   const timeOver = 1 * 24 * 3600 * 1000
//   // 当前时间
//   let date = new Date().getTime()
//   // 如果大于说明是token过期了
//   if(date - tokenStartTime > timeOver) {
//      token = null
//   }
//   // 如果token过期了
//   // if (!token) {
//   //   this.$router.push('/home');
//   //   location.reload()
//   // }
//   // next()
// })

export default router
