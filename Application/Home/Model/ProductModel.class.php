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
        //验证产品项目
        if($data['projectStr'] == ''){
            unset($data['projectStr']);
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
}