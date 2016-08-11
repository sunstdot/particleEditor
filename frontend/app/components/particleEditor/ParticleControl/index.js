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
            'exampleText':'unselect',
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
            'exampleOptions':[
                {type:'example1',name:'0,Basic,255|149|0|.5,2:Sv1(2000|1|0|0|1|E360,230:2,0:15:-1:0.10:4|F700,230:-140:8)'},
                {type:'example2a',name:'0,Basic:Sv1(2000|1|0|0|1|E388,158:2,0:15:-1:0.10:4|F497,233:500|F442,240:-37)'},
                {type:'example2b',name:'0,Variable:Sv1(5000|1|0|0|1|E388,158:2,0:15:-1:0.10:4|F443,211:500)'},
                {type:'example3a',name:'0,Basic:Sv1(2000|0|0|0|1|E500,275:1.3,-0:15:-1:3.14:4|F650,275:-250|F350,275:-250|F500,125:-250|F500,425:-250|F606,381:-250|F606,169:-250|F397,381:-250|F397,169:-250)'},
                {type:'example3b',name:'0,Basic:Sv1(2000|1|0|0|1|E500,250:4,0:15:-1:3.14:4|F500,250:80)'},
                {type:'example4',name:'0,Variable:Sv1(2000|1|0|0|1|E217,453:1.913,-0.585:15:-1:0.10:4|F337,472:-140|F533,327:500|F672,393:-140|F284,347:-140)'},
                {type:'example5',name:'1,Basic:Sv1(2000|0|1|0|0|E500,275:2,0:15:-1:3.14:4|F650,275:-140:8|F350,275:-140:8|F500,125:-140:8|F500,425:-140:8|F606,381:-140:8|F606,169:-140:8|F397,381:-140:8|F397,169:-140:8)'},
                {type:'bonus',name:'0,Soft,255|149|0|.5,4:Sv1(5000|0|0|0|1|E502,277:0.005,-0.3:15:130:3.14:4|F650,275:-250:8|F350,275:-250:8|F500,425:-250:8|F606,381:-250:8|F606,169:-250:8|F397,381:-250:8|F397,169:-250:8)'}
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
        particleExampleClick(type){
            this.exampleText = type;
            let exampleVal = this.findText(this.exampleOptions,type);
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
