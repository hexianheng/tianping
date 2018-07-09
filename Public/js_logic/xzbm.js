var userId = getCookie("userId");
var token = getCookie("token");

if(userId == "" || token == ""){
    parent.location.href = CONFIG['path'];
}else{

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

}

$("#btn").click(function(){

    var code=$("#code").val();
    var importStr = code.replace('\n','|');
    var productId = $("#productId").val();
    var channelId = $("#channelId").val();
    ajax("/Code/importCode",{"userId":userId,"token":token,"importStr":importStr,"productId":productId,"channelId":channelId},function(result){
        if(result['code'] == 0 ){
            alert(result["msg"])
            location.reload();
        }
    });

});

$("#outbtn").click(function(){
    location.reload();
});