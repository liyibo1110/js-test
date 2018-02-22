//简单生成器（外界往函数里传值）
function *foo(x){
    let y = x * (yield);
    return y;
}

//开始使用
let it = foo(6);
it.next();  //只是启动
let result = it.next(7);
console.log("result.value: " + result.value);