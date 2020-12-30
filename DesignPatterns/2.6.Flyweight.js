
/**
 * 享元模式
 * 
 * 什么是享元模式？
 * 享元模式是一种节约资源的设计模式，即多个对象共享一个单元的设计模式。
 * 
 * 编程题：
 * 100个考生参加驾照考试 考试车只有一辆，请使用享元模式实现
 */
class Student {
  constructor(id){
    this.id = id
  }
}
class Car {
  constructor(){
    this.res = [] // 当日考试结果
    this.queue = [] // 考试排队队列
    const _this = this
    const fn = (function() {
      return function() {
        console.log(`考试开始`)
        _this.next()
      }
    })()
    this.queue.push(fn)
    setTimeout(function() {
      _this.next()
    }, 0)
  }
  // 考生进行考试
  test (candidate) {
    const _this = this
    const fn = (function(candidate) {
      return function() {
        console.log(`考生 ${candidate.id} 开始考试`)
        setTimeout(function() {
          console.log(`考生 ${candidate.id}考完了,结束时间：${new Date().valueOf()}`)
          _this.res.push(`考生 ${candidate.id}考完了,结束时间：${new Date().valueOf()}`)
          _this.next()
        }, _this.random(500,1500))
      }
    })(candidate)
    this.queue.push(fn)
    return this
  }
  // 考完一个下一个接上
  next () {
    let fn = this.queue.shift()
    fn && fn()
  }
  random(min = 0,max = 0){
    if(max<min){
      throw 'max must gretter than min'
    }
    return min + Math.floor(Math.random() * (max - min + 1))
  }
}
const testCar  = new Car()
const students = []
for(let i =0 ;i< 10;i++){
  let student = new Student(i) 
  students.push(student)
}
students.map(student => {
  testCar.test(student)
})