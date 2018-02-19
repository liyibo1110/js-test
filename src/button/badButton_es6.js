/**
 * 利用“类”的方式来实现Button组件（ES6版）
 */

import $ from "jquery"

class Widget{
    constructor(width, height){
        this.width = width || 50;
        this.height = height || 50;
        this.$elem = null;
    }
    render($where){
        if(this.$elem){
            this.$elem.css({
                width : this.width + "px",
                height : this.height + "px"
            }).appendTo($where);
        }
     }
}

class Button extends Widget{
    constructor(width, height, label){
        //调用父类构造函数
        super(width, height);
        this.label = label || "default";
        this.$elem = $("<button>").text(this.label);
    }
    render($where){
       //先调用父类
        super($where);
        this.$elem.click(this.onClick.bind(this));
    }
    onClick(event){
        console.log("Button '" + this.label + "' clicked!");
    }
}

//实际使用
$(document).ready(function(){
     let $body = $(document.body);
     let button1 = new Button(125, 30, "hello");
     let button2 = new Button(150, 40, "world");
     button1.render($body);
     button2.render($body);
});