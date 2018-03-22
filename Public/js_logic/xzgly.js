//新增用户
//
var userId = getCookie("userId")
var token = getCookie("token")

var sex = 1;

$('.sex_get').click(function(){
    sex = $(this).val();
});
if(userId == "" || token == ""){
    parent.location.href = CONFIG['path'];
}else{
    //渠道下拉
    ajax("/Channel/channelSelect",{"userId":userId,"token":token},function(result){
        var html_c = "";
        $.each(result["data"], function(idx, obj) {
            html_c += "<option value = '"+ obj.id +"'>" + obj.name +"</option>";
        });
        $("#channelId").html(html_c);
    });
    //角色下拉
    ajax("/User/getSelectRole",{"userId":userId,"token":token},function(result){
        var html_u = "";
        $.each(result["data"], function(idx, obj) {
            html_u += "<option value = '"+ obj.id +"'>" + obj.name +"</option>";
        });
        $("#roleId").html(html_u);
    });
}

$("#scmm").click(function(){
    var num ="";
    nums = randomNum(6);
    num = '<input type="text" name="start-pwd" id="password" class="w100 start-pwd" disabled value="' + nums +'">';
    $("#Pwd").html(num);
})


function randomNum(n){
    var t='';
    for(var i=0;i<n;i++){
        t+=Math.floor(Math.random()*10);
    }
    return t;
}

$("#btn").click(function(){

    var roleId = $("#roleId").val();
    var userName = $("#userName").val();
    var password = $("#password").val();
    var phone = $("#phone").val();
    var email = $("#email").val();
    var channelId = $("#channelId").val();
    var job = $("#job").val();
    ajax("/User/addUser",{"userId":userId,"token":token,"roleId":roleId,"userName":userName,"password":password,"phone":phone,"email":email,"sex":sex,"channelId":channelId,"job":job},function(result){
        if(result["code"] == 0){
            alert(result["msg"])
            location.reload();
        }
    });

});