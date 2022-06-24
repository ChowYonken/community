import request from "@/network/request";

// 删除图片接口
export function deleteImg(filename) {
  return request({
    url: '/upload/image',
    method: 'delete',
    data: {
      filename
    },
    params: {
      filename
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
