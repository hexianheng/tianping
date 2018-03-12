
//权限列表
var userId = getCookie("userId")
var token = getCookie("token")


var type = 1;

$('.type').click(function(){
	type = $(this).val();
});
if(userId == "" || token == ""){
	parent.location.href = CONFIG['path'] + 'Index/Login';
}else{
	ajax("/User/getPermission",{"userId":userId,"token":token},function(result){
		//console.log(result)
		var html = "<table class = 'tablelist' border='0' cellpadding='0' cellspacing='0'>";
		html += '<th>名称</th>';
		html += '<th>创建时间</th>';
		html += '<th>操作</th>';
		$.each(result["data"], function(idx, obj) {

			var tempStr = '';
			var status = '';
			var labelTemp = '';
			if(obj.label != 1){
				tempStr = '';
				status = 'style = "display:none;" ';
				labelTemp = "【子级】";
			}else{
				tempStr = '<input type="checkbox" onclick="permission_check('+ obj.id +',this)">';
				labelTemp = "【父级】";
			}
			html += '<tr id="'+ obj.id +'" class="'+ obj.parentId +'" '+status+'>';
			html+= '<td>'+tempStr+ labelTemp + obj.name +'</td>';
			html+= '<td>' + obj.ctime + '</td>';
			html+= '<td><a class="btn04" onclick="upd('+obj.id+')">修改</a> <a class="btn04" onclick="del('+obj.id+')">删除</a></td>';
			html+= '</tr>';
		});
		html += "</table>";
		$("#data").html(html);
	});
}

function permission_check(id,that) {
	if(that.checked){
		$("#data").find("."+id).show();
	}else{
		$("#data").find("."+id).hide();
	}
}


function upd(id){
	$('.pop_layer').show();
	ajax("/User/getPId",{"userId":userId,"token":token},function(result){

		//console.log(result)
		var html = "";
		$.each(result["data"], function(idx, obj) {
			html += "<option value = '"+ obj.id +"'>" + obj.name +"</option>";
		});
		$("#select_parent").html(html);
	});
	ajax("/User/getPermissionOne",{"userId":userId,"token":token,"permissionId":id},function(result){
		console.log(result)
		$("#permissionName").val(result['data']['name']);
		$("#select_parent").val(result['data']['parentId']);
		$("#actionName").val(result['data']['action']);
		$("#functionName").val(result['data']['function']);
		$(":radio[name='radio'][value='" + result['data']['group'] + "']").attr("checked", "checked");
		var operation = "<a class='preview-btn btn04' onclick='update("+result['data']['id']+")'>保存</a >";
		$("#operation").html(operation);
	});
}


//修改权限
function update(id){
	
	var permissionName = $("#permissionName").val();
	var actionName = $("#actionName").val();
	var functionName = $("#functionName").val();
	var permissionPId = $("#select_parent").val();
	ajax("/User/updPermission",{"userId":userId,"token":token,"permissionPId":permissionPId,"actionName":actionName,"functionName":functionName,"permissionName":permissionName,"type":type,"permissionId":id},function(result){
		if(result['code'] == 0 ){
			alert(result["msg"])
			location.reload();
		}

	});
}


function del(id) {
	if (confirm("确定要删除吗？")) {
		ajax("/User/delPermission",{"userId":userId,"token":token,"permissionId":id},function(result){
			if(result["code"] == 0){
				alert(result["msg"])
				location.reload();
			}
		});
	}
}

