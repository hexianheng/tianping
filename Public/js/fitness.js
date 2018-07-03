//总览的
var dom1 = document.getElementById("container1");
var myChart1 = echarts.init(dom1);
option1 = null;
option1 = {
    title: {
        //text: '学者交流会数据统计',
        //subtext: '总人数',
        //left: 'center'
    },
    animation:false,
    series: [{
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 10,
        radius: "150%",
        center: ["50%", "80%"],
        axisLine: {
            show: true,
            lineStyle: {
                width: 1000,
                shadowBlur: 0,
                color: [//控制分为几个部分
                    //[0, '#B5495B'],
                    [0.25, '#86c127'],
                    [0.50, '#f6d61d'],
                    [0.75, '#4d5aa8'],
                    [1, '#d83552']
                ]
            }
        },
        axisTick: {
            show: false
        },
        axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
            show: true,
            formatter: function(v){
                switch (v+''){
                    case '1': return '正常';
                    case '4': return '较高';
                    case '6': return '很高';
                    case '9': return '极高';
                    default: return '';
                }
            },
            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: '#fff',
            }
        },
        splitLine: {
            show: false
        },
        pointer: {
            width: "5%",
            length: '80%',
            color: "black"
        },
        itemStyle: {
            normal: {
                color: "rgba(0, 0, 0, 0.8)",
                shadowBlur: 20
            }
        },

        title: {
            show: false,  //仪表板中间的文字    data的name值是否显示  true显示   false不显示
        },
        detail: {
            show: false,  //底部文字  data的value值是否显示  true显示   false不显示
        },
        data: [{
            value:2.3, name:'减重仪表盘'
        }]
    }]
}
if (option1 && typeof option1 === "object") {
    myChart1.setOption(option1, true);
}

//饱腹感
var dom2 = document.getElementById("container2");
var myChart2 = echarts.init(dom2);
option2 = null;
option2 = {
    title: {
        //text: '学者交流会数据统计',
        //subtext: '总人数',
        //left: 'center'
    },
    animation:false,
    series: [{
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 10,
        radius: "150%",
        center: ["50%", "80%"],
        axisLine: {
            show: true,
            lineStyle: {
                width: 1000,
                shadowBlur: 0,
                color: [//控制分为几个部分
                    //[0, '#B5495B'],
                    [0.5, '#86c127'],
                    //[0.50, '#f6d61d'],
                    //[0.75, '#4d5aa8'],
                    [1, '#d83552']
                ]
            }
        },
        axisTick: {
            show: false
        },
        axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
            show: true,
            formatter: function(v){
                switch (v+''){
                    case '2': return '饱腹感正常';
                    case '8': return '饱腹感差';
                    //case '6': return '很高';
                    //case '9': return '极高';
                    default: return '';
                }
            },
            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: '#fff',
            }
        },
        splitLine: {
            show: false
        },
        pointer: {
            width: "5%",
            length: '80%',
            color: "black"
        },
        itemStyle: {
            normal: {
                color: "rgba(0, 0, 0, 0.8)",
                shadowBlur: 20
            }
        },

        title: {
            show: false,  //仪表板中间的文字    data的name值是否显示  true显示   false不显示
        },
        detail: {
            show: false,  //底部文字  data的value值是否显示  true显示   false不显示
        },
        data: [{
            value:2.3, name:'减重仪表盘'
        }]
    }]
}
if (option2 && typeof option2 === "object") {
    myChart2.setOption(option2, true);
}

