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
        //唯一请求ID
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

    //查询编码状态
    public function queryCode($data){
        $result = [
            'isExist' => 0,
            'customerBinding' => 0
        ];
        //唯一请求ID
        if($data['uniqueId'] == ''){
            return $this->returnMsg('A078');
        }
        //验证编码
        if($data['code'] == ''){
            return $this->returnMsg('A082');
        }
        $sql = "select code from code where code = '$data[code]' and status = 3";
        $re = $this->sqlQuery('code',$sql);
        if(!empty($re)){
            $result['isExist'] = 1;
        }
        $sql = "select phone from customer where code = '$data[code]'";
        $re = $this->sqlQuery('customer',$sql);
        if(!empty($re)){
            $result['customerBinding'] = 1;
        }
        return $this->returnMsg(0,$result);
    }

    //添加客户
    public function addCustomer($data){
        //唯一请求ID
        if($data['uniqueId'] == ''){
            return $this->returnMsg('A078');
        }
        //验证code
        if($data['code'] == ''){
            return $this->returnMsg('A082');
        }
        //验证姓名
        if($data['name'] == ''){
            return $this->returnMsg('A083');
        }
        //验证性别
        if($data['sex'] == '' || !in_array($data['sex'],['男','女','未知'])){
            return $this->returnMsg('A084');
        }
        //验证年龄
        if($data['age'] == '' || !is_numeric(intval($data['age'])) || intval($data['age']) <= 0){
            return $this->returnMsg('A085');
        }
        //验证手机号
        $reg = "/^(13|14|15|17|18)[0-9]{9}$/";
        if($data['phone'] == '' || !preg_match($reg,$data['phone'])){
            return $this->returnMsg('A078');
        }
        //验证email
        if($data['email'] == '' || !strstr($data['email'],'@') || !strstr($data['email'],'.')){
            return $this->returnMsg('A086');
        }
        $sql = "select code from code where code = '$data[code]' and status = 3";
        $re = $this->sqlQuery('code',$sql);
        if(empty($re)){
            return $this->returnMsg('A082');
        }
        $sql = "select phone from customer where code = '$data[code]'";
        $re = $this->sqlQuery('customer',$sql);
        if(!empty($re)){
            return $this->returnMsg('A087');
        }
        $addData = [
            'uniqueId' => md5($data['uniqueId'].$data['appKey']),
            'code' => $data['code'],
            'name' => $data['name'],
            'sex' => $data['sex'],
            'age' => $data['age'],
            'phone' => $data['phone'],
            'email' => $data['email'],
            'idcard' => $data['idCard'],
            'addtime' => date('Y-m-d H:i:s')
        ];
        $this->sqlInsert('customer',$addData);
        return $this->returnMsg(0);
    }
}