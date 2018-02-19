let myObject = {
    a : 2
};

//in还会根据prototype往上找
console.log("a" in myObject);
console.log("b" in myObject);

//hasOwnProperty则只会找对象本身
console.log(myObject.hasOwnProperty("a"));
console.log(myObject.hasOwnProperty("b"));