<?php
namespace Home\Controller;
use Home\Model\UserModel;

class CommonController extends BaseController {

    private $obj;
    protected $msg; //存储用户信息

    //构造方法
    public function __construct(){
        parent::__construct();
        //实例化
        $this->obj = new UserModel();
        //验证userId,token
        $this->checkToken();
        //验证是否有请求权限
        $this->checkRequest();
    }

    //验证token
    public function checkToken(){
        $userId = I('userId');
        $token = I('token');
        $return = $this->obj->checkToken($userId,$token);
        if($return['code'] !== 0){
            $this->response($return,'json');
        }
        $this->msg = $return;
    }

    //验证请求权限
    public function checkRequest(){
        $return = $this->obj->returnMsg(-2);
        if(empty($this->msg['data']['permission'])){
            $this->response($return,'json');
        }
        $status = 0;
        foreach($this->msg['data']['permission'] as $val){
            if($val['action'] == CONTROLLER_NAME && $val['function'] == ACTION_NAME){
                $status = 1;
            }
        }
        if($status == 0){
            $this->response($return,'json');
        }
    }
}