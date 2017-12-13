<?php

namespace Home\Model;
use Home\Model\TokenModel;
class UserModel extends BaseModel {

    //注册
    public function register($data){
        //验证用户名
        if($data['uname'] == ''){
            return $this->returnMsg('A001');
        }
        //验证密码及确认密码
        if($data['pwd'] == '' || $data['pwdAgain'] == '' || $data['pwd'] != $data['pwdAgain']){
            return $this->returnMsg('A002');
        }else{
            unset($data['pwdAgain']);
            $data = md5($data['pwd']);
        }
        //验证手机号
        $reg = "/^[1][3,4,5,7,8][0-9]{9}$/";
        if($data['phone'] == '' || !preg_match($reg,$data['phone'])){
            return $this->returnMsg('A003');
        }
        //验证email
        if($data['email'] == '' || !strstr($data['email'],'@') || !strstr($data['email'],'.')){
            return $this->returnMsg('A004');
        }
        //验证唯一
        $sql = "select uname,phone,email from user";
        $temp = $this->sqlQuery('user',$sql);
        if(in_array($data['uname'],array_column($temp,'uname'))){
            return $this->returnMsg('A005');
        }
        if(in_array($data['phone'],array_column($temp,'phone'))){
            return $this->returnMsg('A006');
        }
        if(in_array($data['email'],array_column($temp,'email'))){
            return $this->returnMsg('A007');
        }
        $data['ctime'] = date('Y-m-d H:i:s');
        //入库
        $this->sqlInsert('user',$data);
        return $this->returnMsg(0);
    }

    //登录
    public function login($data){
        //验证用户名
        if($data['uname'] == ''){
            return $this->returnMsg('A008');
        }
        //验证密码及确认密码
        if($data['pwd'] == ''){
            return $this->returnMsg('A009');
        }
        $sql = "select id,uname,pwd from user where uname = '$data[uname]' and pwd = '". md5($data['pwd'])."'";
        $rs = $this->sqlQuery('user',$sql);
        if(empty($rs)){
            return $this->returnMsg('A010');
        }else{
            $tokenData = $rs[0];
            //获取登录人角色信息
            $RoleSql = "select b.id,b.name,b.permission from user_role as a left join role as b on a.roleId = b.id where a.userId = $tokenData[id] and b.status = 0";
            $role = $this->sqlQuery('user_role',$RoleSql)[0];
            //获取登录人的权限信息
            $permissionId = json_decode($role['permission'],true);
            $permissionSql = "select action,function,name,parentId,`group` from permission where status = 0 and id in(". implode(',',$permissionId).")";
            $permission = $this->sqlQuery('permission',$permissionSql);
            //组合数组
            $tokenData['roleId'] = $role['id'];
            $tokenData['roleName'] = $role['name'];
            $tokenData['permission'] = $permission ? $permission : [];
            $tokenObj = new tokenModel();
            $tokenObj->setToken($tokenData);
            $data = $tokenObj->getToken($tokenData['id']);
            return $this->returnMsg( 0, $data);
        }

    }

    //验证token
    public function checkToken($userId,$token){
        if($userId == ''){
            return $this->returnMsg('A011');
        }
        if($token == ''){
            return $this->returnMsg('A012');
        }
        $sql = "select id,uname,pwd from user where id = $userId";
        $rs = $this->sqlQuery('user',$sql);
        if(empty($rs)){
            return $this->returnMsg('A011');
        }else{
            $tokenObj = new TokenModel();
            $result = $tokenObj->getToken($userId);
            if(empty($result)){
                return $this->returnMsg('A012');
            }else{
                if($result['token'] == $token){
                    return $this->returnMsg(0,$result);
                }else{
                    return $this->returnMsg('A012');
                }
            }
        }
    }

    //添加权限
    public function addPermission($data){
        //验证控制器名
        if($data['action'] == ''){
            return $this->returnMsg('A013');
        }
        //验证方法名
        if($data['function'] == ''){
            return $this->returnMsg('A014');
        }
        //验证权限名称
        if($data['name'] == ''){
            return $this->returnMsg('A015');
        }
        //验证上级权限ID
        if($data['parentId'] == ''){
            return $this->returnMsg('A016');
        }else if($data['parentId'] != 0){
            $sql = "select id from permission where id = $data[parentId] and status = 0";
            $re = $this->sqlQuery('permission',$sql);
            if(empty($re)){
                return $this->returnMsg('A016');
            }
        }
        //验证排序字段
        if($data['group'] == '' || !is_numeric($data['group']) || !in_array($data['group'],[0,1])){
            return $this->returnMsg('A018');
        }
        $data['ctime'] = date('Y-m-d H:i:s');
        $this->sqlInsert('permission',$data);
        return $this->returnMsg(0);
    }

    //获取权限父级ID
    public function getPId(){
        $sql = "select id,name from permission where parentId = 0 and status = 0";
        $re = $this->sqlQuery('permission',$sql);
        $return = array(array( 'id' => 0, 'name' => '最高级权限'));
        if(!empty($re)){
            foreach($re as  $val){
                $return[] = $val;
            }
        }
        return $this->returnMsg(0,$return);
    }

    //获取权限列表
    public function getPermission($page = 0){
        $sql = "select id,name,parentId,status,ctime from permission where status = 0 order by parentId";
        $re = $this->sqlQuery('permission',$sql);
        if(empty($re)){
            return $this->returnMsg(-3);
        }
        $data = $this->getTree($re);
        return $this->returnMsg(0,$data);
    }

