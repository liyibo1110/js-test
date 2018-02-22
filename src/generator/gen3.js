//简单生成器（双向传值）
function *foo(x){
    let y = x * (yield "hello");
    return y;
}

//开始使用
let it = foo(6);
let result = it.next();  //只是启动，但是会返回yield传出的消息
console.log("result.value: " + result.value);
result = it.next(7);
console.log("result.value: " + result.value);