<?php
/* *
 * TOKEN Model
 * author：PeiYun Wang
 * */
namespace Home\Model;
class TokenModel extends BaseModel {

    private $tokenTime = 3600;  //设置token时间
    private $tokenOnlyKey = 'TianPing';  //唯一key

    /* *
     * 设置token
     * */
    public function setToken($data){
        $key = md5(md5($this->tokenOnlyKey).$data['id']);
        $token = md5(md5($data['uname']).md5($data['pwd']).date('Y-m-d H:i:s'));
        $setData = array(
            'id' => $data['id'],
            'uname' => $data['uname'],
            'token' => $token,
            'time' => $this->tokenTime,
            'roleId' => $data['roleId'],
            'repwd' => $data['repwd'],
            'roleName' => $data['roleName'],
            'permission' => $data['permission']
        );
        $this->setRedis($key,json_encode($setData),$this->tokenTime);
    }

    /* *
     * 取得token
     * */
    public function getToken($id){
        $key = md5(md5($this->tokenOnlyKey).$id);
        $result = $this->getRedis($key);
        if(empty($result)){
            return [];
        }else{
            return json_decode($result,true);
        }
    }

    /* *
     * 注销登录
     * */
    public function logout($id){
        $key = md5(md5($this->tokenOnlyKey).$id);
        $this->setRedis($key,'',-1);
        return $this->returnMsg(0);
    }


}

?>