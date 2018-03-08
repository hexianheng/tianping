//编码列表
var userId = getCookie("userId");
var token = getCookie("token");

if(userId == "" || token == ""){
    parent.location.href = CONFIG['path'] + 'Index/Login';
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
            console.log(result);
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
        console.log(result);
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
        console.log(result);
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