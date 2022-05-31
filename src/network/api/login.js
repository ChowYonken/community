import request from '../request'

// post接口  普通传参
export function LoginPostData(email,password) {
  return request({
    url:'/login',
    method: 'post',
    data:{
      email,
      password
    }
  })
}
