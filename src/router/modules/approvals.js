
import Layout from '@/layout'

export default {
  path: '/approvals', // 路径
  component: Layout, // 组件
  // 配置二级路的路由表
  children: [{
    path: '',
    component: () => import('@/views/approvals'),
    meta: {
      title: '审批',
      icon: 'tree'
    }
  }]
}
