/**
 * Created by sunshitao on 2016/7/28.
 */
import Vue from 'vue'
import template from './header.html'
export default Vue.component({
    data(){
        return{}
    },
    computed:{
        work(){
            return this.state.work;
        }
    },
    ready(){
        //äÖÈ¾µÇÂ¼¿ò
    },
    template,
    method: {
        exportEffect(){

        },
        login(){
            this.$dispatch()
        }
    }
});
