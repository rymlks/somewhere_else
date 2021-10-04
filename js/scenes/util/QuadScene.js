import * as THREE from "../../three.js/src/Three.js";

class QuadScene extends THREE.Scene4D {
    constructor() {
        super();

        var light = new THREE.AmbientLight4D( 0xffffff ); // soft white light
        light.name = "grey ambient light";
        this.add( light );

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

                "float unpack_depth (const in vec4 rgba_depth)",
                "{",
                    "const vec4 bit_shift = vec4 (1.0 / (256.0 * 256.0 * 256.0), 1.0 / (256.0 * 256.0), 1.0 / 256.0, 1.0);",
                    "float depth = dot (rgba_depth, bit_shift);",
                    "return depth;",
                "}",

                "void main()",
                "{",
                    "vec4 rgbaDepth = texture2D (map, vUv);",
                    "float fDepth = unpack_depth (rgbaDepth);",
                    "gl_FragColor = vec4 (vec3 (fDepth), 1.0);",
                    "//gl_FragColor = vec4(rgbaDepth.x, rgbaDepth.y, rgbaDepth.z, 1.0);",
                "}"
            ].join("\n"),
            blending: THREE.NoBlending,
            depthTest: false,
            depthWrite: false,
        })

        
        var material = new THREE.MeshLambertMaterial( { color: 0xff0000 } );

        this.add(new THREE.Mesh4D (new THREE.PlaneGeometry4D(100, 100), this.quadMaterial));

        var plane = new THREE.PlaneGeometry4D(1, 1);
        var pmesh = new THREE.Mesh4D(plane, material);
        pmesh.position.x = -49.5;
        pmesh.position.y = -49.5;
        pmesh.position.z = 10;
        this.add(pmesh);
    }
}

export { QuadScene };
