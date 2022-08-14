import request from "@/network/request"

// 分页获取话题列表
export function getTopicPageList(current, size) {
  return request({
    url: '/topic/pageList',
    method: "get",
    params: {
      current,
      size
    }
  })
}

// 获取话题列表
export function getTopic() {
  return request({
    url: "/topic/list",
    method: "get",
  })
}

// 获取话题详情
export function getTopicDetail(topicId) {
  return request({
    url: "/topic" + "/" + topicId,
    method: "get",
    params: {
      topicId
    }
  })
}

// 添加话题
export function addTopic(name, summary) {
  return request({
    url: "/topic",
    method: "post",
    data: {
      name,
      summary
    }
  })
}

// 修改话题
export function updateTopic(topicId, name, summary) {
  return request({
    url: "/topic" + "/" + topicId,
    method: "post",
    data: {
      name,
      summary
    },
    params: {
      topicId
    }
  })
}

// 删除话题
export function deleteTopic(topicId) {
  return request({
    url: "/topic/delete" + "/" + topicId,
    method: "delete",
    params: {
      topicId
    }
  })
}