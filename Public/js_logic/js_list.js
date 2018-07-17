//角色列表
var userId = getCookie("userId")
var token = getCookie("token")

if(userId == "" || token == ""){
    parent.location.href = CONFIG['path'];
}else{
    //角色下拉
    ajax("/User/getRole",{"userId":userId,"token":token},function(result){
        var html = "";
        $.each(result["data"], function(idx, obj) {
            html += "<tr><td>" + obj.id + "</td>";
            html += "<td>" + obj.name + "</td>";
            html += '<td class="operation del"><a class="edit btn04" onclick="upd('+obj.id+')">修改</a>   <a class="edit btn04" onclick="del('+obj.id+')">删除</a></td></tr>';
        });
        $("#data").append(html);

        var num_max = result['page'];
        var num_page = result['maxPage'];
        $("#page").paging({
            pageNo:1,
            totalPage: num_page,
            totalSize: num_max,
            callback: function(num) {
                roleList(num);
            }
        })
    });
}


function roleList(num){
    ajax("/User/getRole",{"userId":userId,"token":token,"page":num},function(result){
        var html = "";
        $.each(result["data"], function(idx, obj) {
            html += "<tr><td>" + obj.id + "</td>";
            html += "<td>" + obj.name + "</td>";
            html += '<td class="operation del"><a class="edit btn04" onclick="upd('+obj.id+')">修改</a>   <a class="edit btn04" onclick="del('+obj.id+')">删除</a></td></tr>';
        });
        $("#data").html(html);
    });
}


//搜索
$("#search").click(function(){

    var where=$("#text").val();
    if(where == ""){
        location.reload();
    }else{
        ajax("/User/getRole",{"userId":userId,"token":token,"where":where},function(result){
            var html = "";
            $.each(result["data"], function(idx, obj) {
                html += "<tr><td>" + obj.id + "</td>";
                html += "<td>" + obj.name + "</td>";
                html += '<td class="operation del"><a class="edit btn04" onclick="upd('+obj.id+')">修改</a>   <a class="edit btn04" onclick="del('+obj.id+')">删除</a></td></tr>';
            });
            $("#data").html(html);

            var num_max = result['page'];
            var num_page = result['maxPage'];
            $("#page").paging({
                pageNo:1,
                totalPage: num_page,
                totalSize: num_max,
                callback: function(num) {
                    roleListsearch(where,num);
                }
            })
        });
    }

});

function roleListsearch(where,num){
    ajax("/User/getRole",{"userId":userId,"token":token,"page":num,"where":where},function(result){
        var html = "";
        $.each(result["data"], function(idx, obj) {
            html += "<tr><td>" + obj.id + "</td>";
            html += "<td>" + obj.name + "</td>";
            html += '<td class="operation del"><a class="edit btn04" onclick="upd('+obj.id+')">修改</a>   <a class="edit btn04" onclick="del('+obj.id+')">删除</a></td></tr>';
        });
        $("#data").html(html);
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


//修改
function upd(id) {
    $('.pop_layer').show();
    ajax("/User/getRoleOne",{"userId":userId,"token":token,"roleId":id},function(result){
        $("#roleName").val(result['data']['name']);
        $("#permission").val(JSON.parse(result["data"]['permission']).join('|'));
        var operation = '<a class="preview-btn btn04" onclick="update('+id+')">保存</a >';
        $("#updBtn").html(operation);
    });
}

//修改
function update(id){
    var roleName = $("#roleName").val();
    var permissionStr = $("#permission").val();
    ajax("/User/updRole",{"userId":userId,"token":token,"roleName":roleName,"permissionStr":permissionStr,"roleId":id},function(result){
        if(result["code"] == 0){
            alert(result["msg"])
            location.reload();
        }
    });
}