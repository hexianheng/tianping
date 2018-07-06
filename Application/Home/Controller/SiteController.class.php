<?php
/* *
 * 位点控制器
 * author：PeiYun Wang
 * */
namespace Home\Controller;
use Home\Model\SiteModel;
class SiteController extends CommonController
{

    //位点列表
    public function siteList(){
        $itemid = I('post.itemid');
        $gene = I('post.gene');
        $origincode = I('post.origincode');
        $page = I('post.page');
        $obj = new SiteModel();
        $result = $obj->siteList($itemid,$gene,$origincode,$page);
        $this->response($result,'json');
    }

    //位点获取单条数据
    public function getOneSite(){
        $id = I('post.id');
        $obj = new SiteModel();
        $result = $obj->getOneSite($id);
        $this->response($result,'json');
    }

    //修改位点
    public function updSite(){
        $id = I('post.id');
        $data = [
            'itemid' => I('post.itemid'),
            'origincode' => I('post.origincode'),
            'wild_type' => I('post.wild_type'),
            'mutant_type' => I('post.mutant_type'),
            'genotype_value_ww' => I('post.genotype_value_ww'),
            'genotype_value_wm' => I('post.genotype_value_wm'),
            'genotype_value_mm' => I('post.genotype_value_mm'),
            'risk_desc_ww' => I('post.risk_desc_ww'),
            'risk_desc_wm' => I('post.risk_desc_wm'),
            'risk_desc_mm' => I('post.risk_desc_mm'),
            'ww_text' => I('post.ww_text'),
            'wm_text' => I('post.wm_text'),
            'mm_text' => I('post.mm_text'),
            'gene' => I('post.gene'),
            'gene_text' => I('post.gene_text')
        ];
        $obj = new SiteModel();
        $result = $obj->updSite($id,$data);
        $this->response($result,'json');
    }

}