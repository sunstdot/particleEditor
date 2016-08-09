/**
 * Created by sunshitao on 2016/7/29.
 */
import Vue from 'vue'
import template from './physicalControl.html'
import $ from 'jquery'
import Vector from '../../../lib/vector'
export default Vue.component('v-physicalcontrol',{
    data(){
        return {
            'tabName':'physics'
        }
    },
    template,
    ready(){
        this.tabBackOrFront();
    },
    methods:{
        renderController(){
            //todo zrender渲染仪表盘
        },
        tabBackOrFront(){
            let eleList = $('.tabClass');
            if(eleList.length && eleList.length > 0){
                for(let i=0,len = eleList.length;i<len;i++){
                    if($(eleList[i]).hasClass("in")){
                        this.eleFront = $(eleList[i]);
                    }
                }
            }
        },
        showTab(type){
            this.eleFront.addClass("out").removeClass('in');
            this.eleBack = $('#'+type);
            setTimeout(()=>{
                this.eleFront.css("display", "none");
                this.eleBack.addClass("in").removeClass("out");
                this.eleBack.css("display", "block");
                this.tabName = type;
                this.tabBackOrFront();
            },225);
        },
        controlBtn(type){
            switch(type){
                case 'start':
                    display.init();
                    display.addEmitter(new Vector(360,230),Vector.fromAngle(0,2));
                    display.addField(new Vector(700,230), -140);
                    display.start();
                    return;
                case 'finish':
                    return;
                case 'fire':
                    return;
                case 'create':
                    return;
                default:
                    return;
            }
        },

    }
})
