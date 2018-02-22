//简单生成器（只传参数）
function *foo(x, y){
    return x * y;
}

//实际使用
let it = foo(6, 7);
let result = it.next();
console.log("result.value: " + result.value);
