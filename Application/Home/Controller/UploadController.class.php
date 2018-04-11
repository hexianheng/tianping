<?php
/* *
 * 上传控制器
 * author：PeiYun Wang
 * */
namespace Home\Controller;
use Home\Model\TemplateModel;
class UploadController extends CommonController
{

    //上传
    public function fileUpload(){
        $data = [
            'file' => $_FILES,
            'type' => I('post.status'),
            'cid' => I('post.userId'),
        ];
        $obj = new TemplateModel();
        $result = $obj->fileUpload($data);
        $this->response($result,'json');
    }
}