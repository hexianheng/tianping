
//定义配置
var CONFIG = {
    "path"  : "http://localhost:8080/gitjob/index.php/"
}




//ajax方法
function ajax(url,data,success){    
    $.ajax({
        type:"POST",
        url:CONFIG['path'] + url,
        data:data,
        datatype: "text",
        success:function(data){
            if(data['code'] == 0){
                //登陆成功
                success(data)
            }else if(data['code'] == 'A012'){
                delCookie("userId");
                delCookie("token");
                parent.location.href = CONFIG['path'] + 'Index/Login';
            }
            else if(data['code'] == '-2'){
                alert(data['msg'])
                location.reload();
            }else{
                alert(data['msg'])
                //parent.location.reload();
            }
        }    
    });
}


function setCookie(name,value){
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function delCookie(name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

        
