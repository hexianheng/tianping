//修改密码
var userId = getCookie("userId");
var token = getCookie("token");

if(userId == "" || token == ""){
	parent.location.href = CONFIG['path'];
}

function pwdOld(){
	var pwdOld = $("#pwdOld").val();
	if(pwdOld == ""){
		$("#msg_old").html("不能为空").css("color","red");
		return false;
	}else{
		$("#msg_old").html("√").css("color","green");
		return true;
	}
}

function password(){
	var password = $("#password").val();
	if(password == ""){
		$("#msg_new").html("不能为空").css("color","red");
		return false;
	}else{
		$("#msg_new").html("√").css("color","green");
		return true;
	}
}

function pwdAgain(){
	var pwdAgain = $("#pwdAgain").val();
	var password = $("#password").val();
	if(pwdAgain == ""){
		$("#msg_Again").html("不能为空").css("color","red");
		return false;
	}else{
		if(password != pwdAgain){
			$("#msg_Again").html("新旧密码不一致").css("color","red");
			return false;
		}else{
			$("#msg_Again").html("√").css("color","green");
			return true;
		}
	}
}

function phone(){
	var phone = $("#phone").val();
	if(phone == ""){
		$("#msg_phone").html("不能为空").css("color","red");
		return false;
	}else{
		if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(phone))){
			$("#msg_phone").html("不是完整的11位手机号或者正确的手机号前七位").css("color","red");
			return false;
		}else{
			$("#msg_phone").html("√").css("color","green");
			return true;
		}

	}
}

function code(){
	var code = $("#code").val();
	if(code == ""){
		$("#msg_code").html("不能为空").css("color","red");
		return false;
	}else{
		var num = $.session.get('num');
		if(code != num){
			$("#msg_code").html("验证码输入有误").css("color","red");
			return false;
		}else{
			$("#msg_code").html("√").css("color","green");
			return true;
		}
	}
}

$("#btns").click(function(){
    codes();
	ajax("/User/getOneUser",{"userId":userId,"token":token,"id":userId},function(result){
		var phone = result['data']['phone'];
		ajax("/Login/sendPhoneCheck",{"phone":phone},function(results){
			alert("已发送至您的手机，请注意查收")
			$.session.set('num',results["data"]["num"]);
			//setCookie("num",results["data"]["num"],3600);
		});
	});

});

$("#submit").click(function(){

		var pwdOlds = pwdOld();
		var passwords = password();
		var pwdAgains = pwdAgain();
		var codes = code();
		if(pwdOlds == false || passwords == false || pwdAgains == false || codes == false){
			return false;
		}else{
			var pwd_Old = $("#pwdOld").val();
			var pwd = $("#password").val();
			var pwd_Again = $("#pwdAgain").val();
			ajax("/user/updPwd",{"userId":userId,"token":token,"pwdOld":pwd_Old,"password":pwd,"pwdAgain":pwd_Again},function(result){
				if(result["code"] == 0){
					alert("修改成功")
					parent.location.href = CONFIG['path'] + 'Index/Login';
				}
			});
		}

});

/*验证码倒计时读秒*/
var sleep = 60, interval = null;
function codes()
{
	var btns = document.getElementById ('btns');
	if (!interval)
	{
		btns.style.backgroundColor = 'rgb(127, 127, 127)';
		btns.disabled = "disabled";
		btns.style.cursor = "wait";
		btns.value = "重新发送 (" + sleep-- + ")";
		interval = setInterval (function ()
		{
			if (sleep == 0)
			{
				if (!!interval)
				{
					clearInterval (interval);
					interval = null;
					sleep = 60;
					btns.style.cursor = "pointer";
					btns.removeAttribute ('disabled');
					btns.value = "获取验证码";
					btns.style.backgroundColor = '';
				}
				return false;
			}
			btns.value = "重新发送 (" + sleep-- + ")";
		}, 1000);
	}
}


