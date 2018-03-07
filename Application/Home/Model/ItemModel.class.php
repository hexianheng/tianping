<?php
/* *
 * 项目Model
 * author：PeiYun Wang
 * */
namespace Home\Model;
class ItemModel extends BaseModel
{

    //添加项目
    public function addItem($data){
        //验证项目名称
        if($data['name'] == ''){
            return $this->returnMsg('A044');
        }
        //验证项目介绍
        if($data['text'] == ''){
            return $this->returnMsg('A045');
        }
        $data['addtime'] = date('Y-m-d H:i:s');
        $this->sqlInsert('item',$data);
        return $this->returnMsg(0);
    }

    //修改项目
    public function updItem($data){
        //验证项目名称
        if($data['name'] == ''){
            return $this->returnMsg('A044');
        }
        //验证项目介绍
        if($data['text'] == ''){
            return $this->returnMsg('A045');
        }
        //验证项目ID
        if($data['id'] == ''){
            return $this->returnMsg('A034');
        }else{
            $id = $data['id'];
            unset($data['id']);
            $sql = "select itemid from item where itemid = ". $id;
            $re = $this->sqlQuery('item',$sql);
            if(empty($re)){
                return $this->returnMsg('A034');
            }
        }
        $this->sqlUpdate('item',$data,' itemid = ' .$id);
        return $this->returnMsg(0);
    }

    //修改状态
    public function updateStatus($id){
        //验证项目ID
        if($id == ''){
            return $this->returnMsg('A034');
        }else{
            $sql = "select itemid from item where itemid = ". $id;
            $re = $this->sqlQuery('item',$sql);
            if(empty($re)){
                return $this->returnMsg('A034');
            }
        }
        $sql = "update item set status = 1 - status where itemid = ". $id;
        $this->sqlQuery('item',$sql);
        return $this->returnMsg(0);
    }

    //项目下拉
    public function itemSel(){
        $sql = "select * from item where status = 0 order by itemid desc";
        $re = $this->sqlQuery('item',$sql);
        return $this->returnMsg(0,$re);
    }

    //获取单条项目
    public function getOneItem($id){
        if($id == '') {
            return $this->returnMsg('A034');
        }
        $sql = "select * from item where itemid = ". $id;
        $re = $this->sqlQuery('item',$sql);
        return $this->returnMsg(0,$re);
    }

    //项目列表
    public function itemList($where = '',$page = 1){
        if($page == ''){
            $page = 1;
        }else{
            if(!is_numeric($page) || $page < 1){
                return $this->returnMsg(-4);
            }
        }

        if($where != ''){
            $where = " where itemid = '$where' or name like '%$where%'";
        }

        $pageNum = 20;
        $sql = "select count(itemid) as num from item ". $where;
        $num = $this->sqlQuery('item',$sql);
        if(empty($num)){
            return $this->returnMsg(-3);
        }
        $start = $pageNum * ($page -1);
        $sql = "select * from item ". $where ." order by itemid desc limit $start,$pageNum";
        $re = $this->sqlQuery('item',$sql);

        $ids = array_column($re,'itemid');
        $sql = "select itemid,count(id) as siteNum from item_locus_value where itemid in (". implode(',',$ids) .") group by itemid";
        $siteArr = $this->sqlQuery('item_locus_value',$sql);
        $siteEnd = [];
        foreach ($siteArr as $value){
            $siteEnd[$value['itemid']] = $value['siteNum'];
        }
        foreach ($re as $key => $value){
            $re[$key]['siteNum'] = empty($siteEnd[$value['itemid']])? 0 : $siteEnd[$value['itemid']];
        }
        $result = [
            'data' => $re,
            'maxPage' => ceil($num[0]['num']/$pageNum)
        ];
        return $this->returnMsg(0,[],$result);
    }
}