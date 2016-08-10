import Vue from 'vue';
import './style.styl';
import tpl from './alpha.html';
import checkboard from '../checkboard';

export default Vue.component('Alpha', {
    template: tpl,
    props: {
        colors: Object,
        onChange: Function
    },
    components: {
        checkboard
    },
    computed: {
        gradientColor () {
            var rgba = this.colors.rgba
            var rgbStr = [rgba.r, rgba.g, rgba.b].join(',')
            return 'linear-gradient(to right, rgba(' + rgbStr + ', 0) 0%, rgba(' + rgbStr + ', 1) 100%)'
        }
    },
    methods: {
        handleChange (e, skip) {
            !skip && e.preventDefault()
            var container = this.$els.container
            var containerWidth = container.clientWidth
            var left = (e.pageX || e.touches[0].pageX) - (container.getBoundingClientRect().left + window.pageXOffset)
            var a
            if (left < 0) {
                a = 0
            }
            else if (left > containerWidth) {
                a = 1
            }
            else {
                a = Math.round(left * 100 / containerWidth) / 100
            }
            if (this.colors.a !== a) {
                this.onChange({
                    h: this.colors.hsl.h,
                    s: this.colors.hsl.s,
                    l: this.colors.hsl.l,
                    a: a,
                    source: 'rgba'
                });
            }
        },
        handleMouseDown (e) {
            this.handleChange(e, true)
            window.addEventListener('mousemove', this.handleChange)
            window.addEventListener('mouseup', this.handleMouseUp)
        },
        handleMouseUp () {
            this.unbindEventListeners()
        },
        unbindEventListeners () {
            window.removeEventListener('mousemove', this.handleChange)
            window.removeEventListener('mouseup', this.handleMouseUp)
        }
    }
});