/**
 * Created by sunshitao on 2016/1/7.
 */
//检测粒子超过范围就反方向相应速度
function ChamberBox(x1,y1,x2,y2){
    this.apply=function(particle){
        if((particle.position.x - particle.size)< x1 || (particle.position.x + particle.size > x2)){
            particle.velocity.x = -particle.velocity.x;
        }
        if((particle.position.y - particle.size) < y1 || (particle.position.y+particle.size) > y2){
            particle.velocity.y = -particle.velocity.y;
        }
    }
}