import { publicRoutes, privateRoutes } from '@/router'

export default {
  namespaced: true,
  state: () => ({
    // 路由表：初始时拥有的路由表
    routes: publicRoutes
  }),
  mutations: {
    /**
     * 增加路由
     */
    setRoutes(state, newRoutes) {
      state.routes = [...publicRoutes, ...newRoutes]
    }
  },
  actions: {
    /**
     * 根据权限数据筛选路由
     * @param {*} context
     * @param {*} menus 权限数据
     */
    filterRoutes(context, menus) {
      // 筛选之后，获取到的，需要通过 addRoute 进行添加的路由表数组
      const routes = []

      menus.forEach(key => {
        routes.push(...privateRoutes.filter(item => item.name === key))
      })

      // 最后添加 不匹配路由进入 404
      routes.push({
        path: '/:catchAll(.*)',
        redirect: '/404'
      })
      context.commit('setRoutes', routes)
      return routes
    }
  }
}
