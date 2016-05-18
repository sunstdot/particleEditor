/*global $*/
/**
 * 用于页面参数控制
 * Created by sunshitao on 2016/1/20.
 */
let component = {};
let $ = require('jquery');
let event = require('../event');
let velocityWrap = document.getElementById("velocityRecorder");
let gravityCanvas = document.getElementById("gravityControl");
let gravityValueDom = document.getElementById("gravityValue");
let zrender = require('zrender');
//圆形
let CircleShape = require('zrender/lib/graphic/shape/Circle');
//线
let LineShape = require('zrender/lib/graphic/shape/Line');
let color = require('zrender/lib/tool/color');
let colorIdx = 0;
/**
 * 重力控制部分,set _default position to sector and line in order
 *  to get a default gravity value
 */
function gravityControl() {
    let eventTool = require('zrender/lib/core/event');

    let gravityZr = zrender.init(gravityCanvas);
    let startPos = {x: 150, y: 100}, endPos = {}, angle;
    let downValue, rightValue;
    //定义shape
    let circle, sector, line;

    function calculateAngle(startPos, endPos) {
        if ((endPos.y - startPos.y) < 0.2) {
            angle = endPos.x > startPos ? 0 : 180;
        } else if ((endPos.x - startPos.x) < 0.2) {
            angle = endPos.y > startPos.y ? -90 : 90;
        } else {
            let tan = (endPos.y - startPos.y) / (endPos.x - startPos.x);
            let radina = Math.atan(tan); //弧度
            let angle = 180 * radina / Math.PI;
        }
        return Math.ceil(angle);
    }

    circle = new CircleShape({
        style: {
            x: 150,
            y: 100,
            r: 100
        },
        // 可自带任何有效自定义属性
        _name: 'Hello~',
        onclick: function (params) {
            alert(params.target._name);
        },
        ondragover: function (e) {
            endPos.x = eventTool.getX(e.event);
            endPos.y = eventTool.getY(e.event);
            angle = calculateAngle(startPos, endPos);

            //算出重力值，向下和向右的重力默认为正
            rightValue = endPos.x - startPos.x;
            downValue = endPos.y - startPos.y;

            //通过事件抛给 kinematics来修改主屏幕中的粒子特效

            event.notify("modifyGravity", {downGravity: downValue, rightGravity: rightValue}); //效率会很低

            gravityValueDom.innerHTML = "(向下重力" + downValue + " , 向右重力" + rightValue + ")";
            gravityZr.modShape("lineScale", {style: {xEnd: endPos.x, yEnd: endPos.y}});
            gravityZr.refresh();
        }
    });
    //画线，
    //end position需要根据扇形圆心的位置实时计算
    line = new LineShape({
        id: 'lineScale',
        style: {
            xStart: 150,
            yStart: 100,
            xEnd: 100,
            yEnd: 50,
            color: 'rgba(255 255 240, 0.8)',
        },
        draggable: false
    });
    //drawLine
    sector = new CircleShape({
        id: 'sectorCursor',
        style: {
            x: 100,
            y: 50,
            r: 10,
            color: 'rgba(25 25 112, 0.8)'          // rgba supported
        },
        draggable: true,
        hoverable: false,
        clickable: true,
        ondragstart: function (e) {
            console.log('-----------------start');
        },
        ondragend: function (e) {
            console.log('-----------------end');
        }
    });

    gravityZr.add(line);
    // 圆形
    gravityZr.add(circle);
    gravityZr.add(sector);

    //gravityZr.render();
    gravityZr.animation.start();
}

let obj = {
    /**
     * canvas实现速度记录仪
     * @param value
     */
    velocityRecorder: function () {
        let myEcharts = echarts.init(velocityWrap);
        let option = {
            tooltip: {
                formatter: "{a} <br/>{b} : {c}%"
            },
            series: [
                {
                    name: '速度记录',
                    type: 'gauge',
                    splitNumber: 10,       // 分割段数，默认为5
                    axisLine: {            // 坐标轴线
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: [[0.2, '#228b22'], [0.8, '#48b'], [1, '#ff4500']],
                            width: 8
                        }
                    },
                    axisTick: {            // 坐标轴小标记
                        splitNumber: 10,   // 每份split细分多少段
                        length: 12,        // 属性length控制线长
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
                        length: 30,         // 属性length控制线长
                        lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                            color: 'auto'
                        }
                    },
                    pointer: {
                        width: 5
                    },
                    title: {
                        show: true,
                        offsetCenter: [0, '-40%'],       // x, y，单位px
                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            fontWeight: 'bolder'
                        }
                    },
                    detail: {
                        formatter: '{value}迈',
                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            color: 'auto',
                            fontWeight: 'bolder'
                        }
                    },
                    data: [{value: 50, name: '速度值'}]
                }
            ]
        };
        return function (param) {
            option.series[0].data[0].value = param.value || (Math.random() * 100).toFixed(2) - 0;
            myEcharts.setOption(option, true);
        };
    },
    turnCard: function () {
        let tabDom = $("#myTab");
        let eleFront, eleBack,
            eleList = $(".tabClass");

        let tabBackOrFront = function () {
            eleList.each(function () {
                if ($(this).hasClass("in")) {
                    eleFront = $(this);
                }
            });
        };


        tabDom.click(function (e) {
            let target = e.target || e.srcElement;
            while (target.tagName !== "DIV") {
                target = target.parentNode;
            }
            target = $(target);
            let eleValue = target.attr("ele-value");
            eleFront.addClass("out").removeClass("in");

            eleBack = $("#" + eleValue);

            setTimeout(function () {
                eleFront.css("display", "none");
                eleBack.addClass("in").removeClass("out");
                eleBack.css("display", "block");
                tabBackOrFront();
            }, 225);
            return false;
        });

        tabBackOrFront();

    }
};

let bindEvent = function () {
    event.register("notifyVelocity", obj.velocityRecorder.bind(this));
    //实现翻牌效果
    obj.turnCard();
};

//模块执行函数
component.exec = function () {
    bindEvent();
    gravityControl();
    //obj.velocityRecorder()({value: 90});
};

export default component;



