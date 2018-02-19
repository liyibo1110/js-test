/**
 * 寄生继承（显式混入的一种变体）
 */

function Vehicle(){
    this.engines = 1;
}

Vehicle.prototype.ignition = function(){
    console.log("Turning on my engine.");
}

Vehicle.prototype.drive = function(){
    this.ignition();
    console.log("Steering and moving forward!");
}

function Car(){
    let car = new Vehicle();
    //增加自己的属性
    car.wheels = 4;
    //保存父类的drive
    let vehicleDrive = car.drive;
    //重新定义子类的drive
    car.drive = function(){
        vehicleDrive.call(this);
        console.log("Rolling on all " + this.wheels + " wheels!");
    }
    
    return car;
}

//实际应用
let car = new Car();
car.drive();