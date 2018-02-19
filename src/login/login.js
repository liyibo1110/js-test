/** 
 * 模拟了登录验证相关的组件（委托版本） 
 */

//直接定义login对象，不构建父类对象
var LoginController = {
    errors : [],
    getUser : function(){
        return document.getElementById("login_username").value;
    },
    getPassword : function(){
        return document.getElementById("login_password").value;
    },
    validateEntry : function(user, pw){
        let user = user || this.getUser();
        let pw = pw || this.getPassword();
        if(!(user && pw)){
            return this.failure("Please enter a username & password!");
        }else if(user.length < 5){
            return this.failure("Password must be 5+ characters!");
        }
    },
    showDialog : function(title, msg){
        console.log("title: " + title);
        console.log("msg: " + msg);
    },
    failure : function(err){
        this.showDialog("ERROR", "Login invalid: " + err);
    }
};

//定义另一个验证组件
var AuthController = Object.create(LoginController);
AuthController.errors = [];
//定义自有的函数
AuthController.checkAuth = function(){
    let user = this.getUser();
    let pw = this.getPassword();
    if(this.validateEntry(user, pw)){
        this.server("/check-auth", {
            username : user,
            password : pw
        })
        .then(this.accepted.bind(this))
        .fail(this.rejected.bind(this));
    }
};
AuthController.server = function(url, data){
    return $.ajax({
        url : url,
        data : data
    });
};
AuthController.accepted = function(){
    this.showDialog("SUCCESS", "Authenticated!");
};
AuthController.rejected = function(){
    this.failure("Auth Failed: " + err);
};

//开始使用
AuthController.checkAuth();