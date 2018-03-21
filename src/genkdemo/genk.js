/**
 * demo程序，打开index.html页面，会自动去genk.io爬行特定网址的所有图片并解析，最后显示在我们的页面中
 */

requirejs.config({
    paths: {
      ramda: 'https://cdnjs.cloudflare.com/ajax/libs/ramda/0.13.0/ramda.min',
      jquery: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min'
    }
  });
  
require([
      'ramda',
      'jquery'
    ],
    function (_, $) {
      var trace = _.curry(function(tag, x) {
        console.log(tag, x);
        return x;
      });
    //以下是应用代码
      
    //将非纯函数单独标识出来，搞到一起
    var Impure = {
        getJSON: _.curry(function(callback, url){
            $.getJSON(url, callback);
        }),
        setHtml: _.curry(function(sel, html){
            $(sel).html(html);
        })
    };

    var url = function(page){
        return "http://gank.io/api/data/%E7%A6%8F%E5%88%A9/10/" + page;
    }

    //var srcs = _.compose(_.map(_.prop("url")), _.prop("results"));

    var img = function(url){
        return $('<img />', {src : url});
    }

    //var images = _.compose(_.map(img), srcs);
    
    //可以直接搞一大串，ramda.js提供的compose函数也是从右向左执行的
    var renderImages = _.compose(Impure.setHtml("body"), _.map(img), _.map(_.prop("url")), _.prop("results"));
    //var app = _.compose(Impure.getJSON(trace("response")), url);
    
    var app = _.compose(Impure.getJSON(renderImages), url);

    //启动应用
    app("2");
});