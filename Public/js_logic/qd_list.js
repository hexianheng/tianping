//渠道列表
var userId = getCookie("userId")
var token = getCookie("token")

if(userId == "" || token == ""){
    parent.location.href = CONFIG['path'] + 'Index/Login';
}else{
    //角色下拉
    ajax("/User/getSelectRole",{"userId":userId,"token":token},function(result){
        var Count = result["data"].length;
        $("#count").text(Count);
        var html = "";
        $.each(result["data"], function(idx, obj) {
            html += "<tr><td>" + obj.id + "</td>";
            html += "<td>" + obj.name + "</td>";
            html += '<td class="operation del"><a class="edit btn04">修改</a>   <a class="edit btn04" onclick="del('+obj.id+')">删除</a></td></tr>';
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

//删除
function del(id) {
    if (confirm("确定要删除吗？")) {
        ajax("/User/delRole",{"userId":userId,"token":token,"roleId":id},function(result){
            if(result["code"] == 0){
                alert(result["msg"])
                location.reload();
            }
        });
    }
}