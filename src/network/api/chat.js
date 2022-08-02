import request from "@/network/request";

// 获取私信对话列表
export function getList(current, size) {
  return request({
    url: '/private_letter/list',
    method: 'get',
    params: {
      current,
      size
    }
  })
}

// 获取私信未读总数量
export function unRead() {
  return request({
    url: '/private_letter/unRead',
    method: 'get'
  })
}

// 获取私信详情
export function chatDetail(conversationId) {
  return request({
    url: '/private_letter' + '/' + conversationId,
    method: 'get',
    params: {
      conversationId
    }
  })
}

// 发送私信
export function sendMessage(formData) {
  return request({
    url: '/private_letter',
    method: 'post',
    data: formData
  })
}