<?php
/* *
 * 客户Model
 * author：PeiYun Wang
 * */
namespace Home\Model;
use Home\Model\SmsModel;
class CustomerModel extends BaseModel
{

    //客户列表
    public function customerList($where = '',$page = 1){
        if($page == ''){
            $page = 1;
        }else{
            if(!is_numeric($page) || $page < 1){
                return $this->returnMsg(-4);
            }
        }

        if($where != ''){
            $where = " where a.code = '$where'";
        }

        $pageNum = 10;
        $sql = "select count(id) as num from customer as a ". $where;
        $num = $this->sqlQuery('customer',$sql);
        if(empty($num) || $num[0]['num'] == 0){
            return $this->returnMsg(-3);
        }
        $start = $pageNum * ($page -1);
        $sql = "select a.id,a.status,a.code,a.name,a.sex,a.age,a.phone,a.addtime,a.email,a.address,c.id as 'channelId',c.name as 'channelName',d.id as 'productId',d.name as 'productName',d.panel from customer AS a left join `code` as b on a.code = b.code left join channel as c on b.channelId = c.id left join product as d on b.productId = d.id ". $where ." order by a.id desc limit $start,$pageNum";
        $re = $this->sqlQuery('customer',$sql);
        $result = [
            'data' => $re,
            'maxPage' => ceil($num[0]['num']/$pageNum)
        ];
        return $this->returnMsg(0,[],$result);
    }

    //删除客户
    public function delCustomer($id){
        $sql = "select id from customer where id = $id";
        $re = $this->sqlQuery('customer',$sql);
        if(empty($re)){
            return $this->returnMsg('A067');
        }
        $sql = "delete from customer where id = $id";
        $this->sqlQuery('customer',$sql);
        return $this->returnMsg(0);
    }


    //修改客户状态
    public function updStatus($codeArr,$status){
        //定义短信内容
        $smsMessage = [
            2 => 84127, //样本采集盒送出
            3 => 84133, //样本已回收
            4 => 84134, //样本质检合格
            5 => 84139, //完成检测
            6 => 104821, //已出报告
            7 => 84143  //报告延迟
        ];

        if($status == '' || (!in_array($status,[2,3,4,5,6,7]))){
            return $this->returnMsg('A068');
        }
        $codeArr = explode('|',$codeArr);
        $sql = "select id,name,phone from customer where code in ('" . implode("','",$codeArr) . "')";
        $re = $this->sqlQuery('customer',$sql);
        if(empty($re) || count($codeArr) != count($re)){
            return $this->returnMsg('A067');
        }

        $phoneArr = array_column($re,'phone');
        $nameArr = array_column($re,'name');
        //发送状态
        $smsObj = new SmsModel();
        $num = $smsObj->sendMessage($phoneArr,$smsMessage[$status],$nameArr);
        if($num != count($phoneArr)){
            return $this->returnMsg('A069');
        }

        $sql = "update customer set status = $status where code in ('" . implode("','",$codeArr) . "')";
        $this->sqlQuery('customer',$sql);
        return $this->returnMsg(0);
    }

}