/**
 * 利用“类”的方式来实现Button组件
 */

import $ from "jquery"

 //定义父类
 function Widget(width, height){
     this.width = width || 50;
     this.height = height || 50;
     this.$elem = null;
 }

 //父类方法
 Widget.prototype.render = function($where){
    if(this.$elem){
        this.$elem.css({
            width : this.width + "px",
            height : this.height + "px"
        }).appendTo($where);
    }
 }

 //定义子类
 function Button(width, height, label){
     //调用父类构造函数
     Widget.call(this, width, height);
     this.label = label || "default";
     this.$elem = $("<button>").text(this.label);
 }

//让Button继承Widget
Button.prototype = Object.create(Widget.prototype);

//重写Button的render方法
Button.prototype.render = function($where){
    //先调用父类
    Widget.prototype.render.call(this, $where);
    this.$elem.click(this.onClick.bind(this));
}

//Button自有的onClick方法
 Button.prototype.onClick = function(event){
     console.log("Button '" + this.label + "' clicked!");
 }

 //实际使用
 $(document).ready(function(){
     let $body = $(document.body);
     let button1 = new Button(125, 30, "hello");
     let button2 = new Button(150, 40, "world");
     button1.render($body);
     button2.render($body);
});