<?php

/* *
 * 生成pdf报告
 * */


header("Content-type: text/html; charset=utf-8");
//mysql配置
$mysqlConfig = array('127.0.0.1','root','Rootroot',3306);//生产环境
//定义wkhtmltopdf配置
$pdfConf = array(
    'wkhtmltopdf' => "/usr/local/src/wkhtmltox/bin/wkhtmltopdf --print-media-type --page-width 300mm --page-height 300mm --margin-top 0mm --margin-bottom 0mm --margin-right 0mm --margin-left 0mm --disable-smart-shrinking ",
    'path' => " /data/www/tianping/Public/pdf/",
    'webPath' => "http://123.207.151.98/index.php/Index/report_mf/code/"
);

//sql方法
function sql($config,$baseName,$sql){
    //1.建立连接
    $connect=mysqli_connect($config[0],$config[1],$config[2],$baseName,$config[3]);
    //2.定义sql语句
    mysqli_query($connect,'set names utf8');
    //3.发送SQL语句
    $result=mysqli_query($connect,$sql);
    $arr=array();//定义空数组
    while($row =mysqli_fetch_array($result)){
        //var_dump($row);
        //array_push(要存入的数组，要存的值)
        array_push($arr,$row);
    }
    echo date('Y-m-d H:i:s');
    var_dump($arr);
    //4.关闭连接
    mysqli_close($connect);
    return $arr;
}

//执行
run($mysqlConfig,$pdfConf);

function run($config,$pdfConf){

    //查询是否有待处理记录
    $sql = "select * from pdf_task as a left join analytic_result as b on a.code = b.code where a.status = 0 and b.code != 'NULL'";
    $re = sql($config,'main',$sql);
    if(!empty($re)){
        //生成pdf
        $date = date("Y-m-d H:i:s");
        foreach ($re as $val){
            $token = "/userId/root/token/". md5('roottianping@admin.com');
            $shell = $pdfConf['wkhtmltopdf'] . $pdfConf['webPath'] . $val['code'] . $token . $pdfConf['path'] .$val['code'] .'.pdf';
            system($shell, $result);
            if($result !== 0){
                echo $date. ' ' .$val['code'].".pdf生成失败\n";
            }else{
                echo $date. ' ' .$val['code'].".pdf生成成功\n";
                $sql = "update analytic_result set pdfPath = '/Public/pdf/". $val['code'] .".pdf' where code = '$val[code]'";
                sql($config,'main',$sql);
                $sql = "update pdf_task set status = 1 where code = '$val[code]'";
                sql($config,'main',$sql);
            }
        }
    }
}

?>
