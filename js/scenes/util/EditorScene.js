import * as THREE from "../../three.js/src/Three.js";
import { Gizmo } from "../../objectLoaders/Gizmo.js";

class EditorScene extends THREE.Scene4D {
    isEditor = true;

    constructor() {
        super();
        var gizmo = new Gizmo( true );
        gizmo.name = "gizmo";
        gizmo.isAffectedByGravity = false;
        this.add(gizmo);

        var light = new THREE.AmbientLight4D( 0x404040 ); // soft white light
        light.name = "grey ambient light";
        this.add( light );

        var plight = new THREE.PointLight4D( 0xffffff, 1.0, 1000 );
        plight.name = "white point light";
        plight.position.set(6, 7, 8, 0);

        this.add(plight);

        const textureLoader = new THREE.TextureLoader();
        const amap = textureLoader.load( "assets/textures/testing_map.png" );
        var buff = new THREE.TesseractGeometry4D( 1, 1, 1, 1 );
        var material = new THREE.MeshLambertMaterial( { color: 0x0000ff, transparent: true, opacity: 1.0 } );
        var floor = new THREE.PhysicsMesh4D(buff, material);
        floor.name = "floor";
        floor.isAffectedByGravity = false;
        floor.position.set(0, 0, 0, -1);
        this.add(floor);
        
        var buff2 = new THREE.TesseractGeometry4D( 1, 1, 1, 1 );
        var material2 = new THREE.MeshLambertMaterial( { color: 0x00ffff } );
        var floor2 = new THREE.PhysicsMesh4D(buff2, material2);
        floor2.isAffectedByGravity = false;
        floor2.name = "floor2";
        floor2.position.set(5, 0, 0, -3);
        floor2.rotation.set(1, 2, 3, 4, 5, 6);
        //floor2.scale.set(3, 3, 3, 3)
        this.add(floor2);

        var wbuff = new THREE.TesseractWireframeBufferGeometry4D( 1, 1, 1, 1 );
        var wmaterial = new THREE.LineBasicMaterial( { color: 0x00ff00 } );
        var wfloor = new THREE.Line4D(wbuff, wmaterial);
        wfloor.isLineSegments = true;
        wfloor.name = "wireframe tess";
        wfloor.isAffectedByGravity = false;
        wfloor.position.set(-5, 0, 0, -1);
        wfloor.noCollision = true;
        this.add(wfloor);
        
    }
}

export { EditorScene };