//食欲控制能力
var dom3 = document.getElementById("container3");
var myChart3 = echarts.init(dom3);
option3 = null;
option3 = {
    title: {
        //text: '学者交流会数据统计',
        //subtext: '总人数',
        //left: 'center'
    },
    animation:false,
    series: [{
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 10,
        radius: "150%",
        center: ["50%", "80%"],
        axisLine: {
            show: true,
            lineStyle: {
                width: 1000,
                shadowBlur: 0,
                color: [//控制分为几个部分
                    //[0, '#B5495B'],
                    [0.3333, '#86c127'],
                    [0.6666, '#f6d61d'],
                    //[0.75, '#4d5aa8'],
                    [1, '#d83552']
                ]
            }
        },
        axisTick: {
            show: false
        },
        axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
            show: true,
            formatter: function(v){
                switch (v+''){
                    case '1': return '正常';
                    case '5': return '较差';
                    case '9': return '很差';
                    //case '9': return '极高';
                    default: return '';
                }
            },
            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: '#fff',
            }
        },
        splitLine: {
            show: false
        },
        pointer: {
            width: "5%",
            length: '80%',
            color: "black"
        },
        itemStyle: {
            normal: {
                color: "rgba(0, 0, 0, 0.8)",
                shadowBlur: 20
            }
        },

        title: {
            show: false,  //仪表板中间的文字    data的name值是否显示  true显示   false不显示
        },
        detail: {
            show: false,  //底部文字  data的value值是否显示  true显示   false不显示
        },
        data: [{
            value:2.3, name:'减重仪表盘'
        }]
    }]
}
if (option3 && typeof option3 === "object") {
    myChart3.setOption(option3, true);
}
//作息情况
var dom4 = document.getElementById("container4");
var myChart4 = echarts.init(dom4);
option4 = null;
option4 = {
    title: {
        //text: '学者交流会数据统计',
        //subtext: '总人数',
        //left: 'center'
    },
    animation:false,
    series: [{
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 10,
        radius: "150%",
        center: ["50%", "80%"],
        axisLine: {
            show: true,
            lineStyle: {
                width: 1000,
                shadowBlur: 0,
                color: [//控制分为几个部分
                    //[0, '#B5495B'],
                    [0.3333, '#86c127'],
                    [0.6666, '#f6d61d'],
                    //[0.75, '#4d5aa8'],
                    [1, '#d83552']
                ]
            }
        },
        axisTick: {
            show: false
        },
        axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
            show: true,
            formatter: function(v){
                switch (v+''){
                    case '1': return '作息时间差';
                    case '5': return '作息时间一般';
                    case '9': return '作息时间好';
                    //case '9': return '极高';
                    default: return '';
                }
            },
            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: '#fff',
            }
        },
        splitLine: {
            show: false
        },
        pointer: {
            width: "5%",
            length: '80%',
            color: "black"
        },
        itemStyle: {
            normal: {
                color: "rgba(0, 0, 0, 0.8)",
                shadowBlur: 20
            }
        },

        title: {
            show: false,  //仪表板中间的文字    data的name值是否显示  true显示   false不显示
        },
        detail: {
            show: false,  //底部文字  data的value值是否显示  true显示   false不显示
        },
        data: [{
            value:2.3, name:'减重仪表盘'
        }]
    }]
}
if (option4 && typeof option4 === "object") {
    myChart4.setOption(option4, true);
}

//先天代谢率
var dom5 = document.getElementById("container5");
var myChart5 = echarts.init(dom5);
option5 = null;
option5 = {
    title: {
        //text: '学者交流会数据统计',
        //subtext: '总人数',
        //left: 'center'
    },
    animation:false,
    series: [{
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 10,
        radius: "150%",
        center: ["50%", "80%"],
        axisLine: {
            show: true,
            lineStyle: {
                width: 1000,
                shadowBlur: 0,
                color: [//控制分为几个部分
                    //[0, '#B5495B'],
                    [0.5, '#86c127'],
                    //[0.50, '#f6d61d'],
                    //[0.75, '#4d5aa8'],
                    [1, '#d83552']
                ]
            }
        },
        axisTick: {
            show: false
        },
        axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
            show: true,
            formatter: function(v){
                switch (v+''){
                    case '2': return '先天代谢率正常';
                    case '8': return '先天代谢率较差';
                    //case '6': return '很高';
                    //case '9': return '极高';
                    default: return '';
                }
            },
            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: '#fff',
            }
        },
        splitLine: {
            show: false
        },
        pointer: {
            width: "5%",
            length: '80%',
            color: "black"
        },
        itemStyle: {
            normal: {
                color: "rgba(0, 0, 0, 0.8)",
                shadowBlur: 20
            }
        },

        title: {
            show: false,  //仪表板中间的文字    data的name值是否显示  true显示   false不显示
        },
        detail: {
            show: false,  //底部文字  data的value值是否显示  true显示   false不显示
        },
        data: [{
            value:2.3, name:'减重仪表盘'
        }]
    }]
}
if (option5 && typeof option5 === "object") {
    myChart5.setOption(option5, true);
}

