//雷达图
var dom_radar01= document.getElementById("radar01");
var myChart_radar01 = echarts.init(dom_radar01);
var leida=$('input[type="hidden"]').val();
var strs= new Array(); //定义一数组
strs=leida.split(","); //字符分割
option_radar01 = null;
option_radar01 = {
    tooltip: {},
    animation:false,
    radar: {
        // shape: 'circle',
        name: {
            textStyle: {
                color: '#fff',
                backgroundColor: '#000',
                borderRadius: 3,
                padding: [3, 5]
            }
        },
        indicator: [
            { name: '眼睑松弛',axisLabel:{show:false},min:-4,max: 4,},
            { name: '鱼尾纹',axisLabel:{show:false},min:-4,max: 4},
            { name: '雀斑', axisLabel:{show:false},min:-4,max: 4},
            { name: '痤疮',axisLabel:{show:false},min:-4,max: 4},
            { name: '晒斑',axisLabel:{show:false},min:-4,max: 4},
            { name: '皱纹',axisLabel:{show:false},min:-4,max: 4},
            { name: '糖基化',axisLabel:{show:false},min:-4,max: 4},
            { name: '美白',axisLabel:{show:false},min:-4,max: 4},
            { name: '抗氧化',axisLabel:{show:false},min:-4,max: 4},
            { name: '锁水',axisLabel:{show:false},min:-4,max: 4},
        ],
        axisLabel:{
            show:true,
            color:'#f00',
            showMinLabel: true,
            //interval:0,
        },
    },
    series: [{
        name: '检测检测结果总览',
        type: 'radar',
        itemStyle: {normal: {areaStyle: {color:"#d53b71"}}},
        data : [
            {
                value : strs,
                name : '受检个体',
            },
        ]
    }]
};;
if (option_radar01 && typeof option_radar01 === "object") {
    myChart_radar01.setOption(option_radar01, true);
}

//雷达图02
var dom_radar02= document.getElementById("radar02");
var myChart_radar02 = echarts.init(dom_radar02);
option_radar02 = null;
option_radar02 = {
    tooltip: {},
    animation:false,
    radar: {
        // shape: 'circle',
        name: {
            textStyle: {
                color: '#fff',
                backgroundColor: '#000',
                borderRadius: 3,
                padding: [3, 5]
            }
        },
        indicator: [
            { name: '眼睑松弛',axisLabel:{show:false},min:-4,max: 4,},
            { name: '鱼尾纹',axisLabel:{show:false},min:-4,max: 4},
            { name: '雀斑', axisLabel:{show:false},min:-4,max: 4},
            { name: '痤疮',axisLabel:{show:false},min:-4,max: 4},
            { name: '晒斑',axisLabel:{show:false},min:-4,max: 4},
            { name: '皱纹',axisLabel:{show:false},min:-4,max: 4},
            { name: '糖基化',axisLabel:{show:false},min:-4,max: 4},
            { name: '美白',axisLabel:{show:false},min:-4,max: 4},
            { name: '抗氧化',axisLabel:{show:false},min:-4,max: 4},
            { name: '锁水',axisLabel:{show:false},min:-4,max: 4},
        ],
        axisLabel:{
            show:true,
            color:'#f00',
            showMinLabel: true,
            //interval:0,
        },
    },
    series: [{
        name: '检测检测结果总览',
        type: 'radar',
        itemStyle: {normal: {areaStyle: {color:"#d53b71"}}},
        data : [
            {
                value : strs,
                name : '受检个体',
            },
        ]
    }]
};;
if (option_radar02 && typeof option_radar02 === "object") {
    myChart_radar02.setOption(option_radar02, true);
}

//雷达图03
var dom_radar03 = document.getElementById("radar03");
var myChart_radar03 = echarts.init(dom_radar03);
option_radar03 = null;
option_radar03 = {
    tooltip: {},
    animation:false,
    radar: {
        // shape: 'circle',
        name: {
            textStyle: {
                color: '#fff',
                backgroundColor: '#000',
                borderRadius: 3,
                padding: [3, 5]
            }
        },
        indicator: [
            { name: '眼睑松弛',axisLabel:{show:false},min:-4,max: 4,},
            { name: '鱼尾纹',axisLabel:{show:false},min:-4,max: 4},
            { name: '雀斑', axisLabel:{show:false},min:-4,max: 4},
            { name: '痤疮',axisLabel:{show:false},min:-4,max: 4},
            { name: '晒斑',axisLabel:{show:false},min:-4,max: 4},
            { name: '皱纹',axisLabel:{show:false},min:-4,max: 4},
            { name: '糖基化',axisLabel:{show:false},min:-4,max: 4},
            { name: '美白',axisLabel:{show:false},min:-4,max: 4},
            { name: '抗氧化',axisLabel:{show:false},min:-4,max: 4},
            { name: '锁水',axisLabel:{show:false},min:-4,max: 4},
        ],
        axisLabel:{
            show:true,
            color:'#f00',
            showMinLabel: true,
            //interval:0,
        },
    },
    series: [{
        name: '检测检测结果总览',
        type: 'radar',
        itemStyle: {normal: {areaStyle: {color:"#d53b71"}}},
        data : [
            {
                value : strs,
                name : '受检个体',
            },
        ]
    }]
};;
if (option_radar03 && typeof option_radar03 === "object") {
    myChart_radar03.setOption(option_radar03, true);
}

