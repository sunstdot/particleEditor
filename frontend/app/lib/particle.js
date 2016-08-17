import Vector from './vector'
export default class Particle{
    constructor(point,velocity){
        this.position     = point;
        this.velocity     = velocity;
        this.acceleration = new Vector(0,0);
        this.ttl          = -1;
        this.lived        = 0;
    }
    submitToFields(fields){
        var totalAccelerationX = 0;
        var totalAccelerationY = 0;
        fields.map((field)=>{
            // inlining what should be Vector object methods for performance reasons
            let vectorX = field.position.x - this.position.x;
            let vectorY = field.position.y - this.position.y;
            let force = field.mass / Math.pow((vectorX*vectorX+field.mass/2+vectorY*vectorY+field.mass/2),1.5);
            totalAccelerationX += vectorX * force;
            totalAccelerationY += vectorY * force;
        });
        this.acceleration = new Vector(totalAccelerationX,totalAccelerationY);
    }
    move(){
        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
    drawVariable(pixels,width,height){
        var baseIndex = 4 * (~~this.position.y * width + ~~this.position.x);
        var velocity = this.velocity.getMagnitude();
        var r = this.color[0] * velocity;
        var g = this.color[1];
        var b = this.color[2] * 0.5/velocity;
        var a = this.color[3];
        pixels[baseIndex]      += r;
        pixels[baseIndex + 1]  += g;
        pixels[baseIndex + 2]  += b;
        pixels[baseIndex + 3]   = a;
    }
    drawBasic(pixels,width,height) {
        var baseIndex = 4 * (~~this.position.y * width + ~~this.position.x);
        var r = this.color[0];
        var g = this.color[1];
        var b = this.color[2];
        var a = this.color[3];
        pixels[baseIndex]      += r;
        pixels[baseIndex + 1]  += g;
        pixels[baseIndex + 2]  += b;
        pixels[baseIndex + 3]   = a;
    }
    drawSoft(pixels,width,height) {
        var baseIndex = 4 * (~~this.position.y * width + ~~this.position.x);
        var r = this.color[0];
        var g = this.color[1];
        var b = this.color[2];
        var a = this.color[3];
        pixels[baseIndex - 4] += r * 0.80;
        pixels[baseIndex - 3] += g * 0.80;
        pixels[baseIndex - 2] += b * 0.80;
        pixels[baseIndex - 1] = a;
        pixels[baseIndex] += r * 0.80;
        pixels[baseIndex + 1] += g * 0.80;
        pixels[baseIndex + 2] += b * 0.80;
        pixels[baseIndex + 3] = a;
        pixels[baseIndex + 4] += r * 0.80;
        pixels[baseIndex + 5] += g * 0.80;
        pixels[baseIndex + 6] += b * 0.80;
        pixels[baseIndex + 7] = a;
        baseIndex += width * 4;
        pixels[baseIndex - 4] += r * 0.80;
        pixels[baseIndex - 3] += g * 0.80;
        pixels[baseIndex - 2] += b * 0.80;
        pixels[baseIndex - 1] = a;
        pixels[baseIndex] += r;
        pixels[baseIndex + 1] += g;
        pixels[baseIndex + 2] += b;
        pixels[baseIndex + 3] = a;
        pixels[baseIndex + 4] += r * 0.80;
        pixels[baseIndex + 5] += g * 0.80;
        pixels[baseIndex + 6] += b * 0.80;
        pixels[baseIndex + 7] = a;
        baseIndex += width * 4;
        pixels[baseIndex - 4] += r * 0.80;
        pixels[baseIndex - 3] += g * 0.80;
        pixels[baseIndex - 2] += b * 0.80;
        pixels[baseIndex - 1] = a;
        pixels[baseIndex] += r * 0.80;
        pixels[baseIndex + 1] += g * 0.80;
        pixels[baseIndex + 2] += b * 0.80;
        pixels[baseIndex + 3] = a;
        pixels[baseIndex + 4] += r * 0.80;
        pixels[baseIndex + 5] += g * 0.80;
        pixels[baseIndex + 6] += b * 0.80;
        pixels[baseIndex + 7] = a;
    }
    draw(){
        this.drawBasic();
    }
    circle(context,pos,size){
        context.beginPath();
        context.arc(pos.x,pos.y,size,0,2*Math.PI,true);
        context.fill();
    }
    square(context,pos,size){
        context.fillRect(pos.x, pos.y, size, size);
    }
    fixPointStar(context,pos,size){
        function degreeToRaidus(degree)
        {
            return degree*Math.PI/180;
        }
        context.beginPath();//´´½¨Â·¾¶
        let pos1 = {
            x:pos.x+size*Math.cos(degreeToRaidus(18)),
            y:pos.y-size*Math.sin(degreeToRaidus(18))
        };
        let pos2 = {
            x:pos.x,
            y:pos.y-size
        };
        let pos3 = {
            x:pos.x-size*Math.cos(degreeToRaidus(18)),
            y:pos.y-size*Math.sin(degreeToRaidus(18))
        };
        let pos4 = {
            x:pos.x-size*Math.cos(degreeToRaidus(54)),
            y:pos.y+size*Math.sin(degreeToRaidus(54))
        };
        let pos5 = {
            x:pos.x+size*Math.cos(degreeToRaidus(54)),
            y:pos.y+size*Math.sin(degreeToRaidus(54))
        };
        context.moveTo(pos1.x,pos1.y);
        context.lineTo(pos4.x,pos4.y);
        context.lineTo(pos2.x,pos2.y);
        context.lineTo(pos5.x,pos5.y);
        context.lineTo(pos3.x,pos3.y);
        context.lineTo(pos1.x,pos1.y);
        context.fill();
        context.closePath();
    }
}
Particle.size = 2;
Particle.color = [66,167,222,255];
Particle.type = 'fixPointStar';
Particle.drawFunctions = ['Basic','Soft','Variable'];
Particle.changeColor = (color)=>{
    Particle.color = color;
};
Particle.changeType = (type) =>{
    Particle.type = type;
};