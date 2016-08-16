/**
 * Created by sunshitao on 2016/8/8.
 */
import Vector from './vector'
import Particle from './particle'
export default class Emitter{
    constructor(point,velocity){
        this.position     = point;
        this.velocity     = velocity;
        this.size         = 15;
        this.particleLife = -1;
        this.spread       = Math.PI / 32;
        this.emissionRate = 4;
        this.type = "emitter";
        this.drawType = "fixPointStar";
    }
    moveTo(point){
        this.position = point;
    }
    addParticle(){
        this.position = {
            x:parseInt(this.position.x,10),
            y:parseInt(this.position.y,10)
        };
        let position = Object.assign({},{},this.position);
        let particle = new Particle(
            position,
            Vector.fromAngle(this.velocity.getAngle() + this.spread-(Math.random()*this.spread*2),this.velocity.getMagnitude())
        );
        particle.type = this.drawType;
        particle.ttl = this.particleLife;
        //particle.draw();
        return particle;
    }
    toString(){
        let coreAttributes = [
            this.position.toString(),
            this.velocity.toString(),
            this.size,
            this.particleLife,
            this.spread.toFixed(2),
            this.emissionRate
        ];
        return 'E' + coreAttributes.join(':');
    }
    updateVelocity(velocity){
        this.velocity = velocity;
    }
    updateSpread(spread){
        this.spread = spread;
    }
    updateDrawType(type){
        this.drawType = type;
    }
}
Emitter.fromString = function(string) {
    var parts = (string.substr(1).split(':'));
    var emitter = new Emitter();
    emitter.position     = Vector.fromString(parts.shift());
    emitter.velocity     = Vector.fromString(parts.shift());
    emitter.size         = parseInt(parts.shift(),10);
    emitter.particleLife = parseInt(parts.shift(),10);
    emitter.spread       = parseFloat(parts.shift(),10);
    emitter.emissionRate = parseInt(parts.shift().valueOf(),10);
    return emitter;
};
Emitter.drawColor  = "#999999";
Emitter.drawColor2 = "#000000";
Emitter.jitter     = 0.05;