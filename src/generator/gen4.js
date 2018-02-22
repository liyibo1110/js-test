/** 
 *  非gen版的原生生成器 
 */

let gimmeSomething = (function(){
    let nextVal;
    
    return function(){
        if(nextVal === undefined){
            nextVal = 1;
        }else{
            nextVal = (nextVal * 3) + 6;
        }
        return nextVal;
    }
}());

console.log("gimmeSomething call");
console.log(gimmeSomething());
console.log(gimmeSomething());
console.log(gimmeSomething());
console.log(gimmeSomething());

let something = (function(){
    let nextVal;
    
    return {
        [Symbol.iterator] : function(){return this;},
        next : function(){
            if(nextVal === undefined){
                nextVal = 1;
            }else{
                nextVal = (nextVal * 3) + 6;
            }
            return {
                done : false,
                value : nextVal
            }
        }
    }
}());

/* console.log("something call");
console.log(something.next().value);
console.log(something.next().value);
console.log(something.next().value);
console.log(something.next().value); */

console.log("something for call");
for(let v of something){
    console.log(v);
    if(v > 500){
        break;
    }
}
