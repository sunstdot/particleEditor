/**
 * 组件基类方法
 * 提供大部分组件需要的方法
 *
 * init 用来初始化组件属性
 * render 用来处理渲染逻辑
 * bind 用来处理事件绑定
 * destroy 用来处理组件销毁
 *
 * Created by sunshitao on 2016/4/9.
 */
define(function(require,exports,module){

    var Class = require('./Class');
    var Event = require('../app/event');

    var Base = Class.create(Event,{
        init:function(config){
            //自动保存配置项
            this._config = config;
            this.bind();
            this.render();
        },
        //通过get获取配置项
        get:function(key){
            return this._config[key];
        },
        //通过set设置配置项
        set:function(key,value){
            this._config[key] = value;
        },

        bind:function(){

        },

        render:function(){

        },
        //定义销毁工作
        destroy:function(){
            //去掉所有绑定事件
            this.off();
        }
    });

    return Base;
});

