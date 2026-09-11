// =====================================================
// 🎮 GAMERPRO GAME — RIG EDITOR 3D
// 🦴 MICAELA CHIBI
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
// 🚀 INICIAR EDITOR
// =====================================================

export function iniciarRigEditor3D(contenedor) {

    // =================================================
    // 🧹 LIMPIAR
    // =================================================

    contenedor.innerHTML = "";


    // =================================================
    // 🌎 ESCENA
    // =================================================

    const scene =
        new THREE.Scene();

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
        1.15,
        3
    );


    // =================================================
    // 🎨 CANVAS
    // =================================================

    const canvas =
        document.createElement("canvas");

    canvas.id =
        "rigCanvas";

    canvas.style.position =
        "fixed";

    canvas.style.inset =
        "0";

    canvas.style.width =
        "100%";

    canvas.style.height =
        "100%";

    canvas.style.display =
        "block";

    contenedor.appendChild(
        canvas
    );


    // =================================================
    // 🖥️ RENDERER
    // =================================================

    const renderer =
        new THREE.WebGLRenderer({
            canvas,
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

    scene.add(
        luzPrincipal
    );


    // =================================================
    // 🌀 CÁMARA ORBITAL
    // =================================================

    const orbit =
        new OrbitControls(
            camera,
            canvas
        );

    orbit.enableDamping =
        true;

    orbit.dampingFactor =
        0.08;

    orbit.target.set(
        0,
        0.9,
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

    transform.setMode(
        "translate"
    );

    transform.setSpace(
        "local"
    );

    transform.setSize(
        0.7
    );

    scene.add(
        transform.getHelper()
    );


    // =================================================
    // 📦 VARIABLES DEL RIG
    // =================================================

    let modelo = null;

    let esqueleto = null;

    let huesoSeleccionado = null;

    let modeloBloqueado = true;

    let modo =
        "translate";

    const huesos = {};

    const marcadores = [];


    // =================================================
    // 🧠 PROPORCIONES CHIBI
    // =================================================
    //
    // NO usamos una escala global.
    //
    // La cabeza será grande y el cuerpo compacto.
    //

    const CHIBI = {

        cabeza: 0.38,

        cuello: 0.07,

        torax: 0.24,

        pelvis: 0.18,

        brazo: 0.25,

        antebrazo: 0.20,

        mano: 0.10,

        muslo: 0.28,

        pierna: 0.25,

        pie: 0.12
    };


    // =================================================
    // 🦴 CREAR HUESO
    // =================================================

    function crearHueso(
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
    // 🔴 CREAR PELOTA DEL HUESO
    // =================================================

    function crearMarcador(
        bone,
        radio = 0.045
    ) {

        const geometry =
            new THREE.SphereGeometry(
                radio,
                12,
                12
            );

        const material =
            new THREE.MeshBasicMaterial({
                color: 0xff2222,

                depthTest: false,

                depthWrite: false
            });

        const marcador =
            new THREE.Mesh(
                geometry,
                material
            );

        marcador.name =
            `marker_${bone.name}`;

        marcador.userData.bone =
            bone;

        marcador.renderOrder =
            999;

        bone.add(
            marcador
        );

        marcadores.push(
            marcador
        );

        return marcador;
    }


    // =================================================
    // 🧠 CABEZA CHIBI
    // =================================================

    function crearCabezaChibi(
        padre
    ) {

        const craneo =
            crearHueso(
                "craneo",
                padre,
                0,
                CHIBI.cabeza,
                0
            );

        // 🔴 PELOTA CENTRAL DEL CRÁNEO
        crearMarcador(
            craneo,
            0.075
        );


        // ---------------------------------------------
        // 🧠 HUESOS PRINCIPALES DEL CRÁNEO
        // ---------------------------------------------

        crearHueso(
            "frontal",
            craneo,
            0,
            0.05,
            0.025
        );

        crearHueso(
            "parietal_izq",
            craneo,
            -0.10,
            0.02,
            0
        );

        crearHueso(
            "parietal_der",
            craneo,
            0.10,
            0.02,
            0
        );

        crearHueso(
            "temporal_izq",
            craneo,
            -0.15,
            -0.03,
            0
        );

        crearHueso(
            "temporal_der",
            craneo,
            0.15,
            -0.03,
            0
        );

        crearHueso(
            "occipital",
            craneo,
            0,
            -0.04,
            -0.12
        );

        crearHueso(
            "esfenoides",
            craneo,
            0,
            -0.02,
            0.08
        );

        crearHueso(
            "etmoides",
            craneo,
            0,
            0.01,
            0.10
        );


        // ---------------------------------------------
        // 👄 MANDÍBULA
        // ---------------------------------------------

        crearHueso(
            "mandibula",
            craneo,
            0,
            -0.16,
            0.08
        );


        // ---------------------------------------------
        // 👁️ CONTROLES FACIALES
        // ---------------------------------------------

        crearHueso(
            "ojo_izq",
            craneo,
            -0.10,
            -0.02,
            0.16
        );

        crearHueso(
            "ojo_der",
            craneo,
            0.10,
            -0.02,
            0.16
        );


        return craneo;
    }


    // =================================================
    // 🦴 CONSTRUIR ESQUELETO CHIBI
    // =================================================

    function crearEsqueletoChibi() {

        esqueleto =
            new THREE.Group();

        esqueleto.name =
            "Esqueleto_Micaela";

        scene.add(
            esqueleto
        );


        // ---------------------------------------------
        // ROOT
        // ---------------------------------------------

        const root =
            crearHueso(
                "root",
                esqueleto,
                0,
                0,
                0
            );

        crearMarcador(
            root,
            0.05
        );


        // ---------------------------------------------
        // 🦴 PELVIS
        // ---------------------------------------------

        const pelvis =
            crearHueso(
                "pelvis",
                root,
                0,
                CHIBI.pelvis,
                0
            );

        crearMarcador(
            pelvis
        );


        // ---------------------------------------------
        // 🫁 TÓRAX
        // ---------------------------------------------

        const torax =
            crearHueso(
                "torax",
                pelvis,
                0,
                CHIBI.torax,
                0
            );

        crearMarcador(
            torax
        );


        // ---------------------------------------------
        // 🦴 CUELLO
        // ---------------------------------------------

        const cuello =
            crearHueso(
                "cuello",
                torax,
                0,
                CHIBI.cuello,
                0
            );

        crearMarcador(
            cuello
        );


        // ---------------------------------------------
        // 🧠 CABEZA
        // ---------------------------------------------

        crearCabezaChibi(
            cuello
        );


        console.log(
            "🦴 Esqueleto chibi creado:",
            Object.keys(huesos).length,
            "huesos"
        );
}
    // =====================================================
// 🫁 TÓRAX Y COSTILLAS
// =====================================================

function crearCostillas(
    torax
) {

    for (
        let i = 1;
        i <= 12;
        i++
    ) {

        const altura =
            0.015 * (i - 1);

        const costillaIzq =
            crearHueso(
                `costilla_${i}_izq`,
                torax,
                -0.08,
                altura,
                0
            );

        const costillaDer =
            crearHueso(
                `costilla_${i}_der`,
                torax,
                0.08,
                altura,
                0
            );

        crearMarcador(
            costillaIzq,
            0.025
        );

        crearMarcador(
            costillaDer,
            0.025
        );
    }
}


// =====================================================
// 💪 BRAZO IZQUIERDO
// =====================================================

function crearBrazoIzquierdo(
    torax
) {

    const clavicula =
        crearHueso(
            "clavicula_izq",
            torax,
            -0.12,
            0.04,
            0
        );

    crearMarcador(
        clavicula
    );


    const humero =
        crearHueso(
            "humero_izq",
            clavicula,
            -CHIBI.brazo,
            -0.03,
            0
        );

    crearMarcador(
        humero
    );


    const radio =
        crearHueso(
            "radio_izq",
            humero,
            -CHIBI.antebrazo,
            0,
            0
        );

    crearMarcador(
        radio
    );


    const cubito =
        crearHueso(
            "cubito_izq",
            humero,
            -CHIBI.antebrazo,
            -0.025,
            0
        );

    crearMarcador(
        cubito
    );


    const mano =
        crearHueso(
            "mano_izq",
            radio,
            -CHIBI.mano,
            0,
            0
        );

    crearMarcador(
        mano,
        0.035
    );


    crearDedosMano(
        mano,
        "izq"
    );
}


// =====================================================
// 💪 BRAZO DERECHO
// =====================================================

function crearBrazoDerecho(
    torax
) {

    const clavicula =
        crearHueso(
            "clavicula_der",
            torax,
            0.12,
            0.04,
            0
        );

    crearMarcador(
        clavicula
    );


    const humero =
        crearHueso(
            "humero_der",
            clavicula,
            CHIBI.brazo,
            -0.03,
            0
        );

    crearMarcador(
        humero
    );


    const radio =
        crearHueso(
            "radio_der",
            humero,
            CHIBI.antebrazo,
            0,
            0
        );

    crearMarcador(
        radio
    );


    const cubito =
        crearHueso(
            "cubito_der",
            humero,
            CHIBI.antebrazo,
            -0.025,
            0
        );

    crearMarcador(
        cubito
    );


    const mano =
        crearHueso(
            "mano_der",
            radio,
            CHIBI.mano,
            0,
            0
        );

    crearMarcador(
        mano,
        0.035
    );


    crearDedosMano(
        mano,
        "der"
    );
}


// =====================================================
// ✋ DEDOS DE LAS MANOS
// =====================================================

function crearDedosMano(
    mano,
    lado
) {

    const dedos = [
        "pulgar",
        "indice",
        "medio",
        "anular",
        "menique"
    ];


    dedos.forEach(
        (
            nombre,
            indice
        ) => {

            const separacion =
                (indice - 2) *
                0.025;

            const x =
                lado === "izq"
                    ? separacion
                    : -separacion;


            const dedo =
                crearHueso(
                    `${nombre}_${lado}`,
                    mano,
                    x,
                    -0.025,
                    0.035
                );

            crearMarcador(
                dedo,
                0.022
            );


            const falange =
                crearHueso(
                    `${nombre}_${lado}_media`,
                    dedo,
                    0,
                    -0.045,
                    0
                );

            crearMarcador(
                falange,
                0.018
            );


            crearHueso(
                `${nombre}_${lado}_distal`,
                falange,
                0,
                -0.035,
                0
            );
        }
    );
}


// =====================================================
// 🦵 PIERNA IZQUIERDA
// =====================================================

function crearPiernaIzquierda(
    pelvis
) {

    const cadera =
        crearHueso(
            "pelvis_izq",
            pelvis,
            -0.10,
            -0.04,
            0
        );

    crearMarcador(
        cadera
    );


    const femur =
        crearHueso(
            "femur_izq",
            cadera,
            0,
            -CHIBI.muslo,
            0
        );

    crearMarcador(
        femur
    );


    const rotula =
        crearHueso(
            "rotula_izq",
            femur,
            0,
            -0.025,
            0.035
        );

    crearMarcador(
        rotula,
        0.035
    );


    const tibia =
        crearHueso(
            "tibia_izq",
            rotula,
            0,
            -CHIBI.pierna,
            0
        );

    crearMarcador(
        tibia
    );


    const perone =
        crearHueso(
            "perone_izq",
            rotula,
            -0.025,
            -CHIBI.pierna,
            0
        );

    crearMarcador(
        perone,
        0.025
    );


    const pie =
        crearHueso(
            "pie_izq",
            tibia,
            0,
            -CHIBI.pie,
            0.07
        );

    crearMarcador(
        pie,
        0.035
    );


    crearDedosPie(
        pie,
        "izq"
    );
}


// =====================================================
// 🦵 PIERNA DERECHA
// =====================================================

function crearPiernaDerecha(
    pelvis
) {

    const cadera =
        crearHueso(
            "pelvis_der",
            pelvis,
            0.10,
            -0.04,
            0
        );

    crearMarcador(
        cadera
    );


    const femur =
        crearHueso(
            "femur_der",
            cadera,
            0,
            -CHIBI.muslo,
            0
        );

    crearMarcador(
        femur
    );


    const rotula =
        crearHueso(
            "rotula_der",
            femur,
            0,
            -0.025,
            0.035
        );

    crearMarcador(
        rotula,
        0.035
    );


    const tibia =
        crearHueso(
            "tibia_der",
            rotula,
            0,
            -CHIBI.pierna,
            0
        );

    crearMarcador(
        tibia
    );


    const perone =
        crearHueso(
            "perone_der",
            rotula,
            0.025,
            -CHIBI.pierna,
            0
        );

    crearMarcador(
        perone,
        0.025
    );


    const pie =
        crearHueso(
            "pie_der",
            tibia,
            0,
            -CHIBI.pie,
            0.07
        );

    crearMarcador(
        pie,
        0.035
    );


    crearDedosPie(
        pie,
        "der"
    );
}


// =====================================================
// 🦶 DEDOS DE LOS PIES
// =====================================================

function crearDedosPie(
    pie,
    lado
) {

    const dedos = [
        "dedo_gordo",
        "dedo_2",
        "dedo_3",
        "dedo_4",
        "dedo_5"
    ];


    dedos.forEach(
        (
            nombre,
            indice
        ) => {

            const separacion =
                (indice - 2) *
                0.025;

            const x =
                lado === "izq"
                    ? separacion
                    : -separacion;


            const dedo =
                crearHueso(
                    `${nombre}_${lado}`,
                    pie,
                    x,
                    0,
                    0.06
                );

            crearMarcador(
                dedo,
                0.020
            );


            crearHueso(
                `${nombre}_${lado}_distal`,
                dedo,
                0,
                0,
                0.045
            );
        }
    );
        }
    // =====================================================
// 🦴 BLOQUE 3 — TERMINAR ESQUELETO + MICAELA
// =====================================================

// =====================================================
// COMPLETAR EL ESQUELETO CHIBI
// =====================================================

crearCostillas(torax);

crearBrazoIzquierdo(torax);
crearBrazoDerecho(torax);

crearPiernaIzquierda(pelvis);
crearPiernaDerecha(pelvis);


// =====================================================
// 🦴 HELPER VISUAL DEL ESQUELETO
// =====================================================

const skeletonHelper =
    new THREE.SkeletonHelper(esqueleto);

skeletonHelper.visible = true;

// Verde para distinguir claramente
// las líneas del esqueleto.
skeletonHelper.material.color.set(0x00ff66);

scene.add(skeletonHelper);


// =====================================================
// 🎯 RAYCASTER PARA SELECCIONAR HUESOS
// =====================================================

const raycaster =
    new THREE.Raycaster();

const mouse =
    new THREE.Vector2();


// =====================================================
// 🔴 SELECCIONAR HUESO
// =====================================================

function seleccionarHueso(bone) {

    if (!bone) {
        huesoSeleccionado = null;

        transform.detach();

        return;
    }

    huesoSeleccionado = bone;

    transform.attach(bone);

    transform.setMode(modo);

    // Actualizar marcadores
    marcadores.forEach(marcador => {

        const hueso =
            marcador.userData.bone;

        if (hueso === bone) {

            marcador.material.color
                .set(0xffff00);

            marcador.scale.setScalar(1.6);

        } else {

            marcador.material.color
                .set(0xff2222);

            marcador.scale.setScalar(1);

        }
    });

    console.log(
        "🦴 Hueso seleccionado:",
        bone.name
    );
}


// =====================================================
// 🖱️ CLICK / TOQUE SOBRE LOS PUNTOS
// =====================================================

function seleccionarConMouse(event) {

    const rect =
        renderer.domElement.getBoundingClientRect();

    mouse.x =
        ((event.clientX - rect.left) /
            rect.width) * 2 - 1;

    mouse.y =
        -((event.clientY - rect.top) /
            rect.height) * 2 + 1;

    raycaster.setFromCamera(
        mouse,
        camera
    );


    // Buscar solamente los puntos rojos
    const impactos =
        raycaster.intersectObjects(
            marcadores,
            false
        );


    if (impactos.length > 0) {

        const marcador =
            impactos[0].object;

        const bone =
            marcador.userData.bone;

        seleccionarHueso(bone);

        return;
    }


    // Si no tocamos un punto,
    // no cambiar selección.
}


// Mouse
renderer.domElement.addEventListener(
    "pointerdown",
    seleccionarConMouse
);


// =====================================================
// 🎮 TRANSFORM CONTROLS
// =====================================================

transform.addEventListener(
    "dragging-changed",
    event => {

        orbit.enabled =
            !event.value;
    }
);


// Cuando cambia un hueso,
// actualizar el helper visual.

transform.addEventListener(
    "objectChange",
    () => {

        if (!huesoSeleccionado) {
            return;
        }

        skeletonHelper.update();
    }
);


// =====================================================
// 🧍 CARGAR MICAELA
// =====================================================

const loader =
    new GLTFLoader();

loader.load(

    "../3D/micaela.glb",

    gltf => {

        modelo =
            gltf.scene;

        modelo.name =
            "Micaela";

        // Posición base
        modelo.position.set(
            0,
            0.65,
            0
        );

        scene.add(modelo);


        // =============================================
        // SOMBRAS
        // =============================================

        modelo.traverse(
            objeto => {

                if (
                    objeto.isMesh ||
                    objeto.isSkinnedMesh
                ) {

                    objeto.castShadow = true;
                    objeto.receiveShadow = true;
                }
            }
        );


        console.log(
            "🧍 Micaela cargada correctamente"
        );

    },

    progreso => {

        if (progreso.total > 0) {

            const porcentaje =
                (progreso.loaded /
                    progreso.total) * 100;

            console.log(
                "Micaela:",
                porcentaje.toFixed(1) + "%"
            );
        }

    },

    error => {

        console.error(
            "❌ Error cargando micaela.glb",
            error
        );
    }
);


// =====================================================
// 📷 AJUSTE INICIAL DE CÁMARA
// =====================================================

camera.position.set(
    0,
    1.05,
    2.7
);

orbit.target.set(
    0,
    0.65,
    0
);

orbit.update();


// =====================================================
// 🧭 EJES DE REFERENCIA
// =====================================================

const ejes =
    new THREE.AxesHelper(0.5);

ejes.position.set(
    -0.6,
    0,
    0
);

scene.add(ejes);


// =====================================================
// 🌐 GRID DEL EDITOR
// =====================================================

const grid =
    new THREE.GridHelper(
        2,
        20,
        0x444444,
        0x222222
    );

grid.position.y = 0;

scene.add(grid);


// =====================================================
// 🖥️ RESIZE
// =====================================================

function ajustarVentana() {

    const ancho =
        contenedor.clientWidth ||
        window.innerWidth;

    const alto =
        contenedor.clientHeight ||
        window.innerHeight;

    camera.aspect =
        ancho / alto;

    camera.updateProjectionMatrix();

    renderer.setSize(
        ancho,
        alto
    );
}

window.addEventListener(
    "resize",
    ajustarVentana
);

ajustarVentana();


// =====================================================
// 🔄 BUCLE PRINCIPAL
// =====================================================

function animar() {

    requestAnimationFrame(animar);

    orbit.update();

    skeletonHelper.update();

    renderer.render(
        scene,
        camera
    );
}

animar();


console.log(
    "🦴 GAMERPRO RIG — Esqueleto chibi listo"
);
    // =====================================================
// 🎮 BLOQUE 4 — PANEL DEL RIG EDITOR
// =====================================================


// =====================================================
// 🖥️ PANEL PRINCIPAL
// =====================================================

const panel = document.createElement("div");

Object.assign(panel.style, {
    position: "fixed",
    top: "12px",
    left: "12px",
    zIndex: "1000",

    width: "230px",
    maxWidth: "calc(100vw - 24px)",

    padding: "12px",

    background: "rgba(15, 15, 20, 0.94)",

    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "12px",

    color: "#ffffff",

    fontFamily:
        "Arial, sans-serif",

    boxSizing: "border-box",

    boxShadow:
        "0 8px 30px rgba(0,0,0,0.45)"
});

contenedor.appendChild(panel);


// =====================================================
// 🏷️ TÍTULO
// =====================================================

const titulo =
    document.createElement("div");

titulo.textContent =
    "🦴 GAMERPRO RIG";

Object.assign(titulo.style, {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "8px"
});

panel.appendChild(titulo);


// =====================================================
// 📌 ESTADO
// =====================================================

const estado =
    document.createElement("div");

estado.textContent =
    "Hueso: ninguno";

Object.assign(estado.style, {
    fontSize: "13px",
    color: "#cccccc",
    marginBottom: "10px",

    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
});

panel.appendChild(estado);


// =====================================================
// 🔘 CONTENEDOR DE BOTONES
// =====================================================

const botones =
    document.createElement("div");

Object.assign(botones.style, {
    display: "grid",
    gridTemplateColumns:
        "1fr 1fr",
    gap: "7px"
});

panel.appendChild(botones);


// =====================================================
// 🧩 CREAR BOTÓN
// =====================================================

function crearBoton(
    texto,
    funcion
) {

    const boton =
        document.createElement("button");

    boton.textContent =
        texto;

    Object.assign(boton.style, {
        border: "none",
        borderRadius: "8px",

        padding: "9px 7px",

        background: "#292933",
        color: "#ffffff",

        fontSize: "12px",
        fontWeight: "bold",

        cursor: "pointer",

        touchAction: "manipulation"
    });

    boton.addEventListener(
        "pointerdown",
        event => {

            event.stopPropagation();
        }
    );

    boton.addEventListener(
        "click",
        funcion
    );

    botones.appendChild(boton);

    return boton;
}


// =====================================================
// ✋ MODO MOVER
// =====================================================

const botonMover =
    crearBoton(
        "✋ Mover",
        () => {

            modo = "translate";

            transform.setMode(
                "translate"
            );

            actualizarEstado();
        }
    );


// =====================================================
// 🔄 MODO ROTAR
// =====================================================

const botonRotar =
    crearBoton(
        "🔄 Rotar",
        () => {

            modo = "rotate";

            transform.setMode(
                "rotate"
            );

            actualizarEstado();
        }
    );


// =====================================================
// 🔒 BLOQUEAR / DESBLOQUEAR MICAELA
// =====================================================

const botonBloqueo =
    crearBoton(
        "🔒 Micaela",
        () => {

            modeloBloqueado =
                !modeloBloqueado;

            actualizarEstado();
        }
    );


// =====================================================
// ↩️ REINICIAR HUESO
// =====================================================

const botonReset =
    crearBoton(
        "↩️ Reset",
        () => {

            if (!huesoSeleccionado) {
                return;
            }

            huesoSeleccionado
                .position
                .set(0, 0, 0);

            huesoSeleccionado
                .rotation
                .set(0, 0, 0);

            huesoSeleccionado
                .scale
                .set(1, 1, 1);

            skeletonHelper.update();

            actualizarEstado();
        }
    );


// =====================================================
// 🎯 CENTRAR HUESO SELECCIONADO
// =====================================================

const botonCentrar =
    crearBoton(
        "🎯 Centrar",
        () => {

            if (!huesoSeleccionado) {
                return;
            }

            const posicion =
                new THREE.Vector3();

            huesoSeleccionado
                .getWorldPosition(
                    posicion
                );

            orbit.target.copy(
                posicion
            );

            orbit.update();
        }
    );


// =====================================================
// ❌ DESELECCIONAR
// =====================================================

const botonDeseleccionar =
    crearBoton(
        "❌ Quitar",
        () => {

            seleccionarHueso(null);

            actualizarEstado();
        }
    );


// =====================================================
// 🔄 ACTUALIZAR TEXTO DEL PANEL
// =====================================================

function actualizarEstado() {

    if (huesoSeleccionado) {

        estado.textContent =
            "🦴 " +
            huesoSeleccionado.name +
            " | " +
            (
                modo === "translate"
                    ? "Mover"
                    : "Rotar"
            );

    } else {

        estado.textContent =
            modeloBloqueado
                ? "🔒 Micaela bloqueada"
                : "🔓 Micaela desbloqueada";
    }


    botonMover.style.background =
        modo === "translate"
            ? "#1769aa"
            : "#292933";


    botonRotar.style.background =
        modo === "rotate"
            ? "#8e44ad"
            : "#292933";


    botonBloqueo.textContent =
        modeloBloqueado
            ? "🔒 Micaela"
            : "🔓 Micaela";
}


// =====================================================
// 🦴 ACTUALIZAR PANEL AL SELECCIONAR HUESO
// =====================================================

// Reemplazamos la función anterior
// para que también actualice el panel.

const seleccionarHuesoOriginal =
    seleccionarHueso;


// =====================================================
// NUEVA FUNCIÓN DE SELECCIÓN
// =====================================================

function seleccionarHuesoConPanel(
    bone
) {

    seleccionarHuesoOriginal(
        bone
    );

    actualizarEstado();
}


// =====================================================
// REEMPLAZAR LA SELECCIÓN DEL MOUSE
// =====================================================

renderer.domElement.removeEventListener(
    "pointerdown",
    seleccionarConMouse
);


renderer.domElement.addEventListener(
    "pointerdown",
    event => {

        const rect =
            renderer.domElement
                .getBoundingClientRect();


        mouse.x =
            ((event.clientX -
                rect.left) /
                rect.width) * 2 - 1;


        mouse.y =
            -((event.clientY -
                rect.top) /
                rect.height) * 2 + 1;


        raycaster.setFromCamera(
            mouse,
            camera
        );


        const impactos =
            raycaster.intersectObjects(
                marcadores,
                false
            );


        if (
            impactos.length === 0
        ) {

            return;
        }


        const marcador =
            impactos[0].object;


        const bone =
            marcador.userData.bone;


        seleccionarHuesoConPanel(
            bone
        );
    }
);


// =====================================================
// 🎨 ESTILO EXTRA PARA MÓVIL
// =====================================================

if (
    window.innerWidth < 600
) {

    panel.style.width =
        "205px";

    panel.style.top =
        "8px";

    panel.style.left =
        "8px";
}


// =====================================================
// 🚫 EVITAR QUE EL PANEL AFECTE AL EDITOR 3D
// =====================================================

panel.addEventListener(
    "pointerdown",
    event => {

        event.stopPropagation();
    }
);


// =====================================================
// ESTADO INICIAL
// =====================================================

actualizarEstado();


// =====================================================
// 🧪 MENSAJE DE DEPURACIÓN
// =====================================================

console.log(
    "🎮 Panel del Rig Editor listo"
);
    // =====================================================
// 🧪 BLOQUE 5 — DIAGNÓSTICO VISUAL DEL RIG DE MICAELA
// =====================================================

function crearPanelDiagnostico() {

    const panel =
        document.createElement("div");

    panel.id =
        "panelDiagnosticoRig";

    Object.assign(panel.style, {
        position: "fixed",
        right: "12px",
        top: "12px",
        zIndex: "1001",

        width: "270px",
        maxWidth: "calc(100vw - 24px)",
        maxHeight: "70vh",

        overflowY: "auto",

        padding: "12px",

        background:
            "rgba(12,12,18,0.95)",

        border:
            "1px solid rgba(255,255,255,0.15)",

        borderRadius: "12px",

        color: "#fff",

        fontFamily:
            "Arial, sans-serif",

        fontSize: "12px",

        boxSizing: "border-box",

        boxShadow:
            "0 8px 30px rgba(0,0,0,0.45)"
    });

    contenedor.appendChild(panel);

    return panel;
}


const panelDiagnostico =
    crearPanelDiagnostico();


// =====================================================
// ACTUALIZAR DIAGNÓSTICO
// =====================================================

function mostrarDiagnosticoRig() {

    panelDiagnostico.innerHTML = "";

    const titulo =
        document.createElement("div");

    titulo.textContent =
        "🧪 DIAGNÓSTICO DE MICAELA";

    Object.assign(titulo.style, {
        fontSize: "16px",
        fontWeight: "bold",
        marginBottom: "10px"
    });

    panelDiagnostico.appendChild(
        titulo
    );


    // =============================================
    // SI MICAELA NO CARGÓ
    // =============================================

    if (!modelo) {

        const mensaje =
            document.createElement("div");

        mensaje.textContent =
            "⏳ Esperando a que cargue Micaela...";

        mensaje.style.color =
            "#ffd166";

        panelDiagnostico.appendChild(
            mensaje
        );

        return;
    }


    // =============================================
    // CONTADORES
    // =============================================

    let meshes = 0;
    let skinnedMeshes = 0;

    const esqueletos = [];
    const huesosReales = [];


    // =============================================
    // RECORRER MICAELA
    // =============================================

    modelo.traverse(
        objeto => {

            if (objeto.isMesh) {
                meshes++;
            }


            if (objeto.isSkinnedMesh) {

                skinnedMeshes++;

                if (objeto.skeleton) {

                    if (
                        !esqueletos
                            .includes(
                                objeto.skeleton
                            )
                    ) {

                        esqueletos.push(
                            objeto.skeleton
                        );
                    }


                    objeto.skeleton.bones
                        .forEach(
                            bone => {

                                if (
                                    !huesosReales
                                        .includes(
                                            bone.name
                                        )
                                ) {

                                    huesosReales
                                        .push(
                                            bone.name
                                        );
                                }
                            }
                        );
                }
            }
        }
    );


    // =============================================
    // RESUMEN
    // =============================================

    const resumen =
        document.createElement("div");

    resumen.innerHTML = `
        <div>🧍 Modelo: <b>Cargado</b></div>
        <div>🧩 Meshes: <b>${meshes}</b></div>
        <div>🦴 SkinnedMesh: <b>${skinnedMeshes}</b></div>
        <div>💀 Esqueletos: <b>${esqueletos.length}</b></div>
        <div>🦴 Huesos reales: <b>${huesosReales.length}</b></div>
    `;

    Object.assign(resumen.style, {
        lineHeight: "1.6",
        marginBottom: "10px"
    });

    panelDiagnostico.appendChild(
        resumen
    );


    // =============================================
    // ESTADO
    // =============================================

    const estado =
        document.createElement("div");


    if (skinnedMeshes > 0) {

        estado.textContent =
            "✅ El modelo tiene skinning.";

        estado.style.color =
            "#62ff8b";

    } else {

        estado.textContent =
            "⚠️ El modelo no tiene SkinnedMesh.";

        estado.style.color =
            "#ffd166";
    }


    estado.style.marginBottom =
        "10px";

    panelDiagnostico.appendChild(
        estado
    );


    // =============================================
    // LISTA DE HUESOS REALES
    // =============================================

    if (
        huesosReales.length > 0
    ) {

        const subtitulo =
            document.createElement("div");

        subtitulo.textContent =
            "🦴 HUESOS DEL GLB";

        Object.assign(subtitulo.style, {
            fontWeight: "bold",
            marginBottom: "6px"
        });

        panelDiagnostico.appendChild(
            subtitulo
        );


        const lista =
            document.createElement("div");


        huesosReales.forEach(
            (nombre, indice) => {

                const fila =
                    document.createElement("div");

                fila.textContent =
                    `${indice + 1}. ${nombre}`;

                Object.assign(fila.style, {
                    padding: "4px 6px",
                    marginBottom: "2px",

                    background:
                        "rgba(255,255,255,0.06)",

                    borderRadius: "5px",

                    overflow: "hidden",
                    textOverflow:
                        "ellipsis",
                    whiteSpace:
                        "nowrap"
                });

                lista.appendChild(
                    fila
                );
            }
        );


        panelDiagnostico.appendChild(
            lista
        );
    }


    // =============================================
    // GUARDAR INFORMACIÓN
    // =============================================

    modelo.userData.rigDiagnostico = {

        meshes,

        skinnedMeshes,

        esqueletos:
            esqueletos.length,

        huesos:
            huesosReales
    };
}


// =====================================================
// MOSTRAR DIAGNÓSTICO
// =====================================================

mostrarDiagnosticoRig();


// =====================================================
// VOLVER A COMPROBAR DESPUÉS DE CARGAR
// =====================================================

setTimeout(
    mostrarDiagnosticoRig,
    500
);


// =====================================================
// ACTUALIZAR TAMBIÉN DESPUÉS
// =====================================================

setTimeout(
    mostrarDiagnosticoRig,
    1500
);


// =====================================================
// MÓVIL
// =====================================================

if (
    window.innerWidth < 600
) {

    panelDiagnostico.style.width =
        "210px";

    panelDiagnostico.style.right =
        "8px";

    panelDiagnostico.style.top =
        "8px";
        }
