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

// 删除帖子
export function deletePost(id) {
  return request({
    url: '/discussPost/delete' + '/' + id,
    method: 'delete',
    params: {
      id
    }
  })
}

// 查询拉黑帖子
export function getBlockPost(userId, current, size) {
  return request({
    url: "/discussPost/list/block",
    method: "get",
    params: {
      userId,
      current,
      size
    }
  })
}

// 加精帖子
export function essencePost(postId, formData) {
  return request({
    url: "/discussPost/essence" + "/" + postId,
    method: "put",
    data: formData,
    params: {
      postId
    }
  })
}

// 拉黑帖子
export function blockPost(postId, formData) {
  return request({
    url: "/discussPost/block" + "/" + postId,
    method: "put",
    data: formData,
    params: {
      postId
    }
  })
}
