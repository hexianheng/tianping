<?php

namespace Home\Model;
use Think\Model;
class BaseModel extends Model {

    public $redisObj;
    public $errorConfig;

    //构造方法
    public function __construct(){
        parent::__construct();
        $this->redisObj = new \Redis();
        $this->errorConfig = C('ERROR');
    }


    //封装调取错误码方法
    public function returnMsg($code = 0,$return = []){
        if(empty($this->errorConfig[$code])){
            $msg = $this->errorConfig[-1];
        }else{
            $msg = $this->errorConfig[$code];
        }
        return array(
            'code' => $code,
            'msg' => $msg,
            'data' => $return
        );
    }

    //sql
    public function sqlQuery($base,$sql){
        return $this->Table($base)->query($sql);
    }

    //insert
    public function sqlInsert($base,$data){
        if(empty($data)){
            return '';
        }
        $key = array_keys($data);
        $sql = "insert into $base (`". implode('`,`',$key) ."`) values ('" .implode("','",$data). "')";
        return $this->sqlQuery($base,$sql);
    }

    //update
    public function sqlUpdate($base,$data,$where){
        if(empty($data)){
            return '';
        }
        $arr = [];
        foreach($data as $key => $val){
            $arr[] = "`".$key."` = '".$val."'";
        }
        $sql = "update $base set ". implode(',',$arr) ." where ". $where;
        return $this->sqlQuery($base,$sql);
    }

    //set redis 默认一天
    public function setRedis($key,$val,$time = 86400){
        $redisConfig = C('REDIS');
        $this->redisObj->connect($redisConfig['host'],$redisConfig['port']);
        $this->redisObj->set($key,$val,$time);
    }

    //get redis
    public function getRedis($key){
        $redisConfig = C('REDIS');
        $this->redisObj->connect($redisConfig['host'],$redisConfig['port']);
        return $this->redisObj->get($key);
    }
}

?>