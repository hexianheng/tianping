<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>新增用户</title>
    <link rel="stylesheet" type="text/css" href="/gitjob/Public/css/erweima-style.css" />
</head>

<body>
<div class="chuda_co" id="container">
    <div class="co-box">
        <div class="title"><h4>权限管理>>新增用户</h4></div>
        <div class="fill-info">
            <div class="right">
                <a class="btn02" href="<?php echo ($url); ?>/Index/gly_list">用户列表</a >
                <div class="info-box01">
                    <ul>
                        <li>
                            <label>用户名：</label>
                            <input type="text" name="uname" id="userName" class="w200 uname" value="">
                        </li>
                        <li>
                            <label>性别：</label>
                            <input type="radio" name="radio" id="sex" checked class="sex" value="1">男
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <input type="radio" name="radio" id="sex" class="sex" value="2">女
                        </li>
                        <li>
                            <label>初始密码：</label>
                            <span id="Pwd"><input type="text" name="start-pwd" id="password" class="w100 start-pwd" disabled value=""></span>
                            <a class="scmm" style="display: inline-block; height:28px; width:90px;line-height:28px; border-radius:5px;background:#2fa4e7;color:#ffffff;text-align:center;" id="scmm">生成密码</a >
                        </li>
                        <li>
                            <label>所属渠道：</label>
                            <select name="channel" id="channelId" class="w200 channel"></select>
                        </li>
                    </ul>
                </div>
                <div class="info-box02">
                    <ul>

                        <li>
                            <label>角色：</label>
                            <select name="role" id="roleId" class="w200 role"></select>
                        </li>
                        <li>
                            <label>邮箱地址：</label>
                            <input type="text" name="mobile" id="email" class="w200 mobile" value="">
                        </li>
                        <li>
                            <label>职务：</label>
                            <input type="text" name="duties" id="job" class="w200 duties" value="">
                        </li>
                        <li>
                            <label>手机号：</label>
                            <input type="text" name="phone" id="phone" class="w200 phone" value="">
                        </li>
                    </ul>
                </div>
                <div class="preview">
                    <a class="preview-btn btn01" id="btn">提交</a >
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
<script type="text/javascript" src="/gitjob/Public/js/jquery.js"></script>
<script type="text/javascript" src="/gitjob/Public/js/common.js"></script>
<script type="text/javascript" src="/gitjob/Public/js_logic/xzgly.js"></script>