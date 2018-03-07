<?php
/* *
 * 项目控制器
 * author：PeiYun Wang
 * */
namespace Home\Controller;
use Home\Model\ItemModel;
class ItemController extends CommonController
{

    //构造方法
    public function __construct()
    {
        parent::__construct();
    }

    //添加编码
    public function addItem(){
        $data = [
            'name' => I('post.name'),
            'text' => I('post.text')
        ];
        $obj = new ItemModel();
        $result = $obj->addItem($data);
        $this->response($result,'json');
    }

    //修改编码
    public function updItem(){
        $data = [
            'id' => I('post.id'),
            'name' => I('post.name'),
            'text' => I('post.text')
        ];
        $obj = new ItemModel();
        $result = $obj->updItem($data);
        $this->response($result,'json');
    }

    //修改编码状态
    public function updateStatus(){
        $data = I('post.id');
        $obj = new ItemModel();
        $result = $obj->updateStatus($data);
        $this->response($result,'json');
    }

    //获取编码下拉
    public function itemSel(){
        $obj = new ItemModel();
        $result = $obj->itemSel();
        $this->response($result,'json');
    }

    //获取单条项目
    public function getOneItem(){
        $data = I('post.id');
        $obj = new ItemModel();
        $result = $obj->getOneItem($data);
        $this->response($result,'json');
    }

    //获取项目列表
    public function itemList(){
        $where = I('post.where');
        $page = I('post.page');
        $obj = new ItemModel();
        $result = $obj->itemList($where,$page);
        $this->response($result,'json');
    }
}