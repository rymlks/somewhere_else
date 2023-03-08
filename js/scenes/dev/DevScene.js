//import * as THREE from "../../three.js/src/Three.js";
import * as THREEbuild from "../../three.js/build/three.module.js";
import { Gizmo } from "../../objectLoaders/Gizmo.js";
import { Object4D } from "../../three.js/src/core/Object4D.js";

const THREE = THREEbuild

// TODO: Better objects definition for Scenes
class DevScene extends THREE.Scene4D {
    constructor() {
        super();
        this.ready = false;
        this.textready = false;
        this.treeready = false;

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
                object.position.w = -10;
                object.scale.x = 0.5;
                object.scale.y = 0.5;
                object.scale.z = 0.5;
                object.scale.w = 0.5;

                for (var child of object.children) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }

                //object.rotation.zw = Math.PI * 0.5;
                //object.rotation.xz = Math.PI;
                thisscene.add( object );
                console.log(object);
                
                thisscene.treeready = true;
                if (thisscene.textready && thisscene.treeready) {
                    thisscene.ready = true;
                }
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
        
        var cubes = [];

        var tbuff = new THREE.TesseractGeometry4D( 2, 2, 2, 2, 1, 1, 1, 1 );
        var tmaterial = new THREE.MeshLambertMaterial( { color: 0x8080ff, transparent: true, opacity: 0.5 } );
        var tess = new THREE.PhysicsMesh4D(tbuff, tmaterial);
        tess.isAffectedByGravity = false;
        tess.position.x += 8;
        tess.position.w = 0;
        tess.name = "Tesseract";
        tess.castShadow = true;

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

