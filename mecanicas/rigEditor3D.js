// =====================================================
// 🎮 GAMERPRO GAME — EDITOR DE RIG 3D
// 🦴 FASE 1 — MODELO MOVIBLE + BLOQUEO
// =====================================================

import * as THREE from "three";

import {
    GLTFLoader
} from
    "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/loaders/GLTFLoader.js";

import {
    TransformControls
} from
    "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/controls/TransformControls.js";


// =====================================================
// 🚀 INICIAR EDITOR
// =====================================================

export function iniciarRigEditor3D(game) {

    game.innerHTML = "";


    // =================================================
    // 🌎 ESCENA
    // =================================================

    const scene =
        new THREE.Scene();

    scene.background =
        new THREE.Color(0x20252b);


    // =================================================
    // 📷 CÁMARA
    // =================================================

    const camera =
        new THREE.PerspectiveCamera(
            45,
            window.innerWidth /
            window.innerHeight,
            0.01,
            1000
        );

    camera.position.set(
        0,
        1.5,
        4
    );

    camera.lookAt(
        0,
        1,
        0
    );


    // =================================================
    // 🎨 RENDERER
    // =================================================

    const renderer =
        new THREE.WebGLRenderer({
            antialias: true
        });

    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    renderer.domElement.style.touchAction =
        "none";

    game.appendChild(
        renderer.domElement
    );


    // =================================================
    // 💡 ILUMINACIÓN
    // =================================================

    const luzAmbiente =
        new THREE.HemisphereLight(
            0xffffff,
            0x444444,
            2
        );

    scene.add(
        luzAmbiente
    );


    const luzDireccional =
        new THREE.DirectionalLight(
            0xffffff,
            2
        );

    luzDireccional.position.set(
        3,
        5,
        4
    );

    scene.add(
        luzDireccional
    );


    // =================================================
    // 📐 GRID
    // =================================================

    const grid =
        new THREE.GridHelper(
            10,
            20
        );

    scene.add(
        grid
    );


    // =================================================
    // 🧍 MODELO
    // =================================================

    let modelo = null;

    let modeloBloqueado = false;


    // =================================================
    // 🎛️ TRANSFORM CONTROLS
    // =================================================

    const transformControls =
        new TransformControls(
            camera,
            renderer.domElement
        );

    transformControls.setMode(
        "translate"
    );

    transformControls.setSpace(
        "world"
    );

    transformControls.setSize(
        0.8
    );


    scene.add(
        transformControls.getHelper()
    );


    // =================================================
    // 🦴 GRUPO DEL RIG
    // =================================================

    let grupoHuesos = null;


    // =================================================
    // 🎯 SELECCIÓN DEL MODELO
    // =================================================

    const raycaster =
        new THREE.Raycaster();

    const puntero =
        new THREE.Vector2();


    function obtenerPuntero(
        evento
    ) {

        const rect =
            renderer.domElement.getBoundingClientRect();


        puntero.x =
            (
                evento.clientX -
                rect.left
            ) /
            rect.width *
            2 -
            1;


        puntero.y =
            -(
                (
                    evento.clientY -
                    rect.top
                ) /
                rect.height *
                2 -
                1
            );

    }


    // =================================================
    // 🖱️ / 👆 SELECCIONAR MICAELA
    // =================================================

    renderer.domElement.addEventListener(
        "pointerdown",
        (evento) => {

            if (
                modeloBloqueado
            ) {

                return;

            }


            if (
                !modelo
            ) {

                return;

            }


            obtenerPuntero(
                evento
            );


            raycaster.setFromCamera(
                puntero,
                camera
            );


            const objetos =
                [];


            modelo.traverse(
                (objeto) => {

                    if (
                        objeto.isMesh
                    ) {

                        objetos.push(
                            objeto
                        );

                    }

                }
            );


            const impactos =
                raycaster.intersectObjects(
                    objetos,
                    true
                );


            if (
                impactos.length === 0
            ) {

                return;

            }


            transformControls.attach(
                modelo
            );

        }
    );


    // =================================================
    // 🔒 BLOQUEAR / DESBLOQUEAR
    // =================================================

    const botonBloqueo =
        document.createElement(
            "button"
        );


    botonBloqueo.type =
        "button";


    botonBloqueo.textContent =
        "🔓 Micaela desbloqueada";


    Object.assign(
        botonBloqueo.style,
        {

            position: "fixed",

            top: "70px",

            left: "10px",

            zIndex: "200",

            padding: "10px 14px",

            border: "none",

            borderRadius: "10px",

            background: "#222",

            color: "#fff",

            fontSize: "15px",

            fontWeight: "bold",

            cursor: "pointer"

        }
    );


    game.appendChild(
        botonBloqueo
    );


    botonBloqueo.addEventListener(
        "click",
        () => {

            modeloBloqueado =
                !modeloBloqueado;


            if (
                modeloBloqueado
            ) {

                transformControls.detach();


                botonBloqueo.textContent =
                    "🔒 Micaela bloqueada";


                botonBloqueo.style.background =
                    "#333";

            } else {

                botonBloqueo.textContent =
                    "🔓 Micaela desbloqueada";


                botonBloqueo.style.background =
                    "#222";

            }

        }
    );


    // =================================================
    // 🧍 CARGAR MICAELA
    // =================================================

    const loader =
        new GLTFLoader();


    loader.load(

        "../3D/micaela.glb",

        (gltf) => {

            modelo =
                gltf.scene;


            // -----------------------------------------
            // 📍 POSICIÓN INICIAL
            // -----------------------------------------

            modelo.position.set(
                0,
                0.65,
                0
            );


            // -----------------------------------------
            // 📏 ESCALA
            // -----------------------------------------

            modelo.scale.set(
                1,
                1,
                1
            );


            scene.add(
                modelo
            );


            console.log(
                "🧍 Micaela cargada"
            );


            // -----------------------------------------
            // 🧩 MALLAS
            // -----------------------------------------

            modelo.traverse(
                (objeto) => {

                    if (
                        objeto.isMesh
                    ) {

                        console.log(
                            "🧩 Malla:",
                            objeto.name
                        );

                    }

                }
            );


            // -----------------------------------------
            // 🦴 CREAR RIG
            // -----------------------------------------

            crearEsqueleto(
                modelo
            );

        },

        undefined,

        (error) => {

            console.error(
                "❌ Error cargando Micaela:",
                error
            );

        }

    );


    // =================================================
    // 🦴 CREAR ESQUELETO
    // =================================================

    function crearEsqueleto(
        modelo
    ) {

        const bones = [];


        // =============================================
        // ROOT
        // =============================================

        const root =
            crearBone(
                "root",
                0,
                0,
                0
            );

        bones.push(
            root
        );


        // =============================================
        // PELVIS
        // =============================================

        const pelvis =
            crearBone(
                "pelvis",
                0,
                0.9,
                0
            );

        root.add(
            pelvis
        );

        bones.push(
            pelvis
        );


        // =============================================
        // SPINE
        // =============================================

        const spine =
            crearBone(
                "spine",
                0,
                0.35,
                0
            );

        pelvis.add(
            spine
        );

        bones.push(
            spine
        );


        // =============================================
        // CHEST
        // =============================================

        const chest =
            crearBone(
                "chest",
                0,
                0.35,
                0
            );

        spine.add(
            chest
        );

        bones.push(
            chest
        );


        // =============================================
        // NECK
        // =============================================

        const neck =
            crearBone(
                "neck",
                0,
                0.35,
                0
            );

        chest.add(
            neck
        );

        bones.push(
            neck
        );


        // =============================================
        // HEAD
        // =============================================

        const head =
            crearBone(
                "head",
                0,
                0.25,
                0
            );

        neck.add(
            head
        );

        bones.push(
            head
        );


        // =============================================
        // LEGS
        // =============================================

        crearPierna(
            pelvis,
            bones,
            "L",
            -0.18
        );


        crearPierna(
            pelvis,
            bones,
            "R",
            0.18
        );


        // =============================================
        // ARMS
        // =============================================

        crearBrazo(
            chest,
            bones,
            "L",
            -0.45
        );


        crearBrazo(
            chest,
            bones,
            "R",
            0.45
        );


        // =============================================
        // GROUP
        // =============================================

        grupoHuesos =
            new THREE.Group();


        grupoHuesos.name =
            "RIG_MICAELA";


        grupoHuesos.add(
            root
        );


        scene.add(
            grupoHuesos
        );


        console.log(
            "🦴 Rig Micaela creado"
        );

    }


    // =================================================
    // 🔴 CREAR PUNTO / HUESO
    // =================================================

    function crearBone(
        nombre,
        x,
        y,
        z
    ) {

        const bone =
            new THREE.Bone();


        bone.name =
            nombre;


        bone.position.set(
            x,
            y,
            z
        );


        const marcador =
            new THREE.Mesh(

                new THREE.SphereGeometry(
                    0.045,
                    12,
                    12
                ),

                new THREE.MeshBasicMaterial({

                    color:
                        0xff3333

                })

            );


        marcador.name =
            "MARCADOR_" +
            nombre;


        bone.add(
            marcador
        );


        return bone;

    }


    // =================================================
    // 🦵 PIERNA
    // =================================================

    function crearPierna(
        padre,
        bones,
        lado,
        x
    ) {

        const cadera =
            crearBone(
                `hip_${lado}`,
                x,
                0,
                0
            );


        padre.add(
            cadera
        );


        bones.push(
            cadera
        );


        const rodilla =
            crearBone(
                `knee_${lado}`,
                0,
                -0.55,
                0
            );


        cadera.add(
            rodilla
        );


        bones.push(
            rodilla
        );


        const pie =
            crearBone(
                `foot_${lado}`,
                0,
                -0.55,
                0
            );


        rodilla.add(
            pie
        );


        bones.push(
            pie
        );

    }


    // =================================================
    // 💪 BRAZO
    // =================================================

    function crearBrazo(
        padre,
        bones,
        lado,
        x
    ) {

        const hombro =
            crearBone(
                `shoulder_${lado}`,
                x,
                0,
                0
            );


        padre.add(
            hombro
        );


        bones.push(
            hombro
        );


        const codo =
            crearBone(
                `elbow_${lado}`,
                x > 0
                    ? 0.45
                    : -0.45,
                -0.05,
                0
            );


        hombro.add(
            codo
        );


        bones.push(
            codo
        );


        const mano =
            crearBone(
                `hand_${lado}`,
                x > 0
                    ? 0.45
                    : -0.45,
                0,
                0
            );


        codo.add(
            mano
        );


        bones.push(
            mano
        );

    }


    // =================================================
    // 📐 RESIZE
    // =================================================

    function ajustarCanvas() {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;


        camera.updateProjectionMatrix();


        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

    }


    window.addEventListener(
        "resize",
        ajustarCanvas
    );


    // =================================================
    // 🔄 LOOP
    // =================================================

    function animar() {

        requestAnimationFrame(
            animar
        );


        renderer.render(
            scene,
            camera
        );

    }


    animar();

        }
