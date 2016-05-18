/**
 * Created by sunshitao on 2016/5/12.
 */
var dragParent = document.getElementById("dragParent");
var dragChild = document.getElementById("dragChild");

var target;
var pointPos = {};
function allowDrop(ev){
    console.log("----dragenter");
}

function dragStart(ev){
    console.log("------dragStart");
    target = ev.target;
    pointPos.x = ev.clientX - target.offsetLeft;
    pointPos.y = ev.clientY - target.offsetTop;

}
function dragEnd(ev){
    console.log("---------dragEnd")
}
function dragOver(ev){
    console.log("--------dragOver");
    ev.preventDefault();
}
function dragOver1(ev){
    console.log("--------dragOver child===");
    ev.preventDefault();
    target.style.left = (ev.clientX - pointPos.x)+"px";
    target.style.top = (ev.clientY - pointPos.y)+"px";
}
function dragLeave(ev){
    console.log("-------dragLeave");
}
function dragDrop(ev){
    console.log("--------dragDrop+++++");
}
dragChild.ondrop = function(ev){
    console.log("--------dragDrop+++++1");
}
dragParent.ondrop = function(ev){
    console.log("----------dragDrop Parent2");
}

function dragAble(config){
    this.container = document.querySelector(config.container);  //ÏÞÖÆ
    this.axis = config.axis;
}

