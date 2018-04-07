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
        $rsArr = [];
        foreach ($re as $key => $val){
            $temp = json_decode($val['result']);
            $re[$key]['result'] = $temp;
            foreach ($temp as $k => $v){
                $rsArr[] = $k;
            }
        }
        $rsArr = array_unique($rsArr);
        return $this->unscrambleLogic($re,$rsArr);
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
        $sql = "select * from item_locus_value where origincode in ('". implode("','",$rsArr) ."')";
        $rsArr = $this->sqlQuery('item_locus_value',$sql);
        $rsEnd = [];
        foreach ($rsArr as $value){
            $rsEnd[$value['origincode']] = $value;
        }
        $dataTempArr = [];
        $time = date('Y-m-d H:i:s');
        foreach ($re as $key => $value){
            $temp = [
                'ctime' => $time,
                'code' => $value['code'],
                'result' => ''
            ];
            $tempResult = [];
            foreach ($value['result'] as $resultKey => $resultVal){
                switch ($analysis[$resultVal]){
                    case 'A':
                        $tempResult[] = [
                            'rsCode' => $resultKey,
                            'value' => $resultVal,
                            'result' => $rsEnd[$resultKey]['risk_desc_ww'],
                            'genotype' => $rsEnd[$resultKey]['genotype_value_ww'],
                            'text' => $rsEnd[$resultKey]['ww_text']
                        ];
                        break;
                    case 'AT':
                        $tempResult[] = [
                            'rsCode' => $resultKey,
                            'value' => $resultVal,
                            'result' => $rsEnd[$resultKey]['risk_desc_wm'],
                            'genotype' => $rsEnd[$resultKey]['genotype_value_wm'],
                            'text' => $rsEnd[$resultKey]['wm_text']
                        ];
                        break;
                    case 'T':
                        $tempResult[] = [
                            'rsCode' => $resultKey,
                            'value' => $resultVal,
                            'result' => $rsEnd[$resultKey]['risk_desc_mm'],
                            'genotype' => $rsEnd[$resultKey]['genotype_value_mm'],
                            'text' => $rsEnd[$resultKey]['mm_text']
                        ];
                        break;
                    case 'NA':
                        $tempResult[] = [
                            'rsCode' => $resultKey,
                            'value' => $resultVal,
                            'result' => '--',
                            'genotype' => '--',
                            'text' => '--'
                        ];
                        break;
                }
            }
            $temp['result'] = json_encode($tempResult,JSON_UNESCAPED_UNICODE);
            $dataTempArr[] = "('" . implode("','",$temp)."')";
        }
        $sql = "delete from analytic_result where code in ('". implode("','",array_column($re,'code')) ."')";
        $this->sqlQuery('analytic_result',$sql);
        $sql = "insert into analytic_result (`ctime`,`code`,`result`) values ". implode(',',$dataTempArr);
        $this->sqlQuery('analytic_result',$sql);
        return $this->returnMsg(0);
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
            $rsSql = "select b.name,a.origincode from item_locus_value as a left join item as b on a.itemid = b.itemid where a.origincode in ('". implode("','",array_column($resultArr,'rsCode')) ."')";
            $rsArr = $this->sqlQuery('item_locus_value',$rsSql);
            $rsArrEnd = [];
            foreach ($rsArr as $val){
                $rsArrEnd[$val['origincode']] = $val['name'];
            }
            foreach ($resultArr as $key => $value){

                $resultArr[$key]['project'] = $rsArrEnd[$value['rsCode']];
                if($value['text'] == '--' || intval($value['text']) == 0){
                    $resultArr[$key]['num'] = '/';
                }else if(intval($value['text']) > 0){
                    $resultArr[$key]['num'] = '+';
                }else if(intval($value['text']) < 0){
                    $resultArr[$key]['num'] = '-';
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
        $sql = "select a.id,a.code,a.status,b.productId,a.ctime,c.name as pruductName from analytic_result as a left join code as b on a.`code` = b.`code` left join product as c on b.productId = c.id ". $where ." ORDER BY a.id DESC " . $limit;
        $re = $this->sqlQuery('analytic_result',$sql);
        return $this->returnMsg(0,$re,['page'=>$data['page'],'maxPage'=>ceil($count/10)]);
    }


    public function updReport($data){
        if($data['status'] == '' || (!in_array($data['status'],[2,3]))){
            return $this->returnMsg('A070');
        }
        if($data['id'] == ''){
            return $this->returnMsg('A070');
        }
        $sql = "select id from analytic_result where id = $data[id]";
        $re = $this->sqlQuery('analytic_result',$sql);
        if(empty($re)){
            return $this->returnMsg('A070');
        }else{
            $sql = "update analytic_result set status = $data[status] where id = $id";
            $this->sqlQuery('analytic_result',$sql);
            return $this->returnMsg(0);
        }
    }
}