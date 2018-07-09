
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
                html += '<td><a class="btn04" id="xg_btn" onclick="upd('+obj.id+')">修改信息</a >  <a class="btn04" onclick="updType('+obj.id+')">启用</a ></td></tr>';
            }else{
                html += '<td><a class="btn04" id="xg_btn" onclick="upd('+obj.id+')">修改信息</a >  <a class="btn04" onclick="updType('+obj.id+')">禁用</a ></td></tr>';
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
                html += '<td><a class="btn04" id="xg_btn" onclick="upd('+obj.id+')">修改信息</a >  <a class="btn04" onclick="updType('+obj.id+')">启用</a ></td></tr>';
            }else{
                html += '<td><a class="btn04" id="xg_btn" onclick="upd('+obj.id+')">修改信息</a >  <a class="btn04" onclick="updType('+obj.id+')">禁用</a ></td></tr>';
            }        });
        $("#data").html(html);
    });
}

//产品添加
$("#xg_btn").click(function(){
    $('.pop_layer').show();
})

$("#addBtn").click(function(){
    var name = $("#name").val();
    var desc = $("#desc").val();
    var projectStr = $("#projectStr").val();
    var panel = $("#panel").val();
    ajax("/Product/addProduct",{"userId":userId,"token":token,"name":name,"desc":desc,"projectStr":projectStr,"panel":panel},function(result){
        if(result["code"] == 0){
            alert(result["msg"])
            location.reload();
        }
    });
})

//修改
function upd(id) {
    $('.pop_layer').show();
    ajax("/Product/getOneProduct",{"userId":userId,"token":token,"id":id},function(result){
        $("#name").val(result['data'][0]['name']);
        $("#desc").val(result['data'][0]['desc']);
        $("#projectStr").val(result['data'][0]['projectStr']);
        $("#panel").val(result['data'][0]['panel']);
        var operation = "<a class='preview-btn btn04' onclick='update("+result['data'][0]['id']+")'>保存</a >";
        $("#operation").html(operation);
    });
}

//修改
function update(id){
    var name = $("#name").val();
    var desc = $("#desc").val();
    var projectStr = $("#projectStr").val();
    var panel = $("#panel").val();
    ajax("/Product/updProduct",{"userId":userId,"token":token,"name":name,"desc":desc,"projectStr":projectStr,"id":id,"panel":panel},function(result){
        if(result["code"] == 0){
            alert(result["msg"])
            location.reload();
        }
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

function projectStr(id){
    ajax("/Product/getOneProduct",{"userId":userId,"token":token,"id":id},function(result){
        alert(result['data'][0]['projectStr']);
    });
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
                    html += '<td><a class="btn04" id="xg_btn" onclick="upd('+obj.id+')">修改信息</a >  <a class="btn04" onclick="updType('+obj.id+')">启用</a ></td></tr>';
                }else{
                    html += '<td><a class="btn04" id="xg_btn" onclick="upd('+obj.id+')">修改信息</a >  <a class="btn04" onclick="updType('+obj.id+')">禁用</a ></td></tr>';
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
                        html += '<td><a class="btn04" id="xg_btn" onclick="upd('+obj.id+')">修改信息</a >  <a class="btn04" onclick="updType('+obj.id+')">启用</a ></td></tr>';
                    }else{
                        html += '<td><a class="btn04" id="xg_btn" onclick="upd('+obj.id+')">修改信息</a >  <a class="btn04" onclick="updType('+obj.id+')">禁用</a ></td></tr>';
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
            html += '<td><a class="btn04" id="xg_btn" onclick="upd('+obj.id+')">修改信息</a >  <a class="btn04" onclick="updType('+obj.id+')">更改状态</a ></td></tr>';

        });
        $("#data").html(html);
    });
}