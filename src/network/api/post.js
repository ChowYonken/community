import request from "@/network/request";

// 发布帖子
export function createPost(title, content, topicId) {
  return request({
    url: '/discussPost',
    method: 'post',
    data: {
      title,
      content,
      topicId
    }
  })
}

// 分页显示全部帖子/指定用户的帖子
export function getShowPost(userId,current,size,mode) {
  return request({
    url: '/discussPost/list',
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

// 查看帖子详情
export function getPostDetail(id) {
  return request({
    url: '/discussPost' + '/' + id,
    method: 'get',
    params: {
      id
    }
  })
}
