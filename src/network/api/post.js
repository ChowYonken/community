import request from "@/network/request";

// 分页显示帖子
export function getShowPost(userId,current,size,mode) {
  return request({
    url: '/discussPost',
    method: 'get',
    data: {
      userId,
      current,
      size,
      mode
    },
    params: {
      userId,
      current,
      size,
      mode
    }
  })
}

// 查询帖子总数
export function getCount(userId) {
  return request({
    url: '/discussPost/count',
    method: 'get',
    params: {
      userId
    }
  })
}
