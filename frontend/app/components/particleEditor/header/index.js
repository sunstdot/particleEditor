/**
 * Created by sunshitao on 2016/7/28.
 */
import Vue from 'vue'
import template from './header.html'
export default Vue.component('v-header',{
    data(){
        return {
            'login':'登录',
            'updateEntityPos':this.$select('updateEntityPos'),
            'emitterPos':[200,10],
            'fieldPos':[100,100]
        };
    },
    template,
    props:{
        showmodalurl:{
            type:String,
            default:""
        }
    },
    watch:{
        updateEntityPos(val){
            if(val.type === "field"){
                this.fieldPos = val.pos;
            }else{
                this.emitterPos = val.pos;
            }
        }
    },
    computed:{
        work(){
            return this.state.work;
        }
    },
    ready(){
        //初始化登录框
        console.log("it's ready");
    },
    methods: {
        exportEffect(){
            let obj = {}; //要导出的json数据
            let uniqueEmitter = display.emitters[0];
            obj.continuous = 0;
            obj.color = uniqueEmitter.color;
            obj.size = uniqueEmitter.size;
            obj.drawVersion = "Sv1";
            obj.drawMethod = "soft";
            obj.objects = "0";
            obj.accelerations = "0";
            obj.velocities = "0";
            obj.particles = "1";
            obj.emitters = display.emitters;
            obj.fields = display.fields;
            let self = this;
            $.ajax({
                url:"uploadJson",
                type:"POST",
                data:{
                    particle:JSON.stringify(obj),
                    particleName:"sunst"
                },
                dataType:"json",
                success:function(data){
                    self.showmodalurl = data.url;
                }
            })
        },
        login(){
            this.$dispatch()
        }
    }
});
