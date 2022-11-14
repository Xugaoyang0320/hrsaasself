import Layout from '@/layout'

export default {
  path: '/social', // 路径
  component: Layout, // 组件
  // 配置二级路的路由表
  children: [{
    path: '',
    component: () => import('@/views/social'),
    meta: {
      title: '社保管理',
      icon: 'tree'
    }
  }]
}
