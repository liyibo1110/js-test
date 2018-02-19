/**
 * 显式混入实现继承
 */

function mixin(source, target){
    for(let key in source){
        if(!(key in target)){
            target[key] = source[key];
        }
    }
    return target;
}

var Vehicle = {
    engines : 1,
    ignition : function(){
        console.log("Turning on my engine.");
    },
    drive : function(){
        this.ignition();
        console.log("Steering and moving forward!");
    }
};

var Car = mixin(Vehicle, {
    wheels : 4,
    //人肉版多态
    drive : function(){
        //先调用父类的drive
        Vehicle.drive.call(this);
        //再执行自己的业务逻辑
        console.log("Rolling on all " + this.wheels + " wheels!");
    }
});