// =====================================================
// 🎮 GAMERPRO GAME — RIG MICAELA
// 🦴 EDITOR MANUAL DE HUESOS 3D
// =====================================================

import * as THREE from "three";

import {
    GLTFLoader
} from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/loaders/GLTFLoader.js";


// =====================================================
// 🚀 INICIAR EDITOR
// =====================================================

export function iniciarRigMicaela(game) {

    // =================================================
    // 🧹 LIMPIAR
    // =================================================

    game.innerHTML = "";


    // =================================================
    // 🌎 ESCENA
    // =================================================

    const escena =
        new THREE.Scene();

    escena.background =
        new THREE.Color(0x87ceeb);


    // =================================================
    // 📷 CÁMARA
    // =================================================

    const camara =
        new THREE.PerspectiveCamera(
            45,
            window.innerWidth /
                window.innerHeight,
            0.01,
            1000
        );

    camara.position.set(
        0,
        1.5,
        5
    );


    // =================================================
    // 🖥️ RENDERER
    // =================================================

    const renderer =
        new THREE.WebGLRenderer({
            antialias: true
        });

    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            1.5
        )
    );

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    renderer.outputColorSpace =
        THREE.SRGBColorSpace;

    Object.assign(
        renderer.domElement.style,
        {
            position: "fixed",
            inset: "0",
            width: "100%",
            height: "100%",
            zIndex: "9999",
            touchAction: "none"
        }
    );

    game.appendChild(
        renderer.domElement
    );


    // =================================================
    // 💡 LUCES
    // =================================================

    const luzAmbiente =
        new THREE.HemisphereLight(
            0xffffff,
            0x555555,
            2
        );

    escena.add(
        luzAmbiente
    );


    const luz =
        new THREE.DirectionalLight(
            0xffffff,
            3
        );

    luz.position.set(
        3,
        6,
        5
    );

    escena.add(luz);


    // =================================================
    // 🧍 CARGAR MICAELA
    // =================================================

    const loader =
        new GLTFLoader();

    let micaela = null;

    loader.load(
        "./3D/micaela.glb",

        (gltf) => {

            micaela =
                gltf.scene;

            escena.add(
                micaela
            );


            // -----------------------------------------
            // CENTRAR MODELO
            // -----------------------------------------

            const caja =
                new THREE.Box3()
                    .setFromObject(
                        micaela
                    );

            const centro =
                new THREE.Vector3();

            caja.getCenter(
                centro
            );

            micaela.position.sub(
                centro
            );


            // -----------------------------------------
            // AJUSTAR CÁMARA
            // -----------------------------------------

            const tamaño =
                new THREE.Vector3();

            caja.getSize(
                tamaño
            );

            const mayor =
                Math.max(
                    tamaño.x,
                    tamaño.y,
                    tamaño.z
                );

            camara.position.set(
                0,
                mayor * 0.45,
                mayor * 2.8
            );

            camara.lookAt(
                0,
                mayor * 0.45,
                0
            );


            console.log(
                "🧍 MICAELA 3D CARGADA"
            );

            console.log(
                "📦 Tamaño:",
                tamaño
            );
        },

        undefined,

        (error) => {

            console.error(
                "❌ ERROR CARGANDO MICAELA:",
                error
            );
        }
    );


    // =================================================
    // 🦴 ESQUELETO MANUAL
    // =================================================

    const huesos = [];

    const nombres =
        [
            "Pelvis",
            "Spine",
            "Chest",
            "Neck",
            "Head",

            "Shoulder_L",
            "UpperArm_L",
            "LowerArm_L",
            "Hand_L",

            "Shoulder_R",
            "UpperArm_R",
            "LowerArm_R",
            "Hand_R",

            "UpperLeg_L",
            "LowerLeg_L",
            "Foot_L",

            "UpperLeg_R",
            "LowerLeg_R",
            "Foot_R"
        ];


    // =================================================
    // 📍 POSICIONES INICIALES
    // =================================================

    const posiciones =
        {

            Pelvis:
                [0, 0.9, 0],

            Spine:
                [0, 1.25, 0],

            Chest:
                [0, 1.6, 0],

            Neck:
                [0, 1.95, 0],

            Head:
                [0, 2.25, 0],


            Shoulder_L:
                [-0.35, 1.7, 0],

            UpperArm_L:
                [-0.65, 1.55, 0],

            LowerArm_L:
                [-0.9, 1.3, 0],

            Hand_L:
                [-1.05, 1.05, 0],


            Shoulder_R:
                [0.35, 1.7, 0],

            UpperArm_R:
                [0.65, 1.55, 0],

            LowerArm_R:
                [0.9, 1.3, 0],

            Hand_R:
                [1.05, 1.05, 0],


            UpperLeg_L:
                [-0.2, 0.65, 0],

            LowerLeg_L:
                [-0.2, 0.3, 0],

            Foot_L:
                [-0.2, 0.05, 0],


            UpperLeg_R:
                [0.2, 0.65, 0],

            LowerLeg_R:
                [0.2, 0.3, 0],

            Foot_R:
                [0.2, 0.05, 0]
        };


    // =================================================
    // 🎨 CREAR MARCADORES
    // =================================================

    const geometriaHueso =
        new THREE.SphereGeometry(
            0.07,
            12,
            12
        );


    nombres.forEach(
        (nombre) => {

            const material =
                new THREE.MeshBasicMaterial({
                    color: 0xff3333
                });

            const marcador =
                new THREE.Mesh(
                    geometriaHueso,
                    material
                );

            const p =
                posiciones[nombre];

            marcador.position.set(
                p[0],
                p[1],
                p[2]
            );

            marcador.userData.nombre =
                nombre;

            escena.add(
                marcador
            );

            huesos.push(
                marcador
            );
        }
    );


    // =================================================
    // 🦴 LÍNEAS ENTRE HUESOS
    // =================================================

    const conexiones = [

        ["Pelvis", "Spine"],
        ["Spine", "Chest"],
        ["Chest", "Neck"],
        ["Neck", "Head"],

        ["Chest", "Shoulder_L"],
        ["Shoulder_L", "UpperArm_L"],
        ["UpperArm_L", "LowerArm_L"],
        ["LowerArm_L", "Hand_L"],

        ["Chest", "Shoulder_R"],
        ["Shoulder_R", "UpperArm_R"],
        ["UpperArm_R", "LowerArm_R"],
        ["LowerArm_R", "Hand_R"],

        ["Pelvis", "UpperLeg_L"],
        ["UpperLeg_L", "LowerLeg_L"],
        ["LowerLeg_L", "Foot_L"],

        ["Pelvis", "UpperLeg_R"],
        ["UpperLeg_R", "LowerLeg_R"],
        ["LowerLeg_R", "Foot_R"]
    ];


    const lineas =
        new THREE.Group();

    escena.add(
        lineas
    );


    function actualizarHuesosVisuales() {

        lineas.clear();

        conexiones.forEach(
            ([a, b]) => {

                const huesoA =
                    huesos.find(
                        h =>
                            h.userData.nombre === a
                    );

                const huesoB =
                    huesos.find(
                        h =>
                            h.userData.nombre === b
                    );

                if (!huesoA || !huesoB)
                    return;


                const puntos = [
                    huesoA.position.clone(),
                    huesoB.position.clone()
                ];


                const geometria =
                    new THREE.BufferGeometry()
                        .setFromPoints(
                            puntos
                        );


                const linea =
                    new THREE.Line(
                        geometria,
                        new THREE.LineBasicMaterial({
                            color: 0xffff00
                        })
                    );


                lineas.add(
                    linea
                );
            }
        );
    }

    actualizarHuesosVisuales();


    // =================================================
    // 👆 CONTROL TÁCTIL
    // =================================================

    const raycaster =
        new THREE.Raycaster();

    const mouse =
        new THREE.Vector2();

    let seleccionado = null;


    renderer.domElement.addEventListener(
        "pointerdown",
        (evento) => {

            const rect =
                renderer.domElement
                    .getBoundingClientRect();

            mouse.x =
                (
                    (evento.clientX - rect.left)
                    / rect.width
                ) * 2 - 1;

            mouse.y =
                -(
                    (evento.clientY - rect.top)
                    / rect.height
                ) * 2 + 1;


            raycaster.setFromCamera(
                mouse,
                camara
            );


            const impactos =
                raycaster.intersectObjects(
                    huesos
                );


            if (
                impactos.length > 0
            ) {

                seleccionado =
                    impactos[0].object;

                seleccionado.material.color
                    .set(0x00ff00);

                console.log(
                    "🦴 SELECCIONADO:",
                    seleccionado.userData.nombre
                );
            }
        }
    );


    renderer.domElement.addEventListener(
        "pointermove",
        (evento) => {

            if (!seleccionado)
                return;


            const rect =
                renderer.domElement
                    .getBoundingClientRect();

            mouse.x =
                (
                    (evento.clientX - rect.left)
                    / rect.width
                ) * 2 - 1;

            mouse.y =
                -(
                    (evento.clientY - rect.top)
                    / rect.height
                ) * 2 + 1;


            const distancia =
                seleccionado.position
                    .distanceTo(
                        camara.position
                    );


            const punto =
                new THREE.Vector3(
                    mouse.x,
                    mouse.y,
                    0.5
                )
                    .unproject(
                        camara
                    );


            const direccion =
                punto.sub(
                    camara.position
                )
                .normalize();


            const posicion =
                camara.position.clone()
                    .add(
                        direccion.multiplyScalar(
                            distancia
                        )
                    );


            seleccionado.position.copy(
                posicion
            );


            actualizarHuesosVisuales();
        }
    );


    renderer.domElement.addEventListener(
        "pointerup",
        () => {

            if (seleccionado) {

                seleccionado.material.color
                    .set(0xff3333);

                console.log(
                    "📍 POSICIÓN:",
                    seleccionado.userData.nombre,
                    seleccionado.position
                );
            }

            seleccionado = null;
        }
    );


    // =================================================
    // 📱 RESIZE
    // =================================================

    function ajustarPantalla() {

        camara.aspect =
            window.innerWidth /
            window.innerHeight;

        camara.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );
    }

    window.addEventListener(
        "resize",
        ajustarPantalla
    );


    // =================================================
    // 🔄 LOOP
    // =================================================

    function animar() {

        requestAnimationFrame(
            animar
        );

        renderer.render(
            escena,
            camara
        );
    }

    animar();
        }
