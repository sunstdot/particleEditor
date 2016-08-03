/**
 * Created by sunshitao on 2016/7/29.
 */
import Vue from 'vue'
import template from './timelineArea.html';
import particleMethod from './particleMethod'
import {isArray} from '../util'
import {changePos} from './particleMethod'
let samplingTime = 1000;
let samplingTimer
import {
    startRecord,
    stopRecord
} from '../../../widget/snapshoot'
export default Vue.component('v-timelinearea',{
    data(){
        return {
            'record':'clear',
            'drawEntity':this.$select('drawEntity'),
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
                startRecord();
            }else{
                stopRecord();
            }
        },
        startRecord(){
            let pos = this.drawEntity.pos;
            if(!samplingTimer){
                samplingTimer = setInterval(function(){
                    recordData[name] = [this.drawEntity.pos.top,this.drawEntity.pos.left];
                    name +=samplingTime;                                        
                },samplingTime);
            }
        },
        stopRecord(){
            if(samplingTimer){
                //记录结束时改变状态
                store.dispatch(store.actions.record.recordPos(this.recordData))
                clearInterval(samplingTimer);
            }
        }
    }
})
