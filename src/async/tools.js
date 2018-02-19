/**
 * 为回调函数提供超时封装功能，用在异步函数调用中
 */
function timeoutify(fn, delay){
    let t = setTimeout(function(){
        t = null;
        fn(new Error("timeout!"));
    }, delay);

    return function(){
        //还没有超时
        if(t){
            clearTimeout(t);
            fn.apply(this, arguments);
        }
    } 
}

//实际使用实例，注意传入的callback是函数调用而不是函数名，函数名在内部返回
setTimeout(timeoutify(function(err, data){
    if(err){
        console.error(err);
    }else{
        console.log(data);
    }
}, 5000), 4000); 

/**
 * 将函数强制变为异步函数
 */
function asyncify(fn){
    let originFn = fn;
    let t = setTimeout(function(){
        t = null;
        if(fn){
            fn();   //这里的调用，对应后面if(t)的进入，会修改fn
        }
    }, 0);

    fn = null;

    return function(){
        //setTimeout如果都没执行完
        if(t){
            //目的是让调用无参fn变成有参数的originFn
            fn = originFn.bind.apply(originFn, 
                [this].concat([].slice.call(arguments)));
        }else{
            originFn.apply(this, arguments);
        }
    }
}