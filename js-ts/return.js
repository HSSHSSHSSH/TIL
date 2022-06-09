const a = true
const b =true
function f1() {
    if(a){
        console.log('11111');
        return
    }
    console.log('1.1.1.1.1');
}

function f2() {
    f1()
    if(b) {
        console.log('222222');
        return
    }
    console.log('2.2.2.2.2');
}

function f3() {
    f2()
    console.log('33333');
}
f3()
//return 对应的是函数 每执行一个return 终止一层函数