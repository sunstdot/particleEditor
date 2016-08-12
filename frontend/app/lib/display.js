import {requestAnimationFrame} from '../widget/requestAnimationFrame'
import {stats} from '../widget/stats'
import Vector from './vector'
import Emitter from './emitter'
import Field from './field'
import Particle from './particle'
import removeArray from 'lodash.remove'
export default class Display {
    constructor(canvas) {
        //display fields
        this.canvas = canvas;
        this.context = undefined;
        this.numFrames = 0;
        this.paused = true;
        this.scale = 1;
        //particle fields
        this.maxParticles = 2000;
        this.particles = [];
        this.emitters = [];
        this.fields = [];
        this.elapsed = 0;  //消逝,时间流逝
        this.mouseCoords = new Vector(0, 0);
        this.mouseFieldStrength = -140;
        this.mouseField = null;
        this.display = null;

        this.draw = {
            continuous: false,
            objects: true,
            info: true,
            accelerations: true,
            velocities: true,
            particles: true
        };
    }

    init() {
        this.context = this.canvas.getContext('2d');
        this.context.scale(this.scale, this.scale);
        this.width = this.canvas.width / this.scale;
        this.height = this.canvas.height / this.scale;
        this.canvas.onmousedown = (evt) => {
            this.onMouseDown(evt);
        };
        this.canvas.onmouseup = (evt) => {
            this.onMouseUp(evt);
        };
        this.canvas.onmousemove = (evt) => {
            this.onMouseMove(evt);
        }
        this.main();
    }

    //display field
    main() {
        stats.begin();
        if (!this.paused) this.nextFrame();
        requestAnimationFrame(this.main.bind(this));
        stats.end();
    }

    nextFrame() {
        if (!this.draw.continuous) {
            this.clear();
        }
        this.beforeUpdate();
        this.update();
        this.afterUpdate();
        this.beforeDraw();
        this.tick();
        this.onDraw();
        this.afterDraw();
    }

    drawLine(startPoint, endPoint) {
        this.context.beginPath();
        this.context.moveTo(startPoint.x, startPoint.y);
        this.context.lineTo(endPoint.x, endPoint.y);
        this.context.stroke();
    }

    drawText(txt, point, width) {
        this.context.fillText(txt, point.x, point.y, width);
    }

    drawCircle(point, radius) {
        this.context.beginPath();
        this.context.arc(point.x, point.y, radius, 0, Math.PI * 2);
        this.context.closePath();
        this.context.stroke();
    }

    fillStyle(fill) {
        this.context.fillStyle = fill;
    }

    strokeStyle(fill) {
        this.context.strokeStyle = fill;
    }

