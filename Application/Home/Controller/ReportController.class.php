<?php
/* *
 * 报告控制器
 * author：PeiYun Wang
 * */
namespace Home\Controller;
use Home\Model\ReportModel;
class ReportController extends CommonController
{

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

    //获取解读结果
    public function userReport(){
        $data = [
            'code' => I('get.code')
        ];
        $obj = new ReportModel();
        $result = $obj->userReport($data);
        $this->response($result,'json');
    }

    //解读列表
    public function userReportList(){
        $data = [
            'where' => I('post.where'),
            'page' => I('post.page'),
        ];
        $obj = new ReportModel();
        $result = $obj->userReportList($data);
        $this->response($result,'json');
    }

    //审核解读结果
    public function updReport(){
        $data = [
            'codeStr' => I('post.codeStr'),
            'status' => I('post.status')
        ];
        $obj = new ReportModel();
        $result = $obj->updReport($data);
        $this->response($result,'json');

    }

    //批量下载报告
    public function downloadZip(){
        $data = [
            'codeStr' => I('post.codeStr')
        ];
        $obj = new ReportModel();
        $result = $obj->downloadZip($data);
        $this->response($result,'json');
    }
}