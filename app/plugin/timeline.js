/**
 * Created by sunshitao on 2016/5/11.
 */

import {
    startRecord,
    stopRecord,
    clearRecord
} from '../widget/snapshoot'
let Vue = require('vue').default;
let event = require('../event');
let recorder = false;
let components = {};
var recordBtn;

function tween() {
    //todo 补间动画
}
//todo 拖动slider控制
function vueInit() {
    let vm = new Vue({
        el: '#timelineWrap',
        data: {},
        methods: {
            doRecord: function () {
                if (!recorder) {
                    if (!recordBtn.hasClass("btnActive")) {
                        recordBtn.addClass("btnActive");
                    }
                    startRecord();
                } else {
                    if (recordBtn.hasClass("btnActive")) {
                        recordBtn.removeClass("btnActive");
                    }
                    stopRecord();
                }
                recorder = !recorder;
            },
            clearRecord: function () {
                clearRecord();
            }
        }
    });
}

function init() {
    let slider = $("#slider");
    recordBtn = $("#animRecorder")
    slider.draggable({containment: "#timelineArea", axis: "x", scroll: false})
}
function eventBind() {
    event.register('animSpeed', function (data) {

    });
    event.register('particleData', function (data) {

    });
}
components.exec = function () {
    init();
    vueInit();
    eventBind();
}
export default components;