import request from '../request'

// post接口(登录)  普通传参
export function LoginPostData(email,password) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      email,
      password
    }
  })
}

// get接口(登出)
export function LogoutPostData(Token) {
  return request({
    // headers: {
    //   'Authorization': 'Bearer ${Token}'
    // },
    url: '/logout',
    method: 'get',
    // data: {
    //   Token
    // }
  })
}
