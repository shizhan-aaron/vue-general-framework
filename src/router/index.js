import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '@/layout/index'

/**
 * 私有路由表
 */
const privateRoutes = [
  {
    path: '/user',
    name: 'user',
    component: layout,
    redirect: '/user/manage',
    meta: {
      title: 'user',
      icon: 'personnel'
    },
    children: [
      // 用户管理
      {
        path: '/user/manage',
        name: 'userManage',
        component: () => import('@/views/profile/index'),
        meta: {
          title: 'userManage',
          icon: 'personnel-manage'
        }
      },
      // 角色列表
      {
        path: '/user/role',
        name: 'userRole',
        component: () => import('@/views/role-list/index'),
        meta: {
          title: 'roleList',
          icon: 'role'
        }
      },
      // 权限列表
      {
        path: '/user/permission',
        name: 'userPermission',
        component: () => import('@/views/permission-list/index'),
        meta: {
          title: 'permissionList',
          icon: 'permission'
        }
      },
      {
        path: '/user/info/:id',
        name: 'userInfo',
        component: () => import('@/views/user-info/index'),
        meta: {
          title: 'userInfo'
        }
      },
      {
        path: '/user/import',
        name: 'import',
        component: () => import('@/views/import/index'),
        meta: {
          title: 'excelImport'
        }
      }
    ]
  },
  {
    path: '/article',
    name: 'article',
    component: layout,
    redirect: '/article/ranking',
    meta: {
      title: 'article',
      icon: 'article'
    },
    children: [
      {
        path: '/article/ranking',
        name: 'articleRanking',
        component: () => import('@/views/article-ranking/index'),
        meta: {
          title: 'articleRanking',
          icon: 'article-ranking'
        }
      },
      {
        path: '/article/:id',
        name: 'articleDetail',
        component: () => import('@/views/article-detail/index'),
        meta: {
          title: 'articleDetail'
        }
      },
      {
        path: '/article/create',
        name: 'articleCreate',
        component: () => import('@/views/article-create/index'),
        meta: {
          title: 'articleCreate',
          icon: 'article-create'
        }
      },
      {
        path: '/article/editor/:id',
        name: 'articleEditor',
        component: () => import('@/views/article-create/index'),
        meta: {
          title: 'articleEditor'
        }
      }
    ]
  }
]

/**
 * 公有路由表
 */
const publicRoutes = [
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
          title: 'profile',
          icon: 'el-icon-user'
        }
      },
      // 个人中心
      {
        path: '/test',
        name: 'test',
        component: () => import('@/views/test/index'),
        meta: {
          title: 'test',
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
  routes: [...publicRoutes, ...privateRoutes]
})

export default router
