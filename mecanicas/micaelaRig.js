// ============================================================
// 🎮 GAMERPRO — RIG COMPLETO MICAELA
// Archivo: mecanicas/micaelaRig.js
// ============================================================

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/loaders/GLTFLoader.js";

export async function iniciarMicaelaRig(contenedor) {

    contenedor.innerHTML = "";

    const escena = new THREE.Scene();
    escena.background = new THREE.Color(0x101010);

    const camara = new THREE.PerspectiveCamera(
        45,
        innerWidth / innerHeight,
        0.01,
        100
    );

    const renderer = new THREE.WebGLRenderer({
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

    const luz = new THREE.DirectionalLight(
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
    // CARGAR MODELO
    // ========================================================

    const loader = new GLTFLoader();

    const gltf = await loader.loadAsync(
        "../3D/micaela.glb"
    );

    const modelo = gltf.scene;

    escena.add(modelo);

    modelo.updateMatrixWorld(true);

    const caja = new THREE.Box3()
        .setFromObject(modelo);

    const tamano = new THREE.Vector3();

    caja.getSize(tamano);

    const centro = new THREE.Vector3();

    caja.getCenter(centro);

    const altura = tamano.y;

    // ========================================================
    // ROOT DEL PERSONAJE
    // ========================================================

    const personaje = new THREE.Group();

    personaje.name =
        "Micaela_Character";

    escena.add(personaje);

    // Reubicar modelo para que sus pies queden en Y=0
    modelo.position.x -= centro.x;
    modelo.position.y -= caja.min.y;
    modelo.position.z -= centro.z;

    personaje.add(modelo);

    modelo.updateMatrixWorld(true);

    // ========================================================
    // RIG
    // ========================================================

    const rig = new THREE.Group();

    rig.name =
        "Micaela_Rig";

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

        b.name = nombre;

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
    // ESCALA CHIBI
    // ========================================================

    const H = altura;

    const yHips = H * 0.43;
    const ySpine = H * 0.075;
    const yNeck = H * 0.065;
    const yHead = H * 0.085;

    // ========================================================
    // ROOT
    // ========================================================

    const root =
        bone(
            "Root",
            rig,
            0,
            0,
            0
        );

    // ========================================================
    // CADERA
    // ========================================================

    const hips =
        bone(
            "Hips",
            root,
            0,
            yHips,
            0
        );

    // ========================================================
    // COLUMNA
    // ========================================================

    let spineParent = hips;

    for (
        let i = 1;
        i <= 5;
        i++
    ) {

        spineParent =
            bone(
                `Spine_${i}`,
                spineParent,
                0,
                ySpine / 5,
                0
            );
    }

    const chest =
        bone(
            "Chest",
            spineParent,
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
            yNeck,
            0
        );

    const head =
        bone(
            "Head",
            neck,
            0,
            yHead,
            0
        );

    const skull =
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

    const faceBones = [
        ["Jaw", 0, H * 0.005, H * 0.055],
        ["Mouth", 0, -H * 0.012, H * 0.065],
        ["Nose", 0, H * 0.012, H * 0.078],
        ["LeftEye", -H * 0.035, H * 0.025, H * 0.075],
        ["RightEye", H * 0.035, H * 0.025, H * 0.075],
        ["LeftBrow", -H * 0.038, H * 0.045, H * 0.072],
        ["RightBrow", H * 0.038, H * 0.045, H * 0.072],
        ["LeftCheek", -H * 0.045, 0, H * 0.065],
        ["RightCheek", H * 0.045, 0, H * 0.065],
        ["LeftEar", -H * 0.075, H * 0.015, 0],
        ["RightEar", H * 0.075, H * 0.015, 0]
    ];

    for (
        const [nombre, x, y, z]
        of faceBones
    ) {

        bone(
            nombre,
            head,
            x,
            y,
            z
        );
    }

    // ========================================================
    // CABELLO
    // ========================================================

    const hairNames = [
        "Bangs",
        "LeftHairFront",
        "LeftHairBack",
        "RightHairFront",
        "RightHairBack",
        "HairTop",
        "HairBack",
        "HairTipLeft",
        "HairTipRight"
    ];

    hairNames.forEach(
        (nombre, i) => {

            const lado =
                nombre.includes("Left")
                    ? -1
                    : nombre.includes("Right")
                        ? 1
                        : 0;

            bone(
                nombre,
                head,
                lado * H * 0.045,
                H * 0.025 -
                    i * H * 0.002,
                -H * 0.025
            );
        }
    );

    // ========================================================
    // HOMBROS + BRAZOS
    // ========================================================

    function crearBrazo(
        lado,
        nombre
    ) {

        const s =
            lado === "Left"
                ? -1
                : 1;

        const shoulder =
            bone(
                `${nombre}Shoulder`,
                chest,
                s * H * 0.105,
                H * 0.015,
                0
            );

        const upper =
            bone(
                `${nombre}Arm`,
                shoulder,
                s * H * 0.085,
                -H * 0.005,
                0
            );

        const fore =
            bone(
                `${nombre}ForeArm`,
                upper,
                s * H * 0.075,
                -H * 0.07,
                0
            );

        const hand =
            bone(
                `${nombre}Hand`,
                fore,
                s * H * 0.045,
                -H * 0.055,
                0
            );

        const wrist =
            bone(
                `${nombre}Wrist`,
                hand,
                s * H * 0.025,
                0,
                0
            );

        // Dedos
        const dedos = [
            "Thumb",
            "Index",
            "Middle",
            "Ring",
            "Pinky"
        ];

        dedos.forEach(
            (dedo, indice) => {

                let padre = wrist;

                for (
                    let segmento = 1;
                    segmento <= 3;
                    segmento++
                ) {

                    padre =
                        bone(
                            `${nombre}${dedo}${segmento}`,
                            padre,
                            s *
                                H *
                                (
                                    0.012 +
                                    indice * 0.002
                                ),
                            -H * 0.008,
                            (
                                indice - 2
                            ) *
                            H *
                            0.009
                        );
                }
            }
        );
    }

    crearBrazo(
        "Left",
        "Left"
    );

    crearBrazo(
        "Right",
        "Right"
    );

    // ========================================================
    // PIERNAS
    // ========================================================

    function crearPierna(
        lado,
        nombre
    ) {

        const s =
            lado === "Left"
                ? -1
                : 1;

        const hip =
            bone(
                `${nombre}UpLeg`,
                hips,
                s * H * 0.055,
                -H * 0.01,
                0
            );

        const knee =
            bone(
                `${nombre}Leg`,
                hip,
                0,
                -H * 0.16,
                0
            );

        const ankle =
            bone(
                `${nombre}Ankle`,
                knee,
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

        // Cinco dedos del pie
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

    crearPierna(
        "Left",
        "Left"
    );

    crearPierna(
        "Right",
        "Right"
    );

    // ========================================================
    // COLUMNA TORÁCICA / COSTILLAS
    // ========================================================

    const thoracic =
        [];

    let ribParent = hips;

    for (
        let i = 1;
        i <= 12;
        i++
    ) {

        ribParent =
            bone(
                `Thoracic_${i}`,
                ribParent,
                0,
                H * 0.012,
                0
            );

        thoracic.push(
            ribParent
        );

        const ancho =
            H *
            (
                0.095 -
                (i - 1) *
                0.002
            );

        for (
            const lado of [-1, 1]
        ) {

            const side =
                lado < 0
                    ? "Left"
                    : "Right";

            const r1 =
                bone(
                    `${side}Rib${i}_1`,
                    ribParent,
                    lado * ancho,
                    0,
                    0
                );

            const r2 =
                bone(
                    `${side}Rib${i}_2`,
                    r1,
                    lado * ancho * 0.75,
                    -H * 0.004,
                    -H * 0.012
                );

            bone(
                `${side}Rib${i}_3`,
                r2,
                -lado * ancho * 0.45,
                0,
                -H * 0.012
            );
        }
    }

    bone(
        "Sternum",
        thoracic[11],
        0,
        0,
        -H * 0.035
    );

    // ========================================================
    // CREAR SKELETON
    // ========================================================

    rig.updateMatrixWorld(true);

    const skeleton =
        new THREE.Skeleton(
            bones
        );

    // ========================================================
    // CONVERTIR MALLAS A SKINNEDMESH
    // ========================================================

    const meshes = [];

    modelo.traverse(
        objeto => {

            if (
                !objeto.isMesh
            ) {
                return;
            }

            meshes.push(
                objeto
            );
        }
    );

    meshes.forEach(
        mesh => {

            const geometry =
                mesh.geometry.clone();

            const material =
                mesh.material;

            geometry.applyMatrix4(
                mesh.matrix
            );

            const skinned =
                new THREE.SkinnedMesh(
                    geometry,
                    material
                );

            skinned.name =
                mesh.name ||
                "Micaela_SkinnedMesh";

            skinned.position.copy(
                mesh.position
            );

            skinned.rotation.copy(
                mesh.rotation
            );

            skinned.scale.copy(
                mesh.scale
            );

            // ------------------------------------------------
            // PESOS AUTOMÁTICOS POR CERCANÍA
            // ------------------------------------------------

            const posiciones =
                geometry.attributes.position;

            const indices = [];
            const pesos = [];

            const worldBones =
                bones.map(
                    b => {

                        const p =
                            new THREE.Vector3();

                        b.getWorldPosition(p);

                        return p;
                    }
                );

            for (
                let i = 0;
                i < posiciones.count;
                i++
            ) {

                const v =
                    new THREE.Vector3()
                        .fromBufferAttribute(
                            posiciones,
                            i
                        );

                const distancias =
                    bones.map(
                        (b, bi) => {

                            const p =
                                worldBones[bi];

                            return {
                                bi,
                                d:
                                    v.distanceToSquared(
                                        p
                                    )
                            };
                        }
                    );

                distancias.sort(
                    (a, b) =>
                        a.d - b.d
                );

                const cuatro =
                    distancias.slice(
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

                const ids =
                    [0, 0, 0, 0];

                const ws =
                    [0, 0, 0, 0];

                cuatro.forEach(
                    (item, n) => {

                        ids[n] =
                            item.bi;

                        ws[n] =
                            item.w /
                            suma;
                    }
                );

                indices.push(
                    ...ids
                );

                pesos.push(
                    ...ws
                );
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
                    pesos,
                    4
                )
            );

            skinned.add(
                root
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
    // ANIMACIONES PROCEDURALES
    // ========================================================

    let animacion =
        "idle";

    let tiempo =
        0;

    const baseRot =
        new Map();

    bones.forEach(
        b => {

            baseRot.set(
                b.name,
                b.rotation.clone()
            );
        }
    );

    function restaurarPose() {

        bones.forEach(
            b => {

                const r =
                    baseRot.get(
                        b.name
                    );

                if (r) {
                    b.rotation.copy(r);
                }
            }
        );
    }

    function actualizarAnimacion(
        delta
    ) {

        tiempo += delta;

        restaurarPose();

        const spine =
            porNombre.Spine_3;

        const headBone =
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

            const respiracion =
                Math.sin(
                    tiempo * 3
                );

            spine.rotation.x =
                respiracion *
                0.025;

            headBone.rotation.z =
                Math.sin(
                    tiempo * 1.5
                ) *
                0.015;

            leftArm.rotation.z =
                -0.04;

            rightArm.rotation.z =
                0.04;
        }

        if (
            animacion ===
            "caminar"
        ) {

            const paso =
                Math.sin(
                    tiempo * 9
                );

            leftLeg.rotation.x =
                paso *
                0.45;

            rightLeg.rotation.x =
                -paso *
                0.45;

            leftArm.rotation.x =
                -paso *
                0.25;

            rightArm.rotation.x =
                paso *
                0.25;

            spine.rotation.z =
                Math.sin(
                    tiempo * 9
                ) *
                0.025;
        }

        if (
            animacion ===
            "correr"
        ) {

            const paso =
                Math.sin(
                    tiempo * 14
                );

            leftLeg.rotation.x =
                paso *
                0.75;

            rightLeg.rotation.x =
                -paso *
                0.75;

            leftArm.rotation.x =
                -paso *
                0.55;

            rightArm.rotation.x =
                paso *
                0.55;

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

            headBone.rotation.x =
                0.15;
        }

        if (
            animacion ===
            "cavar"
        ) {

            leftArm.rotation.x =
                Math.sin(
                    tiempo * 10
                ) *
                0.8;

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
                ) *
                0.45;

            spine.rotation.z =
                Math.sin(
                    tiempo * 5
                ) *
                0.08;
        }

        if (
            animacion ===
            "feliz"
        ) {

            spine.rotation.z =
                Math.sin(
                    tiempo * 6
                ) *
                0.08;

            leftArm.rotation.z =
                -0.5;

            rightArm.rotation.z =
                0.5;
        }
    }

    // ========================================================
    // API DEL PERSONAJE
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
        actualizarAnimacion;

    // ========================================================
    // POSICIÓN
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

        const delta =
            reloj.getDelta();

        actualizarAnimacion(
            delta
        );

        renderer.render(
            escena,
            camara
        );
    }

    loop();

    return personaje;
        }
