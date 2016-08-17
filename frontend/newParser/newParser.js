var Vector = function(x,y){
    this.x = x;
    this.y = y;
}
Vector.prototype.getMagnitude=function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
}

Vector.prototype.multiply=function(scaleFactor) {
    this.x *= scaleFactor;
    this.y *= scaleFactor;
}

Vector.prototype.add=function(vector) {
    this.x += vector.x;
    this.y += vector.y;
}

Vector.prototype.vectorTo=function(vector) {
    return new Vector(vector.x - this.x, vector.y - this.y);
}

Vector.prototype.withinBounds=function(point, size) {
    let radius = ~~(size / 2) + 1;
    return this.x >= point.x - radius &&
        this.x <= point.x + radius &&
        this.y >= point.y - radius &&
        this.y <= point.y + radius;
}
//根据象限获取点到圆点的线与x正向轴所成的角度
Vector.prototype.getAngle=function() {
    let offset = 0;
    let ratio = 0;
    if (this.x > 0) {
        if (this.y > 0) {
            offset = 0;
            ratio = this.y / this.x;
        } else {
            offset = 3 * Math.PI / 2;
            ratio = this.x / this.y;
        }
    } else {
        if (this.y > 0) {
            offset = Math.PI / 2;
            ratio = this.x / this.y;
        } else {
            offset = Math.PI;
            ratio = this.y / this.x;
        }
    }
    return Math.atan(Math.abs(ratio)) + offset;
}

Vector.prototype.getAngleDegrees=function() {
    return this.getAngle() * 180 / Math.PI;
}

Vector.prototype.jitter=function(jitterAmount) {
    return new Vector(this.x + this.x * jitterAmount * Math.random(),
        this.y + this.y * jitterAmount * Math.random())
}

