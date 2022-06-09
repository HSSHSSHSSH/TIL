const obj = {
    foo:1
}

function myGet(obj) {
    const res = Reflect.get(obj,"foo") 
    return res
}

function mySet(key,value) {
    const res = Reflect.set(obj,key,value)
    return res
}

console.log(myGet(obj));

console.log(mySet("fee",2))