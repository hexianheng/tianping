<?php
/* *
 * 报告Model
 * author：PeiYun Wang
 * */
namespace Home\Model;
class ReportModel extends BaseModel
{
    //检测结果列表
    public function detectionResult($data){
        if($data['page'] == ''){
            $data['page'] = 1;
        }else{
            if(!is_numeric($data['page'])){
                return $this->returnMsg(-4);
            }
        }
        $where = [];
        if($data['where'] != ''){
            $where = " where a.`code` = '$data[where]'";
        }else{
            $where = '';
        }
        $countSql = "select count(id) as count from detection as a " . $where;
        $count = $this->sqlQuery('code',$countSql)[0]['count'];
        if(empty($count)){
            return $this->returnMsg(-3);
        }
        $limit = $this->_makeLimit($data['page'],10);
        $sql = "select a.id,a.code,b.productId,a.ctime from detection as a left join code as b on a.`code` = b.`code` ". $where ." ORDER BY a.id DESC " . $limit;
        $re = $this->sqlQuery('user',$sql);
        return $this->returnMsg(0,$re,['page'=>$data['page'],'maxPage'=>ceil($count/10)]);
    }

    //检测结果删除
    public function delDetection($id){
        $sql = "select id from detection where id = ".$id;
        $re = $this->sqlQuery('detection',$sql);
        if(empty($re)){
            return $this->returnMsg('A063');
        }
        $sql = "delete from detection where id = " . $id;
        $this->sqlQuery('detection',$sql);
        return $this->returnMsg(0);
    }

    //报告解读
    public function unscrambleReport($data){
        //验证
        if($data['startId'] == '' || (!is_numeric($data['startId']))){
            return $this->returnMsg('A064');
        }
        if($data['endId'] == '' || (!is_numeric($data['endId']))){
            return $this->returnMsg('A065');
        }
        $sql = "select * from detection where id <= '$data[endId]' and id >= '$data[startId]'";
        $re = $this->sqlQuery('detection',$sql);
        if(empty($re)){
            return $this->returnMsg('A066');
        }
        foreach ($re as $key => $val){
            $rsArr = [];
            $temp = json_decode($val['result'],1);
            $val['result'] = $temp;
            foreach ($temp as $k => $v){
                $rsArr[] = $k;
            }
            $rsArr = array_unique($rsArr);
            $this->unscrambleLogic($val,$rsArr);
        }
        return $this->returnMsg(0);
    }

    //解读逻辑
    public function unscrambleLogic($re,$rsArr){
        //定义分析逻辑
        $analysis = [
            'A' => 'A',
            'C' => 'A',
            'AA' => 'A',
            'CC' => 'A',
            'AC' => 'A',
            'CA' => 'A',
            'AT' => 'AT',
            'AG' => 'AT',
            'CT' => 'AT',
            'CG' => 'AT',
            'TA' => 'AT',
            'TC' => 'AT',
            'GA' => 'AT',
            'GC' => 'AT',
            'T' => 'T',
            'G' => 'T',
            'TT' => 'T',
            'GG' => 'T',
            'TG' => 'T',
            'GT' => 'T',
            'NA' => 'NA'
        ];

        $itemSql = "select b.projectStr from code as a left join product as b on a.productId = b.id where a.code = '$re[code]'";
        $itemArr = $this->sqlQuery('code',$itemSql)[0]['projectStr'];

        $sql = "select * from item_locus_value where origincode in ('". implode("','",$rsArr) ."') and itemid in ('". implode("','",explode('|',$itemArr)) ."')";
        $rsArr = $this->sqlQuery('item_locus_value',$sql);

        $addArr = [
            'ctime' => date('Y-m-d H:i:s'),
            'code' => $re['code']
        ];
        $addResult = [];

        foreach ($rsArr as $key => $val){
            $temp = [
                'rsCode' => $val['origincode'],
                'gene' => $val['gene'],
                'wild_type' => $val['wild_type'],
                'mutant_type' => $val['mutant_type']
            ];
            $a = $re['result'][$val['origincode']];
            $temp['value'] = $a;

            $suffixA = '';
            $suffixB = '';
            if($val['wild_type'] == 'A' || $val['wild_type'] == 'C'){
                $suffixA = 'ww';
                $suffixB = 'mm';
            }else if($val['wild_type'] == 'T' || $val['wild_type'] == 'G'){
                $suffixA = 'mm';
                $suffixB = 'ww';
            }

            switch ($analysis[$a]){
                case 'A':
                    $temp['result'] = $val['risk_desc_'.$suffixA];
                    $temp['genotype'] = $val['genotype_value_'.$suffixA];
                    $temp['text'] = $val[$suffixA.'_text'];
                    break;
                case 'AT':
                    $temp['result'] = $val['risk_desc_wm'];
                    $temp['genotype'] = $val['genotype_value_wm'];
                    $temp['text'] = $val['wm_text'];
                    break;
                case 'T':
                    $temp['result'] = $val['risk_desc_'.$suffixB];
                    $temp['genotype'] = $val['genotype_value_'.$suffixB];
                    $temp['text'] = $val[$suffixB.'_text'];
                    break;
                case 'NA':
                    $temp['result'] = '--';
                    $temp['genotype'] = '--';
                    $temp['text'] = '--';
                    break;
            }
            $addResult[$val['itemid']][] = $temp;
        }
        $addArr['result'] = json_encode($addResult,JSON_UNESCAPED_UNICODE);

        $sql = "delete from analytic_result where code = '$re[code]'";
        $this->sqlQuery('analytic_result',$sql);
        $sql = "insert into analytic_result (`ctime`,`code`,`result`) values ('". implode("','",$addArr) ."')";
        $this->sqlQuery('analytic_result',$sql);

    }

