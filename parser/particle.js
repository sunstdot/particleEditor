/**
 * 粒子json文件解析器
 * Created by sunshitao on 2016/6/8.
 */
var MATH_PROPS = 'E LN10 LN2 LOG2E LOG10E PI SQRT1_2 SQRT2 abs acos asin atan ceil cos exp floor log round sin sqrt tan atan2 pow max min'.split(' ');
var HAS_SKETCH = "__hasSketch";
var M = Math;
var isArray = Array.isArray;
var defaults = {
    fullscreen: true,
    autostart: true,
    autoclear: true,
    autopause: true,
    globals: true
}
var context;
var timer;

//function isArray(object){
//    return Object.prototype.toString.call(object) === '[object Array]';
//}
function isNumber(object) {
    return typeof object === 'number';
}
function extend(target, source, overwrite) {
    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            if (!target.hasOwnProperty(key) || overwrite) {
                target[key] = source[key];
            }
        }
    }
    return target;
}
function hexToRgb(hex) {
    // By Tim Down - http://stackoverflow.com/a/5624139/3493650
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
Object.deepExtend = function (destination, source) {
    var property;
    for (property in source) {
        if (source[property] && source[property].constructor && source[property].constructor === Object) {
            destination[property] = destination[property] || {};
            arguments.callee(destination[property], source[property]);
        } else {
            destination[property] = source[property];
        }
    }
}
function install(context) {
    if (!context[HAS_SKETCH]) {
        for (var i = 0, len = MATH_PROPS.length; i < len; i++)
            context[MATH_PROPS[i]] = M[MATH_PROPS[i]];
        extend(context, {
            TWO_PI: M.PI * 2,
            HALF_PI: M.PI / 2,
            QUARTER_PI: M.PI / 4,
            random: function (min, max) {
                if (!min && !max) {
                    return M.random();
                }
                if (isArray(min))
                    return min[~~(M.random() * min.length)];
                if (!isNumber(max))
                    max = min || 1, min = 0;
                return min + M.random() * (max - min);
            },
            directionRandom:function(r){
                var theta = Math.random()*2*Math.PI;
                return {x:r*Math.cos(theta),y:r*Math.sin(theta)};
            }
        })
    }
}

var pJS = function (tag_id, params, canvas_el) {
    //var canvas_el = document.querySelector('#' + tag_id + '> .particles-js-canvas-el');
    var options = {};
    var context = self;
    /*---------------------sketch start--------------------------*/
    if (defaults.globals) {
        install(context);
    }
    context.canvas = canvas_el;
    options = extend(options || {}, defaults);
    options.element = context.canvas || context;
    extend(context, options, true);
    /*---------------------sketch end--------------------------*/
    this.pJS = {
        canvas: {
            el: canvas_el,
            w: canvas_el.width,
            h: canvas_el.height
        },
        particles: {
            array: []
        },
        fn: {
            interact: {},
            modes: {},
            vendors: {}
        },
        temp: {},
        state:0
    };
    var pJS = this.pJS;
    if (params) {
        Object.deepExtend(pJS, params);
    }

    /*------------------------pJS functions - canvas---------------------------------*/
    pJS.fn.canvasInit = function () {
        pJS.canvas.ctx = canvas_el.getContext("2d");
    }
    pJS.fn.canvasSize = function () {
        //todo
    }
    pJS.fn.canvasPaint = function () {
        pJS.canvas.ctx.fillRect(0, 0, pJS.canvas.w, pJS.canvas.h);
    }
    pJS.fn.canvasClear = function () {
        pJS.canvas.ctx.clearRect(0, 0, pJS.canvas.w, pJS.canvas.h);
    }

    /*------------------------pJS functions - particles---------------------------------*/
    pJS.fn.particle = function (position, color, opacity) {
        this.size = (pJS.particles.size.random ? random(pJS.particles.size.minVal, pJS.particles.size.maxVal) : pJS.particles.size.value);
        if (pJS.particles.size.anim.enable) {
            this.vs = pJS.particles.size.anim.speed / 100;
        }
        /*position*/
        this.position = {};
        this.position.x = position ? position.x : random() * pJS.canvas.w;
        this.position.y = position ? position.y : random() * pJS.canvas.h;

        /*check position into canvas*/
        if (this.position.x > pJS.canvas.w - this.size * 2) this.position.x = pJS.canvas.w - this.size
        else if (this.position.x < this.size * 2) this.position.x = this.position.x + this.size;
        if (this.position.y > pJS.canvas.h - this.size * 2) this.position.y = pJS.canvas.h - this.size
        else if (this.position.y < this.size * 2) this.position.y = this.position.y + this.size;

        /*color*/
        this.color = {};
        if (typeof(color.value) === "object") {
            if (color.value instanceof Array) {
                var color_selected = color.value[pJS.particles.color.value.length * random()];
                this.color = hexToRgb(color_selected);
            } else {
                if (color.value.r != undefined && color.value.g != undefined && color.value.b != undefined) {
                    this.color = {
                        r: color.value.r,
                        g: color.value.g,
                        b: color.value.b
                    }
                }
            }
        } else if (color.value === "random") {
            this.color = {
                r: (M.floor(random() * (255 - 0 + 1)) + 0),
                g: (M.floor(random() * (255 - 0 + 1)) + 0),
                b: (M.floor(random() * (255 - 0 + 1)) + 0)
            }
        } else if (typeof(color.value) === "string") {
            //this.color = hexToRgb(color.value);
            this.color = color.value;
        }
        /*opacity*/
        this.opacity = (pJS.particles.opacity.random ? random() : 1) * pJS.particles.opacity.value;
        /*speed 有主速度对方向随机，没主速度对速度随机*/
        if(pJS.particles.move.speed){
            var speedObj = directionRandom(pJS.particles.move.speed);
            this.speedX = speedObj.x;
            this.speedY = speedObj.y;
        }else{
            this.speedX = pJS.particles.move.speedX + random() * pJS.particles.move.floatSpeedX;
            this.speedY = pJS.particles.move.speedY + random() * pJS.particles.move.floatSpeedY;
        }
        /*life*/
        this.life = pJS.particles.life.value + (pJS.particles.life.random ? random() : 1) * pJS.particles.life.floatLife;
        this.age = 0;
        this.type = pJS.particles.shape.type;
        //todo shape is img
    }

    pJS.fn.particle.prototype.draw = function () {
    }


    pJS.fn.particlesCreate = function (pos) {
        var position = pos || pJS.particles.position;
        var numVal = pJS.particles.number.value || 20;
        for (var i = 0; i < numVal; i++) {
            var tempPos = {};
            tempPos.x = position.x + random() * pJS.entity.property.width;
            tempPos.y = position.y + random() * pJS.entity.property.height;
            pJS.particles.array.push(new pJS.fn.particle(tempPos, pJS.particles.color, pJS.particles.opacity.value));
        }
    }
    pJS.fn.particlesUpdate = function () {
        if(pJS.particles.array.length === 0){
            clearInterval(timer);
        }
        for (var i = 0; i < pJS.particles.array.length; i++) {
            /*the particles*/
            var p = pJS.particles.array[i];
            /*move the particle*/
            if (pJS.particles.move.enable && p) {
                p.position.x += p.speedX;
                p.position.y += p.speedY;
            }

            //todo change opacity status
            /*change size*/
            if (pJS.particles.size.anim.enable) {
                if (p.size < 0) {
                    if (pJS.particles.array.length > 1) {
                        pJS.particles.array[i] = pJS.particles.array[pJS.particles.array.length - 1]
                    }
                    pJS.particles.array.pop();
                }
                p.size -= p.vs;
            }
            /*change life*/
            if (pJS.particles.life.anim.enable) {
                if (p.life < 0) {
                    if (pJS.particles.array.length > 1) {
                        pJS.particles.array[i] = pJS.particles.array[pJS.particles.array.length - 1]
                    }
                    pJS.particles.array.pop();
                }
                p.life -= pJS.particles.life.anim.reduce_life
            }
        }
    }
    pJS.fn.entityDraw = function (pos) {
        var ctx = pJS.canvas.ctx;
        function entityShape() {
            return {
                text: function (pos) {
                    ctx.font = pJS.entity.property.font;
                    ctx.fillStyle = pJS.entity.property.color;
                    ctx.fillText(pJS.entity.property.value, pos.x, pos.y);
                },
                circle:function(pos){
                    var tempPos = {};
                    tempPos.x = pos.x + pJS.entity.property.r;
                    tempPos.y = pos.y + pJS.entity.property.r;
                    ctx.beginPath();
                    ctx.globalCompositeOperation = pJS.entity.property.compositeOperation;
                    ctx.arc(tempPos.x,tempPos.y,pJS.entity.property.r,0,Math.PI*2,true);
                    ctx.fillStyle = pJS.entity.property.color;
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
        ctx.save();
        var position = pos || pJS.entity.position;
        entityShape()[pJS.entity.shape.type](position);
        ctx.restore();
    }
    pJS.fn.particlesDraw = function () {
        /* update each particles param */
        pJS.fn.particlesUpdate();
        function particleShape(type) {
            if (!type) {
                type = 'circle';
            }
            var method = {
                circle: function (ctx, p) {
                    if(p.size < 0) return;
                    if (typeof p.color === "string") {
                        var rgb = {r: 255, g: 185, b: 15};
                        var gradient = ctx.createRadialGradient(p.position.x, p.position.y, 0, p.position.x, p.position.y, p.size);
                        gradient.addColorStop(0, "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + p.opacity + ")");
                        gradient.addColorStop(0.5, "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + p.opacity + ")");
                        gradient.addColorStop(1, "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ",0)");
                        ctx.fillStyle = gradient;
                    } else {
                        var alpha = 1 - p.age / p.life;
                        ctx.fillStyle = "rgba("
                            + Math.floor(p.color.r * 255) + ","
                            + Math.floor(p.color.g) + ","
                            + Math.floor(p.color.b) + ","
                            + alpha.toFixed(2) + ")";
                    }

                    ctx.beginPath();
                    ctx.globalCompositeOperation = pJS.particles.property.compositeOperation;
                    ctx.arc(p.position.x, p.position.y, p.size, 0, 2 * Math.PI, true);
                    ctx.closePath();
                    ctx.fill();
                },
                square: function (ctx, p) {
                    var alpha = 1 - p.age / p.life;
                    if (typeof p.color === "string") {
                        ctx.fillStyle = p.color;
                    } else {
                        ctx.fillStyle = "rgba("
                            + Math.floor(p.color.r * 255) + ","
                            + Math.floor(p.color.g) + ","
                            + Math.floor(p.color.b) + ","
                            + alpha.toFixed(2) + ")";
                    }
                    ctx.fillRect(p.position.x, p.position.y, p.size.width, p.size.height);
                },
                text: function (ctx, p) {
                    if (typeof p.color === "string") {
                        ctx.fillStyle = p.color;
                    } else {
                        ctx.fillStyle = "rgba("
                            + Math.floor(p.color.r * 255) + ","
                            + Math.floor(p.color.g) + ","
                            + Math.floor(p.color.b) + ","
                            + alpha.toFixed(2) + ")";
                    }
                }
            };
            return method[type];
        }

        for (var i = 0; i < pJS.particles.array.length; i++) {
            var p = pJS.particles.array[i];
            var type = p.type || "circle";
            particleShape(type)(pJS.canvas.ctx, p);
        }
    }
    pJS.fn.particlesEmpty = function () {
        pJS.particles.array = [];
    }
    pJS.fn.particleRefresh = function () {
        /* init all */
        pJS.fn.particlesEmpty();
        pJS.fn.canvasClear();
        /* restart */
        pJS.fn.vendors.start();
    }

    /* -------------------------pJS functions vendors---------------------------------- */
    pJS.fn.vendors.init = function(){
        /* init canvas + particles */
        pJS.fn.canvasInit();
        pJS.fn.canvasSize();
        pJS.fn.canvasPaint();
        pJS.fn.particlesCreate();
    }
    pJS.fn.vendors.draw = function(){
        if(pJS.state != 1){
            pJS.fn.canvasClear();
        }
        if(pJS.state === 0){
            pJS.state = pJS.entity.property.state;
            pJS.fn.entityDraw();
        }else if(pJS.state === 2){
            pJS.state = 1;
        }
        if(pJS.particles.property.await){
            setTimeout(function(){
                if(pJS.state === 1){
                    pJS.state = pJS.particles.property.state;
                    pJS.particles.property.await = false;
                    pJS.fn.particlesDraw();
                }
            },pJS.particles.property.awaitTime)
        }else{
            if(pJS.state === 1){
                pJS.state = pJS.particles.property.state;
                pJS.fn.particlesDraw();
            }
        }
        //是否重复发射粒子
        if(pJS.particles.property.repeat){
            pJS.fn.particlesCreate();
        }
        //if(!pJS.particles.move.enable){
        //    cancelRequestAnimFrame(pJS.fn.drawAnimFrame)
        //}else{
        //    pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
        //}
    }
    pJS.fn.vendors.checkBeforeDraw = function(){
        pJS.fn.vendors.init();
        timer = setInterval(function(){
            pJS.fn.vendors.draw();
        },100)
    }
    pJS.fn.vendors.start = function(){
        pJS.fn.vendors.checkBeforeDraw();
    }
    pJS.fn.vendors.start();
}


/* ---------- global functions - vendors ------------ */
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();
window.cancelRequestAnimFrame = ( function() {
    return window.cancelAnimationFrame         ||
        window.webkitCancelRequestAnimationFrame ||
        window.mozCancelRequestAnimationFrame    ||
        window.oCancelRequestAnimationFrame      ||
        window.msCancelRequestAnimationFrame     ||
        clearTimeout
} )();

/* ---------- particles.js functions - start ------------ */

window.pJSDom = [];
window.particlesJS = function (tag_id, params) {
    //if tag_id isn't a string
    if (typeof tag_id !== 'string') {
        params = tag_id;
        tag_id = 'particle-js';
    }
    if (!tag_id) {
        tag_id = 'particle-js';
    }
    var pJS_tag = document.getElementById(tag_id),
        pJS_canvas_class = 'particles-js-canvas-el',
        exist_canvas = pJS_tag.getElementsByTagName(pJS_canvas_class);
    if (exist_canvas.length) {
        while (exist_canvas.length) {
            pJS_tag.removeChild(exist_canvas[0]);
        }
    }
    //create canvas element
    var canvas_el = document.createElement('canvas');

    /*set size canvas*/
    canvas_el.width = pJS_tag.offsetWidth -15;
    canvas_el.height = pJS_tag.offsetHeight-15;

    /*append canvas*/
    pJS_tag.appendChild(canvas_el);
    if (pJS_tag != null) {
        pJSDom.push(new pJS(tag_id, params,canvas_el));
    }
}
