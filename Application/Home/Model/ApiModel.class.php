<?php
/* *
 * APiModel
 * author：PeiYun Wang
 * */
namespace Home\Model;
class ApiModel extends BaseModel {

    //绑定微信与客户
    public function bindCustomer($data){
        //微信openId
        if($data['uniqueId'] == ''){
            return $this->returnMsg('A078');
        }
        //验证手机号
        $reg = "/^(13|14|15|17|18)[0-9]{9}$/";
        if($data['phone'] == '' || !preg_match($reg,$data['phone'])){
            return $this->returnMsg('A079');
        }
        $sql = "select id from bind_customer where phone = '$data[phone]'";
        $re = $this->sqlQuery('bind_customer',$sql);
        if(!empty($re)){
            return $this->returnMsg('A080');
        }else{
            $data['ctime'] = date('Y-m-d H:i:s');
            $data['wxOpenId'] = md5($data['wxOpenId']);
            $this->sqlInsert('bind_customer',$data);
            return $this->returnMsg(0);
        }
    }
}