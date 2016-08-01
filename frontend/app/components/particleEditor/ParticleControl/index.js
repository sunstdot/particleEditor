/**
 * Created by sunshitao on 2016/7/29.
 */
import Vue from 'vue'
import template from './particleControl.html';

export default Vue.component('v-particlecontrol',{
    data(){
        return {
            particleText: '手榴弹',
            textureText: '圆圈',
            textureItems:[
                {'type':'circle','name':'圆圈'},
                {'type':'snow','name':'雪花'},
                {'type':'rain','name':'雨滴'},
                {'type':'star','name':'星星'},
                {'type':'smoke','name':'烟雾'},
                {'type':'hexagon','name':'正六边形'},
                {'type':'hexagon','name':'正六边形'},
            ],
            particleItems:[
                {'type':'fireTheHall','name':'手榴弹'},
                {'type':'shakeTheBall','name':'震动'},
                {'type':'mouseEffect','name':'鼠标特效'},
                {'type':'burningWord','name':'燃烧文字'}
            ],
            tabName:""
        };
    },
    template,
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
            this.tabName = "";
        },
        textureClick(type){
            this.textureText = this.findText(this.textureItems,type) || '圆圈';
            this.tabName = "";
        },
        inputText(event){
            console.log('test the event value');
        },
        showDropBox(type){
            if(type===this.tabName){
                this.tabName = "";
            }else{
                this.tabName = type;
            }
        }
    }
})
