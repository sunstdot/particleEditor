/**
 * Created by sunshitao on 2016/7/29.
 */
import Vue from 'vue'
import template from './timelineArea.html';

export default Vue.component({
    data(){
        return {
            record:'clear'
        }
    },
    template,
    ready(){
        let slider = $("#slider");
        slider.draggable({containment:"#timelineArea",axis:'x',scroll:false});
    },
    method: {
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
