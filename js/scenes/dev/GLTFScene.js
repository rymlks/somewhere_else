import * as THREE from "../../three.js/src/Three.js";
import {GM} from "../../core/GameManager.js";

// TODO: Better objects definition for Scenes
class GLTFScene extends THREE.Scene4D {
    constructor() {
        super();
        this.setUpLights();
        this.setUpBackground();
        this.loadGLTFFile();
        this.createFloor();
    }
    setUpLights() {
        var light = new THREE.AmbientLight4D( 0x404040 ); // soft white light
        light.name = "grey ambient light";
        this.add( light );

        // var plight = new THREE.PointLight4D( 0xffffff, 0.1, 1000 );
        // plight.name = "white point light";

        var dlight = new THREE.DirectionalLight4D(0xffffff, 1);
        dlight.position.set(3, 15, -10, 0);
        dlight.target = new THREE.Object4D();
        dlight.target.position.set(0,0,0,-5);
        dlight.name = "grey directional light";
        dlight.castShadow = true;
        dlight.shadow.camera.left = -20;
        dlight.shadow.camera.right = 20;
        dlight.shadow.camera.bottom = -20;
        dlight.shadow.camera.top = 20;
        dlight.shadow.mapSize.width = 2048;
        dlight.shadow.mapSize.height = 2048;
        dlight.shadow.bias = -0.001;

        //this.add( dlight );
        dlight.shadow.camera.scale.y = -1;
        this.light = dlight;

        var buff = new THREE.BoxGeometry4D( 0.1, 0.1, 0.1, 1, 1, 1 );
        var material = new THREE.MeshLambertMaterial( { color: 0xffffff } );
        var pcube = new THREE.PhysicsMesh4D(buff, material);
        pcube.position.set(0, 0, 0, 0);
        pcube.isAffectedByGravity = false;
        pcube.name = "white point light cube";

        dlight.add(pcube);
        this.add(dlight);
    }

    setUpBackground() {
        const bgloader = new THREE.CubeTextureLoader4D();
        const bgtexture = bgloader.load([
            'assets/unlicensed/textures/interstellar_skybox/xpos.png',
            'assets/unlicensed/textures/interstellar_skybox/xneg.png',
            'assets/unlicensed/textures/interstellar_skybox/ypos.png',
            'assets/unlicensed/textures/interstellar_skybox/yneg.png',
            'assets/unlicensed/textures/interstellar_skybox/zpos.png',
            'assets/unlicensed/textures/interstellar_skybox/zneg.png',
        ]);
        this.background = bgtexture;
    }

    loadGLTFFile() {
        var loader = new THREE.GLTFLoader4D()
        var t = this;
        loader.load(
            //'assets/unlicensed/3d/testcube/testcube.gltf',
            'assets/blender/wat/untitled.glb',
            function (gltf) {
                // gltf.scene.traverse(function (child) {
                //     if ((child as THREE.Mesh).isMesh) {
                //         const m = (child as THREE.Mesh)
                //         m.receiveShadow = true
                //         m.castShadow = true
                //     }
                //     if (((child as THREE.Light)).isLight) {
                //         const l = (child as THREE.Light)
                //         l.castShadow = true
                //         l.shadow.bias = -.003
                //         l.shadow.mapSize.width = 2048
                //         l.shadow.mapSize.height = 2048
                //     }
                // })
                console.log(gltf);
                for (var child of gltf.scene.children) {
                    console.log(child);
                    t.add(child);
                    child.material = new THREE.MeshLambertMaterial({transparent: true, color: 0xffff00, opacity: 1, depthTest: false})
                }
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
            },
            (error) => {
                console.log(error)
            }   
        )
    }

    createFloor() {
        var buff = new THREE.BoxGeometry4D( 30, 0.5, 30 );
        var material = new THREE.MeshLambertMaterial( { color: 0xffffff } );
        var floor = new THREE.PhysicsMesh4D(buff, material);
        floor.name = "floor";
        floor.isAffectedByGravity = false;
        floor.position.set(0, -2.5, 0, 0);
        floor.castShadow = true;
        floor.receiveShadow = true;
        //floor.position.w = 1
        this.add(floor);


        var floor2 = floor.clone();
        floor2.position.set(0, -2.5, 0, 0);
        floor2.rotation.zw = Math.PI * 0.5;
        //this.add(floor2);

    }
}

export { GLTFScene };