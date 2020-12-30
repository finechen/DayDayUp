/**
 * _call
 *
 * @param { context } context
 * @param { arguments } arguments
 */
Function.prototype._call = function (context) {
  // 如果没有传或传的值为空对象 context指向window
  context = context || window
  let fn = Symbol(context)
  context[fn] = this //给context添加一个方法 指向this
  // 处理参数 去除第一个参数this 其它传入fn函数
  let arg = [...arguments].slice(1) //[...xxx]把类数组变成数组，arguments为啥不是数组自行搜索 slice返回一个新数组
  context[fn](...arg) //执行fn
  delete context[fn] //删除方法
}

var obj = {
  name: 'Bob',
  age: '18',
  fn() {

  }
}

var dog = {
  name: 'Snoopy',
  age: 3
}
obj.fn._call(dog, 'daddata', 'ttt', 'yuyuyuuy')

/**
 * _bind
 *
 * @param {*} context
 */
Function.prototype._bind = function (context) {
  //返回一个绑定this的函数，我们需要在此保存this
  let self = this
  // 可以支持柯里化传参，保存参数
  let arg = [...arguments].slice(1)
  // 返回一个函数
  return function () {
    //同样因为支持柯里化形式传参我们需要再次获取存储参数
    let newArg = [...arguments]
    // 返回函数绑定this，传入两次保存的参数
    //考虑返回函数有返回值做了return
    return self.apply(context, arg.concat(newArg))
  }
}