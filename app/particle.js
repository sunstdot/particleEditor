/**
 * Created by sunst on 2016/1/6.
 */
define(function(require, exports, module){
    //构造函数和原型模式一起使用
    var vector2 = require("./vector2");
    var Particle = function(position,velocity,life,color,size,type){
        this.position = position;
        this.velocity = velocity;
        this.acceleration = new vector2(0,0);
        this.age = 0;
        this.life = life;
        this.color = color;
        this.size = size;
        this.type = type || '';
    };

    //设置粒子的setter和getter方法
    Particle.prototype = {
        setter:function(key,value){
            this[key] = value;
        },
        getter:function(key){
            return this[key];
        }
    };

    module.exports = Particle;
});