/**
 * 面向对象类中的事件
 * 提供 1.事件绑定 2.事件触发 3.事件解绑
 * todo 看情况实现one，即触发一次就解除房顶
 * Created by sunshitao on 2016/4/9.
 */

define(function (require, exports, module) {
    var Class = require('./Class');

    function _indexOf(array, key) {
        if (!array) {
            return -1;
        }

        for (var i = 0; i < array.length; i++) {
            if(array[i] === key){
                return i;
            }
        }
        return -1;
    }

    var Event = Class.create({
        on: function (key, listener) {

            if (!key) {
                return;
            }

            if (!this._events) {
                this._events = {};
            }
            if (!this._events[key]) {
                this._events[key] = [];
            }

            if (_indexOf(this._events[key],listener) === -1 && typeof listener === 'function') {
                this._events[key].push(listener);
            }
            return this;
        },
        //触发事件
        fire: function (key) {
            if(!key || !this._events || !this._events[key]){
                return;
            }

            var args = Array.prototype.slice.call(arguments,1) || [];

            var listener = this._events[key];
            var i=0,len = listener.length;
            for(;i<len;i++){
                listener[i].call(this,args);
            }
            return this;
        },
        //取消监听
        off: function (key, listener) {
            if(!key && !listener){
                this._events = {};
            }
            if(key && !listener){
                this._events[key] = [];
            }
            if(key && listener){
                var index = _indexOf(this._events[key],listener);
                (index > -1) && this._events[key].slice(index,1);
            }
            return this;
        }
    });
});