Vector.prototype.toString=function() {
    return this.x.toFixed(3).replace(/\.?0+$/, '') + ',' + this.y.toFixed(3).replace(/\.?0+$/, '');
}
Vector.fromAngle = (angle, magnitude)=> {
    return new Vector(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
}
Vector.fromString = (str)=> {
    let parts = str.split(",");
    return new Vector(parts[0], parts[1]);
}

var Particle = function(point,velocity){
    this.position     = point;
    this.velocity     = velocity;
    this.acceleration = new Vector(0,0);
    this.ttl          = -1;
    this.lived        = 0;
}
Particle.prototype.submitToFields=function(fields){
    var totalAccelerationX = 0;
    var totalAccelerationY = 0;
    fields.map((field)=>{
        // inlining what should be Vector object methods for performance reasons
        var vectorX = field.position.x - this.position.x;
        var vectorY = field.position.y - this.position.y;
        var force = field.mass / Math.pow((vectorX*vectorX+field.mass/2+vectorY*vectorY+field.mass/2),1.5);
        totalAccelerationX += vectorX * force;
        totalAccelerationY += vectorY * force;
    });
    this.acceleration = new Vector(totalAccelerationX,totalAccelerationY);
}
Particle.prototype.move=function(){
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
}
Particle.prototype.drawVariable=function(pixels,width,height){
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
Particle.prototype.drawBasic=function(pixels,width,height) {
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
Particle.prototype.drawSoft=function(pixels,width,height) {
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
Particle.prototype.draw=function(){
    this.drawBasic();
}
Particle.prototype.circle=function(context,pos,size){
    context.beginPath();
    context.arc(pos.x,pos.y,size,0,2*Math.PI,true);
    context.fill();
}
Particle.prototype.square=function(context,pos,size){
    context.fillRect(pos.x, pos.y, size, size);
}
Particle.prototype.fixPointStar=function(context,pos,size){
    function degreeToRaidus(degree)
    {
        return degree*Math.PI/180;
    }
    context.beginPath();//创建路径
    var pos1 = {
        x:pos.x+size*Math.cos(degreeToRaidus(18)),
        y:pos.y-size*Math.sin(degreeToRaidus(18))
    };
    var pos2 = {
        x:pos.x,
        y:pos.y-size
    };
    var pos3 = {
        x:pos.x-size*Math.cos(degreeToRaidus(18)),
        y:pos.y-size*Math.sin(degreeToRaidus(18))
    };
    var pos4 = {
        x:pos.x-size*Math.cos(degreeToRaidus(54)),
        y:pos.y+size*Math.sin(degreeToRaidus(54))
    };
    var pos5 = {
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
Particle.size = 2;
Particle.color = [66,167,222,255];
Particle.drawFunctions = ['Basic','Soft','Variable'];
Particle.changeColor = (color)=>{
    Particle.color = color;
};

var Emitter = function(point,velocity){
    this.position     = point;
    this.velocity     = velocity;
    this.size         = 15;
    this.particleLife = -1;
    this.spread       = Math.PI / 32;
    this.emissionRate = 4;
    this.type = "emitter";
    this.drawType = "fixPointStar";
}
Emitter.prototype.moveTo=function(point){
    this.position = point;
}
Emitter.prototype.addParticle=function(){
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
Emitter.prototype.toString=function(){
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
Emitter.prototype.updateVelocity=function(velocity){
    this.velocity = velocity;
}
Emitter.prototype.updateSpread=function(spread){
    this.spread = spread;
}
Emitter.prototype.updateDrawType=function(type){
    this.drawType = type;
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


var Field = function(point, mass){
    this.position = point;
    this.size = 15;
    this.mass = 0;
    this.drawColor = '#b00';
    this.type = "field";
    this.setMass(mass);
}
Field.prototype.setMass=function(mass) {
    this.mass = mass;
    this.drawColor = mass < 0 ? "#f00" : "#0f0";
    return this;
}

Field.prototype.moveTo=function(point) {
    this.position = point;
}

Field.prototype.toString=function() {
    let coreAttributes = [
        this.position.toString(),
        this.mass
    ];
    return 'F' + coreAttributes.join(':');
}
Field.fromString = (string) => {
    let parts = string.substr(1).split(':');
    let field = new Field(Vector.fromString(parts.shift()),parseInt(parts.shift(),10));
    return field;
}
Field.drawColor = "#0000FF";
Field.drawColor2 = "#000000";

var Display = function(canvas){
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
};
Display.prototype.init = function(){
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
};
//display field
Display.prototype.main = function() {
    stats.begin();
    if (!this.paused) this.nextFrame();
    requestAnimationFrame(this.main.bind(this));
    stats.end();
}

Display.prototype.nextFrame = function() {
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

Display.prototype.drawLine = function(startPoint, endPoint) {
    this.context.beginPath();
    this.context.moveTo(startPoint.x, startPoint.y);
    this.context.lineTo(endPoint.x, endPoint.y);
    this.context.stroke();
}

Display.prototype.drawText = function(txt, point, width) {
    this.context.fillText(txt, point.x, point.y, width);
}

Display.prototype.drawCircle = function(point, radius) {
    this.context.beginPath();
    this.context.arc(point.x, point.y, radius, 0, Math.PI * 2);
    this.context.closePath();
    this.context.stroke();
}

Display.prototype.fillStyle  =function(fill) {
    this.context.fillStyle = fill;
}

Display.prototype.strokeStyle=function(fill) {
    this.context.strokeStyle = fill;
}

Display.prototype.tick = function() {
    this.numFrames++;
}

Display.prototype.clear=function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Display.prototype.stop= function() {
    this.paused = true;
}

Display.prototype.start= function() {
    this.paused = false;
}

Display.prototype.togglePaused= function() {
    this.paused = !this.paused;
}

Display.prototype.step= function() {
    this.stop();
    this.nextFrame();
}

//particle field
Display.prototype.addEmitter= function(point, velocity) {
    var emitter = new Emitter(point, velocity);
    this.emitters.push(emitter);
}

Display.prototype.addField= function(point, mass) {
    var field = new Field(point, mass);
    this.fields.push(field);
}

Display.prototype.removeEmitter= function(index) {
    this.emitters.splice(index, 1);
}

Display.prototype.removeField= function(index) {
    this.fields.splice(index, 1);
}

Display.prototype.beforeUpdate= function() {
    if (this.draw.accelerations) {
        this.drawAccelerations();
    }
    if (this.draw.velocities) {
        this.drawVelocities();
    }
}

Display.prototype.update= function() {
    this.elapsed++;
    this.addNewParticles();
    this.plotParticles(this.canvas.width, this.canvas.height);  //图
}

Display.prototype.afterUpdate= function() {
    //something will do
}

Display.prototype.beforeDraw= function() {
    //something will do
}

Display.prototype.onDraw= function() {
    if (this.draw.particles) {
        this.drawParticles();
    }
    if (this.draw.objects) {
        this.drawEmitters();
        this.drawFields();
    }
}

Display.prototype.afterDraw= function() {
    if (this.draw.info) {
        this.fillStyle("white");
        this.drawText("Particles:" + this.getParticleCount(), new Vector(100, this.height - 100), 100)
    }
}

Display.prototype.onMouseDown= function(evt) {
    var object = this.getObjectAtPoint(this.mouseCoords); //object不是 emitter就是field
    var item;
    //if (this.selected) {
    //    //todo 设置particleTarget = this.selected
    //    //将target广播出去 objectBlur
    //    this.selected = undefined;
    //}

    if (object) {
        this.clicked = object;
        //todo 设置particleTarget = object 将target广播出去 onmousedown
        item = {
            type:object.type,
            object
        };
        this.selected = object;
    }else{
        item = {
            type:"",
            object
        };
        this.selected = "";
    }
    store.dispatch(store.actions.entity.chooseEntity(item));
}

Display.prototype.onMouseUp= function(evt) {
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

Display.prototype.onMouseMove= function(evt) {
    this.mouseCoords = new Vector(evt.offsetX || (evt.layerX - this.canvas.offsetLeft), evt.offsetY || (evt.layerY - this.canvas.offsetTop));
    if (this.mouseField) {
        this.mouseField.moveTo(this.mouseCoords);


    } else if (this.clicked) {
        this.clicked.moved = true;
        this.clicked.moveTo(this.mouseCoords);
        var item={
            type:this.clicked.type,
            pos:this.mouseCoords
        }
        store.dispatch(store.actions.entity.updateEntityPos(item));
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

Display.prototype.drawFields= function() {
    this.fields.forEach((field)=> {
        this.drawCircularObject(field);
    });
}

Display.prototype.drawEmitters= function() {
    this.emitters.forEach((emitter)=> {
        this.drawCircularObject(emitter);
    })
}

Display.prototype.getParticleCount= function() {
    return this.particles.length;
}

Display.prototype.getEmitterCount= function() {
    return this.emitters.length;
}

Display.prototype.getFieldCount= function() {
    return this.fields.length;
}

Display.prototype.getObjectAtPoint= function(point) {
    var objects = [].concat(this.emitters, this.fields).filter((item)=> {
        return point.withinBounds(item.position, item.size);
    })
    return objects[0];
}

Display.prototype.drawCircularObject= function(object) {
    var radius = object.size >> 1;
    this.drawCircle(object.position, radius);
    var grd = this.context.createRadialGradient(
        object.position.x, object.position.y, radius,
        object.position.x, object.position.y, 0
    );
    grd.addColorStop(0, object.drawColor || object.constructor.drawColor);
    grd.addColorStop(1, object.drawColor2 || object.constructor.drawColor2);
    this.context.fillStyle = grd;
    this.context.fill();
}
Display.prototype.drawParticles= function() {
    this.context.fillStyle = 'rgba(' + Particle.color.join(',') + ')';
    var size = Particle.size;
    this.particles.forEach((particle)=> {
        var p = particle.position;
        //todo 在这里改变形状
        //this.context.fillRect(p.x, p.y, size, size);
        if(!particle[Particle.type]){
            Particle.type = 'square';
        }
        particle[Particle.type](this.context,p,size);
    });
}

Display.prototype.drawAccelerations= function() {
    this.strokeStyle('red');
    this.context.beginPath();
    this.particles.forEach((particle)=> {
        this.context.moveTo(particle.position.x, particle.position.y);
        this.context.lineTo(particle.position.x + particle.acceleration.x, particle.position.y + particle.acceleration.y);
    });
    this.context.stroke();
}

Display.prototype.drawVelocities= function() {
    this.strokeStyle('blue')
    this.context.beginPath();
    this.particles.forEach((particle)=> {
        this.context.moveTo(particle.position.x, particle.position.y)
        this.context.lineTo(particle.position.x + particle.velocity.x, particle.position.y + particle.velocity.y);
    });
    this.context.stroke();
}

Display.prototype.addNewParticles= function() {
    if (this.particles.length > this.maxParticles) return;
    this.emitters.forEach((emitter)=> {
        for (var i = 0; i < emitter.emissionRate; i++) {
            this.particles.push(emitter.addParticle());
        }
    });
}

Display.prototype.plotParticles= function(boundsX, boundsY) {
    var fields = this.fields;
    removeArray(this.particles,(particle)=>{
        if (particle.ttl > 0 && ++particle.lived >= particle.ttl) return true;
        var p = particle.position;
        if (p.x < 0 || p.x > boundsX || p.y < 0 || p.y > boundsY) return true;
        particle.submitToFields(fields);
        particle.move();
    });
}

Display.prototype.fromString= function(string) {
    var versions = {
        Sv1: this.loadStateV1
    };
    var matches = string.match(/^([^(]+)\((.*)\)$/);
    this.particles = [];
    if (matches && matches.length === 3 && versions[matches[1]]) {
        versions[matches[1]].apply(this, [matches[2]]);
    }
}

Display.prototype.loadStateV1= function(params) {

    this.maxParticles = parseInt(params.maxParticle, 10);
    this.draw.objects = params.objects === "1" ? true : false;
    this.draw.accelerations = params.accelerations === "1" ? true : false;
    this.draw.velocities = params.velocities === "1" ? true : false;
    this.draw.particles = params.particles === "1" ? true : false;
    this.emitters = [];
    this.fields = [];
    var self = this;
    if(params.emitters.length>0){
        params.emitters.forEach(function(item){
            var emitter = new Emitter();
            emitter.position     = new Vector(parseInt(item.position.x,10), parseInt(item.position.y,10));
            emitter.velocity     = new Vector(parseFloat(item.velocity.x), parseFloat(item.velocity.y));
            emitter.size         = parseInt(item.size,10);
            emitter.particleLife = parseInt(item.particleLife,10);
            emitter.spread       = parseFloat(item.spread);
            emitter.emissionRate = parseInt(item.emissionRate,10);
            self.emitters.push(emitter);
        })
    }
    if(params.fields.length>0){
        params.fields.forEach(function(item){
            var field = new Field(new Vector(parseInt(item.position.x,10),parseInt(item.position.y,10)),parseInt(item.mass,10));
            self.fields.push(field);
        })
    }
}
Display.prototype.changeMaxParticle= function(count){
    this.maxParticles = count;
}
Display.prototype.updateEmitters= function(velocity){
    this.emitters.forEach((emitter)=>{
        emitter.updateVelocity(velocity);
    })
}
Display.prototype.updateSelectedObject = function(obj){
    if(this.selected){
        for(var key in obj){
            if(this.selected.hasOwnProperty(key)){
                this.selected[key] = obj[key];
            }
        }
    }
}
var requestAnimationFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function( callback ){
        window.setTimeout(callback, 1000 / 60);
    };

var stats = new Stats();

stats.setMode(0); // 0: fps, 1: ms
// Align top-left
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';



window.particlesJS = function(tag_id, params){
    var pJS_tag = document.getElementById(tag_id);
    //create canvas element
    var canvas_el = document.createElement('canvas');
    document.body.appendChild( stats.domElement );
    /*set size canvas*/
    canvas_el.width = pJS_tag.offsetWidth -15;
    canvas_el.height = pJS_tag.offsetHeight-15;
    pJS_tag.appendChild(canvas_el);
    var display = new Display(canvas_el);
    display.draw.continuous = params.continuous === '1' ? true : false;
    if (params.color) Particle.changeColor(params.color);
    Particle.size = params.size || 2;
    display.loadStateV1(params);
    display.init();
    display.clear();
    display.start();
};