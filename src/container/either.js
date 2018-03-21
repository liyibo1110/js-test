//函数式容器相关（分支，取代了意义不明确的Maybe(null)）
var _ = require("ramda");
var moment = require("moment");

var Left = function(x){
    this.__value = x;
}

Left.of = function(x){
    return new Left(x);
}

Left.prototype.map = function(f){
    return this;
}

var Right = function(x){
    this.__value = x;
}

Right.of = function(x){
    return new Right(x);
}

Right.prototype.map = function(f){
    return Right.of(f(this.__value));
}

//自定义柯里化函数add，只是简单的相加
var add = _.curry(function(x, y){
    return x + y;
});

//自定义柯里化的concat
var concat = _.curry(function(arrayX, arr){
    return arrayX.concat(arr);
});  

//将map本身也柯里化，不然没法在compose里面使用
var map = _.curry(function(f, functor){
    return functor.map(f);
});

//开始测试
//输出Right { __value: 'brain' }
console.log(Right.of("rain").map(function(str){
    return "b" + str;
}));  
//输出Left { __value: 'rain' }（因为map不做任何处理）
console.log(Left.of("rain").map(function(str){
    return "b" + str;
})); 
//输出Right { __value: 'localhost' }
console.log(Right.of({host : "localhost", port : 80}).map(_.prop("host")));
//输出Left Left { __value: 'hello world' }（因为map不做任何处理）
console.log(Left.of("hello world").map(_.prop("host")));

//第二轮实例
var getAge = _.curry(function(now, user){
    let b = moment(user.birthdate, "YYYY-MM-DD");
    if(!b.isValid()){
        return Left.of("Birth date could not be parsed");
    }else{
        return Right.of(now.diff(b, "years"));
    }
});

//开始测试
//输出Right { __value: 32 }
console.log(getAge(moment(), {birthdate : "1985-11-10"}));
//输出Left { __value: 'Birth date could not be parsed' }
console.log(getAge(moment(), {birthdate : "your dad"}));

//第三轮实例
var fortune = _.compose(concat("If you survive, you will be "), add(1));
//console.log.bind(console);
var zoltar = _.compose(map(console.log), map(fortune), getAge(moment()));

//开始测试
//输出If you survive, you will be 33
zoltar({birthdate : "1985-11-10"});
//无输出，因为返回的是Left，在map里的所有操作都将被直接返回原值
zoltar({birthdate : "your dad"});

//第四轮实例
//类似maybe函数
var either = _.curry(function(f, g, e){
    switch(e.constructor){
        case Left : return f(e.__value);
        case Right : return g(e.__value);      
    }
});

var id = _.curry(function(x){
    return x;
});

//显式的表达了当getAge返回Left还是Right类型后，明确下一步调用，是用id还是fortune
var zoltar2 = _.compose(console.log, either(id, fortune), getAge(moment()));

//开始测试
console.log("");
//输出If you survive, you will be 33
zoltar2({birthdate : "1985-11-10"});
//无输出，因为返回的是Left，在map里的所有操作都将被直接返回原值
zoltar2({birthdate : "your dad"});