import { login, getUserInfo } from '@/api/user'
// import md5 from 'md5'
import { setItem, getItem, clearItem } from '@/utils/storage'
import { setTimeStamp } from '@/utils/auth'
import { TOKEN } from '@/constant'
import router, { resetRouter } from '@/router'

export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || '',
    userInfo: {}
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    /**
     * 登录请求动作
     */
    login (context, userInfo) {
      const { account, password } = userInfo
      return new Promise((resolve, reject) => {
        login({
          account: account,
          password: password
        }).then(data => {
          this.commit('user/setToken', data.token)
          // 跳转主页
          router.push('/')
          // 保存登录时间
          setTimeStamp()
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 获取用户信息
     */
    async getUserInfo (context) {
      const res = await getUserInfo()
      this.commit('user/setUserInfo', res)
      return res
    },
    /**
     * 退出登陆
     */
    logout () {
      // 初始化路由表
      resetRouter()

      // 清理掉当前用户缓存
      this.commit('user/setToken', '')
      this.commit('user/setUserInfo', {})
      this.commit('app/initTagsViewList')
      clearItem()

      // 返回到登陆也
      router.push('/login')
    }
  }
}