    //递归无限极
    private function getTree($arr,$pid = 0,$step = 1){
        global $tree;
        foreach($arr as $key=>$val) {
            if($val['parentId'] == $pid) {
                $val['label'] = $step;
                $tree[] = $val;
                $this->getTree($arr , $val['id'] ,$step+1);
            }
        }
        return $tree;
    }

    //添加角色
    public function addRole($data){
        if($data['name'] == ''){
            return $this->returnMsg('A017');
        }
        if($data['permissionStr'] == ''){
            return $this->returnMsg('A019');
        }else{
            $permissionArr = explode(',',$data['permissionStr']);
            $sql = "select id from permission where id in ('".implode("','",$permissionArr)."')";
            $re = $this->sqlQuery('permission',$sql);
            if(empty($re) || count($permissionArr) != count($re)){
                return $this->returnMsg('A019');
            }else{
                unset($data['permissionStr']);
                $data['permission'] = json_encode($permissionArr);
                $data['ctime'] = date('Y-m-d H:i:s');
                $this->sqlInsert('role',$data);
                return $this->returnMsg(0);
            }
        }
    }

    //获取用户角色列表
    public function userRoleList(){
        $sql = "select a.id as userId,a.uname,a.phone,a.email,IFNULL(c.id,0) as roleId,IFNULL(c.name,'暂无') as roleName from `user` as a left join user_role as b on a.id = b.userId left join role as c on b.roleId = c.id";
        $re = $this->sqlQuery('user',$sql);
        return $this->returnMsg(0,$re);
    }

    //绑定用户及角色
    public function userRole($data){
        $sql = "select id from role where id = $data[roleId]";
        $rs = $this->sqlQuery('role',$sql);
        if(empty($rs)){
            return $this->returnMsg('A020');
        }
        //查询是否存在关联信息（存在update,不存在add）
        $sql = "select id from user_role where userId = $data[userId]";
        $rs = $this->sqlQuery('user_role',$sql);
        if(empty($rs)){
            $this->sqlInsert('user_role',$data);
        }else {
            $this->sqlUpdate('user_role', ['roleId' => $data['roleId']], 'id = ' . $rs[0]['id']);
        }
        return $this->returnMsg(0);
    }

    //修改密码
    public function updPwd($data){
        //验证密码及确认密码
        if($data['pwd'] == '' || $data['pwdAgain'] == '' || $data['pwd'] != $data['pwdAgain']){
            return $this->returnMsg('A002');
        }
        //验证旧密码
        $sql = "select id from user where id = $data[userId] and pwd = '".md5($data['pwdOld'])."'";
        $rs = $this->sqlQuery('user',$sql);
        if(empty($rs)){
            return $this->returnMsg('A021');
        }
        $this->sqlUpdate('user',['pwd'=>md5($data['pwd'])],"id = $data[userId]");
        return $this->returnMsg(0);
    }

    //获取单条角色
    public function getRoleOne($roleId){
        $sql = "select * from role where id = $roleId";
        $re = $this->sqlQuery('role',$sql);
        if(empty($re)){
            return $this->returnMsg('A020');
        }else{
            return $this->returnMsg(0,$re[0]);
        }
    }

    //修改角色
    public function updRole($data){
        if($data['name'] == ''){
            return $this->returnMsg('A017');
        }
        if($data['permissionStr'] == ''){
            return $this->returnMsg('A019');
        }else{
            $permissionArr = explode(',',$data['permissionStr']);
            $sql = "select id from permission where id in ('".implode("','",$permissionArr)."')";
            $re = $this->sqlQuery('permission',$sql);
            if(empty($re) || count($permissionArr) != count($re)){
                return $this->returnMsg('A019');
            }else{
                unset($data['permissionStr']);
                $data['permission'] = json_encode($permissionArr);
                $data['mtime'] = date('Y-m-d H:i:s');
                $this->sqlInsert('role',$data);
                return $this->returnMsg(0);
            }
        }
    }

    //获取单条权限
    public function getPermissionOne($id){
        if($id == ''){
            return $this->returnMsg('A022');
        }
        $sql = "select id,action,function,status,name,parentId,`group` from permission where id = $id";
        $re = $this->sqlQuery('permission',$sql);
        if(empty($re)){
            return $this->returnMsg('A022');
        }else{
            return $this->returnMsg(0,$re[0]);
        }
    }

    public function updPermission($data){
        //验证控制器名
        if($data['action'] == ''){
            return $this->returnMsg('A013');
        }
        //验证方法名
        if($data['function'] == ''){
            return $this->returnMsg('A014');
        }
        //验证权限名称
        if($data['name'] == ''){
            return $this->returnMsg('A015');
        }
        //验证上级权限ID
        if($data['parentId'] == ''){
            return $this->returnMsg('A016');
        }else if($data['parentId'] != 0){
            $sql = "select id from permission where id = $data[parentId] and status = 0";
            $re = $this->sqlQuery('permission',$sql);
            if(empty($re)){
                return $this->returnMsg('A016');
            }
        }
        //验证排序字段
        if($data['group'] == '' || !is_numeric($data['group']) || !in_array($data['group'],[0,1])){
            return $this->returnMsg('A018');
        }
        //验证权限ID
        $id = $data['id'];
        unset($data['id']);
        if($id == ''){
            return $this->returnMsg('A022');
        }
        $sql = "select id,action,function,status,name,parentId,group from permission where id = $id";
        $re = $this->sqlQuery('permission',$sql);
        if(empty($re)){
            return $this->returnMsg('A022');
        }
        $data['mtime'] = date('Y-m-d H:i:s');
        $this->sqlUpdate('permission',$data,"id = $id");
        return $this->returnMsg(0);
    }
}

?>