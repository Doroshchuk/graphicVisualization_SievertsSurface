import {SievertsGeometry} from './SievertsGeometry.js';

window.onload = function(){
    var width = window.innerWidth;
    var height = window.innerHeight;
    var canvas = document.getElementById('canvas');

    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);

    var renderer = new THREE.WebGLRenderer({canvas});
    renderer.setClearColor(0x000000);

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
    camera.position.set(0, 0, 1000);

    var light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

    var geometry = new SievertsGeometry();
    var material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer.render(scene, camera);
}