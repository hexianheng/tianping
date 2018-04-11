<?php
/* *
 * 外部appModel
 * author：PeiYun Wang
 * */
namespace Home\Model;
class InvokModel extends BaseModel
{
    //添加app
    public function addApp($data){
        //验证appName
        if($data['appName'] == ''){
            return $this->returnMsg('A075');
        }
        $data['ctime'] = date('Y-m-d H:i:s');
        $data['appKey'] = md5(md5($data['appName']).$data['ctime']);
        $this->sqlInsert('app_invok',$data);
        return $this->returnMsg(0);
    }

    //app列表
    public function appList($where,$page){
        if($page == ''){
            $page = 1;
        }else{
            if(!is_numeric($page) || $page < 1){
                return $this->returnMsg(-4);
            }
        }

        if($where != ''){
            $where = " where appName = '$where'";
        }

        $pageNum = 20;
        $sql = "select count(appId) as num from app_invok ". $where;
        $num = $this->sqlQuery('app_invok',$sql);
        if(empty($num) || $num[0]['num'] == 0){
            return $this->returnMsg(-3);
        }
        $start = $pageNum * ($page -1);
        $sql = "select * from app_invok ". $where ." order by appId desc limit $start,$pageNum";
        $re = $this->sqlQuery('app_invok',$sql);
        $result = [
            'data' => $re,
            'maxPage' => ceil($num[0]['num']/$pageNum)
        ];
        return $this->returnMsg(0,[],$result);
    }

    //删除App
    public function delApp($appId){
        if($appId == ''){
            return $this->returnMsg("A076");
        }
        $sql = "select appId from app_invok where appId = ". $appId;
        $re = $this->sqlQuery('app_invok',$sql);
        if(empty($re)){
            return $this->returnMsg('A076');
        }else{
            $sql = "delete from app_invok where appId = ". $appId;
            $this->sqlQuery('app_invok',$sql);
            return $this->returnMsg(0);
        }
    }
}