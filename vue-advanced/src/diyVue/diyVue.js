class DiyVue {
  constructor(options) {
    this.$options = options
    this.$data = options.data
    this.observe(this.$data)

    // 创建编译器
    new Compile(options.el,this)

    if(options.created){
      options.created.call(this)
    }
  }
  // 响应化
  observe(value) {
    if (!value || typeof value !== 'object') return

    // 遍历
    Object.keys(value).forEach(key => {
      this.defineReactive(value, key, value[key])
      this.proxyData(key)
    })
  }
  //
  defineReactive(obj, key, val) {

    // 递归
    this.observe(val)

    // 创建Dep实例
    const dep = new Dep()


    // 给 obj 定义属性
    Object.defineProperty(obj, key, {
      get() {
        // 将Dep.target指向的Watcher实例加入到Dep中
        Dep.target && dep.addDep(Dep.target)
        return val
      },
      set(newVal) {
        if (newVal !== val) {
          val = newVal
          dep.notify()
        }
      }
    })

  }

  proxyData(key) {
    Object.defineProperty(this, key, {
      get() {
        return this.$data[key]
      },
      set(newVal) {
        this.$data[key] = newVal
      }
    })
  }
}

// Dep：管理若干watcher实例，它和key一对一关系
class Dep {
  constructor() {
    this.deps = []
  }

  addDep(watcher) {
    this.deps.push(watcher)
  }

  notify() {
    this.deps.forEach(dep => { dep.update() })
  }
}

// 保存ui中以来，实现update函数可以将其更新
class Watcher {
  constructor(vm,key,cb){
    this.vm = vm
    this.key = key
    this.cb = cb
    // 将当前额实例指向Dep.target
    Dep.target = this
    this.vm[this.key] // 读一次触发getter
    Dep.target = null
  }

  update(){
    // console.log(this.key+'属性更新了')
    this.cb.call(this.vm,this.vm[this.key])
  }
}