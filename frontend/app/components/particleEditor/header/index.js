/**
 * Created by sunshitao on 2016/7/28.
 */
import Vue from 'vue'
import template from './header.html'
export default Vue.component('v-header',{
    data(){
        return {
            login:'登录'
        };
    },
    template,
    computed:{
        work(){
            return this.state.work;
        }
    },
    ready(){
        //初始化登录框
        console.log("it's ready");
    },
    method: {
        exportEffect(){

        },
        login(){
            this.$dispatch()
        }
    }
});
