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
    }
    moveTo(point){
        this.position = point;
    }
    addParticle(){
        let position = Object.assign({},{},this.position);
        let particle = new Particle(
            position,
            Vector.fromAngle(this.velocity.getAngle() + this.spread-(Math.random()*this.spread*2),this.velocity.getMagnitude())
        );
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
}
Emitter.drawColor  = "#999999";
Emitter.drawColor2 = "#000000";
Emitter.jitter     = 0.05;