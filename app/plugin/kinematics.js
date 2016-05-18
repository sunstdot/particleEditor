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
import {drawBall,fireTheHall,shakeBall,addShape} from "./fireTheHall.js"
import drawMethod from "../widget/drawMethods.js"

let Vue = require('vue').default;
let myCanvas = document.getElementById("mainPainter");
let ctx = myCanvas.getContext("2d");
let ps = new ParticleSystem();
let acceleration = 0;  //初始加速度设置为0
let dt = 0.01;
let target;

//设置鼠标交互
let oldMousePosition = vector2.zero,newMousePosition = vector2.zero;

function clearCanvas(){
  if(ctx != null){
      ctx.save();
      ctx.fillStyle="rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0,0,myCanvas.width,myCanvas.height);
      ctx.restore();
  }
}
let core = {
    //循环积分展示粒子运动轨迹
    loop: function () {
        let velocity = newMousePosition.substract(oldMousePosition).multiply(10).add(sampleDirection());
        let color = sampleColor(Color.red,Color.yellow);
        let life = sampleNum(1,2);
        let size = sampleNum(2,4);
        ps.emit(new Particle(newMousePosition, velocity,life,color,size));
        oldMousePosition = newMousePosition;
        ps.simulate(dt);
        clearCanvas();
        //todo 根据选择的特效类型进行绘制
        ps.render(ctx);
    }
};
function painterInit() {
    ctx.clearRect(0,0,myCanvas.width, myCanvas.height);
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);

}
//选择一个特效纹理
function selectTexture(param) {
    let type = param.type;
    console.log("------------" + type);
}
function selectParticle(param){
    target.particle = "fireTheHall";

    //drawBall(myCanvas);
}
//修改特效重力场
function modifyGravity(param) {
    let downGravity = param.downGravity, rightGravity = param.rightGravity;
    console.log(downGravity + "-----------------" + rightGravity);
}
function selectTarget(param){
    target = param.target;
}
//绘制拖拽图形
function drawDragShape(data){
    let pos = {
        x:data.pos.left,
        y:data.pos.top
    };
    drawMethod[data.type](pos,function(shape){
        addShape(shape);
    });
}
function init(){
    drawMethod.init(myCanvas);
}
function bindEvent() {
    event.register("selectTexture", selectTexture.bind(this));
    event.register("modifyGravity", modifyGravity.bind(this));
    event.register("selectParticle",selectParticle.bind(this));
    event.register("selectTarget",selectTarget.bind(this));
    event.register("drawDragShape",drawDragShape.bind(this));
    myCanvas.addEventListener("mousemove",function(e){
        if(e.layerX || e.layerX ==0){  //firefox
            e.target.style.position = 'relative';
            newMousePosition = new vector2(e.layerX, e.layerY);
        }else{
            newMousePosition = new vector2(e.offsetX, e.offsetY);
        }
    });
}
function vueInit(){
    let playTimer;
    let vm = new Vue({
        el:"#ctrlBtn",
        data:{},
        methods:{
            start:function(){
                //循环播放
                if(!playTimer){
                    playTimer = setInterval(function(){
                        core.loop();
                    },10);
                }
            },
            finish:function(){
                if(playTimer){
                    clearInterval(playTimer);
                    playTimer = undefined;
                }
                ps.clear();
                painterInit();
            },
            fire:function(){
                shakeBall(myCanvas);
            }
        }
    })
}
component.exec = function () {
    if(!myCanvas){
        return;
    }
    init();
    vueInit();
    bindEvent();
    painterInit();
};
export default component;
