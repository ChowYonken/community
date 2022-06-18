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
