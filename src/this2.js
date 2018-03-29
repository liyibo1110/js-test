//测试this在循环内部的特性
requirejs.config({
    paths: {
      jquery: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min'
    }
  });
  
require([
      'jquery'
    ],
    function ($) {
        var pages = {};

        //构建对象数组
        for(let i = 1 ; i<=5; i++){
            pages[i] = {
                value : (i + " page")
            }
        }

        //普通循环打印输出
        for(let i = 1 ; i<=5; i++){
            console.log(pages[i].value);
        }

        //利用JQuery的循环
        $.each(pages, function(page){
            //重点是，这里面的this，指带的是pages
            console.log("this: " + this.value);
        })
});



