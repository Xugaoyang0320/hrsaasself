// 负责管理所有的自定义指令
export const imageerror = {
  // inserted指令对象会在当前的dom元素插入到节点之后执行
  inserted(dom, options) {
    // options是指令变量的解释，其中有一个属性叫value
    // dom表示指令作用的dom对象，此时为图片
    // 当图片有地址，但加载不出来的时候，会报错会触发图片的一个事件=》onerror
    dom.onerror = function() {
      // 当图片出现异常的时候，会用默认图片
      // dom 可以注册error事件
      dom.src = options.value
    }
  }
}
