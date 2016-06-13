/**
 * Created by sunshitao on 2016/5/21.
 */
import Particle from "../particle"
import vector2 from "../vector2"
import Color from "../Color"
import ParticleSystem from "./particleSystem"
import {fireTheHall,shakeBall} from "../plugin/fireTheHall"
import {zrenderAnimation,zrClear} from './drawMethods'
import {
    sampleDirection,
    sampleNum,
    sampleColor,
    pseudorandomDirection
} from "./particleParam"

import event from "../event"

//import burnWord from "../plugin/burning-words"
var particleDemo;

const COLORS = ['#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423'];

let ps = new ParticleSystem();
let dt = 0.002;
const count = 100;
let Methods = {};

function getCenter(){
    return {
        circle:function(shape){
            return[
                {
                    x:shape.cx,
                    y:shape.cy
                },
                shape.r
            ];
        },
        square:function(shape){
            return [
                {
                    x:shape.x + shape.width/2,
                    y:shape.y + shape.height/2
                },
                {
                    width:shape.width,
                    height:shape.height
                }
            ]
        },
        text:function(shape){
            return [
                {
                    x:shape.style.x+shape.position[0],
                    y:shape.style.y+shape.position[1]
                },
                {
                    width:shape.style.width,
                    height:shape.style.height
                }
            ]
        }

    }
}
Methods.mouseEffect = function(mouseDemo){
    mouseDemo.setup = function(){
        var i,x,y;
        for(i=0;i<20;i++){
            x = (mouseDemo.width*0.5) + random(-100,100);
            y = (mouseDemo.height*0.5) + random(-100,100);
            mouseDemo.spawn(new vector2(x,y));
        }
    }
    mouseDemo.spawn = function(pos){
        let color = random(COLORS);
        let size = random(5,20);
        let life = random(0,1),force = random(4,8);
        let velocity = sampleDirection(force).multiply(30);
        let particle = new Particle(pos,velocity,life,color,size,0);
        particle.acceleration = new vector2(random(0.9,0.99),random(0.9,0.99));
        ps.emit(particle);
    }
    mouseDemo.update = function(){
        ps.simulate(dt);
    }
    mouseDemo.draw = function(){
        mouseDemo.globalCompositeOperation = 'lighter';
        ps.render(mouseDemo);
    }
    mouseDemo.mousemove = function(){
        let touch,max,j;
        for(var i=0,len=mouseDemo.touches.length;i<len;i++){
            touch = mouseDemo.touches[i],max = random(1,4);
            //for(j=0;j<max;j++){
                mouseDemo.spawn(new vector2(touch.x,touch.y));
            //}
        }
    }
}
let burningCount = 200;
/**
 * @param target canvas target
 * @param mouseDemo 初始化后的canvas画布,只在初始化时传,其他用缓存
 */
var testPos;
export function changePos(pos){
    testPos = pos;
}

Methods.burningWord = function(target,mouseDemo){
    if(mouseDemo){
        particleDemo = mouseDemo;
    }
    if(!particleDemo){
        return;
    }
    //let text = target.style.text;
    var pos;
    if(!testPos){
        testPos = target.position;
    }
    let width = target.style.width;
    let height = target.style.height;
    var color = '#FFB90F';
    particleDemo.spawn = function(pos1){
        let size = random(5,8);
        let life = 15+Math.random()*8;
        let velocity = new vector2(random()*5,-15+random()*10);
        let particle = new Particle(pos1,velocity,life,color,size,0);
        ps.emit(particle);
    }
    particleDemo.update = function(){
        ps.simulate(dt,1);
    }
    particleDemo.draw = function(){
        pos = {x:target.style.x + testPos[0],y:target.style.y+testPos[1]}
        particleDemo.globalCompositeOperation = 'destination-over';
        ps.render(particleDemo);
        particleDemo.globalCompositeOperation = 'lighter';
        var tempPos = {};
        for(var i=0;i<burningCount;i++){
            tempPos.x = Math.random()*width+pos.x;
            tempPos.y = Math.random()*height+pos.y;
            particleDemo.spawn(new vector2(tempPos.x,tempPos.y));
        }
    }
    particleDemo.doUpdate();
    var particles = {
        "shape":{
            "type":"circle",
            "stroke":{
                "width":0,
                "color":""
            }
        },
        "position":{
            "x":target.style.x,
            "y":target.style.y
        },
        "property":{
            "compositeOperation":"destination-over",
            "awaitTime":1000,
            "await":true,
            "state":2
        },
        "life":{
            "value":15,
            "floatLife":8,
            "random":true,
            "anim":{
                "enable":true,
                "reduce_life":0.02,
                "state":2,
                "life_min":0
            }
        },
        "number":{
            "value":burningCount,
            "density":{
                "enable":true,
                "value_area":800
            }
        },
        "size":{
            "value":0,
            "minVal":5,
            "maxVal":8,
            "random":true,
            "anim":{
                "enable":true,
                "speed":40,
                "size_min":0
            }
        },
        "color":{
            "value":color
        },
        "opacity":{
            "value":0.5,
            "random":false
        },
        "move":{
            "enable":true,
            "speed":10,
            "random":true
        }
    }
    event.notify("setParticleProperty",particles);
}

