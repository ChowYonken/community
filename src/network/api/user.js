import request from "@/network/request";

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

// 获取用户关注总人数
export function getFollowNum(uid) {
  return request({
    url: '/follow/follower/count' + '/' + uid,
    method: 'get',
    data: {
      uid
    },
    params: {
      uid
    }
  })
}

// 获取用户粉丝总人数
