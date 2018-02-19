//简易模块封装器
var moduleManager = (function(){
    let modules = [];
    function define(name, deps, impl){
        //由deps的name获取实例
        for(let i = 0; i < deps.length; i++){
            //直接修改deps里面的内容，由name改成存实例
            deps[i] = modules[deps[i]];
        }
        //立即调用impl函数，将返回对象存入集合
        modules[name] = impl.apply(impl, deps);
    }
    function get(name){
        return modules[name];
    }
    return{
        define : define,
        get : get
    };
})();

moduleManager.define("bar", [], function(){
    function hello(who){
        return "hello, I'm " + who;
    }
    return {
        hello : hello
    };
});

moduleManager.define("foo", ["bar"], function(bar){
    let hungry = "hippo";
    function awesome(){
        console.log(bar.hello(hungry).toUpperCase());
    }
    return {
        awesome : awesome
    };
})

let bar = moduleManager.get("bar");
let foo = moduleManager.get("foo");
console.log(bar.hello("hippo"));
foo.awesome();