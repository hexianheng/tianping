
//获取项目列表
var userId = getCookie("userId")
var token = getCookie("token")

if(userId == "" || token == ""){
    parent.location.href = CONFIG['path'];
}else{
    ajax("/Item/itemList",{"userId":userId,"token":token},function(result){
        var html = "";
        $.each(result["data"], function(idx, obj) {
            html += "<tr><td>" + obj.itemid + "</td>";
            html += "<td>" + obj.name + "</td>";
            html += "<td>" + obj.siteNum+"</td>";
            if(obj.status == '1'){
                html += "<td>禁用</td>";
            }else{
                html += "<td>正常</td>";
            }
            html += '<td><div class="content" onmouseover="overShow(this,event)" onmouseout="outHide()" style="text-align: center;">'+obj.text+'</div></td>';            html += "<td>" + obj.addtime + "</td>";
            if(obj.status == '1'){
                html += '<td><a class="btn04" id="xg_btn" onclick="upd('+obj.itemid+')">修改信息</a >  <a class="btn04" onclick="updType('+obj.itemid+')">启用</a ></td></tr>';
            }else{
                html += '<td><a class="btn04" id="xg_btn" onclick="upd('+obj.itemid+')">修改信息</a >  <a class="btn04" onclick="updType('+obj.itemid+')">禁用</a ></td></tr>';
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
                projectList(num);
            }
        })
    });
}


function projectList(num){
    ajax("/Item/itemList",{"userId":userId,"token":token,"page":num},function(result){
        var html = "";
        $.each(result["data"], function(idx, obj) {
            html += "<tr><td>" + obj.itemid + "</td>";
            html += "<td>" + obj.name + "</td>";
            html += "<td>" + obj.siteNum+"</td>";
            if(obj.status == '1'){
                html += "<td>禁用</td>";
            }else{
                html += "<td>正常</td>";
            }
            html += '<td><div class="content" onmouseover="overShow(this,event)" onmouseout="outHide()" style="text-align: center;">'+obj.text+'</div></td>';            html += "<td>" + obj.addtime + "</td>";
            if(obj.status == '1'){
                html += '<td><a class="btn04" id="xg_btn" onclick="upd('+obj.itemid+')">修改信息</a >  <a class="btn04" onclick="updType('+obj.itemid+')">启用</a ></td></tr>';
            }else{
                html += '<td><a class="btn04" id="xg_btn" onclick="upd('+obj.itemid+')">修改信息</a >  <a class="btn04" onclick="updType('+obj.itemid+')">禁用</a ></td></tr>';
            }
        });
        $("#data").html(html);
    });
}


//搜索
$("#search").click(function(){

    var where=$("#text").val();
    if(where == ""){
        ajax("/Item/itemList",{"userId":userId,"token":token},function(result){
            var html = "";
            $.each(result["data"], function(idx, obj) {
                html += "<tr><td>" + obj.itemid + "</td>";
                html += "<td>" + obj.name + "</td>";
                html += "<td>" + obj.siteNum+"</td>";
                if(obj.status == '1'){
                    html += "<td>禁用</td>";
                }else{
                    html += "<td>正常</td>";
                }
                html += '<td><div class="content" onmouseover="overShow(this,event)" onmouseout="outHide()" style="text-align: center;">'+obj.text+'</div></td>';            html += "<td>" + obj.addtime + "</td>";
                if(obj.status == '1'){
                    html += '<td><a class="btn04" id="xg_btn" onclick="upd('+obj.itemid+')">修改信息</a >  <a class="btn04" onclick="updType('+obj.itemid+')">启用</a ></td></tr>';
                }else{
                    html += '<td><a class="btn04" id="xg_btn" onclick="upd('+obj.itemid+')">修改信息</a >  <a class="btn04" onclick="updType('+obj.itemid+')">禁用</a ></td></tr>';
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
                    projectList(num);
                }
            })
        });
    }else{
        ajax("/Item/itemList",{"userId":userId,"token":token,"where":where},function(result){
            if(result['data'] == ""){
                alert("无数据")
            }else{
                var html = "";
                $.each(result["data"], function(idx, obj) {
                    html += "<tr><td>" + obj.itemid + "</td>";
                    html += "<td>" + obj.name + "</td>";
                    html += "<td>" + obj.siteNum+"</td>";
                    if(obj.status == '1'){
                        html += "<td>禁用</td>";
                    }else{
                        html += "<td>正常</td>";
                    }
                    html += '<td><div class="content" onmouseover="overShow(this,event)" onmouseout="outHide()" style="text-align: center;">'+obj.text+'</div></td>';                    html += "<td>" + obj.addtime + "</td>";
                    if(obj.status == '1'){
                        html += '<td><a class="btn04" id="xg_btn" onclick="upd('+obj.itemid+')">修改信息</a >  <a class="btn04" onclick="updType('+obj.itemid+')">启用</a ></td></tr>';
                    }else{
                        html += '<td><a class="btn04" id="xg_btn" onclick="upd('+obj.itemid+')">修改信息</a >  <a class="btn04" onclick="updType('+obj.itemid+')">禁用</a ></td></tr>';
                    }
                });
                $("#data").html(html);
                var num_max = result['maxPage'];
                var num_page = result['page'];
                $("#page").paging({
                    pageNo:1,
                    totalPage: num_max,
                    totalSize: num_max,
                    callback: function(num) {
                        projectSearch(where,num);
                    }
                })
            }
        });
    }

});

