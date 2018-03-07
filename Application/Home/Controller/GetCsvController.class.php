<?php
/* *
 * csv下载控制器
 * author：PeiYun Wang
 * */
namespace Home\Controller;
use Home\Model\CodeModel;
class GetCsvController extends BaseController {

    //登录方法
    public function codeGroup(){
        $data = I('get.group');
        $obj = new CodeModel();
        echo $obj->codeGroup($data)['msg'];
    }
}