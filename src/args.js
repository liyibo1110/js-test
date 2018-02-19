/**
 * 将类数组的对象，转换成真正数组的例子，这样就可以使用Array类的方法了
 */
function mix(target, source){
    console.log("target: " + target);
    console.log("source: " + source);
    //返回false，arguments并不是数组
    console.log(arguments instanceof Array);
    //将返回true，arguments已变成正式的数组
    var args = [].slice.call(arguments);
    console.log(args instanceof Array);
}

mix("abc", "123");