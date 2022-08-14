import request from "@/network/request"

// 分页获取资源列表
export function getResourcePage(current, size) {
  return request({
    url: "/resource/pageList",
    method: "get",
    params: {
      current,
      size
    }
  })
}
// 获取资源列表
export function getResource() {
  return request({
    url: "/resource/list",
    method: "get"
  })
}

// 添加资源
export function addResource(name, url, description) {
  return request({
    url: "/resource",
    method: "post",
    data: {
      name,
      url,
      description
    }
  })
}

// 修改资源
export function updateResource(resourceId, name, url, description) {
  return request({
    url: "/resource" + "/" + resourceId,
    method: "post",
    data: {
      name,
      url,
      description
    },
    params: {
      resourceId
    }
  })
}

// 删除资源
export function deleteResource(resourceId) {
  return request({
    url: "/resource/delete" + "/" + resourceId,
    method: "delete",
    params: {
      resourceId
    }
  })
}