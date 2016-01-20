/**
 * Created by sunshitao on 2016/1/19.
 */
define(function(require,exports,module){

    var components = {};

    bindEvent = function(){
        $("#textureValue a").bind('click',function(){
            var text = $(this).text();
            var qShowDom = $('#showTexture');
            qShowDom.html(text);
            //todo触发事件在画布中绘制选中的纹理图形
        });
    };

    components.exec = function(){
        bindEvent();
    };

    module.exports = components;
});


