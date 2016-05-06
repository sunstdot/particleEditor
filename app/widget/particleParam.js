/**
 * 提供粒子控制所需要的操作
 * Created by sunshitao on 2016/5/6.
 */
import vector2 from "../vector2"

export function direction(){
    let theta = Math.random()*2*Math.PI;
    return new vector2(Math.cos(theta),Math.sin(theta));
}
export function negateDirection(direct){
    return vector2.negate(direct);
}
export function sampleDirection(r){
    if(!r) {
        r = 1;
    }
    let theta = Math.random()*2*Math.PI;
    return new vector2(r*Math.cos(theta),r*Math.sin(theta));
}
export function sampleNum(num1,num2){
    let t = Math.random();
    return num1*t+num2*(1-t);
}
export function sampleColor(color1,color2){
    let t = Math.random();
    return color1.multiply(t).add(color2.multiply(1-t));
}