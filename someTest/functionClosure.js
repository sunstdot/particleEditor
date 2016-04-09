/**
 * 函数闭包的写法
 * 实现一个统计输入字符的功能
 * 这种写法将所有的东西包在一个自执行的闭包里面，不会受到外面的影响，对外值暴露TextCountFun构造函数，
 * 生成的对象只能访问到init和render这一层,   大部分的JQuery插件
 *
 * 这个写单个组件还行，如果写多个人一套组件的话就很麻烦因为它太灵活了
 * 写法和方法的暴露都不同
 *
 * Created by sunshitao on 2016/4/9.
 */

var TextCount = (function(){

    //私有方法外部访问不到
    var _bind = function(that){
        that.input.on("keyup",function(){
            that.render();
        })
    };

    var _getNum = function(that){
        that.input.val().length;
    };


    var TextCountFun = function(config){

    };

    TextCountFun.prototype.init = function(config){
        this.input = $(config.id);
        _bind(this);
        return this;
    };

    TextCountFun.prototype.render = function(){
        var num = _getNum(this);

        if($("J_input_count").length == 0){
            this.input.after("<span id='J_input_count'></span>");
        }

        $('J_input_count').html(num+"个字");
    };

    return TextCountFun;
}());


$(function(){
    new TextCount().init({id:'#J_input'}).render();
});



