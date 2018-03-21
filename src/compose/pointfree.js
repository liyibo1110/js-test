var curry = require("lodash").curry;

var compose = function(f, g){
    return function(x){
        return f(g(x));
    }
}

//将原始replace函数柯里化
var replace = curry(function(what, replacement, str){
    return str.replace(what, replacement);
});

var join = curry(function(s, str){
    return str.join(s);
});

var split = curry(function(s, str){
    return str.split(s);
});

//将原始map函数柯里化
var map = curry(function(f, ary){
    return ary.map(f);
});

var head = function(x){
    return x[0];
};

var toUpperCase = function(x){
    return x.toUpperCase();
};

var toLowerCase = function(x){
    return x.toLowerCase();
};

//非pointfree版函数定义，需要了解word形参
var snakeCase = function(word){
    return word.toLowerCase().replace(/\s+/ig, "_");
}

//如此定义snakeCase的pointfree版函数定义，不需要了解任何参数
var snakeCasePointFree = compose(replace(/\s+/ig, "_"), toLowerCase);

//第二个例子，非pointfree版
/* var initials = function(name){
    return name.split(' ').map(compose(toUpperCase, head)).join(". ");
} */

var initialsPointFree = compose(map(compose(toUpperCase, head)), split(' '));

//开始测试
//console.log("snakeCase：" + snakeCase("HELLO WORLD!"));
//console.log("snakeCasePointFree: " + snakeCasePointFree("HELLO WORLD!"));

//console.log("initials：" + initials("hunter stockton thompson"));
console.log("initialsPointFree: " + initialsPointFree("hunter stockton thompson"));