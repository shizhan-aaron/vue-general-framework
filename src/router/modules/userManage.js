import layout from '@/layout'

export default {
  path: '/user',
  component: layout,
  redirect: '/user/manage',
  name: 'userManage',
  meta: {
    title: '用户',
    icon: 'personnel'
  },
  children: [
    {
      path: '/user/manage',
      component: () => import('@/views/user-manage/index'),
      meta: {
        title: '员工管理',
        icon: 'personnel-manage'
      }
    },
    {
      path: '/user/info/:id',
      name: 'userInfo',
      beforeEnter: (to, from, next) => {
        if (to.params.id) {
          to.meta.title = to.params.id + ' 员工信息'
        }
        next()
      },
      component: () => import('@/views/user-info/index'),
      props: true
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
}
