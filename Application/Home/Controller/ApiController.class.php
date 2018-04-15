<?php
/* *
 * 开放api控制器
 * author：PeiYun Wang
 * */
namespace Home\Controller;
use Home\Model\ApiModel;
use Home\Model\InvokModel;
class ApiController extends BaseController {

    private $obj;
    private $apiObj;
    private $data;

    public function __construct(){
        parent::__construct();
        $this->data = json_decode($GLOBALS['HTTP_RAW_POST_DATA'],1);
        $this->apiObj = new ApiModel();
        $this->checkApi($this->data);
    }

    //绑定微信号与客户
    public function bindCustomer(){
        $result = $this->apiObj->bindCustomer($this->data);
        $this->response($result,'json');
    }

    //验证外部api请求
    public function checkApi($data){
        $obj = new InvokModel();
        $return = $obj->checkApi($data);
        if($return['code'] !== 0){
            $this->response($return,'json');
        }
    }
}