//脂肪酸敏感性
var dom6 = document.getElementById("container6");
var myChart6 = echarts.init(dom6);
option6 = null;
option6 = {
    title: {
        //text: '学者交流会数据统计',
        //subtext: '总人数',
        //left: 'center'
    },
    animation:false,
    series: [{
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 10,
        radius: "150%",
        center: ["50%", "80%"],
        axisLine: {
            show: true,
            lineStyle: {
                width: 1000,
                shadowBlur: 0,
                color: [//控制分为几个部分
                    //[0, '#B5495B'],
                    [0.25, '#86c127'],
                    [0.50, '#f6d61d'],
                    [0.75, '#4d5aa8'],
                    [1, '#d83552']
                ]
            }
        },
        axisTick: {
            show: false
        },
        axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
            show: true,
            formatter: function(v){
                switch (v+''){
                    case '1': return '较低';
                    case '4': return '正常';
                    case '6': return '较高';
                    case '9': return '很高';
                    default: return '';
                }
            },
            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: '#fff',
            }
        },
        splitLine: {
            show: false
        },
        pointer: {
            width: "5%",
            length: '80%',
            color: "black"
        },
        itemStyle: {
            normal: {
                color: "rgba(0, 0, 0, 0.8)",
                shadowBlur: 20
            }
        },

        title: {
            show: false,  //仪表板中间的文字    data的name值是否显示  true显示   false不显示
        },
        detail: {
            show: false,  //底部文字  data的value值是否显示  true显示   false不显示
        },
        data: [{
            value:2.3, name:'减重仪表盘'
        }]
    }]
}
if (option6 && typeof option6 === "object") {
    myChart6.setOption(option6, true);
}
//碳水化合物敏感性
var dom7 = document.getElementById("container7");
var myChart7 = echarts.init(dom7);
option7 = null;
option7 = {
    title: {
        //text: '学者交流会数据统计',
        //subtext: '总人数',
        //left: 'center'
    },
    animation:false,
    series: [{
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 10,
        radius: "150%",
        center: ["50%", "80%"],
        axisLine: {
            show: true,
            lineStyle: {
                width: 1000,
                shadowBlur: 0,
                color: [//控制分为几个部分
                    //[0, '#B5495B'],
                    [0.25, '#86c127'],
                    [0.50, '#f6d61d'],
                    [0.75, '#4d5aa8'],
                    [1, '#d83552']
                ]
            }
        },
        axisTick: {
            show: false
        },
        axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
            show: true,
            formatter: function(v){
                switch (v+''){
                    case '1': return '较低';
                    case '4': return '正常';
                    case '6': return '较高';
                    case '9': return '很高';
                    default: return '';
                }
            },
            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: '#fff',
            }
        },
        splitLine: {
            show: false
        },
        pointer: {
            width: "5%",
            length: '80%',
            color: "black"
        },
        itemStyle: {
            normal: {
                color: "rgba(0, 0, 0, 0.8)",
                shadowBlur: 20
            }
        },

        title: {
            show: false,  //仪表板中间的文字    data的name值是否显示  true显示   false不显示
        },
        detail: {
            show: false,  //底部文字  data的value值是否显示  true显示   false不显示
        },
        data: [{
            value:2.3, name:'减重仪表盘'
        }]
    }]
}
if (option7 && typeof option7 === "object") {
    myChart7.setOption(option7, true);
}

//盐的敏感性
var dom8 = document.getElementById("container8");
var myChart8 = echarts.init(dom8);
option8 = null;
option8 = {
    title: {
        //text: '学者交流会数据统计',
        //subtext: '总人数',
        //left: 'center'
    },
    animation:false,
    series: [{
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 10,
        radius: "150%",
        center: ["50%", "80%"],
        axisLine: {
            show: true,
            lineStyle: {
                width: 1000,
                shadowBlur: 0,
                color: [//控制分为几个部分
                    //[0, '#B5495B'],
                    [0.3333, '#86c127'],
                    [0.6666, '#f6d61d'],
                    //[0.75, '#4d5aa8'],
                    [1, '#d83552']
                ]
            }
        },
        axisTick: {
            show: false
        },
        axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
            show: true,
            formatter: function(v){
                switch (v+''){
                    case '1': return '敏感性正常';
                    case '5': return '敏感性较高';
                    case '9': return '敏感性很高';
                    //case '9': return '极高';
                    default: return '';
                }
            },
            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: '#fff',
            }
        },
        splitLine: {
            show: false
        },
        pointer: {
            width: "5%",
            length: '80%',
            color: "black"
        },
        itemStyle: {
            normal: {
                color: "rgba(0, 0, 0, 0.8)",
                shadowBlur: 20
            }
        },

        title: {
            show: false,  //仪表板中间的文字    data的name值是否显示  true显示   false不显示
        },
        detail: {
            show: false,  //底部文字  data的value值是否显示  true显示   false不显示
        },
        data: [{
            value:2.3, name:'减重仪表盘'
        }]
    }]
}
if (option8 && typeof option8 === "object") {
    myChart8.setOption(option8, true);
}

