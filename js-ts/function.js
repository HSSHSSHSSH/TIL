function fn(a) {
    console.log(this.name);
    console.log(a);
}

const obj = {
    name: "hsh"
}

fn.call(obj,obj)