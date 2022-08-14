import request from "@/network/request"

// 分页获取角色列表
export function getRolePage(current, size) {
  return request({
    url: "/role",
    method: "get",
    params: {
      current,
      size
    }
  })
}

// 获取角色详情
export function getRoleDetail(roleId) {
  return request({
    url: "/role" + "/" + roleId,
    method: "get",
    params: {
      roleId
    }
  })
}

// 获取角色拥有的资源
export function getRolehasResource(roleId) {
  return request({
    url: "/role/resource",
    method: "get",
    params: {
      roleId
    }
  })
}

// 添加角色
export function addRole(name, description) {
  return request({
    url: "/role",
    method: "post",
    data: {
      name,
      description
    }
  })
}

// 编辑角色
export function editRole(roleId, name, description) {
  return request({
    url: "/role" + "/" + roleId,
    method: "post",
    data: {
      name,
      description
    },
    params: {
      roleId
    }
  })
}

// 删除角色
export function deleteRole(roleId) {
  return request({
    url: "/role/delete" + "/" + roleId,
    method: "delete",
    params: {
      roleId
    }
  })
}

// 更新角色状态
export function updateRole(roleId, formData) {
  return request({
    url: "/role" + "/" + roleId,
    method: "put",
    data: formData,
    params: {
      roleId
    }
  })
}

// 给角色分配资源
export function giveUserResource(formData) {
  return request({
    url: "/role/allocation/resource",
    method: "post",
    data: formData
  })
}