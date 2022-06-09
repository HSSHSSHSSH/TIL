let target = {
    foo: 1
}

const arr = []
arr.push(target)
arr[0].foo = 2
console.log(arr);
console.log(target);