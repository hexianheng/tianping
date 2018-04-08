<?php
/* *
 * 短信接口
 * author：PeiYun Wang
 * */
namespace Home\Model;
class SmsModel extends BaseModel {

    public $appId = '1400049502';
    public $appKey = '212de097d0a8b410ea2bfbf36b2c3027';
    public $smsSign = '酷基因';

    public function sendPhoneCheck($phone,$num){
        $templateId = 85960;
        require_once APP_PATH."Vendor/SmsSingleSender.php";
        $ssender = new \SmsSingleSender($this->appId,$this->appKey);
        $params = [$num];
        $result = $ssender->sendWithParam("86", $phone, $templateId,
            $params, $this->smsSign, "", "");  // 签名参数未提供或者为空时，会使用默认签名发送短信
        return json_decode($result,1);
    }

    public function sendMessage($phoneArr,$templateId,$nameArr){
        $i = 0;
        require_once APP_PATH."Vendor/SmsSingleSender.php";
        $ssender = new \SmsSingleSender($this->appId,$this->appKey);
        foreach ($phoneArr as $key => $val){
            $params = [$nameArr[$key]];
            $result = $ssender->sendWithParam("86", $val, $templateId,
                $params, $this->smsSign, "", "");  // 签名参数未提供或者为空时，会使用默认签名发送短信
            $re = json_decode($result,1);
            if($re['code'] == 0){
                $i++;
            }else{
                return $this->returnMsg();
            }
        }
        return $i;
    }

}

?>