/**
 * Created by sunshitao on 2016/5/13.
 */
let samplingTimer;
let samplingTime = 1000;

export function Sampling(target){
    this.recordData = {};
    this.record = false;
    this.target = target;
}

Sampling.prototype.update = function(){
    console.log("position has changed");
}


export function startRecord(){
    this.recordData = {};  //置空对象
    samplingTimer = setInterval(function(){
        var name = (new Date()).getTime();
        this.recordData[name] = this.target.position;
    },samplingTime);
}

export function stopRecord(){
    clearInterval(samplingTimer);
}

export function clearRecord(){
    this.recordData = {}; // 清空对象
}