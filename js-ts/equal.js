// const a = 1
// const b = 1
// const obj1 = {
//     num:1
// }
// const obj2 = {
//     num: 1 
// }
// const obj3 = obj1


// function equal(a,b) {
//     console.log(a == b);
//     console.log(a === b);
//     console.log(Object.is(a,b));
//     console.log('----');
// }

// function isEqualObj(obj) {
//     console.log(typeof(obj) ,typeof(obj1));
//     console.log(obj1,obj);
//     console.log(obj1 == obj);
//     console.log(obj1 === obj);
//     console.log(Object.is(obj1,obj));
// }

// equal(a,b)
// equal(obj1,obj2)
// equal(obj2,obj3)
// equal(obj1,obj3)

// isEqualObj({num:1})

class RefImpl {
    _value
     deps
    constructor(value) {
        this._value = value
        this.deps = new Set()
    }
 
    get value() {
        return this._value
    }
 
    set value(newValue) {
        console.log(Object.is(newValue,this._value));
        
        if(Object.is(newValue,this._value)) return //The Object.is() method determines whether two values are the same value.
       this._value = newValue
    }
 }

 const r = new RefImpl({
     num:1
 })

 console.log(r.value);
 
 r.value = {
     num:1
 }

 const t = new RefImpl(2)
 console.log(t.value);
 t.value = 2

 console.log('----',{num:1}.toString() == {num:1}.toString(),5==5);//??