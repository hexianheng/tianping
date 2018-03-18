//登陆

$("#button").click(function(){
    var uname = $("#username").val();
    var pwd = $("#userpwd").val();
    ajax("/Login/login",{"userName":uname,"password":pwd},function(result){
        setCookie("userId",result["data"]["id"]);
        setCookie("token",result["data"]["token"]);
        setCookie("uname",result["data"]["uname"]);
        setCookie("roleName",result["data"]["roleName"]);
        userId = getCookie("userId");
        token = getCookie("token");
        console.log(result);
        if(userId != "" && token != ""){
            if(result["data"]["repwd"] == '0'){
                location.href=CONFIG['path'] + "Index/startUpPwd";
            }else{
                location.href=CONFIG['path'] + "Index/tianping";
            }
        }
    });
});

$("#btn2").click(function(){

        var userId = getCookie("userId");
        var token = getCookie("token");
        var pwd_Old = $("#pwdOld").val();
        var pwd = $("#password").val();
        var pwd_Again = $("#pwdAgain").val();
        ajax("/user/updPwd",{"userId":userId,"token":token,"pwdOld":pwd_Old,"password":pwd,"pwdAgain":pwd_Again},function(result){
            if(result["code"] == 0){
                location.href=CONFIG['path'] + "Index/tianping";
            }
        });
});

        
