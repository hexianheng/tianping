
//获取用户列表
var userId = getCookie("userId")
var token = getCookie("token")

if(userId == "" || token == ""){
	parent.location.href = CONFIG['path'] + 'Index/Login';
}else{
	ajax("/User/getPermission",{"userId":userId,"token":token},function(result){

		console.log(result)
		
		
    });
}
