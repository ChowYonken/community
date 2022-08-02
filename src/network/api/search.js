import request from "@/network/request";

export function search(keyword, current, size, topicId, sort) {
  return request({
    url: '/esDiscussPost/search',
    method: 'get',
    params: {
      keyword,
      current,
      size,
      topicId,
      sort
    }
  })
}