//酒精的敏感性
var dom9 = document.getElementById("container9");
var myChart9 = echarts.init(dom9);
option9 = null;
option9 = {
    title: {
        //text: '学者交流会数据统计',
        //subtext: '总人数',
        //left: 'center'
    },
    animation:false,
    series: [{
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 10,
        radius: "150%",
        center: ["50%", "80%"],
        axisLine: {
            show: true,
            lineStyle: {
                width: 1000,
                shadowBlur: 0,
                color: [//控制分为几个部分
                    //[0, '#B5495B'],
                    [0.3333, '#86c127'],
                    [0.6666, '#f6d61d'],
                    //[0.75, '#4d5aa8'],
                    [1, '#d83552']
                ]
            }
        },
        axisTick: {
            show: false
        },
        axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
            show: true,
            formatter: function(v){
                switch (v+''){
                    case '1': return '敏感性正常';
                    case '5': return '敏感性较高';
                    case '9': return '敏感性很高';
                    //case '9': return '极高';
                    default: return '';
                }
            },
            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: '#fff',
            }
        },
        splitLine: {
            show: false
        },
        pointer: {
            width: "5%",
            length: '80%',
            color: "black"
        },
        itemStyle: {
            normal: {
                color: "rgba(0, 0, 0, 0.8)",
                shadowBlur: 20
            }
        },

        title: {
            show: false,  //仪表板中间的文字    data的name值是否显示  true显示   false不显示
        },
        detail: {
            show: false,  //底部文字  data的value值是否显示  true显示   false不显示
        },
        data: [{
            value:2.3, name:'减重仪表盘'
        }]
    }]
}
if (option9 && typeof option9 === "object") {
    myChart9.setOption(option9, true);
}
//咖啡因敏感性
var dom10 = document.getElementById("container10");
var myChart10 = echarts.init(dom10);
option10 = null;
option10 = {
    title: {
        //text: '学者交流会数据统计',
        //subtext: '总人数',
        //left: 'center'
    },
    animation:false,
    series: [{
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 10,
        radius: "150%",
        center: ["50%", "80%"],
        axisLine: {
            show: true,
            lineStyle: {
                width: 1000,
                shadowBlur: 0,
                color: [//控制分为几个部分
                    //[0, '#B5495B'],
                    [0.3333, '#86c127'],
                    [0.6666, '#f6d61d'],
                    //[0.75, '#4d5aa8'],
                    [1, '#d83552']
                ]
            }
        },
        axisTick: {
            show: false
        },
        axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
            show: true,
            formatter: function(v){
                switch (v+''){
                    case '1': return '快代谢';
                    case '5': return '中间代谢';
                    case '9': return '慢代谢';
                    //case '9': return '极高';
                    default: return '';
                }
            },
            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: '#fff',
            }
        },
        splitLine: {
            show: false
        },
        pointer: {
            width: "5%",
            length: '80%',
            color: "black"
        },
        itemStyle: {
            normal: {
                color: "rgba(0, 0, 0, 0.8)",
                shadowBlur: 20
            }
        },

        title: {
            show: false,  //仪表板中间的文字    data的name值是否显示  true显示   false不显示
        },
        detail: {
            show: false,  //底部文字  data的value值是否显示  true显示   false不显示
        },
        data: [{
            value:2.3, name:'减重仪表盘'
        }]
    }]
}
if (option10 && typeof option10 === "object") {
    myChart10.setOption(option10, true);
}
//肌肉类型
var dom11 = document.getElementById("container11");
var myChart11 = echarts.init(dom11);
option11 = null;
option11 = {
    title: {
        //text: '学者交流会数据统计',
        //subtext: '总人数',
        //left: 'center'
    },
    animation:false,
    series: [{
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 10,
        radius: "150%",
        center: ["50%", "80%"],
        axisLine: {
            show: true,
            lineStyle: {
                width: 1000,
                shadowBlur: 0,
                color: [//控制分为几个部分
                    //[0, '#B5495B'],
                    [0.3333, '#86c127'],
                    [0.6666, '#f6d61d'],
                    //[0.75, '#4d5aa8'],
                    [1, '#d83552']
                ]
            }
        },
        axisTick: {
            show: false
        },
        axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
            show: true,
            formatter: function(v){
                switch (v+''){
                    case '1': return '慢肌纤维型';
                    case '5': return '混合肌纤维型';
                    case '9': return '快肌纤维型';
                    //case '9': return '极高';
                    default: return '';
                }
            },
            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: '#fff',
            }
        },
        splitLine: {
            show: false
        },
        pointer: {
            width: "5%",
            length: '80%',
            color: "black"
        },
        itemStyle: {
            normal: {
                color: "rgba(0, 0, 0, 0.8)",
                shadowBlur: 20
            }
        },

        title: {
            show: false,  //仪表板中间的文字    data的name值是否显示  true显示   false不显示
        },
        detail: {
            show: false,  //底部文字  data的value值是否显示  true显示   false不显示
        },
        data: [{
            value:2.3, name:'减重仪表盘'
        }]
    }]
}
if (option11 && typeof option11 === "object") {
    myChart11.setOption(option11, true);
}
//耐力vs爆发力运动
var dom12 = document.getElementById("container12");
var myChart12 = echarts.init(dom12);
option12 = null;
option12 = {
    title: {
        //text: '学者交流会数据统计',
        //subtext: '总人数',
        //left: 'center'
    },
    animation:false,
    series: [{
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 10,
        radius: "150%",
        center: ["50%", "80%"],
        axisLine: {
            show: true,
            lineStyle: {
                width: 1000,
                shadowBlur: 0,
                color: [//控制分为几个部分
                    //[0, '#B5495B'],
                    [0.3333, '#86c127'],
                    [0.6666, '#f6d61d'],
                    //[0.75, '#4d5aa8'],
                    [1, '#d83552']
                ]
            }
        },
        axisTick: {
            show: false
        },
        axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
            show: true,
            formatter: function(v){
                switch (v+''){
                    case '1': return '耐力运动';
                    case '5': return '耐力/爆发力均衡型';
                    case '9': return '爆发力运动';
                    //case '9': return '极高';
                    default: return '';
                }
            },
            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: '#fff',
            }
        },
        splitLine: {
            show: false
        },
        pointer: {
            width: "5%",
            length: '80%',
            color: "black"
        },
        itemStyle: {
            normal: {
                color: "rgba(0, 0, 0, 0.8)",
                shadowBlur: 20
            }
        },

        title: {
            show: false,  //仪表板中间的文字    data的name值是否显示  true显示   false不显示
        },
        detail: {
            show: false,  //底部文字  data的value值是否显示  true显示   false不显示
        },
        data: [{
            value:2.3, name:'减重仪表盘'
        }]
    }]
}
if (option12 && typeof option12 === "object") {
    myChart12.setOption(option12, true);
}
//最大摄氧量提升能力
var dom13 = document.getElementById("container13");
var myChart13 = echarts.init(dom13);
option13 = null;
option13 = {
    title: {
        //text: '学者交流会数据统计',
        //subtext: '总人数',
        //left: 'center'
    },
    animation:false,
    series: [{
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 10,
        radius: "150%",
        center: ["50%", "80%"],
        axisLine: {
            show: true,
            lineStyle: {
                width: 1000,
                shadowBlur: 0,
                color: [//控制分为几个部分
                    [0.2, '#86c127'],
                    [0.4, '#75af7d'],
                    [0.6, '#f7d51c'],
                    [0.8, '#e67c27'],
                    [1, '#d83552']
                ]
            }
        },
        axisTick: {
            show: false
        },
        axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
            show: true,
            formatter: function(v){
                switch (v+''){
                    case '1': return '弱';
                    case '3': return '较弱';
                    case '5': return '中等';
                    case '7': return '较强';
                    case '9': return '强';
                    default: return '';
                }
            },
            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: '#fff',
            }
        },
        splitLine: {
            show: false
        },
        pointer: {
            width: "5%",
            length: '80%',
            color: "black"
        },
        itemStyle: {
            normal: {
                color: "rgba(0, 0, 0, 0.8)",
                shadowBlur: 20
            }
        },

        title: {
            show: false,  //仪表板中间的文字    data的name值是否显示  true显示   false不显示
        },
        detail: {
            show: false,  //底部文字  data的value值是否显示  true显示   false不显示
        },
        data: [{
            value:2.3, name:'减重仪表盘'
        }]
    }]
}
if (option13 && typeof option13 === "object") {
    myChart13.setOption(option13, true);
}

