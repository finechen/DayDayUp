 class LazyMan {
   constructor(name) {
     this.name = name
     this.queue = []
     const _this = this
     const fn = (function() {
       return function() {
         console.log(`My name is ${_this.name}`)
         _this.next()
       }
     })()
     this.queue.push(fn)
     setTimeout(function() {
       _this.next()
     }, 0)
   }
   eat(str) {
     //  this.next()
     const _this = this
     const fn = (function(str) {
       return function() {
         console.log(`I ate ${str}`)
         _this.next()
       }
     })(str)
     this.queue.push(fn)
     return this
   }
   sleep(time) {
     const _this = this
     const fn = (function(time) {
       return function(str) {
         setTimeout(function() {
           console.log(`I slept ${time} s`)
           _this.next()
         }, time * 1000)
       }
     })(time)
     this.queue.push(fn)
     return this
   }
   next() {
     let fn = this.queue.shift()
     fn && fn()
   }
 }
 const lazyman = new LazyMan('Pikky').eat('Breakfest').sleep(4).eat('Launch').sleep(5).eat('Dinner').sleep(8)