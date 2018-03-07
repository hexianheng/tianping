//编码列表
var userId = getCookie("userId");
var token = getCookie("token");

if(userId == "" || token == ""){
    parent.location.href = CONFIG['path'] + 'Index/Login';
}else{
    ajax("/Code/codeList",{"userId":userId,"token":token},function(result){
        console.log(result);
        
        var num_page = Math.ceil((result['maxPage'])/10);
        var num_max = result['maxPage'];
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

function codeList(num){
    alert(num)
}