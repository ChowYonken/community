import request from "@/network/request";

// post接口(注册)
export function register(email, password) {
  return request({
    url: '/register',
    method: 'post',
    data: {
      email,
      password
    }
  })
}

// 账号激活
export function activation(userId, code) {
  return request({
    url: '/activation' + '/' + userId + '/' + code,
    method: 'get',
    data: {
      userId,
      code
    }
  })
}