function projectSearch(where,num){
    ajax("/Item/itemList",{"userId":userId,"token":token,"page":num,"where":where},function(result){
        var html = "";
        $.each(result["data"], function(idx, obj) {
            html += "<tr><td>" + obj.itemid + "</td>";
            html += "<td>" + obj.name + "</td>";
            html += "<td>" + obj.siteNum+"</td>";
            if(obj.status == '1'){
                html += "<td>禁用</td>";
            }else{
                html += "<td>正常</td>";
            }
            html += '<td><div class="content" onmouseover="overShow(this,event)" onmouseout="outHide()" style="text-align: center;">'+obj.text+'</div></td>';            html += "<td>" + obj.addtime + "</td>";
            if(obj.status == '1'){
                html += '<td><a class="btn04" id="xg_btn" onclick="upd('+obj.itemid+')">修改信息</a >  <a class="btn04" onclick="updType('+obj.itemid+')">启用</a ></td></tr>';
            }else{
                html += '<td><a class="btn04" id="xg_btn" onclick="upd('+obj.itemid+')">修改信息</a >  <a class="btn04" onclick="updType('+obj.itemid+')">禁用</a ></td></tr>';
            }
        });
        $("#data").html(html);
    });
}

//项目添加
$("#xg_btn").click(function(){
    $('.pop_layer').show();
    var operation = "<a class='preview-btn btn04' id='addBtn'>添加</a >";
    $("#huan").html(operation);
})
$("#addBtn").click(function(){
    $('.pop_layer').show();
    var name = $("#name").val();
    var text = $("#textInfo").val();
    ajax("/Item/addItem",{"userId":userId,"token":token,"name":name,"text":text},function(result){
        if(result["code"] == 0){
            alert(result["msg"])
            location.reload();
        }
    });
})



//修改
function upd(id) {
    $('.pop_layer').show();
    ajax("/Item/getOneItem",{"userId":userId,"token":token,"id":id},function(result){
        $("#name").val(result['data'][0]['name']);
        $("#textInfo").val(result['data'][0]['text']);
        var operation = "<a class='preview-btn btn04' onclick='update("+result['data'][0]['itemid']+")'>保存</a >";
        $("#huan").html(operation);
    });
}

//修改
function update(id){
    var name = $("#name").val();
    var text = $("#textInfo").val();
    ajax("/Item/updItem",{"userId":userId,"token":token,"name":name,"desc":desc,"projectStr":projectStr,"id":id},function(result){
        if(result["code"] == 0){
            alert(result["msg"])
            location.reload();
        }
    });
}

//更改状态
function updType(id) {
    if (confirm("确定要更改状态吗？")) {
        ajax("/Item/updateStatus",{"userId":userId,"token":token,"id":id},function(result){
            if(result["code"] == 0){
                alert(result["msg"])
                location.reload();
            }
        });
    }
}

function projectStr(text){
    alert(text);
}