/**
 * Created by sunshitao on 2016/6/3.
 */

import {toArray,isArray,def} from "./util"
import {Sampling} from "./widget/snapshoot"
import {arrayMethods} from './util/array'

const arrayKeys = Object.getOwnPropertyNames(arrayMethods)

export function Dep(){
    this.subs = [];
}

Dep.prototype.addSub = function (subs){
    this.subs.push(subs);
}
Dep.prototype.removeSub = function(subs){
    this.subs.remove(subs);
}
Dep.prototype.notify = function(pos){
    var subs = toArray(this.subs);
    for(var i=0,len=subs.length;i<len;i++){
        subs[i].update(pos);
    }
}

const hasProto = '__proto__' in {}
/**
 * augment the target object or array by intercepting
 * the proto chain
 */
function protoAugment(target,src){
    target.__proto__ = src;
}
function copyAugment(target,src,keys){
    for(var i=0,len=keys.length;i<len;i++){
        var key = keys[i];
        def(target,key,src[key]);
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

    if(isArray(val)){
        var argument = hasProto ? protoAugment : copyAugment;
        argument(val,arrayMethods,arrayKeys);
        Object.keys(val).forEach(function(key,index){
            let val1 = val[key];
            Object.defineProperty(val,key,{
                enumerable:true,
                configurable:true,
                get:function reactiveGetter(){
                    var value = getter ? getter.call(obj) : val1;
                    return value;
                },
                set:function reactiveSetter(newVal){
                    var value = getter ? getter.call(obj) : val1;
                    if(value === newVal){
                        return;
                    }
                    if(setter){
                        setter.call(obj,newVal);
                    }else{
                        val1 = newVal;
                    }
                    dep.notify(this);
                }
            })
        })
    }else{
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
                dep.notify(this);
            }
        })
    }
}