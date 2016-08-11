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
            let eventTool = require('zrender/lib/core/event');
            let gravityCanvas = document.getElementById('gravityControl');
            let gravityZr = zrender.init(gravityCanvas);
            let startPos = {x: 150, y: 100}, endPos = {}, angle;
            let downValue, rightValue;
            //定义shape
            let circle, sector, line;
            function calculateAngle(startPos, endPos) {
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
                    fill:'red'
                },
                ondragover: function (e) {
                    endPos.x = eventTool.getX(e.event);
                    endPos.y = eventTool.getY(e.event);
                    angle = calculateAngle(startPos, endPos);

                    //算出重力值，向下和向右的重力默认为正
                    rightValue = endPos.x - startPos.x;
                    downValue = endPos.y - startPos.y;

                    //通过事件抛给 kinematics来修改主屏幕中的粒子特效

                    event.notify("modifyGravity", {downGravity: downValue, rightGravity: rightValue}); //效率会很低

                    gravityValueDom.innerHTML = "(向下重力" + downValue + " , 向右重力" + rightValue + ")";
                    gravityZr.modShape("lineScale", {style: {xEnd: endPos.x, yEnd: endPos.y}});
                    gravityZr.refresh();
                }
            });
            //画线，
            //end position需要根据扇形圆心的位置实时计算
            line = new LineShape({
                id: 'lineScale',
                shape:{
                    xStart: 150,
                    yStart: 100,
                    xEnd: 100,
                    yEnd: 50
                },
                style: {
                    color: 'rgba(255 255 240, 0.8)'
                },
                draggable: false
            });
            //drawLine
            sector = new CircleShape({
                id: 'sectorCursor',
                shape:{
                    cx:100,
                    cy:50,
                    r:10
                },
                style: {
                    color: 'rgba(25 25 112, 0.8)'          // rgba supported
                },
                ondrift:function(dx,dy){
                    let x = this.shape.cx + dx;
                    let y = this.shape.cy+dy;
                    if(x>250||x<50 || y>150 || y<50){
                        return true;
                    }
                },
                draggable: true,
                hoverable: false,
                clickable: true,
                ondragstart: function (e) {
                    console.log('-----------------start');
                },
                ondragend: function (e) {
                    console.log('-----------------end');
                }
            });

            gravityZr.add(line);
            // 圆形
            gravityZr.add(circle);
            gravityZr.add(sector);
        }
    }
})
