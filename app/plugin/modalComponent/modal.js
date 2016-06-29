/**
 * Created by sunshitao on 2016/6/29.
 */
var component = {};
var Vue = require("vue").default;
import "./modal.css"
var modalHtml=require('./modal.html')


function vueInit(){
    var modalComponent = Vue.component('modal',{
        props: {
            show: {
                type: Boolean,
                required: true,
                twoWay: true
            }
        },
        template:modalHtml,
        methods:{
            confirm:function(){

            },
            cancel:function(){

            }
        }
    });
    var vm = new Vue({
        el:'#modalBox',
        components:{
            'modal':modalComponent
        },
        data:{
            showModal:true
        }
    })
}
function init(){
    
}

component.exec = function(){
    vueInit();
    init();
}
module.exports = component;