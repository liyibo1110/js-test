/** 
 *  模拟了登录验证相关的组件（类继承版本） 
 */

//定义父控制器类
function Controller(){
    this.errors = [];
} 
Controller.prototype.showDialog = function(title, msg){
    console.log("title: " + title);
    console.log("msg: " + msg);
}
Controller.prototype.success = function(msg){
    this.showDialog("SUCCESS", msg);
}
Controller.prototype.failure = function(err){
    this.errors.push(err);
    this.showDialog("ERROR", err);
}

//定义子类
function LoginController(){
    Controller.call(this);
}
LoginController.prototype = Object.create(Controller.prototype);
LoginController.prototype.getUser = function(){
    return document.getElementById("login_username").value;
}
LoginController.prototype.getPassword = function(){
    return document.getElementById("login_password").value;
}
LoginController.prototype.validateEntry = function(user, pw){
    user = user || this.getUser();
    pw =  pw || this.getPassword();
    //有一个为空则进入
    if(!(user && pw)){
        return this.failure("Please enter a username and password")
    }else if(user.length < 5){
        return this.failure("Password must be 5+ characters");
    }
    //到这里说明通过验证
    return true;
}
//重写failure方法
LoginController.prototype.failure = function(err){
    Controller.prototype.failure.call(this, "Login invalid: " + err);
}

//定义子类
function AuthController(login){
    Controller.call(this);
    this.login = login;
}
AuthController.prototype = Object.create(Controller.prototype);
//增加自己的方法
AuthController.prototype.server = function(url, data){
    return $.ajax({
        url : url,
        data : data
    });
}
AuthController.prototype.checkAuth = function(){
    let username = this.login.getUser();
    let pw = this.login.getPassword();
    if(this.login.validateEntry(username, pw)){
        this.server("/check-auth", {
            username : username,
            password : pw
        })
        .then(this.success.bind(this))
        .fail(this.failure.bind(this));
    }
}
//重写success和failure
AuthController.prototype.success = function(){
    Controller.prototype.success.call(this, "Authenticated!");
}
AuthController.prototype.failure = function(){
    Controller.prototype.failure.call(this, "Auth Failed: " + err);
}

//开始使用
var auth = new AuthController(new LoginController());
auth.checkAuth();