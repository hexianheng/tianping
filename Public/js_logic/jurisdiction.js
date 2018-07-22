
//获取用户列表
var userId = getCookie("userId")
var token = getCookie("token")
var sex = 1;

$('.sex_get').click(function(){
    sex = $(this).val();
});

if(userId == "" || token == ""){
	parent.location.href = CONFIG['path'];
}else{
    ajax("/Channel/channelSelect",{"userId":userId,"token":token},function(result){
        var html_s = "";
        html_s += "<option value = ''>---请选择---</option>";
        $.each(result["data"], function(idx, obj) {
            html_s += "<option value = '"+ obj.id +"'>" + obj.name +"</option>";
        });
        $("#text1").html(html_s);
    });
	ajax("/User/userRoleList",{"userId":userId,"token":token},function(result){
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

        var num_max = result['page'];
        var num_page = result['maxPage'];
        $("#page").paging({
            pageNo:1,
            totalPage: num_page,
            totalSize: num_max,
            callback: function(num) {
                userList(num);
            }
        })
    });
}


function userList(num){
    ajax("/User/userRoleList",{"userId":userId,"token":token,"page":num},function(result){
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
        $("#data").html(html);
    });
}

//修改
function upd(id) {
    ajax("/Channel/channelSelect",{"userId":userId,"token":token},function(result){
        var html_c = "";
        html_c += "<option value = ''>---请选择---</option>";
        $.each(result["data"], function(idx, obj) {
            html_c += "<option value = '"+ obj.id +"'>" + obj.name +"</option>";
        });
        $("#channelId").html(html_c);
    });
    //角色下拉
    ajax("/User/getSelectRole",{"userId":userId,"token":token},function(result){
        var html_u = "";
        html_u += "<option value = ''>---请选择---</option>";
        $.each(result["data"], function(idx, obj) {
            html_u += "<option value = '"+ obj.id +"'>" + obj.name +"</option>";
        });
        $("#roleId").html(html_u);
    });
    $('.pop_layer').show();
    ajax("/User/getOneUser",{"userId":userId,"token":token,"id":id},function(result){

        $("#uname").val(result['data']['uname']);
        $(":radio[name='radio'][value='" + result['data']['sex'] + "']").attr("checked", "checked");
        $("#channelId").val(result['data']['channelId']);
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
    var channelId = $("#channelId").val();
    var job = $("#job").val();
    ajax("/User/updUser",{"userId":userId,"token":token,"id":id,"roleId":roleId,"userName":userName,"phone":phone,"email":email,"sex":sex,"channelId":channelId,"job":job},function(result){
        if(result["code"] == 0){
            alert(result["msg"])
            location.reload();
        }
    });
}

//删除用户
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
    var phone=$("#text2").val();
    var channelId=$("#text1").val();
	if(where == "" && phone=="" && channelId==""){
        location.reload();
	}else{
		ajax("/User/userRoleList",{"userId":userId,"token":token,"where":where,"phone":phone,"channelId":channelId},function(result){
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
			$("#data").html(html);
            var num_max = result['maxPage'];
            var num_page = result['page'];
            $("#page").paging({
                pageNo:1,
                totalPage: num_max,
                totalSize: num_max,
                callback: function(num) {
                    userListSearch(where,phone,channelId,num);
                }
            })
		});
	}

});

function userListSearch(where,phone,channelId,num){
    ajax("/User/userRoleList",{"userId":userId,"token":token,"page":num,"where":where,"phone":phone,"channelId":channelId},function(result){
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
        $("#data").html(html);
    });
}