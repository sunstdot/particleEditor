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

//固定方向
function sampleDirection(angle1,angle2){
    var t = Math.random();
    var theta = angle1*t+angle2*(1-t);
    return new vector2(Math.cos(theta),Math.sin(theta));
}


//随机一个颜色
function sampleColor(color1,color2){
    var t = Math.random();
    return color1.multiply(t).add(color2.multiply(1-t));
}

//每个特效都有一个controller进行控制
function collisionControler() {
    ps.emit(new Particle(new vector2(200, 200), sampleDirection(Math.PI*1.75, Math.PI * 2).multiply(250), 2, sampleColor(Color.blue, Color.purple), 5));
    ps.simulate(dt);

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
    collisionControler();

    if(isContinue){
        timerId = setTimeout(loop,10);
    }
};

function startEmit(){
    //do something emit
    if(timerId){
        stopEmit();
    }
    isContinue = true;
    loop();
}
function stopEmit(){
    clearTimeout(timerId);
    isContinue = false;
}
function clearPainter(){

}