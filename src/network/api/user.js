import request from "@/network/request";

// 分页获取用户详情
export function getUserPage(current, size) {
  return request({
    url: "/user/page/list",
    method: "get",
    params: {
      current,
      size
    }
  })
}

// 获取用户信息
export function getUserInfo(userId) {
  return request({
    url: '/user' + '/' + userId,
    method: 'get',
    params: {
      userId
    },
    data: {
      userId
    }
  })
}

// 点赞帖子/评论
export function clickLike(post_id, formData) {
  return request({
    url: '/like',
    method: 'post',
    params: {
      post_id
    },
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 关注用户/话题
export function clickFollow(formData) {
  return request({
    url: '/follow',
    method: 'post',
    data: formData, // 切记data不能加{}
    transformRequest: [
      data => data
    ],
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 获取用户关注列表
export function getFollowList(uid) {
  return request({
    url: '/follow/follower' + '/' + uid,
    method: 'get',
    data: {
      uid
    },
    params: {
      uid
    }
  })
}

// 获取用户粉丝列表
export function getFansList(uid) {
  return request({
    url: '/follow/fans' + '/' + uid,
    method: 'get',
    data: {
      uid
    },
    params: {
      uid
    }
  })
}

// 获取用户拥有的角色
export function getRole(userId) {
  return request({
    url: '/user/role',
    method: 'get',
    params: {
      userId
    }
  })
}


// 给用户分配角色
export function giveUserRole(formData) {
  return request({
    url: "/user/allot/role",
    method: "post",
    data: formData
  })
}