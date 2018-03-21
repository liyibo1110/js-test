//函数式容器相关
var _ = require("ramda");

//将原始match函数柯里化
var match = _.curry(function(what, str){
    return str.match(what);
});

//自定义柯里化函数add，只是简单的相加
var add = _.curry(function(x, y){
    return x + y;
});

//定义容器，只有一个__value属性用来封装各种类型的值
var Maybe = function(x){
    this.__value = x;
}

//自定义of方法，相当于构造函数
Maybe.of = function(x){
    return new Maybe(x);
}

Maybe.prototype.isNothing = function(){
    return (this.__value === null || this.__value === undefined);
}

//自定义map遍历的函数，和Container容器相比，只是多了一个对null参数的额外处理
Maybe.prototype.map = function(f){
    return this.isNothing() ? Maybe.of(null) : Maybe.of(f((this.__value)));
}

//将map本身也柯里化，不然没法在compose里面使用
var map = _.curry(function(f, functor){
    return functor.map(f);
});

//开始测试
//传入正常的参数，输出__value: [ 'a', 'a' ]
console.log(Maybe.of("Malkovich Malkovich").map(match(/a/ig)));
//传入null，输出__value: null
console.log(Maybe.of(null).map(match(/a/ig)));
//传入对象，但是没有age属性，__value: null
console.log(Maybe.of({name : "liyibo"}).map(_.prop("age")).map(add(10)));
//传入对象，这次带了age属性，__value: 42
console.log(Maybe.of({name : "liyibo", age : 32}).map(_.prop("age")).map(add(10)));

//第二轮实例

//返回的是封装好的容器，而不是一个具体的原始值了
var safeHead = function(xs){
    return Maybe.of(xs[0]);
}

//3步由右向左的传递，注意到safeHead之后，值被封装成了Maybe容器了，所以要用map才能解开
var streetName = _.compose(map(_.prop("street")), safeHead, _.prop("addresses"));

//开始测试
//内部数组为0元素，输出__value: null
console.log(streetName({addresses : []}));
//内部数组有1元素，输出__value: 'beijing'
console.log(streetName({addresses : [{street: "beijing", number : 100038}]}));

//第三轮实例
var withdraw = _.curry(function(amount, account){
    return account.balance >= amount 
        ? Maybe.of({balance: account.balance - amount}) 
        : Maybe.of(null);
})

//自己乱实现的，只是取里面的特定属性值
var updateLedger = _.curry(function(account){
    return account["balance"];
})

//自己乱实现的，只是追加了字符串的固定前缀
var remainingBalance = _.curry(function(balance){
    return "Your balance is $" + balance;
}) 

var finishTransaction = _.compose(remainingBalance, updateLedger);

var getTwenty = _.compose(map(finishTransaction), withdraw(20));

//增加一个maybe函数，用来返回当值为空时，直接返回的信息（类似scala的Option）
var maybe = _.curry(function(x, f, m){
    return m.isNothing() ? x : f(m.__value);
});

var getTwenty2 = _.compose(maybe("You're broke!", finishTransaction), withdraw(20));

//开始测试
//输出__value: 'Your balance is $180'
console.log(getTwenty({balance : 200.00}));
//输出__value: null 
console.log(getTwenty({balance : 0.00}));
//输出__value: 'Your balance is $180'
console.log(getTwenty2({balance : 200.00}));
//输出You're broke! 
console.log(getTwenty2({balance : 0.00}));

