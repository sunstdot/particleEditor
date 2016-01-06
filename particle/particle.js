/**
 * Created by sunst on 2016/1/6.
 */
Particle = function(postion,velocity,life,color,size){
    this.position = position;
    this.velocity = velocity;
    this.accelerator = vector2(0,0);
    this.age = 0;
    this.life = life;
    this.color = color;
    this.size = size;
};