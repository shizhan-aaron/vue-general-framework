import router from '@/router'
import store from './store'

// 白名单
const whiteList = ['/login']

/**
 * 路由前置守卫
 * @param {*} to 要到哪里去
 * @param {*} from 你从哪里来
 * @param {*} next 是否要去哪
 */
router.beforeEach(async (to, from, next) => {
  if (store.getters.token) {
    // 1.用户已登陆，则不允许进入login
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断用户资料是否存在，如果不存在，获取用户信息
      if (!store.getters.hasUserInfo) {
        const { permission } = await store.dispatch('user/getUserInfo')
        // 处理用户权限，筛选出需要添加的路由
        const filterRoutes = await store.dispatch('permission/filterRoutes', permission.menus)

        // 循环添加对应动态路由
        filterRoutes.forEach(item => {
          router.addRoute(item)
        })

        // 添加完动态路由之后，需要进行一次主动跳转
        return next(to.path)
      }
      next()
    }
  } else {
    // 2.用户未登陆，只允许进入login
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
