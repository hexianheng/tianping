//修改密码
var userId = getCookie("userId");
var token = getCookie("token");

if(userId == "" || token == ""){
	parent.location.href = CONFIG['path'] + 'Index/Login';
}

function pwdOld(){
	var pwdOld = $("#pwdOld").val();
	if(pwdOld == ""){
		$("#msg_old").html("不能为空").css("color","red");
		return false;
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

$("#submit").click(function(){
	var pwdOlds = pwdOld();
	var passwords = password();
	var pwdAgains = pwdAgain();
	if(pwdOlds == false || passwords == false || pwdAgains == false){
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
			//console.log(result);
		});
	}
});



