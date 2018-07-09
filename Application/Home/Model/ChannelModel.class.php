<?php
/* *
 * 渠道Model
 * author：PeiYun Wang
 * */
namespace Home\Model;
class ChannelModel extends BaseModel {

    //添加渠道
    public function addChannel($data){
        //验证企业编码
        if($data['code'] == ''){
            return $this->returnMsg('A023');
        }
        //验证企业名称
        if($data['name'] == ''){
            return $this->returnMsg('A024');
        }
        //验证企业联系方式
        $reg = "/^[1][3,4,5,7,8][0-9]{9}$/";
        //验证企业邮箱
        if($data['email'] != ''){
            if(!strstr($data['email'],'@') || !strstr($data['email'],'.')){
                return $this->returnMsg('A026');
            }
        }
        //验证企业联系人
        if($data['linkman'] == ''){
            return $this->returnMsg('A027');
        }
        //验证联系人联系方式
        if($data['linkmanPhone'] == ''){
            return $this->returnMsg('A029');
        }
        if(!preg_match($reg,$data['linkmanPhone'])){
            return $this->returnMsg('B029');
        }
        //验证联系人邮箱
        if($data['linkmanEmail'] != ''){
            if(!strstr($data['linkmanEmail'],'@') || !strstr($data['linkmanEmail'],'.')){
                return $this->returnMsg('A030');
            }
        }
        //验证邮编
        if($data['zipCode'] != ''){
            $reg = "/^[1-9][0-9]{5}$/";
            if(!preg_match($reg,$data['zipCode'])){
                return $this->returnMsg('A028');
            }
        }
        //验证等级
        if($data['label'] == ''){
            return $this->returnMsg('A043');
        }
        if(!in_array($data['label'],['A','B','C'])){
            return $this->returnMsg('C043');
        }
        $data['ctime'] = date('Y-m-d H:i:s');
        $data['cId'] = $data['userId'];
        unset($data['userId']);
        $this->sqlInsert('channel',$data);
        return $this->returnMsg(0);
    }

    //修改渠道
    public function updChannel($data){
        //验证渠道ID
        if($data['id'] == ''){
            return $this->returnMsg('A031');
        }
        //验证企业编码
        if($data['code'] == ''){
            return $this->returnMsg('A023');
        }
        //验证企业名称
        if($data['name'] == ''){
            return $this->returnMsg('A024');
        }
        $reg = "/^[1][3,4,5,7,8][0-9]{9}$/";
        //验证企业邮箱
        if($data['email'] != ''){
            if(!strstr($data['email'],'@') || !strstr($data['email'],'.')){
                return $this->returnMsg('A026');
            }
        }
        //验证企业联系人
        if($data['linkman'] == ''){
            return $this->returnMsg('A027');
        }
        //验证联系人联系方式
        if($data['linkmanPhone'] == ''){
            return $this->returnMsg('A029');
        }
        if(!preg_match($reg,$data['linkmanPhone'])){
            return $this->returnMsg('B029');
        }
        //验证联系人邮箱
        if($data['linkmanEmail'] != ''){
            if(!strstr($data['linkmanEmail'],'@') || !strstr($data['linkmanEmail'],'.')){
                return $this->returnMsg('A030');
            }
        }
        //验证邮编
        if($data['zipCode'] != ''){
            $reg = "/^[1-9][0-9]{5}$/";
            if(!preg_match($reg,$data['zipCode'])){
                return $this->returnMsg('A028');
            }
        }
        //验证等级
        if($data['label'] == ''){
            return $this->returnMsg('A043');
        }
        if(!in_array($data['label'],['A','B','C'])){
            return $this->returnMsg('C043');
        }
        //验证渠道ID
        $sql = "select id from channel where id = '$data[id]'";
        $re = $this->sqlQuery('channel',$sql);
        if(empty($re)){
            return $this->returnMsg('B031');
        }
        $data['mtime'] = date('Y-m-d H:i:s');
        $data['mId'] = $data['userId'];
        unset($data['userId']);
        unset($data['id']);
        $this->sqlUpdate('channel',$data,'id = ' .$re[0]['id']);
        return $this->returnMsg(0);
    }

    //获取单条渠道数据
    public function getOneChannel($id){
        if($id == ''){
            return $this->returnMsg('A031');
        }
        $sql = "select * from channel where id = '$id'";
        $re = $this->sqlQuery('channel',$sql);
        if(empty($re)){
            return $this->returnMsg('B031');
        }else{
            return $this->returnMsg(0,$re[0]);
        }
    }

    //修改开启或删除状态
    public function updateStatus($id){
        if($id == ''){
            return $this->returnMsg('A031');
        }
        $sql = "select id,status from channel where id = '$id'";
        $re = $this->sqlQuery('channel',$sql);
        if(empty($re)){
            return $this->returnMsg('B031');
        }
        $this->sqlUpdate('channel',['status' => 1-$re[0]['status']],'id = ' .$re[0]['id']);
        return $this->returnMsg(0);
    }

    //获取渠道下拉
    public function channelSelect(){
        $sql = "select id,name from channel where status = 0 order by id desc";
        $re = $this->sqlQuery('channel',$sql);
        if(empty($re)){
            return $this->returnMsg(-3);
        }
        return $this->returnMsg(0,$re);
    }

    //获取列表
    public function listChannel($page,$where = ""){
        if($page == ''){
            $page = 1;
        }else{
            if(!is_numeric($page) || $page < 1){
                return $this->returnMsg(-4);
            }
        }
        if($where != ''){
            $where = " where linkman = '$where' or linkmanPhone = '$where'";
        }
        $pageNum = 10;
        $sql = "select count(id) as num from channel" .$where;
        $num = $this->sqlQuery('channel',$sql);
        if(empty($num)){
            return $this->returnMsg(-3);
        }
        $start = $pageNum * ($page -1);
        $sql = "select * from channel ". $where ." order by id desc limit $start,$pageNum";
        $re = $this->sqlQuery('channel',$sql);
        $result = [
            'data' => $re,
            'maxPage' => ceil($num[0]['num']/$pageNum)
        ];
        return $this->returnMsg(0,$result);
    }
}

?>