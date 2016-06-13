/**
 * 效果导出
 * Created by sunshitao on 2016/5/9.
 */
var obj = {};
let components = {};
let Vue = require('vue').default;
import event from "../event"
import {
    send
} from "../interface"
import {
    deepExtend,
    seekProperty
} from "../util"
function setEntityProperty(data){
    if(obj.entity){
        alert("some entity has draw,please do clean operation!");
        return;
    }
    obj.entity = data;
}
function updateEntityProperty(data){
    if(!obj.entity){
        alert("there is no entity,please choose one");
        return;
    }
    seekProperty(obj.entity,data);
}

function setParticleProperty(data){
    if(obj.particles){
        alert("some particles has selected,please do clean operation!");
        return;
    }
    obj.particles = data;
}

function updateParticleProperty(data){
    seekProperty(obj.particles,data);
}
function vueInit(){
    var vm = new Vue({
        el:"#editorHeader",
        data:{},
        methods:{
            exportMethod:function(e){
                //todo upload to server
                var options = {
                    url:"uploadJson",
                    method:"POST",
                    requestType:"uploadJson",
                    data:obj
                };

                send(options,function(data){
                    console.log(data);
                });

                //$.ajax({
                //    url : "uploadJson",
                //    type: "POST",
                //    data: JSON.stringify(obj),
                //    requestType:"uploadJson",
                //    //contentType: "application/json; charset=utf-8",
                //    dataType   : "json",
                //    success    : function(){
                //        console.log("Pure jQuery Pure JS object");
                //    }
                //});
            }
        }
    })
}
function bindEvent(){
    event.register("setEntityProperty",setEntityProperty);
    event.register("updateEntityProperty",updateEntityProperty);
    event.register("setParticleProperty",setParticleProperty);
    event.register("updateParticleProperty",updateParticleProperty);
}

components.exec = function(){
    vueInit();
    bindEvent();
}

export default components



