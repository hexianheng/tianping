<?php
/* *
 * APiModel
 * author：PeiYun Wang
 * */
namespace Home\Model;
class ApiModel extends BaseModel {

    //绑定微信与客户
    public function bindCustomer($data){
        $addData = [];
        //微信openId
        if($data['uniqueId'] == ''){
            return $this->returnMsg('A078');
        }
        //验证手机号
        $reg = "/^(13|14|15|17|18)[0-9]{9}$/";
        if($data['phone'] == '' || !preg_match($reg,$data['phone'])){
            return $this->returnMsg('A079');
        }else{
            $addData['phone'] = $data['phone'];
        }
        $sql = "select id from bind_customer where phone = '$data[phone]' or uniqueId = '" . md5($data['uniqueId'].$data['appKey']) . "'";
        $re = $this->sqlQuery('bind_customer',$sql);
        if(!empty($re)){
            return $this->returnMsg('A080');
        }else{
            $addData['ctime'] = date('Y-m-d H:i:s');
            $addData['uniqueId'] = md5($data['uniqueId'].$data['appKey']);
            $addData['appKey'] = $data['appKey'];
            $this->sqlInsert('bind_customer',$addData);
            return $this->returnMsg(0);
        }
    }
}