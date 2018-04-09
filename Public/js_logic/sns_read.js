
//获取解读列表
var userId = getCookie("userId")
var token = getCookie("token")

if(userId == "" || token == ""){
    parent.location.href = CONFIG['path'];
}else{
    ajax("/Report/userReportList",{"userId":userId,"token":token},function(result){
        var html = "";
        $.each(result["data"], function(idx, obj) {
            html += "<tr><td>" + obj.id + "</td>";
            html += "<td>" + obj.code + "</td>";
            html += "<td>" + obj.productId + "</td>";
            html += "<td><a href='"+CONFIG['path']+"/Index/report_mf/code/"+obj.code+"'>" + obj.pruductName + "</a></td>";
            html += "<td>" + obj.pruductName + "</td>";
            if(obj.status == '1'){
                html += "<td>未审核</td>";
            }else if(obj.status == '2'){
                html += "<td>已审核</td>";
            }else if(obj.status == '3'){
                html += "<td>审核未成功</td>";
            }
            html += "<td>" + obj.ctime + "</td>";
            html += '<td><a class="btn04" id="xg_btn" onclick="status('+obj.id+',2)">审核通过</a >  <a class="btn04" onclick="status('+obj.id+',3)">审核未通过</a ></td></tr>';
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
    ajax("/Report/userReportList",{"userId":userId,"token":token,"page":num},function(result){
        var html = "";
        $.each(result["data"], function(idx, obj) {
            html += "<tr><td>" + obj.id + "</td>";
            html += "<td>" + obj.code + "</td>";
            html += "<td>" + obj.productId + "</td>";
            html += "<td>" + obj.pruductName + "</td>";
            html += "<td>" + obj.pruductName + "</td>";
            if(obj.status == '1'){
                html += "<td>未审核</td>";
            }else if(obj.status == '2'){
                html += "<td>已审核</td>";
            }else if(obj.status == '3'){
                html += "<td>审核未成功</td>";
            }
            html += "<td>" + obj.ctime + "</td>";
        });
        $("#data").html(html);
    });
}


$("#search").click(function(){

    var where=$("#text").val();
    if(where == ""){
        alert("搜索条件不能为空")
    }else{
        ajax("/Report/userReportList",{"userId":userId,"token":token,"where":where},function(result){
            var html = "";
            $.each(result["data"], function(idx, obj) {
                html += "<tr><td>" + obj.id + "</td>";
                html += "<td>" + obj.code + "</td>";
                html += "<td>" + obj.productId + "</td>";
                html += "<td>" + obj.pruductName + "</td>";
                html += "<td>" + obj.pruductName + "</td>";
                if(obj.status == '1'){
                    html += "<td>未审核</td>";
                }else if(obj.status == '2'){
                    html += "<td>已审核</td>";
                }else if(obj.status == '3'){
                    html += "<td>审核未成功</td>";
                }
                html += "<td>" + obj.ctime + "</td>";
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
    ajax("/Report/userReportList",{"userId":userId,"token":token,"where":where,"page":num},function(result){
        var html = "";
        $.each(result["data"], function(idx, obj) {
            html += "<tr><td>" + obj.id + "</td>";
            html += "<td>" + obj.code + "</td>";
            html += "<td>" + obj.productId + "</td>";
            html += "<td>" + obj.pruductName + "</td>";
            html += "<td>" + obj.pruductName + "</td>";
            if(obj.status == '1'){
                html += "<td>未审核</td>";
            }else if(obj.status == '2'){
                html += "<td>已审核</td>";
            }else if(obj.status == '3'){
                html += "<td>审核未成功</td>";
            }
            html += "<td>" + obj.ctime + "</td>";
        });
        $("#data").html(html);
    });
}

function status(id,status){
    alert(status)
    ajax("/Report/updReport",{"userId":userId,"token":token,"id":id,"status":status},function(result){
        if(result["code"] == 0){
            alert(result["msg"])
            location.reload();
        }
    });
}


