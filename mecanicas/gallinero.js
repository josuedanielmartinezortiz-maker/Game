// =====================================================
// 🎮 GAMERPRO GAME — GALLINERO 3D
// =====================================================

import * as THREE from "three";

export function iniciarGallinero(
    game,
    imagenes,
    polloGanador
) {

    // =================================================
    // 🧹 LIMPIAR ESCENA ANTERIOR
    // =================================================

    game.innerHTML = "";

    // =================================================
    // 🌎 ESCENA THREE.JS
    // =================================================

    const escena = new THREE.Scene();

    escena.background =
        new THREE.Color(0x87ceeb);

    // =================================================
    // 📷 CÁMARA
    // =================================================

    const camara =
        new THREE.PerspectiveCamera(
            60,
            window.innerWidth /
                window.innerHeight,
            0.1,
            1000
        );

    camara.position.set(
        0,
        6,
        12
    );

    // =================================================
    // 🖥️ RENDERIZADOR
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

    renderer.shadowMap.enabled = true;

    renderer.domElement.style.position =
        "fixed";

    renderer.domElement.style.inset =
        "0";

    renderer.domElement.style.width =
        "100vw";

    renderer.domElement.style.height =
        "100dvh";

    renderer.domElement.style.display =
        "block";

    renderer.domElement.style.zIndex =
        "9999";

    game.appendChild(
        renderer.domElement
    );

    // =================================================
    // 💡 ILUMINACIÓN
    // =================================================

    const luzAmbiente =
        new THREE.HemisphereLight(
            0xffffff,
            0x668866,
            2
        );

    escena.add(
        luzAmbiente
    );

    const luzSol =
        new THREE.DirectionalLight(
            0xffffff,
            2
        );

    luzSol.position.set(
        10,
        20,
        10
    );

    luzSol.castShadow = true;

    escena.add(
        luzSol
    );

    // =================================================
    // 🌱 SUELO
    // =================================================

    const sueloGeometria =
        new THREE.PlaneGeometry(
            60,
            60
        );

    const sueloMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x4caf50
        });

    const suelo =
        new THREE.Mesh(
            sueloGeometria,
            sueloMaterial
        );

    suelo.rotation.x =
        -Math.PI / 2;

    suelo.receiveShadow = true;

    escena.add(
        suelo
    );

    // =================================================
    // 🏠 BASE DEL GALLINERO
    // =================================================

    const baseGeometria =
        new THREE.BoxGeometry(
            18,
            0.5,
            12
        );

    const baseMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x8b5a2b
        });

    const base =
        new THREE.Mesh(
            baseGeometria,
            baseMaterial
        );

    base.position.set(
        0,
        0.25,
        0
    );

    base.receiveShadow = true;

    escena.add(
        base
    );

    // =================================================
    // 🏠 PAREDES
    // =================================================

    const paredMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xc68642
        });

    const paredTrasera =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                18,
                5,
                0.5
            ),
            paredMaterial
        );

    paredTrasera.position.set(
        0,
        2.75,
        -6
    );

    paredTrasera.castShadow = true;

    escena.add(
        paredTrasera
    );

    // =================================================
    // 🏠 TECHO
    // =================================================

    const techoMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x8b0000
        });

    const techo =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                19,
                0.5,
                13
            ),
            techoMaterial
        );

    techo.position.set(
        0,
        5.5,
        0
    );

    techo.rotation.z =
        0.02;

    techo.castShadow = true;

    escena.add(
        techo
    );

    // =================================================
    // 🥤 BEBEDERO
    // =================================================

    const bebedero =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                1.2,
                1.2,
                0.5,
                32
            ),
            new THREE.MeshStandardMaterial({
                color: 0x2196f3
            })
        );

    bebedero.position.set(
        -3,
        0.75,
        0
    );

    bebedero.castShadow = true;

    escena.add(
        bebedero
    );

    // =================================================
    // 🌽 COMEDERO
    // =================================================

    const comedero =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                2.5,
                0.6,
                1
            ),
            new THREE.MeshStandardMaterial({
                color: 0xffc107
            })
        );

    comedero.position.set(
        3,
        0.8,
        0
    );

    comedero.castShadow = true;

    escena.add(
        comedero
    );

    // =================================================
    // 🐔 POLLOS
    // =================================================

    const POLLOS = {

        "Pollo Noob":
            imagenes.pollonoob,

        "Pollo Zombie":
            imagenes.pollozombie,

        "Pollito Noob":
            imagenes.pollitonoob
    };

    const imagenPollo =
        POLLOS[polloGanador];

    if (!imagenPollo) {

        console.error(
            "❌ POLLO GANADOR NO ENCONTRADO:",
            polloGanador
        );

        return;
    }

    console.log(
        "🏆 POLLO QUE ENTRA AL GALLINERO:",
        polloGanador
    );

    // =================================================
    // 🐔 TEXTURA DEL POLLO
    // =================================================

    const textura =
        new THREE.TextureLoader().load(
            imagenPollo.src
        );

    textura.colorSpace =
        THREE.SRGBColorSpace;

    const polloMaterial =
        new THREE.SpriteMaterial({
            map: textura,
            transparent: true
        });

    const pollo =
        new THREE.Sprite(
            polloMaterial
        );

    pollo.scale.set(
        2.5,
        2.5,
        1
    );

    // Primera casilla

    pollo.position.set(
        -7,
        2,
        -4.5
    );

    escena.add(
        pollo
    );

    // =================================================
    // 👤 PERSONAJE
    // =================================================

    let personajeImagen =
        imagenes.mike;

    if (
        window.gamerproPersonaje ===
        "micaela"
    ) {

        personajeImagen =
            imagenes.micaela;
    }

    const texturaPersonaje =
        new THREE.TextureLoader().load(
            personajeImagen.src
        );

    texturaPersonaje.colorSpace =
        THREE.SRGBColorSpace;

    const personajeMaterial =
        new THREE.SpriteMaterial({
            map: texturaPersonaje,
            transparent: true
        });

    const personaje =
        new THREE.Sprite(
            personajeMaterial
        );

    personaje.scale.set(
        2.5,
        3.5,
        1
    );

    personaje.position.set(
        0,
        2,
        7
    );

    escena.add(
        personaje
    );

    // =================================================
    // 🎮 CONTROLES
    // =================================================

    const teclas = {};

    window.addEventListener(
        "keydown",
        function(event) {
            teclas[event.key.toLowerCase()] =
                true;
        }
    );

    window.addEventListener(
        "keyup",
        function(event) {
            teclas[event.key.toLowerCase()] =
                false;
        }
    );

    // =================================================
    // 📐 RESIZE
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
    // 🔄 ANIMACIÓN
    // =================================================

    const reloj =
        new THREE.Clock();

    function actualizar() {

        const delta =
            reloj.getDelta();

        const velocidad =
            5 * delta;

        if (teclas["w"]) {
            personaje.position.z -=
                velocidad;
        }

        if (teclas["s"]) {
            personaje.position.z +=
                velocidad;
        }

        if (teclas["a"]) {
            personaje.position.x -=
                velocidad;
        }

        if (teclas["d"]) {
            personaje.position.x +=
                velocidad;
        }

        // Cámara siguiendo al personaje

        camara.position.x =
            personaje.position.x;

        camara.position.z =
            personaje.position.z + 12;

        camara.lookAt(
            personaje.position.x,
            2,
            personaje.position.z
        );

        renderer.render(
            escena,
            camara
        );

        requestAnimationFrame(
            actualizar
        );
    }

    // =================================================
    // 🚀 INICIAR
    // =================================================

    console.log(
        "🏠 GALLINERO 3D INICIADO"
    );

    actualizar();
}
