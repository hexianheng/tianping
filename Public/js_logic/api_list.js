//编码列表
var userId = getCookie("userId");
var token = getCookie("token");

if(userId == "" || token == ""){
    parent.location.href = CONFIG['path'];
}else{
    ajax("/Invok/appList",{"userId":userId,"token":token},function(result){
        var html = "";
        $.each(result["data"], function(idx, obj) {
            html += "<tr><td>" + obj.appId + "</td>";
            html += "<td>" + obj.appKey + "</td>";
            if(obj.appName.length>30){
                html += '<td><div class="content" onmouseover="overShow(this,event)" onmouseout="outHide()" style="text-align: center;">'+obj.appName+'</div></td>';
            }else{
                html += "<td>"+obj.appName+"</td>";
            }
            if(obj.desc.length>30){
                html += '<td><div class="content" onmouseover="overShow(this,event)" onmouseout="outHide()" style="text-align: center;">'+obj.desc+'</div></td>';
            }else{
                html += "<td>"+obj.desc+"</td>";
            }
            html += "<td>" + obj.ctime + "</td>";
            html += '<td><a class="btn04" onclick="del('+obj.appId+')">删除</a ></td></tr>';
        });
        $("#data").append(html);
        var num_max = result['page'];
        var num_page = result['maxPage'];
        $("#page").paging({
            pageNo:1,
            totalPage: num_page,
            totalSize: num_max,
            callback: function(num) {
                ApiList(num);
            }
        })
    });

}


function ApiList(num){
    ajax("/Invok/appList",{"userId":userId,"token":token,"page":num},function(result){
        var html = "";
        $.each(result["data"], function(idx, obj) {
            html += "<tr><td>" + obj.appId + "</td>";
            html += "<td>" + obj.appKey + "</td>";
            if(obj.appName.length>30){
                html += '<td><div class="content" onmouseover="overShow(this,event)" onmouseout="outHide()" style="text-align: center;">'+obj.appName+'</div></td>';
            }else{
                html += "<td>"+obj.appName+"</td>";
            }
            if(obj.desc.length>30){
                html += '<td><div class="content" onmouseover="overShow(this,event)" onmouseout="outHide()" style="text-align: center;">'+obj.desc+'</div></td>';
            }else{
                html += "<td>"+obj.desc+"</td>";
            }
            html += "<td>" + obj.ctime + "</td>";
            html += '<td><a class="btn04" onclick="del('+obj.appId+')">删除</a ></td></tr>';
        });
        $("#data").html(html);

    });
}

$("#search").click(function(){

    var where=$("#where").val();
    if(where == ""){
        ajax("/Invok/appList",{"userId":userId,"token":token},function(result){
            var html = "";
            $.each(result["data"], function(idx, obj) {
                html += "<tr><td>" + obj.appId + "</td>";
                html += "<td>" + obj.appKey + "</td>";
                html += "<td>" + obj.appName + "</td>";
                html += "<td>" + obj.desc + "</td>";
                html += "<td>" + obj.ctime + "</td>";
                html += '<td><a class="btn04" onclick="del('+obj.appId+')">删除</a ></td></tr>';
            });
            $("#data").html(html);
            var num_max = result['page'];
            var num_page = result['maxPage'];
            $("#page").paging({
                pageNo:1,
                totalPage: num_page,
                totalSize: num_max,
                callback: function(num) {
                    ApiList(num);
                }
            })
        });
    }else{
        ajax("/Invok/appList",{"userId":userId,"token":token,"where":where},function(result){
            var html = "";
            $.each(result["data"], function(idx, obj) {
                html += "<tr><td>" + obj.appId + "</td>";
                html += "<td>" + obj.appKey + "</td>";
                if(obj.appName.length>30){
                    html += '<td><div class="content" onmouseover="overShow(this,event)" onmouseout="outHide()" style="text-align: center;">'+obj.appName+'</div></td>';
                }else{
                    html += "<td>"+obj.appName+"</td>";
                }
                if(obj.desc.length>30){
                    html += '<td><div class="content" onmouseover="overShow(this,event)" onmouseout="outHide()" style="text-align: center;">'+obj.desc+'</div></td>';
                }else{
                    html += "<td>"+obj.desc+"</td>";
                }
                html += "<td>" + obj.ctime + "</td>";
                html += '<td><a class="btn04" onclick="del('+obj.appId+')">删除</a ></td></tr>';
            });
            $("#data").html(html);
            var num_max = result['page'];
            var num_page = result['maxPage'];
            $("#page").paging({
                pageNo:1,
                totalPage: num_page,
                totalSize: num_max,
                callback: function(num) {
                    ApiListSearch(where,num);
                }
            })
        });
    }

});



function ApiListSearch(where,num){
    ajax("/Invok/appList",{"userId":userId,"token":token,"page":num,"where":where},function(result){
        var html = "";
        $.each(result["data"], function(idx, obj) {
            html += "<tr><td>" + obj.appId + "</td>";
            html += "<td>" + obj.appKey + "</td>";
            if(obj.appName.length>30){
                html += '<td><div class="content" onmouseover="overShow(this,event)" onmouseout="outHide()" style="text-align: center;">'+obj.appName+'</div></td>';
            }else{
                html += "<td>"+obj.appName+"</td>";
            }
            if(obj.desc.length>30){
                html += '<td><div class="content" onmouseover="overShow(this,event)" onmouseout="outHide()" style="text-align: center;">'+obj.desc+'</div></td>';
            }else{
                html += "<td>"+obj.desc+"</td>";
            }
            html += "<td>" + obj.ctime + "</td>";
            html += '<td><a class="btn04" onclick="del('+obj.appId+')">删除</a ></td></tr>';
        });
        $("#data").html(html);

    });
}


$("#xg_btn").click(function(){
    $('.pop_layer').show();
    
});

$("#btn").click(function(){
    var name = $("#name").val();
    var desc = $("#desc").val();
    ajax("/Invok/addApp",{"userId":userId,"token":token,"name":name,"desc":desc,},function(result){
        if(result["code"] == 0){
            alert(result["msg"])
            location.reload();
        }
    });
});


function del(id) {
    if (confirm("确定要删除吗？")) {
        ajax("/Invok/delApp",{"userId":userId,"token":token,"appId":id},function(result){
            if(result["code"] == 0){
                alert(result["msg"])
                location.reload();
            }
        });
    }
}