/**
 * gen版的生成器
 */

 function *something(){
    
    try{
        let nextVal; 
        while(true){
            if(nextVal === undefined){
                nextVal = 1;
            }else{
                nextVal = (nextVal * 3) + 6;
            }
            yield nextVal;
        }
    }finally{
        console.log("清理完成");
    }
    
 }

 //实际使用
 let it = something();
 for(let v of it){
     console.log(v);
     if(v > 500){
         //break;
         console.log(it.return("Hello").value);
     }
 }