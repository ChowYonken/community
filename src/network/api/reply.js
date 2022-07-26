import request from "@/network/request";

// 查询评论列表
export function getReply(current,size,postId) {
  return request({
    url: '/comment' + '/' + postId,
    method: 'get',
    params: {
      current,
      size
    }
  })
}

// 添加评论(评论帖子或者评论帖子里面的评论)
export function comment(postId, bodyData) {
  return request({
    url: '/comment' + '/' + postId,
    method: 'post',
    data: bodyData,
    params: {
      postId
    }
  })
}

// 获取评论总数
export function getCommentTotal(postId) {
  return request({
    url: '/comment/count' + '/' + postId,
    method: 'get',
    params: {
      postId
    }
  })
}