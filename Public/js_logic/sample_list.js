
//获取解读列表
var userId = getCookie("userId")
var token = getCookie("token")

if(userId == "" || token == ""){
    parent.location.href = CONFIG['path'];
}else{
    ajax("/Customer/customerList",{"userId":userId,"token":token},function(result){
        console.log(result)
        var html = "";
        $.each(result["data"], function(idx, obj) {
            html += "<tr><td>" + obj.id + "</td>";
            html += "<td>" + obj.code + "</td>";
            html += "<td>" + obj.name + "</td>";
            html += "<td>" + obj.sex + "</td>";
            html += "<td>" + obj.age + "</td>";
            html += "<td>" + obj.phone + "</td>";
            html += "<td>" + obj.email + "</td>";
            html += "<td>" + obj.productId + "</td>";
            html += "<td>" + obj.productName + "</td>";
            html += "<td>" + obj.channelName + "</td>";
        });
        $("#data").append(html);

        var num_max = result['page'];
        var num_page = result['maxPage'];
        $("#page").paging({
            pageNo:1,
            totalPage: num_page,
            totalSize: num_max,
            callback: function(num) {
                checkList(num);
            }
        })
    });
}


function checkList(num){
    ajax("/Report/userReportList",{"userId":userId,"token":token,"page":num},function(result){
        var html = "";
        $.each(result["data"], function(idx, obj) {
            html += "<tr><td>" + obj.id + "</td>";
            html += "<td>" + obj.code + "</td>";
            html += "<td>" + obj.productId + "</td>";
            html += "<td>" + obj.pruductName + "</td>";
            html += "<td>" + obj.pruductName + "</td>";
            html += "<td>" + obj.ctime + "</td>";
        });
        $("#data").html(html);
    });
}


$("#search").click(function(){

    var where=$("#text").val();
    if(where == ""){
        alert("搜索条件不能为空")
    }else{
        ajax("/Report/userReportList",{"userId":userId,"token":token,"where":where},function(result){
            var html = "";
            $.each(result["data"], function(idx, obj) {
                html += "<tr><td>" + obj.id + "</td>";
                html += "<td>" + obj.code + "</td>";
                html += "<td>" + obj.productId + "</td>";
                html += "<td>" + obj.pruductName + "</td>";
                html += "<td>" + obj.pruductName + "</td>";
                html += "<td>" + obj.ctime + "</td>";
            });
            $("#data").html(html);

            var num_max = result['page'];
            var num_page = result['maxPage'];
            $("#page").paging({
                pageNo:1,
                totalPage: num_page,
                totalSize: num_max,
                callback: function(num) {
                    whereCheckSearch(where,num);
                }
            })
        });
    }

});

function whereCheckSearch(where,num){
    ajax("/Report/userReportList",{"userId":userId,"token":token,"where":where,"page":num},function(result){
        var html = "";
        $.each(result["data"], function(idx, obj) {
            html += "<tr><td>" + obj.id + "</td>";
            html += "<td>" + obj.code + "</td>";
            html += "<td>" + obj.productId + "</td>";
            html += "<td>" + obj.pruductName + "</td>";
            html += "<td>" + obj.pruductName + "</td>";
            html += "<td>" + obj.ctime + "</td>";
        });
        $("#data").html(html);
    });
}


