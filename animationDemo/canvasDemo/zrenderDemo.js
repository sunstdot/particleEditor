/**
 * Created by sunshitao on 2016/4/13.
 */
define(function (require,exports,module) {
    var color = require('../../lib/zrender/tool/color');
    var CircleShape = require("../../lib/zrender/shape/Circle");  //圆
    var RectangleShape = require('../../lib/zrender/shape/Rectangle');  //矩形
    var zrtest = document.getElementById("canvasDemo2");
    var zr = zrender.init(zrtest);
    var xBall = 20;
    var ballStep = 1;
    var timer;
    var _step1 = function () {
        zr.addShape(new RectangleShape({
            style: {
                x: 0,
                y: 0,
                width: 300,
                height: 100,
                color: "red",
                lineWidth: 2,
                text: 'rectangle'
            },
            onmouseover: function (params) {
                clearTimeout(timer);
                xBall = 20;
            },
            onmouseout:function(params){
                _drawDemo();
            }
        }));

    };

    var _step2 = function () {
        zr.addShape(new CircleShape({
            style: {
                x: xBall,
                y: 50,
                r: 20,
                brushType: 'both',
                color: 'blue',          // rgba supported
                lineWidth: 2,
                text: 'circle',
                textPosition: 'inside'
            },
            hoverable: true,   // default true
            draggable: true,   // default false
            clickable: true,   // default false

            // 可自带任何有效自定义属性
            _name: 'Hello~',
            onclick: function (params) {
                alert(params.target._name);
            },

            // 响应事件并动态修改图形元素
            onmousewheel: function (params) {
                var eventTool = require('../../lib/zrender/tool/event');
                var delta = eventTool.getDelta(params.event);
                var r = params.target.style.r;
                r += (delta > 0 ? 1 : -1) * 10;
                if (r < 10) {
                    r = 10;
                }
                ;
                zr.modShape(params.target.id, {style: {r: r}})
                zr.refresh();
                eventTool.stop(params.event);
            }
            /* 封装支持事件，见shape/base, config.EVENT
             onmousemove : function(e){console.log('onmousemove',e)},
             onmouseover : function(e){console.log('onmouseover',e)},
             onmouseout  : function(e){console.log('onmouseout',e)},
             onmousedown : function(e){console.log('onmousedown',e)},
             onmouseup   : function(e){console.log('onmouseup',e)},
             ondragstart : function(e){console.log('ondragstart',e)},
             ondragend   : function(e){console.log('ondragend',e)},
             ondragenter : function(e){console.log('ondragenter',e)},
             ondragover  : function(e){console.log('ondragover',e)},
             ondragleave : function(e){console.log('ondragleave',e)},
             ondrop      : function(e){console.log('ondrop',e)}
             */
        }));
    };

    //内部方法
    var _drawDemo = function(){
        zr.clear();
        _step1();
        _step2();
        if(xBall>=280){
            ballStep = -2;
        }
        if(xBall <= 20){
            ballStep = 2;
        }
        xBall += ballStep;

        timer = setTimeout(function(){
            _drawDemo();
        },10);
    };

    _drawDemo();

//    var initDemo = function(opt){
//
//    };
//
//    initDemo.prototype.start = function(){
//        _drawDemo();
//    };
//
//    //对外api暴露接口
//    initDemo.prototype.set = function(key,value){
//
//    };
//
//    return initDemo;

});