<?php
/* *
 * 模版Model
 * author：PeiYun Wang
 * */
namespace Home\Model;
class TemplateModel extends BaseModel {
    private $cid = 0;
    private $templateConf = [
        //用户导入
        'user' => [
            'code' => '样本编码',
            'name' => '姓名',
            'sex' => '性别',
            'age' => '年龄',
            'phone' => '电话',
            'IDcard' => '身份证号码',
            'email' => '邮箱'
        ],
        //检测结果导入
        'data' => [
            'code' => 'SNP位点'
        ],
        //产品上传
        'product' => [
            'name' => '产品名称',
            'projectStr' => '检测项目',
            'desc' => '产品介绍'
        ],
        //项目上传
        'project' => [
            'name' => '项目名称',
            'text' => '项目介绍'
        ],
        //项目上传
        'site' => [
            'itemid' => '项目ID',
            'gene' => '基因名称',
            'origincode' => 'rs号',
            'gene_text' => '描述',
            'wild_type' => '野生型',
            'mutant_type' => '突变型',
            'genotype_value_ww' => 'ww基因型频率',
            'genotype_value_wm' => 'wm基因型频率',
            'genotype_value_mm' => 'mm基因型频率',
            'risk_desc_ww' => 'ww描述',
            'risk_desc_wm' => 'wm描述',
            'risk_desc_mm' => 'mm描述',
            'ww_text' => 'ww逻辑',
            'wm_text' => 'wm逻辑',
            'mm_text' => 'mm逻辑'
        ]
    ];
    private $templateName = [
        'user' => '用户上传模版',
        'data' => '检测结果导入模版',
        'product' => '产品上传模版',
        'project' => '项目上传模版',
        'site' => '位点上传模版'
    ];

    //获取模版
    public function getTemplate($templateNum){
        if($templateNum == '' || empty($this->templateConf[$templateNum])){
            return $this->returnMsg('A058');
        }
        $this->putExcel([],$this->templateName[$templateNum],$this->templateConf[$templateNum]);
    }

    //文件上传
    public function fileUpload($data){
        $this->cid = empty($data['cid']) ? 0 : $data['cid'];
        //验证模版类型
        if($data['type'] == '' || empty($this->templateConf[$data['type']])){
            return $this->returnMsg('A058');
        }
        //验证上传状态
        $tmpName = $data['file']['files']['tmp_name'];
        $name = $data['file']['files']['name'];
        if(empty($tmpName) || empty($name)){
            return $this->returnMsg('A059');
        }
        //验证文件后缀
        $suffix = substr($name,strripos($name,'.')+1);
        if($suffix != 'xls' && $suffix != 'xlsx'){
            return $this->returnMsg('A059');
        }
        //获取文件内容
        $result = $this->getExcel($data['file']['files']['tmp_name']);
        if(empty($result)){
            return $this->returnMsg('A059');
        }

        if($data['type'] == 'data'){

            /* *
             * 检测结果导入验证
             * */

            return $this->handleData($result);
        }else{

            /* *
             * 通用验证
             * */

            //匹配文件表头与预定义表头
            $header = $result[0];
            if(implode(',',$header) !== implode(',',$this->templateConf[$data['type']])){
                return $this->returnMsg('A050');
            }
            unset($result[0]);
            if(empty($result)){
                return $this->returnMsg('A049');
            }
            $result = $this->checkData($result,$this->templateConf[$data['type']],$data['type']);
            return $this->returnMsg(0,$result);
        }
    }