    //用户报告
    public function userReport($data){
        if($data['code'] == ''){
            return $this->returnMsg('A060');
        }
        $sql = "SELECT b.`name`,b.age,b.sex,b.code,b.phone,a.result,d. NAME AS 'productName' FROM analytic_result AS a LEFT JOIN customer AS b ON a.`code` = b.`code` LEFT JOIN `code` AS c ON a.`code` = c.`code` LEFT JOIN product AS d ON c.productId = d.id WHERE a. CODE = '$data[code]'";
        $re = $this->sqlQuery('analytic_result',$sql)[0];
        if(empty($re)){
            return $this->returnMsg('A060');
        }else{
            $resultArr = json_decode($re['result'],1);
            $itemSql = "select itemid,name from item where itemid in ('". implode("','",array_keys($resultArr)) ."')";
            $itemArr = $this->sqlQuery('item',$itemSql);

            $itemArrEnd = [];
            foreach ($itemArr as $val){
                $itemArrEnd[$val['itemid']] = $val['name'];
            }
            foreach ($resultArr as $key => $value){
                $resultArr[$key]['project'] = $itemArrEnd[$key];
                foreach ($value as $k => $v){
                    if($v['text'] == '--' || intval($v['text']) == 0){
                        $resultArr[$key][$k]['num'] = '/';
                    }else if(intval($v['text']) > 0){
                        $resultArr[$key][$k]['num'] = '+';
                    }else if(intval($v['text']) < 0){
                        $resultArr[$key][$k]['num'] = '-';
                    }
                }
            }
            $re['result'] = $resultArr;
            return $this->returnMsg(0,$re);
        }
    }

    public function userReportList($data){
        if($data['page'] == ''){
            $data['page'] = 1;
        }else{
            if(!is_numeric($data['page'])){
                return $this->returnMsg(-4);
            }
        }
        $where = [];
        if($data['where'] != ''){
            $where = " where a.`code` = '$data[where]'";
        }else{
            $where = '';
        }
        $countSql = "select count(id) as count from analytic_result as a " . $where;
        $count = $this->sqlQuery('analytic_result',$countSql)[0]['count'];
        if(empty($count)){
            return $this->returnMsg(-3);
        }
        $limit = $this->_makeLimit($data['page'],10);
        $sql = "select a.pdfPath,a.id,a.code,a.status,b.productId,a.ctime,c.name as pruductName from analytic_result as a left join code as b on a.`code` = b.`code` left join product as c on b.productId = c.id ". $where ." ORDER BY a.id DESC " . $limit;
        $re = $this->sqlQuery('analytic_result',$sql);
        return $this->returnMsg(0,$re,['page'=>$data['page'],'maxPage'=>ceil($count/10)]);
    }


    public function updReport($data){
        if($data['status'] == '' || (!in_array($data['status'],[2,3]))){
            return $this->returnMsg('A070');
        }
        if($data['idStr'] == ''){
            return $this->returnMsg('A071');
        }
        $idArr = explode('|',$data['idStr']);
        $sql = "select id,code from analytic_result where id in ('". implode("','",$idArr) ."') and status = 1";
        $re = $this->sqlQuery('analytic_result',$sql);
        if(empty($re) || count($idArr) != count($re)){
            return $this->returnMsg('A071');
        }else{
            //推送pdf任务
            if($data['status'] == 2){
                $codeArr = array_column($re,'code');
                $sql = "delete from pdf_task where code in ('" .implode("','",$codeArr). "')";
                $this->sqlQuery('pdf_task',$sql);
                $date = date('Y-m-d H:i:s');
                $sql = "insert into pdf_task (code,addTime) values ('" . implode("','". $date ."'),('",$codeArr) . "','". $date ."')";
                $this->sqlQuery('pdf_task',$sql);
            }

            $sql = "update analytic_result set status = $data[status] where id in ('". implode("','",$idArr) ."')";
            $this->sqlQuery('analytic_result',$sql);

            return $this->returnMsg(0);
        }
    }

    public function downloadZip($data){
        $pdfFile = [];
        if($data['codeStr'] == ''){
            return $this->returnMsg('A073');
        }
        $codeArr = explode('|',$data['codeStr']);
        foreach ($codeArr as $value){
            if(is_file( 'Public/pdf/' . $value.'.pdf')){
                $pdfFile[] = 'Public/pdf/' . $value.'.pdf';
            }
        }

        if(empty($pdfFile)){
            return $this->returnMsg('A073');
        }
        $date = date('Y-m-d_H-i-s'). ".zip";
        $shell = "zip -j Public/zip/" . $date . " " . implode(" ",$pdfFile);
        shell_exec($shell);
        return $this->returnMsg(0,['path' => "Public/zip/" . $date]);
    }
}