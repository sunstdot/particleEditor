/**
 * 用于页面参数控制
 * Created by sunshitao on 2016/1/20.
 */
define(function(require,exports,module){
    //import co from '../lib/index.js';

    var component = {};
    var velocityWrap = document.getElementById("velocityRecorder");
    var gravityCanvas = document.getElementById("gravityControl");

    var zrender = require('../lib/zrender');
    /**
     * 重力控制部分
     */
    function gravityControl(){
        var gravity = zrender.init(gravityCanvas);

        gravity.addShape();
    }

    /**
     * canvas实现速度记录仪
     * @param value
     */
    function velocityRecorder(value){
        var myEcharts = echarts.init(velocityWrap);
        var timeTicket;
        var option = {
            tooltip : {
                formatter: "{a} <br/>{b} : {c}%"
            },
//        toolbox: {
//            show : false,
//            feature : {
//                mark : {show: true},
//                restore : {show: true},
//                saveAsImage : {show: true}
//            }
//        },
            series : [
                {
                    name:'速度记录',
                    type:'gauge',
                    splitNumber: 10,       // 分割段数，默认为5
                    axisLine: {            // 坐标轴线
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: [[0.2, '#228b22'],[0.8, '#48b'],[1, '#ff4500']],
                            width: 8
                        }
                    },
                    axisTick: {            // 坐标轴小标记
                        splitNumber: 10,   // 每份split细分多少段
                        length :12,        // 属性length控制线长
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: 'auto'
                        }
                    },
                    axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            color: 'auto'
                        }
                    },
                    splitLine: {           // 分隔线
                        show: true,        // 默认显示，属性show控制显示与否
                        length :30,         // 属性length控制线长
                        lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                            color: 'auto'
                        }
                    },
                    pointer : {
                        width : 5
                    },
                    title : {
                        show : true,
                        offsetCenter: [0, '-40%'],       // x, y，单位px
                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            fontWeight: 'bolder'
                        }
                    },
                    detail : {
                        formatter:'{value}迈',
                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            color: 'auto',
                            fontWeight: 'bolder'
                        }
                    },
                    data:[{value: 50, name: '速度值'}]
                }
            ]
        };

        timeTicket = setInterval(function (){
            option.series[0].data[0].value = (Math.random()*100).toFixed(2) - 0;
            myEcharts.setOption(option,true);
        },2000);
    }

    //模块执行函数
    component.exec = function(){
//        gravityControl();
        velocityRecorder();
    };


    module.exports = component;
});


