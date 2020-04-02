// 享元模式
// 100个考生参加驾照考试 1辆考试车

class Candidate {
  constructor(id){
    this.id = id
  }
}

class Car {
  store = [] // 当日考试结果
  queue = [] // 考试排队队列
  
  // candidate = null // 当前考试考生

  // constructor (candidate) {
  //   this.candidate = candidate
  // }
  // 考生进行考试
  test (candidate) {

  }

  // 考完一个下一个接上
  next () {

  }
}