$("#btn").click(function(){

    var phone = $("#phone").val();
    if(phone ==""){
        alert("请先输入手机号")
    }else{
        if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(phone))){
            alert("不是完整的11位手机号或者正确的手机号前七位");
            parent.location.reload();
            return false;
        }else{
            ajax("/Login/sendPhoneCheck",{"phone":phone},function(result){
                setCookie("num",result["data"]["num"]);
            });
        }
    }

});

$("#submit").click(function(){

        var code = $("#code").val();
        var num = getCookie("num");
        if(code != num){
            alert("验证码输入错误")
        }else{
            var phone = $("#phone").val();
            var pwd = $("#password").val();
            var pwd_Again = $("#pwdAgain").val();
            ajax("/Login/forgotPwd",{"phone":phone,"password":pwd,"pwdAgain":pwd_Again},function(result){
                if(result["code"] == 0){
                    alert("修改成功")
                    parent.location.href = CONFIG['path'] + 'Index/Login';
                }
            });
        }

});
