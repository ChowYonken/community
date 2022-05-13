import Vue from 'vue'
import Router from 'vue-router'

// 懒加载
const CommunityPage = () => import('@/views/home/CommunityPage')
const DetailPost = () => import('@/views/detail/DetailPost')
const Login = () => import('@/views/auth/Login')
const Register = () => import('@/views/auth/Register')
const CreatePost = () => import('@/views/post/CreatePost')
const Profile = () => import('@/views/profile/ProfilePage')

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
  {
    path: '/profile',
    component: Profile
  }
]

export default new Router({
  routes,
  mode: 'history'
})

