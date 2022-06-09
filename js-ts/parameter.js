//js中 函数的参数传递

/**
 * 原始值变量
 */
let a = 1 
function addOne(parameter) {
    // parameter = parameter + 1 
    parameter ++
    console.log('parameter',parameter);  // 2
}
addOne(a)
console.log('a',a); //1

let b = false
function reverse(parameter) {
    parameter = !parameter
    console.log(parameter); //true
}
reverse(b)
console.log('b',b); //false

/**
 * 综上 在参数为原始值类型时，传递的时参数的值
 * 参数在函数内的行为不会影响函数外的变量
 */


//引用值
let obj = {
    name: "hsh",
    age:25
}

function addAge(parameter) {
    parameter.age ++
    // console.log('parameter',parameter);
}
addAge(obj)
// console.log('obj',obj);
