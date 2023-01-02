const arr = [0, 1]

console.log(typeof (arr))

const b = Reflect.get(arr, 1)
console.log('b', b)