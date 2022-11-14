import request from '@/utils/request'

export function getDepartments() {
  return request({
    url: '/company/department'
  })
}

export function list2Tree(depts, rootValue) {
  return depts.reduce((prev, curr, index, arr) => {
    curr.children = arr.filter(item => item.pid === curr.id)
    if (curr.pid === rootValue) {
      prev.push(curr)
    }
    return prev
  }, [])
}
