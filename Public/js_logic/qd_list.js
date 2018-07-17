//渠道列表
var userId = getCookie("userId")
var token = getCookie("token")

if(userId == "" || token == ""){
    parent.location.href = CONFIG['path'];
}else{
    ajax("/Channel/listChannel",{"userId":userId,"token":token},function(result){
        var html = "";
        $.each(result["data"]["data"], function(idx, obj) {
            html += "<tr><td>" + obj.id + "</td>";
            html += "<td>" + obj.code + "</td>";
            html += "<td>" + obj.name + "</td>";
            html += "<td>" + obj.ctime + "</td>";
            if(obj.status == '1'){
                html += "<td>禁用</td>";
            }else{
                html += "<td>正常</td>";
            }
            html += "<td>" + obj.label + "</td>";

            html += "<td>" + obj.linkman + "</td>";
            html += "<td>" + obj.linkmanPhone + "</td>";
            html += "<td>" + obj.linkmanEmail + "</td>";
            if(obj.status == '1'){
                html += '<td><a class="btn04" id="xg_btn" onclick="upd('+obj.id+')">修改信息</a >  <a class="btn04" onclick="upType('+obj.id+')">启用</a ></td></tr>';
            }else{
                html += '<td><a class="btn04" id="xg_btn" onclick="upd('+obj.id+')">修改信息</a >  <a class="btn04" onclick="upType('+obj.id+')">禁用</a ></td></tr>';
            }
        });
        $("#data").append(html);
        var num_max = result['page'];
        var num_page = result["data"]['maxPage'];
        $("#page").paging({
            pageNo:1,
            totalPage: num_page,
            totalSize: num_max,
            callback: function(num) {
                channelList(num);
            }
        })
    });
}


function channelList(num){
    ajax("/Channel/listChannel",{"userId":userId,"token":token,"page":num},function(result){
        var html = "";
        $.each(result["data"]["data"], function(idx, obj) {
            html += "<tr><td>" + obj.id + "</td>";
            html += "<td>" + obj.code + "</td>";
            html += "<td>" + obj.name + "</td>";
            html += "<td>" + obj.ctime + "</td>";
            if(obj.status == '1'){
                html += "<td>禁用</td>";
            }else{
                html += "<td>正常</td>";
            }
            html += "<td>" + obj.label + "</td>";

            html += "<td>" + obj.linkman + "</td>";
            html += "<td>" + obj.linkmanPhone + "</td>";
            html += "<td>" + obj.linkmanEmail + "</td>";
            if(obj.status == '1'){
                html += '<td><a class="btn04" id="xg_btn" onclick="upd('+obj.id+')">修改信息</a >  <a class="btn04" onclick="upType('+obj.id+')">启用</a ></td></tr>';
            }else{
                html += '<td><a class="btn04" id="xg_btn" onclick="upd('+obj.id+')">修改信息</a >  <a class="btn04" onclick="upType('+obj.id+')">禁用</a ></td></tr>';
            }
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
        ajax("/Channel/listChannel",{"userId":userId,"token":token,"where":where},function(result){
            var html = "";
            $.each(result["data"]["data"], function(idx, obj) {
                html += "<tr><td>" + obj.id + "</td>";
                html += "<td>" + obj.code + "</td>";
                html += "<td>" + obj.name + "</td>";
                html += "<td>" + obj.ctime + "</td>";
                if(obj.status == '1'){
                    html += "<td>禁用</td>";
                }else{
                    html += "<td>正常</td>";
                }
                html += "<td>" + obj.label + "</td>";

                html += "<td>" + obj.linkman + "</td>";
                html += "<td>" + obj.linkmanPhone + "</td>";
                html += "<td>" + obj.linkmanEmail + "</td>";
                if(obj.status == '1'){
                    html += '<td><a class="btn04" id="xg_btn" onclick="upd('+obj.id+')">修改信息</a >  <a class="btn04" onclick="upType('+obj.id+')">启用</a ></td></tr>';
                }else{
                    html += '<td><a class="btn04" id="xg_btn" onclick="upd('+obj.id+')">修改信息</a >  <a class="btn04" onclick="upType('+obj.id+')">禁用</a ></td></tr>';
                }
            });
            $("#data").html(html);
            var num_max = result['page'];
            var num_page = result["data"]['maxPage'];
            $("#page").paging({
                pageNo:1,
                totalPage: num_page,
                totalSize: num_max,
                callback: function(num) {
                    channelListsearch(where,num);
                }
            })
        });
    }

});

function channelListsearch(where,num){
    ajax("/Channel/listChannel",{"userId":userId,"token":token,"page":num,"where":where},function(result){
        var html = "";
        $.each(result["data"]["data"], function(idx, obj) {
            html += "<tr><td>" + obj.id + "</td>";
            html += "<td>" + obj.code + "</td>";
            html += "<td>" + obj.name + "</td>";
            html += "<td>" + obj.ctime + "</td>";
            if(obj.status == '1'){
                html += "<td>禁用</td>";
            }else{
                html += "<td>正常</td>";
            }
            html += "<td>" + obj.label + "</td>";

            html += "<td>" + obj.linkman + "</td>";
            html += "<td>" + obj.linkmanPhone + "</td>";
            html += "<td>" + obj.linkmanEmail + "</td>";
            if(obj.status == '1'){
                html += '<td><a class="btn04" id="xg_btn" onclick="upd('+obj.id+')">修改信息</a >  <a class="btn04" onclick="upType('+obj.id+')">启用</a ></td></tr>';
            }else{
                html += '<td><a class="btn04" id="xg_btn" onclick="upd('+obj.id+')">修改信息</a >  <a class="btn04" onclick="upType('+obj.id+')">禁用</a ></td></tr>';
            }
        });
        $("#data").html(html);
    });
}

//修改状态
function upType(id) {
    if (confirm("确定要修改吗？")) {
        ajax("/Channel/updateStatus",{"userId":userId,"token":token,"id":id},function(result){
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
    ajax("/Channel/getOneChannel",{"userId":userId,"token":token,"id":id},function(result){
        $("#code").val(result['data']['code']);
        $("#name").val(result['data']['name']);
        $("#address").val(result['data']['address']);
        $("#zipCode").val(result['data']['zipCode']);
        $("#email").val(result['data']['email']);
        $("#label option[value='"+result['data']['label']+"']").attr("selected", true);
        $("#linkman").val(result['data']['linkman']);
        $("#linkmanEmail").val(result['data']['linkmanEmail']);
        $("#linkmanPhone").val(result['data']['linkmanPhone']);
        var operation = "<a class='cancel-btn btn05' onclick='update("+result['data']['id']+")'>保存</a >";
        $("#operation").html(operation);
    });
}

//修改用户信息
function update(id){
    var code = $("#code").val();
    var name = $("#name").val();
    var address = $("#address").val();
    var zipCode = $("#zipCode").val();
    var email = $("#email").val();
    var label = $("#label").val();
    var linkman = $("#linkman").val();
    var linkmanEmail = $("#linkmanEmail").val();
    var linkmanPhone = $("#linkmanPhone").val();

    ajax("/Channel/updChannel",{"userId":userId,"token":token,"code":code,"name":name,"address":address,"zipCode":zipCode,"email":email,"label":label,"linkman":linkman,"linkmanEmail":linkmanEmail,"linkmanPhone":linkmanPhone,"id":id},function(result){

        if(result['code'] == 0 ){
            alert(result["msg"])
            location.reload();
        }

    });
}