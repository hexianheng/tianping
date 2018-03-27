<?php
/* *
 * 编码控制器
 * author：PeiYun Wang
 * */
namespace Home\Controller;
use Home\Model\CodeModel;
class CodeController extends CommonController
{

    //构造方法
    public function __construct()
    {
        parent::__construct();
    }

    //添加编码
    public function addCode(){
        $data = [
            'cid' => I('post.userId'),
            'num' => I('post.num'),
            'productId' => I('post.productId'),
            'channelId' => I('post.channelId')
        ];
        $obj = new CodeModel();
        $result = $obj->addCode($data);
        $this->response($result,'json');
    }

    //分组下拉
    public function groupSel(){
        $obj = new CodeModel();
        $result = $obj->groupSel();
        $this->response($result,'json');
    }

    //编码列表
    public function codeList(){
        $data = [
            'codeStr' => I('post.codeStr'),
            'group' => I('post.group'),
            'page' => I('post.page')
        ];
        $obj = new CodeModel();
        $result = $obj->codeList($data);
        $this->response($result,'json');
    }

    //编码出库
    public function outGoing(){
        $data = [
            'mid' => I('post.userId'),
            'productId' => I('post.productId'),
            'channelId' => I('post.channelId'),
            'codeStr' => I('post.codeStr'),
        ];
        $obj = new CodeModel();
        $result = $obj->outGoing($data);
        $this->response($result,'json');
    }

    //分组列表
    public function groupList(){
        $page = I('post.page');
        $obj = new CodeModel();
        $result = $obj->groupList($page);
        $this->response($result,'json');
    }

    //分组编码出库
    public function groupOut(){
        $data = [
            'mid' => I('post.userId'),
            'group' => I('post.group'),
        ];
        $obj = new CodeModel();
        $result = $obj->groupOut($data);
        $this->response($result,'json');
    }
}