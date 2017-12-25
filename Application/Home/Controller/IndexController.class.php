<?php
/* *
 * 路由控制器
 * author：PeiYun Wang
 * */
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller {

    //首页
    /**
     * [index description]
     * @return [type] [description]
     */
    public function index(){
        $this->display('/Index/Login');
    }
}