class Surface {
    constructor(quality = 165) {
        this.quality = quality;
    }

    buildSieverts(drawingSurfaceFun) {
        // texture1 will be automatically mipmapped
        // red
        var canvas = this.mipmap(128, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAN0lEQVR42u3OQQ0AAAjEMM6/aMAECY8uE9B01f63AAICAgICAgICAgICAgICAgICAgICAgIC3jTyeE/ZxiLJ7wAAAABJRU5ErkJggg==');
        var texture3 = new THREE.CanvasTexture(canvas);
        var materialSurface = new THREE.MeshBasicMaterial({map: texture3});
        texture3.mipmaps[0] = canvas;
        // orange
        texture3.mipmaps[1] = this.mipmap(64, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAANklEQVR42u3OQQ0AAAgEIO1s/zOFmw9IQGcq9VgLCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgreWIl+Yfmu3oN2AAAAAElFTkSuQmCC');
        // yellow
        texture3.mipmaps[2] = this.mipmap(32, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAN0lEQVR42u3OQQ0AAAgEIO2f1QxnCjcfkIDOVOqxFhQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUvLEyDnThya5ajAAAAABJRU5ErkJggg==');
        // green
        texture3.mipmaps[3] = this.mipmap(16, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAANklEQVR42u3OQQ0AAAgEIA1t/jOFmw9IQE8q9VgLCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgreWHdwYiGG1Lx0AAAAAElFTkSuQmCC');
        // lazure
        texture3.mipmaps[4] = this.mipmap(8, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAN0lEQVR42u3OMQ0AAAgDMPCvl3uoIOFoFbQrk3qsBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFbyz/73YhWL6BsQAAAABJRU5ErkJggg==');
        // blue
        texture3.mipmaps[5] = this.mipmap(4, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAN0lEQVR42u3OMQ0AAAgDMBCM/3OoIOFoFbRrknqsBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFbywhQGDhYie6dQAAAABJRU5ErkJggg==');
        // violet
        texture3.mipmaps[6] = this.mipmap(2, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAN0lEQVR42u3OQQ0AAAgEIO1fzU5nCjcfkICeSuqxFhQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUvLGObW+5nF7vcgAAAABJRU5ErkJggg==');
        // pink
        texture3.mipmaps[7] = this.mipmap(1, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAN0lEQVR42u3OQQ0AAAgEIO2fzkRnCjcfkIBOTeqxFhQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUvLGvH3CBePh7qAAAAABJRU5ErkJggg==');

        const position = 12;
        texture3.repeat.set(position, position);
        texture3.wrapS = texture3.wrapT = THREE.RepeatWrapping;

        // const materialSurface = new THREE.MeshBasicMaterial({color: 0xffff00});

        const geometrySurface = new THREE.ParametricGeometry(drawingSurfaceFun, this.quality, this.quality);
        this.meshSurface = new THREE.Mesh(geometrySurface, materialSurface);
        // this.meshSurface.rotation.x = 5.5;
        // this.meshSurface.rotation.y = 1.5;
        // this.meshSurface.rotation.z = 5.1;
        this.meshSurface.position.x = -30;
        this.meshSurface.position.y = 40;
        this.meshSurface.position.z = -500;
        return this.meshSurface;
    }

    init(drawingSurfaceFun, startZ = 50) {
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 100, 1000);
        this.camera.position.z = startZ;
        this.scene.add(this.camera);
        this.scene.add(this.buildSieverts(drawingSurfaceFun));

        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('myCanvas'),
            antialias: true
        });

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
    }

    render() {
        this.meshSurface.rotation.x += 0.005;
        this.meshSurface.rotation.y += 0.005;
        this.meshSurface.rotation.z += 0.005;

        this.renderer.render(this.scene, this.camera);
    }

    mipmap(size, imgBase64) {

        var imageCanvas = document.createElement("canvas"),
            context = imageCanvas.getContext("2d");

        imageCanvas.width = imageCanvas.height = size;

        var img = new Image();   // Создает новый элемент img
        img.src = imgBase64;
        const d = 1;
        context.drawImage(img, d, d);

        return imageCanvas;
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