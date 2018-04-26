<?php
/* *
 * 开放api控制器
 * author：PeiYun Wang
 * */
namespace Home\Controller;
use Home\Model\ApiModel;
use Home\Model\InvokModel;
class ApiController extends BaseController {

    private $apiObj;
    private $data;

    public function __construct(){
        parent::__construct();
        $this->data = json_decode($GLOBALS['HTTP_RAW_POST_DATA'],1);
        $this->apiObj = new ApiModel();
        $this->checkApi($this->data);
    }

    //验证外部api请求
    public function checkApi($data){
        $obj = new InvokModel();
        $return = $obj->checkApi($data);
        if($return['code'] !== 0){
            $this->response($return,'json');
        }
    }

    //绑定微信号与客户
    public function bindCustomer(){
        $result = $this->apiObj->bindCustomer($this->data);
        $this->response($result,'json');
    }

    //查询编码状态
    public function queryCode(){
        $result = $this->apiObj->queryCode($this->data);
        $this->response($result,'json');
    }

    //添加客户
    public function addCustomer(){
        $result = $this->apiObj->addCustomer($this->data);
        $this->response($result,'json');
    }

    //获取绑定的编码列表
    public function getCode(){
        $result = $this->apiObj->getCode($this->data);
        $this->response($result,'json');
    }

    //获取绑定编码的详细数据
    public function getCodeDetail(){
        $result = $this->apiObj->getCodeDetail($this->data);
        $this->response($result,'json');
    }

    //更新客户回寄地址
    public function updAddress(){
        $result = $this->apiObj->updAddress($this->data);
        $this->response($result,'json');
    }

    //更新回寄单
    public function updReturnMail(){
        $result = $this->apiObj->updReturnMail($this->data);
        $this->response($result,'json');
    }

    //记录问卷回复
    public function recordAnswer(){
        $result = $this->apiObj->recordAnswer($this->data);
        $this->response($result,'json');
    }
}