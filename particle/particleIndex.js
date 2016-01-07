var timerId,isContinue = false;

var ps = new ParticleSystem();

ps.effectors.push(new ChamberBox(0,0,400,400));

var dt = 0.01;

var myCanvas = document.getElementById("particle");
var ctx = myCanvas.getContext("2d");

//随机方向
function sampleDirection(){
    var theta = Math.random()*2*Math.PI;
    return new vector2(Math.cos(theta), Math.sin(theta));
}

//随机一个颜色
function sampleColor(){

}


//每个特效都有一个controller进行控制
function particleControler(){
    ps.emit(new Particle(new vector2(200,200), sampleDirection().multiply(100),1,Color.red,5));
    ps.simulate(dt);
    clearCanvas();
    ps.render(ctx);
}

function clearCanvas() {
    if (ctx != null)
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
}

var loop = function(){
    particleControler();
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