/**
 * Created by sunshitao on 2016/7/29.
 */
import Vue from 'vue'
import template from './timelineArea.html';
import {
    startRecord,
    stopRecord
} from '../../../widget/snapshoot'
export default Vue.component('v-timelinearea',{
    data(){
        return {
            record:'clear'
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
                //todo 开始记录
            }else{
                //todo 停止记录
            }
        }
    }
})
