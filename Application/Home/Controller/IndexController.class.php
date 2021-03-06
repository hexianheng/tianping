<?php
/* *
 * 路由控制器
 * author：PeiYun Wang
 * */
namespace Home\Controller;
use Home\Model\ReportModel;
use Home\Model\UserModel;
class IndexController extends BaseController {

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
    //角色修改
    public function js_update(){
        $id = $_GET["id"];
        $url=C("URL");
        $this->assign("url",$url);
        $this->assign("id",$id);
        $this->display('Jurisdiction/js_update');
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

    //产品新增
    public function product_add(){
        $url=C("URL");
        $this->assign("url",$url);
        $this->display('Product/product_add');
    }

    //产品修改
    public function product_update(){
        $id = $_GET["id"];
        $url=C("URL");
        $this->assign("url",$url);
        $this->assign("id",$id);
        $this->display('Product/product_update');
    }
    
    //项目列表
    public function project_list(){
        $url=C("URL");
        $this->assign("url",$url);
        $this->display('Product/project_list');
    }
    //项目添加
    public function project_add(){
        $url=C("URL");
        $this->assign("url",$url);
        $this->display('Product/project_add');
    }
    //位点列表
    public function site_list(){
        $url=C("URL");
        $this->assign("url",$url);
        $this->display('Product/site_list');
    }

    //位点添加
    public function site_add(){
        $url=C("URL");
        $this->assign("url",$url);
        $this->display('Product/site_add');
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
        $this->display('Presentation/SNS_read');
    }
    //用户信息关联表
    public function sample_list(){
        $url=C("URL");
        $this->assign("url",$url);
        $this->display('Presentation/sample_list');
    }

    //用户信息关联表
    public function api_list(){
        $url=C("URL");
        $this->assign("url",$url);
        $this->display('Api/api_list');
    }

    //美肤产品报告
    public function report_mf(){
        //$userId = I('userId');
        //$token = I('token');
        $type = I('type');
        //$obj = new UserModel();
        //$return = $obj->checkToken($userId,$token);
        //if($return['code'] !== 0){
        //    $this->response($return,'json');
        //}
        $data = [
            'code' => I('get.code')
        ];
        $obj = new ReportModel();
        $result = $obj->userReport($data);
        foreach ($result["data"]["result"] as $k => $v){
            foreach($v as $k1 => $v1){
                $result["data"]["result"][$k]["sum"]+=$v1["text"];
            }
        }
        foreach ($result["data"]["result"] as $k => $v){
            if($v["sum"]>0){
                $v["sum"]=$v["sum"]+1;
                $result["data"]["result"][$k]["sum_text"]=0;
            }else if($v["sum"]==0){
                $v["sum"]=$v["sum"]+1;
                $result["data"]["result"][$k]["sum_text"]=0;
            }else{
                $result["data"]["result"][$k]["sum_text"]=1;
            }
            $leida[] = $v["sum"];
            $suggest[$k] = $v["sum"];
        }
        $leida = implode(",",$leida);
        $arrData = $this->mf($result["data"]["result"]);
        //print_r($suggest);
        $url=C("URL");
        $this->assign("url",$url);
        $this->assign("result",$result);
        $this->assign("leida",$leida);
        $this->assign("suggest",$suggest);
        $this->assign("arrdata",$arrData);
        if($type==1){
            $this->display('Report/report');
        }else if($type==2){
            $this->display('Report/skin_img');
        }else{
            $arr = array("a"=>"cc", "b"=>"glh", "c"=>"ksl", "d"=>"qb", "e"=>"ss","f"=>"zw");
            shuffle($arr);
            header("location:http://home.aitianping.com/Public/images/share/".$arr[0]."/".$arrData[$arr[0]]["url"]);
        }
    }

    public function mf($data){
        $url=C("URL");
        $src = $url."/Public/images/skin_phone";
        //$src = "http://localhost:8080/gitjob/Public/images/skin-phone";
        //眼皮松弛
        $ypsc = 0;
        if($data[11]["sum"]==0){
            // #6896d3 是蓝色[其他检测结果]，#5fb864 绿色【群体水平】，  #cfcfcf 灰色【不考虑】， #ca5048 红色【受检者
            $arr[11]["color"] ="#cfcfcf,#cfcfcf,#cfcfcf,#ca5048,#6896d3,#cfcfcf,#cfcfcf,#cfcfcf,#cfcfcf,#cfcfcf,#cfcfcf,#cfcfcf";
            $arr[11]["desc"] = "<span>得分0 正常</span>，与眼睑松弛相关的核心基因未发生保护型变异，蛋白质行使功能正常，与群体水平持平；";
        }else if($data[11]["sum"]==1){
            $arr[11]["color"] ="#cfcfcf,#cfcfcf,#cfcfcf,#ca5048,#6896d3,#cfcfcf,#cfcfcf,#cfcfcf,#cfcfcf,#cfcfcf,#cfcfcf,#cfcfcf";
            $arr[11]["desc"] = "<span>得分1</span> 与眼睑松弛相关的核心基因COL1A2发生杂合（纯合）突变，导致眼皮松弛程度比群体水平降低26%（52%）/与眼睑松弛相关的核心基因TGIF1发生纯合突变，导致眼皮松弛程度比群体水平降低27~45%。";
        }else if($data[11]["sum"]==2){
            $arr[11]["color"] ="#cfcfcf,#cfcfcf,#cfcfcf,#5fb864,#ca5048,#cfcfcf,#cfcfcf,#cfcfcf,#cfcfcf,#cfcfcf,#cfcfcf,#cfcfcf";
            $arr[11]["desc"] = "<span>得分2</span> 与眼睑皮肤松弛相关的两个核心基因均发生保护型变异，与群体水平相比眼部皮肤不易出现松弛或下垂现象。/TGIF1基因发生风险变异导致眼睑松垂的风险增加。";
        }
        //鱼尾纹
        $yww = 0;
        if($data[12]["sum"]==0){
            $arr[12]["desc"] = "<span>得分0 正常</span>，AHR基因未发生风险变异，蛋白正常行使功能，此基因型占群体水平的39.7%；";
        }else if($data[12]["sum"]=='-1'){
            $yww = $yww+1;
            $arr[12]["desc"] = "<span>得分-1</span> AHR基因发生杂合突变，存在一个风险等位基因A，导致鱼尾纹的风险与正常水平相比增加7%，42.7%的个体均是AG型；";
        }else if($data[12]["sum"]=='-2'){
            $yww = $yww+1;
            $arr[12]["desc"] = "<span>得分-2</span> AHR基因发生纯合突变，存在两个风险等位基因A，导致鱼尾纹的风险与正常水平相比增加14%，13.7%的个体是AA型。";
        }
        //雀斑
        if($data[13]["sum"]==0){
            $arr[13]["desc"] = "<span>得分0 正常</span>，与亚洲人雀斑发生相关的两个核心基因均未发生风险变异，蛋白行使功能正常，与群体水平持平；";
            $arr[qb]["img"] ="<li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li>";
            $arr[qb]["url"] = "q4.jpg";
            $arr[qb]["desc"] ="不容易长雀斑";
        }else if($data[13]["sum"]=='-1'){
            $arr[13]["desc"] = "<span>得分-1</span> MC1R基因发生变异，风险等位基因A导致个体出现雀斑的风险增加/ASIP基因发生变异，风险等位基因T导致个体出现雀斑的风险增加；";
            $arr[qb]["img"] ="<li><img src='".$src."/03.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li>";
            $arr[qb]["url"] = "q3.jpg";
            $arr[qb]["desc"] ="较容易长雀斑";
        }else if($data[13]["sum"]=='-2'){
            $arr[13]["desc"] = "<span>得分-2</span> 与亚洲人雀斑发生先关的两个核心基因均出现了风险变异，皮肤容易出现色素沉积或雀斑。";
            $arr[qb]["img"] ="<li><img src='".$src."/03.png'alt=''></li><li><img src='".$src."/03.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li>";
            $arr[qb]["url"] = "q2.jpg";
            $arr[qb]["desc"] ="容易长雀斑";
        }
        //痤疮
        if($data[14]["sum"]==0){
            $arr[14]["desc"] = "<span>得分0 正常</span>，与中国汉族痤疮发生的三个核心基因均未发生风险变异，蛋白行使功能正常，与群体水平持平；";
            $arr[cc]["img"] ="<li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li>";
            $arr[cc]["url"] = "c4.jpg";
            $arr[cc]["desc"] ="痤疮风险一般";
        }else if($data[14]["sum"]=='-1'){
            $arr[14]["desc"] = "<span>得分-1</span> DDB2基因发生变异，风险等位基因G导致个体患痤疮的风险增加/DDB2两个基因位点均发生变异，风险等位基因G导致个体患痤疮的风险明显增加/SELL基因发生变异，风险等位基因G导致个体患痤疮的风险增加；";
            $arr[cc]["img"] ="<li><img src='".$src."/03.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li>";
            $arr[cc]["url"] = "c3.jpg";
            $arr[cc]["desc"] ="痤疮风险较高";
        }else if($data[14]["sum"]=='-2'){
            $arr[14]["desc"] = "<span>得分-2</span> DDB2基因发生变异，风险等位基因G导致个体患痤疮的风险增加/DDB2两个基因位点均发生变异，风险等位基因G导致个体患痤疮的风险明显增加/SELL基因发生变异，风险等位基因G导致个体患痤疮的风险增加；";
            $arr[cc]["img"] ="<li><img src='".$src."/03.png'alt=''></li><li><img src='".$src."/03.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li>";
            $arr[cc]["url"] = "c2.jpg";
            $arr[cc]["desc"] ="痤疮风险高";
        }else if($data[14]["sum"]=='1'){
            $arr[14]["desc"] = "<span>得分1</span> SELL基因发生保护型变异，等位基因A导致个体患痤疮的风险降低，19.6%的个体是这种基因型。";
            $arr[cc]["img"] ="<li><img src='".$src."/lv.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li>";
            $arr[cc]["url"] = "c5.jpg";
            $arr[cc]["desc"] ="不容易长痤疮";
        }
        //日晒斑
        $rsb = 0;
        if($data[15]["sum"]==0){
            $arr[15]["desc"] = "<span>得分0</span> 与中国人群日晒斑相关的基因均不存在功能性变异，蛋白行使功能正常，但是与群体水平相比抵抗晒斑的能力有所下降，需要做好日常防护；";
        }else if($data[15]["sum"]=='-1'){
            $rsb = $rsb+1;
            $arr[15]["desc"] = "<span>得分-1</span> 31.6%的个体在ASIP基因上存在风险变异T导致个体的色素沉积能力，雀斑或日晒斑风险较群体水平有所增加；";
        }else if($data[15]["sum"]=='1'){
            $arr[15]["desc"] = "<span>得分1</span> 在BNC2基因上存在保护型变异，导致对抗日晒斑的能力增加，不易出现晒斑，当两个位点都存在有益变异时，这种保护作用最强。";
        }else if($data[15]["sum"]=='2'){
            $arr[15]["desc"] = "<span>得分2</span> 在BNC2基因上存在保护型变异，导致对抗日晒斑的能力增加，不易出现晒斑，当两个位点都存在有益变异时，这种保护作用最强。";
        }
        //皱纹和胶原蛋白降解
        $zwjy = 0;
        if($data[16]["sum"]==0){
            $arr[16]["desc"] = "<span>得分0</span> 与皱纹相关的三个核心基因均未出现功能变异，蛋白行使功能正常，抗皱能力优于群体水平；";
        }else if($data[16]["sum"]=='-1'){
            $zw = $zwjy+1;
            $arr[16]["desc"] = "<span>得分-1</span> 在EXOC2/IRF4基因中间区域存在一个风险变异T，不同人群的研究结果表明，与人群平均水平相比，存在风险变异的个体更容易出现皱纹/-1MMP1基因出现纯合突变，GG基因型个体降解胶原的能力明显增加，有45.4%的个体均是这种基因型，预示中国汉族人的抗胶原蛋白降解能力普遍偏低,胶原蛋白的降解加速致使机体更容易出现皱纹；";
        }else if($data[16]["sum"]=='1'){
            $arr[16]["desc"] = "<span>得分1</span> 在STXBP5L基因区域存在一个保护型变异A，与人群平均水平相比，存在保护型变异的个体更不容易出现皱纹。";
        }
        //糖基化作用
        $tjh = 0;
        if($data[17]["sum"]==0){
            $arr[17]["desc"] = "<span>得分0正常</span>，与糖基化作用相关的核心基因均为出现功能性变异，蛋白行使功能正常，与群体水平持平；";
        }else if($data[17]["sum"]=='-1'){
            $tjh = 1;
            $arr[17]["desc"] = "<span>得分-1</span> 出现一个核心基因变异，抗糖基化作用降低，皮肤容易老化；";
        }else if($data[17]["sum"]=='-2'){
            $tjh = 1;
            $arr[17]["desc"] = "<span>得分-2</span> 出现2个核心基因变异，抗糖基化作用降低，皮肤容易老化；";
        }else if($data[17]["sum"]=='-3'){
            $tjh = 1;
            $arr[17]["desc"] = "<span>得分-3</span> 出现3个核心基因变异，抗糖基化作用明显降低，皮肤容易老化，这种个体在人群中极少数存在。";
        }
        //美白基因
        $mb = 0;
        if($data[18]["sum"]==0){
            $arr[18]["desc"] = "<span>得分0</span> 代表黑色素合成能力较高，属于先天肤色偏暗个体，比较容易晒黑，放在皮肤美白上的精力不必过多；";
        }else if($data[18]["sum"]=='-1'){
            $mb = $mb+1;
            $arr[18]["desc"] = "<span>得分-1</span> 代表黑色素合成能力较高，属于先天肤色偏暗个体，比较容易晒黑，放在皮肤美白上的精力不必过多；";
        }else if($data[18]["sum"]=='1'){
            $arr[18]["desc"] = "<span>得分1</span> 代表黑色素合成能力中等，肤色正常，晒黑反应属于群体正常水平，注意防晒，适当使用美白产品能达到肌肤美白的效果；";
        }else if($data[18]["sum"]=='2'){
            $arr[18]["desc"] = "<span>得分2</span> 代表黑色素合成能力中等，肤色正常，晒黑反应属于群体正常水平，注意防晒，适当使用美白产品能达到肌肤美白的效果；";
        }else if($data[18]["sum"]=='3'){
            $arr[18]["desc"] = "<span>得分3</span> 代表黑色素合成能力较差，先天肤色偏白，由于黑色素的合成能力较差，在紫外线照射时，晒黑反应不明显，恰恰由于缺乏黑色素对紫外线的吸收，肌肤虽不容易晒黑，却会容易出现胶原流失，炎症，晒伤等状况，所以更应该加强防晒工作；";
        }else if($data[18]["sum"]=='4'){
            $arr[18]["desc"] = "<span>得分4</span> 代表黑色素合成能力较差，先天肤色偏白，由于黑色素的合成能力较差，在紫外线照射时，晒黑反应不明显，恰恰由于缺乏黑色素对紫外线的吸收，肌肤虽不容易晒黑，却会容易出现胶原流失，炎症，晒伤等状况，所以更应该加强防晒工作；";
        }else if($data[18]["sum"]=='5'){
            $arr[18]["desc"] = "<span>得分5</span> 代表黑色素合成能力很差，不容易晒黑，也是因此导致对紫外线的抵御能力下降，增加了基地细胞癌的风险；";
        }else if($data[18]["sum"]=='6'){
            $arr[18]["desc"] = "<span>得分6</span> 代表黑色素合成能力很差，不容易晒黑，也是因此导致对紫外线的抵御能力下降，增加了基地细胞癌的风险；";
        }else if($data[18]["sum"]=='7'){
            $arr[18]["desc"] = "<span>得分7</span> 在黑色素合成通路中的大部分关键基因发生变异，肤色整体偏白，在紫外线照射时无法形成黑色素以保护皮肤免受损伤，增加了基底细胞癌的风险，这种个体在人群中的概率极低，应实时注意防止紫外线照射。";
        }else if($data[18]["sum"]=='8'){
            $arr[18]["desc"] = "<span>得分8</span> 在黑色素合成通路中的大部分关键基因发生变异，肤色整体偏白，在紫外线照射时无法形成黑色素以保护皮肤免受损伤，增加了基底细胞癌的风险，这种个体在人群中的概率极低，应实时注意防止紫外线照射。";
        }
        //抗氧化能力
        $kyh = 0;
        if($data[19]["sum"]=='-3' || $data[19]["sum"]=='-4'){
            $kyh = 1;
            $arr[19]["desc"] = "得分".$data[19]["sum"]."极低";
        }else if($data[19]["sum"]=='-2'){
            $kyh = 1;
            $arr[19]["desc"] = "<span>得分-2 很低</span>";
        }else if($data[19]["sum"]=='-1'){
            $kyh = 1;
            $arr[19]["desc"] = "<span>得分-1 较低</span>";
        }else if($data[19]["sum"]=='0'){
            $arr[19]["desc"] = "<span>得分0 正常</span>";
        }else if($data[19]["sum"]=='1'){
            $kyh = 2;
            $arr[19]["desc"] = "<span>得分1 较高</span>";
        }else if($data[19]["sum"]=='2'){
            $kyh = 2;
            $arr[19]["desc"] = "<span>得分2 很高</span>";
        }
        //皮肤锁水能力
        if($data[20]["sum"]=='-1'){
            $arr[20]["desc"] = "<span>得分".$data[20]["sum"]."锁水能力一般</span>";
            $arr[ss]["img"] ="<li><img src='".$src."/03.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li>";
            $arr[ss]["url"] = "s5.jpg";
            $arr[ss]["desc"] ="皮肤锁水能力正常";
        }else if($data[20]["sum"]=='0'){
            $arr[20]["desc"] = "<span>得分0 锁水能力正常</span>";
            $arr[ss]["img"] ="<li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li>";
            $arr[ss]["url"] = "s6.jpg";
            $arr[ss]["desc"] ="皮肤锁水能力正常";
        }else if($data[20]["sum"]=='1'){
            $arr[20]["desc"] = "<span>得分1 锁水能力很高</span>";
            $arr[ss]["img"] ="<li><img src='".$src."/lv.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li>";
            $arr[ss]["url"] = "s7.jpg";
            $arr[ss]["desc"] ="皮肤锁水能力提升";
        }else if($data[20]["sum"]=='-2' || $data[20]["sum"]=='-3'){
            $arr[19]["desc"] = "<span>得分".$data[20]["sum"]."锁水能力很低</span>";
            if($data[20]["sum"]=='-2'){
                $arr[ss]["img"] ="<li><img src='".$src."/03.png'alt=''></li><li><img src='".$src."/03.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li>";
                $arr[ss]["url"] = "s4.jpg";
                $arr[ss]["desc"] ="皮肤锁水能力一般";
            }
            if($data[20]["sum"]=='-3'){
                $arr[ss]["img"] ="<li><img src='".$src."/03.png'alt=''></li><li><img src='".$src."/03.png'alt=''></li><li><img src='".$src."/03.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li>";
                $arr[ss]["url"] = "s3.jpg";
                $arr[ss]["desc"] ="皮肤锁水能力较差";
            }
        }else if($data[20]["sum"] <= -4){
            $arr[20]["desc"] = "<span>得分".$data[20]["sum"]."锁水能力极低</span>";
            $arr[ss]["img"] ="<li><img src='".$src."/03.png'alt=''></li><li><img src='".$src."/03.png'alt=''></li><li><img src='".$src."/03.png'alt=''></li><li><img src='".$src."/03.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li>";
            $arr[ss]["url"] = "s2.jpg";
            $arr[ss]["desc"] ="皮肤锁水能力差";
        }

        $glh = $mb+$rsb;//光老化
        if($glh==2){
            $arr[glh]["img"] ="<li><img src='".$src."/03.png'alt=''></li><li><img src='".$src."/03.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li>";
            $arr[glh]["url"] = "g1.jpg";
            $arr[glh]["desc"] ="很容易光老化";
        }else if($glh==1){
            $arr[glh]["img"] ="<li><img src='".$src."/03.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li>";
            $arr[glh]["url"] = "g2.jpg";
            $arr[glh]["desc"] ="容易光老化";
        }else{
            $arr[glh]["img"] ="<li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li>";
            $arr[glh]["url"] = "g3.jpg";
            $arr[glh]["desc"] ="不容易光老化";
        }

        $zw = $ypsc+$yww+$zwjy;//皱纹
        if(zw==3){
            $arr[zw]["img"] ="<li><img src='".$src."/03.png'alt=''></li><li><img src='".$src."/03.png'alt=''></li><li><img src='".$src."/03.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li>";
            $arr[zw]["url"] = "z1.jpg";
            $arr[zw]["desc"] ="很容易长皱纹";
        }else if(zw==2){
            $arr[zw]["img"] ="<li><img src='".$src."/03.png'alt=''></li><li><img src='".$src."/03.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li>";
            $arr[zw]["url"] = "z2.jpg";
            $arr[zw]["desc"] ="容易光长皱纹";
        }else if(zw==1){
            $arr[zw]["img"] ="<li><img src='".$src."/03.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/03.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li>";
            $arr[zw]["url"] = "z3.jpg";
            $arr[zw]["desc"] ="较容易长皱纹";
        }else{
            $arr[zw]["img"] ="<li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li>";
            $arr[zw]["url"] = "z4.jpg";
            $arr[zw]["desc"] ="不容易长皱纹";
        }

        if($tjh == 0 && $kyh ==0){
            $arr[ksl]["img"] ="<li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li>";
            $arr[ksl]["url"] = "k6.jpg";
            $arr[ksl]["desc"] ="抗衰老能力正常";
        }
        else if($tjh == 1 && $kyh ==0){
            $arr[ksl]["img"] ="<li><img src='".$src."/03.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li>";
            $arr[ksl]["url"] = "k4.jpg";
            $arr[ksl]["desc"] ="抗衰老能力弱";
        }
        else if($tjh == 0 && $kyh ==1){
            $arr[ksl]["img"] ="<li><img src='".$src."/03.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li>";
            $arr[ksl]["url"] = "k4.jpg";
            $arr[ksl]["desc"] ="抗衰老能力弱";
        }
        else if($tjh == 1 && $kyh ==1){
            $arr[ksl]["img"] ="<li><img src='".$src."/03.png'alt=''></li><li><img src='".$src."/03.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li>";
            $arr[ksl]["url"] = "k3.jpg";
            $arr[ksl]["desc"] ="抗衰老能力很弱";
        }
        else if($tjh == 1 && $kyh ==2){
            $arr[ksl]["img"] ="<li><img src='".$src."/lv.png'alt=''></li><li><img src='".$src."/03.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li>";
            $arr[ksl]["url"] = "k5.jpg";
            $arr[ksl]["desc"] ="抗衰老能力一般";
        }
        else if($tjh == 0 && $kyh ==2){
            $arr[ksl]["img"] ="<li><img src='".$src."/lv.png'alt=''></li><li><img src='".$src."/lv.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li><li><img src='".$src."/04.png'alt=''></li>";
            $arr[ksl]["url"] = "k2.jpg";
            $arr[ksl]["desc"] ="抗衰老能力强";
        }
        return $arr;
    }

}