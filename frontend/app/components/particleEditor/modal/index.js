/**
 * Created by sunshitao on 2016/8/16.
 */
import Vue from 'vue'
import template from './modal.html';

export default Vue.component('v-modal', {
    data(){
        return {
            showModalFlag: false,
            updateParticleUrl:this.$select("updateParticleUrl")
        };
    },
    template,
    props:{
        'showmodaljsonurl':{
            type:String,
            default:''
        }
    },
    watch:{
        showmodaljsonurl(){
            console.log("=======111111"+this.showmodaljsonurl);
            this.showModalFlag = true;
            this.jsonUrl = this.showmodaljsonurl;
        }
    },
    methods: {
        close(){
            this.showModalFlag = false;
        }
    }
})
