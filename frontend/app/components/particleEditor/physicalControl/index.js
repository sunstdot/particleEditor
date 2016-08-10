import Vue from 'vue'
import template from './physicalControl.html'
import $ from 'jquery'
import Vector from '../../../lib/vector'
import {defaultColor} from '../../../config'
import vColorPicker from '../../widgets/colorPicker/chromepicker'
import Particle from '../../../lib/particle'
export default Vue.component('v-physicalcontrol',{
    data(){
        return {
            'tabName':'physics',
            'exampleOptions':[
                {name:'example1',value:'0,Basic,255|149|0|.5,2:Sv1(2000|1|0|0|1|E360,230:2,0:15:-1:0.10:4|F700,230:-140:8)'},
                {name:'example2a',value:'0,Basic:Sv1(2000|1|0|0|1|E388,158:2,0:15:-1:0.10:4|F497,233:500|F442,240:-37)'},
                {name:'example2b',value:'0,Variable:Sv1(5000|1|0|0|1|E388,158:2,0:15:-1:0.10:4|F443,211:500)'},
                {name:'example3a',value:'0,Basic:Sv1(2000|0|0|0|1|E500,275:1.3,-0:15:-1:3.14:4|F650,275:-250|F350,275:-250|F500,125:-250|F500,425:-250|F606,381:-250|F606,169:-250|F397,381:-250|F397,169:-250)'},
                {name:'example3b',value:'0,Basic:Sv1(2000|1|0|0|1|E500,250:4,0:15:-1:3.14:4|F500,250:80)'},
                {name:'example4',value:'0,Variable:Sv1(2000|1|0|0|1|E217,453:1.913,-0.585:15:-1:0.10:4|F337,472:-140|F533,327:500|F672,393:-140|F284,347:-140)'},
                {name:'example5',value:'1,Basic:Sv1(2000|0|1|0|0|E500,275:2,0:15:-1:3.14:4|F650,275:-140:8|F350,275:-140:8|F500,125:-140:8|F500,425:-140:8|F606,381:-140:8|F606,169:-140:8|F397,381:-140:8|F397,169:-140:8)'},
                {name:'bonus',value:'0,Soft,255|149|0|.5,4:Sv1(5000|0|0|0|1|E502,277:0.005,-0.3:15:130:3.14:4|F650,275:-250:8|F350,275:-250:8|F500,425:-250:8|F606,381:-250:8|F606,169:-250:8|F397,381:-250:8|F397,169:-250:8)'}
            ],
            defaultColor
        }
    },
    template,
    components:{
        'v-color-picker':vColorPicker
    },
    props:{

    },
    computed:{
        color(){
            return defaultColor;
        }
    },
    ready(){
        this.tabBackOrFront();
    },
    methods:{
        updateBackground(val){
            var rgba = val.rgba;
            Particle.changeColor(Object.values(rgba));
        },
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
