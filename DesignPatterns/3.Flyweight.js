// 享元模式
// 100个考生参加驾照考试 1辆考试车

class Candidate {
  constructor(id){
    this.id = id
  }
}

class Car {
  
  

  constructor(){
    this.res = [] // 当日考试结果
    this.queue = [] // 考试排队队列
  }
  
  // candidate = null // 当前考试考生

  // constructor (candidate) {
  //   this.candidate = candidate
  // }
  // 考生进行考试
  test (candidate) {
    const _this = this
    const fn = (function(candidate) {
      return function() {
        setTimeout(function() {
          console.log(`考生 ${candidate.id} 考完了`)
          _this.next()
        }, 1000)
      }
    })(candidate)
    console.log(`考生 ${candidate.id} 开始考试`)
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

var testCar  = new Car()
testCar.test({id:555}).test({id:666})

// for(var i = 0 ;i < 100;i++){

// }