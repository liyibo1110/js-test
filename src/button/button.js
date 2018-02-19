/**
 * 利用委托，而不是类定义的方式来实现Button组件
 */

import $ from "jquery"

 //定义父级对象
 var Widget = {
     init : function(width, height){
        this.width = width || 50;
        this.height = height || 50;
        this.$elem = null;
     },
     insert : function($where){
        if(this.$elem){
            this.$elem.css({
                width : this.width + "px",
                height : this.height + "px"
            }).appendTo($where);
        }
     } 
 };

 var Button = Object.create(Widget);
 
 Button.setup = function(width, height, label){
    //调用父类构造函数
    this.init(width, height);
    this.label = label || "default";
    this.$elem = $("<button>").text(this.label);
 };
 
 Button.build = function($where){
    //先调用父类
    this.insert($where);
    this.$elem.click(this.onClick.bind(this));
 }
 
 Button.onClick = function(event){
     console.log("Button '" + this.label + "' clicked!");
 }

 //实际使用
 $(document).ready(function(){
     let $body = $(document.body);
     let button1 = Objects.create(Button);
     button1.setup(125, 30, "hello");
     let button2 = Objects.create(Button);
     button2.setup(150, 40, "world");
     button1.build($body);
     button2.build($body);
});