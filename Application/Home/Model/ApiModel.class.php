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
        $sql = "select code from code where code = '$data[code]' and status = 2";
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
        //验证address
        if($data['address'] == ''){
            return $this->returnMsg('A088');
        }
        $sql = "select code from code where code = '$data[code]' and status = 2";
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
            'addtime' => date('Y-m-d H:i:s'),
            'address' => $data['address']
        ];
        $this->sqlInsert('customer',$addData);
        $this->sqlUpdate('code',['status'=>3]," code = '$data[code]'");
        return $this->returnMsg(0);
    }

    //获取已绑定的编码列表
    public function getCode($data){
        //唯一请求ID
        if($data['uniqueId'] == ''){
            return $this->returnMsg('A078');
        }
        //验证唯一请求ID是否绑定
        $sql = "select phone from bind_customer where uniqueId = '" . md5($data['uniqueId'].$data['appKey']) . "'";
        $re = $this->sqlQuery('bind_customer',$sql);
        if(empty($re)) {
            return $this->returnMsg('A089');
        }
        $sql = "select a.`code`,c.`name` from customer as a left join `code` as b on a.`code` = b.`code` left join product as c on b.productId = c.id where a.phone = '" .$re[0]['phone']. "'";
        $re = $this->sqlQuery('customer',$sql);
        return empty($re) ? $this->returnMsg(-3) : $this->returnMsg(0,$re);
    }

    /* *
     * 获取已绑定编码的详细数据
     * return status
     * 0：用户信息待上传
     * 1：检测结果待上传
     * 2：检测结果待分析
     * 3：分析结果待审核
     * 4：分析结果审核拒绝
     * 5：分析结果审核通过
     * */
    public function getCodeDetail($data){
        $result = [
            'code' =>   $data['code'],
            'status' => 0
        ];
        //唯一请求ID
        if($data['uniqueId'] == ''){
            return $this->returnMsg('A078');
        }
        //验证编码
        if($data['code'] == ''){
            return $this->returnMsg('A082');
        }
        //验证唯一请求ID是否绑定
        $sql = "select phone from bind_customer where uniqueId = '" . md5($data['uniqueId'].$data['appKey']) . "'";
        $re = $this->sqlQuery('bind_customer',$sql);
        if(empty($re)) {
            return $this->returnMsg('A089');
        }
        //验证编码是否绑定客户
        $sql = "select id from customer where code = '$data[code]' and phone = '".$re[0]['phone']."'";
        $re = $this->sqlQuery('customer',$sql);
        if(empty($re)){
            return $this->returnMsg(0,$result);
        }
        //验证检测结果是否上传
        $sql = "select id from detection where code = '$data[code]'";
        $re = $this->sqlQuery('customer',$sql);
        if(empty($re)){
            $result['status'] = 1;
            return $this->returnMsg(0,$result);
        }
        //验证检测结果是否分析并获取分析状态
        $sql = "select * from analytic_result where code = '$data[code]'";
        $re = $this->sqlQuery('analytic_result',$sql);
        if(empty($re)){
            $result['status'] = 2;
            return $this->returnMsg(0,$result);
        }else{
            switch ($re[0]['status']){
                case 1:
                    $result['status'] = 3;
                    break;
                case 2:
                    $result['status'] = 5;
                    $result['pdfPath1'] = C("URL")."Index/report_mf/code/".$data['code']."/type/1";
                    $result['pdfPath2'] = C("URL")."Index/report_mf/code/".$data['code']."/type/2";
                    $result['pdfPath3'] = C("URL")."Index/report_mf/code/".$data['code']."/type/3";
                    break;
                case 3:
                    $result['status'] = 4;
                    break;
            }
            return $this->returnMsg(0,$result);
        }
    }

    public function updAddress($data){
        //唯一请求ID
        if($data['uniqueId'] == ''){
            return $this->returnMsg('A078');
        }
        //验证编码
        if($data['code'] == ''){
            return $this->returnMsg('A082');
        }
        //验证address
        if($data['address'] == ''){
            return $this->returnMsg('A088');
        }
        //验证唯一请求ID是否绑定
        $sql = "select phone from bind_customer where uniqueId = '" . md5($data['uniqueId'].$data['appKey']) . "'";
        $re = $this->sqlQuery('bind_customer',$sql);
        if(empty($re)) {
            return $this->returnMsg('A089');
        }
        //验证编码是否绑定客户
        $sql = "select id from customer where code = '$data[code]' and phone = '".$re[0]['phone']."'";
        $re = $this->sqlQuery('customer',$sql);
        if(empty($re)){
            return $this->returnMsg('A090');
        }
        $sql = "update customer set address = '$data[address]' where id = ". $re[0]['id'];
        $this->sqlQuery('customer',$sql);
        return $this->returnMsg(0);
    }

    public function updReturnMail($data){
        //唯一请求ID
        if($data['uniqueId'] == ''){
            return $this->returnMsg('A078');
        }
        //验证编码
        if($data['code'] == ''){
            return $this->returnMsg('A082');
        }
        //验证快递公司
        if($data['expressCompany'] == ''){
            return $this->returnMsg('A092');
        }
        //验证快递单号
        if($data['expressNumber'] == ''){
            return $this->returnMsg('A093');
        }
        //验证唯一请求ID是否绑定
        $sql = "select phone from bind_customer where uniqueId = '" . md5($data['uniqueId'].$data['appKey']) . "'";
        $re = $this->sqlQuery('bind_customer',$sql);
        if(empty($re)) {
            return $this->returnMsg('A089');
        }
        //验证编码是否绑定客户
        $sql = "select id from customer where code = '$data[code]' and phone = '".$re[0]['phone']."'";
        $re = $this->sqlQuery('customer',$sql);
        if(empty($re)){
            return $this->returnMsg('A090');
        }
        $sql = "update customer set expressCompany = '$data[expressCompany]',expressNumber = '$data[expressNumber]' where id = ". $re[0]['id'];
        $this->sqlQuery('customer',$sql);
        return $this->returnMsg(0);
    }

    public function recordAnswer($data){
        //唯一请求ID
        if($data['uniqueId'] == ''){
            return $this->returnMsg('A078');
        }
        //验证答案分类
        if($data['answerType'] == '' || !in_array($data['answerType'],[1,2])){
            return $this->returnMsg('A096');
        }
        //答案
        if($data['answer'] == ''){
            return $this->returnMsg('A094');
        }else{
            $answer = json_decode($data['answer'],true);
            if(empty($answer)){
                return $this->returnMsg('A094');
            }
            $titleIdArr = array_column($answer,'titleId');
            $sql = "select id from title where id in ('" . implode("','",$titleIdArr) . "')";
            $re = $this->sqlQuery('title',$sql);
            if(empty($re) || count($re) != count($titleIdArr)){
                return $this->returnMsg('A095');
            }
        }
        //验证唯一请求ID是否绑定
        $sql = "select phone from bind_customer where uniqueId = '" . md5($data['uniqueId'].$data['appKey']) . "'";
        $re = $this->sqlQuery('bind_customer',$sql);
        if(empty($re)) {
            return $this->returnMsg('A089');
        }
        $addData = [
            'uniqueId' => md5($data['uniqueId'].$data['appKey']),
            'answerjson' => $data['answer'],
            'type' => $data['answerType']
        ];
        $sql = "select id from answer where type = '$data[answerType]' and uniqueId = '". md5($data['uniqueId'].$data['appKey']) ."'";
        $re = $this->sqlQuery('answer',$sql);
        if(!empty($re)){
            return $this->returnMsg('A097');
        }
        $this->sqlInsert('answer',$addData);
        return $this->returnMsg(0);
    }
}