/**
 * Created by sunshitao on 2016/5/21.
 */
import Particle from "../particle"
import vector2 from "../vector2"
import ParticleSystem from "./particleSystem"
import {fireTheHall,shakeBall} from "../plugin/fireTheHall"
import {
    sampleDirection,
    sampleNum,
    sampleColor,
    pseudorandomDirection
} from "./particleParam"

//import burnWord from "../plugin/burning-words"
var particleDemo;

const COLORS = ['#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423'];

let ps = new ParticleSystem();
let dt = 0.02;
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
                    x:shape.style.x+shape.style.width,
                    y:shape.style.y+shape.style.height
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
    particleDemo.spawn = function(pos1){
        let color = '#FFB90F';
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
        var life = 5;
        let velocity = center.add(sampleDirection(5)).substract(center).multiply(10).add(sampleDirection()).multiply(100);
        let color = "rgba(142,53,74)";
        ps.emit(new Particle(center,velocity,life,color,size,1,type))
    }

    particleDemo.update = function(){
        ps.simulate(dt,1);
    }
    particleDemo.draw = function(){
        var time1 = (new Date()).getTime();
        if((time1 - time) > 5000){
            particleDemo.stop();
            callback();
        }
        ps.modifyChildProperty("velocity",center.add(sampleDirection(5)).substract(center).multiply(10).add(sampleDirection()).multiply(100));
        ps.render(ctx);
    }
}
Methods.fireTheHall = function(target,mouseDemo,callback){
    if(mouseDemo){
        particleDemo = mouseDemo;
    }
    if(!particleDemo){
        return;
    }
    var type = target.type;
    let [pos] = getCenter()[type](target)
    var time;
    particleDemo.spawn = function(){
        let r = pos.r || pos.width;
        let center = new vector2(pos.x,pos.y);
        time = (new Date()).getTime();
        let fragmentCenter
        for(let i=0;i<count;i++){
            let size = sampleNum(r/10,r/5);
            fragmentCenter = center.add(sampleDirection(size));
            let velocity = center.substract(fragmentCenter).multiply(10).add(sampleDirection());
            let life = sampleNum(1,2);
            let color = sampleColor(Color.red,Color.yellow);
            ps.emit(new Particle(fragmentCenter,velocity,life,color,size));
        }
    }
    particleDemo.update = function(){
        ps.simulate(dt);
    }
    particleDemo.draw = function(){
        var time1 = (new Date()).getTime();
        if((time-time1)>5000){
            particleDemo.stop();
        }
        ps.render(ctx);
    }
}

export default Methods;