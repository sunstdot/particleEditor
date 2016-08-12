import Vue from 'vue'
import template from './physicalControl.html'
import $ from 'jquery'
import Vector from '../../../lib/vector'
import {defaultColor} from '../../../config'
import vColorPicker from '../../widgets/colorPicker/chromepicker'
import Particle from '../../../lib/particle'

let zrender = require('zrender');
//圆形
let CircleShape = require('zrender/lib/graphic/shape/Circle');
//线
let LineShape = require('zrender/lib/graphic/shape/Line');

export default Vue.component('v-physicalcontrol',{
    data(){
        return {
            'tabName':'physics',
            'velocityX':2,
            'velocityY':0,
            defaultColor
        }
    },
    template,
    components:{
        'v-color-picker':vColorPicker
    },
    props:{

    },
    watch:{
        maxParticles(val){
            display.changeMaxParticle(val);
        },
        particleSize(val){
            Particle.size = val;
        }
    },
    computed:{
        color(){
            return defaultColor;
        }
    },
    ready(){
        this.tabBackOrFront();
        this.gravityControl();
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
        addObjectAtCanvas(type){
            if(type==="emitter"){
                display.addEmitter(new Vector(360,230),Vector.fromAngle(0,2));
            }else if(type="field"){
                display.addField(new Vector(700,230), -140);
            }
        },
        gravityControl(){
            let self = this;
            let gravityZr = zrender.init(document.getElementById('gravityControl'),{'renderer':'canvas'});
            let startPos = {x: 150, y: 100};
            let downValue, rightValue;
            //定义shape
            let circle, sector, line;
            function calculateAngle(startPos, endPos) {
                let angle;
                if ((endPos.y - startPos.y) < 0.2) {
                    angle = endPos.x > startPos ? 0 : 180;
                } else if ((endPos.x - startPos.x) < 0.2) {
                    angle = endPos.y > startPos.y ? -90 : 90;
                } else {
                    let tan = (endPos.y - startPos.y) / (endPos.x - startPos.x);
                    let radina = Math.atan(tan); //弧度
                    let angle = 180 * radina / Math.PI;
                }
                return Math.ceil(angle);
            }
            circle = new CircleShape({
                scale:[1,1],
                shape:{
                  cx:150,
                  cy:100,
                  r:100
                },
                style: {
                    fill:'#F29F3F'
                }
            });
            //画线，
            //end position需要根据扇形圆心的位置实时计算
            line = new LineShape({
                id: 'lineScale',
                style: {
                    stroke: "rgba(10, 80, 60, 0.8)"
                },
                shape:{
                    x1: 150,
                    y1: 100,
                    x2: 170,
                    y2: 100
                }
            });
            //drawLine
            sector = new CircleShape({
                id: 'sectorCursor',
                shape:{
                    cx:170,
                    cy:100,
                    r:5
                },
                style: {
                    fill:'#376956'
                },
                draggable: true,
                hoverable: false,
                clickable: true,
                ondrag:function(e){
                    let target = e.target;
                    let endPos = {};

                    endPos.x = target.shape.cx+target.position[0];
                    endPos.y = target.shape.cy+target.position[1];

                    self.velocityX = (endPos.x - 150)/10;
                    self.velocityY = (endPos.y - 100)/10;
                    display.updateEmitters(new Vector(self.velocityX,self.velocityY));
                    let angle = calculateAngle(startPos, endPos);
                    //算出重力值，向下和向右的重力默认为正
                    rightValue = endPos.x - startPos.x;
                    downValue = endPos.y - startPos.y;
                    let lineTarget = gravityZr.storage.get('lineScale');
                    lineTarget.attr({shape: {x2: endPos.x, y2: endPos.y}});
                    lineTarget.dirty();
                    gravityZr.refreshImmediately();
                }
            });

            // 圆形
            gravityZr.add(circle);
            gravityZr.add(line);
            gravityZr.add(sector);
        }
    }
})
