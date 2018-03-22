//编码列表
var userId = getCookie("userId");
var token = getCookie("token");

if(userId == "" || token == ""){
    parent.location.href = CONFIG['path'];
}else{
    ajax("/Code/codeList",{"userId":userId,"token":token},function(result){
        var html = "";
        $.each(result["data"], function(idx, obj) {
            html += "<tr><td><input type='checkbox' name='code' value='"+obj.id+"' /></td>";
            html += "<td>" + obj.id + "</td>";
            html += "<td>" + obj.code + "</td>";
            html += "<td>" + obj.productName + "</td>";
            html += "<td>" + obj.channelName + "</td>";
            html += "<td>" + obj.group + "</td>";
            if(obj.status == '1'){
                html += "<td>未出库</td>";
            }else{
                html += "<td>已出库</td>";
            }
            html += "<td>" + obj.ctime + "</td>";
        });
        $("#data").append(html);
        var num_max = result['page'];
        var num_page = result['maxPage'];
        $("#page").paging({
            pageNo:1,
            totalPage: num_page,
            totalSize: num_max,
            callback: function(num) {
                codeList(num);
            }
        })
    });

}

$("#all").click(function(){
    if(this.checked){
        $("[name='code']").prop("checked",true);
    }else{
        $("[name='code']").removeAttr("checked");
    }

});


$("#search").click(function(){

    var codeStr=$("#codeText").val();
    if(codeStr == ""){
        alert("搜索条件不能为空")
    }else{
        ajax("/Code/codeList",{"userId":userId,"token":token,"codeStr":codeStr},function(result){
            var html = "";
            $.each(result["data"], function(idx, obj) {
                html += "<tr><td><input type='checkbox' name='code' value='"+obj.id+"' /></td>";
                html += "<td>" + obj.id + "</td>";
                html += "<td>" + obj.code + "</td>";
                html += "<td>" + obj.productName + "</td>";
                html += "<td>" + obj.channelName + "</td>";
                html += "<td>" + obj.group + "</td>";
                if(obj.status == '1'){
                    html += "<td>未出库</td>";
                }else{
                    html += "<td>已出库</td>";
                }
                html += "<td>" + obj.ctime + "</td>";
            });
            $("#data").html(html);
            var num_max = result['maxPage'];
            var num_page = result['page'];
            $("#page").paging({
                pageNo:1,
                totalPage: num_max,
                totalSize: num_max,
                callback: function(num) {
                    codeListSearch(codeStr,num);
                }
            })
        });
    }

});

function codeList(num){
    ajax("/Code/codeList",{"userId":userId,"token":token,"page":num},function(result){
        var html = "";
        $.each(result["data"], function(idx, obj) {
            html += "<tr><td><input type='checkbox' name='code' value='"+obj.id+"' /></td>";
            html += "<td>" + obj.id + "</td>";
            html += "<td>" + obj.code + "</td>";
            html += "<td>" + obj.productName + "</td>";
            html += "<td>" + obj.channelName + "</td>";
            html += "<td>" + obj.group + "</td>";
            if(obj.status == '1'){
                html += "<td>未出库</td>";
            }else{
                html += "<td>已出库</td>";
            }
            html += "<td>" + obj.ctime + "</td>";
        });
        $("#data").html(html);
    });
}


function codeListSearch(codeStr,num){
    ajax("/Code/codeList",{"userId":userId,"token":token,"page":num,"codeStr":codeStr},function(result){
        var html = "";
        $.each(result["data"], function(idx, obj) {
            html += "<tr><td><input type='checkbox' name='code' value='"+obj.id+"' /></td>";
            html += "<td>" + obj.id + "</td>";
            html += "<td>" + obj.code + "</td>";
            html += "<td>" + obj.productName + "</td>";
            html += "<td>" + obj.channelName + "</td>";
            html += "<td>" + obj.group + "</td>";
            if(obj.status == '1'){
                html += "<td>未出库</td>";
            }else{
                html += "<td>已出库</td>";
            }
            html += "<td>" + obj.ctime + "</td>";
        });
        $("#data").html(html);
    });
}


$("#xg_btn").click(function(){
    $('.pop_layer').show();
    //产品下拉
    ajax("/Product/productSelect",{"userId":userId,"token":token},function(result){
        var html_p = "";
        $.each(result["data"], function(idx, obj) {
            html_p += "<option value = '"+ obj.id +"'>" + obj.name +"</option>";
        });
        $("#productId").html(html_p);
    });
    //渠道下拉
    ajax("/Channel/channelSelect",{"userId":userId,"token":token},function(result){
        var html_c = "";
        $.each(result["data"], function(idx, obj) {
            html_c += "<option value = '"+ obj.id +"'>" + obj.name +"</option>";
        });
        $("#channelId").html(html_c);
    });
});

$("#btn").click(function(){
    var codeStr = $("#code").val();
    var productId = $("#productId").val();
    var channelId = $("#channelId").val();
    ajax("/Code/outGoing",{"userId":userId,"token":token,"codeStr":codeStr,"productId":productId,"channelId":channelId},function(result){
        if(result["code"] == 0){
            alert(result["msg"])
            location.reload();
        }
    });
});