/**
 * Created by sunshitao on 2016/7/29.
 */
import Vue from 'vue'
import template from './particleControl.html';

export default Vue.component({
    data(){
        return {
            particleText: ' ÷¡ÒµØ',
            textureText: '‘≤»¶'
        };
    },
    template,
    method: {
        particleClick(type){
            let textObj = {
                'fireTheHall': ' ÷¡ÒµØ',
                'shakeTheBall': '’∂Ø',
                'mouseEffect': ' Û±ÍÃÿ–ß',
                'burningWord': '»º…’Œƒ◊÷'
            };
            this.particleText = textObj[type] || ' ÷¡ÒµØ';
        },
        textureClick(type){
            let textObj = {
                'circle': '‘≤»¶',
                'snow': '—©ª®',
                'rain': '”ÍµŒ',
                'star': '–«–«',
                'smoke': '—ÃŒÌ',
                'hexagon': '’˝¡˘±ﬂ–Œ',
                'pentagram': 'ŒÂΩ«–«'
            };
            this.textureText = textObj[type] || '‘≤»¶';
        }
    }
})
