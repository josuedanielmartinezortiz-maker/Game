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
// PESOS DE DEFORMACIÓN DEL CUERPO
// ------------------------------------------------

// No usamos costillas, dedos, cara, cabello ni dedos
// de los pies como influencias principales.
// Esto evita que el cuerpo se parta al animar.

const nombresDeformacion = [

    "Root",

    "Hips",

    "Spine_1",
    "Spine_2",
    "Spine_3",
    "Spine_4",
    "Spine_5",

    "Chest",
    "Neck",
    "Head",

    "LeftShoulder",
    "LeftArm",
    "LeftForeArm",
    "LeftHand",

    "RightShoulder",
    "RightArm",
    "RightForeArm",
    "RightHand",

    "LeftUpLeg",
    "LeftLeg",
    "LeftAnkle",
    "LeftFoot",

    "RightUpLeg",
    "RightLeg",
    "RightAnkle",
    "RightFoot"

];


const huesosDeformacion =
    nombresDeformacion
        .map(
            nombre =>
                porNombre[nombre]
        )
        .filter(
            Boolean
        );


const indicesHuesos =
    huesosDeformacion.map(
        hueso =>
            bones.indexOf(hueso)
    );


const posiciones =
    geometry.attributes.position;

const indices = [];
const pesos = [];


// ------------------------------------------------
// POSICIÓN DE LOS HUESOS PRINCIPALES
// ------------------------------------------------

const posicionesHuesos =
    huesosDeformacion.map(
        hueso => {

            const posicion =
                new THREE.Vector3();

            hueso.getWorldPosition(
                posicion
            );

            return posicion;
        }
    );


// ------------------------------------------------
// CALCULAR PESOS
// ------------------------------------------------

