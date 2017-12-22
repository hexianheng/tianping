<?php
/* *
 * 产品控制器
 * author：PeiYun Wang
 * */
namespace Home\Controller;
use Home\Model\ProductModel;
class ProductController extends CommonController
{

    //构造方法
    public function __construct()
    {
        parent::__construct();
    }

    //添加产品
    public function addProduct(){
        $data = [
            'cId' => I('post.userId'),
            'name' => I('post.name'),
            'desc' => I('post.desc'),
            'projectStr' => I('post.projectStr')
        ];
        $obj = new ProductModel();
        $result = $obj->addProduct($data);
        $this->response($result,'json');
    }
}