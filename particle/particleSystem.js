/**
 * Created by sunst on 2016/1/6.
 */
function ParticleSystem(){
    //private fields
    var that = this;
    var particles = new Array();

    //public fields
    this.gravity = new vector2(0,100);
    this.effectors = new Array();
}