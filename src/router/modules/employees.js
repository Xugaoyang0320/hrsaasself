import Layout from '@/layout'

export default {
  path: '/employees', // 路径
  component: Layout, // 组件
  // 配置二级路的路由表
  children: [{
    path: '',
    component: () => import('@/views/employees'),
    meta: {
      title: '员工管理',
      icon: 'tree'
    }
  }]
}
