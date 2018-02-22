/**
 * 模拟ajax调用
 */
function ajaxMock(url, callback){
    console.log("ajax run, url is " + url);
    //设定随机数(0或者1)
    setTimeout(function(){
        let result = Math.floor(Math.random()*2);
        if(result === 1){
            callback(null, "result data");
        }else{
            callback(new Error("failed"));
        }
    }, 1000);
    
}

/* ajaxMock("http://test.com", function(err, data){
    if(err){
        console.error(err)
    }else{
        console.log(data);
    }
}); */

/**
 * 模拟实际业务
 */

function foo(x, y){
    ajaxMock("http://test.com/?x=" + x + "&y=" + y,
            function(err, data){
                if(err){
                    console.log("err存在");
                    //向*main()抛出错误
                    it.throw(err);
                }else{
                    console.log("err不存在");
                    //用data恢复*main()
                    it.next(data);
                }
            });
}

function *main(){
    try{
        let text = yield foo(11, 31);
        console.log(text);
    }catch(err){
        console.error(err);
    }

}

var it = main();
it.next();

