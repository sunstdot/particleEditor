/**
 * Created by sunshitao on 2016/1/19.
 */

/*global $ */
define(function(require,exports,module){

    var components = {};
    var event = require("../app/event");

    var bindEvent = function(){
        $('#textureValue a').bind('click',function(){
            var text = $(this).text();
            var qShowDom = $('#showTexture');
            qShowDom.html(text);

            //触发事件在画布中绘制选中的纹理图形
            event.notify("selectTexture",{type:text});
        });
    };

    components.exec = function(){
        bindEvent();
    };

    module.exports = components;
});


