
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
				if(obj.sex == '1'){
					html += "<td>男</td>";
				}else{
					html += "<td>女</td>";
				}
				 html += "<td>" + obj.channelName + "</td>";
				 html += "<td>" + obj.job + "</td>";
				 html += "<td>" + obj.roleName + "</td>";
				 html += "<td>" + obj.phone + "</td>";
				 html += "<td>" + obj.email + "</td>";
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

$("#last_page").click(function(){

	var num=$(".pages-current").text();

	if(num != 1){
		var nums = num - 1;
		ajax("/User/userRoleList",{"userId":userId,"token":token,"page":nums},function(result){
			var Count = result["data"].length;
			$("#count").text(Count);

			var html = "";
			$.each(result["data"], function(idx, obj) {
				html += "<tr><td>" + obj.userId + "</td>";
				html += "<td>" + obj.uname + "</td>";
				html += "<td>" + obj.phone + "</td>";
				html += "<td>" + obj.email + "</td>";
				html += "<td><a class='btn04' id='xg_btn'>修改</a ></td></tr>";

				//alert();
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
	}else{
		alert("不能再往前了")
	}

});


$("#next_page").click(function(){

	var num=$(".pages-current").text();
	
		var nums = num + 1;
		ajax("/User/userRoleList",{"userId":userId,"token":token,"page":nums},function(result){
			var Count = result["data"].length;
			$("#count").text(Count);
			var html = "";
			$.each(result["data"], function(idx, obj) {
				html += "<tr><td>" + obj.userId + "</td>";
				html += "<td>" + obj.uname + "</td>";
				html += "<td>" + obj.phone + "</td>";
				html += "<td>" + obj.email + "</td>";
				html += "<td><a class='btn04' id='xg_btn'>修改</a ></td></tr>";

				//alert();
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

});

function del(id) {
	if (confirm("确定要删除吗？")) {
		ajax("/User/delUser",{"userId":userId,"token":token,"id":id},function(result){
			if(result["code"] == 0){
				alert(result["msg"])
				location.reload();
			}
		});
	}
}


$("#search").click(function(){

	var where=$("#text").val();
	alert(where)
	if(where == ""){
		alert("搜索条件不能为空")
	}else{
		ajax("/User/userRoleList",{"userId":userId,"token":token,"where":where},function(result){
			console.log(result)
			var Count = result["data"].length;
			$("#count").text(Count);
			var html = "";
			$.each(result["data"], function(idx, obj) {
				html += "<tr><td>" + obj.userId + "</td>";
				html += "<td>" + obj.uname + "</td>";
				html += "<td>" + obj.phone + "</td>";
				html += "<td>" + obj.email + "</td>";
				html += "<td><a class='btn04' id='xg_btn'>修改</a ></td></tr>";

				//alert();
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

});