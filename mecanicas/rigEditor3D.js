// =====================================================
// 🎮 GAMERPRO GAME — EDITOR DE RIG 3D
// 🦴 FASE 1: COLOCACIÓN MANUAL DE HUESOS
// =====================================================

import * as THREE from "three";

import {
    GLTFLoader
} from
    "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/loaders/GLTFLoader.js";


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

    game.appendChild(
        renderer.domElement
    );


    // =================================================
    // 💡 ILUMINACIÓN
    // =================================================

    const luz =
        new THREE.HemisphereLight(
            0xffffff,
            0x444444,
            2
        );

    scene.add(
        luz
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
    // 🧍 MODELO MICAELA
    // =================================================

    const loader =
        new GLTFLoader();

    let modelo = null;


    // =================================================
    // 📦 CARGAR GLB
    // =================================================
    //
    // IMPORTANTE:
    // El editor está en /rig/
    // El modelo está en /3D/
    //
    // Por eso usamos ../3D/
    // =================================================

    loader.load(
        "../3D/micaela.glb",

        (gltf) => {

            modelo =
                gltf.scene;


            modelo.position.set(
                0,
                0,
                0
            );


            scene.add(
                modelo
            );


            // =========================================
            // 📊 INFORMACIÓN DEL MODELO
            // =========================================

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


            // =========================================
            // 🦴 CREAR ESQUELETO
            // =========================================

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
        // 🦴 HUESO RAÍZ
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
        // 🦴 COLUMNA
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
        // 🧠 CUELLO + CABEZA
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
        // 🦵 PIERNA IZQUIERDA
        // =============================================

        crearPierna(
            pelvis,
            bones,
            "L",
            -0.18
        );


        // =============================================
        // 🦵 PIERNA DERECHA
        // =============================================

        crearPierna(
            pelvis,
            bones,
            "R",
            0.18
        );


        // =============================================
        // 💪 BRAZO IZQUIERDO
        // =============================================

        crearBrazo(
            chest,
            bones,
            "L",
            -0.45
        );


        // =============================================
        // 💪 BRAZO DERECHO
        // =============================================

        crearBrazo(
            chest,
            bones,
            "R",
            0.45
        );


        // =============================================
        // 📦 GRUPO VISUAL
        // =============================================

        const grupoHuesos =
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
            "🦴 Rig creado:",
            bones
        );

    }


    // =================================================
    // 🦴 CREAR BONE
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


        // ---------------------------------------------
        // 🔴 MARCADOR VISUAL
        // ---------------------------------------------

        const marcador =
            new THREE.Mesh(

                new THREE.SphereGeometry(
                    0.045,
                    8,
                    8
                ),

                new THREE.MeshBasicMaterial({
                    color: 0xff4444
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
    // 🦵 CREAR PIERNA
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
    // 💪 CREAR BRAZO
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
