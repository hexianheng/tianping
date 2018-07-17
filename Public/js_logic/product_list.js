
//获取产品列表
var userId = getCookie("userId")
var token = getCookie("token")

if(userId == "" || token == ""){
    parent.location.href = CONFIG['path'];
}else{
    ajax("/Product/listProduct",{"userId":userId,"token":token},function(result){
        var html = "";
        $.each(result["data"]["data"], function(idx, obj) {
            html += "<tr><td>" + obj.id + "</td>";
            html += "<td>" + obj.name + "</td>";
            html += '<td><div class="content" onmouseover="overShow(this,event)" onmouseout="outHide()" style="text-align: center;">'+obj.projectStr+'</div></td>';
            html += "<td>" + obj.desc+"</td>";
            html += "<td>" + obj.panel+"</td>";
            if(obj.status == '1'){
                html += "<td>禁用</td>";
            }else{
                html += "<td>正常</td>";
            }
            html += "<td>" + obj.ctime + "</td>";
            if(obj.status == '1'){
                html += '<td><a class="btn04" id="xg_btn" href="'+CONFIG['path']+'/Index/product_update/id/'+obj.id+'">修改信息</a >  <a class="btn04" onclick="updType('+obj.id+')">启用</a ></td></tr>';
            }else{
                html += '<td><a class="btn04" id="xg_btn" href="'+CONFIG['path']+'/Index/product_update/id/'+obj.id+'">修改信息</a >  <a class="btn04" onclick="updType('+obj.id+')">禁用</a ></td></tr>';
            }
        });
        $("#data").append(html);

        var num_max = result['data']['page'];
        var num_page = result['data']['maxPage'];
        $("#page").paging({
            pageNo:1,
            totalPage: num_page,
            totalSize: num_max,
            callback: function(num) {
                productList(num);
            }
        })
    });
}

function productList(num){
    ajax("/Product/listProduct",{"userId":userId,"token":token,"page":num},function(result){
        var html = "";
        $.each(result["data"]["data"], function(idx, obj) {
            html += "<tr><td>" + obj.id + "</td>";
            html += "<td>" + obj.name + "</td>";
            html += '<td><div class="content" onmouseover="overShow(this,event)" onmouseout="outHide()" style="text-align: center;">'+obj.projectStr+'</div></td>';
            html += "<td>" + obj.desc+"</td>";
            html += "<td>" + obj.panel+"</td>";
            if(obj.status == '1'){
                html += "<td>禁用</td>";
            }else{
                html += "<td>正常</td>";
            }
            html += "<td>" + obj.ctime + "</td>";
            if(obj.status == '1'){
                html += '<td><a class="btn04" id="xg_btn" href="'+CONFIG['path']+'/Index/product_update/id/'+obj.id+'">修改信息</a >  <a class="btn04" onclick="updType('+obj.id+')">启用</a ></td></tr>';
            }else{
                html += '<td><a class="btn04" id="xg_btn" href="'+CONFIG['path']+'/Index/product_update/id/'+obj.id+'">修改信息</a >  <a class="btn04" onclick="updType('+obj.id+')">禁用</a ></td></tr>';
            } 
        });
        $("#data").html(html);
    });
}

//更改状态
function updType(id) {
    if (confirm("确定要更改状态吗？")) {
        ajax("/Product/updateStatus",{"userId":userId,"token":token,"id":id},function(result){
            if(result["code"] == 0){
                alert(result["msg"])
                location.reload();
            }
        });
    }
}


