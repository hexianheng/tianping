

//获取位点列表
var userId = getCookie("userId")
var token = getCookie("token")

if(userId == "" || token == ""){
    parent.location.href = CONFIG['path'] + 'Index/Login';
}else{
    ajax("/Site/siteList",{"userId":userId,"token":token},function(result){
        console.log(result)
        var html = "";
        $.each(result["data"], function(idx, obj) {
            html += "<tr><td>" + obj.id + "</td>";
            html += "<td>" + obj.itemid + "</td>";
            html += "<td>" + obj.gene+"</td>";
            html += "<td>" + obj.origincode+"</td>";
            html += "<td></td>";
            html += "<td>" + obj.wild_type+"</td>";
            html += "<td>" + obj.mutant_type+"</td>";
            html += "<td>" + obj.genotype_value_ww+"</td>";
            html += "<td>" + obj.genotype_value_wm+"</td>";
            html += "<td>" + obj.genotype_value_mm+"</td>";
            html += "<td>" + obj.risk_desc_ww+"</td>";
            html += "<td>" + obj.risk_desc_wm+"</td>";
            html += "<td>" + obj.risk_desc_mm+"</td>";

            if(obj.status == '1'){
                html += "<td>禁用</td>";
            }else{
                html += "<td>正常</td>";
            }
            html += '<td><a class="btn04" id="xg_btn" onclick="upd('+obj.id+')">修改信息</a >  <a class="btn04" onclick="updType('+obj.id+')">更改状态</a ></td></tr>';

        });
        $("#data").append(html);

        var num_max = result['page'];
        var num_page = result['maxPage'];
        $("#page").paging({
            pageNo:1,
            totalPage: num_page,
            totalSize: num_max,
            callback: function(num) {
                siteList(num);
            }
        })
    });
}


function siteList(num){
    ajax("/Site/siteList",{"userId":userId,"token":token},function(result) {
        var html = "";
        $.each(result["data"], function (idx, obj) {
            html += "<tr><td>" + obj.id + "</td>";
            html += "<td>" + obj.itemid + "</td>";
            html += "<td>" + obj.gene + "</td>";
            html += "<td>" + obj.origincode + "</td>";
            html += "<td></td>";
            html += "<td>" + obj.wild_type + "</td>";
            html += "<td>" + obj.mutant_type + "</td>";
            html += "<td>" + obj.genotype_value_ww + "</td>";
            html += "<td>" + obj.genotype_value_wm + "</td>";
            html += "<td>" + obj.genotype_value_mm + "</td>";
            html += "<td>" + obj.risk_desc_ww + "</td>";
            html += "<td>" + obj.risk_desc_wm + "</td>";
            html += "<td>" + obj.risk_desc_mm + "</td>";

            if (obj.status == '1') {
                html += "<td>禁用</td>";
            } else {
                html += "<td>正常</td>";
            }
            html += '<td><a class="btn04" id="xg_btn" onclick="upd(' + obj.id + ')">修改信息</a >  <a class="btn04" onclick="updType(' + obj.id + ')">更改状态</a ></td></tr>';

        });
        $("#data").html(html);
    })
}


//搜索
$("#search").click(function(){

    var where=$("#text").val();
    if(where == ""){
        alert("搜索条件不能为空")
    }else{
        ajax("/Site/siteList",{"userId":userId,"token":token,"where":where},function(result){
            if(result['data'] == ""){
                alert("无数据")
            }else{
                var html = "";
                $.each(result["data"], function (idx, obj) {
                    html += "<tr><td>" + obj.id + "</td>";
                    html += "<td>" + obj.itemid + "</td>";
                    html += "<td>" + obj.gene + "</td>";
                    html += "<td>" + obj.origincode + "</td>";
                    html += "<td></td>";
                    html += "<td>" + obj.wild_type + "</td>";
                    html += "<td>" + obj.mutant_type + "</td>";
                    html += "<td>" + obj.genotype_value_ww + "</td>";
                    html += "<td>" + obj.genotype_value_wm + "</td>";
                    html += "<td>" + obj.genotype_value_mm + "</td>";
                    html += "<td>" + obj.risk_desc_ww + "</td>";
                    html += "<td>" + obj.risk_desc_wm + "</td>";
                    html += "<td>" + obj.risk_desc_mm + "</td>";

                    if (obj.status == '1') {
                        html += "<td>禁用</td>";
                    } else {
                        html += "<td>正常</td>";
                    }
                    html += '<td><a class="btn04" id="xg_btn" onclick="upd(' + obj.id + ')">修改信息</a >  <a class="btn04" onclick="updType(' + obj.id + ')">更改状态</a ></td></tr>';

                });
                $("#data").html(html);
                var num_max = result['maxPage'];
                var num_page = result['page'];
                $("#page").paging({
                    pageNo:1,
                    totalPage: num_max,
                    totalSize: num_max,
                    callback: function(num) {
                        siteSearch(where,num);
                    }
                })
            }
        });
    }

});

function siteSearch(where,num){
    ajax("/Site/siteList",{"userId":userId,"token":token,"page":num,"where":where},function(result){
        var html = "";
        $.each(result["data"], function (idx, obj) {
            html += "<tr><td>" + obj.id + "</td>";
            html += "<td>" + obj.itemid + "</td>";
            html += "<td>" + obj.gene + "</td>";
            html += "<td>" + obj.origincode + "</td>";
            html += "<td></td>";
            html += "<td>" + obj.wild_type + "</td>";
            html += "<td>" + obj.mutant_type + "</td>";
            html += "<td>" + obj.genotype_value_ww + "</td>";
            html += "<td>" + obj.genotype_value_wm + "</td>";
            html += "<td>" + obj.genotype_value_mm + "</td>";
            html += "<td>" + obj.risk_desc_ww + "</td>";
            html += "<td>" + obj.risk_desc_wm + "</td>";
            html += "<td>" + obj.risk_desc_mm + "</td>";

            if (obj.status == '1') {
                html += "<td>禁用</td>";
            } else {
                html += "<td>正常</td>";
            }
            html += '<td><a class="btn04" id="xg_btn" onclick="upd(' + obj.id + ')">修改信息</a >  <a class="btn04" onclick="updType(' + obj.id + ')">更改状态</a ></td></tr>';

        });
        $("#data").html(html);
    });
}

/*//添加
$("#xg_btn").click(function(){
    $('.pop_layer').show();
})
$("#addBtn").click(function(){
    var name = $("#name").val();
    var text = $("#textInfo").val();
    ajax("/Item/addItem",{"userId":userId,"token":token,"name":name,"text":text},function(result){
        if(result["code"] == 0){
            alert(result["msg"])
            location.reload();
        }
    });
})*/



//修改
function upd(id) {
    $('.pop_layer').show();
    ajax("/Site/getOneSite",{"userId":userId,"token":token,"id":id},function(result){
        console.log(result)
        $("#name").val(result['data'][0]['name']);
        $("#textInfo").val(result['data'][0]['text']);
        var operation = "<a class='preview-btn btn04' onclick='update("+result['data'][0]['itemid']+")'>保存</a >";
        $("#addbtn").html(operation);
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