//运动后损伤风险
var dom14 = document.getElementById("container14");
var myChart14 = echarts.init(dom14);
option14 = null;
option14 = {
    title: {
        //text: '学者交流会数据统计',
        //subtext: '总人数',
        //left: 'center'
    },
    animation:false,
    series: [{
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 10,
        radius: "150%",
        center: ["50%", "80%"],
        axisLine: {
            show: true,
            lineStyle: {
                width: 1000,
                shadowBlur: 0,
                color: [//控制分为几个部分
                    [0.2, '#86c127'],
                    [0.4, '#75af7d'],
                    [0.6, '#f7d51c'],
                    [0.8, '#e67c27'],
                    [1, '#d83552']
                ]
            }
        },
        axisTick: {
            show: false
        },
        axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
            show: true,
            formatter: function(v){
                switch (v+''){
                    case '1': return '低';
                    case '3': return '较低';
                    case '5': return '中等';
                    case '7': return '较高';
                    case '9': return '高';
                    default: return '';
                }
            },
            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: '#fff',
            }
        },
        splitLine: {
            show: false
        },
        pointer: {
            width: "5%",
            length: '80%',
            color: "black"
        },
        itemStyle: {
            normal: {
                color: "rgba(0, 0, 0, 0.8)",
                shadowBlur: 20
            }
        },

        title: {
            show: false,  //仪表板中间的文字    data的name值是否显示  true显示   false不显示
        },
        detail: {
            show: false,  //底部文字  data的value值是否显示  true显示   false不显示
        },
        data: [{
            value:7.5, name:'减重仪表盘'
        }]
    }]
}
if (option14 && typeof option14 === "object") {
    myChart14.setOption(option14, true);
}

