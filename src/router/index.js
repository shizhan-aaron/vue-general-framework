import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '@/layout/index'
import articleCreaterRouter from './modules/articleCreate'
import articleRouter from './modules/article'
import permissionListRouter from './modules/permissionList'
import roleListRouter from './modules/roleList'
import userManageRouter from './modules/userManage'
import store from '../store'

/**
 * 私有路由表
 */
export const privateRoutes = [
  roleListRouter,
  userManageRouter,
  permissionListRouter,
  articleCreaterRouter,
  articleRouter
]

/**
 * 公有路由表
 */
export const publicRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/',
    // 注意：带有路径“/”的记录中的组件“默认”是一个不返回 Promise 的函数
    component: layout,
    redirect: '/profile',
    children: [
      // 个人中心
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index'),
        meta: {
          title: '个人中心',
          icon: 'el-icon-user'
        }
      },
      // 404
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404')
      },
      // 401
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes
})

/**
 * 初始化路由表
 */
export function resetRouter() {
  if (store.getters.userInfo && store.getters.userInfo.permission && store.getters.userInfo.permission.menus) {
    const menus = store.getters.userInfo.permission.menus
    menus.forEach(menu => {
      router.removeRoute(menu)
    })
  }
}

export default router
