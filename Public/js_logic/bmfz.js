//编码分组列表
var userId = getCookie("userId");
var token = getCookie("token");

if(userId == "" || token == ""){
    parent.location.href = CONFIG['path'];
}else{
    ajax("/Code/groupList",{"userId":userId,"token":token},function(result){
        var html = "";
        $.each(result["data"], function(idx, obj) {
            html += "<tr><td><input type='checkbox' name='group' value='"+obj.group+"' /></td>";
            html += "<td>" + obj.group + "</td>";
            html += "<td>" + obj.countCode + "</td>";
            html += "<td class='operation'><a class='edit btn04'onclick='excel("+obj.group+")'>导出</a>  ";
            html += "<a class='edit btn04' onclick='groupout("+obj.group+")'>分发</a> ";
            html += "<a class='edit btn04' onclick='checkout("+obj.group+")'>出库</a></td></tr>";
        });
        $("#data").append(html);
        var num_max = result['page'];
        var num_page = result['maxPage'];
        $("#page").paging({
            pageNo:1,
            totalPage: num_page,
            totalSize: num_max,
            callback: function(num) {
                groupList(num);
            }
        })
    });

}

function groupList(num){
    ajax("/Code/groupList",{"userId":userId,"token":token,"page":num},function(result){
        var html = "";
        $.each(result["data"], function(idx, obj) {
            html += "<tr><td><input type='checkbox' name='group' value='"+obj.group+"' /></td>";
            html += "<td>" + obj.group + "</td>";
            html += "<td>" + obj.countCode + "</td>";
            html += "<td class='operation'><a class='edit btn04' onclick='excel("+obj.group+")'>导出</a>  ";
            html += "<a class='edit btn04' onclick='groupout("+obj.group+")'>分发</a> ";
            html += "<a class='edit btn04' onclick='checkout("+obj.group+")'>出库</a></td></tr>";
        });
        $("#data").html(html);
    });
}


function excel(group) {
    location.href=CONFIG['path'] + "/getCsv/codeGroup/group/"+group;
}


$("#groupAll").click(function(){
    if(this.checked){
        $("[name='group']").prop("checked",true);
    }else{
        $("[name='group']").removeAttr("checked");
    }

});

$("#allExcel").click(function () {
    var group = "";
    $.each($('input:checkbox:checked'),function(){
        group += $(this).val()+"|";
    });
    group = group.substring(0,group.length-1)
    location.href=CONFIG['path'] + "/getCsv/codeGroup/group/"+group;
});

function groupout(group) {
    if(confirm("确定分发吗")){
        ajax("/Code/groupOut",{"userId":userId,"token":token,"group":group,"status":2},function(result){
            if(result["code"] == 0){
                alert(result["msg"])
                location.reload();
            }
        });
    }else{
        return false;
    }
}

function checkout(group){
    $('.pop_layer').show();
     //产品下拉
     ajax("/Product/productSelect",{"userId":userId,"token":token},function(result){
     var html_p = "";
         html_p += "<option value = ''>---请选择---</option>";
     $.each(result["data"], function(idx, obj) {
     html_p += "<option value = '"+ obj.id +"'>" + obj.name +"</option>";
     });
     $("#productId").html(html_p);
     });
     //渠道下拉
     ajax("/Channel/channelSelect",{"userId":userId,"token":token},function(result){
     var html_c = "";
         html_c += "<option value = ''>---请选择---</option>";
     $.each(result["data"], function(idx, obj) {
     html_c += "<option value = '"+ obj.id +"'>" + obj.name +"</option>";
     });
     $("#channelId").html(html_c);
     });
     $("#replace").html("<a class='preview-btn btn05' id='btn' onclick='out("+group+")'>提交</a>");
}

function out(group){
    var productId = $("#productId").val();
    var channelId = $("#channelId").val();
    ajax("/Code/groupOut",{"userId":userId,"token":token,"group":group,"productId":productId,"channelId":channelId,"status":3},function(result){
        if(result["code"] == 0){
            alert(result["msg"])
            location.reload();
        }
    });
}