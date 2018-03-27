$("#btn").click(function(){

    var phone = $("#phone").val();
    if(phone ==""){
        alert("请先输入手机号");
    }else{
        if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(phone))){
            alert("不是完整的11位手机号或者正确的手机号前七位");
            //parent.location.reload();
            return false;
        }else{
            $("#mpanel4").show();
            $('#mpanel4').slideVerify({
                type : 2,  //类型
                vOffset : 2, //误差量，根据需求自行调整
                vSpace : 5, //间隔
                imgName : ['1.jpg', '2.jpg'],
                imgSize : {
                    width: '370px',
                    height: '200px',
                },
                blockSize : {
                    width: '40px',
                    height: '40px',
                },
                barSize : {
                    width : '370px',
                    height : '40px',
                },
                ready : function() {
                },
                success : function() {
                    //alert('验证成功，添加你自己的代码！');
                    //......后续操作
                    //alert('验证成功，请查看手机验证码！');
                    $("#mpanel4").hide();
                    ajax("/Login/sendPhoneCheck",{"phone":phone},function(result){
                        setCookie("num",result["data"]["num"]);
                    });
                    setInterval(code(),1000);
                },
                error : function() {
//           alert('验证失败！');
                }

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
                    parent.location.href = CONFIG['path'];
                }
            });
        }

});


/*验证码倒计时读秒*/
var sleep = 60, interval = null;
//window.onload = function ()
function code()
{
    var btn = document.getElementById ('btn');
    if (!interval)
    {
        btn.style.backgroundColor = 'rgb(127, 127, 127)';
        btn.disabled = "disabled";
        btn.style.cursor = "wait";
        btn.value = "重新发送 (" + sleep-- + ")";
        interval = setInterval (function ()
        {
            if (sleep == 0)
            {
                if (!!interval)
                {
                    clearInterval (interval);
                    interval = null;
                    sleep = 60;
                    btn.style.cursor = "pointer";
                    btn.removeAttribute ('disabled');
                    btn.value = "获取验证码";
                    btn.style.backgroundColor = '';
                }
                return false;
            }
            btn.value = "重新发送 (" + sleep-- + ")";
        }, 1000);
    }
}