//函数式容器相关
var _ = require("ramda");

//自定义柯里化的concat
var concat = _.curry(function(arrayX, arr){
    return arr.concat(arrayX);
}); 

//定义容器，只有一个__value属性用来封装各种类型的值
var Container = function(x){
    this.__value = x;
}

//自定义of方法，相当于构造函数
Container.of = function(x){
    return new Container(x);
}

//自定义map遍历的函数
Container.prototype.map = function(f){
    return Container.of(f((this.__value)));
}

//开始测试
console.log(Container.of(2).map(function(two){
    return two + 2;
}));    //输出应为{ __value: 4 }

console.log(Container.of("hello world").map(function(s){
    return s.toUpperCase();
}));    //输出应为{ __value: 'HELLO WORLD' }

//输出应为{ __value: 10 }
console.log(Container.of("bombs").map(concat(" away")).map(_.prop("length"))); 