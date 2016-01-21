/**
 * 用于页面参数控制
 * Created by sunshitao on 2016/1/20.
 */
define(function(require,exports,module){
    //import co from '../lib/index.js';

    var component = {};
    var velocityWrap = document.getElementById("velocityRecorder");
    var gravityCanvas = document.getElementById("gravityControl");


    var gravityValue = document.getElementById("gravityValue");

    //圆形
    var CircleShape = require('../lib/zrender/shape/Circle');
    //扇形
    var SectorShape = require('../lib/zrender/shape/Sector');
    //线
    var LineShape = require('../lib/zrender/shape/Line');
    var color = require('../lib/zrender/tool/color');
    var colorIdx = 0;
    /**
     * 重力控制部分,set _default position to sector and line in order
     *  to get a default gravity value
     */
    function gravityControl(){
        var gravityZr = zrender.init(gravityCanvas);

        var startPos = {x:150,y:100};
        var endPos = {};
        var eventTool = require('../lib/zrender/tool/event');
        //定义shape
        var circle,sector,line;

        function calculateAngle(startPos,endPos){
            if((endPos.y-startPos.y)<0.2){
                angle = endPos.x>startPos ?0:180;
            }else if((endPos.x-startPos.x)<0.2){
                angle = endPos.y>startPos.y ? -90:90;
            }else{
                var tan = (endPos.y-startPos.y)/(endPos.x-startPos.x);
                var radina = Math.atan(tan); //弧度
                var angle = 180*radina/Math.PI;
            }
            return Math.ceil(angle);
        }
        circle = new CircleShape({
            style : {
                x : 150,
                y : 100,
                r : 100,
                brushType : 'both',
                color : 'rgba(220, 20, 60, 0.5)',          // rgba supported
                strokeColor : color.getColor(colorIdx++),  // getColor from default palette
                textPosition :'inside'
            },
            hoverable : false,   // default true
            draggable : false,   // default false
            clickable : false,   // default false

            // 可自带任何有效自定义属性
            _name : 'Hello~',
            onclick: function(params){
                alert(params.target._name);
            },
            ondragover:function(e){
                endPos.x = eventTool.getX(e.event);
                endPos.y = eventTool.getY(e.event);
//              var angle = calculateAngle(startPos,endPos);
                //算出重力值
                gravityValue.innerHTML = Math.ceil(Math.sqrt(Math.pow(endPos.x-startPos.x,2)+Math.pow(endPos.y-startPos.y,2)));
                //todo 通过事件抛给 kinematics来修改主屏幕中的粒子特效
                gravityZr.modShape("lineScale",{style:{xEnd:endPos.x, yEnd:endPos.y}});
                gravityZr.refresh();
            }
        });
        //画线，
        //end position需要根据扇形圆心的位置实时计算
        line = new LineShape({
            id:'lineScale',
            style : {
                xStart : 150,
                yStart : 100,
                xEnd : 100,
                yEnd : 50,
                color : 'rgba(255 255 240, 0.8)',
                lineWidth : 4,
                lineType : 'solid'  // default solid
            },
            draggable:false
        });
        gravityZr.addShape(line);

        // 圆形
        gravityZr.addShape(circle);
        //drawLine
        sector = new CircleShape({
            id:'sectorCursor',
            style : {
                x : 100,
                y : 50,
                r : 10,
                brushType : 'both',
                color : 'rgba(25 25 112, 0.8)',          // rgba supported
                textPosition :'inside'
            },
            draggable : true,
            hoverable:false,
            clickable:false,
            ondragstart:function(e){
                console.log('-----------------start');
            },
            ondragend:function(e){
                console.log('-----------------end');
            }
        });
        gravityZr.addShape(sector);

        gravityZr.render();
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
        gravityControl();
        velocityRecorder();
    };


    module.exports = component;
});


