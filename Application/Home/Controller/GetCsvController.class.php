<?php
/* *
 * csv下载控制器
 * author：PeiYun Wang
 * */
namespace Home\Controller;
use Home\Model\CodeModel;
use Home\Model\TemplateModel;
class GetCsvController extends BaseController {

    //登录方法
    public function codeGroup(){
        $data = I('get.group');
        $obj = new CodeModel();
        echo $obj->codeGroup($data)['msg'];
    }

    //下载模版
    public function getTemplate(){
        $templateNum = I('get.templateNum');
        $obj = new TemplateModel();
        echo $obj->getTemplate($templateNum)['msg'];
    }
}