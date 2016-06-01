/**
 * Created by sunshitao on 2016/5/13.
 */
let drawMethod = {}
import snapshoot from "./snapshoot.js"
let zrender = require('zrender');
let event = require('../event');
//圆形
let CircleShape = require('zrender/lib/graphic/shape/Circle');
let RectangleShape = require('zrender/lib/graphic/shape/Rect');
let ZText = require('zrender/lib/graphic/Text');
let eventTool = require('zrender/lib/core/event');
let selectTarget;
let canvasZr;
let context;
let globalTxt;
const r = 40;

function init(myCanvas){
    context = myCanvas.getContext('2d');
    canvasZr = zrender.init(myCanvas);
    return canvasZr;
}
function extend(target,source){
    for(var key in source){
        if(!target.hasOwnProperty(key)){
            target[key] = source[key];
        }
    }
    return target;
}

let opt = {
    draggable:true,
    onmousedown:function(e){

    },
    ondragstart:function(e){
        //记录初始位置
    },
    onclick:function(e){
        if(selectTarget != e.target){
            if(selectTarget){
                selectTarget.attr({style:{fill:'red',lineWidth:0}});//还原选中状态
                selectTarget.dirty();
            }
            selectTarget = e.target;
            //加border
            selectTarget.attr({style:{lineWidth:4,stroke:'#000'}});
            selectTarget.dirty();
            canvasZr.refreshImmediately();
            event.notify("selectTarget",{target:selectTarget});
        }
    },
    ondragend:function(e){
        //记录结束位置
    },
    onmouseup:function(){
    }
}


function circle(pos,callback){
    let circle = new CircleShape(extend({
        scale: [1, 1],
        shape: {
            cx: pos.x,
            cy: pos.y,
            r: r
        },
        style: {
            fill:'red'
        },
        // 响应事件并动态修改图形元素
        onmousewheel: function(e){
            var delta = eventTool.getDelta(e.event);
            var r = e.target.style.r;
            r += (delta > 0 ? 1 : -1) * 10;
            if (r < 10) {
                r = 10;
            };
            e.target.attr({style:{r:r}});
            e.target.dirty();
            eventTool.stop(e.event);
        }
    },opt));
    circle.type = 'circle';
    canvasZr.add(circle);
    if(callback){
        callback(circle);
    }
}
function square(pos,callback){
    let square = new RectangleShape(extend({
        shape:{
            x:pos.x-r,
            y:pos.y-r,
            width:r*2,
            height:r*2
        },
        style:{
            fill: 'red'
        },
        onmousewheel:function(e){
            var delta = eventTool.getDelta(e.event);
            var r = e.target.style.r;
            r += (delta > 0 ? 1 : -1) * 10;
            if (r < 10) {
                r = 10;
            };
            e.target.attr({style:{r:r}});
            e.target.dirty();
            canvasZr.refreshImmediately();
            eventTool.stop(e.event);
        }
    },opt));
    square.type = "square";
    canvasZr.add(square);
    if(callback){
        callback(square);
    }
}
function text(option,text,callback){
    context.font = '18px Microsoft Yahei';
    let width=context.measureText(text).width;
    let text1 = (text + '').split('\n');
    let height = (context.measureText('国').width + 2)*text1.length;
    if(globalTxt){
         canvasZr.remove(globalTxt);
    }
    globalTxt = new ZText(extend({
        style:{
            x:option.x,
            y:option.y,
            text:text,
            width:width,
            height:height,
            fill:'#FFF',
            textFont: '18px Microsoft Yahei',
            textBaseline: 'top'
        },
        //复写click方法
        onclick:function(e){
            selectTarget = e.target;
            //加border
            selectTarget.attr({style:{fill:'#FF3030'}});
            selectTarget.dirty();
            canvasZr.refreshImmediately();
            event.notify("selectTarget",{target:selectTarget});
        }
    },opt));
    canvasZr.add(globalTxt);
    if(callback){
        callback(globalTxt);
    }
}


export default drawMethod = {
    init:init,
    circle:circle,
    square:square,
    text:text
}