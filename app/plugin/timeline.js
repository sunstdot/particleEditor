/**
 * Created by sunshitao on 2016/5/11.
 */

let Vue = require('vue').default;
let event = require('../event');
let recorder = false;
let components = {};
let recordBtn = $("#animRecorder");
let recordObj = {}; //������ȥ����ʱ��ȥȡ���ݣ�  time --- position
let time = 0;
let parentPos = {};
let recordTime = 0;

function recordStart() {
    recordTime = new Date();
}
function recordEnd() {
    if (time < 2) {
        return;
    }
    recordTime -= new Date();
}
function tween() {
    //todo ���䶯��
}
//todo �϶�slider����
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
                    recordStart();
                } else {
                    if (recordBtn.hasClass("btnActive")) {
                        recordBtn.removeClass("btnActive");
                    }
                    recordEnd();
                }
                recorder = !recorder;
            },
            clearRecord: function () {
                //todo �����Ч
            }
        }
    });
}

function init() {
    let slider = $("#slider");
    slider.draggable({containment: "#timelineArea", axis: "x", scroll: false})
}
function eventInit() {
    event.register('animSpeed', function (data) {

    });
    event.register('particleData', function (data) {

    });
}
components.exec = function () {
    init();
    vueInit();
}
export default components;