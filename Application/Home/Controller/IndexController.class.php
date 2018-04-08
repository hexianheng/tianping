<?php
/* *
 * 路由控制器
 * author：PeiYun Wang
 * */
namespace Home\Controller;
use Think\Controller;
use Home\Model\ReportModel;
class IndexController extends Controller {

    //首页
    /**
     * [index description]
     * @return [type] [description]
     */
    public function index(){
        $url=C("URL");
        $this->assign("url",$url);
        $this->display('Index/login');
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
        $this->display('Home/index');
    }
    //左侧菜单
    public function left(){
        $url=C("URL");
        $this->assign("url",$url);
        $this->display('Home/left');
    }
    //右侧菜单
    public function right(){
        $this->display('Home/right');
    }
    //头部
    public function top(){
        $this->display('Home/top');
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

    //文件上传（量表）
    public function scale_import(){
        $url=C("URL");
        $this->assign("url",$url);
        $this->display('File/scale_import');
    }

    //产品列表
    public function product_list(){
        $url=C("URL");
        $this->assign("url",$url);
        $this->display('Product/product_list');
    }
    //项目列表
    public function project_list(){
        $url=C("URL");
        $this->assign("url",$url);
        $this->display('Product/project_list');
    }
    //位点列表
    public function site_list(){
        $url=C("URL");
        $this->assign("url",$url);
        $this->display('Product/site_list');
    }
    //解读列表
    public function sns_check(){
        $url=C("URL");
        $this->assign("url",$url);
        $this->display('Presentation/sns_check');
    }
    //用户报告列表
    public function sns_read(){
        $url=C("URL");
        $this->assign("url",$url);
        $this->display('Presentation/sns_read');
    }
    //用户信息关联表
    public function sample_list(){
        $url=C("URL");
        $this->assign("url",$url);
        $this->display('Presentation/sample_list');
    }

    //美肤产品报告
    public function report_mf(){
        $data = [
            'code' => I('get.code')
        ];
        $obj = new ReportModel();
        $result = $obj->userReport($data);
        print_r($result);
        $url=C("URL");
        $this->assign("url",$url);
        $this->assign("result",$result);
        $this->display('Report/report');
    }

}