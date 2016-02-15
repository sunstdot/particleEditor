/**
 * 粒子运动学控制中枢
 * 负责调用抽象层的粒子类，控制其表现，同时与其他插件进行通信，改变状态
 * add by Sunst
 */
define(function (require, exports, module) {
    var component = {};

    var ParticleSystem = require("../widget/particleSystem");
    var event = require("../app/event");

    var myCanvas = document.getElementById("mainPainter");
    var ctx = myCanvas.getContext("2d");

    var ps = new ParticleSystem();

    var acceleration = 0;  //初始加速度设置为0
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
        }
    };
    //todo 还是得引入类的思想，将速度，位置等的改变封装起来，做速度类，提供速度的add，multi，minus等方法？还是提供一个粒子类
    var core = {
        //粒子描述
        render: function () {

        },

        //循环积分展示粒子运动轨迹
        loop: function () {


            setTimeout(this.loop, 100);
        }
    };


    //选择一个特效纹理
    function selectTexture(param) {
        var type = param.type;
        console.log("------------" + type);
    }

    //修改特效重力场
    function modifyGravity(param) {
        var downGravity = param.downGravity, rightGravity = param.rightGravity;
        console.log(downGravity + "-----------------" + rightGravity);
        //todo 修改粒子的加速度,所有粒子共用一个gravity和velocity，只要修改即可
    }


    function painterInit() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);
    }


    function bindEvent() {
        event.register("selectTexture", selectTexture.bind(this));
        event.register("modifyGravity", modifyGravity.bind(this));
    }


    component.exec = function () {
        bindEvent();
        painterInit();
    };

    module.exports = component;

});














