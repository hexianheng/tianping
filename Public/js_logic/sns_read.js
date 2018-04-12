
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
            html += "<td><a onclick='url(&quot;"+obj.code+"&quot;)'>" + obj.pruductName + "</a></td>";
            if(obj.status == '1'){
                html += "<td>" + obj.pruductName + "（不可下载）</td>";
                html += "<td>未审核</td>";
            }else if(obj.status == '2'){
                html += "<td><a href='../../Public/pdf/"+obj.code+".pdf'>" + obj.pruductName + "（可下载）</a></td>";
                html += "<td>已审核</td>";
            }else if(obj.status == '3'){
                html += "<td>" + obj.pruductName + "（不可下载）</td>";
                html += "<td>审核未成功</td>";
            }
            html += "<td>" + obj.ctime + "</td>";
            if(obj.status == '1'){
                html += '<td><a class="btn04" id="xg_btn" onclick="status('+obj.id+',2)">审核通过</a >  <a class="btn04" onclick="status('+obj.id+',3)">审核未通过</a ></td></tr>';
            }else if(obj.status == '2'){
                html += "<td>审核成功，可下载报告</td>";
            }else if(obj.status == '3'){
                html += "<td>审核未成功，请重新解读</td>";
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
    ajax("/Report/userReportList",{"userId":userId,"token":token,"page":num},function(result){
        var html = "";
        $.each(result["data"], function(idx, obj) {
            html += "<tr><td>" + obj.id + "</td>";
            html += "<td>" + obj.code + "</td>";
            html += "<td>" + obj.productId + "</td>";
            html += "<td><a onclick='url(&quot;"+obj.code+"&quot;)'>" + obj.pruductName + "</a></td>";
            if(obj.status == '1'){
                html += "<td>" + obj.pruductName + "（不可下载）</td>";
                html += "<td>未审核</td>";
            }else if(obj.status == '2'){
                html += "<td><a href='../../Public/pdf/"+obj.code+".pdf'>" + obj.pruductName + "（可下载）</a></td>";
                html += "<td>已审核</td>";
            }else if(obj.status == '3'){
                html += "<td>" + obj.pruductName + "（不可下载）</td>";
                html += "<td>审核未成功</td>";
            }
            html += "<td>" + obj.ctime + "</td>";
            if(obj.status == '1'){
                html += '<td><a class="btn04" id="xg_btn" onclick="status('+obj.id+',2)">审核通过</a >  <a class="btn04" onclick="status('+obj.id+',3)">审核未通过</a ></td></tr>';
            }else if(obj.status == '2'){
                html += "<td>审核成功，可下载报告</td>";
            }else if(obj.status == '3'){
                html += "<td>审核未成功，请重新解读</td>";
            }
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
                html += "<td><a onclick='url(&quot;"+obj.code+"&quot;)'>" + obj.pruductName + "</a></td>";
                if(obj.status == '1'){
                    html += "<td>" + obj.pruductName + "（不可下载）</td>";
                    html += "<td>未审核</td>";
                }else if(obj.status == '2'){
                    html += "<td><a href='../../Public/pdf/"+obj.code+".pdf'>" + obj.pruductName + "（可下载）</a></td>";
                    html += "<td>已审核</td>";
                }else if(obj.status == '3'){
                    html += "<td>" + obj.pruductName + "（不可下载）</td>";
                    html += "<td>审核未成功</td>";
                }
                html += "<td>" + obj.ctime + "</td>";
                if(obj.status == '1'){
                    html += '<td><a class="btn04" id="xg_btn" onclick="status('+obj.id+',2)">审核通过</a >  <a class="btn04" onclick="status('+obj.id+',3)">审核未通过</a ></td></tr>';
                }else if(obj.status == '2'){
                    html += "<td>审核成功，可下载报告</td>";
                }else if(obj.status == '3'){
                    html += "<td>审核未成功，请重新解读</td>";
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
    ajax("/Report/userReportList",{"userId":userId,"token":token,"where":where,"page":num},function(result){
        var html = "";
        $.each(result["data"], function(idx, obj) {
            html += "<tr><td>" + obj.id + "</td>";
            html += "<td>" + obj.code + "</td>";
            html += "<td>" + obj.productId + "</td>";
            html += "<td><a onclick='url(&quot;"+obj.code+"&quot;)'>" + obj.pruductName + "</a></td>";
            if(obj.status == '1'){
                html += "<td>" + obj.pruductName + "（不可下载）</td>";
                html += "<td>未审核</td>";
            }else if(obj.status == '2'){
                html += "<td><a href='../../Public/pdf/"+obj.code+".pdf'>" + obj.pruductName + "（可下载）</a></td>";
                html += "<td>已审核</td>";
            }else if(obj.status == '3'){
                html += "<td>" + obj.pruductName + "（不可下载）</td>";
                html += "<td>审核未成功</td>";
            }
            html += "<td>" + obj.ctime + "</td>";
            if(obj.status == '1'){
                html += '<td><a class="btn04" id="xg_btn" onclick="status('+obj.id+',2)">审核通过</a >  <a class="btn04" onclick="status('+obj.id+',3)">审核未通过</a ></td></tr>';
            }else if(obj.status == '2'){
                html += "<td>审核成功，可下载报告</td>";
            }else if(obj.status == '3'){
                html += "<td>审核未成功，请重新解读</td>";
            }
        });
        $("#data").html(html);
    });
}

function status(id,status){
    ajax("/Report/updReport",{"userId":userId,"token":token,"idStr":id,"status":status},function(result){
        if(result["code"] == 0){
            alert(result["msg"])
            location.reload();
        }
    });
}

$("#status_btn").click(function(){

    var idStr=$("#statusd").val();
    var status=$("#status").val();
    ajax("/Report/updReport",{"userId":userId,"token":token,"idStr":idStr,"status":status},function(result){
        if(result["code"] == 0){
            alert(result["msg"])
            location.reload();
        }
    });

});
//批量下载
$("#download_btn").click(function(){

    var codeStr=$("#download").val();
    ajax("/Report/downloadZip",{"userId":userId,"token":token,"codeStr":codeStr},function(result){
        if(result["code"] == 0){
            alert(result["msg"])
            location.reload();
        }
    });

});

function url(code) {
    parent.location.href = CONFIG['path']+"/Index/report_mf/code/"+code+"/userId/"+userId+"/token/"+token;
}
