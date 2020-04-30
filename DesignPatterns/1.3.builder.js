/**
 * 建造者模式
 * 
 * 什么是建造者模式？
 * 建造者模式是一种将复杂的构建层与表现层分离的设计模式
 * 
 * 参考：https://juejin.im/post/5da7c83ee51d4524c902ac89
 */

class House {
  constructor() {
    this.parlor = '' // 客厅
    this.kitchen = ''
    this.bedroom = ''
    this.bathroom = ''
  }
}

class Boss {
  buildHouse(builder) {
    builder.buildParlor()
    builder.buildKitchen()
    builder.buildBedroom()
    builder.buildBathroom()
  }
}

class Builder {
  constructor(house) {
    this.$house = house
  }
  buildParlor() {
    this.$house.parlor = 'a big parlor is ok!'
  }
  buildKitchen() {
    this.$house.kitchen = 'a wondeful kitchen is ok!'
  }
  buildBedroom() {
    this.$house.bedroom = 'a warm bedroom is ok!'
  }
  buildBathroom() {
    this.$house.bathroom = 'a clean bathroom is ok!'
  }
  complete() {
    return this.$house
  }
}

const house = new House()
const boss = new Boss()
const builder = new Builder(house)

boss.buildHouse(builder)
console.log('house: ', house);
// house:  House {
//   parlor: 'a big parlor is ok!',
//   kitchen: 'a wondeful kitchen is ok!',
//   bedroom: 'a warm bedroom is ok!',
//   bathroom: 'a clean bathroom is ok!'
// }