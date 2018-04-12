<?php
/* *
 * 开放api控制器
 * author：PeiYun Wang
 * */
namespace Home\Controller;
use Home\Model\ApiModel;
class ApiController extends CommonController {

    //构造方法
    public function __construct(){
        //调取验证
        $this->checkApi();
    }

    //绑定微信号与客户
    public function bindCustomer(){
        $data = [
            'phone' => I('post.phone'),
            'wxOpenId' => I('post.wxOpenId')
        ];
        $obj = new ApiModel();
        $result = $obj->bindCustomer($data);
        $this->response($result,'json');
    }
}