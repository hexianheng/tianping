<?php
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

    //获取用户角色列表
    public function userRoleList(){
        $obj = new UserModel();
        $result = $obj->userRoleList();
        $this->response($result,'json');
    }

    //绑定用户和角色
    public function userRole(){
        $data['userId'] = I('post.userId');
        $data['roleId'] = I('post.roleId');
        $obj = new UserModel();
        $result = $obj->userRole($data);
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

    //获取单条权限
    public function getPermissionOne(){
        $permissionId = I('post.permissionId');
        $obj = new UserModel();
        $result = $obj->getPermissionOne($permissionId);
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
}