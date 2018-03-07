var userId = getCookie("userId");
var token = getCookie("token");

if(userId == "" || token == ""){
    parent.location.href = CONFIG['path'] + 'Index/Login';
}else{

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

}

$("#btn").click(function(){

    var num = $("#num").val();
    var productId = $("#productId").val();
    var channelId = $("#channelId").val();
        ajax("/Code/addCode",{"userId":userId,"token":token,"num":num,"productId":productId,"channelId":channelId},function(result){
            if(result['code'] == 0 ){
                alert(result["msg"])
                location.reload();
            }        
        });

});