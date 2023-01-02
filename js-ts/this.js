const global = this
//解构之后 this指向变更
const obj = {
    val: 0,
    increment() {
        console.log('obj',obj);
        console.log('this',this);
        console.log('global',global);
    }
}

obj.increment()

const {increment} = obj

increment()