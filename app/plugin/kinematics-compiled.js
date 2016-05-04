/**
 * 粒子运动学控制中枢
 * 负责调用抽象层的粒子类，控制其表现，同时与其他插件进行通信，改变状态
 * add by Sunst
 */
let component = {};
import Particle from "./particle"; //引入粒子
import Color from "./Color"; //引入颜色设置
import vector2 from "./vector2"; //引入向量
import event from "./event";
import ParticleSystem from "../widget/particleSystem";
let myCanvas = document.getElementById("mainPainter");
let ctx = myCanvas.getContext("2d");

let ps = new ParticleSystem();
let acceleration = 0; //初始加速度设置为0
let dt = 0.01;
let playtimer;
//设置鼠标交互
let oldMousePosition = vector2.zero,
    newMousePosition = vector2.zero;

function clearCanvas() {
    if (ctx != null) {
        ctx.save();
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);
        ctx.restore();
    }
}

let SampleOption = new function () {
    let sample = function () {};
    sample.prototype.sampleDirection = function () {
        let theta = Math.random() * 2 * Math.PI;
        return new vector2(Math.cos(theta), Math.sin(theta));
    };
    sample.prototype.sampleColor = function () {
        let t = Math.random();
        return color1.multiply(t).add(color2.multiply(1 - t));
    };
    sample.prototype.sampleNumber = function () {
        let t = Math.random();
        return num1 * t + num2 * (1 - t);
    };
    return sample;
}();

//todo 还是得引入类的思想，将速度，位置等的改变封装起来，做速度类，提供速度的add，multi，minus等方法？还是提供一个粒子类
let core = {
    //循环积分展示粒子运动轨迹
    loop: function () {
        let velocity = newMousePosition.substract(oldMousePosition).multiply(10);
        velocity = velocity.add(SampleOption.sampleDirection(0, Math.PI * 2)).multiply(10);
        let color = SampleOption.sampleColor(Color.red, Color.yellow);
        let life = SampleOption.sampleNumber(1, 2);
        let size = SampleOption.sampleNumber(2, 4);
        ps.emit(new Particle(newMousePosition, velocity, life, color, size));
        oldMousePosition = newMousePosition;
        ps.simulate(dt);
        clearCanvas();
        //todo 根据选择的特效类型进行绘制
        ps.render(ctx);
    }
};
//选择一个特效纹理
function selectTexture(param) {
    let type = param.type;
    //todo 拿到了一种特效类型,下次start时候需要绘制出来
    console.log("------------" + type);
}

//修改特效重力场
function modifyGravity(param) {
    let downGravity = param.downGravity,
        rightGravity = param.rightGravity;
    console.log(downGravity + "-----------------" + rightGravity);
    //todo 修改粒子的加速度,所有粒子共用一个gravity和velocity，只要修改即可
}

function painterInit() {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);
}
function bindEvent() {
    event.register("selectTexture", selectTexture.bind(this));
    event.register("modifyGravity", modifyGravity.bind(this));
    //绑定开始按钮
    let playBtn = document.getElementById("playBtn");
    if (playBtn) {
        playBtn.addEventListener("click", function (e) {
            //循环播放
            if (!playtimer) {
                playtimer = setInterval(function () {
                    core.loop();
                }, 10);
            }
        });
    }
    //绑定结束按钮
    let stopBtn = document.getElementById("stopBtn");
    if (stopBtn) {
        stopBtn.addEventListener("click", function () {
            if (playtimer) {
                clearInterval(playtimer);
                playtimer = undefined;
                ps.clear();
                painterInit();
            }
        });
    }
    myCanvas.addEventListener("mousemove", function (e) {
        if (e.layerX || e.layerX == 0) {
            //firefox
            e.target.style.position = 'relative';
            newMousePosition = new vector2(e.layerX, e.layerY);
        } else {
            newMousePosition = new vector2(e.offsetX, e.offsetY);
        }
    });
}
component.exec = function () {
    if (!myCanvas) {
        return;
    }
    bindEvent();
    painterInit();
};
export default component;

//# sourceMappingURL=kinematics-compiled.js.map