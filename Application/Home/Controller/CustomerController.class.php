<?php
/* *
 * 客户控制器
 * author：PeiYun Wang
 * */
namespace Home\Controller;
use Home\Model\CustomerModel;
class CustomerController extends CommonController
{

    //构造方法
    public function __construct()
    {
        parent::__construct();
    }

    //客户列表
    public function customerList(){
        $page = I('post.page');
        $where = I('post.where');
        $obj = new CustomerModel();
        $result = $obj->customerList($where,$page);
        $this->response($result,'json');
    }

}