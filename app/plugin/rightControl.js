/**
 * Created by sunshitao on 2016/1/19.
 */
/*global $ */
let $ = require('jquery');
let THREE = require('../lib/three');
let vue = require('vue').default;
let components = {};
let event = require("../event");
import burnWord from "./burning-words"
//let co = require("../lib/index");  //引入co模块，TJ大神用于node的小工具,尝试在web前端
let scene, renderer, camera;
let mesh;
let mainTag = document.getElementById("editorContent");
let count = 0;
let loader = new THREE.TextureLoader();
let texture;
let particles = [];
let particle;
let globalPos = {left:380,top:150};
function createGeometry(texture) {

    let geometry = new THREE.PlaneGeometry(15, 15, 1, 1);

//        let material = new THREE.MeshBasicMaterial({map:texture});
    let material = new THREE.ParticleBasicMaterial({map: texture});

    geometry.vertices[0].uv = new THREE.Vector2(0, 0);
    geometry.vertices[1].uv = new THREE.Vector2(0, 1);
    geometry.vertices[2].uv = new THREE.Vector2(1, 1);
    geometry.vertices[3].uv = new THREE.Vector2(1, 0);


    for (let i = 0; i < 500; i++) {
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = Math.random() * 2000 - 1000;
        mesh.position.y = Math.random() * 2000 - 1000;
        mesh.position.z = Math.random() * 2000 - 1000;
        mesh.scale.x = mesh.scale.y = 1;
        scene.add(mesh);
        particles.push(mesh);
    }
//        scene.add(mesh);
}
function init(type) {
    renderer = new THREE.WebGLRenderer({alpha: true});

    renderer.setSize(mainTag.offsetWidth, mainTag.offsetHeight);
    mainTag.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(70, mainTag.offsetWidth / mainTag.offsetHeight, 1, 1000);
    camera.position.z = 300;

    scene = new THREE.Scene();

    texture = THREE.ImageUtils.loadTexture("assets/texture/smoke.png");
    texture.needsUpdate = true;
    texture.magFilter = THREE.LinearMipMapLinearFilter;
    texture.minFilter = THREE.LinearMipMapLinearFilter;
    //setInterval(function(){
    createGeometry(texture);
    //},1000);
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = mainTag.offsetWidth / mainTag.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(mainTag.offsetWidth, mainTag.offsetHeight);
}
function animate() {
    for (var i = 0; i < particles.length; i++) {

        var particle = particles[i];
        texture.needsUpdate = true;

        //with (particle.position) {
        //    if (y < -1000) y += 2000;
        //    if (x > 1000) x -= 2000;
        //    else if (x < -1000) x += 2000;
        //    if (z > 1000) z -= 2000;
        //    else if (z < -1000) z += 2000;
        //}
    }
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
    setTimeout(animate, 1000);
}
function threeStart(type) {
    init(type);
    animate();
}
function vueInit() {
    let vm = new vue({
        el: "#rightParts",
        data: {},
        methods: {
            textureClick: function (e) {
                let target = e.target;
                while (target.tagName !== "LI") {
                    target = target.parentNode;
                }
                let text = $(e.target).text();
                let type = $(e.target).attr("type");
                let qShowDom = $('#showTexture');
                qShowDom.html(text);
                //threeStart(type);
                event.notify("selectTexture", {type: text});
            },
            particleClick: function (e) {
                let target = e.target;
                while (target.tagName !== "LI") {
                    target = target.parentNode;
                }
                let text = $(e.target).text();
                let type = $(e.target).attr('type');
                let qShowDom = $('#showParticle');
                qShowDom.html(text);
                event.notify('selectParticle', {type: text});
            },
            inputWord: function (e) {
                burnWord(this.newWord, {
                    "text_color": "FFFFCC",
                    "id": "loginPanel",
                    "font": "Times New Roman",
                    "font_size": 64,
                    "bg_color": "1A0A4A",
                    "bg_alpha": 200,
                    "speed": "fast"
                })
            }
        }
    })
}

function init() {
    $("#squareShape").draggable({opacity: 0.7, helper: "clone"});
    $("#circleShape").draggable({opacity: 0.7, helper: "clone"});
    $("#painterContainer").droppable({
        drop:function(e,ui){
            //目标拖动到画布的位置
            let targetPos = {
                left:e.clientX - globalPos.left,
                top:e.clientY - globalPos.top
            };
            let type = ui.helper.attr("shapeType");
            event.notify("drawDragShape",{pos:targetPos,type:type});
        }
    })
}

let bindEvent = function () {

};
components.exec = function () {
    init();
    vueInit();
    bindEvent();
};
export default components;


