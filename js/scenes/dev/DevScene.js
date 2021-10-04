import * as THREE from "../../three.js/src/Three.js";
import { Gizmo } from "../../objectLoaders/gizmo.js";

// TODO: Better objects definition for Scenes
class DevScene extends THREE.Scene4D {
    constructor() {
        super();
        var gizmo = new Gizmo();
        gizmo.name = "gizmo";
        this.add(gizmo);

        const bgloader = new THREE.TesseractTextureLoader4D();
        const bgtexture = bgloader.load([
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
          
          'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/pos-x.jpg',
          'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/neg-x.jpg',
          'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/pos-y.jpg',
          'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/neg-y.jpg',
          'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/pos-z.jpg',
          'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/neg-z.jpg',
        ]);
        this.background = bgtexture;

        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load( "assets/textures/testing.png" );
        texture.magFilter = THREE.NearestFilter;
        const amap = textureLoader.load( "assets/textures/testing_map.png" );
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

        var dlight = new THREE.DirectionalLight4D(0xffffff, 1.0);
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

        this.add(c1);
        this.add(c2);
        this.add(c3);
        this.add(c4);
        this.add(c5);
        this.add(c6);
        this.add(c7);
        
        var plight = new THREE.PointLight4D( 0xffffff, 1.0, 1000 );
        plight.name = "white point light";

        var buff = new THREE.BoxGeometry4D( 0.1, 0.1, 0.1, 1, 1, 1 );
        var material = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
        var pcube = new THREE.PhysicsMesh4D(buff, material);
        pcube.position.set(-3, 10, -3, 0);
        pcube.rotation.zw = Math.PI;
        pcube.isAffectedByGravity = false;
        var time = 0;

        
        pcube.update = function(delta, scene) {
            time += delta;
            //pcube.position.w = Math.sin(time) * 5;
            pcube.position.z = Math.cos(time) * 5;
        }
        

        pcube.name = "white point light cube";

        //pcube.add(plight);
        //this.add( pcube );
        
        var cubes = [];

        var tbuff = new THREE.TesseractGeometry4D( 2, 2, 2, 2, 1, 1, 1, 1 );
        var tmaterial = new THREE.MeshLambertMaterial( { color: 0x8080ff, transparent: true, opacity: 0xff } );
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
            tess.rotation.zw += delta;
            tess.rotation.xy += delta;
            tess.rotation.yz += delta;
            tess.rotation.xw += delta;
        }
        
        
        
        this.add(tess);

        var cbuff = new THREE.BoxGeometry4D( 2, 2, 2, 1, 1, 1 );
        var cmaterial = new THREE.MeshLambertMaterial( { color: 0x8080ff, transparent: false, opacity: 0.95, alphaMap: amap } );
        var cmaterial2 = new THREE.MeshLambertMaterial( { color: 0x80ff80, transparent: false, opacity: 0.95, alphaMap: amap } );
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
        

        var buff2 = new THREE.BoxGeometry4D( 10, 0.5, 10, 1, 1, 1 );
        var material2 = new THREE.MeshLambertMaterial( { color: 0x808080 } );
        var floor2 = new THREE.PhysicsMesh4D( buff2, material2 );
        floor2.name = "floor2";
        floor2.isAffectedByGravity = false;
        floor2.position.y = -10.5;
        floor2.position.w = 1
        floor2.castShadow = true;
        floor2.receiveShadow = true;

        this.add(floor2);

        /*
        const fontloader = new THREE.FontLoader();

        var scene = this;
        fontloader.load( 'assets/unlicensed/fonts/helvetiker_regular.typeface.json', function ( response ) {

            var font = response;

            var textGeo = new THREE.TextGeometry4D("hello\nthar", {font: font, size: 1, height: 0});
            var textmat = new THREE.MeshBasicMaterial( { color: 0xFFFF00 } );
            var textMesh = new THREE.Mesh4D(textGeo, textmat)
            textMesh.position.y = 1;
            textMesh.position.z = -3;
            scene.add(textMesh);

        } );
        */

    }
}

export { DevScene };