//函数式容器相关，不同之处在于__value存的永远是函数
var _ = require("ramda");

var IO = function(f){
    this.__value = f;
};

IO.of = function(x){
    return new IO(function(){
        return x;
    });
};

IO.prototype.map = function(f){
    return new IO(_.compose(f, this.__value));
};

//第一轮实例
//ioWindow里面的__value是个函数，直接调用就会返回全局window对象
var ioGlobal = new IO(function(){
    return global;
}); 

//开始测试
//返回的是个IO对象了
var f = ioGlobal.map(function(g){ return g.process.pid; });
console.log(f.__value());  //需要人工立即调用

var g = ioGlobal.map(_.prop("process")).map(_.prop("pid"));
//里面的value就是一堆compose的嵌套，用()调用就会像多米诺一样依次调用
console.log(g.__value());  //需要人工立即调用
