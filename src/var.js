//JS的变量只有全局作用域和函数作用域，并没有块级作用域（直到let的出现）

for(var i = 0; i < 5 ; i++){
    console.log("i: " + i);
}

//离开了for，还是可以访问到i，因为被提升为全局变量了
console.log("i: " + i);

function foo(){
    for(var j = 0; j < 5 ; j++){
        console.log("j: " + j);
    }
    //离开了for，还是可以访问到j，因为被提升为函数级的变量了
    console.log("j: " + j);
    console.log("变量j未定义？" + (typeof j === 'undefined'));
}

foo();

//在这里才访问不到j
console.log("变量j未定义？" + (typeof j === 'undefined'));