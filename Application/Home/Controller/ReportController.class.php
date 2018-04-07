<?php
/* *
 * 报告控制器
 * author：PeiYun Wang
 * */
namespace Home\Controller;
use Home\Model\ReportModel;
class ReportController extends CommonController
{

    //构造方法
    public function __construct()
    {
        parent::__construct();
    }

    //检测结果列表
    public function detectionResult()
    {
        $data = [
            'where' => I('post.where'),
            'page' => I('post.page')
        ];
        $obj = new ReportModel();
        $result = $obj->detectionResult($data);
        $this->response($result,'json');
    }

    //检测结果删除
    public function delDetection(){
        $id = I('post.id');
        $obj = new ReportModel();
        $result = $obj->delDetection($id);
        $this->response($result,'json');
    }

    //报告解读
    public function unscrambleReport(){
        $data = [
            'startId' => I('post.startId'),
            'endId' => I('post.endId')
        ];
        $obj = new ReportModel();
        $result = $obj->unscrambleReport($data);
        $this->response($result,'json');
    }

    //获取用户报告
    public function userReport(){
        $data = [
            'code' => I('post.code')
        ];
        $obj = new ReportModel();
        $result = $obj->userReport($data);
        $this->response($result,'json');
    }

    
    //检测结果
    public function userReportList(){
        $data = [
            'where' => I('post.where'),
            'page' => I('post.page'),
        ];
        $obj = new ReportModel();
        $result = $obj->userReportList($data);
        $this->response($result,'json');
    }


}