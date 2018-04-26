<?php
/* *
 * 客户控制器
 * author：PeiYun Wang
 * */
namespace Home\Controller;
use Home\Model\CustomerModel;
class CustomerController extends CommonController
{

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
        $codeArr = I('post.codeArr');
        $status = I('post.status');

        $obj = new CustomerModel();
        $result = $obj->updStatus($codeArr,$status);
        $this->response($result,'json');
    }

}