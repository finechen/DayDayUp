// 遍历模板，将里面的插值表达式处理
// 另外如果发现k-xx，@xx做特别处理
class Compile {
  constructor(el, vm) {
    this.rules = {
      interpolate: /{{([\s\S]+?)}}/g, // 插值
      evaluate: /{([\s\S+?])}/g // 逻辑
    }
    this.$vm = vm
    this.$el = document.querySelector(el)
    if (this.$el) {
      // 1.$el 中的内容搬家到一个fragment，提高操作效率
      this.$fragment = this.node2Fragment(this.$el)
      console.log('this.$fragment: ', this.$fragment);
      // 2.编译fragment
      this.compile(this.$fragment)
      // 3.将编译结果追加至宿主中
      this.$el.appendChild(this.$fragment)
    }
  }

  // 遍历el，将里面内容半岛或创建到fragment中
  node2Fragment(el) {
    const fragment = document.createDocumentFragment()
    let child
    while (child = el.firstChild) {
      // 由于apppendChild是移动操作
      fragment.appendChild(child)
    }
    return fragment
  }

  // 把动态值替换，把指令和事件做处理
  compile(el) {
    // 遍历el
    const childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      if (this.isElment(node)) {
        // console.log(`编译元素：${node.nodeName}`)
      } else if (this.isInterpolation(node)) {
        console.log('this.isInterpolation(node): ', this.isInterpolation(node));
        console.log(`编译文本：${node.textContent}`)
        this.compileText(node)
      }
      // 递归子元素
      if (node.childNodes && node.childNodes.length > 0) {
        this.compile(node)
      }
    })
  }

  isElment(node) {
    return node.nodeType === 1
  }

  isInterpolation(node) {
    // // 需要满足{{XX}}
    // console.log('/\{\{(.*)\}\}/.test(node.textContent): ', /\{\{(.*)\}\}/.test(node.textContent));
    return node.nodeType === 3 && this.rules.interpolate.test(node.textContent)

  }
  // 把插值表达式替换为实际内容
  compileText(node) {
    console.log('node', node, );
    this.rules.interpolate.test(node.textContent)
    // console.log('RegExp.$1: ', RegExp.$1);
    const exp = RegExp.$1
    node.textContent = this.$vm[exp]
    this.update(node, this.$vm, exp, 'text')
  }
  // 编写一个update函数
  // exp 是表达式 dir 是具体操作 text,html,model
  update(node, vm, exp, dir) {
    const fn = this[dir + 'Updator']
    fn && fn(node, vm[exp])
    // 创建watcher
    new Watcher(vm, exp, function() {
      fn && fn(node, vm[exp])
    })
  }
  textUpdator(node, value) {
    node.textContent = value
  }
}