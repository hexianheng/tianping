<?php
/* *
 * 路由控制器
 * author：PeiYun Wang
 * */
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller {

    //首页
    /**
     * [index description]
     * @return [type] [description]
     */
    public function index(){
        $url=C("URL");
        $this->assign("url",$url);
        $this->display('Index/Login');
    }

    public function login(){
        $url=C("URL");
        $this->assign("url",$url);
        $this->display('Index/Login');
    }
    public function startUpPwd(){
        $this->display('Index/start_up_pwd');
    }

    public function wjmm(){
        $this->display('Index/wjmm');
    }
    //首页
    public function tianping(){
        $url=C("URL");
        $this->assign("url",$url);
    	$this->display('Home/Index');
    }
    //左侧菜单
    public function left(){
        $url=C("URL");
        $this->assign("url",$url);
        $this->display('Home/Left');
    }
    //右侧菜单
    public function right(){
        $this->display('Home/Right');
    }
    //头部
    public function top(){
        $this->display('Home/Top');
    }
    //新增权限
    public function xzqx(){
        $url=C("URL");
        $this->assign("url",$url);
        $this->display('Jurisdiction/xzqx');
    }
    //新增角色
    public function xzjs(){
        $url=C("URL");
        $this->assign("url",$url);
        $this->display('Jurisdiction/xzjs');
    }
    //角色列表
    public function js_list(){
        $url=C("URL");
        $this->assign("url",$url);
        $this->display('Jurisdiction/js_list');
    }
    //权限列表
    public function qxlb(){
        $url=C("URL");
        $this->assign("url",$url);
        $this->display('Jurisdiction/qxlb');
    }
    //新增管理员
    public function xzgly(){
        $url=C("URL");
        $this->assign("url",$url);
        $this->display('Jurisdiction/xzgly');
    }
    //管理员列表
    public function gly_list(){
        $url=C("URL");
        $this->assign("url",$url);
        $this->display('Jurisdiction/gly_list');
    }
    //修改密码
    public function xgmm(){
        $url=C("URL");
        $this->assign("url",$url);
        $this->display('Jurisdiction/xgmm');
    }
    //编码列表
    public function bm_list(){
        $url=C("URL");
        $this->assign("url",$url);
        $this->display('Code/bm_list');
    }
    //新增编码
    public function xzbm(){
        $url=C("URL");
        $this->assign("url",$url);
        $this->display('Code/xzbm');
    }
    //编码分组
    public function bmfz(){
        $url=C("URL");
        $this->assign("url",$url);
        $this->display('Code/bmfz');
    }
    //编码生成
    public function bmsc(){
        $url=C("URL");
        $this->assign("url",$url);
        $this->display('Code/bmsc');
    }

    //编码出库
    public function bmck(){
        $url=C("URL");
        $this->assign("url",$url);
        $this->display('Code/bmck');
    }
    //渠道列表
    public function qd_list(){
        $url=C("URL");
        $this->assign("url",$url);
        $this->display('Channel/qd_list');
    }

    //渠道添加
    public function qd_add(){
        $url=C("URL");
        $this->assign("url",$url);
        $this->display('Channel/qd_add');
    }

    //文件上传（数据）
    public function results_import(){
        $url=C("URL");
        $this->assign("url",$url);
        $this->display('File/results_import');
    }

}