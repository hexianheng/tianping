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

    //构造方法
    public function __construct(){
        parent::__construct();
        $this->redisObj = new \Redis();
        $this->errorConfig = C('ERROR');
    }

    //下载csv
    public function putCsv($fileName,$header,$data){
        $filename = $fileName.".csv";
        $content = $this->getScvContent($header,$data);
        $content = implode("\n",$content);
        header("Content-type: text/csv");
        header("Accept-Ranges: bytes");
        header("Content-Disposition: attachment; filename=" . $filename);
        header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
        header("Pragma: no-cache");
        header("Expires: 0");
        $content = iconv('utf-8','gb2312',$content);//转换编码
        Exit($content);
    }

    //处理csv数据
    public function getScvContent($header,$data){
        $result = [];
        $result[] = implode(',',$header);
        $keys = array_keys($header);
        foreach ($data as $val){
            $temp = [];
            foreach ($keys as $v){
                $temp[] = $val[$v];
            }
            $result[] = implode(',',$temp);
        }
        return $result;
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