import * as THREE from "../../three.js/src/Three.js";

// TODO: Better objects definition for Scenes
class DemoScene extends THREE.Scene4D {
    constructor() {
        super();

        var light = new THREE.AmbientLight4D( 0x404040 ); // soft white light
        light.name = "grey ambient light";
        this.add( light );

        var plight = new THREE.PointLight4D( 0xffff00, 1.0, 1000 );
        plight.name = "yellow point light";
        plight.position.set(0, 0, 0, 10);

        this.add(plight);

        var plight2 = new THREE.PointLight4D( 0xff0000, 1.0, 1000 );
        plight2.name = "red point light";
        plight2.position.set(10, 0, 0, 0);

        this.add(plight2);

        var plight3 = new THREE.PointLight4D( 0x00ff00, 1.0, 1000 );
        plight3.name = "green point light";
        plight3.position.set(0, 10, 0, 0);

        this.add(plight3);

        var plight4 = new THREE.PointLight4D( 0x0000ff, 1.0, 1000 );
        plight4.name = "blue point light";
        plight4.position.set(0, 0, 10, 0);

        this.add(plight4);

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
        var numVerts = 50;
        var glombuffsky = new THREE.GlomeCapsuleGeometry4D( 1, 2, 10, 20, 20 );
        var skymaterial = new THREE.MeshLambertMaterial( { color: 0xffffff, transparent: true, opacity: 1 } );
        var sky = new THREE.PhysicsMesh4D(glombuffsky, skymaterial);
        sky.name = "sky";
        sky.isAffectedByGravity = false;
        sky.position.set(0,0,0,0);
        this.add(sky);
        //this.add(floor);

        sky.update = function(delta, scene) {
            var step = delta * 2.5;
            sky.rotation.zx += step * 0.1;
            //sky.rotation.xy += step * 0.2;
            //sky.rotation.yz += step * 0.3;
            //sky.rotation.xw += step * 0.5;
            //sky.rotation.yw += step * 0.7;
            //sky.rotation.zw += step * 1.1;
        }

    }
}

export { DemoScene };