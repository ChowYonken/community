import request from "@/network/request"

// 获取系统通知列表
export function getSystemMsg(current, size) {
  return request({
    url: '/message/system',
    method: 'get',
    data: {
      current,
      size
    },
    params: {
      current,
      size
    }
  })
}

// 获取评论通知列表
export function getCommentMsg(current, size) {
  return request({
    url: '/message/comment',
    method: 'get',
    data: {
      current,
      size
    },
    params: {
      current,
      size
    }
  })
}

// 获取关注通知列表
export function getFollowMsg(current, size) {
  return request({
    url: '/message/follow',
    method: 'get',
    data: {
      current,
      size
    },
    params: {
      current,
      size
    }
  })
}

// 获取点赞通知列表
export function getLikeMsg() {
  return request({
    url: '/message/like',
    method: 'get'
  })
}