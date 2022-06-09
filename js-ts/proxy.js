const obj1 = {
    count:1
}
const obj2 = {
    count:2
}

let proxy = new Proxy(obj1,{
    get(target,key){
        console.log(target,key);
    }
})

proxy.count