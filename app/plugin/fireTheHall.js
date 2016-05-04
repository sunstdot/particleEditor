/**
 * Created by sunshitao on 2016/5/3.
 */
import vector2 from "../vector2"
import Particle from "../particle"
import ParticleSystem from "../particleSystem"
import Color from "../Color"
let shape = [];
let timer = 10;
let boundary = 40;
let velocity = new Vector2(0,0);
let accelaration = new Vector2(2,2);
let playTimer;
let ps = new ParticleSystem();
const count = 100
const dt = 3;

export function drawBall(myCanvas) {
    if (!myCanvas) {
        return;
    }
    let ctx = myCanvas.getContext('2d');
    let width = myCanvas.width;
    let height = myCanvas.height;
    if (ctx != null) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, 40, 0, Math.PI * 2, false);
        ctx.stroke();
        ctx.fillStyle = "rgba(142,53,74)";
        shape.push({
            x: width / 2,
            y: height / 2,
            r: 40,
            id: "ball"
        });
    }
}

function direction(){
    let theta = Math.random()*2*Math.PI;
    return new Vector2(Math.cos(theta),Math.sin(theta));
}
function negateDirection(direct){
    return vector2.negate(direct);
}
function sampleDirection(r){
    if(!r) {
        r = 1;
    }
    let theta = Math.random()*2*Math.PI;
    return new vector2(angle.x*Math.cos(theta),angle.y*Math.sin(theta));
}
function sampleNum(num1,num2){
    let t = Math.random();
    return num1*t+num2*(1-t);
}

function fragmentShape(shape){
    let particles = []
    let r = shape.r
    let center = new vector2(shape.x,shape.y);
    let fragmentCenter
    for(let i=0;i<count;i++){
        let t = Math.random();
        let size = sampleNum(r/10,r/5);
        fragmentCenter = center.add(sampleDirection(size));
        let velocity = center.substract(fragmentCenter).multiply(10).add(sampleDirection()).multiply(10);
        let life = sampleNum(1,2);
        ps.emit(new Particle(fragmentCenter,velocity,life,color,size));
        ps.simulate(dt);
        ps.simulate(dt);
    }
}

function shakeBall(){
    clearCanvas();
    ps.render(ctx);
}

export function fireTheHall() {
    fragmentShape(shape);
    playTimer = setInterval(function(){
        shakeBall();
    },10);
}