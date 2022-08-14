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

// 获取24小时搜索热词
export function getHotWord() {
  return request({
    url: '/data/hotWord',
    method: 'get'
  })
}