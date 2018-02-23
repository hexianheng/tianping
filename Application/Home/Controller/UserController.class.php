<?php
/* *
 * 用户控制器
 * author：PeiYun Wang
 * */
namespace Home\Controller;
use Home\Model\TokenModel;
use Home\Model\UserModel;
class UserController extends CommonController {

    //构造方法
    public function __construct(){
        parent::__construct();
    }

    //注销登录
    public function logout(){
        $userId = I('userId');
        $obj = new TokenModel();
        $result = $obj->logout($userId);
        $this->response($result,'json');
    }

    //修改密码
    public function updPwd(){
        $data['userId'] = I('post.userId');
        $data['pwdOld'] = I('post.pwdOld');
        $data['pwd'] = I('post.password');
        $data['pwdAgain'] = I('post.pwdAgain');
        $obj = new UserModel();
        $result = $obj->updPwd($data);
        $this->response($result,'json');
    }

    //发送手机验证吗
    public function sendPhoneCheck(){
        $data['userId'] = I('post.userId');
        $data['phone'] = I('post.phone');
        $obj = new UserModel();
        $result = $obj->sendPhoneCheck($data);
        $this->response($result,'json');
    }

    //修改权限
    public function updPermission(){
        $data['id'] = I('post.permissionId');
        $data['mid'] = I('post.userId');
        $data['action'] = I('post.actionName');
        $data['function'] = I('post.functionName');
        $data['name'] = I('post.permissionName');
        $data['parentId'] = I('post.permissionPId');
        $data['group'] = I('post.type');
        $obj = new UserModel();
        $result = $obj->updPermission($data);
        $this->response($result,'json');
    }

    //添加权限
    public function addPermission(){
        $data['cid'] = I('post.userId');
        $data['action'] = I('post.actionName');
        $data['function'] = I('post.functionName');
        $data['name'] = I('post.permissionName');
        $data['parentId'] = I('post.permissionPId');
        $data['group'] = I('post.type');
        $obj = new UserModel();
        $result = $obj->addPermission($data);
        $this->response($result,'json');
    }

    //获取父级权限下拉
    public function getPId(){
        $obj = new UserModel();
        $result = $obj->getPId();
        $this->response($result,'json');
    }

    //获取权限列表
    public function getPermission(){
        $page = I('post.page');
        $obj = new UserModel();
        $result = $obj->getPermission($page);
        $this->response($result,'json');
    }

    //获取单条权限
    public function getPermissionOne(){
        $permissionId = I('post.permissionId');
        $obj = new UserModel();
        $result = $obj->getPermissionOne($permissionId);
        $this->response($result,'json');
    }

    //删除权限
    public function delPermission(){
        $permissionId = I('post.permissionId');
        $obj = new UserModel();
        $result = $obj->delPermission($permissionId);
        $this->response($result,'json');
    }



    //添加角色
    public function addRole(){
        $data['cid'] = I('post.userId');
        $data['name'] = I('post.roleName');
        $data['permissionStr'] = I('post.permissionStr');
        $obj = new UserModel();
        $result = $obj->addRole($data);
        $this->response($result,'json');
    }

    //修改角色
    public function updRole(){
        $data['mid'] = I('post.userId');
        $data['rId'] = I('post.roleId');
        $data['cid'] = I('post.userId');
        $data['name'] = I('post.roleName');
        $data['permissionStr'] = I('post.permissionStr');
        $obj = new UserModel();
        $result = $obj->updRole($data);
        $this->response($result,'json');
    }

    //获取单条角色
    public function getRoleOne(){
        $rId = I('post.roleId');
        $obj = new UserModel();
        $result = $obj->getRoleOne($rId);
        $this->response($result,'json');
    }

    //获取角色下拉
    public function getSelectRole(){
        $obj = new UserModel();
        $result = $obj->getSelectRole();
        $this->response($result,'json');
    }

    //删除角色
    public function delRole(){
        $rId = I('post.roleId');
        $obj = new UserModel();
        $result = $obj->delRole($rId);
        $this->response($result,'json');
    }



    //添加用户
    public function addUser(){
        $data['roleId'] = I('post.roleId');
        $data['uname'] = I('post.userName');
        $data['pwd'] = I('post.password');
        $data['phone'] = I('post.phone');
        $data['email'] = I('post.email');
        $data['cId'] = I('post.userId');
        $obj = new UserModel();
        $result = $obj->addUser($data);
        $this->response($result,'json');
    }

    //单条用户
    public function getOneUser(){
        $id = I('post.id');
        $obj = new UserModel();
        $result = $obj->getOneUser($id);
        $this->response($result,'json');
    }

    //用户列表
    public function userRoleList(){
        $page = I('post.page');
        $obj = new UserModel();
        $result = $obj->userRoleList($page);
        $this->response($result,'json');
    }

    //修改用户
    public function updUser(){
        $data['id'] = I('post.id');
        $data['roleId'] = I('post.roleId');
        $data['uname'] = I('post.userName');
        $data['pwd'] = I('post.password');
        $data['phone'] = I('post.phone');
        $data['email'] = I('post.email');
        $data['mId'] = I('post.userId');
        $obj = new UserModel();
        $result = $obj->updUser($data);
        $this->response($result,'json');
    }

    //删除用户
    public function delUser(){
        $id = I('post.id');
        $obj = new UserModel();
        $result = $obj->delUser($id);
        $this->response($result,'json');
    }

}