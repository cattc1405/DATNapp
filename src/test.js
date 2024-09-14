let obj = { a: 1, b: 2 };
let clone = Object.assign({}, obj);
clone.a = 3;
console.log(obj.a);