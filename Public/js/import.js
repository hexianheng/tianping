var userId = getCookie("userId");
var token = getCookie("token");

if(userId == "" || token == ""){
    parent.location.href = CONFIG['path'];
}else{
    $('.import_file').click(function(){
        var status = $(this).attr('status');
        if(status){
            var file = $(this).parent().parent().find(".file_content").get(0).files[0];
            if(file){
                var fd = new FormData();
                fd.append("files",file);
                fd.append("status",status);
                fd.append("userId",userId);
                fd.append("token",token);
                $.ajax({
                    url:"../upload/fileUpload",
                    type:"post",
                    processData: false,
                    contentType: false,
                    cache: false,
                    data:fd,
                    async: false,
                    success:function(res){
                        if(res['code'] == 'A011' || res['code'] == 'A012'){
                            delCookie("userId");
                            delCookie("token");
                            delCookie("uname");
                            delCookie("roleName");
                            alert("登陆超时，请先登录")
                            parent.location.href = CONFIG['path'];
                        }
                        else if(res['code'] == '-2'){
                            alert(res['msg'])
                            location.reload();
                        }else{
                            var html='';
                            alert(res['msg'])
                            if(res.hasOwnProperty(res['data']['num'])){
                                alert("成功"+res['data']['num']+"条")
                            }else{
                                alert(res['data']['msg'])
                                $.each(res['data']['errorData'], function(idx, obj) {
                                    html += obj+'\n';
                                });
                                alert(html)
                            }
                        }
                    }
                });
            }else{
                alert('请选择文件！');
            }
        }
    })
}

$("#file_formData").change(function () {
    var file = $("#file_formData").val();  //获取文件上传的绝对路径
    var star = file.lastIndexOf("\\");  // 截取最后一个斜杠，两个斜杠是转译第一个
    var end = file.length;   //获取绝对路径总长度
    var name = file.substr(star+1,end);//截取文件名
    //console.log(name);
    $("#show_formData").html(name);
});

$("#file_form").change(function () {
    var file = $("#file_form").val();  //获取文件上传的绝对路径
    var star = file.lastIndexOf("\\");  // 截取最后一个斜杠，两个斜杠是转译第一个
    var end = file.length;   //获取绝对路径总长度
    var name = file.substr(star+1,end);//截取文件名
    //console.log(name);
    $("#show_form").html(name);
});

$("#file_product").change(function () {
    var file = $("#file_product").val();  //获取文件上传的绝对路径
    var star = file.lastIndexOf("\\");  // 截取最后一个斜杠，两个斜杠是转译第一个
    var end = file.length;   //获取绝对路径总长度
    var name = file.substr(star+1,end);//截取文件名
    //console.log(name);
    $("#show_product").html(name);
});

$("#file_project").change(function () {
    var file = $("#file_project").val();  //获取文件上传的绝对路径
    var star = file.lastIndexOf("\\");  // 截取最后一个斜杠，两个斜杠是转译第一个
    var end = file.length;   //获取绝对路径总长度
    var name = file.substr(star+1,end);//截取文件名
    //console.log(name);
    $("#show_project").html(name);
});

$("#file_site").change(function () {
    var file = $("#file_site").val();  //获取文件上传的绝对路径
    var star = file.lastIndexOf("\\");  // 截取最后一个斜杠，两个斜杠是转译第一个
    var end = file.length;   //获取绝对路径总长度
    var name = file.substr(star+1,end);//截取文件名
    //console.log(name);
    $("#show_site").html(name);
});