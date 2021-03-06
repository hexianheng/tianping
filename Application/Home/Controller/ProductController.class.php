<?php
/* *
 * 产品控制器
 * author：PeiYun Wang
 * */
namespace Home\Controller;
use Home\Model\ProductModel;
class ProductController extends CommonController
{

    //添加产品
    public function addProduct(){
        $data = [
            'cId' => I('post.userId'),
            'name' => I('post.name'),
            'desc' => I('post.desc'),
            'projectStr' => I('post.projectStr'),
            'panel' => I('post.panel')
        ];
        $obj = new ProductModel();
        $result = $obj->addProduct($data);
        $this->response($result,'json');
    }

    //修改产品
    public function updProduct(){
        $data = [
            'id' => I('post.id'),
            'mId' => I('post.userId'),
            'name' => I('post.name'),
            'desc' => I('post.desc'),
            'projectStr' => I('post.projectStr'),
            'panel' => I('post.panel')
        ];
        $obj = new ProductModel();
        $result = $obj->updProduct($data);
        $this->response($result,'json');
    }

    //获取产品单条数据
    public function getOneProduct(){
        $id = I('post.id');
        $obj = new ProductModel();
        $result = $obj->getOneProduct($id);
        $this->response($result,'json');
    }

    //修改产品状态
    public function updateStatus(){
        $id = I('post.id');
        $obj = new ProductModel();
        $result = $obj->updateStatus($id);
        $this->response($result,'json');
    }

    //获取产品列表
    public function listProduct(){
        $page = I('post.page');
        $name = I('post.name');
        $obj = new ProductModel();
        $result = $obj->listProduct($page,$name);
        $this->response($result,'json');
    }

    //获取产品下拉
    public function productSelect(){
        $obj = new ProductModel();
        $result = $obj->productSelect();
        $this->response($result,'json');
    }
}