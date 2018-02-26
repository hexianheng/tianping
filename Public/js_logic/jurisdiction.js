
//获取用户列表
var userId = getCookie("userId")
var token = getCookie("token")

if(userId == "" || token == ""){
	parent.location.href = CONFIG['path'] + 'Index/Login';
}else{
	ajax("/User/userRoleList",{"userId":userId,"token":token},function(result){
			
			var Count = result["data"].length;
			$("#count").text(Count);

	        var html = "";
			$.each(result["data"], function(idx, obj) {
				 html += "<tr><td>" + obj.userId + "</td>";
				 html += "<td>" + obj.uname + "</td>";
				 html += "<td>" + obj.phone + "</td>";
				 html += "<td>" + obj.email + "</td></tr>";
				
				//alert();
			});
			$("#data").html(html);		
    });
}
