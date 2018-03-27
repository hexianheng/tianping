<?php
/* *
 * 公共Model
 * author：PeiYun Wang
 * */
namespace Home\Model;
use Think\Model;
class BaseModel extends Model {

    public $redisObj;
    public $errorConfig;
    public $redisConfig;

    //构造方法
    public function __construct(){
        parent::__construct();
        $this->redisObj = new \Redis();
        $this->connetRedis();
    }

    //连接redis
    public function connetRedis(){
        $this->redisConfig = C('REDIS');
        $this->redisObj->connect($this->redisConfig['host'],$this->redisConfig['port']);
        $this->errorConfig = C('ERROR');
    }

    //下载excel
    protected function putExcel($list,$filename,$header=array(),$index = array()){
        $teble_header = implode("\t",$header);
        $strexport = $teble_header."\r";
        foreach ($list as $row){
            foreach($index as $val){
                $strexport.=$row[$val]."\t";
            }
            $strexport.="\r";

        }
        header("Content-type:application/vnd.ms-excel");
        header("Content-Disposition:filename=".urlencode($filename).".xls");
        $strexport=iconv('UTF-8',"GB2312//IGNORE",$strexport);
        exit($strexport);
    }

    //生成limit
    public function _makeLimit($page = 1,$pageNum = 10){
        return " limit " . ($page - 1) * $pageNum . "," . $pageNum;
    }


    //封装调取错误码方法
    public function returnMsg($code = 0,$return = [],$parentArr = []){
        if(empty($this->errorConfig[$code])){
            $msg = $this->errorConfig[-1];
        }else{
            $msg = $this->errorConfig[$code];
        }
        $return = array(
            'code' => $code,
            'msg' => $msg,
            'data' => $return
        );
        if(!empty($parentArr)){
            foreach ($parentArr as $key => $val){
                $return[$key] = $val;
            }
        }
        return $return;
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
        if(empty($this->redisObj)){
            $this->connetRedis();
        }
        $this->redisObj->set($key,$val,$time);
    }

    //get redis
    public function getRedis($key){
        if(empty($this->redisObj)){
            $this->connetRedis();
        }
        return $this->redisObj->get($key);
    }

    //读取excel
    public function getExcel($fileName) {
        $result = [];
        $fileStr = file_get_contents($fileName);
        $fileStr = iconv("GB2312//IGNORE","UTF-8",$fileStr);
        $fileArr = explode("\r",$fileStr);
        foreach ($fileArr as $val){
            $result[] = explode("\t",$val);
        }
        return $result;
    }
}

?>