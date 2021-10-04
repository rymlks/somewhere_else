import * as THREE from "../three.js/src/Three.js";

class Gizmo extends THREE.Group4D {

    isGizmo = true;

    staticDistance = 10;
    
    constructor() {
        super();

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
                object.children[0].material.color = new THREE.Color(0, 1, 0);
                thisobj.add( object );

                var horiz = object.clone();
                horiz.rotation.xy = -Math.PI * 0.5;
                horiz.children[0].material = horiz.children[0].material.clone()
                horiz.children[0].material.color = new THREE.Color(1, 0, 0);
                thisobj.add(horiz);

                var depth = object.clone();
                depth.rotation.yz = -Math.PI * 0.5;
                depth.children[0].material = depth.children[0].material.clone()
                depth.children[0].material.color = new THREE.Color(0, 0, 1);
                thisobj.add(depth);

                var spiss = object.clone();
                spiss.rotation.yw = -Math.PI * 0.5;
                spiss.children[0].material = spiss.children[0].material.clone()
                spiss.children[0].material.color = new THREE.Color(1, 1, 0);
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

    }
}

export { Gizmo };