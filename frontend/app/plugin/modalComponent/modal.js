/**
 * Created by sunshitao on 2016/6/29.
 */
var component = {};
var Vue = require("vue").default;
import "./modal.css"
import {deepExtend} from '../../util'
var modalHtml=require('./modal.html')
var modalWrapper;
var vm;

function vueInit(data){
    var modalComponent = Vue.component('modal',{
        props: {
            show: {
                type: Boolean,
                required: true,
                twoWay: true
            }
        },
        data:function(){
            return data;
        },
        template:modalHtml,
        methods:{
            confirm:function(){

            },
            cancel:function(){

            },
            close:function(){
                modalWrapper.style.display="none";
            }            
        }
    });
    vm = new Vue({
        el:'#modalBox',
        components:{
            'modal':modalComponent
        },
        data:{
            showModal:true
        }
    })
}

export default function generateModal(data){
    modalWrapper = document.getElementById("modalBox");
    if(modalWrapper.style.display === "none"){
        modalWrapper.style.display = "block";
    }
    if(vm){
        vm.showModal = true;
    }
    var param ={
        header:"",
        body:""
    };

    deepExtend(param,data);
    vueInit(param);
}


//component.exec = function(){
//    vueInit();
//    init();
//}
//module.exports = component;