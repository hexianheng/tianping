
//获取用户列表
var userId = getCookie("userId")
var token = getCookie("token")

var type = 1;

$('.type').click(function(){
	type = $(this).val();
});
if(userId == "" || token == ""){
	parent.location.href = CONFIG['path'];
}else{
	ajax("/User/getPId",{"userId":userId,"token":token},function(result){
		var html = "";
			html += "<option value = ''>---请选择---</option>";
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

	ajax("/User/addPermission",{"userId":userId,"token":token,"permissionPId":permissionPId,"actionName":actionName,"functionName":functionName,"permissionName":permissionName,"type":type},function(result){

		if(result['code'] == 0 ){
			alert(result["msg"])
			location.href = CONFIG['path']+"Index/qxlb";
		}
		
    });
})