//运动后恢复能力
var dom15 = document.getElementById("container15");
var myChart15 = echarts.init(dom15);
option15 = null;
option15 = {
    title: {
        //text: '学者交流会数据统计',
        //subtext: '总人数',
        //left: 'center'
    },
    animation:false,
    series: [{
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 10,
        radius: "150%",
        center: ["50%", "80%"],
        axisLine: {
            show: true,
            lineStyle: {
                width: 1000,
                shadowBlur: 0,
                color: [//控制分为几个部分
                    [0.2, '#86c127'],
                    [0.4, '#75af7d'],
                    [0.6, '#f7d51c'],
                    [0.8, '#e67c27'],
                    [1, '#d83552']
                ]
            }
        },
        axisTick: {
            show: false
        },
        axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
            show: true,
            formatter: function(v){
                switch (v+''){
                    case '1': return '弱';
                    case '3': return '较弱';
                    case '5': return '中等';
                    case '7': return '较强';
                    case '9': return '强';
                    default: return '';
                }
            },
            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: '#fff',
            }
        },
        splitLine: {
            show: false
        },
        pointer: {
            width: "5%",
            length: '80%',
            color: "black"
        },
        itemStyle: {
            normal: {
                color: "rgba(0, 0, 0, 0.8)",
                shadowBlur: 20
            }
        },

        title: {
            show: false,  //仪表板中间的文字    data的name值是否显示  true显示   false不显示
        },
        detail: {
            show: false,  //底部文字  data的value值是否显示  true显示   false不显示
        },
        data: [{
            value:2.3, name:'减重仪表盘'
        }]
    }]
}
if (option15 && typeof option15 === "object") {
    myChart15.setOption(option15, true);
}

//饮食知道方案的饼图
var dom16 = document.getElementById("pie");
var myChart16 = echarts.init(dom16);
option16 = null;
option16 = {
    // title : {
    //     text: '某站点用户访问来源',
    //     subtext: '纯属虚构',
    //     x:'center'
    // },
    animation:false,
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        //left: 'left',
        right:10,
        top:'60',
        data: ['脂肪','蛋白质','碳水化合物'/*,'视频广告','搜索引擎'*/]
    },
    color:['#47b566', '#66a4d7','#b31e24'],//b31e24 66a4d7 蓝色  47b566  绿色
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '40%'],
            data:[
                {value:83.3, name:'脂肪',selected:true},
                {value:277.2, name:'碳水化合物'},
                {value:181.1, name:'蛋白质',selected:true},
                //{value:135, name:'视频广告'},
                //{value:1548, name:'搜索引擎'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                normal: {
                    label:{
                        //show: true,
//	                            position:'inside',
                        formatter: '{b} : {c} ({d}%)'
                    }
                },
            }
        }
    ]
};
;
if (option16 && typeof option16 === "object") {
    myChart16.setOption(option16, true);
}