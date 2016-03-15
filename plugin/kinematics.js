/**
 * 粒子运动学控制中枢
 * 负责调用抽象层的粒子类，控制其表现，同时与其他插件进行通信，改变状态
 * add by Sunst
 */
define(function (require, exports, module) {
    var component = {};

    var Particle = require("../app/particle");  //引入粒子
    var Color = require("../app/Color");  //引入颜色设置
    var vector2 = require("../app/vector2");  //引入向量

    var event = require("../app/event");
    var ParticleSystem = require("../widget/particleSystem");


    var myCanvas = document.getElementById("mainPainter");
    if(myCanvas){
        var ctx = myCanvas.getContext("2d");
    }

    var ps = new ParticleSystem();

    var acceleration = 0;  //初始加速度设置为0

    var dt = 0.01;

    var playtimer;
    //设置鼠标交互
    var oldMousePosition = vector2.zero,newMousePosition = vector2.zero;


    var option = {
        //随机方向
        sampleDirection:function(){
            var theta = Math.random()*2*Math.PI;
            return new vector2(Math.cos(theta), Math.sin(theta));
        },
        //从给的两个颜色值之间随机颜色
        sampleColor:function(color1,color2){
            var t = Math.random();
            return color1.multiply(t).add(color2.multiply(1-t));
        },
        sampleNumber:function(num1,num2){
            var t = Math.random();
            return num1*t+num2*(1-t);
        },
        clearCanvas:function(){
            if(ctx != null){
                ctx.save();
                ctx.fillStyle="rgba(0, 0, 0, 0.1)";
                ctx.fillRect(0,0,myCanvas.width,myCanvas.height);
                ctx.restore();
            }
        }
    };
    //todo 还是得引入类的思想，将速度，位置等的改变封装起来，做速度类，提供速度的add，multi，minus等方法？还是提供一个粒子类
    var core = {
        //循环积分展示粒子运动轨迹
        loop: function () {
            var velocity = newMousePosition.substract(oldMousePosition).multiply(10);
            velocity = velocity.add(option.sampleDirection(0,Math.PI*2)).multiply(10);
            var color = option.sampleColor(Color.red,Color.yellow);
            var life = option.sampleNumber(1,2);
            var size = option.sampleNumber(2,4);

            ps.emit(new Particle(newMousePosition, velocity,life,color,size));
            oldMousePosition = newMousePosition;
            ps.simulate(dt);
            option.clearCanvas();
            //todo 根据选择的特效类型进行绘制
            ps.render(ctx);
        }
    };


    //选择一个特效纹理
    function selectTexture(param) {
        var type = param.type;

        //todo 拿到了一种特效类型,下次start时候需要绘制出来

        console.log("------------" + type);
    }

    //修改特效重力场
    function modifyGravity(param) {
        var downGravity = param.downGravity, rightGravity = param.rightGravity;
        console.log(downGravity + "-----------------" + rightGravity);
        //todo 修改粒子的加速度,所有粒子共用一个gravity和velocity，只要修改即可
    }


    function painterInit() {
        ctx.clearRect(0,0,myCanvas.width, myCanvas.height);
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);
    }

    function bindEvent() {
        event.register("selectTexture", selectTexture.bind(this));
        event.register("modifyGravity", modifyGravity.bind(this));

        //绑定开始按钮
        var playBtn = document.getElementById("playBtn");
        if(playBtn){
            playBtn.addEventListener("click",function(e){
                //循环播放
                if(!playtimer){
                    playtimer = setInterval(function(){
                        core.loop();
                    },10);
                }
            });
        }
        //绑定结束按钮
        var stopBtn = document.getElementById("stopBtn");
        if(stopBtn){
            stopBtn.addEventListener("click",function(){
                if(playtimer){
                    clearInterval(playtimer);
                    playtimer = undefined;
                    ps.clear();
                    painterInit();
                }
            });
        }

        myCanvas.addEventListener("mousemove",function(e){
            if(e.layerX || e.layerX ==0){  //firefox
                e.target.style.position = 'relative';
                newMousePosition = new vector2(e.layerX, e.layerY);
            }else{
                newMousePosition = new vector2(e.offsetX, e.offsetY);
            }
        });
    }

    component.exec = function () {
        if(!myCanvas){
            return;
        }
        bindEvent();
        painterInit();
    };

    module.exports = component;

});














