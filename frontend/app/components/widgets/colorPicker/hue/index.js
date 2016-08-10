import Vue from 'vue';
import './style.styl';
import tpl from './hue.html';

export default Vue.component('Hue', {
    template: tpl,
    props: {
        colors: Object,
        onChange: Function,
        direction: {
            type: String,
            // [horizontal | vertical]
            default: 'horizontal'
        }
    },
    computed: {
        pointerTop () {
            if (this.direction === 'vertical') {
                return -((this.colors.hsl.h * 100) / 360) + 100 + '%'
            }
            else {
                return 0
            }
        },
        pointerLeft () {
            if (this.direction === 'vertical') {
                return 0
            }
            else {
                return (this.colors.hsl.h * 100) / 360 + '%'
            }
        }
    },
    methods: {
        handleChange (e, skip) {
            !skip && e.preventDefault()

            var container = this.$els.container
            var containerWidth = container.clientWidth
            var containerHeight = container.clientHeight
            var left = (e.pageX || e.touches[0].pageX) - (container.getBoundingClientRect().left + window.pageXOffset)
            var top = (e.pageY || e.touches[0].pageY) - (container.getBoundingClientRect().top + window.pageYOffset)
            var h
            var percent

            if (this.direction === 'vertical') {
                if (top < 0) {
                    h = 359
                }
                else if (top > containerHeight) {
                    h = 0
                }
                else {
                    percent = -(top * 100 / containerHeight) + 100
                    h = (360 * percent / 100)
                }

                if (this.colors.hsl.h !== h) {
                    this.onChange({
                        h: h,
                        s: this.colors.hsl.s,
                        l: this.colors.hsl.l,
                        a: this.colors.hsl.a,
                        source: 'hsl'
                    })
                }
            } 
            else {
                if (left < 0) {
                    h = 0
                } 
                else if (left > containerWidth) {
                    h = 359
                } 
                else {
                    percent = left * 100 / containerWidth
                    h = (360 * percent / 100)
                }

                if (this.colors.hsl.h !== h) {
                    this.onChange({
                        h: h,
                        s: this.colors.hsl.s,
                        l: this.colors.hsl.l,
                        a: this.colors.hsl.a,
                        source: 'hsl'
                    })
                }
            }
        },
        handleMouseDown (e) {
            this.handleChange(e, true)
            window.addEventListener('mousemove', this.handleChange)
            window.addEventListener('mouseup', this.handleMouseUp)
        },
        handleMouseUp (e) {
            this.unbindEventListeners()
        },
        unbindEventListeners () {
            window.removeEventListener('mousemove', this.handleChange)
            window.removeEventListener('mouseup', this.handleMouseUp)
        }
    }
});