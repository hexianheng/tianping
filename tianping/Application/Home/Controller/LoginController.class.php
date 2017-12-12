<?php
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

    //注册方法
    public function register(){
        $data['uname'] = I('post.userName');
        $data['pwd'] = I('post.password');
        $data['pwdAgain'] = I('post.pwdAgain');
        $data['phone'] = I('post.phone');
        $data['email'] = I('post.email');
        $result = $this->obj->register($data);
        $this->response($result,'json');
    }
}