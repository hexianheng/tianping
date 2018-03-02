
//获取用户列表
var userId = getCookie("userId")
var token = getCookie("token")

if(userId == "" || token == ""){
	parent.location.href = CONFIG['path'] + 'Index/Login';
}else{
	ajax("/User/getPermission",{"userId":userId,"token":token},function(result){
		var Count = result["data"].length;
		$("#count").text(Count);
		var html = "";
		$.each(result["data"], function(idx, obj) {
			html += "<tr><td>" + obj.id + "</td>";
			html += "<td>" + obj.name + "</td>";
			html += "<td>" + obj.parentId + "</td>";
			html += "<td>" + obj.ctime + "</td>";
			html += '<td><a class="btn04" id="xg_btn">修改</a >  <a class="btn04" onclick="del('+obj.userId+')">删除</a ></td></tr>';

		});
		$("#data").html(html);

		var page = "";
		for (var i = 1;i <= result.maxPage;i++)
		{
			if(i==result.page){
				page += "<a class='pages-current'>" + i +"</a>";
			}else{
				page += "<a>" + i +"</a>";
			}
		}
		$("#page").html(page);
    });
}
