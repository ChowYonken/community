import Vue from 'vue'
import Router from 'vue-router'

// 懒加载
const CommunityPage = () => import('@/views/home/CommunityPage')
const DetailPost = () => import('@/views/detail/DetailPost')
const Login = () => import('@/views/auth/Login')
const Register = () => import('@/views/auth/Register')
const CreatePost = () => import('@/views/post/CreatePost')
const Profile = () => import('@/views/profile/ProfilePage')
const Topic = () => import('@/views/topic/Topic')
const Message = () => import('@/views/message/Message')

Vue.use(Router)

const routes = [
  // 重定向 初始页面是首页
  {
    path: '',
    redirect: '/home'
  },
  // 社区首页
  {
    path: '/home',
    component: CommunityPage
  },
  // 帖子详情页
  {
    path: '/detail',
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
    component: CreatePost
  },
  // 个人主页
  {
    path: '/profile',
    component: Profile
  },
  // 话题
  {
    path: '/topic',
    component: Topic
  },
  // 系统消息
  {
    path: '/message',
    component: Message
  }
]

const router = new Router({
  routes,
  mode: 'history'
})

export default router

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
// router.beforeEach((to, from, next) => {
//   if (to.path === '/home') {
//     next();
//   } else {
//     // 从本地获取token
//     let token = localStorage.getItem('token');
//     // 判断token是否为空如果为空则跳转到登录页 如果有则放行
//     if (token === null || token === '') {
//       next({path:'/home'});
//     } else {
//       next();
//     }
//   }
// })