for (
    let i = 0;
    i < posiciones.count;
    i++
) {

    const vertice =
        new THREE.Vector3()
            .fromBufferAttribute(
                posiciones,
                i
            );


    const candidatos = [];


    for (
        let h = 0;
        h < posicionesHuesos.length;
        h++
    ) {

        const distancia =
            vertice.distanceToSquared(
                posicionesHuesos[h]
            );


        candidatos.push({

            indice:
                indicesHuesos[h],

            distancia:
                distancia

        });

    }


    // Los cuatro huesos corporales
    // más cercanos.

    candidatos.sort(
        (a, b) =>
            a.distancia -
            b.distancia
    );


    const cuatro =
        candidatos.slice(
            0,
            4
        );


    let suma = 0;


    for (
        const candidato
        of cuatro
    ) {

        candidato.peso =
            1 /
            (
                Math.sqrt(
                    candidato.distancia
                ) +
                0.0001
            );


        suma +=
            candidato.peso;

    }


    const ids =
        [0, 0, 0, 0];

    const ws =
        [0, 0, 0, 0];


    for (
        let n = 0;
        n < cuatro.length;
        n++
    ) {

        ids[n] =
            cuatro[n].indice;


        ws[n] =
            cuatro[n].peso /
            suma;

    }


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
// ========================================================
// ANIMACIONES PROCEDURALES — CUERPO COMPLETO
// ========================================================

let animacion =
    "idle";

let tiempo =
    0;


// --------------------------------------------------------
// GUARDAR ROTACIONES BASE
// --------------------------------------------------------

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


// --------------------------------------------------------
// RESTAURAR POSE
// --------------------------------------------------------

function restaurarPose() {

    bones.forEach(
        b => {

            const r =
                baseRot.get(
                    b.name
                );


            if (r) {

                b.rotation.copy(
                    r
                );

            }

        }
    );

}


// --------------------------------------------------------
// ROTAR SI EXISTE
// --------------------------------------------------------

function rotar(
    nombre,
    x = 0,
    y = 0,
    z = 0
) {

    const b =
        porNombre[nombre];


    if (!b) {
        return;
    }


    b.rotation.x += x;
    b.rotation.y += y;
    b.rotation.z += z;

}


// --------------------------------------------------------
// COLUMNA COMPLETA
// --------------------------------------------------------

function columna(
    x = 0,
    y = 0,
    z = 0
) {

    rotar(
        "Spine_1",
        x * 0.10,
        y * 0.10,
        z * 0.10
    );


    rotar(
        "Spine_2",
        x * 0.15,
        y * 0.15,
        z * 0.15
    );


    rotar(
        "Spine_3",
        x * 0.20,
        y * 0.20,
        z * 0.20
    );


    rotar(
        "Spine_4",
        x * 0.25,
        y * 0.25,
        z * 0.25
    );


    rotar(
        "Spine_5",
        x * 0.30,
        y * 0.30,
        z * 0.30
    );


    rotar(
        "Chest",
        x * 0.25,
        y * 0.25,
        z * 0.25
    );

}


// --------------------------------------------------------
// ANIMACIÓN
// --------------------------------------------------------

function actualizarAnimacion(
    delta
) {

    tiempo +=
        delta;


    restaurarPose();


    // ====================================================
    // HUESOS PRINCIPALES
    // ====================================================

    const hips =
        porNombre.Hips;

    const head =
        porNombre.Head;

    const neck =
        porNombre.Neck;


    // ====================================================
    // IDLE
    // ====================================================

    if (
        animacion ===
        "idle"
    ) {

        const respiracion =
            Math.sin(
                tiempo * 2.5
            );


        // Cuerpo completo
        columna(
            respiracion *
            0.025,

            0,

            respiracion *
            0.008
        );


        rotar(
            "Hips",
            0,
            0,
            respiracion *
            0.012
        );


        rotar(
            "Neck",
            respiracion *
            0.015,
            0,
            0
        );


        rotar(
            "Head",
            0,
            0,
            Math.sin(
                tiempo * 1.4
            ) *
            0.025
        );


        // Brazos relajados
        rotar(
            "LeftShoulder",
            0,
            0,
            -0.035
        );


        rotar(
            "RightShoulder",
            0,
            0,
            0.035
        );

    }


    // ====================================================
    // CAMINAR
    // ====================================================

    if (
        animacion ===
        "caminar"
    ) {

        const paso =
            Math.sin(
                tiempo * 8
            );


        const cuerpo =
            Math.sin(
                tiempo * 8
            );


        // Cadera
        rotar(
            "Hips",
            0,
            0,
            cuerpo *
            0.045
        );


        // Columna completa
        columna(
            0,
            0,
            cuerpo *
            0.035
        );


        // Pierna izquierda
        rotar(
            "LeftUpLeg",
            paso *
            0.38,
            0,
            0
        );


        rotar(
            "LeftLeg",
            -Math.max(
                0,
                -paso
            ) *
            0.22,
            0,
            0
        );


        // Pierna derecha
        rotar(
            "RightUpLeg",
            -paso *
            0.38,
            0,
            0
        );


        rotar(
            "RightLeg",
            Math.max(
                0,
                paso
            ) *
            0.22,
            0,
            0
        );


        // Brazos
        rotar(
            "LeftShoulder",
            0,
            0,
            -paso *
            0.12
        );


        rotar(
            "RightShoulder",
            0,
            0,
            paso *
            0.12
        );


        rotar(
            "LeftArm",
            -paso *
            0.28,
            0,
            0
        );


        rotar(
            "RightArm",
            paso *
            0.28,
            0,
            0
        );


        // Antebrazos
        rotar(
            "LeftForeArm",
            Math.max(
                0,
                paso
            ) *
            0.10,
            0,
            0
        );


        rotar(
            "RightForeArm",
            Math.max(
                0,
                -paso
            ) *
            0.10,
            0,
            0
        );


        // Cabeza
        rotar(
            "Head",
            0,
            0,
            -cuerpo *
            0.025
        );

    }


    // ====================================================
    // CORRER
    // ====================================================

    if (
        animacion ===
        "correr"
    ) {

        const paso =
            Math.sin(
                tiempo * 13
            );


        const rebote =
            Math.abs(
                Math.sin(
                    tiempo * 13
                )
            );


        // Cadera
        rotar(
            "Hips",
            rebote *
            0.035,
            0,
            paso *
            0.07
        );


        // Inclinación completa
        columna(
            -0.12,
            0,
            paso *
            0.045
        );


        // Piernas
        rotar(
            "LeftUpLeg",
            paso *
            0.62,
            0,
            0
        );


        rotar(
            "RightUpLeg",
            -paso *
            0.62,
            0,
            0
        );


        rotar(
            "LeftLeg",
            -Math.max(
                0,
                -paso
            ) *
            0.42,
            0,
            0
        );


        rotar(
            "RightLeg",
            Math.max(
                0,
                paso
            ) *
            0.42,
            0,
            0
        );


        // Hombros
        rotar(
            "LeftShoulder",
            0,
            0,
            -paso *
            0.20
        );


        rotar(
            "RightShoulder",
            0,
            0,
            paso *
            0.20
        );


        // Brazos
        rotar(
            "LeftArm",
            -paso *
            0.48,
            0,
            0
        );


        rotar(
            "RightArm",
            paso *
            0.48,
            0,
            0
        );


        // Antebrazos
        rotar(
            "LeftForeArm",
            Math.max(
                0,
                paso
            ) *
            0.22,
            0,
            0
        );


        rotar(
            "RightForeArm",
            Math.max(
                0,
                -paso
            ) *
            0.22,
            0,
            0
        );


        // Cabeza estabilizada
        rotar(
            "Neck",
            0.04,
            0,
            -paso *
            0.025
        );


        rotar(
            "Head",
            -0.02,
            0,
            paso *
            0.025
        );

    }


    // ====================================================
    // SALTAR
    // ====================================================

    if (
        animacion ===
        "saltar"
    ) {

        const salto =
            Math.sin(
                tiempo * 5
            );


        columna(
            -0.08,
            0,
            salto *
            0.025
        );


        rotar(
            "Hips",
            -0.10,
            0,
            0
        );


        rotar(
            "LeftUpLeg",
            -0.35,
            0,
            0
        );


        rotar(
            "RightUpLeg",
            -0.35,
            0,
            0
        );


        rotar(
            "LeftLeg",
            0.25,
            0,
            0
        );


        rotar(
            "RightLeg",
            0.25,
            0,
            0
        );


        rotar(
            "LeftShoulder",
            0,
            0,
            -0.15
        );


        rotar(
            "RightShoulder",
            0,
            0,
            0.15
        );


        rotar(
            "LeftArm",
            -0.45,
            0,
            0
        );


        rotar(
            "RightArm",
            -0.45,
            0,
            0
        );


        rotar(
            "Head",
            -0.05,
            0,
            0
        );

    }


    // ====================================================
    // RECOLECTAR
    // ====================================================

    if (
        animacion ===
        "recolectar"
    ) {

        columna(
            0.18,
            0,
            0
        );


        rotar(
            "Hips",
            0.08,
            0,
            0
        );


        rotar(
            "LeftShoulder",
            0,
            0,
            -0.15
        );


        rotar(
            "RightShoulder",
            0,
            0,
            0.15
        );


        rotar(
            "LeftArm",
            -0.65,
            0,
            0
        );


        rotar(
            "RightArm",
            -0.65,
            0,
            0
        );


        rotar(
            "LeftForeArm",
            -0.25,
            0,
            0
        );


        rotar(
            "RightForeArm",
            -0.25,
            0,
            0
        );


        rotar(
            "Neck",
            0.08,
            0,
            0
        );


        rotar(
            "Head",
            0.12,
            0,
            0
        );

    }


    // ====================================================
    // CAVAR
    // ====================================================

    if (
        animacion ===
        "cavar"
    ) {

        const golpe =
            Math.sin(
                tiempo * 9
            );


        columna(
            0.16,
            0,
            golpe *
            0.04
        );


        rotar(
            "Hips",
            0.08,
            0,
            0
        );


        rotar(
            "LeftShoulder",
            0,
            0,
            -0.15
        );


        rotar(
            "LeftArm",
            -0.55 -
            golpe *
            0.35,
            0,
            0
        );


        rotar(
            "LeftForeArm",
            -0.30 +
            golpe *
            0.20,
            0,
            0
        );


        rotar(
            "RightShoulder",
            0,
            0,
            0.10
        );


        rotar(
            "RightArm",
            -0.35,
            0,
            0
        );


        rotar(
            "RightForeArm",
            -0.20,
            0,
            0
        );


        rotar(
            "Head",
            0.10,
            0,
            0
        );

    }


    // ====================================================
    // REGAR
    // ====================================================

    if (
        animacion ===
        "regar"
    ) {

        const movimiento =
            Math.sin(
                tiempo * 5
            );


        columna(
            0.05,
            0,
            movimiento *
            0.025
        );


        rotar(
            "Hips",
            0,
            0,
            movimiento *
            0.025
        );


        rotar(
            "RightShoulder",
            0,
            0,
            0.15
        );


        rotar(
            "RightArm",
            -0.55,
            0,
            0
        );


        rotar(
            "RightForeArm",
            movimiento *
            0.30,
            0,
            0
        );


        rotar(
            "LeftShoulder",
            0,
            0,
            -0.10
        );


        rotar(
            "LeftArm",
            -0.30,
            0,
            0
        );


        rotar(
            "Head",
            0.05,
            0,
            0
        );

    }


    // ====================================================
    // FELIZ
    // ====================================================

    if (
        animacion ===
        "feliz"
    ) {

        const alegria =
            Math.sin(
                tiempo * 6
            );


        columna(
            alegria *
            0.04,
            0,
            alegria *
            0.08
        );


        rotar(
            "Hips",
            0,
            0,
            alegria *
            0.10
        );


        rotar(
            "LeftShoulder",
            0,
            0,
            -0.30
        );


        rotar(
            "RightShoulder",
            0,
            0,
            0.30
        );


        rotar(
            "LeftArm",
            -0.25,
            0,
            -0.25
        );


        rotar(
            "RightArm",
            -0.25,
            0,
            0.25
        );


        rotar(
            "LeftForeArm",
            alegria *
            0.30,
            0,
            0
        );


        rotar(
            "RightForeArm",
            -alegria *
            0.30,
            0,
            0
        );


        rotar(
            "Head",
            0,
            0,
            alegria *
            0.05
        );

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
