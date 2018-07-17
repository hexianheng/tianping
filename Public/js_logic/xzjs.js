
//添加角色
var userId = getCookie("userId")
var token = getCookie("token")

if(userId == "" || token == ""){
	parent.location.href = CONFIG['path'];
}else{
	ajax("/User/getPermission",{"userId":userId,"token":token},function(result){

		var data = result['data'];
		   var html = '';
		   for(var i = 0; i < data.length; i++){
		       html += '<div sid="'+data[i].id+'" style="padding:10px" pid="'+data[i].parentId+'"><input status="0" style="margin-right:3px" class="check" type="checkbox" name="checkbox" value="'+data[i].id+'"/>'+data[i].name+'</div>'

		   }
		   $("#list").html(html)
		    $("#list div").each(function(i){
		        if($(this).attr('pid') != 0){
		            $(this).hide()
		        }
		    })

		    $(".check").click(function(){
		        var status = $(this).attr('status');
		        var id = $(this).parent().attr('sid');
				var pids = $(this).parent().attr('pid');
				if(pids==0){
					$(this).css('margin-left','20px');
					$(this).parent().css('background-color','#6666');
				}
		        if(status == 0){
		            //下级显示
		            status = '1'

		        }else{
		            //下级隐藏
		            status = '0'
		        }
		        $(this).attr('status',status)
		        $("#list div").each(function(i){
		            if($(this).attr('pid') == id){
		                if(status == 1){
		                    $(this).show()
		                }else{
		                    $(this).hide()
		                }
		            }
		        })
		    })
    });
}


$("#btn").click(function(){

	var roleName = $("#roleName").val();
	var chenked=$("input[type='checkbox']:checked").val([]);//此为重点  
    var names = "";  
        for(var i=0;i<chenked.length;i++){  
            names += chenked[i].value +",";  
        }
        var permissionStr = names.substr(0, names.length - 1); 
        ajax("/User/addRole",{"userId":userId,"token":token,"roleName":roleName,"permissionStr":permissionStr},function(result){
        	
        	if (result['code'] == 0) {
        		alert(result["msg"])
				location.href = CONFIG['path']+"Index/js_list";
        	}

        })

})


$("#quanxuan").click(function(){
	$("input[name='checkbox']").attr("checked","true");

});
$("#buxuan").click(function(){
	$("input[name='checkbox']").removeAttr("checked");

});