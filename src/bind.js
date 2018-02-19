function foo(){
    console.log(this.a);
}

var obj = {
    a: 2
};

let bar = function(){
    return foo.apply(obj, arguments);
}

setTimeout(bar, 1000);