<?php
return array(
    //数据库配置信息
    'DB_TYPE'   => 'mysql', // 数据库类型
    'DB_HOST'   => '127.0.0.1', // 服务器地址
    'DB_NAME'   => 'main', // 数据库名
    'DB_USER'   => 'root', // 用户名
    'DB_PWD'    => 'rootroot', // 密码
    'DB_PORT'   => 3306, // 端口
    'DB_PREFIX' => '', // 数据库表前缀
    'DB_CHARSET'=> 'utf8', // 字符集

    //加载配置文件
    'LOAD_EXT_CONFIG' => 'error_config',

    //redis配置
    'REDIS' => array(
        'host' => '127.0.0.1',
        'port' => 6379
    ),
);