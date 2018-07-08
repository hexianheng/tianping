
//获取解读列表
var userId = getCookie("userId")
var token = getCookie("token")
var sex = 1;

if(userId == "" || token == ""){
    parent.location.href = CONFIG['path'];
}else{
    ajax("/Report/detectionResult",{"userId":userId,"token":token},function(result){
        var html = "";
        $.each(result["data"], function(idx, obj) {
            html += "<tr><td>" + obj.id + "</td>";
            html += "<td>" + obj.productId + "</td>";
            html += "<td>" + obj.code + "</td>";
            html += "<td>" + obj.ctime + "</td>";
            if(obj.status=="已解读"){
                html += '<td>已解读</td></tr>';
            }else{
                html += '<td><a class="btn04" onclick="del('+obj.id+')">删除</a ></td></tr>';
            }

        });
        $("#data").append(html);

        var num_max = result['page'];
        var num_page = result['maxPage'];
        $("#page").paging({
            pageNo:1,
            totalPage: num_page,
            totalSize: num_max,
            callback: function(num) {
                checkList(num);
            }
        })
    });
}


function checkList(num){
    ajax("/Report/detectionResult",{"userId":userId,"token":token,"page":num},function(result){
        var html = "";
        $.each(result["data"], function(idx, obj) {
            html += "<tr><td>" + obj.id + "</td>";
            html += "<td>" + obj.productId + "</td>";
            html += "<td>" + obj.code + "</td>";
            html += "<td>" + obj.ctime + "</td>";
            if(obj.status=="已解读"){
                html += '<td>已解读</td></tr>';
            }else{
                html += '<td><a class="btn04" onclick="del('+obj.id+')">删除</a ></td></tr>';
            }
        });
        $("#data").html(html);
    });
}


//删除解读
function del(id) {
    if (confirm("确定要删除吗？")) {
        ajax("/Report/delDetection",{"userId":userId,"token":token,"id":id},function(result){
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
        ajax("/Report/detectionResult",{"userId":userId,"token":token,"where":where},function(result){
            var html = "";
            $.each(result["data"], function(idx, obj) {
                html += "<tr><td>" + obj.id + "</td>";
                html += "<td>" + obj.productId + "</td>";
                html += "<td>" + obj.code + "</td>";
                html += "<td>" + obj.ctime + "</td>";
                if(obj.status=="已解读"){
                    html += '<td>已解读</td></tr>';
                }else{
                    html += '<td><a class="btn04" onclick="del('+obj.id+')">删除</a ></td></tr>';
                }
            });
            $("#data").html(html);

            var num_max = result['page'];
            var num_page = result['maxPage'];
            $("#page").paging({
                pageNo:1,
                totalPage: num_page,
                totalSize: num_max,
                callback: function(num) {
                    whereCheckSearch(where,num);
                }
            })
        });
    }

});

function whereCheckSearch(where,num){
    ajax("/Report/detectionResult",{"userId":userId,"token":token,"where":where,"page":num},function(result){
        var html = "";
        $.each(result["data"], function(idx, obj) {
            html += "<tr><td>" + obj.id + "</td>";
            html += "<td>" + obj.productId + "</td>";
            html += "<td>" + obj.code + "</td>";
            html += "<td>" + obj.ctime + "</td>";
            if(obj.status=="已解读"){
                html += '<td>已解读</td></tr>';
            }else{
                html += '<td><a class="btn04" onclick="del('+obj.id+')">删除</a ></td></tr>';
            }
        });
        $("#data").html(html);
    });
}


//解读
$("#check").click(function(){

    var startId=$("#startId").val();
    var endId=$("#endId").val();
    ajax("/Report/unscrambleReport",{"userId":userId,"token":token,"startId":startId,"endId":endId},function(result){
        if(result["code"] == 0){
            alert(result["msg"])
            location.reload();
        }
    });

});
