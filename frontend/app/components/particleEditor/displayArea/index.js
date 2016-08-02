/**
 * Created by sunshitao on 2016/7/29.
 */
import Vue from 'vue';
import template from './displayArea.html';
import $ from 'jquery';
import 'jquery-ui/droppable'
export default Vue.component('v-displayarea',{
    data(){
        return {
            globalPos:{
                left:380,
                top:250
            },
            curPos:this.$select('particle')
        };
    },
    template,
    ready(){
        let self = this;
        $('#painterContainer').droppable({
            drop:function(event,ui){
                //目标拖动到画布的位置
                let targetPos = {
                    left:event.clientX - self.globalPos.left,
                    top:event.clientY - self.globalPos.top
                };
                let type = ui.helper.attr("shapeType");
                let item = {
                    pos:targetPos,
                    type:type
                }
                store.dispatch(store.actions.particle.drawentity(item));
            }
        });
        this.unwatch = this.$watch("curPos",this.drawEntity)
    },
    methods: {
        drawEntity(){
            let type = store.actions.particle.type;
            console.log(type+"------");
        }
    }
})
