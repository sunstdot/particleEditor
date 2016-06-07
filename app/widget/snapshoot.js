/**
 * Created by sunshitao on 2016/5/13.
 */
import particleMethod from './particleMethod'
import {isArray} from '../util'
import {changePos} from './particleMethod'
let samplingTimer;
let samplingTime = 1000;
let recordData = {};
var samplingTarget;

export function Sampling(target){
    this.record = false;
    this.target = target;
}

Sampling.prototype.update = function(pos){
    samplingTarget = this.target;
    if(isArray(pos)){
        changePos(pos);
    }
}

export function startRecord(){
    recordData = {};  //置空对象
    var name = 0;
    samplingTimer = setInterval(function(){
        if(samplingTarget){
            var x = samplingTarget.position[0];
            var y = samplingTarget.position[1];
            recordData[name] = [x,y];
            name +=samplingTime;
        }
    },samplingTime);
}

export function stopRecord(){
    clearInterval(samplingTimer)
}

export function clearRecord(){
    this.recordData = {}; // 清空对象
}

export function getRecordData(){
    return recordData;
}