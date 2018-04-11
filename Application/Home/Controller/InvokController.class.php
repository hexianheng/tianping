<?php
/* *
 * 外部app控制器
 * author：PeiYun Wang
 * */
namespace Home\Controller;
use Home\Model\InvokModel;
class InvokController extends CommonController
{

    //添加app
    public function addApp(){
        $data = [
            'appName' => I('post.name'),
            'desc' => I('post.desc')
        ];
        $obj = new InvokModel();
        $result = $obj->addApp($data);
        $this->response($result,'json');
    }

    //app列表
    public function appList(){
        $page = I('post.page');
        $where = I('post.where');
        $obj = new InvokModel();
        $result = $obj->appList($where,$page);
        $this->response($result,'json');
    }

    //删除App
    public function delApp(){
        $appId = I('post.appId');
        $obj = new InvokModel();
        $result = $obj->delApp($appId);
        $this->response($result,'json');
    }
}