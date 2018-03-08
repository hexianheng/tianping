//登陆

$("#button").click(function(){
    var uname = $("#username").val();
    var pwd = $("#userpwd").val();
    ajaxlogin("/login/login",{"userName":uname,"password":pwd},function(result){
        setCookie("userId",result["data"]["id"])
        setCookie("token",result["data"]["token"])
        userId = getCookie("userId")
        token = getCookie("token")
        if(userId != "" && token != ""){
            location.href=CONFIG['path'] + "Index/tianping";
        }
        //console.log(userId)
        //console.log(token)
    });
}) 
        
