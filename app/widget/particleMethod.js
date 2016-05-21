/**
 * Created by sunshitao on 2016/5/21.
 */
import Particle from "../particle"
import vector2 from "../vector2"
import ParticleSystem from "./particleSystem"
import {
    sampleDirection,
    sampleNum,
    sampleColor
} from "./particleParam"

const COLORS = ['#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423'];
let ps = new ParticleSystem();
let dt = 0.01;
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
        let size = random(5,30);
        let life = 5,force = random(4,8);
        let velocity = sampleDirection(force);
        let particle = new Particle(pos,velocity,life,color,size);
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
            for(j=0;j<max;j++){
                mouseDemo.spawn(touch.x, touch.y);
            }
        }
    }
}
export default Methods;