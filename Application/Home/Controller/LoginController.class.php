<?php
/* *
 * 登陆控制器
 * author：PeiYun Wang
 * */
namespace Home\Controller;
use Home\Model\UserModel;
class LoginController extends BaseController {
    public $obj;
    //构造方法
    public function __construct(){
        $this->obj = new UserModel();
    }

    //登录方法
    public function login(){
        $data['uname'] = I('post.userName');
        $data['pwd'] = I('post.password');
        $result = $this->obj->login($data);
        $this->response($result,'json');
    }

    //发送手机验证吗
    public function sendPhoneCheck(){
        $data['phone'] = I('post.phone');
        $obj = new UserModel();
        $result = $obj->sendPhoneCheck($data);
        $this->response($result,'json');
    }
}