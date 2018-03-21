/**
 * 借助lodash库提供的柯里化函数生成器
 */
var curry = require("lodash").curry;

//将原始match函数柯里化
var match = curry(function(what, str){
    return str.match(what);
});

//将原始replace函数柯里化
var replace = curry(function(what, replacement, str){
    return str.replace(what, replacement);
});

//将原始filter函数柯里化
var filter = curry(function(f, ary){
    return ary.filter(f);
});

//将原始map函数柯里化
var map = curry(function(f, ary){
    return ary.map(f);
});

//开始测试（可以将匹配空格的正则，换成匹配字母：例如o，看的结果更清楚一些）
console.log("match1: " + match(/\s+/g, "hello world")); //传满2个参数
console.log("match2: " + match(/\s+/g)("hello world")); //每次只传1个参数

var hasSpaces = match(/\s+/g);
console.log("match3: " + hasSpaces("hello world")); //分开调用，复用第一步的结果函数
console.log("match4: " + hasSpaces("spaceless")); 

console.log("filter1: " + filter(hasSpaces, ["tori_spelling", "tori amos"]));

var findSpaces = filter(hasSpaces); //分开调用，复用第一步的结果函数
console.log("filter2: " + findSpaces(["tori_spelling", "tori amos"]));

var noVowels = replace(/[aeiou]/ig);    //分开3步执行的柯里化
var censored = noVowels("*");
console.log("replace: " + censored("Chocolate Rain"));