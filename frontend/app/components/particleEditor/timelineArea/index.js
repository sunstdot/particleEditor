/**
 * Created by sunshitao on 2016/7/29.
 */
import Vue from 'vue'
import template from './timelineArea.html';
import particleMethod from '../../../widget/particleMethod';
import {zrenderAnimation} from '../../../widget/drawMethods';
let samplingTime = 1000;
let samplingTimer;
export default Vue.component('v-timelinearea',{
    data(){
        return {
            'record':'clear',
            'drawEntity':this.$select('drawEntity'),
            'particleType':this.$select('particleType'),
            'recordData':{},
            'flag':false    
        };
    },
    template,
    ready(){
        //let slider = $("#slider");
        //slider.draggable({containment:"#timelineArea",axis:'x',scroll:false});
    },
    methods: {
        recordOption(type){
            this.record = type;
            if(type === "record"){
                this.startRecord();
            }else if(type === "clear"){
                this.stopRecord();
            }else{
                this.replayRecord();
            }
        },
        startRecord(){
            let name = 0;
            if(!samplingTimer){
                samplingTimer = setInterval(function(){
                    this.recordData[name] = [this.drawEntity.pos.top,this.drawEntity.pos.left];
                    name +=samplingTime;                                        
                },samplingTime);
            }
        },
        stopRecord(){
            if(samplingTimer){
                //记录结束时改变状态
                store.dispatch(store.actions.record.recordPos(this.recordData));
                clearInterval(samplingTimer);
            }
        },
        replayRecord(){
            zrenderAnimation(this.recordData,function(){
                let target = this._target;
                if(this.particleType){
                    particleMethod[this.particleType](target,null,function(){
                        console.log('this is callback');
                    });
                }
            });
        }
    }
})