    tick() {
        this.numFrames++;
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    stop() {
        this.paused = true;
    }

    start() {
        this.paused = false;
    }

    togglePaused() {
        this.paused = !this.paused;
    }

    step() {
        this.stop();
        this.nextFrame();
    }

    //particle field
    addEmitter(point, velocity) {
        let emitter = new Emitter(point, velocity);
        this.emitters.push(emitter);
    }

    addField(point, mass) {
        let field = new Field(point, mass);
        this.fields.push(field);
    }

    removeEmitter(index) {
        this.emitters.splice(index, 1);
    }

    removeField(index) {
        this.fields.splice(index, 1);
    }

    beforeUpdate() {
        if (this.draw.accelerations) {
            this.drawAccelerations();
        }
        if (this.draw.velocities) {
            this.drawVelocities();
        }
    }

    update() {
        this.elapsed++;
        this.addNewParticles();
        this.plotParticles(this.canvas.width, this.canvas.height);  //图
    }

    afterUpdate() {
        //something will do
    }

    beforeDraw() {
        //something will do
    }

    onDraw() {
        if (this.draw.particles) {
            this.drawParticles();
        }
        if (this.draw.objects) {
            this.drawEmitters();
            this.drawFields();
        }
    }

    afterDraw() {
        if (this.draw.info) {
            this.fillStyle("white");
            this.drawText("Particles:" + this.getParticleCount(), new Vector(100, this.height - 100), 100)
        }
    }

    onMouseDown(evt) {
        let object = this.getObjectAtPoint(this.mouseCoords); //object不是 emitter就是field
        if (this.selected) {
            //todo 设置particleTarget = this.selected
            //将target广播出去 objectBlur
            this.selected = undefined;
        }
        if (object) {
            this.clicked = object;
            //todo 设置particleTarget = object 将target广播出去 onmousedown

        } else {
            this.mouseField = new Field(this.mouseCoords, this.mouseFieldStrength);
            this.mouseField.size = 0;
            this.fields.push(this.mouseField);
        }

    }

    onMouseUp(evt) {
        var currentObject = this.getObjectAtPoint(this.mouseCoords);
        if (this.mouseField) {
            this.removeField(this.mouseField);
            this.mouseField = undefined;
        } else if (this.clicked) {
            evt.particleTarget = this.clicked;
            if (currentObject === this.clicked) {
                delete this.clicked.moved;
                this.clicked = undefined;
            }
        }
    }

    onMouseMove(evt) {
        this.mouseCoords = new Vector(evt.offsetX || (evt.layerX - this.display.canvas.offsetLeft), evt.offsetY || (evt.layerY - this.display.canvas.offsetTop));
        if (this.mouseField) {
            this.mouseField.moveTo(this.mouseCoords);
        } else if (this.clicked) {
            this.clicked.moved = true;
            this.clicked.moveTo(this.mouseCoords);
        } else { // not over anything
            var object = this.getObjectAtPoint(this.mouseCoords);
            if (this.objectMouseOver !== object) { // if we're over something different
                if (this.objectMouseOver) {         // if we were over something before
                    evt.particleTarget = this.objectMouseOver;
                    this.objectMouseOver = undefined;
                } else {                            // we're in *something* new, even if it's nothing
                    evt.particleTarget = object;
                    this.objectMouseOver = object;
                }
            }
        }
    }

    drawFields() {
        this.fields.forEach((field)=> {
            this.drawCircularObject(field);
        });
    }

    drawEmitters() {
        this.emitters.forEach((emitter)=> {
            this.drawCircularObject(emitter);
        })
    }

    getParticleCount() {
        return this.particles.length;
    }

    getEmitterCount() {
        return this.emitters.length;
    }

    getFieldCount() {
        return this.fields.length;
    }

    getObjectAtPoint(point) {
        var objects = [].concat(this.emitters, this.fields).filter((item)=> {
            return point.withinBounds(item.position, item.size);
        })
        return objects[0];
    }

    drawCircularObject(object) {
        let radius = object.size >> 1;
        this.drawCircle(object.position, radius);
        let grd = this.context.createRadialGradient(
            object.position.x, object.position.y, radius,
            object.position.x, object.position.y, 0
        );
        grd.addColorStop(0, object.drawColor || object.constructor.drawColor);
        grd.addColorStop(1, object.drawColor2 || object.constructor.drawColor2);
        this.context.fillStyle = grd;
        this.context.fill();
    }
    drawParticles() {
        this.context.fillStyle = 'rgba(' + Particle.color.join(',') + ')';
        let size = Particle.size;
        this.particles.forEach((particle)=> {
            let p = particle.position;
            //todo 在这里改变形状
            this.context.fillRect(p.x, p.y, size, size);
        });
    }

    drawAccelerations() {
        this.strokeStyle('red');
        this.context.beginPath();
        this.particles.forEach((particle)=> {
            this.context.moveTo(particle.position.x, particle.position.y);
            this.context.lineTo(particle.position.x + particle.acceleration.x, particle.position.y + particle.acceleration.y);
        });
        this.context.stroke();
    }

    drawVelocities() {
        this.strokeStyle('blue')
        this.context.beginPath();
        this.particles.forEach((particle)=> {
            this.context.moveTo(particle.position.x, particle.position.y)
            this.context.lineTo(particle.position.x + particle.velocity.x, particle.position.y + particle.velocity.y);
        })
        this.context.stroke();
    }

    addNewParticles() {
        if (this.particles.length > this.maxParticles) return;
        this.emitters.forEach((emitter)=> {
            for (var i = 0; i < emitter.emissionRate; i++) {
                this.particles.push(emitter.addParticle());
            }
        });
    }

    plotParticles(boundsX, boundsY) {
        let fields = this.fields;
        removeArray(this.particles,(particle)=>{
            if (particle.ttl > 0 && ++particle.lived >= particle.ttl) return true;
            var p = particle.position;
            if (p.x < 0 || p.x > boundsX || p.y < 0 || p.y > boundsY) return true;
            particle.submitToFields(fields);
            particle.move();
        });
    }

    fromString(string) {
        let versions = {
            Sv1: this.loadStateV1
        };
        let matches = string.match(/^([^(]+)\((.*)\)$/);
        this.particles = [];
        if (matches && matches.length > 3 && versions[matches[1]]) {
            versions[matches[1]].apply(this, [matches[2]]);
        }
    }

    loadStateV1(string) {
        let parts = string.split('|');
        this.maxParticles = parseInt(parts.shift(), 10);
        this.draw.objects = parts.shift() === "1" ? true : false;
        this.draw.accelerations = parts.shift() === "1" ? true : false;
        this.draw.velocities = parts.shift() === "1" ? true : false;
        this.draw.particles = parts.shift() === "1" ? true : false;
        this.emitters = [];
        this.fields = [];
        parts.forEach((objectString) => {
            if (objectString.charAt(0) == "E") this.emitters.push(Emitter.fromString(objectString));
            else this.fields.push(Field.fromString(objectString));
        })
    }
    changeMaxParticle(count){
        this.maxParticles = count;
    }
    updateEmitters(velocity){
        this.emitters.forEach((emitter)=>{
            emitter.updateVelocity(velocity);
        })
    }
}