/**
 * 粒子json文件解析器
 * Created by sunshitao on 2016/6/8.
 */
var MATH_PROPS = 'E LN10 LN2 LOG2E LOG10E PI SQRT1_2 SQRT2 abs acos asin atan ceil cos exp floor log round sin sqrt tan atan2 pow max min'.split(' ');
var HAS_SKETCH = "__hasSketch";
var M = Math;
var isArray = Array.isArray;
var defaults = {
    fullscreen:true,
    autostart:true,
    autoclear:true,
    autopause:true,
    globals:true
}
var context;

//function isArray(object){
//    return Object.prototype.toString.call(object) === '[object Array]';
//}
function isNumber(object){
    return typeof object === 'number';
}
function extend(target,source,overwrite){
    for(var key in source){
        if(source.hasOwnProperty(key)){
            if(!target.hasOwnProperty(key) || overwrite){
                target[key] = source[key];
            }
        }
    }
    return target;
}
function install(context){
    if(!context[HAS_SKETCH]){
        for(var i=0,len=MATH_PROPS.length;i<len;i++)
            context[MATH_PROPS[i]] = M[MATH_PROPS[i]];
        extend(context,{
            TWO_PI:M.PI*2,
            HALF_PI:M.PI/2,
            QUARTER_PI:M.PI/4,
            random:function(min,max){
                if(isArray(min))
                    return min[~~(M.random()*min.length)];
                if(!isNumber(max))
                    max = min || 1,min = 0;
                return min + M.random()*(max-min);
            }
        })
    }
}

function constructor(context){

}

var pJS = function (tag_id,params,options){
    var canvas_el = document.querySelector('#'+tag_id+'> .particles-js-canvas-el');
    var context = self;
    /*---------------------sketch start--------------------------*/
    if(defaults.globals){
        install(context);
    }
    context.canvas = canvas_el;
    options = extend(options || {},defaults);
    options.element = context.canvas || context;
    extend(context,options,true);
    constructor(context);
    /*---------------------sketch end--------------------------*/

    var pJS = params;


}

/* ---------- particles.js functions - start ------------ */
window.pJSDom = [];
window.particlesJS = function(tag_id,params){
    //if tag_id isn't a string
    if(typeof tag_id !== 'string'){
        params = tag_id;
        tag_id = 'particle-js';
    }
    if(!tag_id){
        tag_id='particle-js';
    }
    var pJS_tag = document.getElementById(tag_id),
        pJS_canvas_class = 'particles-js-canvas-el',
        exist_canvas = pJS_tag.getElementsByTagName(pJS_canvas_class);
    if(exist_canvas.length){
        while(exist_canvas.length){
            pJS_tag.removeChild(exist_canvas[0]);
        }
    }
    //create canvas element
    var canvas_el = document.createElement('canvas');
    canvas_el.className = pJS_canvas_class;

    /*set size canvas*/
    canvas_el.style.width = '100%';
    canvas_el.style.height = '100%';

    /*append canvas*/
    pJS_tag.appendChild(canvas_el);
    if(pJS_tag != null){
        pJSDom.push(new pJS(tag_id,params));
    }
}
