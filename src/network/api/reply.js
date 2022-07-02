import request from "@/network/request";

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
