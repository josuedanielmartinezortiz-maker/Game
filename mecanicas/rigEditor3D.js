// =====================================================
// 🎮 GAMERPRO GAME — EDITOR DE RIG 3D
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

export function iniciarRigEditor3D(editor) {

    // =================================================
    // ESCENA
    // =================================================

    const scene =
        new THREE.Scene();

    scene.background =
        new THREE.Color(0x202020);


    // =================================================
    // CÁMARA
    // =================================================

    const camera =
        new THREE.PerspectiveCamera(
            45,
            window.innerWidth /
            window.innerHeight,
            0.1,
            1000
        );

    camera.position.set(
        3,
        2.5,
        5
    );

    camera.lookAt(
        0,
        1.1,
        0
    );


    // =================================================
    // RENDERER
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

    editor.appendChild(
        renderer.domElement
    );


    // =================================================
    // LUCES
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


    const luzPrincipal =
        new THREE.DirectionalLight(
            0xffffff,
            3
        );

    luzPrincipal.position.set(
        3,
        5,
        4
    );

    scene.add(
        luzPrincipal
    );


    // =================================================
    // GRID
    // =================================================

    const grid =
        new THREE.GridHelper(
            10,
            20,
            0x666666,
            0x333333
        );

    scene.add(
        grid
    );


    // =================================================
    // ESTADO
    // =================================================

    let modelo =
        null;

    let modeloBloqueado =
        false;


    // =================================================
    // PANEL
    // =================================================

    const panel =
        document.createElement("div");

    Object.assign(
        panel.style,
        {
            position: "fixed",
            top: "10px",
            left: "10px",
            zIndex: "100",
            padding: "12px",
            background: "rgba(0,0,0,0.75)",
            color: "white",
            borderRadius: "12px",
            fontFamily: "Arial, sans-serif"
        }
    );

    editor.appendChild(
        panel
    );


    // =================================================
    // ESTADO
    // =================================================

    const estado =
        document.createElement("div");

    estado.textContent =
        "🟡 Cargando Micaela...";

    estado.style.marginBottom =
        "8px";

    panel.appendChild(
        estado
    );


    // =================================================
    // BOTÓN BLOQUEAR
    // =================================================

    const botonBloqueo =
        document.createElement("button");

    botonBloqueo.textContent =
        "🔓 Micaela desbloqueada";

    Object.assign(
        botonBloqueo.style,
        {
            border: "none",
            borderRadius: "8px",
            padding: "9px 12px",
            margin: "3px",
            fontSize: "14px",
            fontWeight: "bold",
            cursor: "pointer"
        }
    );

    panel.appendChild(
        botonBloqueo
    );


    // =================================================
    // TRANSFORM CONTROLS
    // =================================================

    const controles =
        new TransformControls(
            camera,
            renderer.domElement
        );

    controles.setMode(
        "translate"
    );

    controles.setSpace(
        "world"
    );

    controles.setSize(
        0.8
    );

    scene.add(
        controles.getHelper()
    );


    // =================================================
    // BLOQUEAR / DESBLOQUEAR MICAELA
    // =================================================

    botonBloqueo.addEventListener(
        "click",
        () => {

            modeloBloqueado =
                !modeloBloqueado;

            if (
                modeloBloqueado
            ) {

                controles.detach();

                botonBloqueo.textContent =
                    "🔒 Micaela bloqueada";

                estado.textContent =
                    "🔒 Micaela bloqueada — lista para editar huesos";

            } else {

                if (
                    modelo
                ) {

                    controles.attach(
                        modelo
                    );
                }

                botonBloqueo.textContent =
                    "🔓 Micaela desbloqueada";

                estado.textContent =
                    "🟢 Micaela desbloqueada";
            }
        }
    );


    // =================================================
    // CARGAR MICAELA
    // =================================================

    const loader =
        new GLTFLoader();

    loader.load(

        "../3D/micaela.glb",

        (gltf) => {

            modelo =
                gltf.scene;

            modelo.name =
                "Micaela";


            // -----------------------------------------
            // POSICIÓN
            // -----------------------------------------

            modelo.position.set(
                0,
                0.65,
                0
            );


            // -----------------------------------------
            // ESCALA
            // -----------------------------------------

            modelo.scale.set(
                1,
                1,
                1
            );


            // -----------------------------------------
            // AÑADIR A ESCENA
            // -----------------------------------------

            scene.add(
                modelo
            );


            // -----------------------------------------
            // SOMBRAS
            // -----------------------------------------

            modelo.traverse(
                (obj) => {

                    if (
                        obj.isMesh
                    ) {

                        obj.castShadow =
                            true;

                        obj.receiveShadow =
                            true;
                    }
                }
            );


            // -----------------------------------------
            // CONTROLAR MICAELA
            // -----------------------------------------

            controles.attach(
                modelo
            );


            estado.textContent =
                "🟢 Micaela cargada";


            console.log(
                "✅ Micaela cargada correctamente"
            );
        },

        undefined,

        (error) => {

            console.error(
                "❌ Error cargando Micaela:",
                error
            );

            estado.textContent =
                "🔴 Error cargando Micaela";
        }
    );


    // =====================================================
    // 🦴 ESQUELETO MANUAL
    // =====================================================

    const esqueleto =
        new THREE.Group();

    esqueleto.name =
        "Esqueleto_Micaela";

    scene.add(
        esqueleto
    );


    // =================================================
    // CREAR HUESO
    // =================================================

    function crearHueso(
        nombre,
        posicion,
        padre = esqueleto
    ) {

        const hueso =
            new THREE.Bone();

        hueso.name =
            nombre;

        hueso.position.set(
            posicion.x,
            posicion.y,
            posicion.z
        );

        padre.add(
            hueso
        );


        // ---------------------------------------------
        // PUNTO ROJO
        // ---------------------------------------------

        const marcador =
            new THREE.Mesh(
                new THREE.SphereGeometry(
                    0.055,
                    12,
                    12
                ),
                new THREE.MeshBasicMaterial({
                    color: 0xff3333
                })
            );

        marcador.name =
            "Punto_" + nombre;

        hueso.add(
            marcador
        );


        return hueso;
    }


    // =================================================
    // ROOT
    // =================================================

    const root =
        crearHueso(
            "root",
            {
                x: 0,
                y: 0,
                z: 0
            }
        );


    // =================================================
    // PELVIS
    // =================================================

    const pelvis =
        crearHueso(
            "pelvis",
            {
                x: 0,
                y: 0.9,
                z: 0
            },
            root
        );


    // =================================================
    // COLUMNA
    // =================================================

    const spine =
        crearHueso(
            "spine",
            {
                x: 0,
                y: 0.35,
                z: 0
            },
            pelvis
        );


    const chest =
        crearHueso(
            "chest",
            {
                x: 0,
                y: 0.35,
                z: 0
            },
            spine
        );


    // =================================================
    // CUELLO
    // =================================================

    const neck =
        crearHueso(
            "neck",
            {
                x: 0,
                y: 0.35,
                z: 0
            },
            chest
        );


    // =================================================
    // CABEZA
    // =================================================

    const head =
        crearHueso(
            "head",
            {
                x: 0,
                y: 0.25,
                z: 0
            },
            neck
        );


    // =================================================
    // PIERNA IZQUIERDA
    // =================================================

    const hipL =
        crearHueso(
            "hip_L",
            {
                x: -0.18,
                y: 0,
                z: 0
            },
            pelvis
        );

    const kneeL =
        crearHueso(
            "knee_L",
            {
                x: 0,
                y: -0.55,
                z: 0
            },
            hipL
        );

    crearHueso(
        "foot_L",
        {
            x: 0,
            y: -0.55,
            z: 0
        },
        kneeL
    );


    // =================================================
    // PIERNA DERECHA
    // =================================================

    const hipR =
        crearHueso(
            "hip_R",
            {
                x: 0.18,
                y: 0,
                z: 0
            },
            pelvis
        );

    const kneeR =
        crearHueso(
            "knee_R",
            {
                x: 0,
                y: -0.55,
                z: 0
            },
            hipR
        );

    crearHueso(
        "foot_R",
        {
            x: 0,
            y: -0.55,
            z: 0
        },
        kneeR
    );


    // =================================================
    // BRAZO IZQUIERDO
    // =================================================

    const shoulderL =
        crearHueso(
            "shoulder_L",
            {
                x: -0.45,
                y: 0,
                z: 0
            },
            chest
        );

    const elbowL =
        crearHueso(
            "elbow_L",
            {
                x: -0.45,
                y: -0.05,
                z: 0
            },
            shoulderL
        );

    crearHueso(
        "hand_L",
        {
            x: -0.45,
            y: 0,
            z: 0
        },
        elbowL
    );


    // =================================================
    // BRAZO DERECHO
    // =================================================

    const shoulderR =
        crearHueso(
            "shoulder_R",
            {
                x: 0.45,
                y: 0,
                z: 0
            },
            chest
        );

    const elbowR =
        crearHueso(
            "elbow_R",
            {
                x: 0.45,
                y: -0.05,
                z: 0
            },
            shoulderR
        );

    crearHueso(
        "hand_R",
        {
            x: 0.45,
            y: 0,
            z: 0
        },
        elbowR
    );


    // =================================================
    // RESIZE
    // =================================================

    function ajustarPantalla() {

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
        ajustarPantalla
    );


    // =================================================
    // BUCLE
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


    // =================================================
    // DEVOLVER REFERENCIAS
    // =================================================

    return {
        scene,
        camera,
        renderer,
        modelo,
        esqueleto,
        controles
    };
}
