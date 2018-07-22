//编码列表
var userId = getCookie("userId");
var token = getCookie("token");
if(userId == "" || token == ""){
    parent.location.href = CONFIG['path'];
}else{
    ajax("/Product/productSelect",{"userId":userId,"token":token},function(result){
        var html_p = "";
        html_p += "<option value = '0'>---请选择---</option>";
        $.each(result["data"], function(idx, obj) {
            html_p += "<option value = '"+ obj.id +"'>" + obj.name +"</option>";
        });
        $("#chanpin").html(html_p);
    });
    //渠道下拉
    ajax("/Channel/channelSelect",{"userId":userId,"token":token},function(result){
        var html_c = "";
        html_c += "<option value = '0'>---请选择---</option>";
        $.each(result["data"], function(idx, obj) {
            html_c += "<option value = '"+ obj.id +"'>" + obj.name +"</option>";
        });
        $("#qudao").html(html_c);
    });
    ajax("/Code/codeList",{"userId":userId,"token":token},function(result){
        var html = "";
        $.each(result["data"], function(idx, obj) {
            /*html += "<tr><td><input type='checkbox' name='code' value='"+obj.id+"' /></td>";*/
            html += "<tr><td>" + obj.id + "</td>";
            html += "<td>" + obj.code + "</td>";
            if(obj.productName==null){
                html += "<td>未选择</td>";
            }else{
                html += "<td>" + obj.productName + "</td>";
            }
            if(obj.channelName==null){
                html += "<td>未选择</td>";
            }else{
                html += "<td>" + obj.channelName + "</td>";
            }
            html += "<td>" + obj.group + "</td>";
            if(obj.status == '1'){
                html += "<td>未分发</td>";
            }else if(obj.status == '2'){
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

function codeList(num){
    ajax("/Code/codeList",{"userId":userId,"token":token,"page":num},function(result){
        var html = "";
        $.each(result["data"], function(idx, obj) {
            /*html += "<tr><td><input type='checkbox' name='code' value='"+obj.id+"' /></td>";*/
            html += "<tr><td>" + obj.id + "</td>";
            html += "<td>" + obj.code + "</td>";
            if(obj.productName==null){
                html += "<td>未选择</td>";
            }else{
                html += "<td>" + obj.productName + "</td>";
            }
            if(obj.channelName==null){
                html += "<td>未选择</td>";
            }else{
                html += "<td>" + obj.channelName + "</td>";
            }
            html += "<td>" + obj.group + "</td>";
            if(obj.status == '1'){
                html += "<td>未分发</td>";
            }else if(obj.status == '2'){
                html += "<td>未出库</td>";
            }else{
                html += "<td>已出库</td>";
            }
            html += "<td>" + obj.ctime + "</td>";
        });
        $("#data").html(html);
    });
}


$("#search").click(function(){

    var codeText=$("#codeText").val();
    var codeStr = codeText.replace('\n','|');
    var channelId = $("#qudao").val();
    var productId = $("#chanpin").val();
    if(codeStr=="" && channelId=="" && productId==""){
        location.reload();
    }else{
        ajax("/Code/codeList",{"userId":userId,"token":token,"codeStr":codeStr,"channelId":channelId,"productId":productId},function(result){
            var html = "";
            $.each(result["data"], function(idx, obj) {
                /*html += "<tr><td><input type='checkbox' name='code' value='"+obj.id+"' /></td>";*/
                html += "<tr><td>" + obj.id + "</td>";
                html += "<td>" + obj.code + "</td>";
                if(obj.productName==null){
                    html += "<td>未选择</td>";
                }else{
                    html += "<td>" + obj.productName + "</td>";
                }
                if(obj.channelName==null){
                    html += "<td>未选择</td>";
                }else{
                    html += "<td>" + obj.channelName + "</td>";
                }
                html += "<td>" + obj.group + "</td>";
                if(obj.status == '1'){
                    html += "<td>未分发</td>";
                }else if(obj.status == '2'){
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
                    codeListSearch(codeStr,channelId,productId,num);
                }
            })
        });
    }

});


function codeListSearch(codeStr,channelId,productId,num){
    ajax("/Code/codeList",{"userId":userId,"token":token,"page":num,"codeStr":codeStr,"channelId":channelId,"productId":productId},function(result){
        var html = "";
        $.each(result["data"], function(idx, obj) {
            /*html += "<tr><td><input type='checkbox' name='code' value='"+obj.id+"' /></td>";*/
            html += "<tr><td>" + obj.id + "</td>";
            html += "<td>" + obj.code + "</td>";
            if(obj.productName==null){
                html += "<td>未选择</td>";
            }else{
                html += "<td>" + obj.productName + "</td>";
            }
            if(obj.channelName==null){
                html += "<td>未选择</td>";
            }else{
                html += "<td>" + obj.channelName + "</td>";
            }
            html += "<td>" + obj.group + "</td>";
            if(obj.status == '1'){
                html += "<td>未分发</td>";
            }else if(obj.status == '2'){
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
});

$("#btn").click(function(){
    var codeText=$("#code").val();
    if(codeText==""){
        alert("编码不能为空");
    }else{
        var codeStr = codeText.replace('\n','|');
        var productId = $("#productId").val();
        var channelId = $("#channelId").val();
        ajax("/Code/outGoing",{"userId":userId,"token":token,"codeStr":codeStr,"productId":productId,"channelId":channelId},function(result){
            if(result["code"] == 0){
                console.log(result)
                alert(result["msg"])
                location.reload();
            }
        });
    }
});



