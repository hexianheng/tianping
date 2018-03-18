//角色列表
var userId = getCookie("userId")
var token = getCookie("token")

if(userId == "" || token == ""){
    parent.location.href = CONFIG['path'] + 'Index/Login';
}else{
    //角色下拉
    ajax("/User/getSelectRole",{"userId":userId,"token":token},function(result){
        var html = "";
        $.each(result["data"], function(idx, obj) {
            html += "<tr><td>" + obj.id + "</td>";
            html += "<td>" + obj.name + "</td>";
            html += '<td class="operation del"><a class="edit btn04" onclick="upd('+obj.id+')">修改</a>   <a class="edit btn04" onclick="del('+obj.id+')">删除</a></td></tr>';
        });
        $("#data").html(html);
    });
}

//删除
function del(id) {
    if (confirm("确定要删除吗？")) {
        ajax("/User/delRole",{"userId":userId,"token":token,"roleId":id},function(result){
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
    ajax("/User/getRoleOne",{"userId":userId,"token":token,"roleId":id},function(result){
        console.log(result)
        $("#roleName").val(result['data']['name']);
        $("#permission").val(result['data']['premission']);
        console.log(result['data'])
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