/**
 * Created by sunshitao on 2016/7/29.
 */
import Vue from 'vue'
import template from './particleControl.html';

export default Vue.component({
    data(){
        return {
            particleText: '����',
            textureText: 'ԲȦ'
        };
    },
    template,
    method: {
        particleClick(type){
            let textObj = {
                'fireTheHall': '����',
                'shakeTheBall': '��',
                'mouseEffect': '�����Ч',
                'burningWord': 'ȼ������'
            };
            this.particleText = textObj[type] || '����';
        },
        textureClick(type){
            let textObj = {
                'circle': 'ԲȦ',
                'snow': 'ѩ��',
                'rain': '���',
                'star': '����',
                'smoke': '����',
                'hexagon': '��������',
                'pentagram': '�����'
            };
            this.textureText = textObj[type] || 'ԲȦ';
        }
    }
})
