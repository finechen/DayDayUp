import Vue from 'vue'
export default function(Component, props) {
  // 先创建实例
  const vm = new Vue({
    /**
     * render - 生成虚拟DOM
     */
    render(h) {
      return h(Component, { props })
    }
  }).$mount()

  // 手动挂载
  document.body.appendChild(vm.$el)

  // 销毁方法
  const comp = vm.$children[0]
  console.log('comp: ', comp);

  comp.remove = function() {
    document.body.removeChild(vm.$el)
    vm.$destroy()
  }
  return comp
}