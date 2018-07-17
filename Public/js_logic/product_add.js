var userId = getCookie("userId")
var token = getCookie("token")

if(userId == "" || token == ""){
    parent.location.href = CONFIG['path'];
}else{
    ajax("/Item/itemSel",{"userId":userId,"token":token},function(result){
        var html = "";
        console.log(result)
        $.each(result["data"], function(idx, obj) {
            if(idx%5!=0){
                html += "<span style='margin-left: 20px;'><input type='checkbox' value='"+obj.itemid+"'></span>\n"+obj.name;
            }else{
                html += "<span style='margin-left: 20px;'><input type='checkbox' value='"+obj.itemid+"'></span>\n"+obj.name;
                html += "<br>";
            }
        });
        $("#itemlist").html(html);
    });
}


$("#btn").click(function(){
    var projectStr='';
    $.each($('input:checkbox:checked'),function(){
        projectStr += $(this).val()+'|';
    });
    projectStrs = projectStr.substring(0,projectStr.length-1);
    var name = $("#name").val();
    var desc = $("#desc").val();
    var panel = $("#panel").val();
    ajax("/Product/addProduct",{"userId":userId,"token":token,"name":name,"desc":desc,"projectStr":projectStrs,"panel":panel},function(result){
        if(result["code"] == 0){
            alert(result["msg"])
            location.href = CONFIG['path']+"Index/product_list";
        }
    });

})