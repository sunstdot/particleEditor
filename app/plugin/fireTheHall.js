/**
 * Created by sunshitao on 2016/5/3.
 */
import vector2 from "../vector2"
let shape = [];
let timer = 10;
let boundary = 40;
let velocity = new Vector2(0,0);
let accelaration = new Vector2(2,2);
let playTimer;

export function drawBall(myCanvas) {
    if (!myCanvas) {
        return;
    }
    let ctx = myCanvas.getContext('2d');
    let width = myCanvas.width;
    let height = myCanvas.height;
    if (ctx != null) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, 40, 0, Math.PI * 2, false);
        ctx.stroke();
        ctx.fillStyle = "rgba(142,53,74)";
        shape.push({
            x: width / 2,
            y: height / 2,
            r: 40,
            id: "ball"
        });
    }
}

function direction(){
    let theta = Math.random()*2*Math.PI;
    return new Vector2(Math.cos(theta),Math.sin(theta));
}
function negateDirection(direct){
    return vector2.negate(direct);
}

function shakeBall(ballShape){
    velocity = velocity.add(accelaration).multiply(5);
    velocity.x * timer/1000;
}

export function fireTheHall() {
    while(timer > 0){

    }
    playTimer = setInterval(function(){
        shakeBall();
    },10);

}