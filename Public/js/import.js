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
                        var html='';
                        alert(res['msg'])
                        if(res['data']['errorData'] != ""){
                            alert(res['data']['msg'])
                            $.each(res['data']['errorData'], function(idx, obj) {
                                html += obj+'\n';
                            });
                            alert(html)
                        }
                    }
                });
            }else{
                alert('请选择文件！');
            }
        }
    })
}