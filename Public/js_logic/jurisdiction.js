
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
				 html += '<td><a class="btn04" id="xg_btn" onclick="upd('+obj.userId+')">修改</a >  <a class="btn04" onclick="del('+obj.userId+')">删除</a ></td></tr>';

			});
			$("#data").append(html);

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

//修改
function upd(id) {
    ajax("/Channel/channelSelect",{"userId":userId,"token":token},function(result){
        var html_c = "";
        $.each(result["data"], function(idx, obj) {
            html_c += "<option value = '"+ obj.name +"'>" + obj.name +"</option>";
        });
        $("#channelId").html(html_c);
    });
    //角色下拉
    ajax("/User/getSelectRole",{"userId":userId,"token":token},function(result){
        var html_u = "";
        $.each(result["data"], function(idx, obj) {
            html_u += "<option value = '"+ obj.id +"'>" + obj.name +"</option>";
        });
        $("#roleId").html(html_u);
    });
    $('.pop_layer').show();
    ajax("/User/getOneUser",{"userId":userId,"token":token,"id":id},function(result){
        console.log(result)

        $("#uname").val(result['data']['uname']);
        $(":radio[name='radio'][value='" + result['data']['sex'] + "']").prop("checked", "checked");
        $("#channelId").val(result['data']['channelName']);
        $("#roleId").val(result['data']['roleId']);
        $("#email").val(result['data']['email']);
        $("#job").val(result['data']['job']);
        $("#phone").val(result['data']['phone']);
        var operation = "<a class='preview-btn btn04' onclick='update("+result['data']['userId']+")'>保存</a >";
        $("#operation").html(operation);
    });
}

//修改用户信息
function update(id){
    var roleId = $("#roleId").val();
    var userName = $("#uname").val();
    var phone = $("#phone").val();
    var email = $("#email").val();
    var sex = $("#sex").val();
    var channelId = $("#channelId").val();
    var job = $("#job").val();
    ajax("/User/addUser",{"userId":userId,"token":token,"roleId":roleId,"userName":userName,"password":password,"phone":phone,"email":email,"sex":sex,"channelId":channelId,"job":job},function(result){
        if(result["code"] == 0){
            alert(result["msg"])
            location.reload();
        }
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

});