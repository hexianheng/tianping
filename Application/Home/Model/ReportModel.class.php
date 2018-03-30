<?php
/* *
 * 报告Model
 * author：PeiYun Wang
 * */
namespace Home\Model;
class ReportModel extends BaseModel
{
    //检测结果列表
    public function detectionResult($data){
        if($data['page'] == ''){
            $data['page'] = 1;
        }else{
            if(!is_numeric($data['page'])){
                return $this->returnMsg(-4);
            }
        }
        $where = [];
        if($data['where'] != ''){
            $where = " where a.`code` = '$data[where]'";
        }else{
            $where = '';
        }
        $countSql = "select count(id) as count from detection as a " . $where;
        $count = $this->sqlQuery('code',$countSql)[0]['count'];
        if(empty($count)){
            return $this->returnMsg(-3);
        }
        $limit = $this->_makeLimit($data['page'],10);
        $sql = "select a.id,a.code,b.productId,a.ctime from detection as a left join code as b on a.`code` = b.`code` ". $where ." ORDER BY a.id DESC " . $limit;
        $re = $this->sqlQuery('user',$sql);
        return $this->returnMsg(0,$re,['page'=>$data['page'],'maxPage'=>ceil($count/10)]);
    }

    //检测结果删除
    public function delDetection($id){
        $sql = "select id from detection where id = ".$id;
        $re = $this->sqlQuery('detection',$sql);
        if(empty($re)){
            return $this->returnMsg('A063');
        }
        $sql = "delete from detection where id = " . $id;
        $this->sqlQuery('detection',$sql);
        return $this->returnMsg(0);
    }
}