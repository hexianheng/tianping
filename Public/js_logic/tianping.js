
var username = getCookie("uname");
var roleName = getCookie("roleName");

if(username == "" || roleName == ""){
	parent.location.href = CONFIG['path'] + 'Index/Login';
}else{
	$("#uname").text(username + '(' + roleName + ')')
}

	function showTime()
	{
		 //创建Date对象
		 var today = new Date();
		 //分别取出年、月、日、时、分、秒
		 var year = today.getFullYear();
		 var month = today.getMonth()+1;
		 var day = today.getDate();
		 var hours = today.getHours();
		 var minutes = today.getMinutes();
		 var seconds = today.getSeconds();
		 //如果是单个数，则前面补0
		 month  = month<10  ? "0"+month : month;
		 day  = day <10  ? "0"+day : day;
		 hours  = hours<10  ? "0"+hours : hours;
		 minutes = minutes<10 ? "0"+minutes : minutes;
		 seconds = seconds<10 ? "0"+seconds : seconds;
		  
		 //构建要输出的字符串
		 var str = year+"年"+month+"月"+day+"日 "+hours+":"+minutes+":"+seconds;
		  
		 //获取id=result的对象
		 var obj = document.getElementById("datetime");
		 //将str的内容写入到id=result的<div>中去
		 obj.innerHTML = str;
		 //延时器
		 window.setTimeout("showTime()",1000);
	}

	$("#exit").click(function(){
		//alert(123)
		var userid = getCookie("userId");
		var token = getCookie("token");
		$.ajax({
	        type:"POST",
	        url:CONFIG['path'] + "User/logout",
	        data:{"userId":userid,"token":token},
	        datatype: "text",
	        success:function(data){
	         
		        delCookie("userId");
		        delCookie("token");
		        parent.location.href = CONFIG['path'] + 'Index/Login';
	         
	        }    
	    });
	})