        refcube.castShadow = true;
        refcube2.castShadow = true;
        refcube.add(refcube2);
        this.add(refcube);
        

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
                "Click twice to lock the cursor\n" +
                "Use WASD keys + Mouse to move\n" +
                "Use Space + CAPS to go up and down\n" +
                "Hold shift to enter 4D mode\n" +
                "Press ~ to toggle camera type\n" +
                "Press R to reset camera orientation\n" +
                "Use the scrollwheel for an additional 4D rotation\n\n" +
                "", {font: font, size: 1, height: 0});
            var textmat = new THREE.MeshBasicMaterial( { color: 0x380404 } );
            var textMesh = new THREE.Mesh4D(textGeo, textmat)
            textMesh.position.y = 9;
            textMesh.position.z = 15;
            textMesh.position.x = -15;
            textMesh.position.w = 50;
            //textMesh.rotation.zx = -Math.PI * 0.5;
            scene.add(textMesh);


            var dgeo = new THREE.PlaneGeometry4D(35, 25);
            var dmat = new THREE.MeshBasicMaterial( { color: 0x808080, transparent: true, opacity: 0.7 } );
            var dmesh = new THREE.Mesh4D(dgeo, dmat)
            dmesh.position.z = 14.5;
            dmesh.position.w = 50;
            scene.add(dmesh);

            scene.textready = true;
            if (scene.textready && scene.treeready) {
                scene.ready = true;
            }

        } );
        

        var cylmat = new THREE.MeshLambertMaterial( { color: 0x326e2d } );
        
        var basebuf = new THREE.SphereBufferGeometry4D(  );
        var testbuf = new THREE.ModelExtrudeGeometry4D(basebuf, {depth: 4});
        var cylmat = new THREE.MeshLambertMaterial( { color: 0x326e2d } );
        var cylmesh = new THREE.PhysicsMesh4D( testbuf, cylmat );
        cylmesh.name = "3d cylinder";
        cylmesh.isAffectedByGravity = false;
        cylmesh.position.x = 2.5;
        cylmesh.position.y = 0;
        cylmesh.position.z = -2;
        cylmesh.position.w = -1;
        //this.add(cylmesh);

        cylmesh.update = function(delta, scene) {
            cylmesh.rotation.zw += delta;
            cylmesh.rotation.xy += delta;
            cylmesh.rotation.yz += delta;
            cylmesh.rotation.xw += delta;
        }
        


        var spherbuf = new THREE.SphereGeometry4D(  );
        var sphere = new THREE.PhysicsMesh4D( spherbuf, cylmat );
        sphere.position.x = 2.5;
        sphere.position.y = 7;
        sphere.position.z = -3;
        sphere.position.w = 1;
        sphere.bounciness = 1.0;
        sphere.castShadow = true;
        sphere.receiveShadow = true;
        this.add(sphere);


        var spherbuf2 = new THREE.SphereGeometry4D(  );
        var sphere2 = new THREE.PhysicsMesh4D( spherbuf2, cylmat );
        sphere2.position.x = -2.4;
        sphere2.position.y = 10;
        sphere2.position.z = 2.1;
        sphere2.position.w = 1;
        sphere2.bounciness = 1.0;
        sphere2.castShadow = true;
        sphere2.receiveShadow = true;
        this.add(sphere2);



        var dlight = new THREE.DirectionalLight4D(0xffffff, 1);
        dlight.position.set(3, 20, -15, 5);
        dlight.target = new Object4D();
        dlight.target.position.set(0,0,0,0);
        dlight.name = "grey directional light";
        dlight.castShadow = true;
        
        dlight.shadow.camera.left = -20;
        dlight.shadow.camera.right = 20;
        dlight.shadow.camera.bottom = -20;
        dlight.shadow.camera.top = 20;
        
        dlight.shadow.mapSize.width = 2048;
        dlight.shadow.mapSize.height = 2048;
        dlight.shadow.bias = -0.001;

        dlight.shadow.camera.rotation._onChangeCallback = function() {
            //console.log("Changed!");;
        }

        //this.add( dlight );
        dlight.shadow.camera.scale.y = -1;
        this.light = dlight;

        var buff = new THREE.BoxGeometry4D( 0.1, 0.1, 0.1, 1, 1, 1 );
        var material = new THREE.MeshLambertMaterial( { color: 0xffffff } );
        var pcube = new THREE.PhysicsMesh4D(buff, material);
        pcube.position.set(0, 0, 0, 0);
        //pcube.rotation.zw = Math.PI;
        pcube.isAffectedByGravity = false;

        var time = 0;


        
        
        pcube.update = function(delta, scene) {
            time += delta;
            //pcube.rotation.yz = time;
            //pcube.rotation.zx = time;
            //pcube.rotation.zx = time;
            //pcube.position.w = Math.sin(time) * 5;
            //pcube.position.z = Math.cos(time) * 5;
        }
        

        pcube.name = "white point light cube";

        var pcube2 = pcube.clone();
        pcube2.position.set(0, 0, -0.5, 0);

        
        pcube2.update = function(delta, scene) {
            return;
            time += delta;
            //pcube2.rotation.zx = time;
            pcube2.position.x = Math.sin(time) ;
            pcube2.position.y = Math.cos(time) ;
        }


        dlight.add(pcube);
        //pcube.add(pcube2);
        //this.add( pcube );
        this.add(dlight);

        var buff = new THREE.BoxGeometry4D( 10, 0.5, 10, 1, 1, 1 );
        var material = new THREE.MeshLambertMaterial( { color: 0xffffff } );
        var floor = new THREE.PhysicsMesh4D(buff, material);
        floor.name = "floor";
        floor.isAffectedByGravity = false;
        floor.position.y = -2.5;
        floor.position.w = -5;
        floor.castShadow = true;
        floor.receiveShadow = true;
        //floor.position.w = 1
        this.add(floor);

        var bfloatingcube = new THREE.BoxGeometry4D( 1, 1, 1, 1, 1, 1 );
        var fmaterial = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
        var floatingcube = new THREE.PhysicsMesh4D(bfloatingcube, fmaterial);
        floatingcube.name = "floating cube";
        floatingcube.isAffectedByGravity = false;
        //floatingcube.position.z = -10;
        floatingcube.position.y = 0;
        floatingcube.position.x = 10;
        floatingcube.position.w = 0;
        floatingcube.castShadow = true;
        floatingcube.receiveShadow = false;
        
        //floor.position.w = 1
        //this.add(floatingcube);

        floatingcube.update = function(delta, scene) {
            time += delta;
            floatingcube.position.z = (Math.sin(time) + 1) * 0.5 * 500;
        }

        //dlight.target = floatingcube;

        var giveshadow = floatingcube.clone();
        giveshadow.material = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
        giveshadow.isAffectedByGravity = false;
        giveshadow.position.z = -12;
        giveshadow.position.w = -1;
        giveshadow.scale.x = 30;
        giveshadow.scale.y = 30;
        giveshadow.castShadow = false;
        giveshadow.receiveShadow = true;
        //this.add(giveshadow);


        /*
        var shader = THREE.UnpackDepthRGBAShader;

        var uniforms = THREE.UniformsUtils.clone( shader.uniforms );
        this.quadMaterial = new THREE.ShaderMaterial( {
            uniforms: uniforms,
            vertexShader: shader.vertexShader,
            fragmentShader: shader.fragmentShader
        } );
        */

        
        this.quadMaterial = new THREE.ShaderMaterial({

            uniforms:{
                map: { type: "t", value: null},
            },
            vertexShader:
            [
                "varying vec2 vUv;",
                "#include <common>",
                "void main ()",
                "{",
                    "vUv = vec2(uv.x, 1.0 - uv.y);",
                    "vec4 transformed = vec4( position );",
                    "vec5 mvPosition = vec5( transformed.x, transformed.y, transformed.z, transformed.w, 1.0 );",
                    "mvPosition = multiply(modelViewMatrix, mvPosition);",
                    "vec4 mvPosition3D = xyzw(mvPosition);",
                    "mvPosition3D.w = 1.0;",
                    "gl_Position = projectionMatrix * mvPosition3D;",
                "}",
            ].join("\n"),

            fragmentShader:
            [
                "uniform sampler2D map;",
                "varying vec2 vUv;",

                "const float PackUpscale = 256. / 255.; // fraction -> 0..1 (including 1)",
                "const float UnpackDownscale = 255. / 256.; // 0..1 -> fraction (excluding 1)",
                "const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256.,  256. );",
                "const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );",

                "float unpack_depth (const in vec4 rgba_depth)",
                "{",
                    "const vec4 bit_shift = vec4 (1.0 / (256.0 * 256.0 * 256.0), 1.0 / (256.0 * 256.0), 1.0 / 256.0, 1.0);",
                    "float depth = dot (rgba_depth, bit_shift);",
                    "return depth;",
                "}",
                

                "float unpackRGBAToDepth( const in vec4 v ) {",
                    "return dot( v, UnpackFactors );",
                "}",

                "void main()",
                "{",
                    "vec4 rgbaDepth = texture2D (map, vUv);",
                    "float fDepth = unpackRGBAToDepth (rgbaDepth);",
                    "if (fDepth < 1.0) {",
                        "gl_FragColor = vec4 (fDepth, 0.0, 0.0, 1.0);",
                    "}", 
                    "else {",
                        "gl_FragColor = vec4 (vec3 (1.0), 1.0);",
                    "}",
                    "//gl_FragColor = vec4 (vec3 (fDepth), 1.0);",
                    "gl_FragColor = vec4(rgbaDepth.x, rgbaDepth.y, rgbaDepth.z, rgbaDepth.a);",
                "}"
            ].join("\n"),
            blending: THREE.NoBlending,
            depthTest: false,
            depthWrite: false,
        })
        //this.quadMaterial.uniforms.map.value = this.light.shadow.map.texture
        //this.quadMaterial.uniforms.map.value = amap
        

        var dgeo = new THREE.PlaneGeometry4D(5, 5);
        var dmesh = new THREE.Mesh4D(dgeo, this.quadMaterial)
        dmesh.position.x = 20;
        dmesh.rotation.zx = -Math.PI * 0.5;

        //this.add( dmesh );


        
        var numcubes = 5;
        var radius = 10;
        var size = 1;
        
        for (var i=0; i<numcubes; i+= 1) {
            var buff = new THREE.BoxGeometry4D( size, size, size, 1, 1, 1 );
            var material = new THREE.MeshLambertMaterial( { color: Math.floor(Math.random()*16777215) } );
            //var material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
            //var material = new THREE.MeshDepthMaterial( { depthPacking: THREE.RGBADepthPacking } );
            var cube = new THREE.Mesh4D(buff, material);
            cube.name = "Falling Cube " + i;
            cube.position.set(Math.random() * radius - radius/2, Math.random() * radius - radius/2, -10, 2);
            
            //cube.position.y = i;
            //cube.position.w = i % 2;
            cube.castShadow = true;
            cube.receiveShadow = true;
            cube.isAffectedByGravity = true;
            //cube.rotation.zx = 0.2;
            cubes.push(cube);
        }
        
        for (cube of cubes) {
            this.add(cube);
        }

    }
}

export { DevScene };