/**
 * 效果导出
 * Created by sunshitao on 2016/5/9.
 */
var obj = {};
let components = {};
let Vue = require('vue').default;
import event from "../event"
import modal from "../util/modal"
import {
    deepExtend,
    seekProperty
} from "../util"
function setEntityProperty(data){
    obj.entity = data;
}
function updateEntityProperty(data){
    seekProperty(obj.entity,data);
}

function setParticleProperty(data){
    obj.particles = data;
}

function updateParticleProperty(data){
    seekProperty(obj.particles,data);
}
// register modal component
Vue.component('modal', {
    template: '#modal-template',
    props: {
        show: {
            type: Boolean,
            required: true,
            twoWay: true
        }
    }
})
function vueInit(){
    var vm = new Vue({
        el:"#editorHeader",
        data:{
            showModal:false
        },
        methods:{
            exportMethod:function(e){
                $.ajax({
                    url : "uploadJson",
                    type: "POST",
                    data: {
                        particle:JSON.stringify(obj),
                        particleName:"sunst"
                    },
                    dataType: "json",
                    success: function(data){
                        if(data.code === "A00000"){                           
                            $('#showUrl').html(data.url);
                        }
                    }
                });
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



