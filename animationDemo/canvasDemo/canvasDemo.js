/**
 * canvas demo
 * 对外暴露 api
 *
 * 导出动画js文件仿照jquery插件写法
 * Created by sunshitao on 2016/4/13.
 */


var initDemo = (function (){

    //方法拆分

    var myCanvas = document.getElementById('canvasDemo');

    var ctx = myCanvas.getContext('2d');
    var xBall = 20;
    var ballStep = 1;

    //画矩形
    var _step1 = function(){
        ctx.fillStyle = "red";
        ctx.fillRect(0,100,300,100);
    };
    var _step2 = function(){
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(xBall,125,20,0,2*Math.PI,true);

        ctx.stroke();
        ctx.closePath();
        ctx.fill();
    };


    //内部方法
    var _drawDemo = function(){
        ctx.clearRect(0,100,300,100);
        _step1();
        _step2();
        setTimeout(function(){
            if(xBall>=280){
                ballStep = -2;
            }
            if(xBall <= 20){
                ballStep = 2;
            }
            xBall += ballStep;
            _drawDemo();
        },10)
    };

    var initDemo = function(opt){

    };

    initDemo.prototype.start = function(){
        _drawDemo();
    };

    //对外api暴露接口
    initDemo.prototype.set = function(key,value){

    };

    return initDemo;
}());





