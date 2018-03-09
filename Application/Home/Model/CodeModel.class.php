<?php
/* *
 * 编码Model
 * author：PeiYun Wang
 * */
namespace Home\Model;
class CodeModel extends BaseModel
{

    //添加编码
    public function addCode($data)
    {
        //验证生成数量
        if($data['num'] == '' || !is_numeric($data['num'])){
            return $this->returnMsg('A040');
        }else{
            $start = 0;
            $end = 10000;
            if($data['num'] <= $start || $data['num'] > $end){
                return $this->returnMsg('A040');
            }
        }
        //验证产品ID
        if($data['productId'] != ''){
            $sql = "select id from product where id = $data[productId]";
            $re = $this->sqlQuery('product',$sql);
            if(empty($re)){
                return $this->returnMsg('A035');
            }
        }

        //验证渠道ID
        if($data['channelId'] != ''){
            $sql = "select id from channel where id = '$data[channelId]'";
            $re = $this->sqlQuery('channel',$sql);
            if(empty($re)){
                return $this->returnMsg('A031');
            }
        }

        $data['group'] = date('Ymd');
        $sql = "select count(id) as count from code";
        $data['count'] = $this->sqlQuery('code',$sql)[0]['count'];

        $sql = $this->getAddSql($data);
        $this->sqlQuery('code',$sql);

        return $this->returnMsg(0);
    }

    public function getAddSql($data){
        $arr = [];
        $date = date('Y-m-d H:i:s');
        for($i = $data['count']; $i < ($data['count'] + $data['num']); $i++){
            $arr[] = "('". $data['productId'] . "','" . $data['channelId'] . "','" . strtoupper(substr(md5($data.md5($i).round(10000,99999)),6,10)) . "','" . $data['group'] . "','" . $date . "','" . $data['cid'] . "')";
        }

        return "insert into code (productId,channelId,code,`group`,ctime,cid) values". implode(',',$arr);
    }

    //分组下拉
    public function groupSel(){
        $sql = "select distinct `group` from code order by ctime desc";
        $re = $this->sqlQuery('code',$sql);
        return $this->returnMsg('0',$re);
    }

    //编码列表
    public function codeList($data){
        if($data['page'] == ''){
            $data['page'] = 1;
        }else{
            if(!is_numeric($data['page'])){
                return $this->returnMsg(-4);
            }
        }
        $where = [];
        if($data['group'] != ''){
            $where[] = " a.`group` = $data[group]";
        }
        if($data['codeStr'] != ''){
            $where[] = " a.code in ('". implode("','",explode('|',$data['codeStr'])) ."')";
        }
        $where = empty($where) ? '' : (' where ' . implode(' and ',$where));
        $countSql = "select count(id) as count from code as a " . $where;
        $count = $this->sqlQuery('code',$countSql)[0]['count'];
        if(empty($count)){
            return $this->returnMsg(-3);
        }
        $limit = $this->_makeLimit($data['page'],10);
        $sql = "SELECT a.id,a.code,a.`group`,a.ctime,a.status,a.channelId,b.`name` as channelName,a.productId,c.`name` as productName FROM code as a left join channel as b on a.channelId = b.id left join product as c on a.productId = c.id ". $where ." ORDER BY a.id DESC " . $limit;
        $re = $this->sqlQuery('user',$sql);
        return $this->returnMsg(0,$re,['page'=>$data['page'],'maxPage'=>ceil($count/10)]);
    }

