// function fn(a) {
//     console.log(this.name);
//     console.log(a);
// }

// const obj = {
//     name: "hsh"
// }


// fn()

function fn(a,b) {
    console.log('123123',this);
    console.log('a',a,'b',b);
}

fx = fn.bind(null,1)

fx()