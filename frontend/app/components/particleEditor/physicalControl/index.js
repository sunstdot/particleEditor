/**
 * Created by sunshitao on 2016/7/29.
 */
import Vue from 'vue'
import physicalControl from './physicalControl.html'
import $ from 'jquery'
export default Vue.component({
    data(){
        return {
            'styleObject':{
                display:'block'
            },
            'tabName':'physics'
        }
    },
    ready(){
        this.tabBackOrFront();
        this.renderController();
    },
    method:{
        renderController(){
            //todo zrender渲染仪表盘控制器之类的
        },
        tabBackOrFront(){
            let eleList = $('.tabClass');
            eleList.each((elem)=>{
                if($(elem).hasClass("in")){
                    this.eleFront = $(elem);
                }
            });
        },
        showTab(type){
            this.tabName = type;
            this.eleFront.addClass("out").removeClass('in');
            this.eleBack = $('#'+type);
            setTimeout(()=>{
                this.eleFront.css("display", "none");
                this.eleBack.addClass("in").removeClass("out");
                this.eleBack.css("display", "block");
                tabBackOrFront();
            },225);
        },
        controlBtn(type){
            switch(type){
                case 'start':
                    return;
                case 'finish':
                    return;
                case 'fire':
                    return;
                case 'create':
                    return;
                case 'replay':
                    return;
                default:
                    return;
            }
        },

    }
})
