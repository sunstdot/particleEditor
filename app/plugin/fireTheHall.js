/**
 * Created by sunshitao on 2016/5/3.
 */
import vector2 from "../vector2"
import Particle from "../particle"
import ParticleSystem from "../widget/particleSystem"
import {
    direction,
    negateDirection,
    sampleDirection,
    sampleNum,
    sampleColor,
} from "../widget/particleParam"
import Color from "../Color"

let shape = [];
let timer = 10;
let boundary = 40;
let velocity = new vector2(0,0);
let accelaration = new vector2(2,2);
let ps = new ParticleSystem();

const count = 100
const dt = 0.01;

function canvasMethod(myCanvas){
    let width = myCanvas.width;
    let height = myCanvas.height;
    let ctx = myCanvas.getContext('2d');
    return {
        clearCanvas:function(){
            if(ctx){
                ctx.clearRect(0, 0, width, height);
            }
        }
    }
}

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
        ctx.arc(width / 2, height / 2, 40, 0, Math.PI * 2, true);
        ctx.fillStyle = "#E16B8C";
        ctx.globalCompositeOperation = "destination-over";
        ctx.closePath();
        ctx.fill();
        shape.push({
            x: width / 2,
            y: height / 2,
            r: 40,
            id: "ball"
        });
    }
}
function fragmentShape(shape){
    let r = shape.r
    let center = new vector2(shape.x,shape.y);
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

export function shakeBall(myCanvas){
    let life = 5;
    let playTimer;
    let ctx = myCanvas.getContext("2d");
    let center = new vector2(shape[0].x,shape[0].y);
    function move(center){
        center = new vector2(center.x,center.y);
        let velocity = center.add(sampleDirection(5)).substract(center).multiply(10).add(sampleDirection()).multiply(100);
        let color = "rgba(142,53,74)";
        ps.emit(new Particle(center,velocity,life,color,shape[0].r));
    }
    let count = life*100;
    let i=0;
    let clearCanvas = canvasMethod(myCanvas).clearCanvas;
    move(center);
    playTimer = setInterval(function(){
        i++;
        if(i>count){
            clearInterval(playTimer);
            ps.clear();
            fireTheHall(myCanvas);
        }
        clearCanvas();
        center = center.add(sampleDirection(5));
        ps.modifyChildProperty("velocity",center.substract(center).multiply(10).add(sampleDirection()).multiply(100));
        ps.simulate(dt);
        ps.render(ctx);
    },10);
}

export function fireTheHall(myCanvas) {
    let playTimer;
    fragmentShape(shape[0]);
    let count = timer*100;
    let i=0
    let clearCanvas = canvasMethod(myCanvas).clearCanvas;
    let ctx = myCanvas.getContext("2d");
    playTimer = setInterval(function(){
        i++;
        if(i>count){
            clearInterval(playTimer);
        }
        clearCanvas();
        ps.simulate(dt);
        ps.render(ctx);
    },10);
}