Methods.shakeTheBall = function(target,mouseDemo,callback){
    if(mouseDemo){
        particleDemo = mouseDemo;
    }
    if(!particleDemo){
        return;
    }
    var type = target.type;
    let [pos,size] = getCenter()[type](target),center=new vector2(pos.x,pos.y);
    var time;
    particleDemo.spawn = function(){
        time = (new Date()).getTime();
        if(type ==="text"){
            var obj = {};
            var count1 = 25;
            var position = target.position;
            var tempPos;
            for(var i=0;i<count1;i++){
                var velocity = center.add(sampleDirection(5)).substract(center);
                tempPos = [position[0]+velocity.x,position[1]+velocity.y];
                var times = i*100;
                obj[times] = tempPos;
            }
            zrenderAnimation(obj,callback);
        }else{
            var life = 5000;
            let velocity = center.add(sampleDirection(5)).substract(center).multiply(10).add(sampleDirection());
            let color = "rgba(142,53,74)";
            ps.clear();
            ps.emit(new Particle(center,velocity,life,color,size,1,type))
        }
    }
    particleDemo.spawn();

    particleDemo.update = function(){
        if(type !== 'text'){
            ps.simulate(dt,1);
        }
    }
    particleDemo.draw = function(){
        var time1 = (new Date()).getTime();
        if(type !== 'text'){
            if((time1 - time) > 5000){
                particleDemo.stop();
                callback();
            }else{
                ps.modifyChildProperty("velocity",center.add(sampleDirection(5)).substract(center));
                ps.render(particleDemo);
            }
        }
    }
}
Methods.fireTheHall = function(target,mouseDemo,callback){
    if(mouseDemo){
        particleDemo = mouseDemo;
    }
    if(!particleDemo){
        return;
    }
    zrClear(); //清楚zrender图形
    var type = target.type;
    let [pos,size] = getCenter()[type](target)
    var time;
    //没有zrender元素需要开启sketch画布更新
    particleDemo.autoclear = true;
    particleDemo.running = true;
    particleDemo.spawn = function(){
        let r = size.r || size.width;
        ps.clear();
        let center = new vector2(pos.x,pos.y);
        time = (new Date()).getTime();
        let fragmentCenter
        for(let i=0;i<count;i++){
            let size = sampleNum(r/10,r/5);
            fragmentCenter = center.add(sampleDirection(size));
            let velocity = center.substract(fragmentCenter).multiply(2);
            let life = sampleNum(4,6);
            let color = sampleColor(Color.red,Color.yellow);
            ps.emit(new Particle(fragmentCenter,velocity,life,color,size));
        }
    }
    particleDemo.spawn();
    particleDemo.update = function(){
        ps.simulate(dt,0.02);
    }
    particleDemo.draw = function(){
        var time1 = (new Date()).getTime();
        if((time1-time)>5000){
            particleDemo.stop();
        }else{
            ps.render(particleDemo);
        }
    }
}

export default Methods;