//雷达图
var dom_radar= document.getElementById("radar");
var myChart_radar = echarts.init(dom_radar);
var leida=$("#hidden").val();
var strs= new Array(); //定义一数组
strs=leida.split(","); //字符分割
var color11=$("#11").val();
var color11s= new Array(); //定义一数组
color11s=color11.split(","); //字符分割
option_radar = null;
option_radar = {
    // title: {
    //     text: '雷达图'
    // },
    tooltip: {},
    animation:false,
    legend: {
        show:false,
        data: ['人均水平', '受检个体'],
        //orient:'vertical',
        //right:15,
        top:0,
    },
    radar: {
        // shape: 'circle',
        name: {
            textStyle: {
                color: '#fff',
                backgroundColor: '#999',
                borderRadius: 3,
                padding: [3, 5]
            }
        },

        indicator: [
            { name: '眼睑松弛',min:-4, max: 4},
            { name: '鱼尾纹',axisLabel:{show:false},min:-4, max: 4},
            { name: '雀斑',axisLabel:{show:false},min:-4, max: 4},
            { name: '痤疮',axisLabel:{show:false},min:-4, max: 4},
            { name: '晒斑',axisLabel:{show:false},min:-4, max: 4},
            { name: '皱纹',axisLabel:{show:false},min:-4, max: 4},
            { name: '糖基化',axisLabel:{show:false},min:-4, max: 4},
            { name: '美白',axisLabel:{show:false},min:-4, max: 4},
            { name: '抗氧化', axisLabel:{show:false},min:-4,max: 4},
            { name: '锁水',axisLabel:{show:false},min:-4, max: 4},
        ],
        axisLabel:{
            show:true,
            color:'#333',
            showMinLabel: true,
            //interval:0,
        },
    },
    series: [{
        name: '检测检测结果总览',
        type: 'radar',
        symbol:'',//拐点样式
        symbolSize: 8,//拐点大小
        data : [
            {
                value : [1,-1,1,1,3,-1,1,2,1,-1],
                name : '人均水平',
                // label: {
                //     normal: {
                //         show: true,
                //         formatter:function(params) {
                //             return params.value;
                //         }
                //     }
                // }
                itemStyle:{
                    normal:{color:'#6294c5'}
                }
            },
            {
                value : strs,
                name : '受检个体',
                itemStyle:{
                    normal:{color:'#ce6561'}
                },
            },
            //{name:'0以上优势作用'},{name:'0以下劣势作用'}
        ]
    }]
};;
if (option_radar && typeof option_radar === "object") {
    myChart_radar.setOption(option_radar, true);
}

//眼睑柱状图
var dom = document.getElementById("column01");
var myChart = echarts.init(dom);
option = null;
option = {
    //color: ['#3398DB'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        // left: '10%',
        // right: '10%',
        // bottom: '3%',
        //containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ['-3', '-2', '-1', '1', '2', '3','4','5','6','7','8','9'],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value',
            show:false
        }
    ],
    series : [
        {
            //name:'直接访问',
            type:'bar',
            barWidth: '70%',
            data:[-3, -2, -1, 1, 2, 3,4,5,6,7,8,9],//数据库数值
            itemStyle: {
                //通常情况下：
                normal:{
                    //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                    color: function (params){
                        // 6896d3 是蓝色，5fb864 绿色，  cfcfcf 灰色， ca5048 红色
                        var colorList = color11s;
                        return colorList[params.dataIndex];
                    },
                    barBorderRadius:0,
                }
            },
            label: {
                normal: {
                    show: true,
                    position: 'inside'
                }
            },
        }
    ]
};

if (option && typeof option === "object") {
    myChart.setOption(option, true);
}

//鱼尾纹
var dom2 = document.getElementById("column02");
var myChart2 = echarts.init(dom2);
option2 = null;
option2 = {
    //color: ['#3398DB'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        // left: '10%',
        // right: '30%',
        // bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ['-3', '-2', '-1', '1', '2', '3','4','5','6','7','8','9'],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value',
            show:false
        }
    ],
    series : [
        {
            //name:'直接访问',
            type:'bar',
            barWidth: '60%',
            data:[-3, -2, -1, 1, 2, 3,4,5,6,7,8,9],//数据库数值
            itemStyle: {
                //通常情况下：
                normal:{
                    //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                    color: function (params){
                        // 6896d3 是蓝色，5fb864 绿色，  cfcfcf 灰色， ca5048 红色
                        var colorList = ['#cfcfcf','#5fb864','#6896d3','#5fb864','#cfcfcf','#cfcfcf','#cfcfcf','#cfcfcf','#cfcfcf','#cfcfcf','#cfcfcf','#cfcfcf'];
                        return colorList[params.dataIndex];
                    },
                    barBorderRadius:20,
                }
            },
            label: {
                normal: {
                    show: true,
                    position: 'inside'
                }
            },
        }
    ]
};

if (option2 && typeof option2 === "object") {
    myChart2.setOption(option2, true);
}

