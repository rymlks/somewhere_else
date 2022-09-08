import * as THREE from "../../three.js/build/three.module.js";
import { Gizmo } from "../../objectLoaders/Gizmo.js";

// TODO: Better objects definition for Scenes
class DevScene extends THREE.Scene4D {
    constructor() {
        super();


        /*
        var testEuler = new THREE.Euler4D(0.1, 0.2, 0.3, 0.4, 0.5, 0.6);
        var testMat = new THREE.Matrix5().makeRotationFromEuler(testEuler);

        var outputEuler = new THREE.Euler4D().setFromRotationMatrix(testMat);
        console.log(testEuler);
        console.log(testMat);
        console.log(outputEuler);

        
        var t1buff = new THREE.BoxGeometry4D( 2, 2, 2, 1, 1, 1 );
        var t1material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
        var t1cube = new THREE.PhysicsMesh4D(t1buff, t1material);
        t1cube.name = "test cube control ";
        t1cube.position.y = 1;
        t1cube.position.x = 10;
        t1cube.rotation.copy(testEuler);
        t1cube.castShadow = false;
        t1cube.receiveShadow = false;
        t1cube.isAffectedByGravity = false;

        
        var t2buff = new THREE.BoxGeometry4D( 2, 2, 2, 1, 1, 1 );
        var t2material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
        var t2cube = new THREE.PhysicsMesh4D(t2buff, t2material);
        t2cube.name = "test cube control ";
        t2cube.position.y = 1;
        t2cube.position.x = 14;
        t2cube.rotation.copy(outputEuler);
        t2cube.castShadow = false;
        t2cube.receiveShadow = false;
        t2cube.isAffectedByGravity = false;

        this.add(t1cube);
        this.add(t2cube);
        */





        var gizmo = new Gizmo(true);
        gizmo.name = "gizmo";
        //this.add(gizmo);

        const bgloader = new THREE.CubeTextureLoader4D();
        const bgtexture = bgloader.load([
            'assets/unlicensed/textures/interstellar_skybox/xpos.png',
            'assets/unlicensed/textures/interstellar_skybox/xneg.png',
            'assets/unlicensed/textures/interstellar_skybox/ypos.png',
            'assets/unlicensed/textures/interstellar_skybox/yneg.png',
            'assets/unlicensed/textures/interstellar_skybox/zpos.png',
            'assets/unlicensed/textures/interstellar_skybox/zneg.png',
          

          /*
          'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/pos-x.jpg',
          'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/neg-x.jpg',
          'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/pos-y.jpg',
          'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/neg-y.jpg',
          'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/pos-z.jpg',
          'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/neg-z.jpg',
          
          'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/pos-x.jpg',
          'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/neg-x.jpg',
          'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/pos-y.jpg',
          'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/neg-y.jpg',
          'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/pos-z.jpg',
          'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/neg-z.jpg',
          
          'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/pos-x.jpg',
          'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/neg-x.jpg',
          'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/pos-y.jpg',
          'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/neg-y.jpg',
          'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/pos-z.jpg',
          'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/neg-z.jpg',
          */
        ]);
        this.background = bgtexture;

        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load( "assets/textures/testing.png" );
        texture.magFilter = THREE.NearestFilter;
        const amap = textureLoader.load( "assets/textures/testing_map_2.png" );
        amap.magFilter = THREE.NearestFilter;

        var mtlLoader = new THREE.MTLLoader4D();
        mtlLoader.setPath( 'assets/unlicensed/3d/61-low_poly_tree/low_poly_tree/' );
        var url = "Lowpoly_tree_sample.mtl";
        const thisscene = this;
        mtlLoader.load( url, function( materials ) {

            materials.preload();

            var objLoader = new THREE.OBJLoader4D();
            objLoader.setMaterials( materials );
            objLoader.path = "assets/unlicensed/3d/61-low_poly_tree/low_poly_tree/";
            objLoader.load( 
            'Lowpoly_tree_sample.obj', 
            function ( object ) {
                object.position.y = -1.6;
                object.position.w = -3;
                object.scale.x = 0.5;
                object.scale.y = 0.5;
                object.scale.z = 0.5;
                object.scale.w = 0.5;

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

        var light = new THREE.AmbientLight4D( 0x404040 ); // soft white light
        light.name = "grey ambient light";
        this.add( light );

        var dlight = new THREE.DirectionalLight4D(0xffffff, 0.5);
        dlight.position.set(-3, 10, -3, 0);
        dlight.name = "grey directional light";
        dlight.castShadow = true;
        this.add( dlight );

        this.light = dlight;

        var testbuf = new THREE.BoxGeometry4D( 1, 1, 1, 1, 1, 1 );
        var testmat = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
       
        var c1 = new THREE.Mesh4D(testbuf, testmat);
        c1.position.set(-2, 10, -3, 0);
        c1.castShadow = true;
        c1.scale.set(1.1, 1.1, 1.1, 1.1);
        var c2 = new THREE.Mesh4D(testbuf, testmat);
        c2.position.set(-4, 10, -3, 0);
        c2.castShadow = true;
        c2.scale.set(1.2, 1.2, 1.2, 1.2);

        var c3 = new THREE.Mesh4D(testbuf, testmat);
        c3.position.set(-3, 11, -3, 0);
        c3.castShadow = true;
        c3.scale.set(1.3, 1.3, 1.3, 1.3);
        var c4 = new THREE.Mesh4D(testbuf, testmat);
        c4.position.set(-3, 9, -3, 0);
        c4.castShadow = true;
        c4.scale.set(1.4, 1.4, 1.4, 1.4);

        var c5 = new THREE.Mesh4D(testbuf, testmat);
        c5.position.set(-3, 10, -2, 0);
        c5.castShadow = true;
        c5.scale.set(1.5, 1.5, 1.5, 1.5);
        var c6 = new THREE.Mesh4D(testbuf, testmat);
        c6.position.set(-3, 10, -4, 0);
        c6.castShadow = true;
        c6.scale.set(1.6, 1.6, 1.6, 1.6);

        
       
        var c7 = new THREE.Mesh4D(testbuf, testmat);
        c7.position.set(-3, 10, -6, 0);
        c7.castShadow = true;
        c7.receiveShadow = true;
        c7.scale.set(10, 10, 1, 1);

        /*
        this.add(c1);
        this.add(c2);
        this.add(c3);
        this.add(c4);
        this.add(c5);
        this.add(c6);
        this.add(c7);
        */
        
        var plight = new THREE.PointLight4D( 0xffffff, 0.1, 1000 );
        plight.name = "white point light";

        var buff = new THREE.BoxGeometry4D( 0.1, 0.1, 0.1, 1, 1, 1 );
        var material = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
        var pcube = new THREE.PhysicsMesh4D(buff, material);
        pcube.position.set(-3, 3, -3, 0);
        pcube.rotation.zw = Math.PI;
        pcube.isAffectedByGravity = false;
        var time = 0;

        
        pcube.update = function(delta, scene) {
            time += delta;
            //pcube.position.w = Math.sin(time) * 5;
            //pcube.position.z = Math.cos(time) * 5;
        }
        

        pcube.name = "white point light cube";

        pcube.add(plight);
        this.add( pcube );
        
        var cubes = [];

        var tbuff = new THREE.TesseractGeometry4D( 2, 2, 2, 2, 1, 1, 1, 1 );
        var tmaterial = new THREE.MeshLambertMaterial( { color: 0x8080ff, transparent: true, opacity: 0.5 } );
        var tess = new THREE.PhysicsMesh4D(tbuff, tmaterial);
        tess.isAffectedByGravity = false;
        tess.position.x += 8;
        tess.position.w = 0;
        tess.name = "Tesseract";

        var pi_4 = Math.PI * 0.25;

        //tess.rotation.zw = pi_4;
        //tess.rotation.xy = pi_4;
        //tess.rotation.yz = pi_4;
        //tess.rotation.xw = pi_4;

        
        tess.update = function(delta, scene) {
            //tess.rotation.zw += delta;
            //tess.rotation.xy += delta;
            //tess.rotation.yz += delta;
            tess.rotation.xw -= delta;
        }
        
        
        
        this.add(tess);

        var cbuff = new THREE.BoxGeometry4D( 2, 2, 2, 1, 1, 1 );
        var cmaterial = new THREE.MeshLambertMaterial( { color: 0x8080ff, transparent: true, opacity: 0.75, alphaMap: amap } );
        var cmaterial2 = new THREE.MeshLambertMaterial( { color: 0x80ff80, transparent: true, opacity: 0.75, alphaMap: amap } );
        var refcube = new THREE.PhysicsMesh4D(cbuff, cmaterial);
        var refcube2 = new THREE.PhysicsMesh4D(cbuff, cmaterial2);
        refcube.isAffectedByGravity = false;
        refcube2.isAffectedByGravity = false;
        refcube.position.x = -6;
        refcube2.position.z = 0;
        refcube2.position.w = 1;
        //refcube2.position.w = 1;
        refcube2.rotation.zw = -Math.PI * 0.5;
        refcube.name = "refcube";
        refcube2.name = "refcube2";

        refcube.update = function(delta, scene) { }

        refcube.add(refcube2);
        this.add(refcube);
        
        
        for (var i=0; i<10; i+= 5) {
            var buff = new THREE.BoxGeometry4D( 2, 2, 2, 1, 1, 1 );
            var material = new THREE.MeshLambertMaterial( { color: Math.floor(Math.random()*16777215) } );
            var cube = new THREE.PhysicsMesh4D(buff, material);
            cube.name = "Falling Cube " + i;
            cube.position.y = i;
            cube.position.w = i % 2;
            cube.castShadow = true;
            cube.receiveShadow = true;
            cube.isAffectedByGravity = true;
            cubes.push(cube);
        }
        
        for (cube of cubes) {
            this.add(cube);
        }

        var buff = new THREE.BoxGeometry4D( 10, 0.5, 10, 1, 1, 1 );
        var material = new THREE.MeshLambertMaterial( { color: 0xffffff } );
        var floor = new THREE.PhysicsMesh4D(buff, material);
        floor.name = "floor";
        floor.isAffectedByGravity = false;
        floor.position.y = -2.5;
        floor.castShadow = true;
        floor.receiveShadow = true;
        //floor.position.w = 1
        this.add(floor);
        

        var buff2 = new THREE.BoxGeometry4D( 20, 0.5, 20, 1, 1, 1 );
        var material2 = new THREE.MeshLambertMaterial( { color: 0x808080 } );
        var floor2 = new THREE.PhysicsMesh4D( buff2, material2 );
        floor2.name = "floor2";
        floor2.isAffectedByGravity = false;
        floor2.position.y = -10.5;
        floor2.position.w = 1
        floor2.castShadow = true;
        floor2.receiveShadow = true;

        this.add(floor2);


        const fontloader = new THREE.FontLoader();

        var scene = this;
        fontloader.load( 'assets/unlicensed/fonts/helvetiker_regular.typeface.json', function ( response ) {

            var font = response;

            var textGeo = new THREE.TextGeometry4D(
                "This is a work in progress.\n" + 
                "Epilepsy warning: Graphical bugs may flash quickly.\n\n" + 
                "Use WASD keys + Mouse to move\n" +
                "Use Space + CAPS to go up and down\n" +
                "Click twice to lock the cursor\n" +
                "Hold shift to enter 4D mode\n" +
                "Press ~ to toggle camera type\n" +
                "Press R to reset camera orientation\n" +
                "Use the scrollwheel for an additional 4D rotation\n\n" +
                "Press ESC to start", {font: font, size: 1, height: 0});
            var textmat = new THREE.MeshBasicMaterial( { color: 0x380404 } );
            var textMesh = new THREE.Mesh4D(textGeo, textmat)
            textMesh.position.y = 9;
            textMesh.position.z = -25;
            textMesh.position.x = -15;
            //textMesh.rotation.zx = -Math.PI * 0.5;
            scene.add(textMesh);

        } );

        var cylmat = new THREE.MeshLambertMaterial( { color: 0x326e2d } );
        /*
        var basebuf = new THREE.SphereBufferGeometry4D(  );
        var testbuf = new THREE.ModelExtrudeGeometry4D(basebuf, {});
        var cylmat = new THREE.MeshLambertMaterial( { color: 0x326e2d } );
        var cylmesh = new THREE.PhysicsMesh4D( testbuf, cylmat );
        cylmesh.name = "3d cylinder";
        cylmesh.isAffectedByGravity = false;
        cylmesh.position.x = 2.5;
        cylmesh.position.y = 0;
        cylmesh.position.z = -2;
        cylmesh.position.w = -1;
        this.add(cylmesh);

        cylmesh.update = function(delta, scene) {
            cylmesh.rotation.zw += delta;
            cylmesh.rotation.xy += delta;
            cylmesh.rotation.yz += delta;
            cylmesh.rotation.xw += delta;
        }
        */


        var spherbuf = new THREE.SphereGeometry4D(  );
        var sphere = new THREE.PhysicsMesh4D( spherbuf, cylmat );
        sphere.position.x = -2.5;
        sphere.position.y = -0;
        sphere.position.z = 2;
        sphere.position.w = 1;
        this.add(sphere);


        var spherbuf2 = new THREE.SphereGeometry4D(  );
        var sphere2 = new THREE.PhysicsMesh4D( spherbuf2, cylmat );
        sphere2.position.x = -2.4;
        sphere2.position.y = 5;
        sphere2.position.z = 2.1;
        sphere2.position.w = 1;
        this.add(sphere2);

    }
}

export { DevScene };