
//定义配置
var CONFIG = {
    "path"  : ""
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
            }else if(data['code'] == 'A011' || data['code'] == 'A012'){
                delCookie("userId");
                delCookie("token");
                delCookie("uname");
                delCookie("roleName");
                parent.location.href = CONFIG['path'];
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




function setCookie(name,value,iDay){
    if(iDay){
        var oDate = new Date();
        oDate.setDate(oDate.getDate()+iDay);
        oDate.setHours(0,0,0,0);
        document.cookie = name+'='+escape(value)+'; PATH=/; EXPIRES='+oDate.toGMTString();
    }else{
        document.cookie = name+'='+escape(value)+'; PATH=/';
    }
}

function getCookie(name){
    var str = document.cookie;
    var arr = str.split('; ');
    for(var i = 0;i < arr.length;i++){
        if(arr[i].split('=')[0] == name){
            return unescape(arr[i].split('=')[1]);
        }
    }
    return '';
}
function delCookie(name){
    setCookie(name,1,-1);
}
/*function setCookie(name,value){
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
        document.cookie= name + "="+cval+";expires="+exp.toGMTString()+";path=/";
}*/

        
