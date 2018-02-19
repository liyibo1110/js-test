/**
 * 单纯利用委托实现的“类继承”，最清晰简明的写法
 */

 var Foo = {
    init : function(who){
        this.me = who;
    },
    identify : function(){
        return "I am " + this.me;
    }
 };

 var Bar = Object.create(Foo);
 Bar.speak = function(){
     console.log("Hello, " + this.identify() + ".");
 }

 var b1 = Object.create(Bar);
 b1.init("b1");
 b1.speak();
 var b2 = Object.create(Bar);
 b2.init("b2");
 b2.speak();