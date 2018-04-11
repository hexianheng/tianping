<?php
/* *
 * 产品Model
 * author：PeiYun Wang
 * */
namespace Home\Model;
class ProductModel extends BaseModel
{

    //添加产品
    public function addProduct($data)
    {
        //验证产品名称
        if($data['name'] == ''){
            return $this->returnMsg('A032');
        }
        //验证产品介绍
        if($data['desc'] == ''){
            return $this->returnMsg('A033');
        }
        //检测panel
        if($data['panel'] == ''){
            return $this->returnMsg('A074');
        }
        //验证产品项目
        if($data['projectStr'] == ''){
            return $this->returnMsg('A034');
        }else{
            $tempArr = explode('|',$data['projectStr']);
            $sql = "select count(itemid) as count from item where itemid in ('".implode("','",$tempArr)."')";
            $re = $this->sqlQuery('item',$sql);
            if(empty($re[0]['count']) || $re[0]['count'] != count($tempArr)){
                return $this->returnMsg('A034');
            }
        }
        $data['ctime'] = date('Y-m-d H:i:s');
        $this->sqlInsert('product',$data);
        return $this->returnMsg(0);
    }

    //修改产品
    public function updProduct($data)
    {
        //验证产品名称
        if($data['name'] == ''){
            return $this->returnMsg('A032');
        }
        //验证产品介绍
        if($data['desc'] == ''){
            return $this->returnMsg('A033');
        }
        //检测panel
        if($data['panel'] == ''){
            return $this->returnMsg('A074');
        }
        //验证产品项目
        if($data['projectStr'] == ''){
            return $this->returnMsg('A034');
        }else{
            $tempArr = explode('|',$data['projectStr']);
            $sql = "select count(itemid) as count from item where itemid in ('".implode("','",$tempArr)."')";
            $re = $this->sqlQuery('item',$sql);
            if(empty($re[0]['count']) || $re[0]['count'] != count($tempArr)){
                return $this->returnMsg('A034');
            }
        }
        //验证产品ID
        if($data['id'] == ''){
            return $this->returnMsg('A035');
        }else{
            $sql = "select id from product where id = $data[id]";
            $re = $this->sqlQuery('product',$sql);
            if(empty($re[0]['id'])){
                return $this->returnMsg('A035');
            }
            unset($data['id']);
        }
        $data['mtime'] = date('Y-m-d H:i:s');
        $this->sqlUpdate('product',$data,"id = ".$re[0]['id']);
        return $this->returnMsg(0);
    }

    //获取产品单条数据
    public function getOneProduct($id){
        //验证产品ID
        if($id == ''){
            return $this->returnMsg('A035');
        }
        $sql = "select * from product where id = $id";
        $re = $this->sqlQuery('product',$sql);
        //处理数据
        $itemArr = array_unique(explode('|',implode('|',array_column($re,'projectStr'))));
        $sql = "select itemid,name from item where itemid in (". implode(',',$itemArr) .")";
        $itemArr = $this->sqlQuery('item',$sql);
        $itemEnd = [];
        foreach ($itemArr as $val){
            $itemEnd[$val['itemid']] = $val['name'];
        }
        foreach ($re as $key => $value){
            $temp = explode('|',$value['projectStr']);
            foreach ($temp as $k => $v){
                $temp[$k] = $itemEnd[$v];
            }
            $re[$key]['projectStr'] = implode('|',$temp);
        }
        if(empty($re)){
            return $this->returnMsg('A035');
        }else{
            return $this->returnMsg(0,$re);
        }
    }

    //修改产品状态
    public function updateStatus($id){
        //验证产品ID
        if($id == ''){
            return $this->returnMsg('A035');
        }
        $sql = "select id,status from product where id = $id";
        $re = $this->sqlQuery('product',$sql);
        if(empty($re)){
            return $this->returnMsg('A035');
        }
        $status = 1 - $re[0]['status'];
        $this->sqlUpdate('product',['status'=>$status],'id = '.$id);
        return $this->returnMsg(0);
    }

    //获取列表
    public function listProduct($page){
        if($page == ''){
            $page = 1;
        }else{
            if(!is_numeric($page) || $page < 1){
                return $this->returnMsg(-4);
            }
        }
        $pageNum = 20;
        $sql = "select count(id) as num from product";
        $num = $this->sqlQuery('product',$sql);
        if(empty($num)){
            return $this->returnMsg(-3);
        }
        $start = $pageNum * ($page -1);
        $sql = "select * from product order by id desc limit $start,$pageNum";
        $re = $this->sqlQuery('product',$sql);

        //处理数据
        $itemArr = array_unique(explode('|',implode('|',array_column($re,'projectStr'))));
        $sql = "select itemid,name from item where itemid in (". implode(',',$itemArr) .")";
        $itemArr = $this->sqlQuery('item',$sql);
        $itemEnd = [];
        foreach ($itemArr as $val){
            $itemEnd[$val['itemid']] = $val['name'];
        }
        foreach ($re as $key => $value){
            $temp = explode('|',$value['projectStr']);
            foreach ($temp as $k => $v){
                $temp[$k] = $itemEnd[$v];
            }
            $re[$key]['projectStr'] = implode('|',$temp);
        }

        $result = [
            'data' => $re,
            'maxPage' => ceil($num[0]['num']/$pageNum)
        ];
        return $this->returnMsg(0,$result);
    }

    //获取下拉数据
    public function productSelect(){
        $sql = "select id,name from product where status = 0 order by id desc";
        $re = $this->sqlQuery('product',$sql);
        if(empty($re)){
            return $this->returnMsg(-3);
        }
        return $this->returnMsg(0,$re);
    }
}