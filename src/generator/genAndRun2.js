function run(gen){
    //要除了gen后面的所有参数
    let args = [].slice.call(arguments, 1);
    let it = gen.apply(this, args);
    return Promise.resolve()
        .then(function handleNext(value){
            //console.log("value: " + value);
            let next = it.next(value);
            //console.log("next.value: " + next.value);
            return (function handleResult(next){
                if(next.done){
                    //console.log("next.value: " + next.value);
                    return next.value;
                }else{
                    //console.log("next.value: " + next.value);
                    //console.log("继续运行");
                    return Promise.resolve(next.value)
                        .then(
                            //如果决议成功，则递归调用
                            handleNext,
                            //如果决议错误，则把错误传回生成器进行出错处理
                            function handleErr(err){
                                return Promise.resolve(
                                    it.throw(err)
                                ).then(handleResult);
                            }
                        );
                }
            })(next);
        });
}  

/**
 * 模拟ajax调用
 */
function ajaxMock(url, callback){
    console.log("ajax run, url is " + url);
    //设定随机数(0或者1)
    setTimeout(function(){
        //let result = Math.floor(Math.random()*2);
        let result = 1; //强制成功
        if(result === 1){
            //callback(null, "result data");
            callback("result data");
        }else{
            callback(new Error("failed"));
        }
    }, 1000);
}

function request(url){
    return new Promise(function(resolve, reject){
        ajaxMock(url, resolve);
    });
}

function *main(){
    try{
        let texts = yield Promise.all([
            request("http://test.com"),
            request("http://test2.com")
        ]);
        let text = texts[0];
        let text2 = texts[1];

        let result = yield request("http://test3.com/?text=" + text + "," + text2)
        console.log(result);
    }catch(err){
        console.error(err);
    }
}

//实际使用
run(main);

