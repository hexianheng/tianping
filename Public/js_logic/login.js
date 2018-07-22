//登陆
$("#button").click(function(){
    var uname = $("#username").val();
    var pwd = $("#userpwd").val();
    var reg = /^[\u4e00-\u9fa5]+$/;
    var unamecheck = reg.test(uname);
    if(uname=="" && pwd==""){
        alert("用户名与密码不能同时为空")
    }else{
        if(uname==""){
            alert("用户名不能为空")
        }
        if(pwd==""){
            alert("密码不能为空")
        }else{
            if(unamecheck==false){
                alert("用户名必须为汉字")
            }else{
                ajax("/Login/login",{"userName":uname,"password":pwd},function(result){
                    setCookie("userId",result["data"]["id"],1);
                    setCookie("token",result["data"]["token"],1);
                    setCookie("uname",result["data"]["uname"],1);
                    setCookie("roleName",result["data"]["roleName"],1);
                    userId = getCookie("userId");
                    token = getCookie("token");
                    if(userId != "" && token != ""){
                        if(result["data"]["repwd"] == '0'){
                            location.href=CONFIG['path'] + "Index/startUpPwd";
                        }else{
                            location.href=CONFIG['path'] + "Index/tianping";
                        }
                    }
                });
            }
        }
    }
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

        
