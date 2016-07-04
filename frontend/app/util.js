/**
 * 提供内部接口供调用
 * Created by sunshitao on 2016/1/18.
 */
var ArrayProto = Array.prototype;
var nativeForEach = ArrayProto.forEach;
var nativeMap = ArrayProto.map;
var nativeFilter = ArrayProto.filter;

// 用于处理merge时无法遍历Date等对象的问题
var BUILTIN_OBJECT = {
    '[object Function]': 1,
    '[object RegExp]': 1,
    '[object Date]': 1,
    '[object Error]': 1,
    '[object CanvasGradient]': 1
};

var objToString = Object.prototype.toString;

export function isDom(obj) {
    return obj && obj.nodeType === 1
        && typeof(obj.nodeName) == 'string';
}

/**
 * 对一个object进行深度拷贝
 * @memberOf module:zrender/tool/util
 * @param {*} source 需要进行拷贝的对象
 * @return {*} 拷贝后的新对象
 */
export function clone(source) {
    if (typeof source == 'object' && source !== null) {
        var result = source;
        if (source instanceof Array) {
            result = [];
            for (var i = 0, len = source.length; i < len; i++) {
                result[i] = clone(source[i]);
            }
        }
        else if (
            !BUILTIN_OBJECT[objToString.call(source)]
                // 是否为 dom 对象
            && !isDom(source)
        ) {
            result = {};
            for (var key in source) {
                if (source.hasOwnProperty(key)) {
                    result[key] = clone(source[key]);
                }
            }
        }

        return result;
    }

    return source;
}

export function mergeItem(target, source, key, overwrite) {
    if (source.hasOwnProperty(key)) {
        var targetProp = target[key];
        if (typeof targetProp == 'object'
            && !BUILTIN_OBJECT[objToString.call(targetProp)]
                // 是否为 dom 对象
            && !isDom(targetProp)
        ) {
            // 如果需要递归覆盖，就递归调用merge
            merge(
                target[key],
                source[key],
                overwrite
            );
        }
        else if (overwrite || !(key in target)) {
            // 否则只处理overwrite为true，或者在目标对象中没有此属性的情况
            target[key] = source[key];
        }
    }
}

/**
 * 合并源对象的属性到目标对象
 * @memberOf module:zrender/tool/util
 * @param {*} target 目标对象
 * @param {*} source 源对象
 * @param {boolean} overwrite 是否覆盖
 */
export function merge(target, source, overwrite) {
    for (var i in source) {
        mergeItem(target, source, i, overwrite);
    }

    return target;
}

var _ctx;

/**
 * @memberOf module:zrender/tool/util
 * @param {Array} arr
 * @param {*} obj
 */
export function indexOf (arr, obj) {
    var i = arr.length
    while (i--) {
        if (arr[i] === obj) return i
    }
    return -1
}

/**
 * 构造类继承关系
 * @memberOf module:zrender/tool/util
 * @param {Function} clazz 源类
 * @param {Function} baseClazz 基类
 */
export function inherits(clazz, baseClazz) {
    var clazzPrototype = clazz.prototype;

    function F() {
    }

    F.prototype = baseClazz.prototype;
    clazz.prototype = new F();

    for (var prop in clazzPrototype) {
        clazz.prototype[prop] = clazzPrototype[prop];
    }
    clazz.constructor = clazz;
}

/**
 * 数组或对象遍历
 * @memberOf module:zrender/tool/util
 * @param {Object|Array} obj
 * @param {Function} cb
 * @param {*} [context]
 */
export function each(obj, cb, context) {
    if (!(obj && cb)) {
        return;
    }
    if (obj.forEach && obj.forEach === nativeForEach) {
        obj.forEach(cb, context);
    }
    else if (obj.length === +obj.length) {
        for (var i = 0, len = obj.length; i < len; i++) {
            cb.call(context, obj[i], i, obj);
        }
    }
    else {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                cb.call(context, obj[key], key, obj);
            }
        }
    }
}

/**
 * 数组映射
 * @memberOf module:zrender/tool/util
 * @param {Array} obj
 * @param {Function} cb
 * @param {*} [context]
 * @return {Array}
 */
export function map(obj, cb, context) {
    if (!(obj && cb)) {
        return;
    }
    if (obj.map && obj.map === nativeMap) {
        return obj.map(cb, context);
    }
    else {
        var result = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            result.push(cb.call(context, obj[i], i, obj));
        }
        return result;
    }
}

/**
 * 数组过滤
 * @memberOf module:zrender/tool/util
 * @param {Array} obj
 * @param {Function} cb
 * @param {*} [context]
 * @return {Array}
 */
export function filter(obj, cb, context) {
    if (!(obj && cb)) {
        return;
    }
    if (obj.filter && obj.filter === nativeFilter) {
        return obj.filter(cb, context);
    }
    else {
        var result = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            if (cb.call(context, obj[i], i, obj)) {
                result.push(obj[i]);
            }
        }
        return result;
    }
}

export function bind(func, context) {
    return function () {
        func.apply(context, arguments);
    }
}
/**
 * convert a array-like object to real array
 */
export function toArray(arr,start){
    var ret = [];
    start = start || 0;
    var i = arr.length - start;
    while(i--){
        ret[i] = arr[i+start];
    }
    return ret;
}

export function def(obj,key,val,enumerable){
    Object.defineProperty(obj,key,{
        value:val,
        enumerable:!!enumerable,
        writable:true,
        configurable:true
    })
}
export const isArray = Array.isArray;


export function deepExtend(destination, source){
    var property;
    for(property in source){
        if(source[property] && source[property].constructor && source[property].constructor === Object){
            destination[property] = destination[property] || {};
            arguments.callee(destination[property],source[property]);
        }else{
            destination[property] = source[property];
        }
    }
}

export function seekProperty(destination,source){
    var property;
    for(property in source){
        if(destination[property]){
            deepExtend(destination[property],source[property]);
        }else{
            arguments.callee(destination[property],source);
        }
    }
}

