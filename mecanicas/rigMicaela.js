// =====================================================
// 🎮 GAMERPRO GAME — RIG MICAELA
// PASO 1 — CARGAR MODELO 3D
// =====================================================

import * as THREE from "three";
import { GLTFLoader } from
    "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/loaders/GLTFLoader.js";


// =====================================================
// 🧍 FUNCIÓN PRINCIPAL
// =====================================================

export function iniciarRigMicaela(game) {

    // =================================================
    // 🌎 ESCENA
    // =================================================

    const scene = new THREE.Scene();

    scene.background =
        new THREE.Color(0x87ceeb);


    // =================================================
    // 📷 CÁMARA
    // =================================================

    const camera =
        new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

    camera.position.set(
        0,
        1.5,
        5
    );


    // =================================================
    // 🖥️ RENDERER
    // =================================================

    const renderer =
        new THREE.WebGLRenderer({
            antialias: true,
            alpha: false
        });

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 1.5)
    );

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    renderer.outputColorSpace =
        THREE.SRGBColorSpace;

    Object.assign(renderer.domElement.style, {
        position: "fixed",
        inset: "0",
        width: "100%",
        height: "100%",
        zIndex: "999"
    });

    game.appendChild(renderer.domElement);


    // =================================================
    // 💡 ILUMINACIÓN
    // =================================================

    const luzAmbiente =
        new THREE.HemisphereLight(
            0xffffff,
            0x555555,
            2
        );

    scene.add(luzAmbiente);


    const luzPrincipal =
        new THREE.DirectionalLight(
            0xffffff,
            3
        );

    luzPrincipal.position.set(
        3,
        6,
        4
    );

    scene.add(luzPrincipal);


    // =================================================
    // 📦 CARGAR MICAELA.GLB
    // =================================================

    const loader =
        new GLTFLoader();

    loader.load(
        "./3D/micaela.glb",

        (gltf) => {

            const micaela =
                gltf.scene;

            micaela.position.set(
                0,
                0,
                0
            );

            micaela.scale.setScalar(1);

            scene.add(micaela);


            // =========================================
            // 🔍 INFORMACIÓN DEL MODELO
            // =========================================

            let numeroMeshes = 0;
            let numeroVertices = 0;

            micaela.traverse(
                (objeto) => {

                    if (
                        objeto.isMesh &&
                        objeto.geometry
                    ) {

                        numeroMeshes++;

                        const posicion =
                            objeto.geometry
                                .getAttribute("position");

                        if (posicion) {
                            numeroVertices +=
                                posicion.count;
                        }
                    }
                }
            );

            console.log(
                "🐰 Micaela cargada"
            );

            console.log(
                "Meshes:",
                numeroMeshes
            );

            console.log(
                "Vértices:",
                numeroVertices
            );
        },

        undefined,

        (error) => {

            console.error(
                "❌ Error cargando micaela.glb:",
                error
            );
        }
    );


    // =================================================
    // 📱 RESPONSIVE
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
    // 🔄 BUCLE
    // =================================================

    function animar() {

        requestAnimationFrame(animar);

        renderer.render(
            scene,
            camera
        );
    }

    animar();
      }