    //处理上传数据
    public function checkData($arr,$header,$type){
        //定义返回数据格式
        $result = [
            'sql' => [],
            'num' => 0,
            'errorData' => [],
            'msg' => [],
            'tableName' => ''
        ];
        $res = [];
        $headerKey = array_keys($header);
        $headerVal = array_values($header);
        $sqlHead = '';
        //定制处理
        switch ($type) {
            //用户上传
            case 'user' :
                //获取验证所需的code
                $res = array_column($arr,0);
                $sql = "select code from code where status = 3 and code in ('". implode("','",$res) ."')";
                $reData = $this->sqlQuery('code',$sql);
                if(empty($reData)){
                    $result['errorData'] = $arr;
                    $result['msg'] = '无匹配编码';
                    unset($result['num']);
                    unset($result['sql']);
                    return $result;
                }else{
                    $sqlHead = "insert into customer (". implode(',',$headerKey) .",addtime) values ";
                    $result['tableName'] = 'customer';
                    $reData = array_column($reData,'code');
                }
                break;
            //产品上传
            case 'product' :
                $res = array_column($arr,1);
                $res = array_unique(explode('|',implode('|',$res)));
                $sql = "select count(itemid) as itemNum from item where itemid in (". implode(',',$res) .")";
                $re = $this->sqlQuery('item',$sql)[0]['itemNum'];
                if(empty($re) || $re != count($res)){
                    $result['errorData'] = $arr;
                    $result['msg'] = '无匹配项目ID';
                    unset($result['num']);
                    unset($result['sql']);
                    return $result;
                }else{
                    $sqlHead = "insert into product (`". implode('`,`',$headerKey) ."`,ctime,status,cId) values ";
                    $result['tableName'] = 'product';
                }
                break;
            //项目上传
            case 'project' :
                $sqlHead = "insert into item (`". implode('`,`',$headerKey) ."`,addtime) values ";
                $result['tableName'] = 'item';
                break;
            case 'site' :
                $res = array_unique(array_column($arr,0));
                $sql = "select count(itemid) as itemNum from item where itemid in (". implode(',',$res) .")";
                $re = $this->sqlQuery('item',$sql)[0]['itemNum'];
                if(empty($re) || $re != count($res)){
                    $result['errorData'] = $arr;
                    $result['msg'] = '无匹配项目ID';
                    unset($result['num']);
                    unset($result['sql']);
                    return $result;
                }else{
                    $sqlHead = "insert into item_locus_value (`". implode('`,`',$headerKey) ."`,addtime) values ";
                    $result['tableName'] = 'product';
                }
                break;
        }
        //数据验证
        foreach($arr as $key => $val){
            $tempRes = [];
            switch ($type) {
                //用户上传
                case 'user' :
                    $tempRes = $this->userData($val,$headerVal,$headerKey,$reData);
                    break;
                //产品上传
                case 'product' :
                    $tempRes = $this->productData($val,$headerVal,$headerKey);
                    break;
                //产品上传
                case 'project' :
                    $tempRes = $this->projectData($val,$headerVal,$headerKey);
                    break;
                //点位上传
                case 'site' :
                    $tempRes = $this->siteData($val,$headerVal,$headerKey);
                    break;
            }
            if($tempRes['code'] == 0){
                $result['sql'][] = $tempRes['sql'];
                $result['num'] ++;
            }else{
                $result['errorData'][] = $tempRes['errorData'];
            }
        }
        //处理数据
        if($result['num'] != 0){
            $sql = $sqlHead . implode(',',$result['sql']);
            $this->sqlQuery($result['tableName'],$sql);
        }
        return ['num' => $result['num'],'errData' => $result['errorData']];
    }

    //上传用户处理
    public function userData($data,$headerVal,$headerKey,$reData){
        $result = [
            'sql' => [],
            'code' => -1,
            'errorData' => []
        ];
        //验证code
        if($data[0] == '' || !in_array($data[0], $reData)){
            $result['errorData'][] = $headerVal[0]. ' (' . $data[0] . ') ERROR';
            return $result;
        }
        //验证姓名
        if($data[1] == ''){
            $result['errorData'][] = $headerVal[1]. ' (' . $data[1] . ') ERROR';
            return $result;
        }
        //验证性别
        if($data[2] == '' || !in_array($data[2],['男','女','未知'])){
            $result['errorData'][] = $headerVal[2]. ' (' . $data[2] . ') ERROR';
            return $result;
        }
        //验证年龄
        if($data[3] == '' || !is_numeric($data[3]) || $data[3] <= 0){
            $result['errorData'][] = $headerVal[3]. ' (' . $data[3] . ') ERROR';
            return $result;
        }
        //验证手机号
        $reg = "/^(13|14|15|17|18)[0-9]{9}$/";
        if($data[4] == '' || !preg_match($reg,$data[4])){
            $result['errorData'][] = $headerVal[4]. ' (' . $data[4] . ') ERROR';
            return $result;
        }
        //验证email
        if($data[6] == '' || !strstr($data[6],'@') || !strstr($data[6],'.')){
            $result['errorData'][] = $headerVal[6]. ' (' . $data[6] . ') ERROR';
            return $result;
        }
        $data[7] = date('Y-m-d H:i:s');
        $result['code'] = 0;
        $result['sql'] = "('". implode("','",$data) ."')";
        return $result;
    }

    //产品上传处理
    public function productData($data,$headerVal,$headerKey){
        $result = [
            'sqlHead' => '',
            'sql' => [],
            'code' => -1,
            'errorData' => []
        ];
        //验证产品名称
        if($data[0] == ''){
            $result['errorData'][] = $headerVal[0]. ' (' . $data[0] . ') ERROR';
            return $result;
        }
        //验证产品介绍
        if($data[2] == ''){
            $result['errorData'][] = $headerVal[2]. ' (' . $data[2] . ') ERROR';
            return $result;
        }
        $data[3] = date('Y-m-d H:i:s');
        $data[4] = 0;

        $result['code'] = 0;
        $result['sql'] = "('". implode("','",$data) ."',$this->cid)";
        return $result;
    }

