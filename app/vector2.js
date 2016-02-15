/**
 * Created by sunst on 2016/1/6.
 */
var vector2 = function(x,y){
    this.x = x;
    this.y = y;
};
vector2.prototype = {
    copy:function(){return new vector2(this.x,this.y)},
    length:function(){return Math.sqrt(this.x*this.x+this.y*this.y)},
    sqrtLength:function(){return (this.x*this.x+this.y*this.y)},
    normalize:function(){var inv = this.length();return new vector2(this.x*inv,this.y*inv)},
    negate:function(){return new vector2(-this.x,-this.y)},
    add:function(v){return new vector2(this.x+ v.x,this.y+ v.y)},
    substract:function(v){return new vector2(this.x- v.x,this.y- v.y)},
    multiply:function(f){return new vector2(this.x* f,this.y* f)},
    divide:function(f){var invf = 1/f;return new vector2(this.x*invf,this.y*invf)},
    dot:function(v){return new vector2(this.x* v.x,this.y* v.y)}
};

vector2.prototype.mod = function(){
    return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2));
}


vector2.zero = new vector2(0,0);