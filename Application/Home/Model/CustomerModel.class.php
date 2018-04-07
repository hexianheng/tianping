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

        $pageNum = 20;
        $sql = "select count(id) as num from customer as a ". $where;
        $num = $this->sqlQuery('customer',$sql);
        if(empty($num)){
            return $this->returnMsg(-3);
        }
        $start = $pageNum * ($page -1);
        $sql = "select a.id,a.status,a.code,a.name,a.sex,a.age,a.phone,a.addtime,a.email,c.id as 'channelId',c.name as 'channelName',d.id as 'productId',d.name as 'productName' from customer AS a left join `code` as b on a.code = b.code left join channel as c on b.channelId = c.id left join product as d on b.productId = d.id ". $where ." order by a.id desc limit $start,$pageNum";
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
    public function updStatus($idStr,$status){
        //定义短信内容
        $smsMessage = [
            2 => '采集盒已经寄出，请注意查收！',
            3 => '回寄样本已经收到，马上安排提取DNA，请耐心等待！',
            4 => 'DNA已经提取成功，并且质检合格，马上上机检测',
            5 => '检测已经完成，正在为您准备报告！',
            6 => '报告已生成',
            7 => '报告延迟'
        ];

        if($status == '' || (!in_array($status,[2,3,4,5,6,7]))){
            return $this->returnMsg('A068');
        }
        $idArr = explode('|',$idStr);
        $sql = "select id,phone from customer where id in ('" . implode("','",$idArr) . "')";
        $re = $this->sqlQuery('customer',$sql);
        if(empty($re) || count($idArr) != count($re)){
            return $this->returnMsg('A067');
        }

        $phoneArr = array_column($re,'phone');
        //发送状态
        $smsObj = new SmsModel();
        $num = $smsObj->sendMessage($phoneArr,$smsMessage[$status]);
        if($num != count($phoneArr)){
            return $this->returnMsg('A069');
        }

        $sql = "update customer set status = $status where id in ('" . implode("','",$idArr) . "')";
        $this->sqlQuery('customer',$sql);
        return $this->returnMsg(0);
    }

}