import * as THREE from "../../three.js/src/Three.js";

// TODO: Better objects definition for Scenes
class DemoScene extends THREE.Scene4D {
    constructor() {
        super();

        var light = new THREE.AmbientLight4D( 0x404040 ); // soft white light
        light.name = "grey ambient light";
        this.add( light );

        var plight = new THREE.PointLight4D( 0xffffff, 1.0, 1000 );
        plight.name = "white point light";
        plight.position.set(6, 7, 8, 0);

        this.add(plight);

        var buff = new THREE.TesseractGeometry4D( 3, 0.5, 10, 0.5, 1, 1, 1, 1 );
        var material = new THREE.MeshLambertMaterial( { color: 0xffffff } );
        var floor = new THREE.PhysicsMesh4D(buff, material);
        floor.name = "floor";
        floor.isAffectedByGravity = false;
        floor.position.set(0, -2.75, 0, 0.001);
        

        var boxbuff = new THREE.BoxGeometry4D(3, 0.5, 10, 1, 1, 1 );
        var floor2 = new THREE.PhysicsMesh4D(boxbuff, material);
        floor2.name = "floor2";
        floor2.isAffectedByGravity = false;

        floor2.position.set(0, 0, -3.5, -5);
        floor2.rotation.xw = Math.PI * 0.5;
        floor2.rotation.zx = Math.PI * 0.5;

        var floor3 = new THREE.PhysicsMesh4D(buff, material);
        floor3.name = "floor";
        floor3.isAffectedByGravity = false;

        floor3.position.set(0, 0, -7, -10);

        floor.add(floor3);
        floor.add(floor2);

        var boxbuffsky = new THREE.TesseractGeometry4D( 5, 5, 5, 5, 1, 1, 1, 1 );
        var skymaterial = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
        var sky = new THREE.PhysicsMesh4D(boxbuffsky, skymaterial);
        sky.name = "sky";
        sky.isAffectedByGravity = false;
        sky.position.set(0,0,0,0);
        this.add(sky);
        //this.add(floor);
    }
}

export { DemoScene };