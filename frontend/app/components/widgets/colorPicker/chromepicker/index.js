import Vue from 'vue';
import tpl from './chromepicker.html';
import './style.styl';

import colorMixin from '../../../../mixins/colorMixin';
import Alpha from '../alpha';
import EditableInput from '../editableinput';
import Saturation from '../saturation';
import Hue from '../hue';

export default Vue.component('v-color-picker', {
    template: tpl,
    mixins: [colorMixin],
    components: {
        'saturation': Saturation,
        'hue': Hue,
        'alpha': Alpha,
        'ed-in': EditableInput
    },
    data() {
        return {
            fileds: ['hex', 'rgba', 'hsla'],
            fieldsIndex: 0,
            highlight: false
        }
    },
    computed: {
        activeColor() {
            let rgba = this.colors.rgba;
            return 'rgba(' + [rgba.r, rgba.g, rgba.b, rgba.a].join(',') + ')';
        }
    },
    methods: {
        handlePreset(c) {
            this.colorChange({
                hex: c,
                source: 'hex'
            })
        },
        childChange(data) {
            this.colorChange(data)
        },
        inputChange(data) {
            if (!data) {
                return
            }
            if (data.hex) {
                this.isValidHex(data.hex) && this.colorChange({
                        hex: data.hex,
                        source: 'hex'
                })
            }
            else if (data.r || data.g || data.b || data.a) {
                this.colorChange({
                    r: data.r || this.colors.rgba.r,
                    g: data.g || this.colors.rgba.g,
                    b: data.b || this.colors.rgba.b,
                    a: data.a || this.colors.rgba.a,
                    source: 'rgba'
                });
            }
        },
        toggleViews () {
            this.fieldsIndex = 0
        },
        addfield(idx) {
            var fieldsIndex = this.fieldsIndex;
            fieldsIndex+=idx;
            this.fieldsIndex = fieldsIndex<0?0:fieldsIndex>=2?0:fieldsIndex;
        },
        showHighlight () {
            this.highlight = true
        },
        hideHighlight () {
            this.highlight = false
        }
    }
});