    //编码出库
    public function outGoing($data){
        //验证产品ID
        if($data['productId'] == ''){
            return $this->returnMsg('A035');
        }else{
            $sql = "select id from product where id = $data[productId]";
            $re = $this->sqlQuery('product',$sql);
            if(empty($re)){
                return $this->returnMsg('A035');
            }
        }
        //验证渠道ID
        if($data['channelId'] == ''){
            return $this->returnMsg('A031');
        }else{
            $sql = "select id from channel where id = '$data[channelId]'";
            $re = $this->sqlQuery('channel',$sql);
            if(empty($re)){
                return $this->returnMsg('A031');
            }
        }
        //验证codeStr
        if($data['codeStr'] == ''){
            return $this->returnMsg('A041');
        }else{
            $where = " status = 1 and code in ('". implode("','",explode('|',$data['codeStr'])) ."')";
            $countSql = "select count(id) as count from code where " . $where;
            $re = $this->sqlQuery('code',$countSql);
            if(empty($re) || $re[0]['count'] != count(explode('|',$data['codeStr']))){
                return $this->returnMsg('A041');
            }
        }

        $updData = [
            'status' => 2,
            'channelId' => $data['channelId'],
            'productId' => $data['productId'],
            'mid' => $data['mid'],
            'mtime' => date('Y-m-d H:i:s')
        ];
        $this->sqlUpdate('code',$updData,$where);
        return $this->returnMsg(0);
    }

    public function groupList($page){
        if($page == ''){
            $page = 1;
        }else{
            if(!is_numeric($page)){
                return $this->returnMsg(-4);
            }
        }
        $limit = $this->_makeLimit($page,10);
        $countSql = "select id from code group by `group`";
        $count = $this->sqlQuery('code',$countSql);
        if(empty($count)){
            return $this->returnMsg(-3);
        }else{
            $count = count($count);
        }
        $sql = "select `group`,count(id) as countCode from code group by `group` order by id desc ". $limit;
        $re = $this->sqlQuery('code',$sql);
        return $this->returnMsg(0,$re,['page'=>$page,'maxPage'=>ceil($count/10)]);
    }

    public function groupOut($data){
        //验证产品ID
        if($data['productId'] == ''){
            return $this->returnMsg('A035');
        }else{
            $sql = "select id from product where id = $data[productId]";
            $re = $this->sqlQuery('product',$sql);
            if(empty($re)){
                return $this->returnMsg('A035');
            }
        }
        //验证渠道ID
        if($data['channelId'] == ''){
            return $this->returnMsg('A031');
        }else{
            $sql = "select id from channel where id = '$data[channelId]'";
            $re = $this->sqlQuery('channel',$sql);
            if(empty($re)){
                return $this->returnMsg('A031');
            }
        }
        //验证group
        if($data['group'] == ''){
            return $this->returnMsg('A042');
        }else{
            $where = " `group` = '$data[group]' and status = 1";
            $sql = "select id from code where " . $where;
            $re = $this->sqlQuery('code',$sql);
            if(empty($re)){
                return $this->returnMsg('A042');
            }
        }

        $updData = [
            'status' => 2,
            'channelId' => $data['channelId'],
            'productId' => $data['productId'],
            'mid' => $data['mid'],
            'mtime' => date('Y-m-d H:i:s')
        ];
        $this->sqlUpdate('code',$updData,$where);
        return $this->returnMsg(0);
    }

    public function codeGroup($group){
        //验证分组
        if($group == ''){
            return $this->returnMsg('A042');
        }else{
            $where = " a.`group` in ('". implode("','",explode('|',$group)) ."')";
            $sql = "select id from code as a where " . $where;
            $re = $this->sqlQuery('code',$sql);
            if(empty($re)){
                return $this->returnMsg('A042');
            }
        }
        $sql = "SELECT a.id,a.code,a.`group`,a.ctime,a.status,a.channelId,b.`name` as channelName,a.productId,c.`name` as productName,IFNULL(a.mtime,'') as mtime FROM code as a left join channel as b on a.channelId = b.id left join product as c on a.productId = c.id where ". $where ." ORDER BY a.id DESC ";
        $re = $this->sqlQuery('code',$sql);
        foreach ($re as $key => $val){
            $re[$key]['status'] = $val['status'] == 2 ? '已出库' : '未出库';
        }

        $header = [
            'id' => "Id",
            'code' => "编码",
            'group' => "分组",
            'channelName' => "渠道名称",
            'productName' => "产品名称",
            'status' => "状态",
            'ctime' => "创建时间",
            'mtime' => "出库时间"
        ];
        $fileName = '编码分组列表（'. $group .'）';
        $this->putExcel($re,$fileName,array_values($header),array_keys($header));
    }

}