import request from "@/network/request";
import qs from 'qs'

// 获取用户信息
export function userInfo() {
  return request({
    url: '/user',
    method: 'get'
  })
}

// 上传图片
export function uploadImg(formData) {
  return request({
    url: '/file/img',
    method: 'post',
    data: formData, // 切记data不能加{}
    transformRequest: [
      data => data
    ],
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 删除图片接口
export function deleteImg(filename, type) {
  return request({
    url: '/file/img',
    method: 'delete',
    data: {
      filename,
      type 
    },
    params: {
      filename,
      type
    }
  })
}

// 编辑用户资料
export function editUser(nickname,sex,location,avatar) {
  return request({
    url: '/user',
    method: 'put',
    data: {
      nickname,
      sex,
      location,
      avatar
    }
  })
}

// 更改密码
export function updatePwd(oldPwd, newPwd) {
  return request({
    url: '/user',
    method: 'patch',
    data: {
      oldPwd,
      newPwd
    },
    transformRequest: [
      function (data) {
        // 将请求数据转换成功 formdata 接收格式
        return qs.stringify(data)
      }
    ],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}


