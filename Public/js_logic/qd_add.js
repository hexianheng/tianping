
//渠道添加
var userId = getCookie("userId")
var token = getCookie("token")

if(userId == "" || token == ""){
    parent.location.href = CONFIG['path'] + 'Index/Login';
}


$("#btn").click(function(){
    var code = $("#code").val();
    var name = $("#name").val();
    var address = $("#address").val();
    var zipCode = $("#zipCode").val();
    var email = $("#email").val();
    var label = $("#label").val();
    var linkman = $("#linkman").val();
    var linkmanEmail = $("#linkmanEmail").val();
    var linkmanPhone = $("#linkmanPhone").val();

    ajax("/Channel/addChannel",{"userId":userId,"token":token,"code":code,"name":name,"address":address,"zipCode":zipCode,"email":email,"label":label,"linkman":linkman,"linkmanEmail":linkmanEmail,"linkmanPhone":linkmanPhone},function(result){

        if(result['code'] == 0 ){
            alert(result["msg"])
            location.reload();
        }

    });
})

$("#cancel").click(function(){
    location.reload();
})