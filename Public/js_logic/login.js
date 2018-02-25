//登陆

$("#button").click(function(){
    var uname = $("#username").val();
    var pwd = $("#userpwd").val();
    ajax("/login/login",{"userName":uname,"password":pwd},function(result){
        setCookie("userId",result["data"]["id"])
        setCookie("token",result["data"]["token"])
        setCookie("uname",result["data"]["uname"])
        setCookie("roleName",result["data"]["roleName"])
        userId = getCookie("userId")
        token = getCookie("token")
        console.log(result)
        if(userId != "" && token != ""){
            location.href=CONFIG['path'] + "Index/tianping";
        }
    });
}) 
        