//雀斑
var dom3 = document.getElementById("column03");
var myChart3 = echarts.init(dom3);
option3 = null;
option3 = {
    //color: ['#3398DB'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        // left: '10%',
        // right: '30%',
        // bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ['-3', '-2', '-1', '1', '2', '3','4','5','6','7','8','9'],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value',
            show:false
        }
    ],
    series : [
        {
            //name:'直接访问',
            type:'bar',
            barWidth: '60%',
            data:[-3, -2, -1, 1, 2, 3,4,5,6,7,8,9],//数据库数值
            itemStyle: {
                //通常情况下：
                normal:{
                    //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                    color: function (params){
                        // 6896d3 是蓝色，5fb864 绿色，  cfcfcf灰色， ca5048红色
                        var colorList = ['#5fb864','#5fb864','#5fb864','#6896d3','#cfcfcf','#cfcfcf','#cfcfcf','#cfcfcf','#cfcfcf','#cfcfcf','#cfcfcf','#cfcfcf'];
                        return colorList[params.dataIndex];
                    },
                    barBorderRadius:20,
                }
            },
            label: {
                normal: {
                    show: true,
                    position: 'inside'
                }
            },
        }
    ]
};

if (option3 && typeof option3 === "object") {
    myChart3.setOption(option3, true);
}

//痤疮
var dom4 = document.getElementById("column04");
var myChart4 = echarts.init(dom4);
option4 = null;
option4 = {
    //color: ['#3398DB'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        // left: '10%',
        // right: '30%',
        // bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ['-3', '-2', '-1', '1', '2', '3','4','5','6','7','8','9'],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value',
            show:false
        }
    ],
    series : [
        {
            //name:'直接访问',
            type:'bar',
            barWidth: '60%',
            data:[-3, -2, -1, 1, 2, 3,4,5,6,7,8,9],//数据库数值
            itemStyle: {
                //通常情况下：
                normal:{
                    //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                    color: function (params){
                        // 6896d3是蓝色，5fb864 绿色，  cfcfcf灰色， ca5048 红色
                        var colorList = ['#5fb864','#5fb864','#5fb864','#6896d3','#ca5048','#cfcfcf','#cfcfcf','#cfcfcf','#cfcfcf','#cfcfcf','#cfcfcf','#cfcfcf'];
                        return colorList[params.dataIndex];
                    },
                    barBorderRadius:20,
                }
            },
            label: {
                normal: {
                    show: true,
                    position: 'inside'
                }
            },
        }
    ]
};

if (option4 && typeof option4 === "object") {
    myChart4.setOption(option4, true);
}

//日晒斑
var dom5 = document.getElementById("column05");
var myChart5 = echarts.init(dom5);
option5 = null;
option5 = {
    //color: ['#3398DB'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        // left: '10%',
        // right: '30%',
        // bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ['-3', '-2', '-1', '1', '2', '3','4','5','6','7','8','9'],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value',
            show:false
        }
    ],
    series : [
        {
            //name:'直接访问',
            type:'bar',
            barWidth: '60%',
            data:[-3, -2, -1, 1, 2, 3,4,5,6,7,8,9],//数据库数值
            itemStyle: {
                //通常情况下：
                normal:{
                    //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                    color: function (params){
                        // 6896d3 是蓝色，5fb864 绿色，  cfcfcf灰色， ca5048红色
                        var colorList = ['#cfcfcf','#cfcfcf','#5fb864','#5fb864','#5fb864','#6896d3','#cfcfcf','#cfcfcf','#cfcfcf','#cfcfcf','#cfcfcf','#cfcfcf'];
                        return colorList[params.dataIndex];
                    },
                    barBorderRadius:20,
                }
            },
            label: {
                normal: {
                    show: true,
                    position: 'inside'
                }
            },
        }
    ]
};

if (option5 && typeof option5 === "object") {
    myChart5.setOption(option5, true);
}

//皱纹和胶原蛋白降解
var dom6 = document.getElementById("column06");
var myChart6 = echarts.init(dom6);
option6 = null;
option6 = {
    //color: ['#3398DB'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        // left: '10%',
        // right: '30%',
        // bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ['-3', '-2', '-1', '1', '2', '3','4','5','6','7','8','9'],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value',
            show:false
        }
    ],
    series : [
        {
            //name:'直接访问',
            type:'bar',
            barWidth: '60%',
            data:[-3, -2, -1, 1, 2, 3,4,5,6,7,8,9],//数据库数值
            itemStyle: {
                //通常情况下：
                normal:{
                    //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                    color: function (params){
                        // 6896d3 是蓝色，5fb864 绿色，  cfcfcf 灰色， ca5048 红色
                        var colorList = ['#cfcfcf','#5fb864','#6896d3','#5fb864','#ca5048','#cfcfcf','#cfcfcf','#cfcfcf','#cfcfcf','#cfcfcf','#cfcfcf','#cfcfcf'];
                        return colorList[params.dataIndex];
                    },
                    barBorderRadius:20,
                }
            },
            label: {
                normal: {
                    show: true,
                    position: 'inside'
                }
            },
        }
    ]
};

if (option6 && typeof option6 === "object") {
    myChart6.setOption(option6, true);
}


