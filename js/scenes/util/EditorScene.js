import * as THREE from "../../three.js/src/Three.js";
import { Gizmo } from "../../objectLoaders/gizmo.js";

class EditorScene extends THREE.Scene4D {
    isEditor = true;

    constructor() {
        super();
        var gizmo = new Gizmo( true );
        gizmo.name = "gizmo";
        gizmo.isAffectedByGravity = false;
        this.add(gizmo);
        
        var sittingGizmo = new Gizmo( false );
        sittingGizmo.name = "sittingGizmo";
        sittingGizmo.isAffectedByGravity = false;
        this.add(sittingGizmo);

        var light = new THREE.AmbientLight4D( 0x404040 ); // soft white light
        light.name = "grey ambient light";
        this.add( light );

        var plight = new THREE.PointLight4D( 0xffffff, 1.0, 1000 );
        plight.name = "white point light";
        plight.position.set(6, 7, 8, 0);

        this.add(plight);

        var buff = new THREE.TesseractGeometry4D( 0, 0, 0, 0, 1, 1, 1, 1 );
        var material = new THREE.MeshLambertMaterial( { color: 0xffffff } );
        var floor = new THREE.PhysicsMesh4D(buff, material);
        floor.name = "floor";
        floor.isAffectedByGravity = false;
        floor.position.set(0, 0, 0, 0);
        //this.add(floor);
    }
}

export { EditorScene };