//搜索
$("#search").click(function(){

    var where=$("#text").val();
    if(where == ""){
        ajax("/Product/listProduct",{"userId":userId,"token":token},function(result){
            var html = "";
            $.each(result["data"]["data"], function(idx, obj) {
                html += "<tr><td>" + obj.id + "</td>";
                html += "<td>" + obj.name + "</td>";
                html += '<td><div class="content" onmouseover="overShow(this,event)" onmouseout="outHide()" style="text-align: center;">'+obj.projectStr+'</div></td>';
                html += "<td>" + obj.desc+"</td>";
                html += "<td>" + obj.panel+"</td>";
                if(obj.status == '1'){
                    html += "<td>禁用</td>";
                }else{
                    html += "<td>正常</td>";
                }
                html += "<td>" + obj.ctime + "</td>";
                if(obj.status == '1'){
                    html += '<td><a class="btn04" id="xg_btn" href="'+CONFIG['path']+'/Index/product_update/id/'+obj.id+'">修改信息</a >  <a class="btn04" onclick="updType('+obj.id+')">启用</a ></td></tr>';
                }else{
                    html += '<td><a class="btn04" id="xg_btn" href="'+CONFIG['path']+'/Index/product_update/id/'+obj.id+'">修改信息</a >  <a class="btn04" onclick="updType('+obj.id+')">禁用</a ></td></tr>';
                }
            });
            $("#data").html(html);

            var num_max = result['data']['page'];
            var num_page = result['data']['maxPage'];
            $("#page").paging({
                pageNo:1,
                totalPage: num_page,
                totalSize: num_max,
                callback: function(num) {
                    productList(num);
                }
            })
        });
    }else{
        ajax("/Product/listProduct",{"userId":userId,"token":token,"name":where},function(result){
            if(result['data'] == ""){
                alert("无数据")
            }else{
                var html = "";
                $.each(result["data"]["data"], function(idx, obj) {
                    html += "<tr><td>" + obj.id + "</td>";
                    html += "<td>" + obj.name + "</td>";
                    html += '<td><div class="content" onmouseover="overShow(this,event)" onmouseout="outHide()" style="text-align: center;">'+obj.projectStr+'</div></td>';
                    html += "<td>" + obj.desc+"</td>";
                    html += "<td>" + obj.panel+"</td>";
                    if(obj.status == '1'){
                        html += "<td>禁用</td>";
                    }else{
                        html += "<td>正常</td>";
                    }
                    html += "<td>" + obj.ctime + "</td>";
                    if(obj.status == '1'){
                        html += '<td><a class="btn04" id="xg_btn" href="'+CONFIG['path']+'/Index/product_update/id/'+obj.id+'">修改信息</a >  <a class="btn04" onclick="updType('+obj.id+')">启用</a ></td></tr>';
                    }else{
                        html += '<td><a class="btn04" id="xg_btn" href="'+CONFIG['path']+'/Index/product_update/id/'+obj.id+'">修改信息</a >  <a class="btn04" onclick="updType('+obj.id+')">禁用</a ></td></tr>';
                    }
                });
                $("#data").html(html);

                var num_max = result['data']['page'];
                var num_page = result['data']['maxPage'];
                $("#page").paging({
                    pageNo:1,
                    totalPage: num_page,
                    totalSize: num_max,
                    callback: function(num) {
                        productsearch(where,num);
                    }
                })
            }
        });
    }

});

function productsearch(where,num){
    ajax("/Product/listProduct",{"userId":userId,"token":token,"page":num,"name":where},function(result){
        var html = "";
        $.each(result["data"]["data"], function(idx, obj) {
            html += "<tr><td>" + obj.id + "</td>";
            html += "<td>" + obj.name + "</td>";
            html += '<td><div class="content" onmouseover="overShow(this,event)" onmouseout="outHide()" style="text-align: center;">'+obj.projectStr+'</div></td>';
            html += "<td>" + obj.desc+"</td>";
            html += "<td>" + obj.panel+"</td>";
            if(obj.status == '1'){
                html += "<td>禁用</td>";
            }else{
                html += "<td>正常</td>";
            }
            html += "<td>" + obj.ctime + "</td>";
            if(obj.status == '1'){
                html += '<td><a class="btn04" id="xg_btn" href="'+CONFIG['path']+'/Index/product_update/id/'+obj.id+'">修改信息</a >  <a class="btn04" onclick="updType('+obj.id+')">启用</a ></td></tr>';
            }else{
                html += '<td><a class="btn04" id="xg_btn" href="'+CONFIG['path']+'/Index/product_update/id/'+obj.id+'">修改信息</a >  <a class="btn04" onclick="updType('+obj.id+')">禁用</a ></td></tr>';
            }
        });
        $("#data").html(html);
    });
}