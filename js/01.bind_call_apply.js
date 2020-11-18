/**
 * _bind
 *
 * @param { context } context
 * @param { arguments } arguments
 */
function _call(context) {
    var self = this
    var args = [...arguments].slice(1)
    
}
Function.prototype._call = _call
Object.prototype._call = _call

var obj = {
    name: 'Bob',
    age: '18',
    fn() {
        console.log(`My name is ${this.name}, my age is ${this.age}`)
    }
}

var dog = {
    name: 'Snoby',
    age: 3
}

obj.fn._call(dog,'daddata','ttt','yuyuyuuy')

