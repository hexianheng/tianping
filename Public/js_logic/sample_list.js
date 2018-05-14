
//获取解读列表
var userId = getCookie("userId")
var token = getCookie("token")

if(userId == "" || token == ""){
    parent.location.href = CONFIG['path'];
}else{
    ajax("/Customer/customerList",{"userId":userId,"token":token},function(result){
        var html = "";
        $.each(result["data"], function(idx, obj) {
            html += "<tr><td>" + obj.id + "</td>";
            html += "<td>" + obj.code + "</td>";
            html += "<td>" + obj.panel + "</td>";
            html += "<td>" + obj.name + "</td>";
            html += "<td>" + obj.sex + "</td>";
            html += "<td>" + obj.age + "</td>";
            html += "<td>" + obj.phone + "</td>";
            html += "<td>" + obj.email + "</td>";
            html += "<td>" + obj.productId + "</td>";
            html += "<td>" + obj.productName + "</td>";
            html += "<td>" + obj.channelName + "</td>";
            if(obj.status == '1'){
                html += "<td>新建</td>";
            }else if(obj.status == '2'){
                html += "<td>采集盒已经寄出</td>";
            }else if(obj.status == '3'){
                html += "<td>回寄样本已经收到</td>";
            }else if(obj.status == '4'){
                html += "<td>DNA已经提取成功</td>";
            }else if(obj.status == '5'){
                html += "<td>检测已经完成</td>";
            }else if(obj.status == '6'){
                html += "<td>报告已生成</td>";
            }else if(obj.status == '7'){
                html += "<td>报告延迟</td>";
            }
            html += "<td>" + obj.address + "</td>";
            html += "<td>" + obj.addtime + "</td>";
            html += '<td><a class="btn04" onclick="del('+obj.id+')">删除</a ></td></tr>';
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
    ajax("/Customer/customerList",{"userId":userId,"token":token,"page":num},function(result){
        var html = "";
        $.each(result["data"], function(idx, obj) {
            html += "<tr><td>" + obj.id + "</td>";
            html += "<td>" + obj.code + "</td>";
            html += "<td>" + obj.panel + "</td>";
            html += "<td>" + obj.name + "</td>";
            html += "<td>" + obj.sex + "</td>";
            html += "<td>" + obj.age + "</td>";
            html += "<td>" + obj.phone + "</td>";
            html += "<td>" + obj.email + "</td>";
            html += "<td>" + obj.productId + "</td>";
            html += "<td>" + obj.productName + "</td>";
            html += "<td>" + obj.channelName + "</td>";
            if(obj.status == '1'){
                html += "<td>新建</td>";
            }else if(obj.status == '2'){
                html += "<td>采集盒已经寄出</td>";
            }else if(obj.status == '3'){
                html += "<td>回寄样本已经收到</td>";
            }else if(obj.status == '4'){
                html += "<td>DNA已经提取成功</td>";
            }else if(obj.status == '5'){
                html += "<td>检测已经完成</td>";
            }else if(obj.status == '6'){
                html += "<td>报告已生成</td>";
            }else if(obj.status == '7'){
                html += "<td>报告延迟</td>";
            }
            html += "<td>" + obj.address + "</td>";
            html += "<td>" + obj.addtime + "</td>";
            html += '<td><a class="btn04" onclick="del('+obj.id+')">删除</a ></td></tr>';
        });
        $("#data").html(html);
    });
}


$("#search").click(function(){

    var where=$("#text").val();
    if(where == ""){
        alert("搜索条件不能为空")
    }else{
        ajax("/Customer/customerList",{"userId":userId,"token":token,"where":where},function(result){
            var html = "";
            $.each(result["data"], function(idx, obj) {
                html += "<tr><td>" + obj.id + "</td>";
                html += "<td>" + obj.code + "</td>";
                html += "<td>" + obj.panel + "</td>";
                html += "<td>" + obj.name + "</td>";
                html += "<td>" + obj.sex + "</td>";
                html += "<td>" + obj.age + "</td>";
                html += "<td>" + obj.phone + "</td>";
                html += "<td>" + obj.email + "</td>";
                html += "<td>" + obj.productId + "</td>";
                html += "<td>" + obj.productName + "</td>";
                html += "<td>" + obj.channelName + "</td>";
                if(obj.status == '1'){
                    html += "<td>新建</td>";
                }else if(obj.status == '2'){
                    html += "<td>采集盒已经寄出</td>";
                }else if(obj.status == '3'){
                    html += "<td>回寄样本已经收到</td>";
                }else if(obj.status == '4'){
                    html += "<td>DNA已经提取成功</td>";
                }else if(obj.status == '5'){
                    html += "<td>检测已经完成</td>";
                }else if(obj.status == '6'){
                    html += "<td>报告已生成</td>";
                }else if(obj.status == '7'){
                    html += "<td>报告延迟</td>";
                }
                html += "<td>" + obj.address + "</td>";
                html += "<td>" + obj.addtime + "</td>";
                html += '<td><a class="btn04" onclick="del('+obj.id+')">删除</a ></td></tr>';
            });

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
    ajax("/Customer/customerList",{"userId":userId,"token":token,"where":where,"page":num},function(result){
        var html = "";
        $.each(result["data"], function(idx, obj) {
            html += "<tr><td>" + obj.id + "</td>";
            html += "<td>" + obj.code + "</td>";
            html += "<td>" + obj.panel + "</td>";
            html += "<td>" + obj.name + "</td>";
            html += "<td>" + obj.sex + "</td>";
            html += "<td>" + obj.age + "</td>";
            html += "<td>" + obj.phone + "</td>";
            html += "<td>" + obj.email + "</td>";
            html += "<td>" + obj.productId + "</td>";
            html += "<td>" + obj.productName + "</td>";
            html += "<td>" + obj.channelName + "</td>";
            if(obj.status == '1'){
                html += "<td>新建</td>";
            }else if(obj.status == '2'){
                html += "<td>采集盒已经寄出</td>";
            }else if(obj.status == '3'){
                html += "<td>回寄样本已经收到</td>";
            }else if(obj.status == '4'){
                html += "<td>DNA已经提取成功</td>";
            }else if(obj.status == '5'){
                html += "<td>检测已经完成</td>";
            }else if(obj.status == '6'){
                html += "<td>报告已生成</td>";
            }else if(obj.status == '7'){
                html += "<td>报告延迟</td>";
            }
            html += "<td>" + obj.address + "</td>";
            html += "<td>" + obj.addtime + "</td>";
            html += '<td><a class="btn04" onclick="del('+obj.id+')">删除</a ></td></tr>';
        });
        $("#data").html(html);
    });
}

function del(id) {
    if (confirm("确定要删除吗？")) {
        ajax("/Customer/delCustomer",{"userId":userId,"token":token,"id":id},function(result){
            if(result["code"] == 0){
                alert(result["msg"])
                location.reload();
            }
        });
    }
}

//批量更改状态，同时推送短信
$("#status_btn").click(function(){

    var codeArr=$("#codes").val();
    var status=$("#status").val();
    ajax("/Customer/updStatus",{"userId":userId,"token":token,"codeArr":codeArr,"status":status},function(result){
        if(result["code"] == 0){
            alert(result["msg"])
            location.reload();
        }
    });

});

