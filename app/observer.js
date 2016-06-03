/**
 * Created by sunshitao on 2016/6/3.
 */

import toArray from "./util"
import {Sampling} from "./widget/snapshoot"

export function Dep(){
    this.subs = [];
}

Dep.prototype.addSub = function (subs){
    this.subs.push(subs);
}
Dep.prototype.removeSub = function(subs){
    this.subs.remove(subs);
}
Dep.prototype.notify = function(){
    var subs = toArray(this.subs);
    for(var i=0,len=subs.length;i<len;i++){
        subs[i].update();
    }
}

export function defineReactive(obj,key,val){
    var dep = new Dep();
    var property = Object.getOwnPropertyDescriptor(obj,key);
    if(property && property.configurable === false){
        return;
    }
    var setter = property && property.setter;
    var getter = property && property.getter;
    var sampling = new Sampling(obj);
    dep.addSub(sampling);
    Object.defineProperty(obj,key,{
        enumerable:true,
        configurable:true,
        get:function reactiveGetter(){
            var value = getter ? getter.call(obj) : val;
            return value;
        },
        set:function reactiveSetter(newVal){
            var value = getter ? getter.call(obj) : val;
            if(value === newVal){
                return;
            }
            if(setter){
                setter.call(obj,newVal);
            }else{
                val = newVal;
            }
            dep.notify();
        }
    })
}