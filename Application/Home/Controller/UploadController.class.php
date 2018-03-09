<?php
/* *
 * 上传控制器
 * author：PeiYun Wang
 * */
namespace Home\Controller;
use Home\Model\TemplateModel;
class UploadController extends CommonController
{
    //构造方法
    public function __construct(){
        parent::__construct();
    }

    //上传
    public function fileUpload(){
        $data = [
            'file' => $_FILES,
            'type' => I('post.status'),
            'cid' => I('post.cid'),
        ];
        $obj = new TemplateModel();
        $result = $obj->fileUpload($data);
        $this->response($result,'json');
    }
}