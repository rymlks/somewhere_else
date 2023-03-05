import * as THREE from "../three.js/build/three.module.js";

var _gizmoRotation = new THREE.Matrix5();

class Gizmo extends THREE.PhysicsGroup4D {

    isGizmo = true;
    alwaysOnTop = true;
    
    constructor( centered, noCollision ) {
        super();
        this.centered = centered !== undefined ? centered : false;
        this.noCollision = noCollision !== undefined ? noCollision : true;
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
                //console.log(object);

                var renderLayer = THREE.MaxRenderLayer;

                var vertical = new THREE.PhysicsMesh4D(object.children[0].geometry, object.children[0].material);
                vertical.isGizmo = true;
                vertical.noCollision = thisobj.noCollision;

                vertical.name = "Gizmo Y";
                vertical._gizmoDirection = new THREE.Vector5(0, 1, 0, 0, 1);
                vertical.gizmoDirection = new THREE.Vector4(0, 1, 0, 0);

                vertical.material.color = new THREE.Color(0, 1, 0);
                vertical.renderLayer = renderLayer;
                vertical.geometry.computeBoundingBox();
                vertical.geometry.boundingBox.applyMatrix5(vertical.matrixWorld);
                thisobj.add( vertical );



                var horiz = vertical.clone();
                horiz.isGizmo = true;
                horiz.noCollision = thisobj.noCollision;
                horiz.name = "Gizmo X";
                horiz._gizmoDirection = new THREE.Vector5(1, 0, 0, 0, 1);
                horiz.gizmoDirection = new THREE.Vector4(1, 0, 0, 0);

                horiz.rotation.xy = -Math.PI * 0.5;
                horiz.material = horiz.material.clone();
                horiz.geometry = horiz.geometry.clone();
                horiz.geometry.boundingBox = horiz.geometry.boundingBox.clone();
                horiz.material.color = new THREE.Color(1, 0, 0);
                thisobj.add(horiz);



                var depth = vertical.clone();
                depth.isGizmo = true;
                depth.noCollision = thisobj.noCollision;
                depth.name = "Gizmo Z";
                depth._gizmoDirection = new THREE.Vector5(0, 0, -1, 0, 1);
                depth.gizmoDirection = new THREE.Vector4(0, 0, -1, 0);

                depth.rotation.yz = -Math.PI * 0.5;
                depth.material = depth.material.clone();
                depth.geometry = depth.geometry.clone();
                depth.geometry.boundingBox = depth.geometry.boundingBox.clone();
                depth.material.color = new THREE.Color(0, 0, 1);
                thisobj.add(depth);



                var spiss = vertical.clone();
                spiss.isGizmo = true;
                spiss.noCollision = thisobj.noCollision;
                spiss.name = "Gizmo W";
                spiss._gizmoDirection = new THREE.Vector5(0, 0, 0, -1, 1);
                spiss.gizmoDirection = new THREE.Vector4(0, 0, 0, -1);

                spiss.rotation.yw = -Math.PI * 0.5;
                spiss.material = spiss.material.clone();
                spiss.geometry = spiss.geometry.clone();
                spiss.geometry.boundingBox = spiss.geometry.boundingBox.clone();
                spiss.material.color = new THREE.Color(1, 1, 0);
                thisobj.add(spiss);
            }, 
            // called when loading is in progresses
            function ( xhr ) {
                //console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
            // called when loading has errors
            function ( error ) {
                console.log( 'An error happened' );
            } );

        });

        if (this.centered) {
            this.renderLayer = THREE.MaxRenderLayer;
        }


        function onRotationChange() {

            _gizmoRotation.makeRotationFromEuler(this);
    
            for (var child of thisobj.children) {
                var newDir = child._gizmoDirection.clone().applyMatrix5(_gizmoRotation);
                child.gizmoDirection = new THREE.Vector4(newDir.x, newDir.y, newDir.z, newDir.w);
            }
    
        }
        this.rotation._onChange( onRotationChange );

    }
    
    update(delta, scene, GM) {
        if (this.centered === true) {
            var pos = new THREE.Vector5().copy(GM.player.position);
            var rotato = new THREE.Matrix5().makeRotationFromEuler(GM.camera.rotation);
            pos.add(rotato.multiplyVector(this.offset));
            this.position.set(pos.x, pos.y, pos.z, pos.w);
        } else {
            super.update(delta, scene);
        }
    }
}

export { Gizmo };