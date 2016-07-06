/**
 * 粒子运动学控制中枢
 * 负责调用抽象层的粒子类，控制其表现，同时与其他插件进行通信，改变状态
 * add by Sunst
 */
let component = {};
import Particle from "../particle";  //引入粒子
import Color from "../Color";  //引入颜色设置
import vector2 from "../vector2";  //引入向量
import event from "../event";
import ParticleSystem from "../widget/particleSystem";
import {
    sampleDirection,
    sampleNum,
    sampleColor
} from "../widget/particleParam"
import {drawBall,fireTheHall,shakeBall,addShape} from "./fireTheHall"
import drawMethod from "../widget/drawMethods"
import particleMethod from "../widget/particleMethod"

let Sketch = require("../widget/sketch");
let Vue = require('vue').default;

const COLORS = ['#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423'];

//let myCanvas = document.createElement("canvas");
let canvasSketch;
let ps = new ParticleSystem();
let acceleration = 0;  //初始加速度设置为0
let dt = 0.01;
let target;
let painterContainer = document.getElementById('painterContainer');
let fireFlag = false;

//设置鼠标交互
let oldMousePosition = vector2.zero, newMousePosition = vector2.zero;

function clearCanvas() {
    if (ctx != null) {
        ctx.save();
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);
        ctx.restore();
    }
}
let core = {
    //循环积分展示粒子运动轨迹
    loop: function () {
        let velocity = newMousePosition.substract(oldMousePosition).multiply(10).add(sampleDirection());
        let color = sampleColor(Color.red, Color.yellow);
        let life = sampleNum(1, 2);
        let size = sampleNum(2, 4);
        ps.emit(new Particle(newMousePosition, velocity, life, color, size));
        oldMousePosition = newMousePosition;
        ps.simulate(dt);
        clearCanvas();
        //todo 根据选择的特效类型进行绘制
        ps.render(ctx);
    }
};
function painterInit() {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);

}
//选择一个特效纹理
function selectTexture(param) {
    let type = param.type;
    console.log("------------" + type);
}
function selectParticle(param) {
    //particle should be an array
    if(!target.particle){
        target.particle = [];
    }
    target.particle.push(param.type);
}
//修改特效重力场
function modifyGravity(param) {
    let downGravity = param.downGravity, rightGravity = param.rightGravity;
}
function selectTarget(param) {
    target = param.target;
}
//绘制拖拽图形
function drawDragShape(data) {
    let pos = {
        x: data.pos.left,
        y: data.pos.top
    };
    drawMethod[data.type](pos, data.text, function (shape) {
        addShape(shape);
    });
}
function init() {
    var mainCanvas = document.createElement('canvas');
    mainCanvas.style.backgroundColor="black";
    mainCanvas.width = painterContainer.offsetWidth;
    mainCanvas.height = painterContainer.offsetHeight;
    
    var canvasZr = drawMethod.init(mainCanvas);
    canvasSketch = Sketch.create({
        container:document.getElementById('painterContainer'),
        element:mainCanvas,
        autoclear:false,
        zrenderClear:true,
        canvasZr:canvasZr
    });
}
function bindEvent() {
    event.register("selectTexture", selectTexture.bind(this));
    event.register("modifyGravity", modifyGravity.bind(this));
    event.register("selectParticle", selectParticle.bind(this));
    event.register("selectTarget", selectTarget.bind(this));
    event.register("drawDragShape", drawDragShape.bind(this));
}
function vueInit() {
    let playTimer;
    let vm = new Vue({
        el: "#ctrlBtn",
        data: {},
        methods: {
            start: function () {

            },
            finish: function () {
                canvasSketch.destroy();
                fireFlag = false;
            },
            fire: function () {
                //shakeBall(myCanvas);  手榴弹粒子特效
                var type = target.particle[0];
                particleMethod[type](target,canvasSketch);
                fireFlag = true;
            },
            create:function(){

            },
            replay:function(){
                event.notify('animationPlay');
            }
        }
    })
}
component.exec = function () {
    init();
    vueInit();
    bindEvent();
    //painterInit();
};
export default component;
