/**
 * 函数式的代码组合
 */

var curry = require("lodash").curry;

var compose = function(f, g){
    return function(x){
        return f(g(x));
    }
}

var reduce = curry(function(f, init, arr){
    return arr.reduce(f, init);
});

var toUpperCase = function(x){
    return x.toUpperCase();
};

var exclaim = function(x){
    return x + "!";
};

var shout = compose(exclaim, toUpperCase);  //组合了上面2个函数，但是有顺序要求（从右往左）

//开始测试
//console.log(shout("for the horde"));    //shout变成了接受1个字符串参数的函数 */

var head = function(x){
    return x[0];
};

var reverse = reduce(function(acc, x){
                return [x].concat(acc);
              }, []);

var last = compose(head, reverse);

//开始测试
//console.log(last(['jumpkick', 'roundhouse', 'uppercut']));

//任意组合，并未给出compose无限参数版本的例子，只有人工嵌套
var lastUpper = compose(toUpperCase, compose(head, reverse));
console.log(lastUpper(['jumpkick', 'roundhouse', 'uppercut']));