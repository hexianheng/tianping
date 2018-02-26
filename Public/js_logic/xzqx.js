
//获取用户列表
var userId = getCookie("userId")
var token = getCookie("token")

if(userId == "" || token == ""){
	parent.location.href = CONFIG['path'] + 'Index/Login';
}else{
	ajax("/User/getPId",{"userId":userId,"token":token},function(result){

		//console.log(result)
		var html = "";
		$.each(result["data"], function(idx, obj) {
				 html += "<option value = '"+ obj.id +"'>" + obj.name +"</option>";
				//alert();
			});
		$("#select_parent").html(html);
		
    });
}


$("#button").click(function(){

	var permissionName = $("#permissionName").val();
	var actionName = $("#actionName").val();
	var functionName = $("#functionName").val();
	var permissionPId = $("#select_parent").val();
	var type = $("#type").val();

	ajax("/User/addPermission",{"userId":userId,"token":token,"permissionPId":permissionPId,"actionName":actionName,"functionName":functionName,"permissionName":permissionName,"type":type},function(result){

		if(result['code'] == 0 ){
			alert(result["msg"])
			location.reload();
		}
		
    });
})
