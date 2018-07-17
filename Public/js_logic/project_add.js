var userId = getCookie("userId")
var token = getCookie("token")

if(userId == "" || token == ""){
    parent.location.href = CONFIG['path'];
}

$("#btn").click(function(){

    var name = $("#name").val();
    var text = $("#text").val();
    ajax("/Item/addItem",{"userId":userId,"token":token,"name":name,"text":text},function(result){
        if(result["code"] == 0){
            alert(result["msg"])
            location.href = CONFIG['path']+"Index/project_list";
        }
    });

})