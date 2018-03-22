

//获取位点列表
var userId = getCookie("userId")
var token = getCookie("token")

if(userId == "" || token == ""){
    parent.location.href = CONFIG['path'];
}else{
    ajax("/Site/siteList",{"userId":userId,"token":token},function(result){
        console.log(result)
        var html = "";
        $.each(result["data"], function(idx, obj) {
            html += "<tr><td>" + obj.id + "</td>";
            html += "<td>" + obj.itemid + "</td>";
            html += "<td>" + obj.gene+"</td>";
            html += "<td>" + obj.origincode+"</td>";
            html += '<td><a onclick="details('+obj.id+')">详情</a></td>';
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
            html += '<td><a onclick="details('+obj.id+')">详情</a></td>';
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
                    html += '<td><a onclick="details('+obj.id+')">详情</a></td>';
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
            html += '<td><a onclick="details('+obj.id+')">详情</a></td>';
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
        $("#gene").val(result['data']['gene']);
        $("#origincode").val(result['data']['origincode']);
        $("#itemid").val(result['data']['itemid']);
        $("#gene_text").val(result['data']['gene_text']);
        $("#wild_type").val(result['data']['wild_type']);
        $("#mutant_type").val(result['data']['mutant_type']);
        $("#genotype_value_ww").val(result['data']['genotype_value_ww']);
        $("#genotype_value_wm").val(result['data']['genotype_value_wm']);
        $("#genotype_value_mm").val(result['data']['genotype_value_mm']);
        $("#risk_desc_ww").val(result['data']['risk_desc_ww']);
        $("#risk_desc_wm").val(result['data']['risk_desc_wm']);
        $("#risk_desc_mm").val(result['data']['risk_desc_mm']);
        var operation = '<a class="preview-btn btn04" onclick="update('+id+')">保存</a >';
        $("#updBtn").html(operation);
    });
}

//修改
function update(id){
    var gene = $("#gene").val();
    var origincode = $("#origincode").val();
    var itemid = $("#itemid").val();
    var gene_text = $("#gene_text").val();
    var wild_type = $("#wild_type").val();
    var mutant_type = $("#mutant_type").val();
    var genotype_value_ww = $("#genotype_value_ww").val();
    var genotype_value_wm = $("#genotype_value_wm").val();
    var genotype_value_mm = $("#genotype_value_mm").val();
    var risk_desc_ww = $("#risk_desc_ww").val();
    var risk_desc_wm = $("#risk_desc_wm").val();
    var risk_desc_mm = $("#risk_desc_mm").val();
    ajax("/Site/updSite",{"userId":userId,"token":token,"gene":gene,"origincode":origincode,"itemid":itemid,"id":id,"gene_text":gene_text,"wild_type":wild_type,"mutant_type":mutant_type,"genotype_value_ww":genotype_value_ww,"genotype_value_wm":genotype_value_wm,"genotype_value_mm":genotype_value_mm,"risk_desc_ww":risk_desc_ww,"risk_desc_wm":risk_desc_wm,"risk_desc_mm":risk_desc_mm},function(result){
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


//详情
function details(id){
    ajax("/Site/getOneSite",{"userId":userId,"token":token,"id":id},function(result){
        alert(result['data']['gene_text']);
    });
}
