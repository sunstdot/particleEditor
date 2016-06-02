/**
 * Created by sunshitao on 2016/5/21.
 */
import Particle from "../particle"
import vector2 from "../vector2"
import ParticleSystem from "./particleSystem"
import {
    sampleDirection,
    sampleNum,
    sampleColor,
    pseudorandomDirection
} from "./particleParam"

//import burnWord from "../plugin/burning-words"

const COLORS = ['#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423'];

let ps = new ParticleSystem();
let dt = 0.02;
let Methods = {};
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
Methods.burningWord = function(mouseDemo,target){
    //let text = target.style.text;
    let pos = {x:target.style.x + target.position.x,y:target.style.y+target.position.y};
    let width = target.style.width;
    let height = target.style.height;
    mouseDemo.spawn = function(pos1){
        let color = '#FFB90F';
        let size = random(5,8);
        let life = 15+Math.random()*8;
        //let force = random(4,8);
        //let velocity = pseudorandomDirection(force,Math.PI);
        let velocity = new vector2(random()*5,-15+random()*10);
        let particle = new Particle(pos1,velocity,life,color,size,0);
        //particle.acceleration = new vector2(random(0.9,0.99),random(0.9,0.99));
        ps.emit(particle);
    }
    mouseDemo.update = function(){
        ps.simulate(dt,1);
    }
    mouseDemo.draw = function(){
        mouseDemo.globalCompositeOperation = 'destination-over';
        ps.render(mouseDemo);
        mouseDemo.globalCompositeOperation = 'lighter';
        var tempPos = {};
        for(var i=0;i<burningCount;i++){
            tempPos.x = Math.random()*width+pos.x;
            tempPos.y = Math.random()*height+pos.y;
            mouseDemo.spawn(new vector2(tempPos.x,tempPos.y));
        }
    }
    mouseDemo.doUpdate();

    //burnWord(text, {
    //    "text_color": "FFFFCC",
    //    "id": "loginPanel",
    //    "font": "Times New Roman",
    //    "font_size": 64,
    //    "bg_color": "1A0A4A",
    //    "bg_alpha": 200,
    //    "speed": "fast"
    //})
}
export default Methods;