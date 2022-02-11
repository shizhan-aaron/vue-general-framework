import request from '@/utils/request'

/**
 * 登录
 * return promise
 */
export const login = data => {
  return request({
    url: '/user/token',
    method: 'POST',
    data
  })
}

/**
 * 获取用户信息
 * return promise
 */
export const getUserInfo = () => {
  return request({
    url: '/user/profile'
  })
}
