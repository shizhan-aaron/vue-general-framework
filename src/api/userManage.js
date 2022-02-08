import request from '@/utils/request'

/**
 * 获取用户列表数据
 */
export const userManageList = data => {
  return request({
    url: '/user-manage/list',
    params: data
  })
}

/**
 * 获取用户详情
 */
export const userDetail = id => {
  return request({
    url: `/user-manage/detail/${id}`
  })
}

/**
 * 获取指定用户角色
 */
export const userRole = uid => {
  return request({
    url: `/user-manage/role/${uid}`
  })
}

/**
 * 为用户分配角色
 */
export const updateRole = (uid, roles) => {
  return request({
    url: `/user-manage/update-role/${uid}`,
    method: 'POST',
    data: {
      roles
    }
  })
}