//雷达图04
var dom_radar04 = document.getElementById("radar04");
var myChart_radar04 = echarts.init(dom_radar04);
option_radar04 = null;
option_radar04 = {
    tooltip: {},
    animation:false,
    radar: {
        // shape: 'circle',
        name: {
            textStyle: {
                color: '#fff',
                backgroundColor: '#000',
                borderRadius: 3,
                padding: [3, 5]
            }
        },
        indicator: [
            { name: '眼睑松弛',axisLabel:{show:false},min:-4,max: 4,},
            { name: '鱼尾纹',axisLabel:{show:false},min:-4,max: 4},
            { name: '雀斑', axisLabel:{show:false},min:-4,max: 4},
            { name: '痤疮',axisLabel:{show:false},min:-4,max: 4},
            { name: '晒斑',axisLabel:{show:false},min:-4,max: 4},
            { name: '皱纹',axisLabel:{show:false},min:-4,max: 4},
            { name: '糖基化',axisLabel:{show:false},min:-4,max: 4},
            { name: '美白',axisLabel:{show:false},min:-4,max: 4},
            { name: '抗氧化',axisLabel:{show:false},min:-4,max: 4},
            { name: '锁水',axisLabel:{show:false},min:-4,max: 4},
        ],
        axisLabel:{
            show:true,
            color:'#f00',
            showMinLabel: true,
            //interval:0,
        },
    },
    series: [{
        name: '检测检测结果总览',
        type: 'radar',
        itemStyle: {normal: {areaStyle: {color:"#d53b71"}}},
        data : [
            {
                value : strs,
                name : '受检个体',
            },
        ]
    }]
};;
if (option_radar04 && typeof option_radar04 === "object") {
    myChart_radar04.setOption(option_radar04, true);
}

//雷达图05
var dom_radar05 = document.getElementById("radar05");
var myChart_radar05 = echarts.init(dom_radar05);
option_radar05 = null;
option_radar05 = {
    tooltip: {},
    animation:false,
    radar: {
        // shape: 'circle',
        name: {
            textStyle: {
                color: '#fff',
                backgroundColor: '#000',
                borderRadius: 3,
                padding: [3, 5]
            }
        },
        indicator: [
            { name: '眼睑松弛',axisLabel:{show:false},min:-4,max: 4,},
            { name: '鱼尾纹',axisLabel:{show:false},min:-4,max: 4},
            { name: '雀斑', axisLabel:{show:false},min:-4,max: 4},
            { name: '痤疮',axisLabel:{show:false},min:-4,max: 4},
            { name: '晒斑',axisLabel:{show:false},min:-4,max: 4},
            { name: '皱纹',axisLabel:{show:false},min:-4,max: 4},
            { name: '糖基化',axisLabel:{show:false},min:-4,max: 4},
            { name: '美白',axisLabel:{show:false},min:-4,max: 4},
            { name: '抗氧化',axisLabel:{show:false},min:-4,max: 4},
            { name: '锁水',axisLabel:{show:false},min:-4,max: 4},
        ],
        axisLabel:{
            show:true,
            color:'#f00',
            showMinLabel: true,
            //interval:0,
        },
    },
    series: [{
        name: '检测检测结果总览',
        type: 'radar',
        itemStyle: {normal: {areaStyle: {color:"#d53b71"}}},
        data : [
            {
                value : strs,
                name : '受检个体',
            },
        ]
    }]
};;
if (option_radar05 && typeof option_radar05 === "object") {
    myChart_radar05.setOption(option_radar05, true);
}

//雷达图06
var dom_radar06 = document.getElementById("radar06");
var myChart_radar06 = echarts.init(dom_radar06);
option_radar06 = null;
option_radar06 = {
    tooltip: {},
    animation:false,
    radar: {
        // shape: 'circle',
        name: {
            textStyle: {
                color: '#fff',
                backgroundColor: '#000',
                borderRadius: 3,
                padding: [3, 5]
            }
        },
        indicator: [
            { name: '眼睑松弛',axisLabel:{show:false},min:-4,max: 4,},
            { name: '鱼尾纹',axisLabel:{show:false},min:-4,max: 4},
            { name: '雀斑', axisLabel:{show:false},min:-4,max: 4},
            { name: '痤疮',axisLabel:{show:false},min:-4,max: 4},
            { name: '晒斑',axisLabel:{show:false},min:-4,max: 4},
            { name: '皱纹',axisLabel:{show:false},min:-4,max: 4},
            { name: '糖基化',axisLabel:{show:false},min:-4,max: 4},
            { name: '美白',axisLabel:{show:false},min:-4,max: 4},
            { name: '抗氧化',axisLabel:{show:false},min:-4,max: 4},
            { name: '锁水',axisLabel:{show:false},min:-4,max: 4},
        ],
        axisLabel:{
            show:true,
            color:'#f00',
            showMinLabel: true,
            //interval:0,
        },
    },
    series: [{
        name: '检测检测结果总览',
        type: 'radar',
        itemStyle: {normal: {areaStyle: {color:"#d53b71"}}},
        data : [
            {
                value : strs,
                name : '受检个体',
            },
        ]
    }]
};;
if (option_radar06 && typeof option_radar06 === "object") {
    myChart_radar06.setOption(option_radar06, true);
}