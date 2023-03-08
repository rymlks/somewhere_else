import * as THREE from "../../three.js/src/Three.js";
import * as THREEbuild from "../../three.js/build/three.module.js";
import { Gizmo } from "../../objectLoaders/Gizmo.js";
import { Object4D } from "../../three.js/src/core/Object4D.js";

//const THREE = THREEbuild

// TODO: Better objects definition for Scenes
class IntroScene extends THREE.Scene4D {
    constructor() {
        super();
        this.loadBackground();
        this.createLights();
        this.createFloor();
        this.loadGlobe();
        this.loadCage();

        // Below is all testing code
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load( "assets/textures/testing.png" );
        texture.magFilter = THREE.NearestFilter;
        const amap = textureLoader.load( "assets/textures/testing_map_2.png" );
        amap.magFilter = THREE.NearestFilter;
        var cagebuff = new THREE.BoxGeometry4D( 2, 2, 2, 2, 1, 1 );
        var cagematerial = new THREE.MeshLambertMaterial( { color: 0xff0000, transparent: true, opacity: 1.0, alphaMap: amap } );
        var cage = new THREE.PhysicsMesh4D(cagebuff, cagematerial);
        cage.name = "floor";
        cage.position.set(0, 0, 0, 0)
        cage.isAffectedByGravity = false;
        cage.castShadow = false;
        cage.receiveShadow = true;
        //this.add(cage);

        var cage2 = cage.clone();
        cage2.position.x = 1;
        cage2.rotation.xw = Math.PI * 0.5;
        //this.add(cage2);

    }

    loadGlobe() {
        var mtlLoader = new THREE.MTLLoader4D();
        mtlLoader.setPath( 'assets/blender/world/' );
        var url = "world.mtl";
        const thisscene = this;
        mtlLoader.load( url, function( materials ) {

            materials.preload();

            var objLoader = new THREE.OBJLoader4D();
            objLoader.setMaterials( materials );
            objLoader.path = "assets/blender/world/";
            objLoader.load( 
            'world.obj', 
            function ( object ) {
                object.position.set(0, 3.5, -10, -3);
                object.scale.multiplyScalar(10.5);
                /*
                object.scale.x = 10.5;
                object.scale.y = 10.5;
                object.scale.z = 10.5;
                object.scale.w = 10.5;
                */

                for (var child of object.children) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }

                //object.rotation.zw = Math.PI * 0.5;
                //object.rotation.xz = Math.PI;
                thisscene.add( object );
                console.log(object);
            }, 
            // called when loading is in progresses
            function ( xhr ) {
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
            // called when loading has errors
            function ( error ) {
                console.log( 'An error happened' );
            } );

        });
    }

    loadCage() {
        var mtlLoader = new THREE.MTLLoader4D();
        mtlLoader.setPath( 'assets/blender/cage/' );
        var url = "Cage.mtl";
        const thisscene = this;
        mtlLoader.load( url, function( materials ) {

            materials.preload();

            var objLoader = new THREE.OBJLoader4D();
            objLoader.setMaterials( materials );
            objLoader.path = "assets/blender/cage/";
            objLoader.load( 
            'Cage (1).obj', 
            function ( object ) {
                
                object.scale.x = 1.0;
                object.scale.y = 1.0;
                object.scale.z = 1.0;
                object.scale.w = 1.0;

                object.position.set(0, 3.5, -10 ,0);
                

                for (var child of object.children) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }

                //object.rotation.zw = Math.PI * 0.5;
                //object.rotation.xz = Math.PI;
                thisscene.add( object );
                console.log(object);
            }, 
            // called when loading is in progresses
            function ( xhr ) {
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
            // called when loading has errors
            function ( error ) {
                console.log( 'An error happened' );
            } );

        });
    }

    createLights() {

        var light = new THREE.AmbientLight4D( 0x404040 ); // soft white light
        light.name = "grey ambient light";
        this.add( light );

        // var plight = new THREE.PointLight4D( 0xffffff, 0.1, 1000 );
        // plight.name = "white point light";

        var dlight = new THREE.DirectionalLight4D(0xffffff, 1);
        dlight.position.set(3, 15, -10, 0);
        dlight.target = new Object4D();
        dlight.target.position.set(0,0,0,-5);
        dlight.name = "grey directional light";
        dlight.castShadow = true;
        dlight.shadow.camera.left = -20;
        dlight.shadow.camera.right = 20;
        dlight.shadow.camera.bottom = -20;
        dlight.shadow.camera.top = 20;
        dlight.shadow.mapSize.width = 4096;
        dlight.shadow.mapSize.height = 4096;
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
        this.add(floor2);

    }

    loadBackground() {
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
}

export { IntroScene };