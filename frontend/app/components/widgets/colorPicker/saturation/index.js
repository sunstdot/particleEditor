import Vue from 'vue';
import tpl from './saturation.html';
import './style.styl';
import throttle from 'lodash.throttle'

export default Vue.component('Saturation', {
    template: tpl,
    props: {
    colors: Object,
    onChange: Function
  },
  computed: {
    bgColor () {
      return 'hsl(' + this.colors.hsl.h + ',100%, 50%)'
    },
    pointerTop () {
      return -(this.colors.hsv.v * 100) + 100 + '%'
    },
    pointerLeft () {
      return this.colors.hsv.s * 100 + '%'
    }
  },
  methods: {
    throttle: throttle((fn, data) => {
      fn(data)
    }, 50),
    handleChange (e, skip) {
        !skip && e.preventDefault()
        var container = this.$els.container
        var containerWidth = container.clientWidth
        var containerHeight = container.clientHeight
        var left = (e.pageX || e.touches[0].pageX) - (container.getBoundingClientRect().left + window.pageXOffset)
        var top = (e.pageY || e.touches[0].pageY) - (container.getBoundingClientRect().top + window.pageYOffset)

        if (left < 0) {
            left = 0
        } 
        else if (left > containerWidth) {
            left = containerWidth
        } 
        else if (top < 0) {
            top = 0
        } 
        else if (top > containerHeight) {
            top = containerHeight
         }

        var saturation = left * 100 / containerWidth
        var bright = -(top * 100 / containerHeight) + 100

        this.throttle(this.onChange, {
            h: this.colors.hsl.h,
            s: saturation,
            v: bright,
            a: this.colors.hsl.a,
            source: 'rgb'
        })
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