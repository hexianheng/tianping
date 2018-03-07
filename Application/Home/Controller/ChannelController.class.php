<?php
/* *
 * 渠道控制器
 * author：PeiYun Wang
 * */
namespace Home\Controller;
use Home\Model\ChannelModel;
class ChannelController extends CommonController {

    //构造方法
    public function __construct(){
        parent::__construct();
    }

    //添加渠道
    public function addChannel(){
        $data = [
            'userId' => I('post.userId'),
            'code' => I('post.code'),
            'name' => I('post.name'),
            'address' => I('post.address'),
            'zipCode' => I('post.zipCode'),
            'email' => I('post.email'),
            'linkman' => I('post.linkman'),
            'linkmanPhone' => I('post.linkmanPhone'),
            'linkmanEmail' => I('post.linkmanEmail'),
            'label' => I('post.label')
        ];
        $obj = new ChannelModel();
        $result = $obj->addChannel($data);
        $this->response($result,'json');
    }

    //修改渠道
    public function updChannel(){
        $data = [
            'id' => I('post.id'),
            'userId' => I('post.userId'),
            'code' => I('post.code'),
            'name' => I('post.name'),
            'address' => I('post.address'),
            'zipCode' => I('post.zipCode'),
            'email' => I('post.email'),
            'linkman' => I('post.linkman'),
            'linkmanPhone' => I('post.linkmanPhone'),
            'linkmanEmail' => I('post.linkmanEmail'),
            'label' => I('post.label')
        ];
        $obj = new ChannelModel();
        $result = $obj->updChannel($data);
        $this->response($result,'json');
    }

    //获取单条渠道数据
    public function getOneChannel(){
        $id = I('post.id');
        $obj = new ChannelModel();
        $result = $obj->getOneChannel($id);
        $this->response($result,'json');
    }

    //修改渠道状态
    public function updateStatus(){
        $id = I('post.id');
        $obj = new ChannelModel();
        $result = $obj->updateStatus($id);
        $this->response($result,'json');
    }

    //获取渠道下拉
    public function channelSelect(){
        $obj = new ChannelModel();
        $result = $obj->channelSelect();
        $this->response($result,'json');
    }

    //获取渠道列表
    public function listChannel(){
        $page = I('post.page');
        $obj = new ChannelModel();
        $result = $obj->listChannel($page);
        $this->response($result,'json');
    }
}