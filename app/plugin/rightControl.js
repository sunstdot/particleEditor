/**
 * Created by sunshitao on 2016/1/19.
 */

/*global $ */
let $ = require('jquery');
let THREE = require('../lib/three');
let components = {};
let event = require("../event");
//let co = require("../lib/index");  //引入co模块，TJ大神用于node的小工具,尝试在web前端
let scene, renderer, camera;
let mesh;


let mainTag = document.getElementById("editorContent");
let count = 0;
let loader = new THREE.TextureLoader();
let texture;
let particles = [];
let particle;
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


let bindEvent = function () {
    $('#textureValue a').bind('click', function () {
        let text = $(this).text();
        let type = $(this).attr("type");
        let qShowDom = $('#showTexture');
        qShowDom.html(text);
        threeStart(type);
        //触发事件在画布中绘制选中的纹理图形
        //event.notify("selectTexture",{type:text});
    });
};

components.exec = function () {
    bindEvent();
};

export default components;


