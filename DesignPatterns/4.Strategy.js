/**
 * 策略模式
 * 
 * 什么是策略模式？
 * 策略模式实一种更关心输入输出，将算法充分分离的设计模式
 * 
 * 编程题：
 * 放假了，班级的同学们都准备去爬山，部分同学觉得走路更有意思，他们决定用脚完成全程
 * 还有一部分同学觉得旅行应该放松，不能太累，选择全程乘坐缆车，
 * 剩下的同学们选择爬上山，下车乘坐缆车
 */

class Student {
  constructor (id, way) {
    this.id = id;
    this.way = way;
  }
}

class TravelWay {
  travelByFoot (id) {
    console.log(`学生 ${id} 选择全程用脚`)
  }
  travelByCable (id) {
    console.log(`学生 ${id} 选择全程缆车`)
  }
  travelByFootAndCable (id) {
    console.log(`学生 ${id} 选择上山用脚下山缆车`)
  }
}

function random(min, max){
  if(min > max) throw `min must gretter then max`
  return min + Math.floor(Math.random() * (max - min + 1))
}

let students = []
const ways = ['Foot', 'Cable', 'FootAndCable']
const travelWay = new TravelWay()
for(let i =0;i<30;i++){
  let student = new Student(i, random(0, ways.length -1))
  students.push(student)
}
students.map(item =>{
  travelWay['travelBy' + ways[item.way]](item.id)
})