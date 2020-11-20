// lazyman.say('My name is lazyMan').eat('breakfust').sleep(4).eat('launch').sleep(5).eat('dinner')

class LazyMan {
  constructor(name) {
    // 虽然 lazyMan 很懒，但我们依然给他一个名字
    this.name = name
    // 我们把 lazyMan 要做的事情放在一个数组里
    this.queue = []
    // 第一个行为
    const fn = (() => {
      return () => {
        console.log(`My name is ${name}`)
        // 开始执行第二个行为
        this.next()
      }
    })()
    this.queue.push(fn)
    // 等实例化完成开始执行队列任务
    setTimeout(() => {
      this.next()
    }, 0)
  }
  /**
   * next
   * @memberof LazyMan
   */
  next() {
    // 把要执行的行为抽出来，并且执行一下
    const fn = this.queue.shift()
    fn && fn()
  }
  /**
   * eat
   * @param { String } what
   * @return {*} 
   * @memberof LazyMan
   */
  eat(what) {
    // eat 是一个行为 我们用函数把它包裹起来
    let fn = (() => {
      // 用一个闭包把吃了什么记录下来
      return () => {
        console.log(`I ate ${what} !`)
        // 行为完成，调用 next 方法，执行下一个行为
        this.next()
      }
    })(what)
    this.queue.push(fn)
    // 返回 this 实现链式调用
    return this
  }
  /**
   * sleep
   * @param { Number } hours
   * @return {*} 
   * @memberof LazyMan
   */
  sleep(hours) {
    const _this = this
    let fn = (function () {
      return function () {
        setTimeout(function () {
          console.log(`I slept ${hours} hours ... ...`)
          // 同样地，行为完成，调用 next 方法，执行下一个行为
          _this.next()
        }, hours * 1000)
      }
    })(hours)
    // 同样地，把 sleep 行为放到队列里
    this.queue.push(fn)
    // 同样返回 this 实现链式调用
    return this
  }
}
const lazyman = new LazyMan('Pikky').eat('Breakfest')
lazyman.sleep(4)
lazyman.eat('Launch')
lazyman.sleep(5)
lazyman.eat('Dinner')
lazyman.sleep(8)