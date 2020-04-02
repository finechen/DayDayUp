// 单例模式
class Singleton {
  constructor(data) {
      if (Singleton.prototype.instance === undefined) {
          this.data = data;
          Singleton.prototype.instance = this;
      }
      return Singleton.prototype.instance;
  }
}

let ob1 = new Singleton("one");
let ob2 = new Singleton("two");
let ob3 = new Singleton("Three");
ob2.init = 'Object flg';

console.log(ob1 === ob2);  // => true
console.log(ob1 === ob3);  // => true

console.log(ob1);
console.log(ob2);
console.log(ob3);