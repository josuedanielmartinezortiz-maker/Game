// =====================================================
// 🎮 GAMERPRO GAME — RIG EDITOR 3D
// 🦴 Editor de esqueleto de Micaela
// =====================================================

import * as THREE from "three";

import {
    GLTFLoader
} from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/loaders/GLTFLoader.js";

import {
    TransformControls
} from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/controls/TransformControls.js";

import {
    OrbitControls
} from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/controls/OrbitControls.js";


// =====================================================
// 🚀 EDITOR
// =====================================================

export function iniciarRigEditor3D(contenedor) {

    // =================================================
    // 🧹 LIMPIAR
    // =================================================

    contenedor.innerHTML = "";


    // =================================================
    // 🎨 ESTILOS DEL EDITOR
    // =================================================

    const estilo = document.createElement("style");

    estilo.textContent = `
        #rigEditorRoot {
            position: fixed;
            inset: 0;
            overflow: hidden;
            background: #111;
            font-family: Arial, sans-serif;
        }

        #rigCanvas {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            display: block;
        }

        #rigPanel {
            position: absolute;
            top: 14px;
            left: 14px;

            width: 250px;
            max-width: calc(100vw - 28px);

            padding: 14px;

            background: rgba(20, 20, 24, 0.94);
            border: 1px solid rgba(255,255,255,0.12);
            border-radius: 14px;

            color: white;

            box-sizing: border-box;

            z-index: 20;

            box-shadow:
                0 10px 30px rgba(0,0,0,0.35);
        }

        #rigTitle {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 8px;
        }

        #rigStatus {
            font-size: 13px;
            color: #bdbdbd;
            margin-bottom: 10px;
            line-height: 1.4;
        }

        #rigSelected {
            padding: 8px;
            margin-bottom: 10px;

            background: rgba(255,255,255,0.06);
            border-radius: 8px;

            font-size: 13px;
        }

        .rigRow {
            display: flex;
            gap: 7px;
            margin-top: 7px;
        }

        .rigButton {
            flex: 1;

            border: 0;
            border-radius: 8px;

            padding: 9px 7px;

            color: white;
            background: #292932;

            cursor: pointer;

            font-size: 12px;
            font-weight: bold;
        }

        .rigButton:hover {
            background: #3a3a46;
        }

        .rigButton.active {
            background: #4b75ff;
        }

        .rigButton.locked {
            background: #9b3030;
        }

        #rigBack {
            margin-top: 9px;
            width: 100%;
        }

        #rigHint {
            margin-top: 10px;

            font-size: 11px;
            line-height: 1.4;

            color: #999;
        }
    `;

    document.head.appendChild(estilo);


    // =================================================
    // 🖥️ RAÍZ
    // =================================================

    const root = document.createElement("div");

    root.id = "rigEditorRoot";

    contenedor.appendChild(root);


    // =================================================
    // 🎨 CANVAS
    // =================================================

    const canvas = document.createElement("canvas");

    canvas.id = "rigCanvas";

    root.appendChild(canvas);


    // =================================================
    // 🧰 PANEL
    // =================================================

    const panel = document.createElement("div");

    panel.id = "rigPanel";

    panel.innerHTML = `
        <div id="rigTitle">
            🦴 RIG MICAELA
        </div>

        <div id="rigStatus">
            Cargando modelo...
        </div>

        <div id="rigSelected">
            Hueso seleccionado:
            <strong>Ninguno</strong>
        </div>

        <div class="rigRow">
            <button id="rigLock" class="rigButton">
                🔓 Micaela
            </button>
        </div>

        <div class="rigRow">
            <button id="rigMove" class="rigButton active">
                ↔ Mover
            </button>

            <button id="rigRotate" class="rigButton">
                ⟳ Rotar
            </button>
        </div>

        <div class="rigRow">
            <button id="rigReset" class="rigButton">
                ↩ Restablecer
            </button>
        </div>

        <button id="rigBack" class="rigButton">
            🎮 Volver al juego
        </button>

        <div id="rigHint">
            🖱️ Arrastra para mover la cámara.<br>
            🦴 Toca un punto rojo para seleccionar un hueso.<br>
            🔒 Con Micaela bloqueada puedes editar los huesos.
        </div>
    `;

    root.appendChild(panel);


    // =================================================
    // 🔎 REFERENCIAS UI
    // =================================================

    const status = panel.querySelector("#rigStatus");
    const selectedLabel = panel.querySelector("#rigSelected strong");

    const lockButton = panel.querySelector("#rigLock");

    const moveButton = panel.querySelector("#rigMove");
    const rotateButton = panel.querySelector("#rigRotate");

    const resetButton = panel.querySelector("#rigReset");

    const backButton = panel.querySelector("#rigBack");


    // =================================================
    // 🌎 ESCENA
    // =================================================

    const scene = new THREE.Scene();

    scene.background =
        new THREE.Color(0x111111);


    // =================================================
    // 📷 CÁMARA
    // =================================================

    const camera =
        new THREE.PerspectiveCamera(
            45,
            window.innerWidth /
            window.innerHeight,
            0.01,
            100
        );

    camera.position.set(
        0,
        1.5,
        3.2
    );


    // =================================================
    // 💡 LUCES
    // =================================================

    const luzAmbiente =
        new THREE.HemisphereLight(
            0xffffff,
            0x333333,
            2
        );

    scene.add(luzAmbiente);


    const luzPrincipal =
        new THREE.DirectionalLight(
            0xffffff,
            3
        );

    luzPrincipal.position.set(
        2,
        4,
        3
    );

    scene.add(luzPrincipal);


    const luzRelleno =
        new THREE.DirectionalLight(
            0x88aaff,
            1
        );

    luzRelleno.position.set(
        -3,
        2,
        -2
    );

    scene.add(luzRelleno);


    // =================================================
    // 🎥 RENDERER
    // =================================================

    const renderer =
        new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            alpha: false
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


    // =================================================
    // 🌀 CONTROLES DE CÁMARA
    // =================================================

    const orbit =
        new OrbitControls(
            camera,
            canvas
        );

    orbit.enableDamping = true;

    orbit.dampingFactor = 0.08;

    orbit.target.set(
        0,
        1.0,
        0
    );


    // =================================================
    // 🎯 TRANSFORM CONTROLS
    // =================================================

    const transform =
        new TransformControls(
            camera,
            canvas
        );

    transform.setMode("translate");

    transform.setSpace("local");

    transform.setSize(0.8);

    scene.add(
        transform.getHelper()
    );


    // =================================================
    // 📦 VARIABLES
    // =================================================

    let modelo = null;

    let modeloBloqueado = false;

    let huesos = {};

    let huesoSeleccionado = null;

    let markers = [];

    let skeletonHelper = null;

    let rigGroup = null;

    let modo = "translate";


    // =================================================
    // 🦴 CREAR RIG
    // =================================================

    function crearRigBasico() {

        rigGroup =
            new THREE.Group();

        rigGroup.name =
            "Esqueleto_Micaela";

        scene.add(rigGroup);


        // ---------------------------------------------
        // RAÍZ
        // ---------------------------------------------

        const rootBone =
            new THREE.Bone();

        rootBone.name =
            "root";

        rootBone.position.set(
            0,
            0,
            0
        );

        rigGroup.add(
            rootBone
        );

        huesos.root =
            rootBone;


        // ---------------------------------------------
        // PELVIS
        // ---------------------------------------------

        const pelvis =
            crearBone(
                "pelvis",
                rootBone,
                0,
                0.85,
                0
            );


        // ---------------------------------------------
        // COLUMNA
        // ---------------------------------------------

        let padre =
            pelvis;

        for (
            let i = 1;
            i <= 5;
            i++
        ) {

            padre =
                crearBone(
                    `lumbar_${i}`,
                    padre,
                    0,
                    0.10,
                    0
                );
        }


        for (
            let i = 1;
            i <= 12;
            i++
        ) {

            padre =
                crearBone(
                    `toracica_${i}`,
                    padre,
                    0,
                    0.09,
                    0
                );
        }


        for (
            let i = 1;
            i <= 7;
            i++
        ) {

            padre =
                crearBone(
                    `cervical_${i}`,
                    padre,
                    0,
                    0.08,
                    0
                );
        }


        // ---------------------------------------------
        // CABEZA
        // ---------------------------------------------

        const cabeza =
            crearBone(
                "craneo",
                padre,
                0,
                0.22,
                0
            );


        // ---------------------------------------------
        // CUELLO / HIOIDES
        // ---------------------------------------------

        crearBone(
            "hioides",
            padre,
            0,
            0.03,
            0
        );


        // ---------------------------------------------
        // TÓRAX
        // ---------------------------------------------

        const torax =
            crearBone(
                "esternon",
                huesos.toracica_6,
                0,
                0,
                0.08
            );


        // ---------------------------------------------
        // COSTILLAS
        // ---------------------------------------------

        for (
            let i = 1;
            i <= 12;
            i++
        ) {

            const vertebra =
                huesos[
                    `toracica_${i}`
                ];

            crearBone(
                `costilla_${i}_izq`,
                vertebra,
                -0.18,
                0,
                0
            );

            crearBone(
                `costilla_${i}_der`,
                vertebra,
                0.18,
                0,
                0
            );
        }


        // ---------------------------------------------
        // BRAZO IZQUIERDO
        // ---------------------------------------------

        const hombroIzq =
            crearBone(
                "clavicula_izq",
                torax,
                -0.20,
                0.05,
                0
            );

        const brazoIzq =
            crearBone(
                "humero_izq",
                hombroIzq,
                -0.25,
                -0.05,
                0
            );

        const antebrazoIzq =
            crearBone(
                "radio_izq",
                brazoIzq,
                -0.35,
                0,
                0
            );

        crearBone(
            "cubito_izq",
            brazoIzq,
            -0.34,
            -0.02,
            0
        );

        const manoIzq =
            crearBone(
                "mano_izq",
                antebrazoIzq,
                -0.32,
                0,
                0
            );

        crearDedos(
            manoIzq,
            "izq"
        );


        // ---------------------------------------------
        // BRAZO DERECHO
        // ---------------------------------------------

        const hombroDer =
            crearBone(
                "clavicula_der",
                torax,
                0.20,
                0.05,
                0
            );

        const brazoDer =
            crearBone(
                "humero_der",
                hombroDer,
                0.25,
                -0.05,
                0
            );

        const antebrazoDer =
            crearBone(
                "radio_der",
                brazoDer,
                0.35,
                0,
                0
            );

        crearBone(
            "cubito_der",
            brazoDer,
            0.34,
            -0.02,
            0
        );

        const manoDer =
            crearBone(
                "mano_der",
                antebrazoDer,
                0.32,
                0,
                0
            );

        crearDedos(
            manoDer,
            "der"
        );


        // ---------------------------------------------
        // PIERNA IZQUIERDA
        // ---------------------------------------------

        const caderaIzq =
            crearBone(
                "pelvis_izq",
                pelvis,
                -0.16,
                -0.08,
                0
            );

        const femurIzq =
            crearBone(
                "femur_izq",
                caderaIzq,
                0,
                -0.42,
                0
            );

        const rodillaIzq =
            crearBone(
                "rotula_izq",
                femurIzq,
                0,
                -0.42,
                0
            );

        const tibiaIzq =
            crearBone(
                "tibia_izq",
                rodillaIzq,
                0,
                -0.40,
                0
            );

        crearBone(
            "perone_izq",
            rodillaIzq,
            -0.05,
            -0.40,
            0
        );

        const pieIzq =
            crearBone(
                "pie_izq",
                tibiaIzq,
                0,
                -0.12,
                0.12
            );

        crearDedosPie(
            pieIzq,
            "izq"
        );


        // ---------------------------------------------
        // PIERNA DERECHA
        // ---------------------------------------------

        const caderaDer =
            crearBone(
                "pelvis_der",
                pelvis,
                0.16,
                -0.08,
                0
            );

        const femurDer =
            crearBone(
                "femur_der",
                caderaDer,
                0,
                -0.42,
                0
            );

        const rodillaDer =
            crearBone(
                "rotula_der",
                femurDer,
                0,
                -0.42,
                0
            );

        const tibiaDer =
            crearBone(
                "tibia_der",
                rodillaDer,
                0,
                -0.40,
                0
            );

        crearBone(
            "perone_der",
            rodillaDer,
            0.05,
            -0.40,
            0
        );

        const pieDer =
            crearBone(
                "pie_der",
                tibiaDer,
                0,
                -0.12,
                0.12
            );

        crearDedosPie(
            pieDer,
            "der"
        );


        // ---------------------------------------------
        // HELPER
        // ---------------------------------------------

        skeletonHelper =
            new THREE.SkeletonHelper(
                rigGroup
            );

        skeletonHelper.material.color.set(
            0x00ff66
        );

        skeletonHelper.material.linewidth = 2;

        scene.add(
            skeletonHelper
        );


        // ---------------------------------------------
        // PUNTOS
        // ---------------------------------------------

        Object.values(
            huesos
        ).forEach(
            crearMarcador
        );


        status.textContent =
            `Rig creado: ${Object.keys(huesos).length} elementos`;
    }


    // =================================================
    // 🦴 CREAR HUESO
    // =================================================

    function crearBone(
        nombre,
        padre,
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

        padre.add(
            bone
        );

        huesos[nombre] =
            bone;

        return bone;
    }


    // =================================================
    // ✋ DEDOS
    // =================================================

    function crearDedos(
        mano,
        lado
    ) {

        const nombres = [
            "pulgar",
            "indice",
            "medio",
            "anular",
            "menique"
        ];

        nombres.forEach(
            (
                nombre,
                indice
            ) => {

                const dedo =
                    crearBone(
                        `${nombre}_${lado}`,
                        mano,
                        lado === "izq"
                            ? -0.05 - indice * 0.015
                            : 0.05 + indice * 0.015,
                        -0.02,
                        0.04
                    );

                crearBone(
                    `${nombre}_${lado}_distal`,
                    dedo,
                    0,
                    -0.055,
                    0
                );
            }
        );
    }


    // =================================================
    // 🦶 DEDOS DEL PIE
    // =================================================

    function crearDedosPie(
        pie,
        lado
    ) {

        const nombres = [
            "dedo_gordo",
            "dedo_2",
            "dedo_3",
            "dedo_4",
            "dedo_5"
        ];

        nombres.forEach(
            (
                nombre,
                indice
            ) => {

                const dedo =
                    crearBone(
                        `${nombre}_${lado}`,
                        pie,                    lado === "izq"
                        ? -0.05 + indice * 0.025
                        : 0.05 - indice * 0.025,
                    0,
                    0.06
                );

                crearBone(
                    `${nombre}_${lado}_distal`,
                    dedo,
                    0,
                    0,
                    0.045
                );
            }
        );
    }


    // =================================================
    // 🔴 MARCADOR
    // =================================================

    function crearMarcador(
        bone
    ) {

        const geometry =
            new THREE.SphereGeometry(
                0.045,
                12,
                12
            );

        const material =
            new THREE.MeshBasicMaterial({
                color: 0xff2222,
                depthTest: false,
                depthWrite: false
            });

        const marker =
            new THREE.Mesh(
                geometry,
                material
            );

        marker.name =
            `marker_${bone.name}`;

        marker.userData.bone =
            bone;

        marker.renderOrder =
            999;

        bone.add(
            marker
        );

        markers.push(
            marker
        );
    }


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

            modelo.name =
                "Micaela";

            modelo.position.set(
                0,
                0.65,
                0
            );

            modelo.scale.set(
                1,
                1,
                1
            );

            scene.add(
                modelo
            );


            // -----------------------------------------
            // SOMBRAS
            // -----------------------------------------

            modelo.traverse(
                objeto => {

                    if (
                        objeto.isMesh
                    ) {

                        objeto.castShadow =
                            true;

                        objeto.receiveShadow =
                            true;
                    }
                }
            );


            // -----------------------------------------
            // CREAR ESQUELETO
            // -----------------------------------------

            crearRigBasico();


            status.textContent =
                "Micaela lista. Selecciona un punto rojo.";
        },

        undefined,

        error => {

            console.error(
                "Error cargando Micaela:",
                error
            );

            status.textContent =
                "❌ Error cargando micaela.glb";
        }
    );


    // =================================================
    // 🎯 RAYCASTER
    // =================================================

    const raycaster =
        new THREE.Raycaster();

    const pointer =
        new THREE.Vector2();


    // =================================================
    // 🖱️ SELECCIONAR HUESO
    // =================================================

    canvas.addEventListener(
        "pointerdown",

        event => {

            const rect =
                canvas.getBoundingClientRect();

            pointer.x =
                (
                    (event.clientX - rect.left)
                    /
                    rect.width
                ) * 2 - 1;

            pointer.y =
                -(
                    (event.clientY - rect.top)
                    /
                    rect.height
                ) * 2 + 1;


            raycaster.setFromCamera(
                pointer,
                camera
            );


            const impactos =
                raycaster.intersectObjects(
                    markers,
                    false
                );


            if (
                impactos.length === 0
            ) {
                return;
            }


            const marker =
                impactos[0].object;

            const bone =
                marker.userData.bone;


            seleccionarHueso(
                bone
            );
        }
    );


    // =================================================
    // 🦴 SELECCIONAR HUESO
    // =================================================

    function seleccionarHueso(
        bone
    ) {

        huesoSeleccionado =
            bone;

        selectedLabel.textContent =
            bone.name;


        // ---------------------------------------------
        // REINICIAR COLOR DE MARCADORES
        // ---------------------------------------------

        markers.forEach(
            marker => {

                marker.material.color.set(
                    0xff2222
                );
            }
        );


        // ---------------------------------------------
        // MARCADOR SELECCIONADO
        // ---------------------------------------------

        const marker =
            markers.find(
                m =>
                    m.userData.bone === bone
            );

        if (marker) {

            marker.material.color.set(
                0xffff00
            );
        }


        // ---------------------------------------------
        // ACTIVAR CONTROLES
        // ---------------------------------------------

        transform.attach(
            bone
        );

        transform.setMode(
            modo
        );
    }


    // =================================================
    // ↔ MODO MOVER
    // =================================================

    moveButton.onclick =
        () => {

            modo =
                "translate";

            transform.setMode(
                "translate"
            );

            moveButton.classList.add(
                "active"
            );

            rotateButton.classList.remove(
                "active"
            );
        };


    // =================================================
    // ⟳ MODO ROTAR
    // =================================================

    rotateButton.onclick =
        () => {

            modo =
                "rotate";

            transform.setMode(
                "rotate"
            );

            rotateButton.classList.add(
                "active"
            );

            moveButton.classList.remove(
                "active"
            );
        };


    // =================================================
    // 🔒 BLOQUEAR / DESBLOQUEAR MICAELA
    // =================================================

    lockButton.onclick =
        () => {

            modeloBloqueado =
                !modeloBloqueado;


            if (
                modeloBloqueado
            ) {

                lockButton.textContent =
                    "🔒 Micaela bloqueada";

                lockButton.classList.add(
                    "locked"
                );

            } else {

                lockButton.textContent =
                    "🔓 Micaela desbloqueada";

                lockButton.classList.remove(
                    "locked"
                );
            }
        };


    // =================================================
    // ↩ RESTABLECER HUESO
    // =================================================

    resetButton.onclick =
        () => {

            if (
                !huesoSeleccionado
            ) {
                return;
            }

            huesoSeleccionado.position.set(
                0,
                huesoSeleccionado.position.y,
                0
            );

            huesoSeleccionado.rotation.set(
                0,
                0,
                0
            );

            huesoSeleccionado.scale.set(
                1,
                1,
                1
            );

            huesoSeleccionado.updateMatrixWorld(
                true
            );
        };


    // =================================================
    // 🎮 VOLVER AL JUEGO
    // =================================================

    backButton.onclick =
        () => {

            window.location.href =
                "../";
        };


    // =================================================
    // 🌀 TRANSFORM CONTROLS + CÁMARA
    // =================================================

    transform.addEventListener(
        "dragging-changed",

        event => {

            orbit.enabled =
                !event.value;
        }
    );


    // =================================================
    // 📐 RESIZE
    // =================================================

    function resize() {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

        renderer.setPixelRatio(
            Math.min(
                window.devicePixelRatio,
                2
            )
        );
    }

    window.addEventListener(
        "resize",
        resize
    );


    // =================================================
    // 🎬 BUCLE PRINCIPAL
    // =================================================

    function animar() {

        requestAnimationFrame(
            animar
        );

        orbit.update();

        renderer.render(
            scene,
            camera
        );
    }

    animar();
    }
         
