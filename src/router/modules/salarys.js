import Layout from '@/layout'

export default {
  path: '/salarys', // 路径
  component: Layout, // 组件
  // 配置二级路的路由表
  children: [{
    path: '',
    component: () => import('@/views/salarys'),
    meta: {
      title: '薪资',
      icon: 'tree'
    }
  }]
}
