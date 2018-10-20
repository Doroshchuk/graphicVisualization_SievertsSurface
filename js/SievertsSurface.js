class Surface {
    constructor(quality = 50, animationStep = {x: 0.001, y: 0.001, z: 0.005}) {
        this.quality = quality;
        this.animationStep = animationStep;
        this.delta = 0.1;
        this.vertexDisplacement = null;
    }

    init(drawingSurfaceFun, startZ = 1) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 300, 1000);
        this.camera.position.z = startZ;
        this.scene.add(this.camera);
        const geometrySurface = new THREE.ParametricBufferGeometry( drawingSurfaceFun, this.quality, this.quality );

        const customUniforms = {
            delta: {type: 'f', value: 0}
        };
        const materialSurface = new THREE.ShaderMaterial({
            uniforms: customUniforms,
            vertexShader: document.getElementById('vertexShader2').textContent,
            fragmentShader: document.getElementById('fragmentShader2').textContent
        });
        materialSurface.wireframe = true;

        this.meshSurface = new THREE.Mesh(geometrySurface, materialSurface);
        this.meshSurface.rotation.x = 1.05;
        this.meshSurface.rotation.y = 1.05;
        this.meshSurface.rotation.z = 5.21;

        this.vertexDisplacement = new Float32Array(geometrySurface.attributes.position.count);
        for (var i = 0; i < this.vertexDisplacement.length; i ++) {
            this.vertexDisplacement[i] = Math.sin(i);
        }
        geometrySurface.addAttribute('vertexDisplacement', new THREE.BufferAttribute(this.vertexDisplacement, 1));

        this.scene.add(this.meshSurface);
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('myCanvas'),
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        document.body.appendChild(this.renderer.domElement);
    }

    render() {
        this.meshSurface.position.x = 0;
        this.meshSurface.position.y = -50;
        this.meshSurface.position.z = -300;

        // this.meshSurface.rotation.x += this.animationStep.x;
        // this.meshSurface.rotation.y += this.animationStep.y;
        // this.meshSurface.rotation.z += this.animationStep.z;
        this.meshSurface.material.uniforms.delta.value = 0.5 + Math.cos(this.delta) * 0.5;
        this.delta += 0.01;
        for (let i = 0; i < this.vertexDisplacement.length; i ++) {
            this.vertexDisplacement[i] = 0.5 + Math.sin(i + this.delta + this.vertexDisplacement[i]) * this.vertexDisplacement[i] * 0.25;
        }

        this.meshSurface.geometry.attributes.vertexDisplacement.needsUpdate = true;
        this.renderer.render(this.scene, this.camera);
    }
}

function sievertsDrawing(u, v) {
    var c = 5;
    u = u * Math.PI / 2;
    v = v * Math.PI * 0.95;
    var phi = -(u / Math.sqrt(c + 1)) + Math.atan(Math.sqrt(c + 1) * Math.tan(u));
    var a_ = 2 / (c + 1 - c * Math.pow(Math.sin(v), 2) * Math.pow(Math.cos(u), 2));
    var r = a_ / Math.sqrt(c) * Math.sqrt((c + 1) * (1 + c * Math.pow(Math.sin(u), 2))) * Math.sin(v);

    var x = r * Math.cos(phi);
    var y = r * Math.sin(phi);
    var z = (Math.log(Math.tan(v / 2)) + a_ * (c + 1) * Math.cos(v)) / Math.sqrt(c);
    const scale = 100;
    return new THREE.Vector3(x * scale, y * scale, z * scale);
}

const sievertsSurface = new Surface();
sievertsSurface.init(sievertsDrawing);
function animate() {
    sievertsSurface.render();
    requestAnimationFrame(animate);
}

animate(sievertsSurface);
