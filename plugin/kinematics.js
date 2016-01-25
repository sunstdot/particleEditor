define(function(require,exports,module){
    var component = {};

    var event = require("../app/event");

    var myCanvas = document.getElementById("mainPainter");
    var ctx = myCanvas.getContext("2d");

    var option = {

    };

    var obj = {
        //选择一个特效纹理
        selectTexture:function(param){
            var type = param.type;
        },
        //修改特效重力场
        modifyGravity:function(param){

        }

    };


    function painterInit(){
        ctx.fillStyle="rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0,0,myCanvas.width,myCanvas.height);
    }

    function bindEvent(){
        event.register("selectTexture",obj.selectTexture.bind(this));
        event.register("modifyGravity",obj.modifyGravity.bind(this));
    }


    component.exec = function(){
        painterInit();
    };

    module.exports = component;

});














