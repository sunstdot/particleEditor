/**
 * Created by sunshitao on 2016/1/7.
 */
var timerId,isContinue = false;


var ps = new ParticleSystem();
var dt = 0.01;
//设置粒子运动区域
ps.effectors.push(new ChamberBox(0,0,400,400));

var myCanvas = document.getElementById("particle");
var ctx = myCanvas.getContext("2d");

var oldMousePosition = vector2.zero,newMousePosition = vector2.zero;

//固定方向
function sampleDirection(angle1, angle2) {
    var t = Math.random();
    var theta = angle1 * t + angle2 * (1 - t);
    return new vector2(Math.cos(theta), Math.sin(theta));
}
//取一个随机颜色值，在color1---color2
function sampleColor(color1,color2){
    var t = Math.random();
    return color1.multiply(t).add(color2.multiply(1-t));
}
//取value1--value2之间的随机值
function sampleNumber(value1,value2){
    var t= Math.random();
    return value1*t+value2*(1-t);
}


//每个特效都有一个controller进行控制,交互类的controller
function interactController(){
    var velocity = newMousePosition.substract(oldMousePosition).multiply(10);
    velocity = velocity.add(sampleDirection(0,Math.PI*2)).multiply(10);
    var color = sampleColor(Color.red,Color.yellow);
    var life = sampleNumber(1,2);
    var size = sampleNumber(2,4);
    ps.emit(new Particle(newMousePosition, velocity,life,color,size));
    oldMousePosition = newMousePosition;

    ps.simulate(dt);
//    clearCanvas();
    ctx.save();
    ctx.fillStyle="rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0,0,myCanvas.width,myCanvas.height);
    ctx.restore();

    ps.render(ctx);
}

function clearCanvas() {
    if (ctx != null)
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
}

var loop = function(){
    interactController();
    if(isContinue){
        timerId = setTimeout(loop,10);
    }
};

var bindEvent = function(){
    myCanvas.addEventListener("mousemove",function(e){
        if(e.layerX || e.layerX ==0){  //firefox
            e.target.style.position = 'relative';
            newMousePosition = new vector2(e.layerX, e.layerY);
        }else{
            newMousePosition = new vector2(e.offsetX, e.offsetY);
        }
    })
};

function startEmit(){
    //do something emit
    if(timerId){
        stopEmit();
    }
    isContinue = true;
    bindEvent();
    loop();

}
function stopEmit(){
    clearTimeout(timerId);
    isContinue = false;
}
function clearPainter(){

}