    //项目上传处理
    public function projectData($data,$headerVal,$headerKey){
        $result = [
            'sqlHead' => '',
            'sql' => [],
            'code' => -1,
            'errorData' => []
        ];
        //验证项目名称
        if($data[0] == ''){
            $result['errorData'][] = $headerVal[0]. ' (' . $data[0] . ') ERROR';
            return $result;
        }
        //验证产品介绍
        if($data[1] == ''){
            $result['errorData'][] = $headerVal[1]. ' (' . $data[1] . ') ERROR';
            return $result;
        }
        $data[2] = date('Y-m-d H:i:s');

        $result['code'] = 0;
        $result['sql'] = "('". implode("','",$data) ."')";
        return $result;
    }

    //点位上传
    public function siteData($data,$headerVal,$headerKey){
        $result = [
            'sqlHead' => '',
            'sql' => [],
            'code' => -1,
            'errorData' => []
        ];
        //项目ID
        if($data[0] == ''){
            $result['errorData'][] = $headerVal[0]. ' (' . $data[0] . ') ERROR';
            return $result;
        }
        //基因名称
        if($data[1] == ''){
            $result['errorData'][] = $headerVal[1]. ' (' . $data[1] . ') ERROR';
            return $result;
        }
        //rs号
        if($data[2] == ''){
            $result['errorData'][] = $headerVal[2]. ' (' . $data[2] . ') ERROR';
            return $result;
        }
        //描述
        if($data[3] == ''){
            $result['errorData'][] = $headerVal[3]. ' (' . $data[3] . ') ERROR';
            return $result;
        }
        //野生型
        if($data[4] == ''){
            $result['errorData'][] = $headerVal[4]. ' (' . $data[4] . ') ERROR';
            return $result;
        }
        //突变型
        if($data[5] == ''){
            $result['errorData'][] = $headerVal[5]. ' (' . $data[5] . ') ERROR';
            return $result;
        }
        //ww基因型频率
        if($data[6] == ''){
            $result['errorData'][] = $headerVal[6]. ' (' . $data[6] . ') ERROR';
            return $result;
        }
        //wm基因型频率
        if($data[7] == ''){
            $result['errorData'][] = $headerVal[7]. ' (' . $data[7] . ') ERROR';
            return $result;
        }
        //mm基因型频率
        if($data[8] == ''){
            $result['errorData'][] = $headerVal[8]. ' (' . $data[8] . ') ERROR';
            return $result;
        }
        //ww描述
        if($data[9] == ''){
            $result['errorData'][] = $headerVal[9]. ' (' . $data[9] . ') ERROR';
            return $result;
        }
        //wm描述
        if($data[10] == ''){
            $result['errorData'][] = $headerVal[10]. ' (' . $data[10] . ') ERROR';
            return $result;
        }
        //mm描述
        if($data[11] == ''){
            $result['errorData'][] = $headerVal[11]. ' (' . $data[11] . ') ERROR';
            return $result;
        }
        $data[15] = date('Y-m-d H:i:s');

        $result['code'] = 0;
        $result['sql'] = "('". implode("','",$data) ."')";
        return $result;
    }

    //处理检测结果
    public function handleData($data){
        //验证用户编码
        $header = $data[0];
        unset($header[0]);
        $sql = "select distinct code from customer where code in ('" . implode("','",$header) . "')";
        $re = $this->sqlQuery('customer',$sql);
        if(count($re) != count($header)){
            return $this->returnMsg('A060');
        }
        //验证rs码
        $rsData = array_unique(array_column($data,0));
        unset($rsData[0]);
        $sql = "select distinct origincode from item_locus_value where origincode in('" . implode("','",$rsData) . "')";
        $re = $this->sqlQuery('item_locus_value',$sql);
        if(count($re) != count($rsData)){
            return $this->returnMsg('A061');
        }
        //处理数据
        $end = [];
        foreach ($data as $key => $value){
            foreach ($value as $k => $v){
                $end[$k][$key] = $v;
            }
        }
        //校验数据，拼接sql
        $date = date("y-m-d H:i:s");
        $allArr = ['A','C','T','G','AA','CC','TT','GG','AT','AG','CT','CG','NA','TA','GA','TC','GC','AC','CA','TG','GT'];
        $sql = [];
        for($i = 1; $i < count($end); $i++){
            $temp = [];
            $codeTemp = '';
            for($j = 0;$j < count($end[$i]); $j++){
                if($j == 0){
                    $codeTemp = $end[$i][$j];
                }else{
                    if(in_array($end[$i][$j],$allArr)){
                        $temp[$rsData[$j]] = $end[$i][$j];
                    }else{
                        return $this->returnMsg('A062');
                    }
                }
            }
            $sql[] = "('". $codeTemp ."','". json_encode($temp) ."','". $date ."')";
        }
        //删除重复数据
        $sqlAll = "delete from detection where code in ('". implode("','",$header) ."')";
        $this->sqlQuery('detection',$sqlAll);
        $sqlAll = "insert into detection (`code`,`result`,`ctime`) VALUES ". implode(',',$sql);
        $this->sqlQuery('detection',$sqlAll);
        return $this->returnMsg(0);
    }

}