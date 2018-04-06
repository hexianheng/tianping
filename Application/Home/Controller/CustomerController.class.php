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

    //删除客户
    public function delCustomer(){
        $id = I('post.id');
        $obj = new CustomerModel();
        $result = $obj->delCustomer($id);
        $this->response($result,'json');
    }

    //修改客户状态
    public function updStatus(){
        $idStr = I('post.idStr');
        $obj = new CustomerModel();
        $result = $obj->updStatus($idStr);
        $this->response($result,'json');
    }

}