//糖基化
var dom7 = document.getElementById("column07");
var myChart7 = echarts.init(dom7);
option7 = null;
option7 = {
    //color: ['#3398DB'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        // left: '10%',
        // right: '30%',
        // bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ['-3', '-2', '-1', '1', '2', '3','4','5','6','7','8','9'],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value',
            show:false
        }
    ],
    series : [
        {
            //name:'直接访问',
            type:'bar',
            barWidth: '60%',
            data:[-3, -2, -1, 1, 2, 3,4,5,6,7,8,9],//数据库数值
            itemStyle: {
                //通常情况下：
                normal:{
                    //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                    color: function (params){
                        // 6896d3 是蓝色，5fb864 绿色，  cfcfcf灰色， ca5048 红色
                        var colorList = ['#5fb864','#5fb864','#ca5048','#6896d3','#5fb864','#5fb864','#cfcfcf','#cfcfcf','#cfcfcf','#cfcfcf','#cfcfcf','#cfcfcf'];
                        return colorList[params.dataIndex];
                    },
                    barBorderRadius:20,
                }
            },
            label: {
                normal: {
                    show: true,
                    position: 'inside'
                }
            },
        }
    ]
};

if (option7 && typeof option7 === "object") {
    myChart7.setOption(option7, true);
}

//抗黑色素
var dom8 = document.getElementById("column08");
var myChart8 = echarts.init(dom8);
option8 = null;
option8 = {
    //color: ['#3398DB'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        // left: '10%',
        // right: '30%',
        // bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ['-3', '-2', '-1', '1', '2', '3','4','5','6','7','8','9'],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value',
            show:false
        }
    ],
    series : [
        {
            //name:'直接访问',
            type:'bar',
            barWidth: '60%',
            data:[-3, -2, -1, 1, 2, 3,4,5,6,7,8,9],//数据库数值
            itemStyle: {
                //通常情况下：
                normal:{
                    //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                    color: function (params){
                        // 6896d3 是蓝色，5fb864 绿色，  cfcfcf灰色， ca5048 红色
                        var colorList = ['#cfcfcf','#cfcfcf','#5fb864','#5fb864','#6896d3','#5fb864','#ca5048','#5fb864','#5fb864','#5fb864','#5fb864','#5fb864'];
                        return colorList[params.dataIndex];
                    },
                    barBorderRadius:20,
                }
            },
            label: {
                normal: {
                    show: true,
                    position: 'inside'
                }
            },
        }
    ]
};

if (option8 && typeof option8 === "object") {
    myChart8.setOption(option8, true);
}

//皱纹和胶原蛋白降解
var dom9 = document.getElementById("column09");
var myChart9 = echarts.init(dom9);
option9 = null;
option9 = {
    //color: ['#3398DB'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        // left: '10%',
        // right: '30%',
        // bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ['-3', '-2', '-1', '1', '2', '3','4','5','6','7','8','9'],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value',
            show:false
        }
    ],
    series : [
        {
            //name:'直接访问',
            type:'bar',
            barWidth: '60%',
            data:[-3, -2, -1, 1, 2, 3,4,5,6,7,8,9],//数据库数值
            itemStyle: {
                //通常情况下：
                normal:{
                    //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                    color: function (params){
                        // 6896d3 是蓝色，5fb864 绿色，  cfcfcf灰色， ca5048 红色
                        var colorList = ['#5fb864','#5fb864','#ca5048','#6896d3','#5fb864','#5fb864','#cfcfcf','#cfcfcf','#cfcfcf','#cfcfcf','#cfcfcf','#cfcfcf'];
                        return colorList[params.dataIndex];
                    },
                    barBorderRadius:20,
                }
            },
            label: {
                normal: {
                    show: true,
                    position: 'inside'
                }
            },
        }
    ]
};

if (option9 && typeof option9 === "object") {
    myChart9.setOption(option9, true);
}


//皱纹和胶原蛋白降解
var dom10 = document.getElementById("column10");
var myChart10 = echarts.init(dom10);
option10 = null;
option10 = {
    //color: ['#3398DB'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        // left: '10%',
        // right: '30%',
        // bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ['-3', '-2', '-1', '1', '2', '3','4','5','6','7','8','9'],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value',
            show:false
        }
    ],
    series : [
        {
            //name:'直接访问',
            type:'bar',
            barWidth: '60%',
            data:[-3, -2, -1, 1, 2, 3,4,5,6,7,8,9],//数据库数值
            itemStyle: {
                //通常情况下：
                normal:{
                    //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                    color: function (params){
                        // 6896d3 是蓝色，5fb864 绿色，  cfcfcf灰色， ca5048 红色
                        var colorList = ['#5fb864','#5fb864','#6896d3','#ca5048','#cfcfcf','#cfcfcf','#cfcfcf','#cfcfcf','#cfcfcf','#cfcfcf','#cfcfcf','#cfcfcf'];
                        return colorList[params.dataIndex];
                    },
                    barBorderRadius:20,
                }
            },
            label: {
                normal: {
                    show: true,
                    position: 'inside'
                }
            },
        }
    ]
};

if (option10 && typeof option10 === "object") {
    myChart10.setOption(option10, true);
}
