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
        $this->display('Index/Login');
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
    //分配权限
    public function fpqx(){
        $url=C("URL");
        $this->assign("url",$url);
        $this->display('Jurisdiction/fpqx');
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

}