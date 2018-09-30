class Surface {
    constructor(quality = 50, animationStep = {x: 0.004, y: 0.006}) {
        this.quality = quality;
        this.animationStep = animationStep;
    }

    init(drawingSurfaceFun, startZ = 70) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(5, window.innerWidth / window.innerHeight, 1, 5000);
        this.camera.position.z = startZ;
        this.scene.add(this.camera);
        const geometrySurface = new THREE.ParametricGeometry( drawingSurfaceFun, this.quality, this.quality );
        const materialSurface = new THREE.MeshNormalMaterial();
        this.meshSurface = new THREE.Mesh(geometrySurface, materialSurface);
        this.scene.add(this.meshSurface);
        this.renderer = new THREE.CanvasRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
    }

    render() {
        this.meshSurface.rotation.x += this.animationStep.x;
        this.meshSurface.rotation.y += this.animationStep.y;
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
    const scale = 1;
    return new THREE.Vector3(x * scale, y * scale, z * scale);
}

const sievertsSurface = new Surface();
sievertsSurface.init(sievertsDrawing);
function animate() {
    requestAnimationFrame(animate);
    sievertsSurface.render();
}
animate(sievertsSurface);
