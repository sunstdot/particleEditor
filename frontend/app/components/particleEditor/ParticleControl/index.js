/**
 * Created by sunshitao on 2016/7/29.
 */
import Vue from 'vue'
import template from './particleControl.html';
import $ from 'jquery'
import 'jquery-ui/draggable'
import particleMethod from '../../../widget/particleMethod'
export default Vue.component('v-particlecontrol',{
    data(){
        return {
            'particleText': '手榴弹',
            'textureText': '圆圈',
            'textureItems':[
                {'type':'circle','name':'圆圈'},
                {'type':'snow','name':'雪花'},
                {'type':'rain','name':'雨滴'},
                {'type':'star','name':'星星'},
                {'type':'smoke','name':'烟雾'},
                {'type':'hexagon','name':'正六边形'},
                {'type':'hexagon','name':'正六边形'}
            ],
            'particleItems':[
                {'type':'fireTheHall','name':'手榴弹'},
                {'type':'shakeTheBall','name':'震动'},
                {'type':'mouseEffect','name':'鼠标特效'},
                {'type':'burningWord','name':'燃烧文字'}
            ],
            'tabName':"",
            'drawEntity':this.$select('drawEntity'),
            'particleType':this.$select('particleType'),
            'painterSketch':this.$select('painterSketch')
        };
    },
    template,
    props:{
        'inputtext':{
            type:String,
            default:''
        }
    },
    ready(){
        $("#squareShape").draggable({opacity:0.7,helper:"clone"});
        $("#circleShape").draggable({opacity:0.7,helper:"clone"});
        $("#sourceDot").draggable({opacity:0.7,helper:"clone"});
        this.unwatch = this.$watch('drawEntity',this.drawParticle);
        this.unwatch = this.$watch('particleType',this.drawParticle);
    },
    methods: {
        findText(arr,type){
            for(let i=0;i<arr.length;i++){
                if(arr[i].type === type){
                    return arr[i].name;
                }
            }
        },
        particleClick(type){
            this.particleText = this.findText(this.particleItems,type) || '手榴弹';
            let item={
                type    
            };
            store.dispatch(store.actions.particle.particleType(item))
            this.tabName = "";
        },
        textureClick(type){
            this.textureText = this.findText(this.textureItems,type) || '圆圈';
            this.tabName = "";
        },
        inputWord(event){
           console.log("======"+this.inputtext)
        },
        showDropBox(type){
            if(type===this.tabName){
                this.tabName = "";
            }else{
                this.tabName = type;
            }
        },
        drawParticle(){
            if(this.drawEntity.type === "sourceDot"){
                //todo 粒子发射源
                //tonight's homework
            }
            //todo 根据位置变化画出粒子变化
            if(this.painterSketch){
                particleMethod(this.particleType)(this.drawEntity,this.painterSketch);    
            }        
        }
    }
})
