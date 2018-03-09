<?php
/* *
 * 位点Model
 * author：PeiYun Wang
 * */
namespace Home\Model;
class SiteModel extends BaseModel
{

    //位点列表
    public function siteList($where = '',$page = 1){
        if($page == ''){
            $page = 1;
        }else{
            if(!is_numeric($page) || $page < 1){
                return $this->returnMsg(-4);
            }
        }

        if($where != ''){
            $where = " where itemid = '$where' or gene = '$where' or origincode = '$where'";
        }

        $pageNum = 20;
        $sql = "select count(id) as num from item_locus_value ". $where;
        $num = $this->sqlQuery('item_locus_value',$sql);
        if(empty($num)){
            return $this->returnMsg(-3);
        }
        $start = $pageNum * ($page -1);
        $sql = "select * from item_locus_value ". $where ." order by id desc limit $start,$pageNum";
        $re = $this->sqlQuery('item_locus_value',$sql);
        $result = [
            'data' => $re,
            'maxPage' => ceil($num[0]['num']/$pageNum)
        ];
        return $this->returnMsg(0,[],$result);
    }

    //获取单条位点数据
    public function getOneSite($id){
        if($id == ''){
            return $this->returnMsg('A046');
        }else{
            $sql = "select * from item_locus_value where id = ". $id;
            $re = $this->sqlQuery('item_locus_value',$sql);
            if(empty($re)){
                return $this->returnMsg('A046');
            }else{
                return $this->returnMsg(0,$re[0]);
            }
        }
    }

    //修改位点
    public function updSite($id,$data){
        //验证位点编码
        if($data['origincode'] == ''){
            return $this->returnMsg('A047');
        }
        //验证野生型W
        if($data['wild_type'] == ''){
            return $this->returnMsg('A048');
        }
        //验证突变型M
        if($data['mutant_type'] == ''){
            return $this->returnMsg('A049');
        }
        //验证基因型ww值
        if($data['genotype_value_ww'] == ''){
            return $this->returnMsg('A050');
        }
        //验证基因型wm值
        if($data['genotype_value_wm'] == ''){
            return $this->returnMsg('A051');
        }
        //验证基因型mm值
        if($data['genotype_value_mm'] == ''){
            return $this->returnMsg('A052');
        }
        //验证ww风险描述
        if($data['risk_desc_ww'] == ''){
            return $this->returnMsg('A053');
        }
        //验证wm风险描述
        if($data['risk_desc_wm'] == ''){
            return $this->returnMsg('A054');
        }
        //验证mm风险描述
        if($data['risk_desc_mm'] == ''){
            return $this->returnMsg('A055');
        }
        //验证基因名称
        if($data['gene'] == ''){
            return $this->returnMsg('A056');
        }
        //验证基因描述
        if($data['gene_text'] == ''){
            return $this->returnMsg('A057');
        }
        //验证项目id
        if($data['itemid'] == ''){
            return $this->returnMsg('A034');
        }else{
            $sql = "select itemid from item where itemid = ". $data['itemid'];
            $re = $this->sqlQuery('item',$sql);
            if(empty($re)){
                return $this->returnMsg('A034');
            }
        }
        //验证id
        if($id == ''){
            return $this->returnMsg('A046');
        }else{
            $sql = "select id from item_locus_value where id = ". $id;
            $re = $this->sqlQuery('item_locus_value',$sql);
            if(empty($re)){
                return $this->returnMsg('A046');
            }
        }
        $this->sqlUpdate('item_locus_value',$data,' id = '. $id);
        return $this->returnMsg('0');
    }

}