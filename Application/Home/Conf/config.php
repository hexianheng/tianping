<?php
return array(
    //数据库配置信息
    'DB_TYPE'   => 'mysqli', // 数据库类型
    'DB_HOST'   => '123.207.151.98', // 服务器地址123.207.151.98
    'DB_NAME'   => 'main', // 数据库名
    'DB_USER'   => 'root', // 用户名
    'DB_PWD'    => 'Rootroot', // 密码
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

    'URL' => 'http://localhost:8080/gitjob/index.php',
);