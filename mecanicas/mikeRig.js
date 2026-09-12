// ============================================================
// 🎮 GAMERPRO — RIG COMPLETO MIKE
// Archivo: mecanicas/mikeRig.js
// ============================================================

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/loaders/GLTFLoader.js";

export async function iniciarMikeRig(contenedor) {

    contenedor.innerHTML = "";

    const escena = new THREE.Scene();
    escena.background = new THREE.Color(0x101010);

    const camara = new THREE.PerspectiveCamera(
        45,
        innerWidth / innerHeight,
        0.01,
        100
    );

    const renderer =
        new THREE.WebGLRenderer({
            antialias: true
        });

    renderer.setPixelRatio(
        Math.min(devicePixelRatio, 2)
    );

    renderer.setSize(
        innerWidth,
        innerHeight
    );

    contenedor.appendChild(
        renderer.domElement
    );

    escena.add(
        new THREE.HemisphereLight(
            0xffffff,
            0x444444,
            2.5
        )
    );

    const luz =
        new THREE.DirectionalLight(
            0xffffff,
            2
        );

    luz.position.set(
        3,
        5,
        4
    );

    escena.add(luz);

    // ========================================================
    // CARGAR MIKE
    // ========================================================

    const loader =
        new GLTFLoader();

    const gltf =
        await loader.loadAsync(
            "../3D/mike.glb"
        );

    const modelo =
        gltf.scene;

    escena.add(modelo);

    modelo.updateMatrixWorld(true);

    const caja =
        new THREE.Box3()
            .setFromObject(modelo);

    const tamano =
        new THREE.Vector3();

    caja.getSize(tamano);

    const centro =
        new THREE.Vector3();

    caja.getCenter(centro);

    const H =
        tamano.y;

    // ========================================================
    // PERSONAJE
    // ========================================================

    const personaje =
        new THREE.Group();

    personaje.name =
        "Mike_Character";

    escena.add(personaje);

    modelo.position.x -=
        centro.x;

    modelo.position.y -=
        caja.min.y;

    modelo.position.z -=
        centro.z;

    personaje.add(
        modelo
    );

    // ========================================================
    // RIG
    // ========================================================

    const rig =
        new THREE.Group();

    rig.name =
        "Mike_Rig";

    personaje.add(rig);

    const bones = [];
    const porNombre = {};

    function bone(
        nombre,
        padre,
        x,
        y,
        z
    ) {

        const b =
            new THREE.Bone();

        b.name =
            nombre;

        b.position.set(
            x,
            y,
            z
        );

        padre.add(b);

        bones.push(b);
        porNombre[nombre] = b;

        return b;
    }

    // ========================================================
    // ROOT + HIPS
    // ========================================================

    const root =
        bone(
            "Root",
            rig,
            0,
            0,
            0
        );

    const hips =
        bone(
            "Hips",
            root,
            0,
            H * 0.43,
            0
        );

    // ========================================================
    // COLUMNA
    // ========================================================

    let padre =
        hips;

    for (
        let i = 1;
        i <= 5;
        i++
    ) {

        padre =
            bone(
                `Spine_${i}`,
                padre,
                0,
                H * 0.015,
                0
            );
    }

    const chest =
        bone(
            "Chest",
            padre,
            0,
            H * 0.055,
            0
        );

    // ========================================================
    // CUELLO + CABEZA
    // ========================================================

    const neck =
        bone(
            "Neck",
            chest,
            0,
            H * 0.065,
            0
        );

    const head =
        bone(
            "Head",
            neck,
            0,
            H * 0.085,
            0
        );

    bone(
        "Skull",
        head,
        0,
        H * 0.045,
        0
    );

    // ========================================================
    // CARA
    // ========================================================

    const cara = [
        ["Jaw", 0, 0.005, 0.055],
        ["Mouth", 0, -0.012, 0.065],
        ["Nose", 0, 0.012, 0.078],
        ["LeftEye", -0.035, 0.025, 0.075],
        ["RightEye", 0.035, 0.025, 0.075],
        ["LeftBrow", -0.038, 0.045, 0.072],
        ["RightBrow", 0.038, 0.045, 0.072],
        ["LeftCheek", -0.045, 0, 0.065],
        ["RightCheek", 0.045, 0, 0.065]
    ];

    cara.forEach(
        ([nombre, x, y, z]) => {

            bone(
                nombre,
                head,
                x * H,
                y * H,
                z * H
            );
        }
    );

    // ========================================================
    // CABELLO
    // ========================================================

    [
        "Bangs",
        "LeftHairFront",
        "LeftHairBack",
        "RightHairFront",
        "RightHairBack",
        "HairTop",
        "HairBack"
    ].forEach(
        (nombre, i) => {

            bone(
                nombre,
                head,
                (
                    nombre.includes("Left")
                        ? -1
                        : nombre.includes("Right")
                            ? 1
                            : 0
                ) *
                H *
                0.045,

                H *
                (
                    0.025 -
                    i * 0.002
                ),

                -H * 0.025
            );
        }
    );

    // ========================================================
    // BRAZOS
    // ========================================================

    function brazo(
        nombre,
        signo
    ) {

        const shoulder =
            bone(
                `${nombre}Shoulder`,
                chest,
                signo * H * 0.105,
                H * 0.015,
                0
            );

        const arm =
            bone(
                `${nombre}Arm`,
                shoulder,
                signo * H * 0.085,
                -H * 0.005,
                0
            );

        const fore =
            bone(
                `${nombre}ForeArm`,
                arm,
                signo * H * 0.075,
                -H * 0.07,
                0
            );

        const hand =
            bone(
                `${nombre}Hand`,
                fore,
                signo * H * 0.045,
                -H * 0.055,
                0
            );

        const fingers = [
            "Thumb",
            "Index",
            "Middle",
            "Ring",
            "Pinky"
        ];

        fingers.forEach(
            (dedo, i) => {

                let p =
                    hand;

                for (
                    let s = 1;
                    s <= 3;
                    s++
                ) {

                    p =
                        bone(
                            `${nombre}${dedo}${s}`,
                            p,
                            signo *
                            H *
                            (
                                0.012 +
                                i * 0.002
                            ),
                            -H * 0.008,
                            (
                                i - 2
                            ) *
                            H *
                            0.009
                        );
                }
            }
        );
    }

    brazo(
        "Left",
        -1
    );

    brazo(
        "Right",
        1
    );

    // ========================================================
    // PIERNAS
    // ========================================================

    function pierna(
        nombre,
        signo
    ) {

        const up =
            bone(
                `${nombre}UpLeg`,
                hips,
                signo * H * 0.055,
                -H * 0.01,
                0
            );

        const leg =
            bone(
                `${nombre}Leg`,
                up,
                0,
                -H * 0.16,
                0
            );

        const ankle =
            bone(
                `${nombre}Ankle`,
                leg,
                0,
                -H * 0.16,
                0
            );

        const foot =
            bone(
                `${nombre}Foot`,
                ankle,
                0,
                -H * 0.035,
                H * 0.035
            );

        const toe =
            bone(
                `${nombre}Toe`,
                foot,
                0,
                0,
                H * 0.06
            );

        for (
            let i = 0;
            i < 5;
            i++
        ) {

            bone(
                `${nombre}Toe${i + 1}`,
                toe,
                (
                    i - 2
                ) *
                H *
                0.012,
                0,
                H * 0.025
            );
        }
    }

    pierna(
        "Left",
        -1
    );

    pierna(
        "Right",
        1
    );

    // ========================================================
    // THORAX + 24 COSTILLAS
    // ========================================================

    let torax =
        hips;

    for (
        let i = 1;
        i <= 12;
        i++
    ) {

        torax =
            bone(
                `Thoracic_${i}`,
                torax,
                0,
                H * 0.012,
                0
            );

        const ancho =
            H *
            (
                0.095 -
                (i - 1) *
                0.002
            );

        for (
            const signo of [-1, 1]
        ) {

            const side =
                signo < 0
                    ? "Left"
                    : "Right";

            const r1 =
                bone(
                    `${side}Rib${i}_1`,
                    torax,
                    signo * ancho,
                    0,
                    0
                );

            const r2 =
                bone(
                    `${side}Rib${i}_2`,
                    r1,
                    signo * ancho * 0.75,
                    -H * 0.004,
                    -H * 0.012
                );

            bone(
                `${side}Rib${i}_3`,
                r2,
                -signo * ancho * 0.45,
                0,
                -H * 0.012
            );
        }
    }

    bone(
        "Sternum",
        torax,
        0,
        0,
        -H * 0.035
    );

    // ========================================================
    // SKELETON
    // ========================================================

    rig.updateMatrixWorld(true);

    const skeleton =
        new THREE.Skeleton(
            bones
        );

    // ========================================================
    // SKINNING AUTOMÁTICO
    // ========================================================

    const meshes = [];

    modelo.traverse(
        objeto => {

            if (
                objeto.isMesh
            ) {

                meshes.push(
                    objeto
                );
            }
        }
    );

    meshes.forEach(
        mesh => {

            const geometry =
                mesh.geometry.clone();

            geometry.applyMatrix4(
                mesh.matrix
            );

            const skinned =
                new THREE.SkinnedMesh(
                    geometry,
                    mesh.material
                );

            skinned.name =
                "Mike_SkinnedMesh";

            const pos =
                geometry.attributes.position;

            const indices = [];
            const weights = [];

            const puntos =
                bones.map(
                    b => {

                        const p =
                            new THREE.Vector3();

                        b.getWorldPosition(
                            p
                        );

                        return p;
                    }
                );

            for (
                let i = 0;
                i < pos.count;
                i++
            ) {

                const v =
                    new THREE.Vector3()
                        .fromBufferAttribute(
                            pos,
                            i
                        );

                const candidatos =
                    bones.map(
                        (b, id) => {

                            const p =
                                puntos[id];

                            return {
                                id,
                                d:
                                    v.distanceToSquared(
                                        p
                                    )
                            };
                        }
                    );

                candidatos.sort(
                    (a, b) =>
                        a.d - b.d
                );

                const cuatro =
                    candidatos.slice(
                        0,
                        4
                    );

                let suma = 0;

                cuatro.forEach(
                    item => {

                        item.w =
                            1 /
                            (
                                Math.sqrt(
                                    item.d
                                ) +
                                0.0001
                            );

                        suma +=
                            item.w;
                    }
                );

                for (
                    let n = 0;
                    n < 4;
                    n++
                ) {

                    indices.push(
                        cuatro[n]
                            ? cuatro[n].id
                            : 0
                    );

                    weights.push(
                        cuatro[n]
                            ? cuatro[n].w / suma
                            : 0
                    );
                }
            }

            geometry.setAttribute(
                "skinIndex",
                new THREE.Uint16BufferAttribute(
                    indices,
                    4
                )
            );

            geometry.setAttribute(
                "skinWeight",
                new THREE.Float32BufferAttribute(
                    weights,
                    4
                )
            );

            skinned.bind(
                skeleton
            );

            skinned.normalizeSkinWeights();

            mesh.parent.add(
                skinned
            );

            mesh.parent.remove(
                mesh
            );
        }
    );

    // ========================================================
    // ANIMACIONES
    // ========================================================

    let animacion =
        "idle";

    let tiempo =
        0;

    const base =
        new Map();

    bones.forEach(
        b => {

            base.set(
                b.name,
                b.rotation.clone()
            );
        }
    );

    function resetPose() {

        bones.forEach(
            b => {

                const r =
                    base.get(
                        b.name
                    );

                if (r) {
                    b.rotation.copy(r);
                }
            }
        );
    }

    function actualizar(
        delta
    ) {

        tiempo += delta;

        resetPose();

        const spine =
            porNombre.Spine_3;

        const head =
            porNombre.Head;

        const leftArm =
            porNombre.LeftArm;

        const rightArm =
            porNombre.RightArm;

        const leftLeg =
            porNombre.LeftLeg;

        const rightLeg =
            porNombre.RightLeg;

        if (
            animacion ===
            "idle"
        ) {

            spine.rotation.x =
                Math.sin(
                    tiempo * 3
                ) * 0.025;

            head.rotation.z =
                Math.sin(
                    tiempo * 1.5
                ) * 0.015;
        }

        if (
            animacion ===
            "caminar"
        ) {

            const s =
                Math.sin(
                    tiempo * 9
                );

            leftLeg.rotation.x =
                s * 0.45;

            rightLeg.rotation.x =
                -s * 0.45;

            leftArm.rotation.x =
                -s * 0.25;

            rightArm.rotation.x =
                s * 0.25;
        }

        if (
            animacion ===
            "correr"
        ) {

            const s =
                Math.sin(
                    tiempo * 14
                );

            leftLeg.rotation.x =
                s * 0.75;

            rightLeg.rotation.x =
                -s * 0.75;

            leftArm.rotation.x =
                -s * 0.55;

            rightArm.rotation.x =
                s * 0.55;

            spine.rotation.x =
                -0.18;
        }

        if (
            animacion ===
            "saltar"
        ) {

            leftLeg.rotation.x =
                -0.25;

            rightLeg.rotation.x =
                -0.25;

            leftArm.rotation.z =
                -0.5;

            rightArm.rotation.z =
                0.5;
        }

        if (
            animacion ===
            "recolectar"
        ) {

            spine.rotation.x =
                0.3;

            leftArm.rotation.x =
                -0.7;

            head.rotation.x =
                0.15;
        }

        if (
            animacion ===
            "cavar"
        ) {

            leftArm.rotation.x =
                Math.sin(
                    tiempo * 10
                ) * 0.8;

            spine.rotation.z =
                0.15;
        }

        if (
            animacion ===
            "regar"
        ) {

            rightArm.rotation.x =
                Math.sin(
                    tiempo * 5
                ) * 0.45;
        }
    }

    // ========================================================
    // API
    // ========================================================

    personaje.userData.animacion =
        nombre => {

            animacion =
                nombre;
        };

    personaje.userData.rig =
        rig;

    personaje.userData.skeleton =
        skeleton;

    personaje.userData.bones =
        porNombre;

    personaje.userData.animar =
        actualizar;

    // ========================================================
    // CÁMARA
    // ========================================================

    camara.position.set(
        0,
        H * 0.52,
        H * 2.2
    );

    camara.lookAt(
        0,
        H * 0.5,
        0
    );

     // ========================================================
    // LOOP
    // ========================================================

    const reloj =
        new THREE.Clock();

    function loop() {

        requestAnimationFrame(
            loop
        );

        actualizar(
            reloj.getDelta()
        );

        renderer.render(
            escena,
            camara
        );
    }

    loop();

    return personaje;
}
