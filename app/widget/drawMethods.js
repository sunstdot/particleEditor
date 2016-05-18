/**
 * Created by sunshitao on 2016/5/13.
 */
let drawMethod = {}
import snapshoot from "./snapshoot.js"
let zrender = require('zrender');
let event = require('../event');
//圆形
let CircleShape = require('zrender/lib/graphic/shape/Circle');
var RectangleShape = require('zrender/lib/graphic/shape/Rect');
let eventTool = require('zrender/lib/core/event');
let selectTarget;
let canvasZr;
const r = 40;

function init(myCanvas){
    canvasZr = zrender.init(myCanvas);
}

function circle(pos,callback){
    let circle = new CircleShape({
        scale: [1, 1],
        shape: {
            cx: pos.x,
            cy: pos.y,
            r: r
        },
        style: {
            fill:'red'
        },
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
    });
    circle.type = 'circle';
    canvasZr.add(circle);
    if(callback){
        callback(circle);
    }
}
function square(pos,callback){
    let square = new RectangleShape({
        shape:{
            x:pos.x-r,
            y:pos.y-r,
            width:r*2,
            height:r*2
        },
        style:{
            fill: 'red'
        },
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
    });
    square.type = "square";
    canvasZr.add(square);
    if(callback){
        callback(square);
    }
}
export default drawMethod = {
    init:init,
    circle:circle,
    square:square
}