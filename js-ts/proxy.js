const obj1 = {
  count: 1,
  print: () => console.log('obj1中的方法')
}
const obj2 = {
  count: 2
}

let proxy = new Proxy(obj1, {
  get (target, key) {
    console.log(target, key, '拦截')
    console.log(this, 'this')
  }
})

proxy.count