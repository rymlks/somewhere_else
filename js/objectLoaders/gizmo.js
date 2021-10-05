import * as THREE from "../three.js/src/Three.js";

class Gizmo extends THREE.PhysicsGroup4D {

    isGizmo = true;
    alwaysOnTop = true;
    
    constructor( centered ) {
        super();
        this.centered = centered !== undefined ? centered : false;
        this.offset = new THREE.Vector5(0, 0, -5, -3, 1);

        var thisobj = this;

        var mtlLoader1 = new THREE.MTLLoader4D();
        mtlLoader1.setPath( 'assets/blender/' );
        var url = "gizmo.mtl";
        mtlLoader1.load( url, function( materials ) {

            materials.preload();

            var objLoader = new THREE.OBJLoader4D();
            objLoader.setMaterials( materials );
            objLoader.path = "assets/blender/";
            objLoader.load( 
            'gizmo.obj', 
            function ( object ) {
                console.log(object);

                var renderLayer = THREE.MaxRenderLayer;

                var physMesh = new THREE.PhysicsMesh4D(object.children[0].geometry, object.children[0].material);

                physMesh.name = "Gizmo Y";
                physMesh.material.color = new THREE.Color(0, 1, 0);
                physMesh.renderLayer = renderLayer;
                thisobj.add( physMesh );

                var horiz = physMesh.clone();
                horiz.name = "Gizmo X";
                horiz.rotation.xy = -Math.PI * 0.5;
                horiz.material = horiz.material.clone()
                horiz.material.color = new THREE.Color(1, 0, 0);
                thisobj.add(horiz);

                var depth = physMesh.clone();
                depth.name = "Gizmo Z";
                depth.rotation.yz = -Math.PI * 0.5;
                depth.material = depth.material.clone()
                depth.material.color = new THREE.Color(0, 0, 1);
                thisobj.add(depth);

                var spiss = physMesh.clone();
                spiss.name = "Gizmo W";
                spiss.rotation.yw = -Math.PI * 0.5;
                spiss.material = spiss.material.clone()
                spiss.material.color = new THREE.Color(1, 1, 0);
                thisobj.add(spiss);
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

        if (this.centered) {
            this.renderLayer = THREE.MaxRenderLayer;
        }

    }
    
    update(delta, scene, GM) {
        if (this.centered === true) {
            var pos = new THREE.Vector5().copy(GM.camera.position);
            var rotato = new THREE.Matrix5().makeRotationFromEuler(GM.camera.rotation);
            pos.add(rotato.multiplyVector(this.offset));
            this.position.set(pos.x, pos.y, pos.z, pos.w);
        } else {
            super.update(delta, scene);
        }
    }
}

export { Gizmo };