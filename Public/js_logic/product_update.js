var userId = getCookie("userId")
var token = getCookie("token")

if(userId == "" || token == ""){
    parent.location.href = CONFIG['path'];
}else{
    var id = $("#itemid").val();
    ajax("/Product/getOneProduct",{"userId":userId,"token":token,"id":id},function(result){
        $("#name").val(result['data'][0]['name']);
        $("#desc").val(result['data'][0]['desc']);
        $("#projectStr").val(result['data'][0]['projectStr']);
        $("#panel").val(result['data'][0]['panel']);
        arr = result['data'][0]['projectStr'];
        ajax("/Item/itemSel",{"userId":userId,"token":token},function(result){
            var html = "";
            $.each(result["data"], function(idx, obj) {
                if(idx==0 || idx%5!=0){
                    if(arr.indexOf(obj.name)>=0){
                        html += "<span style='margin-left: 20px;'><input type='checkbox' value='"+obj.itemid+"' checked></span>\n"+obj.name;
                    }else{
                        html += "<span style='margin-left: 20px;'><input type='checkbox' value='"+obj.itemid+"'></span>\n"+obj.name;
                    }
                }else{
                    if(arr.indexOf(obj.name)>=0){
                        html += "<span style='margin-left: 20px;'><input type='checkbox' value='"+obj.itemid+"' checked></span>\n"+obj.name;
                        html += "<br>";
                    }else{
                        html += "<span style='margin-left: 20px;'><input type='checkbox' value='"+obj.itemid+"'></span>\n"+obj.name;
                        html += "<br>";
                    }
                }
            });
            $("#itemlist").html(html);
        });
    });
}


$("#btn").click(function(){
    //修改
    var name = $("#name").val();
    var desc = $("#desc").val();
    var projectStr='';
    $.each($('input:checkbox:checked'),function(){
        projectStr += $(this).val()+'|';
    });
    projectStrs = projectStr.substring(0,projectStr.length-1);
    var panel = $("#panel").val();
    ajax("/Product/updProduct",{"userId":userId,"token":token,"name":name,"desc":desc,"projectStr":projectStrs,"id":id,"panel":panel},function(result){
        if(result["code"] == 0){
            alert(result["msg"])
            location.href = CONFIG['path']+"Index/product_list";
        }
    });

})