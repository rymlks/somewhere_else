import * as THREE from "../../three.js/build/three.module.js";

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

        var dgeo = new THREE.PlaneGeometry4D(10, 10);
        var dmesh = new THREE.Mesh4D(dgeo, this.quadMaterial)
        dmesh.position.set(0, 0, 0, -1);
        this.add( dmesh );
    }
}

export { QuadScene };
