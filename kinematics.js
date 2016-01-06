var position = new vector2(10,200);
var velocity = new vector2(50,-50);
var acceleration = new vector2(0,10);
var dt = 0.1;
var myCanvas = document.getElementById("kinematics");
var ctx = myCanvas.getContext("2d");
function step(){
    position = position.add(velocity.multiply(dt));
    velocity = velocity.add(acceleration.multiply(dt));
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.arc(position.x, position.y, 5, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}
var times = 1000;
var loop = function(){
    step();
    setTimeout(function(){
       loop();
        times--;
    },10)
};
loop();

