/**
 * Created by sunshitao on 2016/7/29.
 */
import Vue from 'vue';
import template from './displayArea.html';
import $ from 'jquery';
import 'jquery-ui/droppable'
import {init,drawMethod} from "../../../widget/drawMethods"
import Sketch from "../../../widget/sketch";
import {drawBall,fireTheHall,shakeBall,addShape} from "../../../plugin/fireTheHall"
import Display from "../../../lib/display"
export default Vue.component('v-displayarea',{
    data(){
        return {
            globalPos:{
                left:383,
                top:150
            },
            drawEntity:this.$select('drawEntity')
        };
    },
    template,
    props:{
        'inputtext1':{
            type:String,
            default:''
        }
    },
    ready(){
        let self = this;
        $('#painterContainer').droppable({
            drop:function(event,ui){
                //目标拖动到画布的位置
                let targetPos = {
                    left:event.clientX - self.globalPos.left,
                    top:event.clientY - self.globalPos.top,                    
                };
                let targetSize = {
                    width:80,
                    height:80    
                };
                let type = ui.helper.attr("shapeType");
                let item = {
                    pos:targetPos,
                    type:type,
                    size:targetSize
                };
                store.dispatch(store.actions.particle.drawEntity(item));
            }
        });
        this.unwatch = this.$watch("drawEntity",this.drawEntities);
        let container = document.getElementById('painterContainer');
        let mainPainter = document.createElement("canvas");
        mainPainter.width = container.offsetWidth;
        mainPainter.height = container.offsetHeight;
        //let painterZr = init(mainPainter);
        //let painterSketch = Sketch.create({
        //    container,
        //    element:mainPainter,
        //    autoclear:false,
        //    zrenderClear:true,
        //    painterZr
        //})
        //store.dispatch(store.actions.particle.painterSketch({'sketch':painterSketch}));

        window.display = new Display(mainPainter);
    },
    watch:{
        inputtext1(){
            let type = "text";
            let pos = {left:400,top:600};
            drawMethod[type](pos,this.inputtext1,function(shape){
                addShape(shape);
            });
            let item = {
                type:"text",
                pos:pos,
                size:null
            };
            store.dispatch(store.actions.particle.drawEntity(item));
        }
    },
    methods: {
        drawEntities(){
            let type = this.drawEntity.type;
            let pos = this.drawEntity.pos;
            drawMethod[type](pos,function(shape){
                addShape(shape);
            })
        }

    }
})
