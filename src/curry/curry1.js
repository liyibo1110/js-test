/**
 * 柯里化基础
 */

 /**
  * 将加法分解成2步
  */
 var add = function(x){
     return function(y){
         return x + y;
     }
 }

 var increment = add(1);    //increment生成了x=1的闭包
 var addTen = add(10);  //addTem生成了x=10的闭包

 console.log(increment(2));
 console.log(addTen(2));
